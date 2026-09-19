/**
 * Location pages exist only for markets VioraRental genuinely serves. There is
 * deliberately no generator that fans a template out across every Canadian
 * city - each record must carry unique, locally useful content.
 */
import type { Province } from "./property";

export type ServiceArea = {
  slug: string;
  city: string;
  province: Province;
  /** True once the team has confirmed they actively take work in this market. */
  active: boolean;
  /** One sentence for the /locations index. */
  summary: string;
  /** Page intro paragraphs - must be specific to this market. */
  intro: string[];
  /** Neighbourhoods or sub-regions covered. */
  areasServed: string[];
  /**
   * Genuinely local operating context: licensing regimes, seasonality, guest
   * mix. PLACEHOLDER entries must be replaced with verified local facts, and
   * regulatory notes must be checked against the current municipal bylaw.
   */
  localNotes: { title: string; body: string }[];
  /** Slugs of services emphasised in this market. */
  highlightedServices: string[];
  seoTitle: string;
  seoDescription: string;
  coordinates?: { lat: number; lng: number };
};
