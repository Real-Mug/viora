import { amenities } from "@/lib/data/amenities";
import type { Property, PropertyImage } from "@/lib/types/property";

/**
 * PROPERTY RECORDS
 * ----------------------------------------------------------------------------
 * This is the only file to edit when adding or updating a property. Nothing
 * here is hardcoded into a component, and the repository in src/lib/data is
 * built to page and filter over hundreds of these records.
 *
 * IMPORTANT - every record below is marked `isPlaceholder: true`.
 *
 * They exist so the site can be reviewed and demonstrated before real inventory
 * is onboarded. They are NOT claims about properties under management:
 *   - with NEXT_PUBLIC_CONTENT_MODE=placeholder (the default) they render with
 *     a visible "Sample listing" label,
 *   - with NEXT_PUBLIC_CONTENT_MODE=live they disappear from the site, the
 *     sitemap and the structured data entirely.
 *
 * To publish a real property: copy a record, replace every field with verified
 * information, swap the images for real photography, and DELETE the
 * `isPlaceholder` flag. Ratings and reviews live in src/content/reviews.ts and
 * must come from a real source.
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

const TIMESTAMP = "2026-01-15T00:00:00.000Z";

export const propertyRecords: Property[] = [
  {
    id: "prop-001",
    slug: "lakefront-retreat-muskoka",
    name: "Lakefront Retreat, Muskoka",
    summary:
      "A four-bedroom lakefront cottage on a quiet bay, set up for multi-family stays and long weekends on the water.",
    description: [
      "This cottage sits on a sheltered stretch of shoreline with a private dock, a deep swimming area and western exposure that holds the light well into the evening. The main floor opens onto a covered deck, so meals and mornings tend to move outside for most of the season.",
      "Inside, the layout separates the sleeping wing from the living space, which makes it workable for two families sharing the week. The kitchen is fully equipped for cooking at home, and there is a dedicated workspace for anyone extending a stay into the working week.",
      "VioraRental coordinates turnovers, guest communication and seasonal maintenance for this property, including dock and water-system checks at opening and close.",
    ],
    location: {
      city: "Muskoka Lakes",
      region: "Muskoka",
      province: "ON",
      country: "CA",
      coordinates: { lat: 45.1, lng: -79.6 },
      locationSlug: "muskoka",
      neighbourhoodNotes: [
        "About two and a half hours north of Toronto by car; a vehicle is necessary.",
        "The nearest village for groceries, fuel and a liquor store is a ten-minute drive.",
        "Cell coverage is reliable at the cottage but patchy on some of the surrounding side roads.",
      ],
    },
    propertyType: "cottage",
    bedrooms: 4,
    beds: 6,
    bathrooms: 2,
    maxGuests: 8,
    amenities: amenities(
      "wifi", "heating", "washer", "dryer", "linens", "self-check-in",
      "full-kitchen", "dishwasher", "coffee-maker", "dining-area",
      "waterfront", "firepit", "bbq", "patio",
      "smart-tv", "board-games",
      "free-parking",
      "dedicated-workspace",
      "smoke-alarm", "carbon-monoxide-alarm", "fire-extinguisher", "first-aid-kit",
    ),
    images: imageSet("lakefront-retreat-muskoka", [
      { file: "01-exterior-lake-view.svg", alt: "Placeholder image for the lakefront exterior and dock at the Muskoka cottage" },
      { file: "02-living-room.svg", alt: "Placeholder image for the open-plan living room with lake-facing windows" },
      { file: "03-kitchen.svg", alt: "Placeholder image for the cottage kitchen and dining area" },
      { file: "04-primary-bedroom.svg", alt: "Placeholder image for the primary bedroom" },
      { file: "05-deck.svg", alt: "Placeholder image for the covered deck overlooking the bay" },
    ]),
    houseRules: [
      "No parties or events.",
      "No smoking anywhere on the property, indoors or out.",
      "Quiet hours between 11pm and 7am, in line with the local noise bylaw.",
      "Maximum eight guests, including children.",
      "Fires in the fire pit only, and only when no fire ban is in effect.",
    ],
    pricing: {
      currency: "CAD",
      baseNightlyRate: 475,
      weekendNightlyRate: 545,
      seasonalRates: [
        { label: "Peak summer", startDate: "2026-06-26", endDate: "2026-09-07", nightlyRate: 695 },
      ],
      cleaningFee: 225,
      serviceFeeRate: 0.05,
      taxRate: 0.13,
      minimumStayNights: 3,
      guestsIncluded: 6,
      additionalGuestFee: 35,
      petsAllowed: true,
      petFee: 75,
      discounts: [{ label: "Weekly stay discount", type: "weekly", rate: 0.1 }],
    },
    status: "active",
    featured: true,
    seoTitle: "Lakefront Cottage Rental in Muskoka, Ontario",
    seoDescription:
      "Four-bedroom lakefront cottage in Muskoka with a private dock, sleeping eight. Professionally managed by VioraRental.",
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    isPlaceholder: true,
  },

  {
    id: "prop-002",
    slug: "harbourfront-suite-toronto",
    name: "Harbourfront Suite, Toronto",
    summary:
      "A two-bedroom condo near the waterfront, built for business travellers and couples who want to walk to most of downtown.",
    description: [
      "A corner suite on a high floor with south-facing windows over the harbour. The building sits within walking distance of Union Station, the financial district and the waterfront trail, which makes it a practical base for both short business trips and city weekends.",
      "The second bedroom works as either a guest room or a quiet office, and the suite has a dedicated desk with an external monitor. Building amenities include a gym and a concierge desk.",
      "VioraRental handles guest messaging, check-in coordination and cleaning for this suite, and manages the building access process with the concierge on each arrival.",
    ],
    location: {
      city: "Toronto",
      region: "Harbourfront",
      province: "ON",
      country: "CA",
      coordinates: { lat: 43.64, lng: -79.38 },
      locationSlug: "toronto",
      neighbourhoodNotes: [
        "Ten minutes on foot to Union Station for the UP Express to Pearson.",
        "Streetcar and subway access within a few blocks.",
        "Paid underground parking is available in the building; street parking is limited.",
      ],
    },
    propertyType: "condo",
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    maxGuests: 4,
    amenities: amenities(
      "wifi", "heating", "air-conditioning", "washer", "dryer", "linens", "self-check-in",
      "full-kitchen", "dishwasher", "coffee-maker", "dining-area",
      "balcony",
      "smart-tv", "gym-access",
      "elevator", "step-free-entry",
      "dedicated-workspace", "monitor",
      "smoke-alarm", "carbon-monoxide-alarm", "fire-extinguisher",
    ),
    images: imageSet("harbourfront-suite-toronto", [
      { file: "01-living-room.svg", alt: "Placeholder image for the living room with floor-to-ceiling harbour views" },
      { file: "02-kitchen.svg", alt: "Placeholder image for the open kitchen and island seating" },
      { file: "03-primary-bedroom.svg", alt: "Placeholder image for the primary bedroom" },
      { file: "04-workspace.svg", alt: "Placeholder image for the dedicated workspace with an external monitor" },
      { file: "05-balcony.svg", alt: "Placeholder image for the balcony overlooking the harbour" },
    ]),
    houseRules: [
      "No parties or events; the building enforces a strict noise policy.",
      "No smoking, including on the balcony.",
      "Quiet hours between 11pm and 7am.",
      "Maximum four guests. Visitors must be registered with the concierge.",
      "No pets, as required by the building.",
    ],
    pricing: {
      currency: "CAD",
      baseNightlyRate: 245,
      weekendNightlyRate: 285,
      cleaningFee: 120,
      serviceFeeRate: 0.05,
      taxRate: 0.13,
      minimumStayNights: 2,
      guestsIncluded: 2,
      additionalGuestFee: 30,
      petsAllowed: false,
      discounts: [
        { label: "Weekly stay discount", type: "weekly", rate: 0.12 },
        { label: "Monthly stay discount", type: "monthly", rate: 0.2 },
      ],
    },
    status: "active",
    featured: true,
    seoTitle: "Harbourfront Condo Rental, Downtown Toronto",
    seoDescription:
      "Two-bedroom condo near Toronto's waterfront with harbour views, a workspace and walkable downtown access. Managed by VioraRental.",
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    isPlaceholder: true,
  },

  {
    id: "prop-003",
    slug: "mountain-view-chalet-whistler",
    name: "Mountain View Chalet, Whistler",
    summary:
      "A three-bedroom chalet a short shuttle from the lifts, with a hot tub and a drying room for ski gear.",
    description: [
      "Built for winter use, with a mud room and drying space by the entry, in-floor heating through the main level and a hot tub on the rear deck. The chalet is on a quiet residential road with a shuttle stop nearby and a ten-minute drive to the village.",
      "The main living space centres on a wood stove and opens to a deck with mountain views. In summer, the same location puts guests close to the bike park, the lake loop and the valley trail network.",
      "VioraRental coordinates seasonal turnovers for this property, including hot-tub servicing, snow clearing and winter access checks.",
    ],
    location: {
      city: "Whistler",
      region: "Sea to Sky",
      province: "BC",
      country: "CA",
      coordinates: { lat: 50.11, lng: -122.95 },
      locationSlug: "whistler",
      neighbourhoodNotes: [
        "Roughly two hours from Vancouver on the Sea to Sky Highway; winter tyres are required in season.",
        "The village shuttle stop is a short walk from the door.",
        "Groceries and rentals are in Whistler Village, about ten minutes by car.",
      ],
    },
    propertyType: "cabin",
    bedrooms: 3,
    beds: 5,
    bathrooms: 2,
    maxGuests: 6,
    amenities: amenities(
      "wifi", "heating", "washer", "dryer", "linens", "self-check-in",
      "full-kitchen", "dishwasher", "coffee-maker", "dining-area",
      "hot-tub", "patio", "bbq",
      "smart-tv", "sound-system", "board-games",
      "free-parking", "ev-charger",
      "smoke-alarm", "carbon-monoxide-alarm", "fire-extinguisher", "first-aid-kit",
    ),
    images: imageSet("mountain-view-chalet-whistler", [
      { file: "01-exterior.svg", alt: "Placeholder image for the chalet exterior in winter" },
      { file: "02-living-room.svg", alt: "Placeholder image for the living room with a wood stove" },
      { file: "03-kitchen.svg", alt: "Placeholder image for the chalet kitchen" },
      { file: "04-bedroom.svg", alt: "Placeholder image for a bedroom with mountain views" },
      { file: "05-hot-tub.svg", alt: "Placeholder image for the hot tub on the rear deck" },
    ]),
    houseRules: [
      "No parties or events.",
      "No smoking anywhere on the property.",
      "Quiet hours between 10pm and 7am, including the hot tub deck.",
      "Maximum six guests.",
      "Ski and bike gear belongs in the drying room, not the living areas.",
    ],
    pricing: {
      currency: "CAD",
      baseNightlyRate: 520,
      weekendNightlyRate: 610,
      seasonalRates: [
        { label: "Winter peak", startDate: "2026-12-18", endDate: "2027-01-05", nightlyRate: 895 },
      ],
      cleaningFee: 260,
      serviceFeeRate: 0.05,
      taxRate: 0.155,
      minimumStayNights: 3,
      guestsIncluded: 4,
      additionalGuestFee: 45,
      petsAllowed: false,
      discounts: [{ label: "Weekly stay discount", type: "weekly", rate: 0.1 }],
    },
    status: "active",
    featured: true,
    seoTitle: "Three-Bedroom Chalet Rental in Whistler, BC",
    seoDescription:
      "Three-bedroom Whistler chalet with a hot tub, drying room and shuttle access to the lifts. Professionally managed by VioraRental.",
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    isPlaceholder: true,
  },

  {
    id: "prop-004",
    slug: "plateau-apartment-montreal",
    name: "Plateau Apartment, Montreal",
    summary:
      "A bright one-bedroom on a tree-lined street in the Plateau, with a balcony and a walkable neighbourhood.",
    description: [
      "A second-floor apartment in a classic Montreal walk-up, with tall windows, original mouldings and a small front balcony over the street. The Plateau location puts cafes, bakeries and Mont-Royal within a few minutes on foot.",
      "The space suits couples and solo travellers on longer stays; there is a proper desk, fast internet and a well-equipped kitchen for cooking at home. The building has an exterior staircase typical of the neighbourhood, so it is not step-free.",
      "VioraRental manages guest communication, self check-in and cleaning coordination for this apartment, with bilingual messaging for guests arriving from within Quebec.",
    ],
    location: {
      city: "Montreal",
      region: "Le Plateau-Mont-Royal",
      province: "QC",
      country: "CA",
      coordinates: { lat: 45.52, lng: -73.58 },
      locationSlug: "montreal",
      neighbourhoodNotes: [
        "Two metro stations are within a fifteen-minute walk.",
        "Street parking requires a visitor permit; the listing includes instructions.",
        "Quebec regulates short-term rentals through a provincial registration regime; the registration number is displayed on the listing.",
      ],
    },
    propertyType: "apartment",
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: amenities(
      "wifi", "heating", "air-conditioning", "washer", "linens", "self-check-in",
      "full-kitchen", "coffee-maker", "dining-area",
      "balcony",
      "smart-tv",
      "street-parking",
      "dedicated-workspace",
      "smoke-alarm", "carbon-monoxide-alarm", "fire-extinguisher",
    ),
    images: imageSet("plateau-apartment-montreal", [
      { file: "01-living-room.svg", alt: "Placeholder image for the living room with tall windows" },
      { file: "02-kitchen.svg", alt: "Placeholder image for the apartment kitchen" },
      { file: "03-bedroom.svg", alt: "Placeholder image for the bedroom" },
      { file: "04-balcony.svg", alt: "Placeholder image for the front balcony over the street" },
    ]),
    houseRules: [
      "No parties or events; this is a residential building with neighbours above and below.",
      "No smoking.",
      "Quiet hours between 10pm and 8am.",
      "Maximum two guests.",
      "No pets.",
    ],
    pricing: {
      currency: "CAD",
      baseNightlyRate: 155,
      cleaningFee: 85,
      serviceFeeRate: 0.05,
      taxRate: 0.1498,
      minimumStayNights: 2,
      guestsIncluded: 2,
      petsAllowed: false,
      discounts: [{ label: "Monthly stay discount", type: "monthly", rate: 0.25 }],
    },
    status: "active",
    seoTitle: "One-Bedroom Apartment Rental, Plateau Montreal",
    seoDescription:
      "Bright one-bedroom apartment in Montreal's Plateau with a balcony and workspace, suited to longer stays. Managed by VioraRental.",
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    isPlaceholder: true,
  },

  {
    id: "prop-005",
    slug: "bow-river-townhouse-calgary",
    name: "Bow River Townhouse, Calgary",
    summary:
      "A three-bedroom townhouse close to the river pathway, with a garage and a ground-floor bedroom.",
    description: [
      "An inner-city townhouse a few minutes from the Bow River pathway, with a private garage and a fenced patio. The ground floor includes a bedroom and full bathroom, which makes the property workable for guests who would rather not manage stairs.",
      "The layout suits families and relocating professionals on medium-length stays: a full kitchen, in-suite laundry and a living area that is genuinely usable for a group of five or six.",
      "VioraRental coordinates cleaning, maintenance and guest support for this property, including snow clearing on the walkway through the winter months.",
    ],
    location: {
      city: "Calgary",
      region: "Inner city",
      province: "AB",
      country: "CA",
      coordinates: { lat: 51.05, lng: -114.07 },
      locationSlug: "calgary",
      neighbourhoodNotes: [
        "A short walk to the Bow River pathway and a ten-minute drive to downtown.",
        "Calgary requires a business licence for short-term rentals; the licence number is displayed on the listing.",
        "The garage fits one vehicle, with additional street parking available.",
      ],
    },
    propertyType: "townhouse",
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    maxGuests: 6,
    amenities: amenities(
      "wifi", "heating", "air-conditioning", "washer", "dryer", "linens", "self-check-in",
      "full-kitchen", "dishwasher", "coffee-maker", "dining-area",
      "patio", "bbq",
      "smart-tv",
      "ground-floor-bedroom", "step-free-entry",
      "garage", "street-parking",
      "dedicated-workspace",
      "smoke-alarm", "carbon-monoxide-alarm", "fire-extinguisher", "first-aid-kit",
    ),
    images: imageSet("bow-river-townhouse-calgary", [
      { file: "01-exterior.svg", alt: "Placeholder image for the townhouse exterior" },
      { file: "02-living-room.svg", alt: "Placeholder image for the living room" },
      { file: "03-kitchen.svg", alt: "Placeholder image for the kitchen and dining area" },
      { file: "04-bedroom.svg", alt: "Placeholder image for the ground-floor bedroom" },
    ]),
    houseRules: [
      "No parties or events.",
      "No smoking indoors or on the patio.",
      "Quiet hours between 10pm and 7am.",
      "Maximum six guests.",
      "Pets considered on request; ask before booking.",
    ],
    pricing: {
      currency: "CAD",
      baseNightlyRate: 215,
      weekendNightlyRate: 240,
      cleaningFee: 140,
      serviceFeeRate: 0.05,
      taxRate: 0.09,
      minimumStayNights: 2,
      guestsIncluded: 4,
      additionalGuestFee: 25,
      petsAllowed: true,
      petFee: 60,
      discounts: [
        { label: "Weekly stay discount", type: "weekly", rate: 0.1 },
        { label: "Monthly stay discount", type: "monthly", rate: 0.22 },
      ],
    },
    status: "active",
    seoTitle: "Three-Bedroom Townhouse Rental, Calgary",
    seoDescription:
      "Three-bedroom Calgary townhouse near the Bow River pathway with a garage and ground-floor bedroom. Managed by VioraRental.",
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    isPlaceholder: true,
  },

  {
    id: "prop-006",
    slug: "west-end-loft-vancouver",
    name: "West End Loft, Vancouver",
    summary:
      "A one-bedroom loft between downtown and the seawall, set up for longer city stays.",
    description: [
      "A quiet loft in the West End, a few blocks from English Bay and within walking distance of downtown. The main space has high ceilings and a large window wall, with the sleeping area set back from the living room.",
      "The property is aimed at longer stays: a real kitchen, in-suite laundry, a dedicated desk and a building with an elevator and secure entry. The seawall is close enough for a daily walk or run.",
      "VioraRental manages this loft end to end, including guest screening, check-in coordination, cleaning and the building's rental registration requirements.",
      "This listing also has its own standalone website; the link is on this page.",
    ],
    location: {
      city: "Vancouver",
      region: "West End",
      province: "BC",
      country: "CA",
      coordinates: { lat: 49.29, lng: -123.13 },
      locationSlug: "vancouver",
      neighbourhoodNotes: [
        "A ten-minute walk to English Bay and the seawall.",
        "Vancouver restricts short-term rentals to a host's principal residence and requires a city licence; the licence number is displayed on the listing.",
        "Parking is by paid underground space, arranged on request.",
      ],
    },
    propertyType: "loft",
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    maxGuests: 3,
    amenities: amenities(
      "wifi", "heating", "washer", "dryer", "linens", "self-check-in",
      "full-kitchen", "dishwasher", "coffee-maker", "dining-area",
      "balcony",
      "smart-tv", "gym-access",
      "elevator",
      "dedicated-workspace", "monitor",
      "smoke-alarm", "carbon-monoxide-alarm", "fire-extinguisher",
    ),
    images: imageSet("west-end-loft-vancouver", [
      { file: "01-living-room.svg", alt: "Placeholder image for the loft living room and window wall" },
      { file: "02-kitchen.svg", alt: "Placeholder image for the loft kitchen" },
      { file: "03-sleeping-area.svg", alt: "Placeholder image for the sleeping area" },
      { file: "04-workspace.svg", alt: "Placeholder image for the dedicated workspace" },
    ]),
    houseRules: [
      "No parties or events.",
      "No smoking.",
      "Quiet hours between 10pm and 7am.",
      "Maximum three guests.",
      "No pets, as required by the building.",
    ],
    pricing: {
      currency: "CAD",
      baseNightlyRate: 235,
      cleaningFee: 110,
      serviceFeeRate: 0.05,
      taxRate: 0.155,
      minimumStayNights: 3,
      guestsIncluded: 2,
      additionalGuestFee: 30,
      petsAllowed: false,
      discounts: [{ label: "Monthly stay discount", type: "monthly", rate: 0.25 }],
    },
    // Demonstrates Option B in the architecture: a property with its own site.
    // Replace with the real domain, or delete the field to hide the button.
    externalWebsiteUrl: "", // PLACEHOLDER: e.g. https://westendloft.ca
    status: "active",
    seoTitle: "One-Bedroom Loft Rental, Vancouver West End",
    seoDescription:
      "One-bedroom West End loft near English Bay and the seawall, set up for longer Vancouver stays. Managed by VioraRental.",
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    isPlaceholder: true,
  },
];
