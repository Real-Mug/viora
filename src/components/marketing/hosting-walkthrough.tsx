"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { CTA } from "@/lib/config/site";
import { cn } from "@/lib/cn";

/**
 * Animated walkthrough of what actually happens to an owner's property.
 *
 * The point is comprehension, not decoration: an owner deciding whether to hand
 * over their house should be able to watch the whole operation in about twenty
 * seconds without reading a page of prose.
 *
 * How it degrades, in order of how likely each case is:
 *   - No JS: every step renders, the first scene is shown, nothing is hidden.
 *     The start states below are scoped to `.js` in globals.css for this reason.
 *   - prefers-reduced-motion: no auto-advance and no scene animation. Steps are
 *     still clickable, so the content remains reachable.
 *   - Off screen: the timer is stopped, so a background tab is not animating.
 *
 * The scenes are `aria-hidden` on purpose. They illustrate the step text rather
 * than adding to it, and the step list is a real <ol>, so a screen reader gets
 * the whole process in order without narrating decorative SVG.
 */

const STEP_MS = 4600;

type Step = {
  number: string;
  title: string;
  body: string;
  scene: (active: boolean) => React.ReactNode;
};

/* -------------------------------------------------------------------------- */
/* Scene primitives                                                            */
/* -------------------------------------------------------------------------- */

/** Wraps a scene so every child animation shares one coordinate system. */
function Stage({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" role="presentation" focusable="false">
      {children}
    </svg>
  );
}

/** Delay helper: keeps the stagger declarations readable at the call site. */
function d(ms: number) {
  return { "--walk-delay": `${ms}ms` } as React.CSSProperties;
}

/* -------------------------------------------------------------------------- */
/* Scenes                                                                      */
/* -------------------------------------------------------------------------- */

function SceneAssessment() {
  return (
    <Stage>
      {/* House outline, drawn on rather than faded in. */}
      <path
        className="walk-draw walk-stroke-gold"
        style={{ ...d(0), "--walk-len": 420 } as React.CSSProperties}
        d="M58 126 160 54l102 72"
        fill="none"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="walk-draw walk-stroke"
        style={{ ...d(260), "--walk-len": 460 } as React.CSSProperties}
        d="M80 116v70h160v-70"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        className="walk-in walk-fill-soft"
        style={d(700)}
        x={140}
        y={146}
        width={40}
        height={40}
        rx={3}
      />
      {/* Survey pins: what we are actually checking. */}
      {[
        { x: 104, y: 150, label: "Market", below: true },
        { x: 220, y: 150, label: "Rules", below: true },
        // Sits inside the roof, so its label hangs below the pin to stay clear
        // of the rafters rather than colliding with them near the apex.
        { x: 160, y: 96, label: "Condition", below: true },
      ].map((pin, i) => (
        <g key={pin.label} className="walk-in" style={d(950 + i * 220)}>
          <circle className="walk-pulse walk-fill-gold" cx={pin.x} cy={pin.y} r={4} />
          <circle className="walk-stroke-gold" cx={pin.x} cy={pin.y} r={9} fill="none" strokeWidth={1} opacity={0.5} />
          <text
            className="walk-label"
            x={pin.x}
            y={pin.below ? pin.y + 22 : pin.y - 16}
            textAnchor="middle"
          >
            {pin.label}
          </text>
        </g>
      ))}
      <text className="walk-caption" x={160} y={216} textAnchor="middle">
        We read the property, the market and the rules
      </text>
    </Stage>
  );
}

