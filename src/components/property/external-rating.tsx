import { Stars } from "@/components/reviews/review-list";
import { IconExternal } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { ExternalRating } from "@/lib/types/property";

/**
 * Ratings carried over from a listing platform.
 *
 * Kept visibly separate from anything Viora Hosting calculates. Every surface
 * below names the platform, links to the listing the number came from, and
 * says when it was last checked - so a reader can verify the claim in one
 * click, and a stale figure is obvious rather than hidden.
 */

const SOURCE_LABELS: Record<ExternalRating["source"], string> = {
  airbnb: "Airbnb",
  vrbo: "Vrbo",
  "booking.com": "Booking.com",
  google: "Google",
};

const checkedFormatter = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "long" });

/** Compact pill for property cards: "4.83 · 12 reviews on Airbnb". */
export function RatingPill({ rating, className }: { rating: ExternalRating; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-evergreen-900/80 px-2.5 py-1",
        "text-xs font-medium text-linen-50 backdrop-blur-[2px]",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-brass-300">
        <path d="M12 2.6l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.41l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.6z" />
      </svg>
      <span>{rating.ratingValue.toFixed(2)}</span>
      <span className="text-linen-300">
        · {rating.reviewCount} on {SOURCE_LABELS[rating.source]}
      </span>
    </span>
  );
}

/** One line of context, for use under a heading. */
export function RatingLine({ rating, className }: { rating: ExternalRating; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-sm", className)}>
      <Stars rating={rating.ratingValue} />
      <span className="text-ink-muted">
        <span className="font-semibold text-ink">{rating.ratingValue.toFixed(2)}</span> from{" "}
        <a
          href={rating.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-evergreen-800"
        >
          {rating.reviewCount} {SOURCE_LABELS[rating.source]} reviews
        </a>
      </span>
    </p>
  );
}

/**
 * The full panel for a property page: overall score, the platform's per-category
 * sub-scores as bars, and a link out to the source.
 *
 * The bars animate their width in via the `.bar-fill` transition once the
 * surrounding Reveal marks them visible.
 */
export function ExternalRatingPanel({
  rating,
  propertyName,
  className,
}: {
  rating: ExternalRating;
  propertyName: string;
  className?: string;
}) {
  const source = SOURCE_LABELS[rating.source];

  return (
    <section
      className={cn(
        "overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface-raised",
        className,
      )}
      aria-labelledby="platform-rating-heading"
    >
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-12">
        <div>
          <h2 id="platform-rating-heading" className="text-display-sm text-ink">
            Rated on {source}
          </h2>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-5xl leading-none text-evergreen-900">
              {rating.ratingValue.toFixed(2)}
            </span>
            <span className="text-sm text-ink-subtle">/ 5</span>
          </div>

          <div className="mt-3">
            <Stars rating={rating.ratingValue} />
          </div>

          <p className="mt-3 text-sm text-ink-muted">
            From {rating.reviewCount} guest {rating.reviewCount === 1 ? "review" : "reviews"} on{" "}
            {source}.
          </p>

          <a
            href={rating.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-evergreen-800 sm:min-h-0",
              "underline-offset-4 transition-colors hover:text-evergreen-900 hover:underline",
            )}
          >
            Read them on {source}
            <IconExternal className="h-4 w-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        {rating.categories?.length ? (
          <div>
            <h3 className="sr-only">Category scores</h3>
            <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {rating.categories.map((category, index) => (
                <div key={category.label}>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-sm text-ink-muted">{category.label}</dt>
                    <dd className="text-sm font-medium tabular-nums text-ink">
                      {category.value.toFixed(1)}
                    </dd>
                  </div>
                  <div
                    className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-linen-300"
                    role="presentation"
                  >
                    <div
                      className="bar-fill h-full rounded-full bg-evergreen-600"
                      style={{
                        width: `${(category.value / 5) * 100}%`,
                        ["--reveal-delay" as string]: `${index * 70}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>

      <p className="border-t border-line bg-linen-200/60 px-6 py-3 text-xs text-ink-subtle sm:px-8">
        These scores are published by {source} for {propertyName} and were last checked in{" "}
        <time dateTime={rating.checkedAt}>
          {checkedFormatter.format(new Date(rating.checkedAt))}
        </time>
        . They are {source}&rsquo;s figures, not a Viora Hosting average.
      </p>
    </section>
  );
}
