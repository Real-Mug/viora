import { env } from "@/lib/config/env";
import type { SubmitResult } from "@/lib/types/lead";
import { MIN_FILL_SECONDS } from "@/lib/forms/schemas";

/**
 * Form transport adapter.
 *
 * The forms themselves do not know where submissions go. On a static host
 * NEXT_PUBLIC_FORM_ENDPOINT points at a form service (Formspree, Web3Forms,
 * Hostinger's handler); on a Node host, point it at `/api/leads` and the same
 * code posts there instead. Swapping providers is an env change.
 *
 * Nothing secret belongs in this file: it runs in the browser. A form endpoint
 * URL is a public write-only target; API keys and inbox credentials stay on the
 * server side of whichever provider is used.
 */

export type SubmitPayload = {
  kind: "host-lead" | "contact-lead";
  data: Record<string, unknown>;
  sourcePath: string;
};

/** Timing check: bots post instantly, people do not. */
export function looksAutomated(renderedAt: unknown): boolean {
  const started = Number(renderedAt);
  if (!Number.isFinite(started) || started <= 0) return false;
  return (Date.now() - started) / 1000 < MIN_FILL_SECONDS;
}

/** Strip anti-spam fields so they never reach the inbox or CRM. */
function clean(data: Record<string, unknown>): Record<string, unknown> {
  const { website: _website, renderedAt: _renderedAt, ...rest } = data;
  void _website;
  void _renderedAt;
  return rest;
}

export async function submitLead(payload: SubmitPayload): Promise<SubmitResult> {
  if (!env.formEndpoint) {
    // Fail loudly in development, gracefully in production: the user is told
    // to email instead rather than seeing a success message for a lost form.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[viora] NEXT_PUBLIC_FORM_ENDPOINT is not set; submission was not sent.");
    }
    return {
      ok: false,
      error: "This form is not connected yet. Please email us and we will pick it up right away.",
    };
  }

  try {
    const response = await fetch(env.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        kind: payload.kind,
        sourcePath: payload.sourcePath,
        submittedAt: new Date().toISOString(),
        ...clean(payload.data),
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return { ok: false, error: "Too many submissions from this device. Please try again shortly." };
      }
      return {
        ok: false,
        error: "We could not send your message. Please try again, or email us directly.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "We could not reach the server. Check your connection and try again.",
    };
  }
}

/**
 * Client-side throttle. It is a courtesy guard against double submits and
 * casual abuse only - real rate limiting has to happen at the endpoint, which
 * is why the Node-host route handler applies its own limit.
 */
const SUBMIT_GAP_MS = 20_000;
const lastSubmit = new Map<string, number>();

export function throttled(kind: string): boolean {
  const previous = lastSubmit.get(kind);
  const now = Date.now();
  if (previous && now - previous < SUBMIT_GAP_MS) return true;
  lastSubmit.set(kind, now);
  return false;
}
