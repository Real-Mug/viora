"use client";

import { useEffect, useMemo, useState } from "react";

import { PropertyCard } from "@/components/property/property-card";
import { Button } from "@/components/ui/button";
import { IconClose, IconFilter } from "@/components/ui/icons";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import type { PropertyFacets } from "@/lib/data/repository";
import type { Property, PropertyType } from "@/lib/types/property";

/**
 * Properties index: filtering, sorting and paging.
 *
 * Why this runs in the browser: the site is exported statically, so there is no
 * server to answer a filtered query. The first page of results is still
 * server-rendered into the HTML (the initial state here is the unfiltered first
 * page, which matches what the server produced), so the page has real content
 * for crawlers and a fast first paint; filtering then takes over on hydration.
 *
 * Scale: filtering runs over an in-memory array and only `pageSize` cards are
 * mounted at a time, so the DOM stays small regardless of catalogue size. Past
 * roughly a thousand properties the dataset itself becomes the constraint, and
 * the right move is a server-rendered search route implementing the same
 * `PropertyQuery` - the filter shape here is deliberately identical.
 */

const PAGE_SIZE = 12;

type Filters = {
  city: string;
  propertyType: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  maxPrice: number | null;
  sort: "featured" | "price-asc" | "price-desc" | "name";
};

const EMPTY: Filters = {
  city: "",
  propertyType: "",
  guests: 0,
  bedrooms: 0,
  bathrooms: 0,
  amenities: [],
  maxPrice: null,
  sort: "featured",
};

