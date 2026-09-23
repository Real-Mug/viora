"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a number up to its value the first time it is seen, then gets out of
 * the way.
 *
 * The important half of that sentence is the second one. The estimator's
 * figures change continuously while someone drags a slider, and animating every
 * one of those changes would read as lag rather than polish - the number would
 * always be chasing the handle. So the count runs once, on first reveal, and
 * every later change renders immediately.
 *
 * It animates on a single requestAnimationFrame loop writing text, so there is
 * no per-frame React render. `tabular-nums` keeps every digit the same width,
 * which is what stops the surrounding layout shifting as the count climbs.
 *
 * Under prefers-reduced-motion it renders the final value on first paint and
 * never starts a loop.
 */

const EASE_OUT_QUINT = (t: number) => 1 - Math.pow(1 - t, 5);

export function CountUp({
  value,
  format,
  durationMs = 900,
  className,
}: {
  value: number;
  /** Formatter for the displayed value, e.g. a currency Intl.NumberFormat. */
  format: (value: number) => string;
  durationMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Once the intro has run (or been skipped), React owns the text again.
  const [introDone, setIntroDone] = useState(false);
  const introStarted = useRef(false);

  useEffect(() => {
    if (introStarted.current) return;
    const node = ref.current;
    if (!node) return;

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      introStarted.current = true;
      setIntroDone(true);
      return;
    }

    let frame = 0;
    const target = value;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || introStarted.current) return;
        introStarted.current = true;
        observer.disconnect();

        const started = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - started) / durationMs);
          const current = target * EASE_OUT_QUINT(progress);
          // Written directly rather than through state: this runs at 60fps and
          // a re-render per frame would be the expensive part.
          if (ref.current) ref.current.textContent = format(current);
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            setIntroDone(true);
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
    // `value` is deliberately not a dependency: the intro animates to whatever
    // the value was when it first came into view, and later changes are handled
    // by the normal render path below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMs, format]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {/*
        Before the intro runs, render the final value rather than zero: it is
        what a crawler, a reader with scripting off, and the no-observer
        fallback all need to see.
      */}
      {introDone || !introStarted.current ? format(value) : null}
    </span>
  );
}
