import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type BadgeTone = "neutral" | "brand" | "brass" | "sample" | "onDark";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-linen-200 text-ink-muted border-line",
  brand: "bg-evergreen-50 text-evergreen-800 border-evergreen-200",
  brass: "bg-brass-50 text-brass-800 border-brass-200",
  sample: "bg-brass-100 text-brass-900 border-brass-300",
  onDark: "bg-white/12 text-linen-100 border-white/25 backdrop-blur-[2px]",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * The label applied to every sample record while
 * NEXT_PUBLIC_CONTENT_MODE=placeholder. Its job is to make sure nobody - the
 * client, a visitor, or a search engine - mistakes demo inventory for a claim
 * about properties under management.
 */
export function SampleBadge({ className }: { className?: string }) {
  return (
    <Badge tone="sample" className={cn("shadow-subtle", className)}>
      Sample listing
    </Badge>
  );
}
