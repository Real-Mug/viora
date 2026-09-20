import { Stars } from "@/components/reviews/review-list";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { Review } from "@/lib/types/review";
import { REVIEW_SOURCE_LABELS } from "@/lib/types/review";

/**
 * Continuously scrolling review wall.
 *
 * How the loop works: each row renders its cards twice and the track animates
 * from translateX(0) to translateX(-50%). At -50% the second copy sits exactly
 * where the first started, so the jump back to 0 is invisible and there is no
 * JavaScript involved at all - it is one CSS animation on a compositor-friendly
 * transform.
 *
 * Accessibility:
 *   - the duplicate copy is aria-hidden, so a screen reader hears each review
 *     once rather than twice;
 *   - hovering or tabbing into the wall pauses it (see `.marquee-viewport` in
 *     globals.css), because text sliding past is unreadable otherwise;
 *   - `prefers-reduced-motion` kills the animation globally, leaving a static,
 *     horizontally scrollable row.
 */

const dateFormatter = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "long" });

function MarqueeCard({ review }: { review: Review }) {
  return (
    <figure
      className={cn(
        "mx-3 flex w-[19rem] shrink-0 flex-col rounded-[var(--radius-card)] border border-line bg-surface-raised p-5",
        "shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card",
        "sm:w-[22rem]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Stars rating={review.rating} />
        <Badge tone="neutral">{REVIEW_SOURCE_LABELS[review.source]}</Badge>
      </div>

      {review.title ? (
        <figcaption className="mt-3 text-[0.9375rem] font-medium text-ink">{review.title}</figcaption>
      ) : null}

      <blockquote className="mt-2 clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
        {review.body}
      </blockquote>

      <div className="mt-4 flex items-center gap-2.5 border-t border-line pt-3">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-evergreen-50 text-xs font-medium text-evergreen-800"
        >
          {review.guestName.charAt(0)}
        </span>
        <p className="min-w-0 text-xs text-ink-subtle">
          <span className="font-medium text-ink">{review.guestName}</span>
          {" · "}
          <time dateTime={review.date}>{dateFormatter.format(new Date(review.date))}</time>
        </p>
      </div>
    </figure>
  );
}

function MarqueeRow({
  reviews,
  duration,
  reverse = false,
}: {
  reviews: Review[];
  duration: number;
  reverse?: boolean;
}) {
  if (!reviews.length) return null;

  return (
    <div className="marquee-viewport marquee-mask overflow-hidden">
      <div
        className="marquee"
        data-direction={reverse ? "reverse" : undefined}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {/* First copy: the real content. */}
        <div className="flex">
          {reviews.map((review) => (
            <MarqueeCard key={review.id} review={review} />
          ))}
        </div>
        {/* Second copy: purely visual, so it is hidden from assistive tech. */}
        <div className="flex" aria-hidden="true">
          {reviews.map((review) => (
            <MarqueeCard key={`${review.id}-loop`} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ReviewMarquee({
  reviews,
  className,
  /** Seconds for one full pass. Longer is calmer; it scales with card count. */
  speed = 8,
}: {
  reviews: Review[];
  className?: string;
  speed?: number;
}) {
  if (!reviews.length) return null;

  // With five or more reviews a second row reading the other way gives the
  // wall some life. Below that, one row looks intentional and two look thin.
  const useTwoRows = reviews.length >= 5;
  const midpoint = Math.ceil(reviews.length / 2);
  const topRow = useTwoRows ? reviews.slice(0, midpoint) : reviews;
  const bottomRow = useTwoRows ? reviews.slice(midpoint) : [];

  return (
    <div className={cn("grid gap-5", className)}>
      <MarqueeRow reviews={topRow} duration={Math.max(24, topRow.length * speed)} />
      {bottomRow.length ? (
        <MarqueeRow reviews={bottomRow} duration={Math.max(24, bottomRow.length * speed)} reverse />
      ) : null}
    </div>
  );
}
