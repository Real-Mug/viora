/**
 * Typed, centralised access to environment configuration.
 * Nothing else in the app should read `process.env` directly.
 */

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export type DeployTarget = "static" | "node";
export type ContentMode = "placeholder" | "live";

export const env = {
  /** Canonical origin used for canonical tags, OG URLs and the sitemap. */
  siteUrl: trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || "https://viorahosting.com"),

  /** `static` disables anything that needs a running server. */
  deployTarget: (process.env.DEPLOY_TARGET === "node" ? "node" : "static") as DeployTarget,

  /**
   * `placeholder` renders sample properties/reviews with a visible "Sample"
   * label so the site can be demonstrated before real inventory exists.
   * `live` hides every sample record - real content only.
   */
  contentMode: (process.env.NEXT_PUBLIC_CONTENT_MODE === "live" ? "live" : "placeholder") as ContentMode,

  /**
   * Sub-path the site is served from ("" at a domain root, "/viora" on a
   * GitHub Pages project site). Next.js prefixes routes and assets itself; this
   * is here for the handful of places that build a URL by hand.
   */
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, ""),

  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
} as const;

export const isStaticBuild = env.deployTarget === "static";
export const showPlaceholders = env.contentMode === "placeholder";

/**
 * Prefix a public-asset path with the deployment sub-path.
 *
 * Next.js applies `basePath` to routes, scripts, stylesheets and next/image
 * automatically. It does not apply it to raw strings in the metadata object
 * (icons, manifest), so those go through here.
 */
export function withBasePath(path: string): string {
  if (!env.basePath) return path;
  return `${env.basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Build an absolute URL from a site-relative path.
 *
 * The static export is built with `trailingSlash: true`, so /services is served
 * as /services/. Canonical tags, the sitemap and structured data all go through
 * here so they emit the URL that is actually served - otherwise every canonical
 * would point at a URL that 301s, which is a needless hop and a common cause of
 * canonical/indexed-URL mismatches in Search Console.
 *
 * Paths whose final segment contains a dot are treated as files and left alone.
 */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;

  let normalised = path.startsWith("/") ? path : `/${path}`;

  if (isStaticBuild && !normalised.endsWith("/")) {
    const lastSegment = normalised.split("/").pop() ?? "";
    if (!lastSegment.includes(".")) normalised = `${normalised}/`;
  }

  return `${env.siteUrl}${normalised}`;
}
