/**
 * The canonical property model.
 *
 * This shape is deliberately storage-agnostic: today it is satisfied by local
 * TypeScript records, later by a CMS, database or channel-manager sync. Adding
 * a persistence layer means implementing `PropertyRepository`
 * (see src/lib/data/repository.ts) - no component changes.
 */

export type Province =
  | "AB" | "BC" | "MB" | "NB" | "NL" | "NS" | "NT" | "NU"
  | "ON" | "PE" | "QC" | "SK" | "YT";

export const PROVINCE_NAMES: Record<Province, string> = {
  AB: "Alberta",
  BC: "British Columbia",
  MB: "Manitoba",
  NB: "New Brunswick",
  NL: "Newfoundland and Labrador",
  NS: "Nova Scotia",
  NT: "Northwest Territories",
  NU: "Nunavut",
  ON: "Ontario",
  PE: "Prince Edward Island",
  QC: "Quebec",
  SK: "Saskatchewan",
  YT: "Yukon",
};

export type PropertyType =
  | "house"
  | "apartment"
  | "condo"
  | "townhouse"
  | "villa"
  | "cottage"
  | "cabin"
  | "loft"
  | "suite";

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  house: "House",
  apartment: "Apartment",
  condo: "Condo",
  townhouse: "Townhouse",
  villa: "Villa",
  cottage: "Cottage",
  cabin: "Cabin",
  loft: "Loft",
  suite: "Suite",
};

/** Grouped so filter UI and property pages can render amenities by category. */
export type AmenityCategory =
  | "essentials"
  | "kitchen"
  | "outdoor"
  | "entertainment"
  | "accessibility"
  | "safety"
  | "parking"
  | "workspace";

export type Amenity = {
  id: string;
  label: string;
  category: AmenityCategory;
  /** Optional detail shown on the property page, e.g. "Two allocated spots". */
  note?: string;
};

export type PropertyImage = {
  /** Path under /public, or an absolute CDN URL once images move off-host. */
  src: string;
  /** Required. Describes the room/view for screen readers and image search. */
  alt: string;
  width: number;
  height: number;
  /** The single image used for cards, OG tags and gallery cover. */
  isCover?: boolean;
  caption?: string;
};

export type PropertyVideo = {
  /** Embed URL (YouTube/Vimeo) or a self-hosted file path. */
  src: string;
  title: string;
  provider: "youtube" | "vimeo" | "file";
  posterSrc?: string;
};

/**
 * Pricing rules. Every field is optional because a property may be managed
 * without Viora Hosting publishing its rates. `null`/absent means "not published"
 * and the UI says so rather than inventing a number.
 */
export type PricingRule = {
  currency: "CAD";
  /** Lowest published nightly rate, used for the "from $X" card label. */
  baseNightlyRate?: number;
  weekendNightlyRate?: number;
  /** Date-ranged overrides, e.g. peak summer. ISO dates, inclusive. */
  seasonalRates?: { label: string; startDate: string; endDate: string; nightlyRate: number }[];
  cleaningFee?: number;
  /** Percentage of the accommodation subtotal, 0-1. */
  serviceFeeRate?: number;
  taxRate?: number;
  minimumStayNights?: number;
  maximumStayNights?: number;
  /** Guests included before `additionalGuestFee` applies. */
  guestsIncluded?: number;
  additionalGuestFee?: number;
  petFee?: number;
  petsAllowed?: boolean;
  discounts?: { label: string; type: "weekly" | "monthly" | "earlyBird" | "lastMinute"; rate: number }[];
};

/**
 * Availability is intentionally a thin interface. Nothing populates it today -
 * it is the seam where a channel manager or Airbnb calendar sync will plug in.
 */
export type AvailabilityWindow = {
  /** ISO date, inclusive. */
  start: string;
  /** ISO date, exclusive. */
  end: string;
  status: "available" | "booked" | "blocked";
};

export type AvailabilityCalendar = {
  propertyId: string;
  /** Where the calendar came from. `unconfigured` means no source is connected. */
  source: "unconfigured" | "manual" | "airbnb-ical" | "pms" | "channel-manager";
  lastSyncedAt?: string;
  windows: AvailabilityWindow[];
};

export type PropertyStatus = "draft" | "active" | "paused" | "archived";

/**
 * A rating carried over from the platform a property is listed on.
 *
 * This is NOT a Viora Hosting average and is deliberately not mixed into one: it
 * is a figure copied from a public listing page, so it is stored with the URL a
 * reader can check it against and the date it was last verified. Guest reviews
 * written on this site live in src/content/reviews.ts and are averaged
 * separately.
 */
export type ExternalRating = {
  source: "airbnb" | "vrbo" | "booking.com" | "google";
  /** Overall score out of 5, exactly as the source publishes it. */
  ratingValue: number;
  reviewCount: number;
  /** The public listing page this figure came from. */
  url: string;
  /** Per-category sub-scores where the source publishes them. */
  categories?: { label: string; value: number }[];
  /** ISO date this figure was last checked against the source. */
  checkedAt: string;
};

export type Property = {
  id: string;
  /** URL segment: /properties/[slug] */
  slug: string;
  name: string;
  /** One or two sentences for cards and meta descriptions. */
  summary: string;
  /** Full description. Plain paragraphs, rendered as <p> - no raw HTML. */
  description: string[];

  location: {
    city: string;
    /** Neighbourhood or region, e.g. "Muskoka Lakes". */
    region?: string;
    province: Province;
    country: "CA";
    /** Approximate coordinates only. Never publish an exact address. */
    coordinates?: { lat: number; lng: number };
    /** Free text shown under "Getting around". */
    neighbourhoodNotes?: string[];
    /** Slug of the /locations/[city] page this property belongs to. */
    locationSlug?: string;
  };

  propertyType: PropertyType;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  maxGuests: number;

  amenities: Amenity[];
  images: PropertyImage[];
  videos?: PropertyVideo[];

  houseRules: string[];
  pricing?: PricingRule;

  /** Outbound links. Any may be absent; the UI hides the button when missing. */
  airbnbUrl?: string;
  /** Internal direct-booking route once the booking module ships. */
  directBookingUrl?: string;
  /** Option B in the architecture: the property's own standalone website. */
  externalWebsiteUrl?: string;

  /** Verified rating from the listing platform, shown with a link to its source. */
  externalRating?: ExternalRating;

  status: PropertyStatus;
  /** Shown first on the properties index. */
  featured?: boolean;

  seoTitle?: string;
  seoDescription?: string;

  createdAt: string;
  updatedAt: string;

  /**
   * True for demo records shipped before real inventory exists. Placeholder
   * records are hidden entirely when NEXT_PUBLIC_CONTENT_MODE=live, and carry a
   * visible "Sample listing" label otherwise. Never set this on real inventory.
   */
  isPlaceholder?: boolean;
};

/** Query object accepted by the repository. Designed for hundreds of records. */
export type PropertyQuery = {
  city?: string;
  province?: Province;
  locationSlug?: string;
  propertyType?: PropertyType[];
  minGuests?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  amenityIds?: string[];
  maxNightlyRate?: number;
  minNightlyRate?: number;
  /** Reserved for the booking module; ignored until a calendar source exists. */
  availableBetween?: { start: string; end: string };
  featuredOnly?: boolean;
  status?: PropertyStatus[];
  search?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "newest" | "name";
  page?: number;
  pageSize?: number;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
