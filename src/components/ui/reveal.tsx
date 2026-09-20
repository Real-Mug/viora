"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Scroll-triggered entrance animation.
 *
 * The visual start state lives in globals.css under `.js [data-reveal]`, not
 * here, so it is applied by the stylesheet on first paint rather than after
 * hydration - otherwise every element would flash in at full opacity and then
 * animate, which looks worse than no animation at all.
 *
 * Three deliberate choices:
 *   - It reveals ONCE and then unobserves. Content that fades out again as you
 *     scroll back up is distracting on a marketing page.
 *   - `prefers-reduced-motion` short-circuits the whole thing: the element is
 *     marked revealed on mount, so there is no transition to sit through.
 *   - If IntersectionObserver is missing, it reveals immediately. A browser
 *     without it should get a plain, complete page, not an empty one.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  as?: ElementType;
  /** Direction the element travels from. */
  variant?: "up" | "left" | "right" | "scale";
  /** Stagger in milliseconds, for sequencing a row of cards. */
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
          }
        }
      },
      // A negative bottom margin holds the animation until the element is
      // properly in view, rather than firing while it is still a sliver.
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-revealed={revealed ? "true" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Reveals a list of children in sequence.
 *
 * Saves threading an incrementing `delay` through every call site, which is
 * where staggered animations usually go wrong.
 */
export function RevealGroup({
  children,
  className,
  step = 90,
  variant = "up",
  as: Tag = "div",
}: {
  children: ReactNode[];
  className?: string;
  /** Milliseconds between each child. */
  step?: number;
  variant?: "up" | "left" | "right" | "scale";
  as?: ElementType;
}) {
  return (
    <Tag className={cn(className)}>
      {children.map((child, index) => (
        <Reveal key={index} variant={variant} delay={index * step}>
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}
