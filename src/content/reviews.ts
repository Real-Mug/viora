import type { Review } from "@/lib/types/review";

/**
 * GUEST AND OWNER REVIEWS
 * ----------------------------------------------------------------------------
 * This array is intentionally EMPTY.
 *
 * No placeholder reviews ship with this site. A fabricated review is a false
 * statement about a real person's experience, it can breach the Competition
 * Act's rules on deceptive marketing, and it invalidates any Review or
 * AggregateRating structured data the page emits. The site renders an honest
 * empty state until real reviews exist.
 *
 * WHAT IS ALREADY SHOWING WITHOUT THIS FILE
 * Each property carries an `externalRating` in src/content/properties.ts: the
 * star rating and per-category scores Airbnb publishes for that listing, with
 * a link to the listing and the date they were checked. That is real, sourced
 * and verifiable, and it renders on the property page, the property cards and
 * the /reviews page. It is NOT the same thing as the written reviews below,
 * and the two are deliberately never averaged together.
 *
 * ADDING THE WRITTEN REVIEWS
 * Airbnb does not expose review text on the public listing page - it loads
 * behind their internal API - so these have to be copied across by hand from
 * the host dashboard. For each one:
 *
 * 1. Copy the text exactly as the guest wrote it. Do not tidy the grammar.
 * 2. Publish a first name and last initial at most, never a full name.
 * 3. Set `verified: true` only once you have checked it against the source.
 * 4. Omit `guestImage` rather than substituting a stock portrait.
 * 5. Include the critical ones too. A page of nothing but five stars reads as
 *    curated, and the 3-star review on the Kitchener listing is already
 *    visible to anyone who opens Airbnb.
 *
 * WHERE EACH ONE APPEARS
 *   - `propertySlug` set    -> grouped under that property on /reviews, and on
 *                              that property's own page.
 *   - `propertySlug` omitted -> treated as a review of VioraRental the service,
 *                              and fed into the animated wall on the homepage.
 *
 * The homepage wall needs roughly five or more to look right; below that it
 * renders as a single row rather than two.
 *
 * Aggregate ratings appear only once at least MIN_REVIEWS_FOR_AGGREGATE
 * verified, non-placeholder reviews exist for the subject
 * (see src/lib/types/review.ts).
 *
 * TEMPLATE - property review
 * {
 *   id: "rev-001",
 *   guestName: "Firstname L.",
 *   propertySlug: "modern-2br-townhome-kitchener",
 *   propertyName: "Modern 2-Bedroom Townhome, Kitchener",
 *   rating: 5,
 *   title: "Short headline in the guest's own words",
 *   body: "The review text exactly as the guest wrote it.",
 *   date: "2026-08-14",
 *   source: "airbnb",
 *   sourceUrl: "https://www.airbnb.ca/rooms/1526494136675906363",
 *   verified: true,
 *   featured: true,
 * }
 *
 * The other listing:
 *   propertySlug: "spacious-3br-house-waterloo"
 *   propertyName: "Spacious 3-Bedroom House, Waterloo"
 *   sourceUrl:    "https://www.airbnb.ca/rooms/1263786824290672744"
 *
 * TEMPLATE - review of VioraRental itself (drives the homepage wall)
 * {
 *   id: "rev-owner-001",
 *   guestName: "Firstname L.",
 *   rating: 5,
 *   body: "What it was like to work with us, in their words.",
 *   date: "2026-08-14",
 *   source: "direct",
 *   verified: true,
 * }
 */
export const reviewRecords: Review[] = [];
