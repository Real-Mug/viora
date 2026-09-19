"use client";

import { useEffect } from "react";

import { track } from "@/lib/analytics";

/**
 * Fires the `property_viewed` event once per property page view.
 *
 * Kept as a tiny client island so the property page itself can stay a server
 * component - only this fragment ships JavaScript, and it renders nothing.
 */
export function PropertyAnalytics({
  slug,
  city,
  province,
}: {
  slug: string;
  city: string;
  province: string;
}) {
  useEffect(() => {
    track({ name: "property_viewed", params: { property_slug: slug, city, province } });
  }, [slug, city, province]);

  return null;
}
