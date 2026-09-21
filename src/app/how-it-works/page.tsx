import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/marketing/hero";
import { CtaBand, FaqSection } from "@/components/marketing/sections";
import { HostingWalkthrough } from "@/components/marketing/hosting-walkthrough";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { IconCheck, IconInfo } from "@/components/ui/icons";
import { Note } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { faqGroups } from "@/content/faqs";
import { CTA } from "@/lib/config/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, graph, webPageSchema, type Crumb } from "@/lib/seo/schema";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "How It Works", path: "/how-it-works" },
];

export const metadata: Metadata = pageMetadata({
  title: "How Viora Hosting Works with Property Owners",
  description:
    "From first enquiry to ongoing management: the assessment, what we agree in writing, how we take over operations, and what reporting you receive.",
  path: "/how-it-works",
});

const ASSESSMENT_COVERS = [
  "Whether the property can be let short-term where it is - municipal rules, provincial requirements and any condominium or strata restrictions",
  "What the property realistically suits: guest type, group size, length of stay",
  "What needs doing before it is ready to let, including work we do not do ourselves",
  "How the existing listing is performing and what we would change first",
  "What we would manage, what stays with you, and what it would cost",
  "Whether we think short-term letting is the right use for the property at all",
];

const AGREED_IN_WRITING = [
  { title: "Scope", body: "Exactly which services we deliver, and what sits outside the arrangement." },
  { title: "Fees", body: "How we are paid, what it covers, and what is billed separately as a property cost." },
  { title: "Response standards", body: "What we commit to on guest response times, and during which hours." },
  { title: "Spending thresholds", body: "What we can authorise without asking, and what always comes to you first." },
  { title: "Reporting", body: "What you receive, how often, and what it shows." },
  { title: "Ending it", body: "Notice period, and what happens to the listing and future bookings when the arrangement ends." },
];

export default function HowItWorksPage() {
  const faqs = faqGroups.find((group) => group.id === "getting-started")?.items ?? [];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: "How Viora Hosting Works with Property Owners",
            description:
              "The process from first enquiry through assessment, agreement and ongoing management.",
            path: "/how-it-works",
            crumbs,
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
        )}
      />

      <PageHero
        eyebrow="How it works"
        title="From first enquiry to a property that runs without you"
        description="Nothing is committed until the scope and fee are agreed in writing. The assessment costs you nothing."
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
        actions={
          <ButtonLink href={CTA.primary.href} size="lg">
            {CTA.primary.label}
          </ButtonLink>
        }
      />

      <HostingWalkthrough tone="default" showCta={false} />

      <Section tone="sunken" aria-labelledby="assessment-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                id="assessment-heading"
                eyebrow="Step two, in detail"
                title="What the property assessment actually covers"
                description="This is the part that decides whether working together makes sense. It is free, and it is not a sales call with a form at the end."
              />
              <Note icon={<IconInfo className="h-4 w-4 text-brass-600" />} className="mt-7" tone="brand">
                We will tell you if the answer is no. A property in a building that prohibits
                short-term rentals, or in a market where we cannot get a cleaner reliably, is not
                something we will take on and then quietly underperform.
              </Note>
            </div>

            <ul className="grid gap-4">
              {ASSESSMENT_COVERS.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-evergreen-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="agreement-heading">
        <Container>
          <SectionHeading
            id="agreement-heading"
            eyebrow="Before anything starts"
            title="What gets agreed in writing"
            description="Most disappointment in this industry comes from a vague scope rather than from bad work. So we write it down."
          />

          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {AGREED_IN_WRITING.map((item) => (
              <div key={item.title} className="border-t border-line pt-5">
                <dt className="text-[1.0625rem] font-medium text-ink">{item.title}</dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="sunken" aria-labelledby="ongoing-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                id="ongoing-heading"
                eyebrow="Once we are running"
                title="What ongoing management looks like"
              />
              <div className="prose-viora mt-6">
                <p>
                  Day to day, most of the work is invisible to you, which is the point. Guests are
                  answered, turnovers are scheduled and checked, supplies are restocked, and problems
                  are handled before they reach you.
                </p>
                <p>
                  What you see is the reporting: what happened at the property, what it cost, what
                  the reviews said, and what we think is worth changing. Plus a direct line to us
                  whenever you want one.
                </p>
                <p>
                  Bigger decisions - a repair above your threshold, a change in pricing strategy, a
                  problem guest - come to you with the context and our recommendation, not as a
                  question with no background.
                </p>
                <p>
                  An owner dashboard is on our roadmap. Until it exists and is genuinely useful,
                  reporting is written and direct rather than a login that shows you very little.
                </p>
              </div>
            </div>

            <div className="rounded-[var(--radius-panel)] border border-line bg-surface-raised p-7 shadow-subtle">
              <h3 className="text-display-sm text-ink">What stays yours</h3>
              <ul className="mt-5 grid gap-3">
                {[
                  "The property, obviously - we manage, we do not lease",
                  "Owner stays: block your own dates whenever you want",
                  "The final say on major spending",
                  "Under co-hosting, the listing itself and host-of-record status",
                  "Legal responsibility for licensing, tax and insurance, which cannot be delegated",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-evergreen-700" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-7 border-t border-line pt-6 text-[0.9375rem] leading-relaxed text-ink-muted">
                Not sure which arrangement fits? The difference between{" "}
                <Link
                  href="/services/airbnb-co-hosting"
                  className="text-evergreen-800 underline underline-offset-4"
                >
                  co-hosting
                </Link>{" "}
                and{" "}
                <Link
                  href="/services/short-term-rental-management"
                  className="text-evergreen-800 underline underline-offset-4"
                >
                  full management
                </Link>{" "}
                is worth two minutes of reading.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection
        items={faqs}
        eyebrow="Getting started"
        title="Questions about starting out"
        headingId="how-faq-heading"
      />

      <CtaBand
        title="Step one takes about five minutes"
        description="Tell us about the property. We will do the rest of the work before we come back to you."
      />
    </>
  );
}
