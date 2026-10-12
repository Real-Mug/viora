import type { MetadataRoute } from "next";

import { absoluteUrl, env } from "@/lib/config/env";

/**
 * robots.txt.
 *
 * Everything public is crawlable. The only disallowed paths are the future
 * authenticated areas, which should never be indexed even accidentally once
 * they exist.
 *
 * On a noindex deployment (the Pages mirror) crawling deliberately stays open.
 * Disallowing it would stop Googlebot ever reading the noindex tag on those
 * pages, and a blocked URL can still be indexed from an inbound link - so
 * blocking is the one change that would keep the duplicate in the index. The
 * sitemap is dropped instead, because advertising 40 URLs that all say noindex
 * is just noise.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/owner/", "/admin/", "/thank-you/"],
      },
    ],
    ...(env.noindex ? {} : { sitemap: absoluteUrl("/sitemap.xml") }),
    host: absoluteUrl("/"),
  };
}
