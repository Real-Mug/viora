import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Layout primitives: page gutters, section rhythm and section headings.
 * Pages compose these rather than repeating padding and max-width classes.
 */

export function Container({
  children,
  className,
  prose = false,
}: {
  children: ReactNode;
  className?: string;
  prose?: boolean;
}) {
  return <div className={cn(prose ? "container-prose" : "container-page", className)}>{children}</div>;
}

type Tone = "default" | "raised" | "sunken" | "dark" | "evergreen";

const toneClasses: Record<Tone, string> = {
  default: "",
  raised: "bg-surface-raised",
  sunken: "bg-linen-200",
  dark: "bg-linen-950 text-linen-100",
  evergreen: "bg-evergreen-900 text-linen-100",
};

export function Section({
  children,
  className,
  tone = "default",
  tight = false,
  id,
  as: Tag = "section",
  "aria-labelledby": ariaLabelledBy,
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  tight?: boolean;
  id?: string;
  as?: ElementType;
  "aria-labelledby"?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(tight ? "section-y-tight" : "section-y", toneClasses[tone], className)}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({
  children,
  className,
  onDark = false,
}: {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <p className={cn("eyebrow", onDark ? "text-brass-300" : "text-brass-600", className)}>{children}</p>
  );
}

/**
 * A section heading block. `level` controls the actual heading element so the
 * document outline stays correct regardless of visual size.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  level = 2,
  align = "left",
  onDark = false,
  id,
  className,
  size = "lg",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  level?: 1 | 2 | 3;
  align?: "left" | "center";
  onDark?: boolean;
  id?: string;
  className?: string;
  size?: "md" | "lg";
  children?: ReactNode;
}) {
  const Heading = `h${level}` as ElementType;

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "center" ? "max-w-3xl mx-auto" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(
          size === "lg" ? "text-display-md" : "text-display-sm",
          onDark ? "text-linen-50" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className={cn("text-lead", onDark ? "text-linen-300" : "text-ink-muted")}>{description}</p>
      ) : null}
      {children}
    </div>
  );
}

/** Thin brass keyline used to separate major bands. */
export function Keyline({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("rule-brass h-px w-16", className)} />;
}
