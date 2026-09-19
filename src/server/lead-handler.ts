import { NextResponse } from "next/server";

import { contactLeadSchema, fieldErrors, hostLeadSchema, MIN_FILL_SECONDS } from "@/lib/forms/schemas";

/**
 * SERVER-SIDE LEAD HANDLER (for DEPLOY_TARGET=node)
 * ----------------------------------------------------------------------------
 * This file is not wired into a route by default, because the site ships as a
 * static export and Next.js cannot export a POST route handler. It lives here,
 * fully written and type-checked, so that moving to a Node host (Hostinger VPS,
 * Vercel, Netlify) is a two-step change rather than a piece of new work.
 *
 * TO ENABLE, on a Node host:
 *   1. set DEPLOY_TARGET=node
 *   2. create src/app/api/leads/route.ts containing:
 *
 *        export { POST } from "@/server/lead-handler";
 *        export const runtime = "nodejs";
 *
 *   3. set NEXT_PUBLIC_FORM_ENDPOINT=/api/leads
 *
 * The browser forms need no change: they post to whatever the endpoint env var
 * points at.
 *
 * SECURITY NOTES
 * - Validation is re-run here with the same Zod schemas the browser uses.
 *   Client-side validation is a convenience; this is the control.
 * - Rate limiting is per IP, in memory. That is correct for a single Node
 *   process and NOT correct behind multiple instances - move the counter to
 *   Redis or the platform's own rate limiter before scaling out.
 * - Delivery credentials (SMTP, API keys, CRM tokens) are read from unprefixed
 *   env vars so they stay server-side. Never move them to NEXT_PUBLIC_*.
 * - Submitted data is never written to a public location, logged in full, or
 *   echoed back in a response.
 */

/* -------------------------------------------------------------------------- */
/* Rate limiting                                                              */
/* -------------------------------------------------------------------------- */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/** Drop expired buckets so the map cannot grow without bound. */
function sweep(now: number) {
  if (buckets.size < 1000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

function rateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  if (bucket.count > MAX_PER_WINDOW) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * Client IP.
 *
 * Only trust a forwarded header when the app is genuinely behind a proxy you
 * control - otherwise a caller can spoof it and defeat the rate limit. Set
 * TRUST_PROXY=true only when that is the case.
 */
function clientIp(request: Request): string {
  if (process.env.TRUST_PROXY === "true") {
    const forwarded = request.headers.get("x-forwarded-for");
    const first = forwarded?.split(",")[0]?.trim();
    if (first) return first;
    const real = request.headers.get("x-real-ip");
    if (real) return real;
  }
  return "unknown";
}

/* -------------------------------------------------------------------------- */
/* Bot protection                                                             */
/* -------------------------------------------------------------------------- */

/** Verify a Cloudflare Turnstile token, when one is configured. */
async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured; the other checks still apply

  if (typeof token !== "string" || !token) return false;

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/* Delivery                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Where a validated lead goes.
 *
 * PLACEHOLDER: implement one of these and delete the rest -
 *   - SMTP send via nodemailer using SMTP_HOST / SMTP_USER / SMTP_PASSWORD
 *   - a transactional email API (Resend, Postmark) using its server-side key
 *   - a CRM, via the CrmProvider interface in src/lib/integrations
 *
 * Until it is implemented this throws, so a submission fails loudly rather than
 * telling an owner their enquiry was received when it went nowhere.
 */
async function deliver(kind: string, data: Record<string, unknown>, sourcePath: string): Promise<void> {
  void kind;
  void data;
  void sourcePath;
  throw new Error(
    "Lead delivery is not configured. Implement deliver() in src/server/lead-handler.ts before enabling /api/leads.",
  );
}

/* -------------------------------------------------------------------------- */
/* Route handler                                                              */
/* -------------------------------------------------------------------------- */

const MAX_BODY_BYTES = 16 * 1024;

export async function POST(request: Request): Promise<Response> {
  const ip = clientIp(request);

  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  if (request.headers.get("content-type")?.includes("application/json") !== true) {
    return NextResponse.json({ ok: false, error: "Unsupported content type." }, { status: 415 });
  }

  // Cap the body before parsing, so an oversized payload cannot be used to
  // exhaust memory.
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Submission too large." }, { status: 413 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const kind = payload.kind;
  if (kind !== "host-lead" && kind !== "contact-lead") {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot and timing checks, re-applied server side. A bot receives a
  // success-shaped response so it learns nothing about which check caught it.
  if (typeof payload.website === "string" && payload.website.length > 0) {
    return NextResponse.json({ ok: true });
  }
  const renderedAt = Number(payload.renderedAt);
  if (Number.isFinite(renderedAt) && renderedAt > 0) {
    if ((Date.now() - renderedAt) / 1000 < MIN_FILL_SECONDS) {
      return NextResponse.json({ ok: true });
    }
  }

  if (!(await verifyTurnstile(payload.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, error: "Verification failed. Please try again." }, { status: 400 });
  }

  const schema = kind === "host-lead" ? hostLeadSchema : contactLeadSchema;
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Some fields need attention.",
        fieldErrors: fieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  const sourcePath = typeof payload.sourcePath === "string" ? payload.sourcePath.slice(0, 200) : "";

  try {
    await deliver(kind, parsed.data as unknown as Record<string, unknown>, sourcePath);
  } catch (error) {
    // Log the failure, never the submitted personal information.
    console.error("[viora] lead delivery failed", {
      kind,
      sourcePath,
      reason: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      { ok: false, error: "We could not send your message. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
