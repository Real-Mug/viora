import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/marketing/hero";
import { CtaBand } from "@/components/marketing/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion } from "@/components/ui/accordion";
import { Container, Section } from "@/components/ui/section";
import { allFaqs, faqGroups } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, graph, webPageSchema, type Crumb } from "@/lib/seo/schema";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about Airbnb co-hosting, short-term rental management, fees, control, direct booking and the Canadian markets VioraRental serves.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: "Frequently Asked Questions",
            description:
              "Common questions from property owners and guests about VioraRental's co-hosting and management services.",
            path: "/faq",
            crumbs,
          }),
          breadcrumbSchema(crumbs),
          // Every question here is visible on the page, which is what the
          // FAQPage guidelines require.
          faqSchema(allFaqs()),
        )}
      />

      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Straight answers, including where the honest one is 'not yet' or 'it depends on the property'."
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            {/* In-page navigation */}
            <nav aria-label="FAQ sections" className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:self-start">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Sections
              </h2>
              <ul className="mt-4 grid gap-2.5">
                {faqGroups.map((group) => (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      className="text-[0.9375rem] text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                    >
                      {group.title}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-[0.875rem] leading-relaxed text-ink-muted">
                Question not here?{" "}
                <Link href="/contact" className="text-evergreen-800 underline underline-offset-4">
                  Ask us directly
                </Link>
                .
              </p>
            </nav>

            <div className="grid gap-12">
              {faqGroups.map((group) => (
                <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`}>
                  <h2 id={`${group.id}-heading`} className="text-display-sm text-ink">
                    {group.title}
                  </h2>
                  <Accordion items={group.items} className="mt-5" />
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Still have a question?"
        description="Ask us directly. If the answer is useful to other owners, it usually ends up on this page."
        primary={{ label: "Contact VioraRental", href: "/contact" }}
        secondary={{ label: "List Your Property", href: "/become-a-host" }}
      />
    </>
  );
}
