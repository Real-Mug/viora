import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/marketing/hero";
import { CtaBand, HowItWorks, ServicesGrid } from "@/components/marketing/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { activeServiceAreas } from "@/content/locations";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, serviceSchema, webPageSchema, type Crumb } from "@/lib/seo/schema";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export const metadata: Metadata = pageMetadata({
  title: "Short-Term Rental and Airbnb Management Services",
  description:
    "Co-hosting, full rental management, listing optimization, guest communication, revenue management and property care for Canadian short-term rental owners.",
  path: "/services",
});

export default function ServicesPage() {
  const areas = activeServiceAreas();

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: "Short-Term Rental and Airbnb Management Services",
            description:
              "The co-hosting, management and operational services VioraRental delivers for Canadian property owners.",
            path: "/services",
            crumbs,
          }),
          breadcrumbSchema(crumbs),
          ...services.map(serviceSchema),
        )}
      />

      <PageHero
        eyebrow="Services"
        title="Take the whole operation, or just the part that is costing you your evenings"
        description="Every service below is one we deliver ourselves. Owners commonly start with one and add others as they get comfortable handing work over."
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      />

      <Section>
        <Container>
          <ServicesGrid services={services} />
        </Container>
      </Section>

      <Section tone="sunken" aria-labelledby="choose-heading">
        <Container>
          <SectionHeading
            id="choose-heading"
            eyebrow="Choosing"
            title="Co-hosting or full management?"
            description="The two most common arrangements, and the honest difference between them."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[var(--radius-panel)] border border-line bg-surface-raised p-7 shadow-subtle">
              <h3 className="text-display-sm text-ink">Co-hosting</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">
                A support arrangement. You stay the host of record, the listing stays in your
                account, and we take on the parts of the work you choose. Easy to scope up or down.
              </p>
              <ul className="mt-5 grid gap-2.5 text-[0.9375rem] text-ink-muted">
                <li>Best when you want your time back but still enjoy the business side</li>
                <li>You keep the final say on pricing and house rules</li>
                <li>Commonly starts with guest communication alone</li>
              </ul>
              <div className="mt-7">
                <Link
                  href="/services/airbnb-co-hosting"
                  className="text-[0.9375rem] font-medium text-evergreen-800 underline-offset-4 hover:underline"
                >
                  About Airbnb co-hosting
                </Link>
              </div>
            </div>

            <div className="rounded-[var(--radius-panel)] border border-line bg-surface-raised p-7 shadow-subtle">
              <h3 className="text-display-sm text-ink">Full management</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">
                A delegation. We run the operation end to end - calendar, guests, suppliers, standards
                - and report back to you rather than handing you decisions each week.
              </p>
              <ul className="mt-5 grid gap-2.5 text-[0.9375rem] text-ink-muted">
                <li>Best when you want the property genuinely off your plate</li>
                <li>You keep owner stays and set spending thresholds</li>
                <li>Suits investors and owners far from the property</li>
              </ul>
              <div className="mt-7">
                <Link
                  href="/services/short-term-rental-management"
                  className="text-[0.9375rem] font-medium text-evergreen-800 underline-offset-4 hover:underline"
                >
                  About full rental management
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <HowItWorks tone="default" />

      {areas.length > 0 ? (
        <Section tone="sunken" aria-labelledby="areas-heading">
          <Container>
            <SectionHeading
              id="areas-heading"
              eyebrow="Where"
              title="These services, in the markets we know"
              description="Each service area page covers how short-term letting actually works locally, including the rules that decide whether a property qualifies at all."
            />
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/locations/${area.slug}`}
                    className="text-[0.9375rem] text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                  >
                    {area.city}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        title="Not sure which of these you need?"
        description="Tell us what is taking up your time and we will tell you which parts of the operation are worth handing over first. That answer is free, and it is sometimes 'none of them yet'."
      />
    </>
  );
}
