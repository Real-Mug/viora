import Link from "next/link";

import { Stars } from "@/components/reviews/review-list";
import { Img as Image } from "@/components/ui/image";
import { IconExternal, IconStar } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import type { Property } from "@/lib/types/property";

/**
 * Showcase pieces for the homepage.
 *
 * Every number here is derived from `externalRating` on the property records -
 * figures copied from the public Airbnb listing pages, with the date they were
 * checked. Nothing is typed in by hand, so when a rating changes in
 * src/content/properties.ts it changes here too, and with no rated properties
 * each piece renders nothing rather than an invented figure.
 */

type Rated = Property & { externalRating: NonNullable<Property["externalRating"]> };

function rated(properties: Property[]): Rated[] {
  return properties.filter((p): p is Rated => Boolean(p.externalRating));
}

const monthFormatter = new Intl.DateTimeFormat("en-CA", { month: "long", year: "numeric" });

/** Review-weighted average, total review count and the date checked. */
function summarise(list: Rated[]) {
  const reviewCount = list.reduce((sum, p) => sum + p.externalRating.reviewCount, 0);
  const weighted = list.reduce(
    (sum, p) => sum + p.externalRating.ratingValue * p.externalRating.reviewCount,
    0,
  );
  const checkedAt = list
    .map((p) => p.externalRating.checkedAt)
    .sort()
    .at(0);

  return {
    average: reviewCount ? weighted / reviewCount : 0,
    reviewCount,
    checkedLabel: checkedAt ? monthFormatter.format(new Date(checkedAt)) : "",
  };
}

/** The lowest score a category gets across every listing - the honest floor. */
function categoryFloor(list: Rated[], label: string): number | null {
  const values = list
    .map((p) => p.externalRating.categories?.find((c) => c.label === label)?.value)
    .filter((v): v is number => typeof v === "number");
  return values.length === list.length && values.length ? Math.min(...values) : null;
}

/* ========================================================================== */
/* Hero card                                                                   */
/* ========================================================================== */

