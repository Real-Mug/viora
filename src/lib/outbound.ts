/**
 * Where an "on Airbnb" link should point.
 *
 * Every Airbnb link on the site goes through /go/airbnb/<slug>/ so the click
 * shows up as a page view in Vercel Web Analytics - Airbnb itself never tells
 * a host where a guest came from. Plain module (no "use client") so server
 * and client components can both call it.
 */
export function airbnbOutHref(slug: string): string {
  return `/go/airbnb/${slug}/`;
}
