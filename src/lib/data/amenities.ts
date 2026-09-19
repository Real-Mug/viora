import type { Amenity, AmenityCategory } from "@/lib/types/property";

/**
 * The amenity catalogue. Property records reference these by id so filter
 * facets, property pages and any future channel-manager mapping all agree on
 * one vocabulary.
 */
export const AMENITY_CATEGORY_LABELS: Record<AmenityCategory, string> = {
  essentials: "Essentials",
  kitchen: "Kitchen and dining",
  outdoor: "Outdoor",
  entertainment: "Entertainment",
  accessibility: "Accessibility",
  safety: "Safety",
  parking: "Parking",
  workspace: "Workspace",
};

export const AMENITY_CATALOGUE: Amenity[] = [
  { id: "wifi", label: "High-speed Wi-Fi", category: "essentials" },
  { id: "heating", label: "Heating", category: "essentials" },
  { id: "air-conditioning", label: "Air conditioning", category: "essentials" },
  { id: "washer", label: "Washer", category: "essentials" },
  { id: "dryer", label: "Dryer", category: "essentials" },
  { id: "linens", label: "Fresh linens and towels", category: "essentials" },
  { id: "self-check-in", label: "Self check-in", category: "essentials" },

  { id: "full-kitchen", label: "Full kitchen", category: "kitchen" },
  { id: "dishwasher", label: "Dishwasher", category: "kitchen" },
  { id: "coffee-maker", label: "Coffee maker", category: "kitchen" },
  { id: "dining-area", label: "Dining area", category: "kitchen" },

  { id: "balcony", label: "Balcony", category: "outdoor" },
  { id: "patio", label: "Patio", category: "outdoor" },
  { id: "bbq", label: "Barbecue", category: "outdoor" },
  { id: "firepit", label: "Fire pit", category: "outdoor" },
  { id: "waterfront", label: "Waterfront access", category: "outdoor" },
  { id: "hot-tub", label: "Hot tub", category: "outdoor" },
  { id: "garden", label: "Garden", category: "outdoor" },

  { id: "smart-tv", label: "Smart TV", category: "entertainment" },
  { id: "sound-system", label: "Sound system", category: "entertainment" },
  { id: "board-games", label: "Board games", category: "entertainment" },
  { id: "gym-access", label: "Building gym access", category: "entertainment" },

  { id: "step-free-entry", label: "Step-free entry", category: "accessibility" },
  { id: "elevator", label: "Elevator", category: "accessibility" },
  { id: "ground-floor-bedroom", label: "Ground-floor bedroom", category: "accessibility" },

  { id: "smoke-alarm", label: "Smoke alarm", category: "safety" },
  { id: "carbon-monoxide-alarm", label: "Carbon monoxide alarm", category: "safety" },
  { id: "fire-extinguisher", label: "Fire extinguisher", category: "safety" },
  { id: "first-aid-kit", label: "First aid kit", category: "safety" },

  { id: "free-parking", label: "Free parking on site", category: "parking" },
  { id: "garage", label: "Garage", category: "parking" },
  { id: "ev-charger", label: "EV charger", category: "parking" },
  { id: "street-parking", label: "Street parking", category: "parking" },

  { id: "dedicated-workspace", label: "Dedicated workspace", category: "workspace" },
  { id: "monitor", label: "External monitor", category: "workspace" },
];

const BY_ID = new Map(AMENITY_CATALOGUE.map((amenity) => [amenity.id, amenity]));

/** Resolve amenity ids to full records, dropping anything not in the catalogue. */
export function amenities(...ids: string[]): Amenity[] {
  return ids
    .map((id) => BY_ID.get(id))
    .filter((amenity): amenity is Amenity => amenity !== undefined);
}

export function amenityById(id: string): Amenity | undefined {
  return BY_ID.get(id);
}

export function groupAmenities(list: Amenity[]): { category: AmenityCategory; items: Amenity[] }[] {
  const groups = new Map<AmenityCategory, Amenity[]>();
  for (const amenity of list) {
    const bucket = groups.get(amenity.category);
    if (bucket) bucket.push(amenity);
    else groups.set(amenity.category, [amenity]);
  }
  return [...groups.entries()].map(([category, items]) => ({ category, items }));
}