function applyFilters(items: Property[], filters: Filters): Property[] {
  const filtered = items.filter((property) => {
    if (filters.city && property.location.city !== filters.city) return false;
    if (filters.propertyType && property.propertyType !== (filters.propertyType as PropertyType)) return false;
    if (filters.guests && property.maxGuests < filters.guests) return false;
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
    if (filters.bathrooms && property.bathrooms < filters.bathrooms) return false;

    if (filters.amenities.length) {
      const owned = new Set(property.amenities.map((amenity) => amenity.id));
      if (!filters.amenities.every((id) => owned.has(id))) return false;
    }

    if (filters.maxPrice != null) {
      const rate = property.pricing?.baseNightlyRate;
      // Properties without published rates are excluded from a price filter
      // rather than silently assumed to be cheap.
      if (rate == null || rate > filters.maxPrice) return false;
    }

    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      return filtered.sort(
        (a, b) =>
          (a.pricing?.baseNightlyRate ?? Number.MAX_SAFE_INTEGER) -
          (b.pricing?.baseNightlyRate ?? Number.MAX_SAFE_INTEGER),
      );
    case "price-desc":
      return filtered.sort((a, b) => (b.pricing?.baseNightlyRate ?? -1) - (a.pricing?.baseNightlyRate ?? -1));
    case "name":
      return filtered.sort((a, b) => a.name.localeCompare(b.name, "en-CA"));
    default:
      return filtered.sort((a, b) => {
        if (Boolean(b.featured) !== Boolean(a.featured)) return Number(b.featured) - Number(a.featured);
        return a.name.localeCompare(b.name, "en-CA");
      });
  }
}

function activeCount(filters: Filters): number {
  let count = 0;
  if (filters.city) count += 1;
  if (filters.propertyType) count += 1;
  if (filters.guests) count += 1;
  if (filters.bedrooms) count += 1;
  if (filters.bathrooms) count += 1;
  if (filters.maxPrice != null) count += 1;
  count += filters.amenities.length;
  return count;
}

export function PropertyExplorer({
  allProperties,
  facets,
}: {
  allProperties: Property[];
  facets: PropertyFacets;
}) {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [panelOpen, setPanelOpen] = useState(false);

  const results = useMemo(() => applyFilters(allProperties, filters), [allProperties, filters]);
  const shown = results.slice(0, visible);
  const count = activeCount(filters);

  // Reset paging whenever the result set changes.
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [filters]);

  // Reflect the filter state in the URL so a filtered view can be shared,
  // without a navigation - the page is static and re-rendering is local.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (filters.city) params.set("city", filters.city);
    if (filters.propertyType) params.set("type", filters.propertyType);
    if (filters.guests) params.set("guests", String(filters.guests));
    if (filters.bedrooms) params.set("bedrooms", String(filters.bedrooms));
    if (filters.bathrooms) params.set("bathrooms", String(filters.bathrooms));
    if (filters.maxPrice != null) params.set("maxPrice", String(filters.maxPrice));
    if (filters.amenities.length) params.set("amenities", filters.amenities.join(","));
    if (filters.sort !== "featured") params.set("sort", filters.sort);

    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);

    if (count > 0) {
      track({ name: "property_filtered", params: { filters: query, results: results.length } });
    }
  }, [filters, count, results.length]);

  // Restore filters from the URL on first load, so a shared link works.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (![...params.keys()].length) return;
    setFilters((current) => ({
      ...current,
      city: params.get("city") ?? "",
      propertyType: params.get("type") ?? "",
      guests: Number(params.get("guests")) || 0,
      bedrooms: Number(params.get("bedrooms")) || 0,
      bathrooms: Number(params.get("bathrooms")) || 0,
      maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : null,
      amenities: params.get("amenities")?.split(",").filter(Boolean) ?? [],
      sort: (params.get("sort") as Filters["sort"]) ?? "featured",
    }));
  }, []);

  const update = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((current) => ({ ...current, [key]: value }));

  return (
    <div className="grid gap-8 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-12">
      {/* Mobile filter trigger */}
      <div className="flex items-center justify-between gap-4 lg:hidden">
        <Button variant="secondary" size="sm" onClick={() => setPanelOpen(true)}>
          <IconFilter className="h-4 w-4" />
          Filters
          {count > 0 ? (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-evergreen-800 px-1.5 text-xs text-linen-50">
              {count}
            </span>
          ) : null}
        </Button>
        <SortSelect value={filters.sort} onChange={(value) => update("sort", value)} />
      </div>

      {/* Filter panel: a sidebar on desktop, a sheet on mobile */}
      <div
        className={cn(
          "lg:block",
          panelOpen
            ? "fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-surface p-4 pb-28"
            : "hidden",
        )}
      >
        <div className="mb-5 flex items-center justify-between lg:hidden">
          <h2 className="text-display-sm text-ink">Filters</h2>
          <button
            type="button"
            onClick={() => setPanelOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line"
          >
            <IconClose className="h-5 w-5" />
            <span className="sr-only">Close filters</span>
          </button>
        </div>

        <FilterPanel facets={facets} filters={filters} update={update} onReset={() => setFilters(EMPTY)} count={count} />

        {panelOpen ? (
          <div className="fixed inset-x-0 bottom-0 border-t border-line bg-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
            <Button fullWidth size="lg" onClick={() => setPanelOpen(false)}>
              Show {results.length} {results.length === 1 ? "property" : "properties"}
            </Button>
          </div>
        ) : null}
      </div>

      {/* Results */}
      <div>
        <div className="mb-6 hidden items-center justify-between gap-4 lg:flex">
          <p aria-live="polite" className="text-sm text-ink-muted">
            {results.length} {results.length === 1 ? "property" : "properties"}
            {count > 0 ? " match your filters" : ""}
          </p>
          <SortSelect value={filters.sort} onChange={(value) => update("sort", value)} />
        </div>

        <p aria-live="polite" className="sr-only lg:hidden">
          {results.length} properties found
        </p>

        {shown.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map((property, index) => (
                <PropertyCard key={property.id} property={property} priority={index < 3} />
              ))}
            </div>

            {visible < results.length ? (
              <div className="mt-10 flex justify-center">
                <Button variant="secondary" size="lg" onClick={() => setVisible((value) => value + PAGE_SIZE)}>
                  Show more properties
                  <span className="text-ink-subtle">({results.length - visible} remaining)</span>
                </Button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="rounded-[var(--radius-panel)] border border-dashed border-line-strong bg-linen-200/50 p-10 text-center">
            <h3 className="text-display-sm text-ink">No properties match those filters</h3>
            <p className="mx-auto mt-3 max-w-md text-ink-muted">
              Try widening the search, or get in touch and tell us what you are looking for. Our
              portfolio changes as properties come under management.
            </p>
            <div className="mt-6">
              <Button variant="secondary" onClick={() => setFilters(EMPTY)}>
                Clear all filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const selectClasses =
  "h-11 w-full rounded-xl border border-line bg-surface-raised px-3 text-[0.9375rem] text-ink " +
  "transition-colors hover:border-line-strong focus:border-evergreen-700";

function SortSelect({
  value,
  onChange,
}: {
  value: Filters["sort"];
  onChange: (value: Filters["sort"]) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="shrink-0 text-sm text-ink-muted">
        Sort
      </label>
      <select
        id="sort"
        value={value}
        onChange={(event) => onChange(event.target.value as Filters["sort"])}
        className={cn(selectClasses, "w-auto")}
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}

function FilterPanel({
  facets,
  filters,
  update,
  onReset,
  count,
}: {
  facets: PropertyFacets;
  filters: Filters;
  update: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onReset: () => void;
  count: number;
}) {
  // Amenities are grouped for display but capped: a filter list of forty
  // checkboxes is not a filter, it is a wall.
  const topAmenities = facets.amenities.slice(0, 10);

  return (
    <div className="grid gap-6">
      <fieldset className="grid gap-2">
        <legend className="mb-1 text-sm font-medium text-ink">Location</legend>
        <select
          value={filters.city}
          onChange={(event) => update("city", event.target.value)}
          className={selectClasses}
          aria-label="Filter by city"
        >
          <option value="">All locations</option>
          {facets.cities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label} ({city.count})
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="grid gap-2">
        <legend className="mb-1 text-sm font-medium text-ink">Property type</legend>
        <select
          value={filters.propertyType}
          onChange={(event) => update("propertyType", event.target.value)}
          className={selectClasses}
          aria-label="Filter by property type"
        >
          <option value="">Any type</option>
          {facets.propertyTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label} ({type.count})
            </option>
          ))}
        </select>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        <NumberFilter
          label="Guests"
          value={filters.guests}
          max={facets.guestRange.max}
          onChange={(value) => update("guests", value)}
          anyLabel="Any"
        />
        <NumberFilter
          label="Bedrooms"
          value={filters.bedrooms}
          max={facets.bedroomRange.max}
          onChange={(value) => update("bedrooms", value)}
          anyLabel="Any"
        />
        <NumberFilter
          label="Bathrooms"
          value={filters.bathrooms}
          max={4}
          onChange={(value) => update("bathrooms", value)}
          anyLabel="Any"
        />
      </div>

      {facets.priceRange ? (
        <fieldset className="grid gap-2">
          <legend className="mb-1 text-sm font-medium text-ink">Maximum nightly rate</legend>
          <select
            value={filters.maxPrice ?? ""}
            onChange={(event) => update("maxPrice", event.target.value ? Number(event.target.value) : null)}
            className={selectClasses}
            aria-label="Filter by maximum nightly rate"
          >
            <option value="">Any rate</option>
            {priceSteps(facets.priceRange.min, facets.priceRange.max).map((step) => (
              <option key={step} value={step}>
                Up to ${step} per night
              </option>
            ))}
          </select>
          <p className="text-xs text-ink-subtle">
            Properties without a published rate are not included when a price filter is applied.
          </p>
        </fieldset>
      ) : null}

      {topAmenities.length > 0 ? (
        <fieldset className="grid gap-2.5">
          <legend className="mb-1 text-sm font-medium text-ink">Amenities</legend>
          {topAmenities.map((amenity) => {
            const checked = filters.amenities.includes(amenity.value);
            return (
              <label key={amenity.value} className="flex cursor-pointer items-center gap-2.5 text-[0.9375rem] text-ink-muted">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    update(
                      "amenities",
                      checked
                        ? filters.amenities.filter((id) => id !== amenity.value)
                        : [...filters.amenities, amenity.value],
                    )
                  }
                  className="h-4 w-4 shrink-0 rounded border-line-strong text-evergreen-800 accent-evergreen-800"
                />
                {amenity.label}
                <span className="text-xs text-ink-subtle">({amenity.count})</span>
              </label>
            );
          })}
        </fieldset>
      ) : null}

      {count > 0 ? (
        <Button variant="ghost" size="sm" onClick={onReset} className="justify-self-start">
          Clear all filters
        </Button>
      ) : null}
    </div>
  );
}

function NumberFilter({
  label,
  value,
  max,
  onChange,
  anyLabel,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
  anyLabel: string;
}) {
  const options = Array.from({ length: Math.max(0, Math.min(max, 10)) }, (_, index) => index + 1);
  const id = `filter-${label.toLowerCase()}`;

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        value={value || ""}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
        className={selectClasses}
      >
        <option value="">{anyLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}+
          </option>
        ))}
      </select>
    </div>
  );
}

/** Round price filter steps to values a person would actually choose. */
function priceSteps(min: number, max: number): number[] {
  if (max <= min) return [Math.ceil(max / 50) * 50];
  const steps: number[] = [];
  const increment = max > 800 ? 200 : 100;
  for (let value = Math.ceil(min / increment) * increment; value < max; value += increment) {
    steps.push(value);
  }
  steps.push(Math.ceil(max / increment) * increment);
  return [...new Set(steps)];
}
