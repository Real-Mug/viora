import NextImage, { type ImageProps } from "next/image";

/**
 * Image wrapper.
 *
 * All image rendering goes through here rather than importing `next/image`
 * directly, so there is one place to change how images are resolved.
 *
 * The deployment sub-path (`/viora-site` on GitHub Pages) and the responsive
 * `srcset` are both handled by the custom loader in src/lib/image-loader.ts,
 * which next.config.ts wires up for the static build. A loader returns the
 * final URL, so prefixing here as well would double the sub-path.
 *
 * See scripts/generate-image-variants.mjs for where the variants come from.
 */
export function Img(props: ImageProps) {
  return <NextImage {...props} />;
}
