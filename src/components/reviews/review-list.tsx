import { Img as Image } from "@/components/ui/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconStar } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { CTA } from "@/lib/config/site";
import type { AggregateRating, Review } from "@/lib/types/review";
import { MIN_REVIEWS_FOR_AGGREGATE, REVIEW_SOURCE_LABELS } from "@/lib/types/review";

/**
 * Review components, reused on the homepage, property pages, service pages and
 * the reviews index.
 *
 * The empty state is a first-class part of this component, not an afterthought.
 * No real reviews exist yet, so what ships is an honest explanation rather than
 * invented testimonials - which is both the correct thing to do and the only
 * version that survives a reader checking.
 */

const dateFormatter = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "long" });

export function Stars({ rating, className }: { rating: number; className?: string }) {
  const rounded = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <IconStar
          key={star}
          className={cn("h-4 w-4", star <= rounded ? "text-brass-500" : "text-linen-400")}
        />
      ))}
    </span>
  );
}

export function ReviewCard({ review, showProperty = true }: { review: Review; showProperty?: boolean }) {
  return (
    <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface-raised p-6 shadow-subtle">
      <div className="flex items-start justify-between gap-4">
        <Stars rating={review.rating} />
        <Badge tone="neutral">{REVIEW_SOURCE_LABELS[review.source]}</Badge>
      </div>

      {review.title ? <h3 className="mt-4 text-[1.0625rem] text-ink">{review.title}</h3> : null}

      <blockquote className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
        {review.body}
      </blockquote>

      <footer className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        {review.guestImage ? (
          <Image
            src={review.guestImage.src}
            alt={review.guestImage.alt}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-evergreen-50 text-sm font-medium text-evergreen-800"
          >
            {review.guestName.charAt(0)}
          </span>
        )}
        <div className="min-w-0 text-sm">
          <p className="font-medium text-ink">{review.guestName}</p>
          <p className="truncate text-ink-subtle">
            <time dateTime={review.date}>{dateFormatter.format(new Date(review.date))}</time>
            {showProperty && review.propertyName && review.propertySlug ? (
              <>
                {" · "}
                <Link
                  href={`/properties/${review.propertySlug}`}
                  className="underline-offset-4 hover:text-evergreen-800 hover:underline"
                >
                  {review.propertyName}
                </Link>
              </>
            ) : null}
          </p>
        </div>
      </footer>
    </article>
  );
}

export function computeAggregate(reviews: Review[]): AggregateRating | null {
  const eligible = reviews.filter((review) => review.verified && !review.isPlaceholder);
  if (eligible.length < MIN_REVIEWS_FOR_AGGREGATE) return null;
  const total = eligible.reduce((sum, review) => sum + review.rating, 0);
  return {
    ratingValue: Number((total / eligible.length).toFixed(2)),
    reviewCount: eligible.length,
    bestRating: 5,
    worstRating: 1,
  };
}

export function AggregateSummary({ reviews }: { reviews: Review[] }) {
  const aggregate = computeAggregate(reviews);
  if (!aggregate) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <Stars rating={aggregate.ratingValue} />
      <p className="text-sm text-ink-muted">
        <span className="font-semibold text-ink">{aggregate.ratingValue.toFixed(1)}</span> from{" "}
        {aggregate.reviewCount} verified {aggregate.reviewCount === 1 ? "review" : "reviews"}
      </p>
    </div>
  );
}

export function ReviewList({
  reviews,
  showProperty = true,
  columns = 3,
  className,
}: {
  reviews: Review[];
  showProperty?: boolean;
  columns?: 2 | 3;
  className?: string;
}) {
  if (!reviews.length) return null;

  return (
    <div
      className={cn(
        "grid gap-6",
        columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
        className,
      )}
    >
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} showProperty={showProperty} />
      ))}
    </div>
  );
}

/**
 * Shown wherever reviews would appear but none exist yet. Explaining why is
 * more credible than hiding the section, and far more credible than filling it.
 */
export function NoReviewsYet({
  context = "company",
  className,
}: {
  context?: "company" | "property";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-panel)] border border-dashed border-line-strong bg-linen-200/50 p-8 text-center sm:p-10",
        className,
      )}
    >
      <h3 className="text-display-sm text-ink">
        {context === "property" ? "No reviews published for this property yet" : "No reviews published yet"}
      </h3>
      <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-muted">
        We publish reviews only once we can point to where they came from - a guest who stayed, an
        Airbnb review page, or another platform we can link to. Rather than fill this space with
        testimonials you have no way of checking, we would rather leave it empty until there is
        something real to put here.
      </p>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-subtle">
        If you have stayed at a property we manage, or worked with us as an owner, we would genuinely
        like to hear how it went.
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href={CTA.contact.href} variant="secondary">
          Share your experience
        </ButtonLink>
        <ButtonLink href={CTA.primary.href}>{CTA.primary.label}</ButtonLink>
      </div>
    </div>
  );
}
