import { Img as Image } from "@/components/ui/image";
import Link from "next/link";

import { RatingPill } from "@/components/property/external-rating";
import { SampleBadge } from "@/components/ui/badge";
import { IconBath, IconBed, IconExternal, IconGuests, IconMapPin } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { formatDollars } from "@/lib/pricing/quote";
import type { Property } from "@/lib/types/property";
import { PROPERTY_TYPE_LABELS, PROVINCE_NAMES } from "@/lib/types/property";

/**
 * Property card.
 *
 * The whole card is one link, with the heading carrying the accessible name via
 * a stretched overlay - so there is a single tab stop per card rather than
 * three, and screen readers announce a meaningful link text.
 *
 * `priority` should be set on the first row only: those images are the LCP
 * candidates, and marking every card priority would defeat the purpose.
 */
export function PropertyCard({
  property,
  priority = false,
  className,
  sizes = "(min-width: 1280px) 384px, (min-width: 768px) 45vw, 92vw",
}: {
  property: Property;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const cover = property.images.find((image) => image.isCover) ?? property.images[0];
  const rate = property.pricing?.baseNightlyRate;
  const { location } = property;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-raised",
        "lift shadow-subtle hover:border-line-strong hover:shadow-card",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-linen-300">
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes={sizes}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.04]"
          />
        ) : null}

        {property.isPlaceholder ? (
          <div className="absolute left-3 top-3">
            <SampleBadge />
          </div>
        ) : null}

        {property.featured && !property.isPlaceholder ? (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-evergreen-900/80 px-2.5 py-1 text-xs font-medium text-linen-50 backdrop-blur-[2px]">
              Featured
            </span>
          </div>
        ) : null}

        {property.externalRating ? (
          <div className="absolute right-3 top-3">
            <RatingPill rating={property.externalRating} />
          </div>
        ) : null}

        {/* A gentle wash on hover, so the whole card reacts rather than just the photo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-evergreen-950/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-[0.8125rem] text-ink-subtle">
          <IconMapPin className="h-4 w-4 text-brass-600" />
          <span>
            {location.city}
            {location.region && location.region !== location.city ? `, ${location.region}` : ""},{" "}
            {PROVINCE_NAMES[location.province]}
          </span>
        </p>

        <h3 className="mt-2 text-[1.1875rem] leading-snug text-ink">
          <Link href={`/properties/${property.slug}`} className="before:absolute before:inset-0">
            <span className="transition-colors duration-300 group-hover:text-evergreen-800">
              {property.name}
            </span>
          </Link>
        </h3>

        <p className="mt-2 clamp-2 text-sm leading-relaxed text-ink-muted">{property.summary}</p>

        <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8125rem] text-ink-muted">
          <div className="flex items-center gap-1.5">
            <IconGuests className="h-4 w-4 text-ink-subtle" />
            <dt className="sr-only">Sleeps</dt>
            <dd>{property.maxGuests} guests</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <IconBed className="h-4 w-4 text-ink-subtle" />
            <dt className="sr-only">Bedrooms</dt>
            <dd>
              {property.bedrooms} {property.bedrooms === 1 ? "bedroom" : "bedrooms"}
            </dd>
          </div>
          <div className="flex items-center gap-1.5">
            <IconBath className="h-4 w-4 text-ink-subtle" />
            <dt className="sr-only">Bathrooms</dt>
            <dd>
              {property.bathrooms} {property.bathrooms === 1 ? "bath" : "baths"}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
          <p className="text-sm text-ink-subtle">{PROPERTY_TYPE_LABELS[property.propertyType]}</p>

          {rate ? (
            <p className="text-right text-sm text-ink-muted">
              <span className="text-[1.0625rem] font-semibold text-ink">{formatDollars(rate)}</span>
              <span className="text-ink-subtle"> / night from</span>
            </p>
          ) : property.airbnbUrl ? (
            <a
              href={property.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "relative z-10 inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-3.5 py-1.5 sm:min-h-0",
                "text-[0.8125rem] font-medium text-evergreen-800 transition-all duration-300",
                "hover:-translate-y-0.5 hover:border-evergreen-300 hover:bg-evergreen-50 hover:shadow-subtle",
              )}
            >
              Check on Airbnb
              <IconExternal className="h-3.5 w-3.5" />
              <span className="sr-only"> - {property.name} (opens in a new tab)</span>
            </a>
          ) : (
            <p className="text-right text-sm text-ink-subtle">Rates on request</p>
          )}
        </div>
      </div>
    </article>
  );
}
