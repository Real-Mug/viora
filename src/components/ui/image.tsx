import NextImage, { type ImageProps } from "next/image";

import { withBasePath } from "@/lib/config/env";

/**
 * Image wrapper.
 *
 * Next.js applies `basePath` to routes, scripts and stylesheets, but NOT to the
 * `src` of an image when `images.unoptimized` is set - the optimizer normally
 * does that rewriting, and the static export has no optimizer. Left alone,
 * every image 404s on a sub-path deployment such as a GitHub Pages project site.
 *
 * So all image rendering goes through here rather than importing `next/image`
 * directly. It is a no-op when the site is served from a domain root.
 *
 * Absolute URLs and data URIs are passed through untouched.
 */
export function Img({ src, ...props }: ImageProps) {
  const resolved =
    typeof src === "string" && src.startsWith("/") ? withBasePath(src) : src;

  return <NextImage src={resolved} {...props} />;
}
