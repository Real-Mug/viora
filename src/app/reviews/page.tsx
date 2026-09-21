import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/marketing/hero";
import { CtaBand } from "@/components/marketing/sections";
import { PropertyReviewBlock } from "@/components/reviews/property-reviews";
import { AggregateSummary, NoReviewsYet, ReviewList } from "@/components/reviews/review-list";
import { ReviewMarquee } from "@/components/reviews/review-marquee";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { properties, reviews } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/seo/schema";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Reviews", path: "/reviews" },
];

export const metadata: Metadata = pageMetadata({
  title: "Reviews from Guests and Property Owners",
  description:
    "Reviews of Viora Hosting properties and our co-hosting service, grouped by property and published with their source attached.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const all = await reviews.list();
  const managed = await properties.list({ status: ["active"], pageSize: 100 });

  // Two distinct things share this page, and conflating them would be
  // misleading: reviews of a specific property, and reviews of Viora Hosting as
  // a service. Anything carrying a propertySlug belongs to the former.
  const byProperty = new Map<string, typeof all>();
  for (const review of all) {
    if (!review.propertySlug) continue;
    const bucket = byProperty.get(review.propertySlug);
    if (bucket) bucket.push(review);
    else byProperty.set(review.propertySlug, [review]);
  }

  const companyReviews = all.filter((review) => !review.propertySlug);

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: "Reviews from Guests and Property Owners",
            description:
              "Verified reviews of Viora Hosting properties, grouped by property and shown with the platform they came from.",
            path: "/reviews",
            crumbs,
          }),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        eyebrow="Reviews"
        title="What guests and owners say"
        description="Reviews are grouped under the property they describe, and every rating links back to the listing it came from - so you can check it rather than take our word for it."
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      >
        {all.length > 0 ? (
          <div className="mt-8">
            <AggregateSummary reviews={all} />
          </div>
        ) : null}
      </PageHero>

      {/* ---------------------------------------------------------------- *
       * Reviews grouped by property.
       * Renders whether or not written reviews exist: the Airbnb rating per
       * property is real, and each block links out to the listing.
       * ---------------------------------------------------------------- */}
      {managed.items.length > 0 ? (
        <Section>
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="By property"
                title="Reviews for the homes we manage"
                description="Each home is rated on the platform it is listed on. Ratings below are Airbnb's own figures for that listing, not an average we calculated."
                size="md"
                level={2}
              />
            </Reveal>

            <div className="mt-12 grid gap-16">
              {managed.items.map((property) => (
                <PropertyReviewBlock
                  key={property.slug}
                  property={property}
                  reviews={byProperty.get(property.slug) ?? []}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- *
       * Reviews of the service itself, kept separate from property reviews.
       * ---------------------------------------------------------------- */}
      <Section tone="sunken">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="About working with us"
              title="Reviews of Viora Hosting"
              description="Feedback about the co-hosting service from the owners and guests we work with, as opposed to any single property."
              size="md"
              level={2}
            />
          </Reveal>

          {companyReviews.length > 0 ? (
            <div className="mt-12">
              {/* The wall scrolls on its own and pauses when you hover it. */}
              <ReviewMarquee reviews={companyReviews} />

              {/* A static, readable copy for anyone who would rather not chase
                  moving text - and the version that prints. */}
              <details className="mx-auto mt-10 max-w-3xl">
                <summary className="cursor-pointer text-sm font-medium text-evergreen-800 underline-offset-4 hover:underline">
                  Read all {companyReviews.length} as a plain list
                </summary>
                <ReviewList reviews={companyReviews} columns={2} className="mt-6" />
              </details>
            </div>
          ) : (
            <Reveal className="mt-12 block">
              <NoReviewsYet />
            </Reveal>
          )}
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-display-sm text-ink">How we publish reviews</h2>
            <div className="prose-viora mt-5">
              <p>
                Each review carries the platform it came from - Airbnb, another booking platform, or
                a direct guest - and a link to the original wherever the source makes one public.
              </p>
              <p>
                Ratings shown next to a property are the platform&rsquo;s own published figures for
                that listing, recorded with the date we last checked them. They are not averaged
                together with anything else, and they are not an average we calculated.
              </p>
              <p>
                We publish critical reviews alongside positive ones. A page of nothing but five
                stars tells a reader very little except that someone curated it.
              </p>
              <p>
                We do not display an overall Viora Hosting average until there are enough verified
                reviews for the number to mean something, and the structured data this page emits
                follows the same rule.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Stayed with us, or worked with us?"
        description="We would genuinely like to hear how it went - including the parts that did not go well. That is the feedback that changes how a property is run."
        primary={{ label: "Share your experience", href: "/contact" }}
        secondary={{ label: "Explore Properties", href: "/properties" }}
      />
    </>
  );
}
