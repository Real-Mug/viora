import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { HostLeadForm } from "@/components/forms/host-lead-form";
import { PageHero } from "@/components/marketing/hero";
import { FaqSection } from "@/components/marketing/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { IconCheck, IconShield } from "@/components/ui/icons";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { faqGroups } from "@/content/faqs";
import { activeServiceAreas } from "@/content/locations";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, graph, webPageSchema, type Crumb } from "@/lib/seo/schema";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Become a Host", path: "/become-a-host" },
];

export const metadata: Metadata = pageMetadata({
  title: "List Your Property - Request a Property Assessment",
  description:
    "Tell VioraRental about your Canadian property and get a free, no-obligation assessment: what we would manage, what we would change first, and what it would cost.",
  path: "/become-a-host",
});

const WHAT_HAPPENS = [
  "We read what you send and look at the property against its market",
  "We check the short-term rental rules that apply where it sits",
  "We look at your existing listing, if you have one, and note what we would change",
  "We come back with scope, honest constraints and a fee - in writing",
  "You decide. There is no obligation and the assessment costs nothing.",
];

export default function BecomeAHostPage() {
  const faqs = [
    ...(faqGroups.find((group) => group.id === "getting-started")?.items ?? []),
    ...(faqGroups.find((group) => group.id === "money-and-terms")?.items ?? []),
  ].slice(0, 7);
  const areas = activeServiceAreas();

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: "List Your Property with VioraRental",
            description:
              "Request a free property assessment for short-term rental co-hosting or management in Canada.",
            path: "/become-a-host",
            crumbs,
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
        )}
      />

      <PageHero
        eyebrow="Become a host"
        title="List your property with VioraRental"
        description="Send us the details and we will come back with an honest assessment: what we would manage, what we would change first, what it would cost, and whether we think short-term letting suits the property at all."
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      />

      <Section tight>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div>
              <h2 className="sr-only">Property assessment request form</h2>
              <HostLeadForm />
            </div>

            <aside className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:self-start">
              <div className="rounded-[var(--radius-panel)] border border-line bg-surface-raised p-6 shadow-subtle sm:p-7">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-brass-700">
                  What happens next
                </h2>
                <ol className="mt-4 grid gap-3">
                  {WHAT_HAPPENS.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-evergreen-700" />
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 rounded-[var(--radius-panel)] border border-line bg-linen-200/60 p-6">
                <div className="flex items-center gap-2.5">
                  <IconShield className="h-5 w-5 text-brass-600" />
                  <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                    Your information
                  </h2>
                </div>
                <ul className="mt-4 grid gap-2.5 text-[0.875rem] leading-relaxed text-ink-muted">
                  <li>Never published on this site or shown to other owners or guests</li>
                  <li>Never sold or shared with third parties for marketing</li>
                  <li>Used only to assess your property and respond to you</li>
                  <li>Deleted on request - just ask</li>
                </ul>
                <p className="mt-4 text-[0.8125rem] text-ink-subtle">
                  See the{" "}
                  <Link
                    href="/legal/privacy-policy"
                    className="text-evergreen-800 underline underline-offset-4"
                  >
                    privacy policy
                  </Link>{" "}
                  for retention periods and your rights under Canadian privacy law.
                </p>
              </div>

              {areas.length > 0 ? (
                <div className="mt-6 rounded-[var(--radius-panel)] border border-line bg-surface-raised p-6">
                  <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                    Markets we currently serve
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {areas.map((area) => (
                      <li key={area.slug}>
                        <Link
                          href={`/locations/${area.slug}`}
                          className="text-sm text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                        >
                          {area.city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-subtle">
                    Outside these areas? Send the form anyway. We will tell you straight whether we
                    can cover it rather than taking the property and hoping.
                  </p>
                </div>
              ) : null}
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="sunken" aria-labelledby="expect-heading">
        <Container>
          <SectionHeading
            id="expect-heading"
            eyebrow="Straight answers"
            title="What we will not tell you"
            description="Three things you will hear elsewhere in this industry that you will not hear from us."
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "A guaranteed income figure",
                body: "Revenue depends on demand, seasonality, competition and your property. Anyone guaranteeing a number is either guessing or hiding conditions in the contract.",
              },
              {
                title: "That every property works",
                body: "Some properties are not suited to short-term letting because of location, building rules or licensing. We would rather say so than take the work and underperform.",
              },
              {
                title: "A price before we have looked",
                body: "Fees depend on the property, the market and the scope. We quote after the assessment, in writing, with what it covers attached.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[var(--radius-card)] border border-line bg-surface-raised p-6 shadow-subtle"
              >
                <h3 className="text-[1.125rem] text-ink">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FaqSection
        items={faqs}
        eyebrow="Before you send"
        title="Questions owners ask first"
        headingId="host-faq-heading"
      />
    </>
  );
}
