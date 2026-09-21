import { amenities } from "@/lib/data/amenities";
import type { Property, PropertyImage } from "@/lib/types/property";

/**
 * PROPERTY RECORDS
 * ----------------------------------------------------------------------------
 * This is the only file to edit when adding or updating a property. Nothing
 * here is hardcoded into a component, and the repository in src/lib/data is
 * built to page and filter over hundreds of these records.
 *
 * Both records below are REAL inventory, transcribed from the live Airbnb
 * listings linked in `airbnbUrl`. Neither carries `isPlaceholder`, so both are
 * published in every content mode.
 *
 * Rules that apply when editing these, or adding a third:
 *
 *   - Copy comes from the host's own listing text. Do not embellish it.
 *   - `pricing` is deliberately ABSENT. Airbnb only quotes a nightly rate once
 *     dates are chosen, so there is no single honest "from $X" to publish. The
 *     UI handles a missing `pricing` by pointing at Airbnb for live rates.
 *     Do not invent a number to fill the gap.
 *   - `houseRules` repeats only what the host states in their own description.
 *     The full rule set lives on Airbnb and is linked from the property page.
 *   - `externalRating` is copied from the public listing page, with the date it
 *     was checked. Re-check it when you touch the record; it will drift.
 *   - Photography is the host's own, exported from the listing and converted to
 *     WebP at 1600x1067.
 *
 * To add a property: copy a record, replace every field with verified
 * information, and put photography in /public/images/properties/<slug>/.
 * Guest reviews live in src/content/reviews.ts and must come from a real source.
 */

/** Builds the image set for a property from the files in /public/images/properties/<slug>/. */
function imageSet(slug: string, shots: { file: string; alt: string; caption?: string }[]): PropertyImage[] {
  return shots.map((shot, index) => ({
    src: `/images/properties/${slug}/${shot.file}`,
    alt: shot.alt,
    width: 1600,
    height: 1067,
    isCover: index === 0,
    caption: shot.caption,
  }));
}

const CREATED = "2026-09-20T00:00:00.000Z";
const UPDATED = "2026-09-20T00:00:00.000Z";

/** The date the Airbnb ratings below were last read off the listing pages. */
const RATINGS_CHECKED = "2026-09-20";

