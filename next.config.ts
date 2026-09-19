import type { NextConfig } from "next";

/**
 * Deployment target is controlled by one env var so the same codebase can ship to
 * static hosting (Hostinger shared / LiteSpeed, GitHub Pages) or to a Node host
 * (Hostinger VPS, Vercel, Netlify) without touching application code.
 *
 *   DEPLOY_TARGET=static  -> `next build` emits ./out for upload to public_html
 *   DEPLOY_TARGET=node    -> standard Next.js server build (enables route handlers)
 */
const target = process.env.DEPLOY_TARGET ?? "static";
const isStatic = target === "static";

/**
 * Sub-path the site is served from, with a leading slash and no trailing one.
 *
 * Empty for a real domain (Hostinger `public_html`, where the site is at the
 * root). Set to something like `/viora` for a GitHub Pages project site, which
 * serves at https://<user>.github.io/<repo>/. Next.js then prefixes every route,
 * asset and image URL for us.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: isStatic ? "export" : undefined,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // Static hosts serve /about/index.html rather than /about, so emit directories.
  trailingSlash: isStatic,
  images: {
    // The static exporter cannot run the on-demand optimizer. Source images are
    // pre-optimised (see docs/IMAGES.md) and served directly.
    unoptimized: isStatic,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  // Security headers are only honoured by a Node host. The static export ships
  // the equivalent rules in public/.htaccess, so the key is omitted entirely
  // rather than defined and silently ignored.
  ...(isStatic
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
