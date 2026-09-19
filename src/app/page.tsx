import type { Metadata } from "next";
import Link from "next/link";

import { PropertyCard } from "@/components/property/property-card";
import { HomeHero } from "@/components/marketing/hero";
import {
  CtaBand,
  FaqSection,
  HowItWorks,
  ServicesGrid,
  TrustSection,
} from "@/components/marketing/sections";
import { NoReviewsYet, ReviewList } from "@/components/reviews/review-list";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { SampleBadge } from "@/components/ui/badge";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { IconMapPin } from "@/components/ui/icons";
import { activeServiceAreas } from "@/content/locations";
import { homepageFaqs } from "@/content/faqs";
import { sortedPosts } from "@/content/posts";
import { featuredServices } from "@/content/services";
import { showPlaceholders } from "@/lib/config/env";
import { CTA } from "@/lib/config/site";
import { properties, reviews } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { faqSchema, graph, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({
  // The homepage sets its own brand-bearing title: the layout's title template
  // is not applied to the root segment, so the brand has to be explicit here.
  title: "VioraRental | Short-Term Rental Co-Hosting in Canada",
  description:
    "Professional co-hosting and short-term rental management for Canadian property owners: guest support, listing optimization and property operations.",
  path: "/",
});

export default async function HomePage() {
  const services = featuredServices().slice(0, 6);
  const featured = await properties.list({ featuredOnly: true, pageSize: 3 });
  const fallback = featured.items.length ? featured : await properties.list({ pageSize: 3 });
  const showcase = fallback.items;

  const featuredReviews = await reviews.list({ featuredOnly: true, limit: 3 });
  const areas = activeServiceAreas();
  const faqs = homepageFaqs();
  const latestPosts = sortedPosts().slice(0, 3);

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: "VioraRental - Short-Term Rental Co-Hosting and Property Management in Canada",
            description:
              "Professional co-hosting and short-term rental management for property owners in Canada.",
            path: "/",
          }),
          faqSchema(faqs),
        )}
      />

      <HomeHero
        eyebrow="Short-term rental management in Canada"
        title={
          <>
            Your property. Our expertise.
            <br className="hidden sm:block" /> Better short-term rentals.
          </>
        }
        description="VioraRental helps Canadian property owners simplify short-term rental management through professional co-hosting, listing optimization, guest support and property operations."
        primaryCta={CTA.primary}
        secondaryCta={CTA.secondary}
        image={{
          src: "/images/hero/home-hero.svg",
          alt: "Placeholder image representing a Canadian waterfront property at dusk",
        }}
        footnote={
          areas.length ? (
            <p>
              Working with owners in{" "}
              {areas.slice(0, 4).map((area, index, list) => (
                <span key={area.slug}>
                  <Link
                    href={`/locations/${area.slug}`}
                    className="underline decoration-brass-300/60 underline-offset-4 transition-colors hover:text-white"
                  >
                    {area.city}
                  </Link>
                  {index < list.length - 1 ? ", " : ""}
                </span>
              ))}
              {areas.length > 4 ? (
                <>
                  {" and "}
                  <Link
                    href="/locations"
                    className="underline decoration-brass-300/60 underline-offset-4 transition-colors hover:text-white"
                  >
                    other Canadian markets
                  </Link>
                </>
              ) : null}
              .
            </p>
          ) : null
        }
      />

      <TrustSection />

      {/* --- Services ------------------------------------------------------ */}
      <Section tone="sunken" aria-labelledby="services-heading">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              id="services-heading"
              eyebrow="What we do"
              title="Services built around how a rental actually runs"
              description="Take the whole operation or just the part that is costing you your evenings. Every service below is one we deliver ourselves."
            />
            <ButtonLink href="/services" variant="secondary" className="shrink-0">
              All services
            </ButtonLink>
          </div>

          <ServicesGrid services={services} className="mt-12" />
        </Container>
      </Section>

      {/* --- Featured properties ------------------------------------------- */}
      {showcase.length > 0 ? (
        <Section aria-labelledby="properties-heading">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                id="properties-heading"
                eyebrow="Properties"
                title="A look at the kind of properties we manage"
                description="Every property we take on is presented properly, kept to a standard and supported by a real team behind the listing."
              />
              <ButtonLink href="/properties" variant="secondary" className="shrink-0">
                {CTA.secondary.label}
              </ButtonLink>
            </div>

            {showPlaceholders && showcase.some((property) => property.isPlaceholder) ? (
              <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[var(--radius-card)] border border-brass-200 bg-brass-50 p-4 text-sm text-brass-900">
                <SampleBadge />
                <p>
                  These are sample listings used while the site is prepared for launch. They are not
                  properties currently under management, and they are removed as soon as real
                  inventory is published.
                </p>
              </div>
            ) : null}

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {showcase.map((property, index) => (
                <PropertyCard key={property.id} property={property} priority={index === 0} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <HowItWorks />

      {/* --- Service areas -------------------------------------------------- */}
      {areas.length > 0 ? (
        <Section aria-labelledby="areas-heading">
          <Container>
            <SectionHeading
              id="areas-heading"
              eyebrow="Where we work"
              title="Canadian markets we know properly"
              description="We only take on properties in markets where we have reliable cleaning and maintenance capacity. Each of these pages covers how short-term letting actually works there."
            />

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/locations/${area.slug}`}
                    className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface-raised p-5 shadow-subtle transition-colors hover:border-line-strong"
                  >
                    <span className="flex items-center gap-2 text-[1.0625rem] font-medium text-ink transition-colors group-hover:text-evergreen-800">
                      <IconMapPin className="h-5 w-5 text-brass-600" />
                      {area.city}
                    </span>
                    <span className="mt-2 clamp-2 text-sm leading-relaxed text-ink-muted">
                      {area.summary}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-evergreen-800">
                      Local guide
                      <ArrowRight />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* --- Reviews -------------------------------------------------------- */}
      <Section tone="sunken" aria-labelledby="reviews-heading">
        <Container>
          <SectionHeading
            id="reviews-heading"
            eyebrow="Reviews"
            title="What guests and owners say"
            description="We publish reviews with their source attached, and only once we can point to where they came from."
            align="center"
          />
          <div className="mt-10">
            {featuredReviews.length ? (
              <>
                <ReviewList reviews={featuredReviews} />
                <div className="mt-10 flex justify-center">
                  <ButtonLink href="/reviews" variant="secondary">
                    Read all reviews
                  </ButtonLink>
                </div>
              </>
            ) : (
              <NoReviewsYet />
            )}
          </div>
        </Container>
      </Section>

      <FaqSection items={faqs} />

      {/* --- Resources ------------------------------------------------------ */}
      {latestPosts.length > 0 ? (
        <Section tone="sunken" aria-labelledby="resources-heading">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                id="resources-heading"
                eyebrow="Resources"
                title="Guides for Canadian hosts"
                description="Practical writing on co-hosting, operations and pricing - useful whether or not you ever work with us."
              />
              <ButtonLink href="/blog" variant="secondary" className="shrink-0">
                All resources
              </ButtonLink>
            </div>

            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface-raised p-6 shadow-subtle transition-colors hover:border-line-strong"
                  >
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-brass-700">
                      {post.readingMinutes} min read
                    </span>
                    <h3 className="mt-3 text-[1.125rem] leading-snug text-ink transition-colors group-hover:text-evergreen-800">
                      {post.title}
                    </h3>
                    <p className="mt-3 clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-evergreen-800">
                      Read
                      <ArrowRight />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        title="Tell us about your property"
        description="Send us the details and we will come back with an honest assessment: what we would manage, what we would change first, and what it would cost. No obligation."
        note="We will also tell you if we think short-term letting is the wrong use for your property. That is a more useful answer than a quote."
      />
    </>
  );
}
