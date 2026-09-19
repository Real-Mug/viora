import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PropertyExplorer } from "@/components/property/property-explorer";
import { PageHero } from "@/components/marketing/hero";
import { CtaBand } from "@/components/marketing/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { SampleBadge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/section";
import { showPlaceholders } from "@/lib/config/env";
import { CTA } from "@/lib/config/site";
import { properties } from "@/lib/data";
import { absoluteUrl } from "@/lib/config/env";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/seo/schema";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Properties", path: "/properties" },
];

export const metadata: Metadata = pageMetadata({
  title: "Short-Term Rental Properties in Canada",
  description:
    "Browse the short-term rental properties managed by VioraRental across Canada. Filter by location, property type, guests, bedrooms and amenities.",
  path: "/properties",
});

export default async function PropertiesPage() {
  // The full catalogue is passed to the client explorer. At this scale that is
  // far cheaper than a round trip per filter change; see the note in
  // property-explorer.tsx for where that stops being true.
  const all = await properties.list({ pageSize: 1000 });
  const facets = await properties.facets();

  const hasPlaceholders = showPlaceholders && all.items.some((property) => property.isPlaceholder);

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: "Short-Term Rental Properties in Canada",
            description: "Properties managed by VioraRental across Canadian markets.",
            path: "/properties",
            crumbs,
          }),
          breadcrumbSchema(crumbs),
          // An ItemList of the properties actually rendered on this page.
          all.items.length
            ? {
                "@type": "ItemList",
                itemListElement: all.items.slice(0, 30).map((property, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: absoluteUrl(`/properties/${property.slug}`),
                  name: property.name,
                })),
              }
            : null,
        )}
      />

      <PageHero
        eyebrow="Properties"
        title="Properties managed by VioraRental"
        description="Every property here is run by the same team, to the same standard: presented properly, kept clean, and supported by someone who answers."
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      />

      {hasPlaceholders ? (
        <Container className="pt-8">
          <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-brass-200 bg-brass-50 p-5 sm:flex-row sm:items-center">
            <SampleBadge />
            <p className="text-sm leading-relaxed text-brass-900">
              The listings below are samples, used while the site is being prepared for launch. They
              are not properties currently under management. Each one is labelled, and all of them
              are removed the moment real inventory is published.
            </p>
          </div>
        </Container>
      ) : null}

      <Section tight>
        <Container>
          {all.items.length > 0 ? (
            <PropertyExplorer allProperties={all.items} facets={facets} />
          ) : (
            <div className="rounded-[var(--radius-panel)] border border-dashed border-line-strong bg-linen-200/50 p-10 text-center sm:p-14">
              <h2 className="text-display-sm text-ink">Our portfolio is not published yet</h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-muted">
                We would rather show you nothing than show you properties we do not manage. As
                owners come on board and agree to be listed, their properties will appear here with
                full details, photography and direct enquiry.
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-subtle">
                If you are looking for somewhere to stay, get in touch and tell us what you need -
                we may have something that is not listed publicly.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href={CTA.primary.href} size="lg">
                  {CTA.primary.label}
                </ButtonLink>
                <ButtonLink href={CTA.contact.href} variant="secondary" size="lg">
                  {CTA.contact.label}
                </ButtonLink>
              </div>
            </div>
          )}
        </Container>
      </Section>

      <CtaBand
        title="Want your property managed like these?"
        description="Send us the details and we will come back with an honest assessment of what we would manage, what we would change, and what it would cost."
        secondary={CTA.contact}
      />
    </>
  );
}
