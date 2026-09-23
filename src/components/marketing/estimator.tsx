"use client";

import { useMemo, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { Container, Section } from "@/components/ui/section";
import { CTA } from "@/lib/config/site";

/**
 * The estimator that refuses to inflate.
 *
 * Every competitor ships a revenue calculator, and every one of them works the
 * same way: invent a market rate, invent an occupancy, multiply, print one
 * confident number that happens to be large. It is the single least honest
 * artefact in this industry.
 *
 * This one cannot do that, by construction:
 *
 *   - It uses the OWNER'S numbers. Their nightly rate, their nights booked.
 *     We hold no market data we could stand behind, so we ask for none and
 *     invent none.
 *   - It outputs a band, not a figure. Months vary; a single number implies a
 *     precision that does not exist.
 *   - It shows the deductions. Gross is the number competitors lead with; what
 *     reaches the owner is the number that matters.
 *   - It makes no claim about improvement. There is no "with us you'd earn"
 *     line, because we cannot know that and the rest of the site says so.
 *
 * The one figure here that is ours rather than theirs is the management share,
 * and it carries the same illustration label it carries in MoneyFlow.
 */

/** Illustrative, and labelled as such on screen. See MoneyFlow. */
const CHANNEL_RATE = 0.03;
const MANAGEMENT_RATE = 0.18;

/**
 * Month-to-month spread. Short-term rental income is seasonal and lumpy, so a
 * point estimate is a lie of precision; this is the band we show instead.
 */
const SPREAD = 0.15;

const money = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

export function Estimator({ tone = "sunken" }: { tone?: "default" | "sunken" }) {
  const [rate, setRate] = useState(185);
  const [nights, setNights] = useState(14);

  const figures = useMemo(() => {
    const grossYear = rate * nights * 12;
    const channel = grossYear * CHANNEL_RATE;
    const management = grossYear * MANAGEMENT_RATE;
    const net = grossYear - channel - management;
    return {
      grossYear,
      channel,
      management,
      net,
      low: net * (1 - SPREAD),
      high: net * (1 + SPREAD),
    };
  }, [rate, nights]);

  return (
    <Section tone={tone} aria-labelledby="estimator-heading">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow text-brass-700">Your numbers, not ours</p>
          <h2 id="estimator-heading" className="mt-4 text-display-md text-ink">
            The estimator that will not flatter you
          </h2>
          <p className="mt-4 text-lead text-ink-muted">
            Every calculator in this industry invents a market rate and prints one large number.
            This one asks what you actually charge, and shows what reaches you.
          </p>
        </div>

        <div className="est-grid">
          {/* ----------------------------------------------------- inputs */}
          <div className="est-controls">
            <div className="est-field">
              <label className="est-label" htmlFor="est-rate">
                Your nightly rate
                <output className="est-value" htmlFor="est-rate">
                  {money.format(rate)}
                </output>
              </label>
              <input
                id="est-rate"
                className="est-range"
                type="range"
                min={50}
                max={800}
                step={5}
                value={rate}
                onChange={(event) => setRate(Number(event.target.value))}
              />
              <div className="est-scale" aria-hidden="true">
                <span>$50</span>
                <span>$800</span>
              </div>
            </div>

            <div className="est-field">
              <label className="est-label" htmlFor="est-nights">
                Nights booked, typical month
                <output className="est-value" htmlFor="est-nights">
                  {nights}
                </output>
              </label>
              <input
                id="est-nights"
                className="est-range"
                type="range"
                min={0}
                max={30}
                step={1}
                value={nights}
                onChange={(event) => setNights(Number(event.target.value))}
              />
              <div className="est-scale" aria-hidden="true">
                <span>0</span>
                <span>30</span>
              </div>
            </div>

            <dl className="est-breakdown">
              <div>
                <dt>Gross a year</dt>
                <dd>
                  <CountUp value={figures.grossYear} format={(n) => money.format(n)} />
                </dd>
              </div>
              <div>
                <dt>Channel fee</dt>
                <dd className="est-minus">&minus;{money.format(figures.channel)}</dd>
              </div>
              <div>
                <dt>Management</dt>
                <dd className="est-minus">&minus;{money.format(figures.management)}</dd>
              </div>
            </dl>
          </div>

          {/* ---------------------------------------------------- outputs */}
          <div className="est-result">
            <p className="est-result-label">What reaches you, before your own costs</p>

            <p className="est-band">
              <span className="est-band-low">
                <CountUp value={figures.low} format={(n) => money.format(n)} />
              </span>
              <span className="est-band-dash" aria-hidden="true" />
              <span className="est-band-high">
                <CountUp value={figures.high} format={(n) => money.format(n)} />
              </span>
            </p>

            <div className="est-bar" aria-hidden="true">
              <span className="est-bar-track" />
              <span className="est-bar-band" />
            </div>

            <p className="est-band-note">
              A band, not a figure. Short-term rental income is seasonal and lumpy, and any single
              number would imply a precision that does not exist.
            </p>

            <div className="est-cta">
              <ButtonLink href={CTA.primary.href} size="sm">
                {CTA.primary.label}
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="est-assumptions">
          <p className="est-assumptions-title">What this does and does not do</p>
          <ul>
            <li>
              It uses <strong className="font-medium text-ink">your</strong> rate and occupancy. We
              hold no market data we would stand behind, so we ask for yours rather than inventing
              any.
            </li>
            <li>
              It makes no claim that we would improve either number. We do not know that, and
              anyone who tells you otherwise is guessing at best.
            </li>
            <li>
              The management share is illustrative, as it is elsewhere on this site. Your fee is
              quoted after the property assessment.
            </li>
            <li>
              Your own costs are not in here: mortgage, utilities, insurance, furnishing, tax. Nor
              is the cleaning fee, which guests pay and cleaners receive.
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
