"use client";

import { useEffect, useRef, useState } from "react";

import { Container, Section } from "@/components/ui/section";

/**
 * Where a $100 booking actually goes.
 *
 * Owners are routinely surprised by two things: that the channel takes a cut
 * before anyone else does, and that the cleaning fee is not coming out of their
 * share. Competitors leave both vague, because the vaguer the split the better
 * the headline number looks. Showing it is cheap for us and useful to them.
 *
 * On honesty: the management figure here is an EXAMPLE, not a published rate.
 * This site quotes after the property assessment and says so everywhere else,
 * so the number is labelled as an illustration on screen, and the shape of the
 * split - not the digits - is the point. Edit SPLIT and the bar, the labels and
 * the totals all follow.
 */

type Slice = {
  label: string;
  amount: number;
  note: string;
  tone: "channel" | "management" | "owner";
};

const SPLIT: [Slice, ...Slice[]] = [
  {
    label: "Channel fee",
    amount: 3,
    note: "Airbnb's host service fee, taken off the top before anyone else is paid.",
    tone: "channel",
  },
  {
    label: "Management",
    amount: 18,
    note: "Our share, for running the listing, the guests and the turnovers. Quoted per property, after the assessment.",
    tone: "management",
  },
  {
    label: "You",
    amount: 79,
    note: "What reaches the owner before their own costs - mortgage, utilities, insurance, tax.",
    tone: "owner",
  },
];

const TOTAL = SPLIT.reduce((sum, slice) => sum + slice.amount, 0);

export function MoneyFlow({ tone = "default" }: { tone?: "default" | "sunken" }) {
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // The bar fills once, when it is first seen. Re-filling on every scroll past
  // would turn a explanatory graphic into a fidget.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Section tone={tone} aria-labelledby="money-heading">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow text-brass-700">Straight answer</p>
          <h2 id="money-heading" className="mt-4 text-display-md text-ink">
            Where a $100 booking actually goes
          </h2>
          <p className="mt-4 text-lead text-ink-muted">
            Most owners have never been shown this. It is not complicated, it is just rarely
            volunteered.
          </p>
        </div>

        <div ref={rootRef} className="mt-12 max-w-4xl">
          <div className="money-bar" data-shown={shown ? "true" : undefined} aria-hidden="true">
            {SPLIT.map((slice, index) => (
              <span
                key={slice.label}
                className="money-slice"
                data-tone={slice.tone}
                data-dim={active !== null && active !== index ? "true" : undefined}
                style={{
                  width: `${(slice.amount / TOTAL) * 100}%`,
                  transitionDelay: `${index * 180}ms`,
                }}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
              >
                {/*
                  A narrow slice cannot hold its own figure - at 3% the label is
                  wider than the band and clips. The legend below carries every
                  amount anyway, so the in-bar figure is dropped rather than
                  shrunk to something unreadable.
                */}
                {slice.amount / TOTAL >= 0.08 ? (
                  <span className="money-slice-amount">${slice.amount}</span>
                ) : null}
              </span>
            ))}
          </div>

          <dl className="money-legend">
            {SPLIT.map((slice, index) => (
              <div
                key={slice.label}
                className="money-item"
                data-tone={slice.tone}
                data-active={active === index ? "true" : undefined}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
              >
                <dt className="money-item-head">
                  <span className="money-dot" data-tone={slice.tone} aria-hidden="true" />
                  {slice.label}
                  <span className="money-item-amount">${slice.amount}</span>
                </dt>
                <dd className="money-item-note">{slice.note}</dd>
              </div>
            ))}
          </dl>

          <div className="money-aside">
            <p>
              <strong className="font-medium text-ink">The cleaning fee is not in this bar.</strong>{" "}
              Guests pay it on top of the nightly rate and it goes to the cleaner. It is not taken
              out of your share, and we do not mark it up.
            </p>
          </div>

          <p className="mt-6 text-[0.8125rem] leading-relaxed text-ink-subtle">
            An illustration of the shape, not a published rate card. The management figure depends
            on the property and how much of the operation you hand over, which is why we quote after
            the assessment rather than printing one number here. Channel fees are set by the
            platform and change.
          </p>
        </div>
      </Container>
    </Section>
  );
}
