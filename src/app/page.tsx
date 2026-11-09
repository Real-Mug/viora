import type { Metadata } from "next";
import Link from "next/link";

import { PropertyCard } from "@/components/property/property-card";
import { PropertySpotlight } from "@/components/property/property-spotlight";
import { HomeHero } from "@/components/marketing/hero";
import { HeroRatingCard, ProofBand } from "@/components/marketing/showcase";
import { FaqSection } from "@/components/marketing/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { IconCheck } from "@/components/ui/icons";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { homepageFaqs } from "@/content/faqs";
import { CTA } from "@/lib/config/site";
import { properties } from "@/lib/data";
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

/**
 * The homepage is deliberately short: what we do, proof, how it works, the
 * homes, what is included, a few questions, and a way to get in touch. The
 * detail lives on /services, /how-it-works, /reviews and /blog.
 */
const STEPS = [
  {
    title: "Tell us about your home",
    body: "Send a few details. We reply with what it could earn and what we would charge.",
  },
  {
    title: "We get it ready",
    body: "Photos, the Airbnb listing, pricing, cleaners and the house rules. We set it all up.",
  },
  {
    title: "We run it, you get paid",
    body: "We handle guests, cleaning and repairs. Airbnb pays you directly, and we send a report every month.",
  },
];

const INCLUDED = [
  "Your Airbnb listing and photos",
  "Pricing that changes with demand",
  "All guest messages, day and night",
  "Cleaning after every stay",
  "Supplies and restocking",
  "Repairs and maintenance calls",
  "City licence and tax reminders",
  "A clear report every month",
];

export default async function HomePage() {
  // The spotlight home gets its own large band; the grid shows the next three
  // featured homes so it is not repeated directly underneath.
  const featured = await properties.list({ featuredOnly: true, pageSize: 4 });
  const fallback = featured.items.length ? featured : await properties.list({ pageSize: 3 });
  const spotlight = fallback.items.find((property) => property.spotlight);
  const showcase = fallback.items.filter((property) => property !== spotlight).slice(0, 3);

  // Where the homes actually are, from the property records - not a list of
  // markets we would like to be in.
  const managedCities = [
    ...new Set([spotlight, ...showcase].filter((p) => p !== undefined).map((p) => p.location.city)),
  ];
  const faqs = homepageFaqs().slice(0, 4);

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
        title="We run your Airbnb. You keep the income."
        description="Guests, cleaning, pricing and repairs, all handled for you. For homeowners across Canada."
        primaryCta={CTA.primary}
        secondaryCta={{ label: "See our homes", href: "/properties" }}
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

      {/* --- How it works --------------------------------------------------- */}
      <Section aria-labelledby="steps-heading">
        <Container>
          <Reveal>
            <SectionHeading id="steps-heading" title="How it works" />
          </Reveal>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <Reveal key={step.title} as="li" delay={index * 80}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-evergreen-900 font-display text-lg text-linen-50">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-[1.25rem] text-ink">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {spotlight ? <PropertySpotlight property={spotlight} /> : null}

      {/* --- Homes ---------------------------------------------------------- */}
      {showcase.length > 0 ? (
        <Section aria-labelledby="properties-heading">
          <Container>
            <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                id="properties-heading"
                title="Homes we manage"
                description="Real homes, live on Airbnb now."
              />
              <ButtonLink href="/properties" variant="secondary" className="shrink-0">
                {CTA.secondary.label}
              </ButtonLink>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {showcase.map((property, index) => (
                <Reveal key={property.id} delay={index * 90} className="h-full">
                  <PropertyCard property={property} priority={index === 0} className="h-full" />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* --- What's included ------------------------------------------------ */}
      <Section tone="sunken" aria-labelledby="included-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
            <Reveal>
              <SectionHeading
                id="included-heading"
                title="What we take care of"
                description="Everything a guest touches, and everything you would rather not."
              />
              <ButtonLink href="/services" variant="secondary" className="mt-6">
                All services
              </ButtonLink>
            </Reveal>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <li key={item} className="flex gap-3 text-[1rem] text-ink">
                  <IconCheck className="mt-1 h-4 w-4 shrink-0 text-brass-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <FaqSection items={faqs} />
    </>
  );
}

/** "Waterloo, Kitchener and London" */
function listCities(cities: string[]): string {
  return cities.length > 1 ? `${cities.slice(0, -1).join(", ")} and ${cities.at(-1)}` : cities[0] ?? "";
}
