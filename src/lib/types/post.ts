export type PostCategory =
  | "airbnb-hosting"
  | "co-hosting"
  | "short-term-rentals"
  | "property-management"
  | "canadian-rental-market"
  | "guest-experience"
  | "revenue-management"
  | "property-operations"
  | "direct-booking";

export const POST_CATEGORY_LABELS: Record<PostCategory, string> = {
  "airbnb-hosting": "Airbnb Hosting",
  "co-hosting": "Co-Hosting",
  "short-term-rentals": "Short-Term Rentals",
  "property-management": "Property Management",
  "canadian-rental-market": "Canadian Rental Market",
  "guest-experience": "Guest Experience",
  "revenue-management": "Revenue Management",
  "property-operations": "Property Operations",
  "direct-booking": "Direct Booking",
};

/** A minimal block model, so posts can move to a CMS without rewriting pages. */
export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "quote"; text: string; attribution?: string };

export type Post = {
  slug: string;
  title: string;
  /** Used on cards and as the meta description when `seoDescription` is absent. */
  excerpt: string;
  category: PostCategory;
  /** ISO date. */
  publishedAt: string;
  updatedAt?: string;
  /** Attribute to the company until named authors are confirmed. */
  author: string;
  readingMinutes: number;
  body: PostBlock[];
  /** Internal linking targets rendered at the end of the article. */
  relatedServices?: string[];
  relatedPosts?: string[];
  seoTitle?: string;
  seoDescription?: string;
  cover?: { src: string; alt: string; width: number; height: number };
};