function SceneListing() {
  return (
    <Stage>
      <rect className="walk-in walk-fill-panel" style={d(0)} x={62} y={38} width={196} height={150} rx={10} />
      {/* Photo block. */}
      <rect className="walk-in walk-fill-soft" style={d(200)} x={74} y={50} width={172} height={62} rx={6} />
      <path
        className="walk-in walk-stroke-gold"
        style={d(380)}
        d="M92 100l22-22 18 18 16-14 30 30"
        fill="none"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="walk-in walk-fill-gold" style={d(460)} cx={196} cy={68} r={6} />
      {/* Title and copy lines writing themselves in. */}
      {[
        { w: 120, y: 124, delay: 620 },
        { w: 148, y: 138, delay: 720 },
        { w: 96, y: 152, delay: 820 },
      ].map((line) => (
        <rect
          key={line.y}
          className="walk-sweep walk-fill-line"
          style={d(line.delay)}
          x={74}
          y={line.y}
          width={line.w}
          height={5}
          rx={2.5}
        />
      ))}
      {/* Price + live badge. */}
      <text className="walk-in walk-price" style={d(980)} x={74} y={178}>
        $245
      </text>
      <text className="walk-in walk-label" style={d(980)} x={110} y={178}>
        / night
      </text>
      <g className="walk-pop" style={d(1180)}>
        <rect className="walk-fill-gold" x={196} y={164} width={50} height={20} rx={10} />
        <text className="walk-badge" x={221} y={178} textAnchor="middle">
          LIVE
        </text>
      </g>
      <text className="walk-caption" x={160} y={216} textAnchor="middle">
        Photographed, written and priced, then published
      </text>
    </Stage>
  );
}

function SceneBookings() {
  // A month grid where the booked nights land one after another.
  const cells = Array.from({ length: 28 }, (_, i) => i);
  const booked = new Set([3, 4, 5, 10, 11, 12, 16, 17, 18, 19, 23, 24]);

  return (
    <Stage>
      <rect className="walk-in walk-fill-panel" style={d(0)} x={54} y={40} width={148} height={148} rx={10} />
      {cells.map((i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const isBooked = booked.has(i);
        return (
          <rect
            key={i}
            className={cn("walk-in", isBooked ? "walk-fill-gold" : "walk-fill-soft")}
            style={d(isBooked ? 300 + i * 55 : 120 + i * 8)}
            x={64 + col * 19}
            y={56 + row * 19}
            width={14}
            height={14}
            rx={3}
          />
        );
      })}
      {/* Messages handled alongside the bookings. */}
      {[0, 1, 2].map((i) => (
        <g key={i} className="walk-in" style={d(900 + i * 300)}>
          <rect
            className={i % 2 === 0 ? "walk-fill-soft" : "walk-fill-gold-soft"}
            x={i % 2 === 0 ? 216 : 232}
            y={62 + i * 34}
            width={i % 2 === 0 ? 56 : 40}
            height={22}
            rx={11}
          />
        </g>
      ))}
      <text className="walk-caption" x={160} y={216} textAnchor="middle">
        Enquiries answered, nights filled, calendar kept straight
      </text>
    </Stage>
  );
}

function SceneStay() {
  const jobs = ["Check-in", "Clean", "Restock", "Check-out"];
  return (
    <Stage>
      {/* The spine of the turnover. */}
      <line
        className="walk-draw walk-stroke"
        style={{ ...d(0), "--walk-len": 140 } as React.CSSProperties}
        x1={78}
        y1={64}
        x2={78}
        y2={172}
        strokeWidth={2}
        strokeLinecap="round"
      />
      {jobs.map((job, i) => (
        <g key={job}>
          <circle
            className="walk-pop walk-fill-gold"
            style={d(300 + i * 420)}
            cx={78}
            cy={64 + i * 36}
            r={9}
          />
          <path
            className="walk-draw walk-stroke-dark"
            style={{ ...d(480 + i * 420), "--walk-len": 22 } as React.CSSProperties}
            d={`M${73.5} ${64 + i * 36}l3 3.4 5.5-6`}
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text className="walk-in walk-job" style={d(380 + i * 420)} x={100} y={68 + i * 36}>
            {job}
          </text>
          <rect
            className="walk-sweep walk-fill-line"
            style={d(420 + i * 420)}
            x={168}
            y={60 + i * 36}
            width={74}
            height={4}
            rx={2}
          />
        </g>
      ))}
      <text className="walk-caption" x={160} y={216} textAnchor="middle">
        Every stay turned over to the same standard
      </text>
    </Stage>
  );
}

