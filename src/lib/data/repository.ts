import type {
  AvailabilityCalendar,
  Paginated,
  Property,
  PropertyQuery,
} from "@/lib/types/property";
import type { Review, ReviewQuery } from "@/lib/types/review";

/**
 * Data access contracts.
 *
 * Pages and components depend on these interfaces, never on a concrete source.
 * Today they are satisfied by `StaticPropertyRepository` reading local records.
 * Swapping in a CMS, Postgres table or PMS sync is a matter of writing another
 * implementation and changing one line in src/lib/data/index.ts.
 *
 * Everything is async on purpose - a synchronous local implementation would
 * bake an assumption into every call site that a network-backed source breaks.
 */
export interface PropertyRepository {
  list(query?: PropertyQuery): Promise<Paginated<Property>>;
  getBySlug(slug: string): Promise<Property | null>;
  getById(id: string): Promise<Property | null>;
  /** Every slug that should be statically generated and listed in the sitemap. */
  allSlugs(): Promise<string[]>;
  /** Distinct facet values, so filter UI never hardcodes options. */
  facets(): Promise<PropertyFacets>;
  /** Properties in the same city, then the same province, excluding `slug`. */
  related(slug: string, limit?: number): Promise<Property[]>;
}

export type PropertyFacets = {
  cities: { value: string; label: string; count: number }[];
  provinces: { value: string; label: string; count: number }[];
  propertyTypes: { value: string; label: string; count: number }[];
  amenities: { value: string; label: string; count: number }[];
  guestRange: { min: number; max: number };
  bedroomRange: { min: number; max: number };
  priceRange: { min: number; max: number } | null;
};

export interface ReviewRepository {
  list(query?: ReviewQuery): Promise<Review[]>;
  forProperty(propertySlug: string): Promise<Review[]>;
}

/**
 * Availability is unimplemented by design. The static repository returns a
 * calendar with `source: "unconfigured"`, which the UI reads as "no calendar
 * connected" rather than "no dates available".
 */
export interface AvailabilityRepository {
  getCalendar(propertyId: string): Promise<AvailabilityCalendar>;
}
