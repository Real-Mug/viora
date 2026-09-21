import Link from "next/link";
import type { ReactNode } from "react";

import { Accordion, type FaqItem } from "@/components/ui/accordion";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import {
  IconCheck,
  IconClock,
  IconDocument,
  IconShield,
  IconSparkle,
  SERVICE_ICONS,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { CTA } from "@/lib/config/site";
import type { Service } from "@/lib/types/service";

/* ========================================================================== */
/* Trust                                                                       */
/* ========================================================================== */

/**
 * The trust band that sits directly under the hero.
 *
 * It deliberately carries no numbers. Statistics - properties managed, years in
 * business, average ratings - are exactly the claims that need to be true and
 * verifiable, and none of them are established yet. Capability statements are
 * honest at any stage of a company's life.
 */
const TRUST_PILLARS = [
  {
    icon: IconShield,
    title: "Professional management",
    body: "Set standards for cleaning and upkeep, checked rather than assumed.",
  },
  {
    icon: IconClock,
    title: "Responsive guest support",
    body: "Guests reach a real person, to response times agreed in writing.",
  },
  {
    icon: IconSparkle,
    title: "Listing optimization",
    body: "Written for the guest deciding, kept current as the property changes.",
  },
  {
    icon: IconCheck,
    title: "Reliable operations",
    body: "Turnovers, trades and suppliers run against the live calendar.",
  },
  {
    icon: IconDocument,
    title: "Transparent communication",
    body: "What happened, what it cost, what we would change. In writing.",
  },
  {
    icon: IconSparkle,
    title: "Technology-supported",
    body: "Tools take the repetitive work. People still make the calls.",
  },
] as const;

export function TrustSection() {
  return (
    <Section aria-labelledby="trust-heading">
      <Container>
        <SectionHeading
          id="trust-heading"
          eyebrow="Why owners work with us"
          title="Built for owners. Run for guests."
          description="Short-term rentals are won on the boring things, done every time. That is the work we take on."
        />

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_PILLARS.map((pillar) => (
            <li key={pillar.title}>
              <pillar.icon className="h-7 w-7 text-brass-600" />
              <h3 className="mt-4 text-[1.1875rem] text-ink">{pillar.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">{pillar.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/* Services                                                                    */
/* ========================================================================== */

export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-[var(--radius-card)] border border-line bg-surface-raised p-6 sm:p-7",
        "lift shadow-subtle hover:border-line-strong hover:shadow-card",
        className,
      )}
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-evergreen-50 text-evergreen-800">
        <Icon className="h-6 w-6" />
      </span>

      <h3 className="mt-5 text-[1.25rem] leading-snug text-ink">
        <Link href={`/services/${service.slug}`} className="before:absolute before:inset-0">
          <span className="transition-colors duration-300 group-hover:text-evergreen-800">
            {service.name}
          </span>
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">{service.summary}</p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-evergreen-800">
        Learn more
        <ArrowRight />
      </span>
    </article>
  );
}

export function ServicesGrid({
  services,
  className,
  columns = 3,
}: {
  services: Service[];
  className?: string;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid gap-6",
        columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
        className,
      )}
    >
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}

/* ========================================================================== */
/* How it works                                                                */
/* ========================================================================== */

const STEPS = [
  {
    number: "01",
    title: "Tell us about your property",
    body: "Where it is, what it is, where you are with it now. A few minutes, no commitment.",
    detail: "Owner details are never published on this site.",
  },
  {
    number: "02",
    title: "Property assessment",
    body: "We read the property, the market and the local rules, then tell you what we would run and change first.",
    detail: "If short-term letting is wrong for the property, we say so.",
  },
  {
    number: "03",
    title: "We run the operation",
    body: "Guests, turnovers, maintenance and the listing itself, once the scope and fee are agreed in writing.",
    detail: "You set the spending thresholds before anything starts.",
  },
  {
    number: "04",
    title: "You stay informed",
    body: "What happened, what it cost, what we would change next. In writing, plus a direct line to us.",
    detail: "Owner dashboards are on the roadmap. Until then, reporting is written and direct.",
  },
] as const;

export function HowItWorks({
  tone = "sunken",
  heading = "How it starts",
  showCta = true,
}: {
  tone?: "default" | "sunken";
  heading?: string;
  showCta?: boolean;
}) {
  return (
    <Section tone={tone} aria-labelledby="how-it-works-heading">
      <Container>
        <SectionHeading
          id="how-it-works-heading"
          eyebrow="How it works"
          title={heading}
          description="Nothing is owed until the scope and fee are agreed in writing."
        />

        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, index) => (
            <li key={step.number} className="relative">
              {/* Connector, drawn only between items on wide screens. */}
              {index < STEPS.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-14 right-0 top-6 hidden h-px bg-line lg:block"
                />
              ) : null}

              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-brass-300 bg-surface-raised font-display text-lg text-brass-700">
                {step.number}
              </span>

              <h3 className="mt-5 text-[1.1875rem] leading-snug text-ink">{step.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{step.body}</p>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-subtle">{step.detail}</p>
            </li>
          ))}
        </ol>

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

/* ========================================================================== */
/* CTA band                                                                    */
/* ========================================================================== */

export function CtaBand({
  eyebrow = "Next step",
  title,
  description,
  primary = CTA.primary,
  secondary = CTA.secondary,
  note,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
  note?: ReactNode;
}) {
  return (
    <Section tone="evergreen" aria-labelledby="cta-heading">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h2 id="cta-heading" className="mt-4 text-display-md text-linen-50">
            {title}
          </h2>
          <p className="mt-5 text-lead text-linen-300">{description}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primary.href} variant="onDark" size="lg">
              {primary.label}
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="onDarkGhost" size="lg">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>

          {note ? <p className="mt-7 max-w-xl text-sm leading-relaxed text-linen-400">{note}</p> : null}
        </div>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/* FAQ                                                                         */
/* ========================================================================== */

export function FaqSection({
  items,
  eyebrow = "Questions",
  title = "Common questions from property owners",
  description,
  showAllLink = true,
  tone = "default",
  headingId = "faq-heading",
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  showAllLink?: boolean;
  tone?: "default" | "sunken";
  headingId?: string;
}) {
  if (!items.length) return null;

  return (
    <Section tone={tone} aria-labelledby={headingId}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <SectionHeading id={headingId} eyebrow={eyebrow} title={title} description={description} />
            {showAllLink ? (
              <div className="mt-7">
                <ButtonLink href="/faq" variant="secondary">
                  Read all FAQs
                </ButtonLink>
              </div>
            ) : null}
          </div>

          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/* Feature strip                                                               */
/* ========================================================================== */

/** A simple two-column feature row used on service and location pages. */
export function SplitFeature({
  eyebrow,
  title,
  children,
  media,
  reverse = false,
  tone = "default",
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  media: ReactNode;
  reverse?: boolean;
  tone?: "default" | "sunken";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={cn(reverse && "lg:order-2")}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h2 className={cn("text-display-md text-ink", eyebrow && "mt-4")}>{title}</h2>
            <div className="prose-viora mt-5">{children}</div>
          </div>
          <div className={cn(reverse && "lg:order-1")}>{media}</div>
        </div>
      </Container>
    </Section>
  );
}
