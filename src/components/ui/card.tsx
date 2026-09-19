import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Card shell. Deliberately plain: a white surface, a hairline border and a
 * restrained shadow. Depth comes from spacing and photography, not effects.
 */
export function Card({
  children,
  className,
  interactive = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Adds the hover lift. Use only when the whole card is a link. */
  interactive?: boolean;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-raised",
        interactive && "lift hover:border-line-strong hover:shadow-card",
        !interactive && "shadow-subtle",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("p-5 sm:p-6", className)}>{children}</div>;
}

/**
 * Panel: a larger, softer surface for sidebars, forms and callouts.
 */
export function Panel({
  children,
  className,
  tone = "raised",
}: {
  children: ReactNode;
  className?: string;
  tone?: "raised" | "sunken" | "brand";
}) {
  const tones = {
    raised: "bg-surface-raised border-line shadow-card",
    sunken: "bg-linen-200 border-line",
    brand: "bg-evergreen-900 border-evergreen-800 text-linen-100",
  } as const;

  return (
    <div className={cn("rounded-[var(--radius-panel)] border p-6 sm:p-8", tones[tone], className)}>
      {children}
    </div>
  );
}

/** Informational note - used for honest "not connected yet" messaging. */
export function Note({
  icon,
  title,
  children,
  className,
  tone = "neutral",
}: {
  icon?: ReactNode;
  title?: string;
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "brand" | "brass";
}) {
  const tones = {
    neutral: "bg-linen-200/70 border-line text-ink-muted",
    brand: "bg-evergreen-50 border-evergreen-200 text-evergreen-900",
    brass: "bg-brass-50 border-brass-200 text-brass-900",
  } as const;

  return (
    <div className={cn("flex gap-3 rounded-[var(--radius-card)] border p-4 text-sm", tones[tone], className)}>
      {icon ? <span className="mt-0.5 shrink-0">{icon}</span> : null}
      <div className="space-y-1">
        {title ? <p className="font-semibold text-ink">{title}</p> : null}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
