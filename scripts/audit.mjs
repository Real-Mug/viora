/**
 * Post-build audit of the static export.
 *
 * Checks the invariants that are easy to break silently as content is added:
 * duplicate titles or meta descriptions, missing or wrong canonicals, heading
 * structure, invalid JSON-LD, internal links that 404, images without alt text,
 * and pages that nothing links to.
 *
 * Run after `next build`:  node scripts/audit.mjs
 * Exits non-zero if any error-level check fails, so it can gate a deploy.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");

/**
 * Deployment sub-path, if any. When the site is built for a GitHub Pages
 * project site, every emitted URL carries a `/viora` prefix while the files on
 * disk do not - so the prefix is stripped before comparing the two.
 */
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

function stripBase(path) {
  if (BASE_PATH && path.startsWith(BASE_PATH)) {
    return path.slice(BASE_PATH.length) || "/";
  }
  return path;
}

const errors = [];
const warnings = [];

const error = (page, message) => errors.push(`${page}: ${message}`);
const warn = (page, message) => warnings.push(`${page}: ${message}`);

/** Recursively collect every .html file in the export. */
async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_next") continue;
      found.push(...(await htmlFiles(path)));
    } else if (entry.name.endsWith(".html")) {
      found.push(path);
    }
  }
  return found;
}

/** Map an export file path back to the URL path it is served at. */
function urlFor(file) {
  const rel = relative(outDir, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}/`;
  return `/${rel}`;
}

const text = (html, pattern) => html.match(pattern)?.[1]?.trim();

const SKIP_LINK_CHECK = /^(https?:|mailto:|tel:|#|javascript:)/i;

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const files = await htmlFiles(outDir);
  const titles = new Map();
  const descriptions = new Map();
  const canonicals = new Map();
  const linkedTo = new Set();
  const allPages = new Set();

  for (const file of files) {
    const page = urlFor(file);
    const html = await readFile(file, "utf8");
    const is404 = page === "/404.html" || page === "/404/";
    allPages.add(page);

    /* --- Title ---------------------------------------------------------- */
    const title = text(html, /<title>([^<]*)<\/title>/i);
    if (!title) {
      error(page, "missing <title>");
    } else {
      if (title.length > 65) warn(page, `title is ${title.length} chars (over 65)`);
      if (title.length < 15) warn(page, `title is only ${title.length} chars`);
      if (!is404) {
        const seen = titles.get(title);
        if (seen) error(page, `duplicate title, also on ${seen}`);
        else titles.set(title, page);
      }
    }

    /* --- Meta description ----------------------------------------------- */
    const description = text(html, /<meta name="description" content="([^"]*)"/i);
    if (!description) {
      error(page, "missing meta description");
    } else {
      if (description.length > 165) warn(page, `meta description is ${description.length} chars (over 165)`);
      if (description.length < 50) warn(page, `meta description is only ${description.length} chars`);
      if (!is404) {
        const seen = descriptions.get(description);
        if (seen) error(page, `duplicate meta description, also on ${seen}`);
        else descriptions.set(description, page);
      }
    }

    /* --- Canonical ------------------------------------------------------- */
    const canonical = text(html, /<link rel="canonical" href="([^"]*)"/i);
    if (!canonical) {
      if (!is404) error(page, "missing canonical link");
    } else {
      const canonicalPath = stripBase(new URL(canonical).pathname);
      if (canonicalPath !== page && !is404) {
        error(page, `canonical points to ${canonicalPath}, expected ${page}`);
      }
      const seen = canonicals.get(canonical);
      if (seen && !is404) error(page, `canonical collides with ${seen}`);
      else canonicals.set(canonical, page);
    }

    /* --- Open Graph ------------------------------------------------------ */
    if (!is404) {
      for (const property of ["og:title", "og:description", "og:image", "og:url"]) {
        if (!new RegExp(`property="${property}"`).test(html)) {
          error(page, `missing ${property}`);
        }
      }
      if (!/name="twitter:card"/.test(html)) error(page, "missing twitter:card");
    }

    /* --- Headings -------------------------------------------------------- */
    const h1s = html.match(/<h1\b[^>]*>/gi) ?? [];
    if (h1s.length === 0) error(page, "no <h1>");
    if (h1s.length > 1) error(page, `${h1s.length} <h1> elements, expected 1`);

    /* --- Language and viewport ------------------------------------------- */
    if (!/<html[^>]+lang="/i.test(html)) error(page, "missing lang attribute on <html>");
    if (!/name="viewport"/.test(html)) error(page, "missing viewport meta");

    /* --- JSON-LD --------------------------------------------------------- */
    const blocks = [...html.matchAll(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    )];
    if (!is404 && blocks.length === 0) warn(page, "no JSON-LD structured data");
    for (const [, body] of blocks) {
      try {
        const parsed = JSON.parse(body.replace(/\\u003c/g, "<"));
        if (!parsed["@context"]) error(page, "JSON-LD block missing @context");
      } catch {
        error(page, "JSON-LD block is not valid JSON");
      }
    }

    /* --- Images ---------------------------------------------------------- */
    for (const [, tag] of html.matchAll(/<img\b([^>]*)>/gi)) {
      if (!/\salt=/.test(tag)) error(page, "an <img> has no alt attribute");
    }

    /* --- Internal links --------------------------------------------------- */
    for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/gi)) {
      if (SKIP_LINK_CHECK.test(href)) continue;
      const path = stripBase(href.split("#")[0].split("?")[0]);
      if (!path.startsWith("/")) continue;
      linkedTo.add(path.endsWith("/") || path.includes(".") ? path : `${path}/`);

      const candidates = [
        join(outDir, path, "index.html"),
        join(outDir, path),
        join(outDir, `${path.replace(/\/$/, "")}.html`),
      ];
      let ok = false;
      for (const candidate of candidates) {
        if (await exists(candidate)) {
          ok = true;
          break;
        }
      }
      if (!ok) error(page, `internal link 404s: ${href}`);
    }
  }

  /* --- Orphan pages ------------------------------------------------------- */
  for (const page of allPages) {
    if (page === "/" || page === "/404.html" || page === "/404/") continue;
    if (!linkedTo.has(page)) warn(page, "orphan: no internal page links to it");
  }

  /* --- Required files ----------------------------------------------------- */
  for (const required of ["sitemap.xml", "robots.txt", "404.html", ".htaccess"]) {
    if (!(await exists(join(outDir, required)))) errors.push(`missing required file: ${required}`);
  }

  /* --- Report -------------------------------------------------------------- */
  console.log(`Audited ${files.length} pages.\n`);

  if (warnings.length) {
    console.log(`Warnings (${warnings.length}):`);
    for (const message of warnings) console.log(`  ! ${message}`);
    console.log("");
  }

  if (errors.length) {
    console.log(`Errors (${errors.length}):`);
    for (const message of errors) console.log(`  x ${message}`);
    console.log("");
    process.exit(1);
  }

  console.log("No errors.");
}

main().catch((cause) => {
  console.error(cause);
  process.exit(1);
});
