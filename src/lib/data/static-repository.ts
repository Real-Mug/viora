import { propertyRecords } from "@/content/properties";
import { reviewRecords } from "@/content/reviews";
import { showPlaceholders } from "@/lib/config/env";
import { AMENITY_CATALOGUE } from "@/lib/data/amenities";
import type {
  AvailabilityRepository,
  PropertyFacets,
  PropertyRepository,
  ReviewRepository,
} from "@/lib/data/repository";
import type {
  AvailabilityCalendar,
  Paginated,
  Property,
  PropertyQuery,
} from "@/lib/types/property";
import { PROPERTY_TYPE_LABELS, PROVINCE_NAMES } from "@/lib/types/property";
import type { Review, ReviewQuery } from "@/lib/types/review";

/**
 * In-memory implementation backed by the records in src/content.
 *
 * It does the full job - filtering, sorting, faceting, pagination - so that the
 * pages built against it behave identically when the source becomes a database.
 * At a few hundred records this is comfortably fast; past that, the same
 * `PropertyRepository` interface should be implemented against a real query
 * engine instead of extending this class.
 */

/** Placeholder records vanish completely in live mode. */
function visibleProperties(): Property[] {
  return propertyRecords.filter(
    (property) =>
      property.status !== "draft" &&
      property.status !== "archived" &&
      (showPlaceholders || !property.isPlaceholder),
  );
}

function visibleReviews(): Review[] {
  return reviewRecords.filter((review) => showPlaceholders || !review.isPlaceholder);
}

/** The "from" price used on cards and for price filtering. */
export function startingRate(property: Property): number | undefined {
  return property.pricing?.baseNightlyRate;
}

function matches(property: Property, query: PropertyQuery): boolean {
  const { location, pricing } = property;

  if (query.city && location.city.toLowerCase() !== query.city.toLowerCase()) return false;
  if (query.province && location.province !== query.province) return false;
  if (query.locationSlug && location.locationSlug !== query.locationSlug) return false;

  if (query.propertyType?.length && !query.propertyType.includes(property.propertyType)) return false;

  if (query.minGuests != null && property.maxGuests < query.minGuests) return false;
  if (query.minBedrooms != null && property.bedrooms < query.minBedrooms) return false;
  if (query.minBathrooms != null && property.bathrooms < query.minBathrooms) return false;

  if (query.amenityIds?.length) {
    const owned = new Set(property.amenities.map((amenity) => amenity.id));
    if (!query.amenityIds.every((id) => owned.has(id))) return false;
  }

  const rate = pricing?.baseNightlyRate;
  if (query.minNightlyRate != null && (rate == null || rate < query.minNightlyRate)) return false;
  if (query.maxNightlyRate != null && (rate == null || rate > query.maxNightlyRate)) return false;

  if (query.featuredOnly && !property.featured) return false;
  if (query.status?.length && !query.status.includes(property.status)) return false;

  if (query.search) {
    const needle = query.search.trim().toLowerCase();
    const haystack = [
      property.name,
      property.summary,
      location.city,
      location.region ?? "",
      PROVINCE_NAMES[location.province],
      PROPERTY_TYPE_LABELS[property.propertyType],
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(needle)) return false;
  }

  // `availableBetween` is accepted but not applied: no calendar source is
  // connected yet, and silently filtering on absent data would be misleading.
  return true;
}

function sortProperties(items: Property[], sort: PropertyQuery["sort"]): Property[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort(
        (a, b) => (startingRate(a) ?? Number.MAX_SAFE_INTEGER) - (startingRate(b) ?? Number.MAX_SAFE_INTEGER),
      );
    case "price-desc":
      return sorted.sort((a, b) => (startingRate(b) ?? -1) - (startingRate(a) ?? -1));
    case "newest":
      return sorted.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "en-CA"));
    case "featured":
    default:
      return sorted.sort((a, b) => {
        if (Boolean(b.featured) !== Boolean(a.featured)) return Number(b.featured) - Number(a.featured);
        return a.name.localeCompare(b.name, "en-CA");
      });
  }
}

