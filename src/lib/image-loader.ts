import manifest from "@/lib/data/image-manifest.json";

/**
 * Custom image loader for the static export.
 *
 * A static export has no image optimizer, so the usual choice is
 * `images.unoptimized`, which makes next/image emit a single `src` and no
 * `srcset` - every visitor then downloads the full 1600px original, including
 * a phone showing it at 390px.
 *
 * Instead, `scripts/generate-image-variants.mjs` pre-renders the widths an
 * optimizer would have produced, and this loader maps each width next/image
 * asks for onto the matching pre-rendered file. next/image builds a normal
 * `srcset` from the results and the browser picks the smallest file that fits.
 *
 * Anything not in the manifest - SVGs, brand marks, absolute URLs - is
 * returned untouched, so it behaves exactly as it did before.
 *
 * NOTE ON basePath: a loader returns the final URL, so it is responsible for
 * the deployment sub-path (`/viora-site` on GitHub Pages). Next does not
 * prefix a custom loader's output. This is why `Img` no longer applies it.
 */

type Variants = { width: number; height: number; widths: number[] };

const VARIANTS = manifest as Record<string, Variants>;

// Read directly rather than through lib/config/env: this module is bundled
// into the client for every page, and it needs exactly one value.
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

function withBase(path: string): string {
  if (!BASE_PATH || !path.startsWith("/") || path.startsWith(BASE_PATH + "/")) return path;
  return `${BASE_PATH}${path}`;
}

export default function viroraImageLoader({ src, width }: { src: string; width: number }): string {
  // Absolute URLs and data URIs are somebody else's problem.
  if (!src.startsWith("/")) return src;

  const entry = VARIANTS[src];
  if (!entry) return withBase(src);

  // Smallest pre-rendered width that still covers what was asked for.
  const target = entry.widths.find((candidate) => candidate >= width) ?? entry.width;

  // At or above the source width, the original is the best available file.
  if (target >= entry.width) return withBase(src);

  return withBase(`${src.replace(/\.[^.]+$/, "")}-${target}w.webp`);
}