function ScenePayout() {
  const bars = [34, 52, 44, 70, 86];
  return (
    <Stage>
      <line className="walk-in walk-stroke" style={d(0)} x1={68} y1={158} x2={252} y2={158} strokeWidth={1.5} />
      {bars.map((h, i) => (
        <rect
          key={i}
          className={cn("walk-grow", i === bars.length - 1 ? "walk-fill-gold" : "walk-fill-soft")}
          style={{ ...d(220 + i * 170), transformOrigin: `0px 158px` }}
          x={82 + i * 34}
          y={158 - h}
          width={20}
          height={h}
          rx={4}
        />
      ))}
      <g className="walk-pop" style={d(1180)}>
        <rect className="walk-fill-panel" x={78} y={174} width={164} height={30} rx={8} />
        <text className="walk-payout" x={90} y={194}>
          Payout + written report
        </text>
        <circle className="walk-pulse walk-fill-gold" cx={228} cy={189} r={4} />
      </g>
      <text className="walk-caption" x={160} y={226} textAnchor="middle">
        You see what came in, what it cost, and what we would change
      </text>
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */

const STEPS: Step[] = [
  {
    number: "01",
    title: "We assess the property",
    body: "The house, the market and the local rules. If short-term letting is wrong for it, we say so.",
    scene: () => <SceneAssessment />,
  },
  {
    number: "02",
    title: "We build and publish the listing",
    body: "Photographed, written and priced, then put live where the right guests are already looking.",
    scene: () => <SceneListing />,
  },
  {
    number: "03",
    title: "We fill the calendar",
    body: "Every enquiry answered, every guest screened, pricing moved with demand.",
    scene: () => <SceneBookings />,
  },
  {
    number: "04",
    title: "We run every stay",
    body: "Check-in, cleaning, restocking, maintenance. The turnover happens whether you are thinking about it or not.",
    scene: () => <SceneStay />,
  },
  {
    number: "05",
    title: "You get paid and told what happened",
    body: "Income, costs and what we would change next, in writing. No chasing us for it.",
    scene: () => <ScenePayout />,
  },
];

export function HostingWalkthrough({
  tone = "default",
  showCta = true,
}: {
  tone?: "default" | "sunken";
  showCta?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  /* Only run the timer while the section is actually on screen. */
  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setPlaying(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || reduced.current) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % STEPS.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing]);

  /* Taking manual control restarts the dwell on the chosen step rather than
     cutting it short on whatever was left of the previous interval. */
  const select = useCallback((index: number) => {
    setActive(index);
    setPlaying(false);
    window.setTimeout(() => setPlaying(true), STEP_MS);
  }, []);

  return (
    <Section tone={tone} aria-labelledby="walkthrough-heading">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow text-brass-600">How we host your property</p>
          <h2 id="walkthrough-heading" className="mt-4 text-display-md text-ink">
            Five steps, start to payout
          </h2>
          <p className="mt-4 text-lead text-ink-muted">
            This is the whole operation. Watch it run, or click any step.
          </p>
        </div>

        <div
          ref={rootRef}
          className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14"
        >
          <ol className="walk-steps grid gap-1.5">
            {STEPS.map((step, index) => (
              <li key={step.number}>
                <button
                  type="button"
                  onClick={() => select(index)}
                  onMouseEnter={() => select(index)}
                  aria-current={index === active ? "step" : undefined}
                  data-state={index === active ? "active" : index < active ? "done" : "idle"}
                  className="walk-step group flex w-full gap-4 rounded-[var(--radius-card)] p-4 text-left"
                >
                  <span className="walk-step-num shrink-0">{step.number}</span>
                  <span className="min-w-0">
                    <span className="walk-step-title block">{step.title}</span>
                    <span className="walk-step-body mt-1 block">{step.body}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="lg:sticky lg:top-28">
            <div className="walk-stage" aria-hidden="true">
              {STEPS.map((step, index) => (
                <div
                  key={step.number}
                  className="walk-scene"
                  data-state={index === active ? "active" : "idle"}
                >
                  {step.scene(index === active)}
                </div>
              ))}
            </div>

            <div className="walk-track mt-5" aria-hidden="true">
              <span
                className="walk-track-bar"
                style={{ "--walk-progress": `${((active + 1) / STEPS.length) * 100}%` } as React.CSSProperties}
              />
            </div>

            <div className="mt-4 flex gap-2" role="group" aria-label="Choose a step">
              {STEPS.map((step, index) => (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => select(index)}
                  data-state={index === active ? "active" : "idle"}
                  className="walk-dot"
                  aria-label={`Step ${index + 1}: ${step.title}`}
                >
                  {step.number}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showCta ? (
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={CTA.primary.href} size="lg">
              {CTA.primary.label}
            </ButtonLink>
            <ButtonLink href="/how-it-works" variant="secondary" size="lg">
              See the full process
            </ButtonLink>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
