import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PropertyCard } from "@/components/property/property-card";
import { PageHero } from "@/components/marketing/hero";
import { CtaBand, FaqSection, ServicesGrid } from "@/components/marketing/sections";
import { NoReviewsYet, ReviewList } from "@/components/reviews/review-list";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { IconCheck } from "@/components/ui/icons";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { activeServiceAreas } from "@/content/locations";
import { sortedPosts } from "@/content/posts";
import { getService, relatedServices, services } from "@/content/services";
import { CTA } from "@/lib/config/site";
import { properties, reviews } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  serviceSchema,
  webPageSchema,
  type Crumb,
} from "@/lib/seo/schema";

/** One static page per service, generated from the content file. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = relatedServices(slug);
  const areas = activeServiceAreas();
  const serviceReviews = await reviews.list({ limit: 3, featuredOnly: true });
  const examples = await properties.list({ pageSize: 3, featuredOnly: true });
  const guides = sortedPosts()
    .filter((post) => post.relatedServices?.includes(slug))
    .slice(0, 3);

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: service.heading,
            description: service.summary,
            path: `/services/${service.slug}`,
            crumbs,
          }),
          breadcrumbSchema(crumbs),
          serviceSchema(service),
          faqSchema(service.faqs),
        )}
      />

      <PageHero
        eyebrow="Service"
        title={service.heading}
        description={service.summary}
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
        actions={
          <>
            <ButtonLink href={CTA.primary.href} size="lg">
              {CTA.primary.label}
            </ButtonLink>
            <ButtonLink href={CTA.contact.href} variant="secondary" size="lg">
              Ask a question
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div className="prose-viora">
              {service.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <aside>
              <div className="rounded-[var(--radius-panel)] border border-line bg-surface-raised p-6 shadow-subtle sm:p-7">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-brass-700">
                  Who this suits
                </h2>
                <ul className="mt-4 grid gap-3">
                  {service.bestFor.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-evergreen-700" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-line pt-6">
                  <ButtonLink href={CTA.primary.href} fullWidth>
                    {CTA.primary.label}
                  </ButtonLink>
                  <p className="mt-3 text-center text-[0.8125rem] text-ink-subtle">
                    Free assessment. No obligation.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="sunken" aria-labelledby="includes-heading">
        <Container>
          <SectionHeading
            id="includes-heading"
            eyebrow="What is included"
            title="The work, in detail"
            description="Scope is agreed in writing before anything starts, including what sits outside it."
          />

          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {service.includes.map((item, index) => (
              <li key={item.title} className="border-t border-line pt-5">
                <span className="font-display text-sm text-brass-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[1.125rem] text-ink">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {examples.items.length > 0 ? (
        <Section aria-labelledby="examples-heading">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                id="examples-heading"
                eyebrow="Properties"
                title="Properties in our portfolio"
                description="The kind of properties this service is built for."
              />
              <ButtonLink href="/properties" variant="secondary" className="shrink-0">
                {CTA.secondary.label}
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {examples.items.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <FaqSection
        items={service.faqs}
        eyebrow="Questions"
        title={`${service.name}: common questions`}
        tone="sunken"
        headingId="service-faq-heading"
      />

      <Section aria-labelledby="reviews-heading">
        <Container>
          <SectionHeading
            id="reviews-heading"
            eyebrow="Reviews"
            title="What owners and guests say"
            align="center"
          />
          <div className="mt-10">
            {serviceReviews.length ? <ReviewList reviews={serviceReviews} /> : <NoReviewsYet />}
          </div>
        </Container>
      </Section>

      <Section tone="sunken" aria-labelledby="related-heading">
        <Container>
          <SectionHeading
            id="related-heading"
            eyebrow="Related"
            title="Services that work alongside this one"
          />
          <ServicesGrid services={related} className="mt-10" />

          <div className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-2">
            {areas.length > 0 ? (
              <div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                  {service.name} by location
                </h3>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
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
              </div>
            ) : null}

            {guides.length > 0 ? (
              <div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                  Useful reading
                </h3>
                <ul className="mt-4 grid gap-2.5">
                  {guides.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      <CtaBand
        title={`Talk to us about ${service.name.toLowerCase()}`}
        description="Send your property details. We come back with the plan and the cost."
      />
    </>
  );
}