function countBy<T>(items: T[], key: (item: T) => string | undefined) {
  const counts = new Map<string, number>();
  for (const item of items) {
    const value = key(item);
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}

export class StaticPropertyRepository implements PropertyRepository {
  async list(query: PropertyQuery = {}): Promise<Paginated<Property>> {
    const filtered = visibleProperties().filter((property) => matches(property, query));
    const sorted = sortProperties(filtered, query.sort);

    const pageSize = Math.max(1, query.pageSize ?? 12);
    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const page = Math.min(Math.max(1, query.page ?? 1), totalPages);
    const start = (page - 1) * pageSize;

    return {
      items: sorted.slice(start, start + pageSize),
      total: sorted.length,
      page,
      pageSize,
      totalPages,
    };
  }

  async getBySlug(slug: string): Promise<Property | null> {
    return visibleProperties().find((property) => property.slug === slug) ?? null;
  }

  async getById(id: string): Promise<Property | null> {
    return visibleProperties().find((property) => property.id === id) ?? null;
  }

  async allSlugs(): Promise<string[]> {
    return visibleProperties().map((property) => property.slug);
  }

  async facets(): Promise<PropertyFacets> {
    const items = visibleProperties();

    const cityCounts = countBy(items, (property) => property.location.city);
    const provinceCounts = countBy(items, (property) => property.location.province);
    const typeCounts = countBy(items, (property) => property.propertyType);

    const amenityCounts = new Map<string, number>();
    for (const property of items) {
      for (const amenity of property.amenities) {
        amenityCounts.set(amenity.id, (amenityCounts.get(amenity.id) ?? 0) + 1);
      }
    }

    const rates = items
      .map(startingRate)
      .filter((rate): rate is number => typeof rate === "number");

    const guestCounts = items.map((property) => property.maxGuests);
    const bedroomCounts = items.map((property) => property.bedrooms);

    return {
      cities: [...cityCounts.entries()]
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => a.label.localeCompare(b.label, "en-CA")),
      provinces: [...provinceCounts.entries()]
        .map(([value, count]) => ({
          value,
          label: PROVINCE_NAMES[value as keyof typeof PROVINCE_NAMES] ?? value,
          count,
        }))
        .sort((a, b) => a.label.localeCompare(b.label, "en-CA")),
      propertyTypes: [...typeCounts.entries()]
        .map(([value, count]) => ({
          value,
          label: PROPERTY_TYPE_LABELS[value as keyof typeof PROPERTY_TYPE_LABELS] ?? value,
          count,
        }))
        .sort((a, b) => a.label.localeCompare(b.label, "en-CA")),
      amenities: AMENITY_CATALOGUE.filter((amenity) => amenityCounts.has(amenity.id)).map((amenity) => ({
        value: amenity.id,
        label: amenity.label,
        count: amenityCounts.get(amenity.id) ?? 0,
      })),
      guestRange: {
        min: guestCounts.length ? Math.min(...guestCounts) : 0,
        max: guestCounts.length ? Math.max(...guestCounts) : 0,
      },
      bedroomRange: {
        min: bedroomCounts.length ? Math.min(...bedroomCounts) : 0,
        max: bedroomCounts.length ? Math.max(...bedroomCounts) : 0,
      },
      priceRange: rates.length ? { min: Math.min(...rates), max: Math.max(...rates) } : null,
    };
  }

  async related(slug: string, limit = 3): Promise<Property[]> {
    const current = await this.getBySlug(slug);
    if (!current) return [];

    const others = visibleProperties().filter((property) => property.slug !== slug);
    const score = (property: Property) => {
      if (property.location.city === current.location.city) return 3;
      if (property.location.locationSlug === current.location.locationSlug) return 2;
      if (property.location.province === current.location.province) return 1;
      return 0;
    };

    return others
      .map((property) => ({ property, score: score(property) }))
      .sort((a, b) => b.score - a.score || a.property.name.localeCompare(b.property.name, "en-CA"))
      .slice(0, limit)
      .map((entry) => entry.property);
  }
}

export class StaticReviewRepository implements ReviewRepository {
  async list(query: ReviewQuery = {}): Promise<Review[]> {
    let items = visibleReviews();

    if (query.propertySlug) items = items.filter((review) => review.propertySlug === query.propertySlug);
    if (query.source?.length) items = items.filter((review) => query.source!.includes(review.source));
    if (query.minRating != null) items = items.filter((review) => review.rating >= query.minRating!);
    if (query.featuredOnly) items = items.filter((review) => review.featured);

    items = items.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

    return query.limit ? items.slice(0, query.limit) : items;
  }

  async forProperty(propertySlug: string): Promise<Review[]> {
    return this.list({ propertySlug });
  }
}

/**
 * No calendar source is connected. Returning `unconfigured` lets the UI state
 * that availability is confirmed by the team, rather than implying that a
 * property is fully booked or fully open.
 */
export class UnconfiguredAvailabilityRepository implements AvailabilityRepository {
  async getCalendar(propertyId: string): Promise<AvailabilityCalendar> {
    return { propertyId, source: "unconfigured", windows: [] };
  }
}
