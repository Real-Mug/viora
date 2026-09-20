import Link from "next/link";

import { RatingLine } from "@/components/property/external-rating";
import { ReviewList } from "@/components/reviews/review-list";
import { Img as Image } from "@/components/ui/image";
import { IconExternal } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import type { Property } from "@/lib/types/property";
import { PROVINCE_NAMES } from "@/lib/types/property";
import type { Review } from "@/lib/types/review";

/**
 * One property's reviews, under a header that makes it unambiguous which
 * property they belong to.
 *
 * The header is the point of this component. A flat list of reviews from a
 * mixed portfolio reads as a wall of praise attached to nothing; pinning each
 * group to a photo, a name and a link means a reader can tell what they are
 * looking at without reading a single review.
 *
 * Where a property has no written reviews on this site yet, the block still
 * renders: the platform rating is real and checkable, and saying "the written
 * reviews are on Airbnb, here is the link" is more use than hiding the
 * property entirely.
 */
export function PropertyReviewBlock({
  property,
  reviews,
  className,
}: {
  property: Property;
  reviews: Review[];
  className?: string;
}) {
  const cover = property.images.find((image) => image.isCover) ?? property.images[0];
  const headingId = `reviews-${property.slug}`;

  return (
    <section aria-labelledby={headingId} className={cn("scroll-mt-32", className)} id={property.slug}>
      <Reveal>
        <div
          className={cn(
            "flex flex-col gap-5 rounded-[var(--radius-panel)] border border-line bg-surface-raised p-5",
            "sm:flex-row sm:items-center sm:gap-6 sm:p-6",
          )}
        >
          {cover ? (
            <Link
              href={`/properties/${property.slug}`}
              className="group relative block aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[var(--radius-card)] bg-linen-300 sm:aspect-[3/2] sm:w-44"
            >
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="(min-width: 640px) 176px, 92vw"
                loading="lazy"
                className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.06]"
              />
            </Link>
          ) : null}

          <div className="min-w-0 flex-1">
            <p className="eyebrow text-brass-700">Reviews for this property</p>

            <h2 id={headingId} className="mt-2 text-display-sm text-ink">
              <Link
                href={`/properties/${property.slug}`}
                className="underline-offset-4 transition-colors hover:text-evergreen-800 hover:underline"
              >
                {property.name}
              </Link>
            </h2>

            <p className="mt-1 text-sm text-ink-subtle">
              {property.location.city}, {PROVINCE_NAMES[property.location.province]} ·{" "}
              {property.bedrooms} {property.bedrooms === 1 ? "bedroom" : "bedrooms"} · sleeps{" "}
              {property.maxGuests}
            </p>

            {property.externalRating ? (
              <div className="mt-3">
                <RatingLine rating={property.externalRating} />
              </div>
            ) : null}
          </div>

          {property.airbnbUrl ? (
            <a
              href={property.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2.5",
                "text-sm font-medium text-evergreen-800 transition-all duration-300",
                "hover:-translate-y-0.5 hover:border-evergreen-300 hover:bg-evergreen-50 hover:shadow-subtle",
              )}
            >
              Check on Airbnb
              <IconExternal className="h-4 w-4" />
              <span className="sr-only"> - {property.name} (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </Reveal>

      {reviews.length ? (
        <Reveal delay={80}>
          <ReviewList reviews={reviews} showProperty={false} className="mt-6" />
        </Reveal>
      ) : (
        <Reveal delay={80}>
          <p className="mt-5 rounded-[var(--radius-card)] border border-dashed border-line-strong bg-linen-200/50 px-5 py-4 text-sm leading-relaxed text-ink-muted">
            The written reviews for this property live on its Airbnb listing, and we have not
            republished them here yet. The rating above is Airbnb&rsquo;s own figure for the
            listing.{" "}
            {property.airbnbUrl ? (
              <a
                href={property.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-evergreen-800 underline underline-offset-4 hover:text-evergreen-900"
              >
                Read the reviews on Airbnb
              </a>
            ) : null}
          </p>
        </Reveal>
      )}
    </section>
  );
}
