import type { Review } from "@/lib/types/review";

/**
 * GUEST AND OWNER REVIEWS
 * ----------------------------------------------------------------------------
 * This array is intentionally EMPTY.
 *
 * Unlike the sample property records, no placeholder reviews ship with this
 * site. A fabricated review is a false statement about a real person's
 * experience, it can breach the Competition Act's rules on deceptive marketing,
 * and it invalidates any Review/AggregateRating structured data the page emits.
 * The site therefore renders an honest empty state until real reviews exist.
 *
 * TO ADD A REVIEW
 * 1. Confirm it against its source (an Airbnb review page, a direct guest email
 *    you can produce on request, a Google review).
 * 2. Copy the template below, fill every field, and set `verified: true` only
 *    once step 1 is done.
 * 3. Publish a guest's first name and last initial at most. Ask before using a
 *    photo; omit `guestImage` rather than substituting a stock portrait.
 * 4. `sourceUrl` should link to the public review wherever one exists.
 *
 * Aggregate ratings appear only once at least MIN_REVIEWS_FOR_AGGREGATE
 * verified, non-placeholder reviews exist for the subject
 * (see src/lib/types/review.ts).
 *
 * TEMPLATE
 * {
 *   id: "rev-001",
 *   guestName: "Firstname L.",
 *   propertySlug: "lakefront-retreat-muskoka",
 *   propertyName: "Lakefront Retreat, Muskoka",
 *   rating: 5,
 *   title: "Short headline in the guest's own words",
 *   body: "The review text exactly as the guest wrote it.",
 *   date: "2026-08-14",
 *   source: "airbnb",
 *   sourceUrl: "https://www.airbnb.ca/rooms/...",
 *   verified: true,
 *   featured: true,
 * }
 */
export const reviewRecords: Review[] = [];
