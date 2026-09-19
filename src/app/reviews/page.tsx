import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/marketing/hero";
import { CtaBand } from "@/components/marketing/sections";
import { AggregateSummary, NoReviewsYet, ReviewList } from "@/components/reviews/review-list";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { reviews } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { REVIEW_SOURCE_LABELS } from "@/lib/types/review";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/seo/schema";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Reviews", path: "/reviews" },
];

export const metadata: Metadata = pageMetadata({
  title: "Reviews from Guests and Property Owners",
  description:
    "Reviews of VioraRental-managed properties and our co-hosting service, published with their source attached.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const all = await reviews.list();

  // Group by source so the provenance of each review is obvious at a glance.
  const bySource = new Map<string, typeof all>();
  for (const review of all) {
    const bucket = bySource.get(review.source);
    if (bucket) bucket.push(review);
    else bySource.set(review.source, [review]);
  }

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: "Reviews from Guests and Property Owners",
            description:
              "Verified reviews of VioraRental-managed properties, shown with the platform they came from.",
            path: "/reviews",
            crumbs,
          }),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        eyebrow="Reviews"
        title="What guests and owners say"
        description="Every review here is published with its source attached, so you can check it rather than take our word for it."
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      >
        {all.length > 0 ? (
          <div className="mt-8">
            <AggregateSummary reviews={all} />
          </div>
        ) : null}
      </PageHero>

      <Section>
        <Container>
          {all.length > 0 ? (
            <div className="grid gap-14">
              {[...bySource.entries()].map(([source, items]) => (
                <section key={source} aria-labelledby={`source-${source}`}>
                  <SectionHeading
                    id={`source-${source}`}
                    title={REVIEW_SOURCE_LABELS[source as keyof typeof REVIEW_SOURCE_LABELS] ?? source}
                    size="md"
                    level={2}
                  />
                  <ReviewList reviews={items} className="mt-8" />
                </section>
              ))}
            </div>
          ) : (
            <>
              <NoReviewsYet />

              <div className="mx-auto mt-14 max-w-2xl">
                <h2 className="text-display-sm text-ink">How we will publish reviews</h2>
                <div className="prose-viora mt-5">
                  <p>
                    When reviews do appear here, each one will carry the platform it came from -
                    Airbnb, another booking platform, or a direct guest - and a link to the original
                    wherever the source makes one public.
                  </p>
                  <p>
                    We will publish critical reviews alongside positive ones. A page of nothing but
                    five stars tells a reader very little except that someone curated it.
                  </p>
                  <p>
                    We will not display an average rating until there are enough verified reviews for
                    the number to mean something, and the structured data this page emits follows the
                    same rule. An average built from two reviews is a statistic in search results and
                    nothing more.
                  </p>
                </div>
              </div>
            </>
          )}
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
