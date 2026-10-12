import type { MetadataRoute } from "next";

import { activeServiceAreas } from "@/content/locations";
import { posts, usedCategories } from "@/content/posts";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/config/env";
import { properties } from "@/lib/data";

/**
 * XML sitemap, generated from the same content the pages are built from.
 *
 * Because it reads the repository rather than a hand-maintained list, it can
 * never list a page that does not exist or miss one that does - including when
 * placeholder content is switched off, which removes those property URLs here
 * too.
 *
 * Priorities are a hint, not a ranking factor. They are set to reflect the
 * genuine hierarchy of the site rather than marked 1.0 across the board.
 */
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // lastmod is only given where a real date exists. A build timestamp on
  // every page teaches Google to ignore lastmod across the whole sitemap.
  const { items } = await properties.list({ pageSize: 1000 });
  const postDate = (post: (typeof posts)[number]) => Date.parse(post.updatedAt ?? post.publishedAt);
  const latest = (times: number[]) => (times.length ? new Date(Math.max(...times)) : undefined);
  const realDates: Record<string, Date | undefined> = {
    "/properties": latest(items.map((property) => Date.parse(property.updatedAt))),
    "/blog": latest(posts.map(postDate)),
  };

  const staticRoutes: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/properties", priority: 0.9, changeFrequency: "weekly" },
    { path: "/become-a-host", priority: 0.9, changeFrequency: "monthly" },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/locations", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.5, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
    { path: "/legal/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/legal/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/legal/cookie-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/legal/booking-terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/legal/cancellation-policy", priority: 0.2, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    ...(realDates[route.path] ? { lastModified: realDates[route.path] } : {}),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  for (const service of services) {
    entries.push({
      url: absoluteUrl(`/services/${service.slug}`),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const area of activeServiceAreas()) {
    entries.push({
      url: absoluteUrl(`/locations/${area.slug}`),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const property of items) {
    entries.push({
      url: absoluteUrl(`/properties/${property.slug}`),
      lastModified: new Date(property.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  for (const category of usedCategories()) {
    entries.push({
      url: absoluteUrl(`/blog/category/${category}`),
      lastModified: latest(posts.filter((post) => post.category === category).map(postDate)),
      changeFrequency: "weekly",
      priority: 0.4,
    });
  }

  for (const post of posts) {
    entries.push({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  return entries;
}
