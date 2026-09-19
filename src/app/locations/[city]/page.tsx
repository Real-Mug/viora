import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PropertyCard } from "@/components/property/property-card";
import { PageHero } from "@/components/marketing/hero";
import { CtaBand, ServicesGrid } from "@/components/marketing/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Note } from "@/components/ui/card";
import { IconInfo, IconMapPin } from "@/components/ui/icons";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { activeServiceAreas, getServiceArea, serviceAreas } from "@/content/locations";
import { sortedPosts } from "@/content/posts";
import { getService } from "@/content/services";
import { CTA } from "@/lib/config/site";
import { properties } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { PROVINCE_NAMES } from "@/lib/types/property";
import type { Service } from "@/lib/types/service";
import {
  breadcrumbSchema,
  graph,
  serviceAreaSchema,
  webPageSchema,
  type Crumb,
} from "@/lib/seo/schema";

/**
 * Location pages are generated only from markets marked `active`. There is no
 * template fan-out across Canadian cities: a market appears here because
 * someone wrote genuinely local content for it, or it does not appear at all.
 */
export function generateStaticParams() {
  return serviceAreas.filter((area) => area.active).map((area) => ({ city: area.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city } = await params;
  const area = getServiceArea(city);
  if (!area) return {};

  return pageMetadata({
    title: area.seoTitle,
    description: area.seoDescription,
    path: `/locations/${area.slug}`,
  });
}

export default async function LocationPage({ params }: Params) {
  const { city } = await params;
  const area = getServiceArea(city);
  if (!area) notFound();

  const localProperties = await properties.list({ locationSlug: area.slug, pageSize: 3 });
  const highlighted = area.highlightedServices
    .map(getService)
    .filter((service): service is Service => service !== undefined);
  const otherAreas = activeServiceAreas().filter((item) => item.slug !== area.slug);
  const guides = sortedPosts().slice(0, 3);

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/locations" },
    { name: area.city, path: `/locations/${area.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: area.seoTitle,
            description: area.summary,
            path: `/locations/${area.slug}`,
            crumbs,
          }),
          breadcrumbSchema(crumbs),
          serviceAreaSchema(area),
        )}
      />

      <PageHero
        eyebrow={`${area.city}, ${PROVINCE_NAMES[area.province]}`}
        title={`Short-term rental management in ${area.city}`}
        description={area.summary}
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
        actions={
          <>
            <ButtonLink href={CTA.primary.href} size="lg">
              {CTA.primary.label}
            </ButtonLink>
            <ButtonLink href={CTA.contact.href} variant="secondary" size="lg">
              Ask about {area.city}
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div className="prose-viora">
              <h2>The {area.city} market</h2>
              {area.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <aside>
              <div className="rounded-[var(--radius-panel)] border border-line bg-surface-raised p-6 shadow-subtle sm:p-7">
                <h2 className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-brass-700">
                  <IconMapPin className="h-4 w-4" />
                  Areas we cover
                </h2>
                <ul className="mt-4 grid gap-2">
                  {area.areasServed.map((neighbourhood) => (
                    <li key={neighbourhood} className="text-[0.9375rem] text-ink-muted">
                      {neighbourhood}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-ink-subtle">
                  Nearby but not listed? Ask - coverage depends on travel time for cleaners and
                  trades rather than a hard boundary.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* --- Local operating context ---------------------------------------- */}
      <Section tone="sunken" aria-labelledby="local-notes-heading">
        <Container>
          <SectionHeading
            id="local-notes-heading"
            eyebrow="Local context"
            title={`What actually matters when letting in ${area.city}`}
            description="The practical constraints owners run into here, rather than a generic description of the city."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {area.localNotes.map((note) => (
              <div key={note.title} className="border-t border-line pt-5">
                <h3 className="text-[1.125rem] text-ink">{note.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">{note.body}</p>
              </div>
            ))}
          </div>

          <Note icon={<IconInfo className="h-4 w-4 text-brass-600" />} className="mt-10" tone="brass">
            Short-term rental rules in Canada change frequently and are enforced locally. Treat the
            notes above as a starting point, not as legal advice, and confirm the current
            requirements with the municipality and province before listing. Responsibility for
            compliance rests with the property owner.
          </Note>
        </Container>
      </Section>

      {/* --- Services -------------------------------------------------------- */}
      <Section aria-labelledby="local-services-heading">
        <Container>
          <SectionHeading
            id="local-services-heading"
            eyebrow="Services"
            title={`What we focus on in ${area.city}`}
            description="Every service we offer is available here; these are the ones owners in this market most often need."
          />
          <ServicesGrid services={highlighted} className="mt-10" />
          <div className="mt-10">
            <ButtonLink href="/services" variant="secondary">
              All services
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* --- Local properties ------------------------------------------------ */}
      {localProperties.items.length > 0 ? (
        <Section tone="sunken" aria-labelledby="local-properties-heading">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                id="local-properties-heading"
                eyebrow="Properties"
                title={`Properties in and around ${area.city}`}
              />
              <ButtonLink href="/properties" variant="secondary" className="shrink-0">
                All properties
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {localProperties.items.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* --- Internal links -------------------------------------------------- */}
      <Section aria-labelledby="more-heading">
        <Container>
          <SectionHeading id="more-heading" eyebrow="Keep reading" title="More from VioraRental" />

          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {otherAreas.length > 0 ? (
              <div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                  Other service areas
                </h3>
                <ul className="mt-4 grid gap-2.5">
                  {otherAreas.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/locations/${item.slug}`}
                        className="text-[0.9375rem] text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                      >
                        {item.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Guides
              </h3>
              <ul className="mt-4 grid gap-2.5">
                {guides.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[0.9375rem] text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Next steps
              </h3>
              <ul className="mt-4 grid gap-2.5">
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-[0.9375rem] text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                  >
                    How working with us starts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/become-a-host"
                    className="text-[0.9375rem] text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                  >
                    Request a property assessment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-[0.9375rem] text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                  >
                    Frequently asked questions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title={`Own a property in ${area.city}?`}
        description={`Tell us about it and we will come back with what we would manage, what we would change first, and the ${area.city}-specific constraints we think matter.`}
      />
    </>
  );
}
