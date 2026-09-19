import Link from "next/link";

import { cn } from "@/lib/cn";

/**
 * Wordmark. Drawn as type plus a small brass mark rather than an image file, so
 * it stays crisp at any size and costs nothing to load.
 *
 * The mark is a stylised "V" formed from a roofline - a house and the initial
 * read as the same shape.
 */
export function Logo({
  onDark = false,
  className,
  href = "/",
}: {
  onDark?: boolean;
  className?: string;
  href?: string | null;
}) {
  const content = (
    <span className={cn("inline-flex items-baseline gap-2.5", className)}>
      <svg
        viewBox="0 0 28 28"
        aria-hidden="true"
        className="h-6 w-6 shrink-0 self-center sm:h-7 sm:w-7"
        fill="none"
      >
        <path
          d="M4 9.5 14 3l10 6.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={onDark ? "text-brass-300" : "text-brass-500"}
          style={{ stroke: "currentColor" }}
        />
        <path
          d="M8.5 11.5 14 23l5.5-11.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn(
          "font-display text-[1.375rem] leading-none tracking-[-0.02em] sm:text-2xl",
          onDark ? "text-linen-50" : "text-ink",
        )}
      >
        Viora<span className={onDark ? "text-brass-300" : "text-brass-600"}>Rental</span>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label="VioraRental home"
      className={cn(
        "inline-flex rounded-sm",
        onDark ? "text-brass-300" : "text-evergreen-800",
      )}
    >
      {content}
    </Link>
  );
}
