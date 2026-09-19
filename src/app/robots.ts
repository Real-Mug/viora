import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/config/env";

/**
 * robots.txt.
 *
 * Everything public is crawlable. The only disallowed paths are the future
 * authenticated areas, which should never be indexed even accidentally once
 * they exist.
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
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
