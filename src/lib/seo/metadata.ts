import type { Metadata } from "next";

import { absoluteUrl, env, withBasePath } from "@/lib/config/env";
import { siteConfig } from "@/lib/config/site";

/**
 * Reusable metadata builder.
 *
 * Every route calls `pageMetadata` so that titles, descriptions, canonicals and
 * social cards are produced one way. That is what keeps them unique and stops
 * two pages quietly sharing a description.
 */

export type PageMetadataInput = {
  /** Page title without the brand suffix - that is appended here. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services/airbnb-co-hosting". */
  path: string;
  /** Social share image, site-relative. Defaults to the brand card. */
  image?: { url: string; alt: string; width?: number; height?: number };
  /** Set for pages that should stay out of the index (thank-you pages etc.). */
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Additional keywords. Used sparingly - these carry little ranking weight. */
  keywords?: string[];
};

const DEFAULT_OG_IMAGE = {
  url: "/images/brand/og-default.png",
  alt: "VioraRental - short-term rental co-hosting and property management in Canada",
  width: 1200,
  height: 630,
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const og = image ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
        },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: "en_CA",
      images: [
        {
          url: absoluteUrl(og.url),
          alt: og.alt,
          width: og.width ?? 1200,
          height: og.height ?? 630,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(og.url)],
    },
  };
}

/** Root metadata. The title template gives every page the brand suffix. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${siteConfig.name} | Short-Term Rental Co-Hosting and Property Management in Canada`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  applicationName: siteConfig.name,
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { telephone: false, address: false, email: false },
  ...(env.googleSiteVerification
    ? { verification: { google: env.googleSiteVerification } }
    : {}),
  // Metadata icon and manifest URLs are emitted verbatim, so they are the one
  // place that needs the deployment sub-path applied by hand.
  icons: {
    icon: [{ url: withBasePath("/favicon.svg"), type: "image/svg+xml" }],
    apple: [{ url: withBasePath("/images/brand/apple-touch-icon.png"), sizes: "180x180" }],
  },
  manifest: withBasePath("/site.webmanifest"),
};

/**
 * Truncates a description to a length search engines will actually display,
 * cutting on a word boundary rather than mid-word.
 */
export function clampDescription(text: string, max = 158): string {
  const normalised = text.replace(/\s+/g, " ").trim();
  if (normalised.length <= max) return normalised;
  const cut = normalised.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,.;:]$/, "")}...`;
}
