export type ServiceIconName =
  | "co-hosting"
  | "management"
  | "vacation"
  | "listing"
  | "communication"
  | "revenue"
  | "care"
  | "marketing"
  | "booking";

export type Service = {
  slug: string;
  /** Short label for nav and cards. */
  name: string;
  /** H1 on the service page - may be longer than `name`. */
  heading: string;
  /** One sentence used on the services grid and in meta descriptions. */
  summary: string;
  icon: ServiceIconName;
  /** Opening paragraphs on the service page. */
  intro: string[];
  /** "What's included" checklist. */
  includes: { title: string; description: string }[];
  /** Who the service suits - keeps the copy honest and specific. */
  bestFor: string[];
  /** Service-page FAQ. Feeds both the page and FAQPage structured data. */
  faqs: { question: string; answer: string }[];
  /** Internal linking: slugs of related services. */
  relatedServices: string[];
  seoTitle: string;
  seoDescription: string;
  /** Shown on the homepage services grid. */
  featured?: boolean;
};
