/**
 * Reviews are the highest-risk content on the site: fabricating one is both a
 * trust and a compliance problem. The model therefore forces an explicit
 * `source` and `verified` flag, and the review components refuse to render
 * aggregate ratings unless enough verified reviews exist.
 */

export type ReviewSource = "direct" | "airbnb" | "vrbo" | "booking.com" | "google" | "other";

export const REVIEW_SOURCE_LABELS: Record<ReviewSource, string> = {
  direct: "Direct VioraRental guest",
  airbnb: "Airbnb",
  vrbo: "Vrbo",
  "booking.com": "Booking.com",
  google: "Google",
  other: "Verified booking platform",
};

export type Review = {
  id: string;
  /** Guest first name plus initial is the norm; never publish a full identity. */
  guestName: string;
  /** Optional avatar under /public. Omit rather than inventing a stock face. */
  guestImage?: { src: string; alt: string };
  /** Slug of the reviewed property, or omitted for a service/company review. */
  propertySlug?: string;
  propertyName?: string;
  /** 1-5, whole or half stars. */
  rating: number;
  title?: string;
  body: string;
  /** ISO date. */
  date: string;
  source: ReviewSource;
  /** Link to the review on its source platform, where one is public. */
  sourceUrl?: string;
  /** Only true when someone has confirmed the review against its source. */
  verified: boolean;
  featured?: boolean;
  /** Demo record. Hidden entirely when NEXT_PUBLIC_CONTENT_MODE=live. */
  isPlaceholder?: boolean;
};

export type ReviewQuery = {
  propertySlug?: string;
  source?: ReviewSource[];
  minRating?: number;
  featuredOnly?: boolean;
  limit?: number;
};

export type AggregateRating = {
  ratingValue: number;
  reviewCount: number;
  bestRating: 5;
  worstRating: 1;
};

/**
 * Google requires AggregateRating structured data to reflect genuine, visible
 * reviews. We only emit it above this threshold, and only from verified,
 * non-placeholder records.
 */
export const MIN_REVIEWS_FOR_AGGREGATE = 3;
