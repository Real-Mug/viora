import type { Metadata } from "next";
import Link from "next/link";

import { PropertyCard } from "@/components/property/property-card";
import { PropertySpotlight } from "@/components/property/property-spotlight";
import { HomeHero } from "@/components/marketing/hero";
import {
  GuestRatings,
  HeroRatingCard,
  PhotoStrip,
  ProofBand,
} from "@/components/marketing/showcase";
import { HostingWalkthrough } from "@/components/marketing/hosting-walkthrough";
import {
  CtaBand,
  FaqSection,
  ServicesGrid,
} from "@/components/marketing/sections";
import { NoReviewsYet } from "@/components/reviews/review-list";
import { ReviewMarquee } from "@/components/reviews/review-marquee";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { SampleBadge } from "@/components/ui/badge";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
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
  title: "Airbnb Management & Co-Hosting in Canada | Viora Hosting",
  description:
    "Airbnb co-hosting and short-term rental management for owners anywhere in Canada. Guests, cleaning, pricing and reporting handled. Free property assessment.",
  path: "/",
});

/** "Waterloo, Kitchener and London" */
function listCities(cities: string[]): string {
  return cities.length > 1 ? `${cities.slice(0, -1).join(", ")} and ${cities.at(-1)}` : cities[0] ?? "";
}

export default async function HomePage() {
  const services = featuredServices().slice(0, 6);
  // The spotlight home gets its own large band; the grid shows the next three
  // featured homes so it is not repeated directly underneath.
  const featured = await properties.list({ featuredOnly: true, pageSize: 4 });
  const fallback = featured.items.length ? featured : await properties.list({ pageSize: 3 });
  const spotlight = fallback.items.find((property) => property.spotlight);
  const showcase = fallback.items.filter((property) => property !== spotlight).slice(0, 3);

  // Reviews about Viora Hosting itself. Property-specific reviews are shown on
  // /reviews under the property they describe, so they are excluded here.
  const allReviews = await reviews.list();
  const companyReviews = allReviews.filter((review) => !review.propertySlug);
  // Where the homes actually are, from the property records - not a list of
  // markets we would like to be in.
  const managedCities = [
    ...new Set([spotlight, ...showcase].filter((p) => p !== undefined).map((p) => p.location.city)),
  ];
  const faqs = homepageFaqs();
  const latestPosts = sortedPosts().slice(0, 3);

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: "Viora Hosting - Short-Term Rental Co-Hosting and Property Management in Canada",
            description:
              "Professional co-hosting and short-term rental management for property owners in Canada.",
            path: "/",
          }),
          faqSchema(faqs),
        )}
      />

      <HomeHero
        title="Airbnb management for Canadian homeowners"
        description="We run your listing, guests, cleaning and pricing, and send you a report every month. You own the home and keep the income."
        primaryCta={CTA.primary}
        // Owners are the audience here; the properties section further down is the proof.
        secondaryCta={{ label: "How it works", href: "/how-it-works" }}
        image={{
          src: "/images/hero/home-hero.webp",
          alt: "The fenced garden of a Viora Hosting house in Waterloo, Ontario, on a summer afternoon",
        }}
        video={{
          mp4: "/video/home-hero.mp4",
          webm: "/video/home-hero.webm",
        }}
        footnote={
          managedCities.length ? (
            <p>
              Homes we manage today:{" "}
              <Link
                href="/properties"
                className="underline decoration-brass-300/60 underline-offset-4 transition-colors hover:text-white"
              >
                {listCities(managedCities)}
              </Link>
              .
            </p>
          ) : null
        }
        aside={<HeroRatingCard properties={showcase} />}
      />

      <ProofBand properties={showcase} />

      {/* --- Services ------------------------------------------------------ */}
      <Section tone="sunken" aria-labelledby="services-heading">
        <Container>
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              id="services-heading"
              title="What we do"
              description="Hand us the whole thing, or only the parts you don't have time for."
            />
            <ButtonLink href="/services" variant="secondary" className="shrink-0">
              All services
            </ButtonLink>
          </Reveal>

          <ServicesGrid services={services} className="mt-12" />
        </Container>
      </Section>

      {spotlight ? <PropertySpotlight property={spotlight} /> : null}

      {/* --- Featured properties ------------------------------------------- */}
      {showcase.length > 0 ? (
        <Section aria-labelledby="properties-heading">
          <Container>
            <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                id="properties-heading"
                title="Homes we manage"
                description="Real listings, live on Airbnb now. Click through and read what guests said."
              />
              <ButtonLink href="/properties" variant="secondary" className="shrink-0">
                {CTA.secondary.label}
              </ButtonLink>
            </Reveal>

            {showPlaceholders && showcase.some((property) => property.isPlaceholder) ? (
              <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[var(--radius-card)] border border-brass-200 bg-brass-50 p-4 text-sm text-brass-900">
                <SampleBadge />
                <p>
                  Sample listings, shown while the site is prepared for launch. Not properties under
                  management.
                </p>
              </div>
            ) : null}

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {showcase.map((property, index) => (
                <Reveal key={property.id} delay={index * 90} className="h-full">
                  <PropertyCard property={property} priority={index === 0} className="h-full" />
                </Reveal>
              ))}
            </div>
          </Container>

          {/* Full-bleed ribbon of the real interiors behind those listings. */}
          <div className="mt-14">
            <PhotoStrip properties={showcase} />
          </div>
        </Section>
      ) : null}

      <HostingWalkthrough />

      {/* --- Reviews -------------------------------------------------------- */}
      <Section tone="sunken" aria-labelledby="reviews-heading">
        <Container>
          <Reveal>
            <SectionHeading
              id="reviews-heading"
              title="Guest ratings"
              description={
                companyReviews.length
                  ? "Reviews of the service. Reviews of a specific home sit under that property."
                  : "Taken from the Airbnb pages of the homes we manage."
              }
              align="center"
            />
          </Reveal>
          <div className="mt-10">
            {companyReviews.length ? (
              <>
                {/*
                  Full-bleed: the wall is pulled out of the container so cards
                  run to the window edges and the mask does the framing.
                */}
                <div className="-mx-4 sm:-mx-6 lg:-mx-10">
                  <ReviewMarquee reviews={companyReviews} />
                </div>
                <div className="mt-10 flex justify-center">
                  <ButtonLink href="/reviews" variant="secondary">
                    Read all reviews
                  </ButtonLink>
                </div>
              </>
            ) : showcase.some((property) => property.externalRating) ? (
              <>
                <GuestRatings properties={showcase} />
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
                title="Guides for Canadian hosts"
                description="Fees, rules, taxes and running a rental, written for owners."
              />
              <ButtonLink href="/blog" variant="secondary" className="shrink-0">
                All resources
              </ButtonLink>
            </div>

            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {latestPosts.map((post, index) => (
                <Reveal key={post.slug} as="li" delay={index * 80}>
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
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        title="Tell us about your property"
        description="Send a few details. We'll reply with what we would do, what it would cost, and whether short-term renting makes sense for your home."
        note="Free, and no obligation."
      />
    </>
  );
}
