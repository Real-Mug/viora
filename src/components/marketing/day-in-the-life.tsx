"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  IconCare,
  IconCheck,
  IconClock,
  IconCommunication,
  IconGuests,
  IconHome,
  IconListing,
  IconShield,
} from "@/components/ui/icons";
import { Container, Section } from "@/components/ui/section";

/**
 * A day at a managed property, played back on a clock.
 *
 * The gap this closes: an owner hands over a house and then sees nothing. They
 * get a payout and a rating and no sense of the twenty small decisions that
 * produced them. This plays the day back minute by minute so the work is
 * visible, which is the whole argument for paying someone to do it.
 *
 * It is labelled as a representative day, not a log of one real date. The rest
 * of this site refuses to present invented specifics as fact and this is no
 * exception: the events are the ones we actually run, the clock times are an
 * illustration of a normal turnover day.
 */

type Actor = "us" | "guest" | "cleaner";

type Moment = {
  /** Minutes past midnight. Drives both the label and the rail position. */
  at: number;
  icon: typeof IconClock;
  title: string;
  body: string;
  actor: Actor;
};

const ACTOR_LABEL: Record<Actor, string> = {
  us: "Viora",
  guest: "Guest",
  cleaner: "Cleaner",
};

function clockLabel(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// Typed as non-empty so indexing can fall back to the first entry without a
// non-null assertion: the fallback is provably safe rather than promised.
const MOMENTS: [Moment, ...Moment[]] = [
  {
    at: 7 * 60 + 12,
    icon: IconCommunication,
    title: "Enquiry answered before breakfast",
    body: "A question about parking for a stay six weeks out. Answered in four minutes, because response time feeds ranking.",
    actor: "us",
  },
  {
    at: 9 * 60 + 30,
    icon: IconShield,
    title: "Late checkout declined, politely",
    body: "Saying yes would have cost the cleaner her window and put the next check-in at risk. The guest got a warm no and a luggage option.",
    actor: "guest",
  },
  {
    at: 11 * 60,
    icon: IconHome,
    title: "Checkout",
    body: "Door code rotated the moment the stay ended. The old one stops working.",
    actor: "guest",
  },
  {
    at: 11 * 60 + 35,
    icon: IconCare,
    title: "Cleaner on site",
    body: "Linen swapped, consumables restocked, and every room photographed on the way out.",
    actor: "cleaner",
  },
  {
    at: 13 * 60 + 10,
    icon: IconCheck,
    title: "Condition check against the photos",
    body: "Compared to the set from the last turnover. A chipped mug logged, nothing chargeable, no drama with the departing guest.",
    actor: "us",
  },
  {
    at: 14 * 60 + 20,
    icon: IconListing,
    title: "Calendar squared away",
    body: "Turnover closed off and the night released across every channel at once, so the same date cannot sell twice.",
    actor: "us",
  },
  {
    at: 15 * 60 + 45,
    icon: IconGuests,
    title: "Arrival pack sent",
    body: "Door code, parking spot, bin day and the one step people always get wrong, timed to land while they travel.",
    actor: "us",
  },
  {
    at: 16 * 60,
    icon: IconHome,
    title: "Check-in",
    body: "Into a property that has been cleaned, checked and photographed since the last guest left five hours ago.",
    actor: "guest",
  },
  {
    at: 21 * 60 + 40,
    icon: IconCommunication,
    title: "Thermostat question, 9.40pm",
    body: "Answered in six minutes. This is the hour owners dread and the reason most of them stop self-managing.",
    actor: "us",
  },
];

const DAY_START = 6 * 60 + 30;
const DAY_END = 22 * 60 + 30;
const STEP_MS = 3400;

function railPosition(minutes: number): number {
  return ((minutes - DAY_START) / (DAY_END - DAY_START)) * 100;
}

export function DayInTheLife({ tone = "sunken" }: { tone?: "default" | "sunken" }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setPlaying(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || reduced.current) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % MOMENTS.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing]);

  const select = useCallback((index: number) => {
    setActive(index);
    setPlaying(false);
    window.setTimeout(() => setPlaying(true), STEP_MS * 2);
  }, []);

  const current = MOMENTS[active] ?? MOMENTS[0];
  const progress = railPosition(current.at);

  return (
    <Section tone={tone} aria-labelledby="day-heading">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow text-brass-600">A day at a managed property</p>
          <h2 id="day-heading" className="mt-4 text-display-md text-ink">
            The work you never see
          </h2>
          <p className="mt-4 text-lead text-ink-muted">
            You get a payout and a rating. This is what produced them.
          </p>
        </div>

        <div ref={rootRef} className="mt-12">
          {/* The clock. On a phone it sits above the rail rather than beside it. */}
          <div className="day-clock">
            <span className="day-clock-face" aria-hidden="true">
              <IconClock className="h-5 w-5" />
            </span>
            <span className="day-clock-time" aria-live="off">
              {clockLabel(current.at)}
            </span>
            <span className="day-clock-actor" data-actor={current.actor}>
              {ACTOR_LABEL[current.actor]}
            </span>
          </div>

          {/* Horizontal rail, desktop only: it needs width to read as a day. */}
          <div className="day-rail" aria-hidden="true">
            <span className="day-rail-line" />
            <span className="day-rail-fill" style={{ width: `${progress}%` }} />
            {MOMENTS.map((moment, index) => (
              <button
                key={moment.at}
                type="button"
                onClick={() => select(index)}
                className="day-rail-dot"
                data-state={index === active ? "active" : index < active ? "done" : "idle"}
                style={{ left: `${railPosition(moment.at)}%` }}
                tabIndex={-1}
                aria-hidden="true"
              />
            ))}
            <span className="day-rail-label" style={{ left: "0%" }}>
              {clockLabel(DAY_START)}
            </span>
            <span className="day-rail-label day-rail-label-end" style={{ left: "100%" }}>
              {clockLabel(DAY_END)}
            </span>
          </div>

          {/*
            The list is the content. Everything above is an illustration of it,
            which is why the rail is aria-hidden and this is a real list.
          */}
          <ol className="day-list">
            {MOMENTS.map((moment, index) => (
              <li key={moment.at}>
                <button
                  type="button"
                  onClick={() => select(index)}
                  onFocus={() => select(index)}
                  className="day-moment"
                  data-state={index === active ? "active" : index < active ? "done" : "idle"}
                  aria-current={index === active ? "true" : undefined}
                >
                  <span className="day-moment-time">{clockLabel(moment.at)}</span>
                  <span className="day-moment-icon" aria-hidden="true">
                    <moment.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="day-moment-title">
                      {moment.title}
                      <span className="day-moment-actor" data-actor={moment.actor}>
                        {ACTOR_LABEL[moment.actor]}
                      </span>
                    </span>
                    <span className="day-moment-body">{moment.body}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-2xl text-[0.8125rem] leading-relaxed text-ink-subtle">
            A representative turnover day, not a log of one date. The events are the ones we run;
            the clock is an illustration of how they fall.
          </p>
        </div>
      </Container>
    </Section>
  );
}

export { MOMENTS as dayMoments };