export const propertyRecords: Property[] = [
  {
    id: "prop-kitchener-townhome",
    slug: "modern-2br-townhome-kitchener",
    name: "Modern 2-Bedroom Townhome, Kitchener",
    summary:
      "A three-level townhome in a quiet, family-friendly Kitchener neighbourhood, with free parking, a dedicated workspace and self check-in. Sleeps four.",
    description: [
      "A modern three-level townhouse in a quiet, family-friendly neighbourhood in Kitchener. A private ground-floor entrance leads up to a bright open-concept living room, dining area, fully equipped kitchen and a powder room on the second floor. The third floor holds two bedrooms and a full bathroom, which keeps the sleeping space separate from the living space.",
      "Free parking, high-speed Wi-Fi, a dedicated workspace, in-suite laundry and self check-in are all included, so the home works equally well for families, couples, business travellers and extended stays.",
      "It sits minutes from Highway 7/8 and the 401, Fairview Park Mall, Chicopee Ski & Summer Resort, and the Waterloo Region's universities and business centres.",
      "Please note the property is a three-level townhouse with stairs between every floor, so it may not suit guests with limited mobility.",
    ],
    location: {
      city: "Kitchener",
      region: "Waterloo Region",
      province: "ON",
      country: "CA",
      coordinates: { lat: 43.38036, lng: -80.47895 },
      locationSlug: "waterloo-region",
      neighbourhoodNotes: [
        "Minutes from Highway 7/8 and Highway 401, so the drive to Toronto or Guelph is straightforward.",
        "Fairview Park Mall, shopping and restaurants are a short drive away.",
        "Chicopee Ski & Summer Resort is nearby, as are the University of Waterloo, Wilfrid Laurier and Conestoga College.",
      ],
    },
    propertyType: "townhouse",
    bedrooms: 2,
    beds: 2,
    bathrooms: 2.5,
    maxGuests: 4,
    amenities: amenities(
      "wifi", "air-conditioning", "heating", "washer", "dryer", "linens",
      "self-check-in", "private-entrance", "bathtub", "hair-dryer", "iron", "long-term-stays",
      "full-kitchen", "dishwasher", "dining-area", "refrigerator", "microwave", "oven", "kettle", "toaster",
      "patio",
      "smart-tv",
      "free-parking", "street-parking",
      "dedicated-workspace",
      "smoke-alarm", "carbon-monoxide-alarm",
    ),
    images: imageSet("modern-2br-townhome-kitchener", [
      { file: "01-living-room.webp", alt: "Open-concept living room with a sofa, armchair and wall-mounted television" },
      { file: "02-living-dining.webp", alt: "Living and dining area on the main level of the townhome" },
      { file: "03-kitchen.webp", alt: "Fully equipped kitchen with full-size appliances and counter space" },
      { file: "04-kitchen-dining.webp", alt: "Kitchen counter and adjoining dining seating" },
      { file: "05-bedroom-one.webp", alt: "Primary bedroom with a queen bed and room-darkening shades" },
      { file: "06-bedroom-two.webp", alt: "Second bedroom with a double bed and clothing storage" },
      { file: "07-bathroom.webp", alt: "Full bathroom with a bathtub and shower" },
      { file: "08-workspace.webp", alt: "Dedicated workspace with a desk and chair" },
      { file: "09-laundry.webp", alt: "In-suite washer and dryer" },
      { file: "10-exterior.webp", alt: "Exterior of the townhome showing the private entrance" },
    ]),
    houseRules: [
      "Self check-in, so arrival is easy at any time after the check-in hour.",
      "Quiet hours are observed - the townhouse sits in a family-friendly community and the hosts ask guests to respect the neighbours.",
      "Maximum four guests.",
      "The home has stairs between all three levels and may not suit guests with limited mobility.",
      "The full, current house rules are on the Airbnb listing.",
    ],
    airbnbUrl: "https://www.airbnb.ca/rooms/1526494136675906363",
    externalRating: {
      source: "airbnb",
      ratingValue: 4.83,
      reviewCount: 12,
      url: "https://www.airbnb.ca/rooms/1526494136675906363",
      categories: [
        { label: "Cleanliness", value: 4.5 },
        { label: "Accuracy", value: 4.8 },
        { label: "Check-in", value: 4.9 },
        { label: "Communication", value: 5.0 },
        { label: "Location", value: 4.7 },
        { label: "Value", value: 4.8 },
      ],
      checkedAt: RATINGS_CHECKED,
    },
    status: "active",
    featured: true,
    seoTitle: "Modern 2-Bedroom Townhome in Kitchener, Ontario",
    seoDescription:
      "Three-level, two-bedroom townhome in Kitchener with free parking, a dedicated workspace, in-suite laundry and self check-in. Sleeps four. Managed by Viora Hosting.",
    createdAt: CREATED,
    updatedAt: UPDATED,
  },

  {
    id: "prop-waterloo-house",
    slug: "spacious-3br-house-waterloo",
    name: "Spacious 3-Bedroom House, Waterloo",
    summary:
      "A pet-friendly three-bedroom house minutes from the University of Waterloo and WLU, with two living areas, a fenced backyard and driveway parking. Sleeps six.",
    description: [
      "A spacious three-bedroom home in Waterloo, set up for families, visiting parents and students, business travellers and researchers, and long-term stays.",
      "The house has two separate living areas, a fully stocked kitchen with a coffee and tea station, three bedrooms with queen beds and fresh linens, and a dedicated workspace with fast Wi-Fi for anyone working remotely. Outside there is a private, fully fenced backyard and driveway parking for multiple cars.",
      "It sits in a quiet, family-friendly neighbourhood minutes from the University of Waterloo and Wilfrid Laurier, while staying close to Uptown Waterloo's restaurants and attractions. Pets are welcome.",
      "Check-in is self-service via a keypad, with the access code shared a few days before arrival. Please note the property has stairs and an exterior security camera for safety.",
    ],
    location: {
      city: "Waterloo",
      region: "Waterloo Region",
      province: "ON",
      country: "CA",
      coordinates: { lat: 43.4927, lng: -80.5055 },
      locationSlug: "waterloo-region",
      neighbourhoodNotes: [
        "Minutes from the University of Waterloo and Wilfrid Laurier University.",
        "Uptown Waterloo's restaurants, shops and attractions are a short drive away.",
        "A quiet, residential street with driveway parking for several vehicles.",
      ],
    },
    propertyType: "house",
    bedrooms: 3,
    beds: 3,
    bathrooms: 2.5,
    maxGuests: 6,
    amenities: amenities(
      "wifi", "air-conditioning", "heating", "washer", "dryer", "linens",
      "self-check-in", "private-entrance", "bathtub", "hair-dryer", "iron",
      "long-term-stays", "pets-allowed",
      "full-kitchen", "dishwasher", "coffee-maker", "dining-area", "refrigerator", "microwave", "oven", "kettle",
      "backyard", "bbq",
      "smart-tv",
      "free-parking",
      "dedicated-workspace",
      "smoke-alarm", "carbon-monoxide-alarm", "fire-extinguisher", "first-aid-kit",
      "security-camera", "noise-monitor",
    ),
    images: imageSet("spacious-3br-house-waterloo", [
      { file: "01-living-room.webp", alt: "Main living room with sectional seating, a television and an open dining area" },
      { file: "02-second-living.webp", alt: "Second living area with natural light and additional seating" },
      { file: "03-kitchen.webp", alt: "Fully stocked kitchen with full-size appliances" },
      { file: "04-dining.webp", alt: "Dining area with a table and seating" },
      { file: "05-bedroom-one.webp", alt: "First bedroom with a queen bed" },
      { file: "06-bedroom-two.webp", alt: "Second bedroom with a queen bed" },
      { file: "07-bedroom-three.webp", alt: "Third bedroom with a queen bed" },
      { file: "08-bathroom.webp", alt: "Full bathroom with a bathtub" },
      { file: "09-workspace.webp", alt: "Dedicated home-office workspace with a desk" },
      { file: "10-backyard.webp", alt: "Private, fully fenced backyard" },
      { file: "11-exterior.webp", alt: "Exterior of the house with driveway parking" },
    ]),
    houseRules: [
      "Self check-in by keypad. The access code is shared a few days before arrival.",
      "Pets are welcome.",
      "Maximum six guests.",
      "The property has stairs, and an exterior security camera is in use for safety.",
      "The full, current house rules are on the Airbnb listing.",
    ],
    airbnbUrl: "https://www.airbnb.ca/rooms/1263786824290672744",
    externalRating: {
      source: "airbnb",
      ratingValue: 4.75,
      reviewCount: 16,
      url: "https://www.airbnb.ca/rooms/1263786824290672744",
      categories: [
        { label: "Cleanliness", value: 4.3 },
        { label: "Accuracy", value: 4.8 },
        { label: "Check-in", value: 4.9 },
        { label: "Communication", value: 5.0 },
        { label: "Location", value: 4.9 },
        { label: "Value", value: 4.8 },
      ],
      checkedAt: RATINGS_CHECKED,
    },
    status: "active",
    featured: true,
    seoTitle: "Spacious 3-Bedroom House in Waterloo, Ontario",
    seoDescription:
      "Pet-friendly three-bedroom house in Waterloo with two living areas, a fenced backyard, workspace and driveway parking. Sleeps six. Managed by Viora Hosting.",
    createdAt: CREATED,
    updatedAt: UPDATED,
  },
];