/** Glass card floated over the hero photograph on wide screens. */
export function HeroRatingCard({ properties }: { properties: Property[] }) {
  const list = rated(properties)
    .filter((p) => p.images.length > 0)
    .slice(0, 2);
  if (!list.length) return null;
  const { average, reviewCount } = summarise(list);

  return (
    <div className="glass-card float-y rounded-[var(--radius-panel)] p-5 text-linen-50">
      <div className="flex items-center justify-between gap-6">
        <p className="eyebrow text-brass-200">Rated by our guests</p>
        <span className="flex items-center gap-1 text-sm font-medium">
          <IconStar className="h-4 w-4 text-brass-300" />
          {average.toFixed(2)}
        </span>
      </div>

      <ul className="mt-4 space-y-3">
        {list.map((property) => (
          <li key={property.id}>
            <Link
              href={`/properties/${property.slug}`}
              className="group flex items-center gap-3.5 rounded-2xl p-1.5 transition-colors hover:bg-white/10"
            >
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={property.images[0]?.src ?? ""}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[0.9375rem] font-medium">
                  {property.location.city} {property.propertyType}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 text-xs text-linen-300">
                  <IconStar className="h-3.5 w-3.5 text-brass-300" />
                  {property.externalRating.ratingValue.toFixed(2)} · {property.externalRating.reviewCount}{" "}
                  Airbnb reviews
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-4 border-t border-white/15 pt-3 text-xs text-linen-300">
        {reviewCount} guest reviews on Airbnb across the homes we run.
      </p>
    </div>
  );
}

/* ========================================================================== */
/* Proof band                                                                  */
/* ========================================================================== */

export function ProofBand({ properties }: { properties: Property[] }) {
  const list = rated(properties);
  if (!list.length) return null;

  const { average, reviewCount, checkedLabel } = summarise(list);
  const communication = categoryFloor(list, "Communication");
  const checkIn = categoryFloor(list, "Check-in");

  const stats = [
    { value: average.toFixed(1), suffix: "★", label: "Average guest rating" },
    { value: String(reviewCount), suffix: "", label: "Airbnb guest reviews" },
    communication !== null
      ? { value: communication.toFixed(1), suffix: "", label: "Communication score, every listing" }
      : null,
    checkIn !== null
      ? { value: checkIn.toFixed(1), suffix: "", label: "Check-in score, every listing" }
      : null,
  ].filter((s): s is { value: string; suffix: string; label: string } => s !== null);

  return (
    <section aria-label="Guest ratings at a glance" className="proof-band text-linen-50">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:py-12 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80} className="lg:px-8 lg:first:pl-0">
              <p className="font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.25rem)] leading-none tracking-tight">
                {stat.value}
                {stat.suffix ? <span className="ml-1 text-[0.6em] text-brass-300">{stat.suffix}</span> : null}
              </p>
              <p className="mt-2.5 text-sm text-linen-300">{stat.label}</p>
            </Reveal>
          ))}
        </div>
        <p className="border-t border-white/10 py-4 text-xs text-linen-400">
          From the public Airbnb pages of the properties we manage, checked {checkedLabel}.{" "}
          <Link href="/reviews" className="underline decoration-brass-300/60 underline-offset-4 hover:text-linen-100">
            See the sources
          </Link>
        </p>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* Photo strip                                                                 */
/* ========================================================================== */

/**
 * A slow, full-bleed ribbon of real interiors. It reuses the review wall's
 * marquee: the track holds the set twice, the copy is aria-hidden, hover
 * pauses it, and prefers-reduced-motion stops it.
 */
export function PhotoStrip({ properties }: { properties: Property[] }) {
  const shots = properties.flatMap((property) =>
    property.images.slice(0, 6).map((image) => ({ ...image, property })),
  );
  if (shots.length < 4) return null;

  const renderSet = (hidden: boolean) =>
    shots.map((shot, index) => (
      <li
        key={`${hidden ? "b" : "a"}-${shot.src}`}
        aria-hidden={hidden || undefined}
        className={cn(
          "photo-tile relative mx-2 h-56 shrink-0 overflow-hidden rounded-[var(--radius-card)] sm:h-72",
          index % 3 === 1 ? "w-60 sm:w-80" : "w-72 sm:w-[26rem]",
        )}
      >
        <Image
          src={shot.src}
          alt={hidden ? "" : shot.alt}
          fill
          sizes="(min-width: 640px) 416px, 288px"
          className="object-cover"
        />
        <span className="scrim-bottom absolute inset-0" aria-hidden="true" />
        <span className="absolute bottom-3 left-4 text-xs font-medium text-linen-100">
          {shot.property.location.city}
        </span>
      </li>
    ));

  return (
    <div className="marquee-viewport marquee-mask overflow-hidden py-2">
      <ul className="marquee" style={{ ["--marquee-duration" as string]: "90s" }}>
        {renderSet(false)}
        {renderSet(true)}
      </ul>
    </div>
  );
}

/* ========================================================================== */
/* Guest ratings                                                               */
/* ========================================================================== */

/** Per-listing Airbnb scores with the category breakdown, linked to source. */
export function GuestRatings({ properties }: { properties: Property[] }) {
  const list = rated(properties);
  if (!list.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {list.map((property, index) => {
        const rating = property.externalRating;
        return (
          <Reveal key={property.id} delay={index * 90} className="h-full">
            <article className="bento-tile flex h-full flex-col rounded-[var(--radius-panel)] border border-line bg-surface-raised p-6 shadow-card sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="eyebrow text-brass-700">{property.location.city}</p>
                  <h3 className="mt-2 text-[1.25rem] leading-snug text-ink">{property.name}</h3>
                </div>
                <div className="text-right">
                  <p className="font-display text-5xl leading-none text-evergreen-900">
                    {rating.ratingValue.toFixed(2)}
                  </p>
                  <Stars rating={rating.ratingValue} className="mt-2" />
                </div>
              </div>

              {rating.categories?.length ? (
                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4">
                  {rating.categories.map((category) => (
                    <div key={category.label}>
                      <div className="flex items-baseline justify-between text-sm">
                        <dt className="text-ink-muted">{category.label}</dt>
                        <dd className="font-medium text-ink">{category.value.toFixed(1)}</dd>
                      </div>
                      <div className="rating-bar mt-1.5" aria-hidden="true">
                        <span style={{ width: `${(category.value / 5) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </dl>
              ) : null}

              <a
                href={rating.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-medium text-evergreen-800 hover:underline"
              >
                {rating.reviewCount} reviews on Airbnb
                <IconExternal className="h-4 w-4" />
              </a>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
