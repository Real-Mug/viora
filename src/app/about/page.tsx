import type { Metadata } from "next";
import { Img as Image } from "@/components/ui/image";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/marketing/hero";
import { CtaBand } from "@/components/marketing/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { Note } from "@/components/ui/card";
import { IconInfo } from "@/components/ui/icons";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { activeServiceAreas } from "@/content/locations";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/seo/schema";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export const metadata: Metadata = pageMetadata({
  title: "About Viora Hosting",
  description:
    "Viora Hosting is a Canadian short-term rental co-hosting and property management company. Here is what we do, how we work with owners, and what we will not promise.",
  path: "/about",
});

const PRINCIPLES = [
  {
    title: "We say what we will actually do",
    body: "Scope and fees are agreed in writing before anything starts, including what sits outside the arrangement. Most disappointment in this industry comes from a vague scope, not from bad work.",
  },
  {
    title: "We do not guarantee revenue",
    body: "Occupancy and income depend on demand, seasonality, competition and the property itself. We will tell you what we would change and why, then report honestly on what happened.",
  },
  {
    title: "We turn down properties",
    body: "If a property cannot be let lawfully, sits in a building that prohibits it, or is in a market where we cannot get a cleaner reliably, we will say so at the assessment rather than take the work.",
  },
  {
    title: "Owners keep control",
    body: "You set the spending thresholds we work within and keep the ability to block your own dates. Under co-hosting, the listing stays in your account and you remain the host of record.",
  },
  {
    title: "Guests are treated as the product",
    body: "The guest experience is what generates the reviews that determine whether the property performs. It is not a cost to be minimised.",
  },
  {
    title: "Technology where it removes work",
    body: "Scheduling, messaging and reporting tools take repetitive work off people. They do not replace someone who knows the property and can make a judgement call.",
  },
];

export default function AboutPage() {
  const areas = activeServiceAreas();

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: "About Viora Hosting",
            description:
              "A Canadian short-term rental co-hosting and property management company working with owners across several markets.",
            path: "/about",
            crumbs,
          }),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        eyebrow="About"
        title="A short-term rental company built around the operational work"
        description="Viora Hosting manages the day-to-day reality of short-term rentals for Canadian property owners: guests, turnovers, listings and the constant small decisions that come with letting a property nightly."
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div className="prose-viora">
              <h2>The problem we exist to solve</h2>
              <p>
                Most people who own a short-term rental did not set out to run a hospitality
                business. They had a property, letting it nightly made more financial sense than
                letting it annually, and the operational side arrived as a consequence rather than a
                choice.
              </p>
              <p>
                That operational side is not difficult in any single moment. It is difficult because
                it is constant. A guest message at eleven at night. A cleaner who cancels the morning
                of a same-day turnover. A listing that has quietly drifted a year out of date. A
                shower that three separate guests have now mentioned. None of it waits for a
                convenient time, and none of it pauses because you are at work or away.
              </p>
              <p>
                Viora Hosting takes that work on. We are a co-hosting and rental management company:
                we run the operation, keep the property to a standard, look after guests, and report
                back to the owner in writing.
              </p>

              <h2>Why professional co-hosting matters</h2>
              <p>
                Short-term rental platforms reward consistency. Response times, review scores,
                cancellation history and listing completeness all feed into how visible a property
                is and how much it can charge. Those are exactly the things that slip when hosting is
                squeezed around a full-time job.
              </p>
              <p>
                Professional co-hosting is not about doing something an owner could never do. It is
                about doing it reliably, every time, including the weeks when the owner has other
                things going on. That reliability compounds: better guest experience produces better
                reviews, which improve ranking, which reduce how hard the nightly rate has to work.
              </p>

              <h2>How we work with owners</h2>
              <p>
                We start with an assessment rather than a pitch. You tell us about the property, we
                look at it alongside the market and the rules that apply where it sits, and we come
                back with what we would manage, what we would change first, and what it would cost.
                If we do not think short-term letting is the right use for the property, we say so.
              </p>
              <p>
                From there, the scope is whatever you actually want to hand over. Some owners move
                across guest communication and nothing else. Others hand over everything except the
                final say on pricing. Both are legitimate, and the arrangement can change as your
                circumstances do.
              </p>
              <p>
                You can read the full process on{" "}
                <Link href="/how-it-works">how it works</Link>, or look at the individual{" "}
                <Link href="/services">services</Link> we offer.
              </p>

              <h2>Our commitment to guests</h2>
              <p>
                Owners pay us, but guests decide whether a property performs. A guest who arrives to
                a clean, accurately described property and gets a quick answer when something is
                wrong leaves a review that works for the owner for years.
              </p>
              <p>
                So guest support is not a cost centre we try to minimise. It is the part of the
                operation that produces the result the owner is paying for.
              </p>

              <h2>Canadian focus</h2>
              <p>
                We work in Canada, and that is a deliberate limit rather than a marketing line.
                Short-term rental rules here are set municipally and provincially and vary
                enormously: Toronto&apos;s principal-residence regime, British Columbia&apos;s
                provincial legislation, Quebec&apos;s registration requirement, Calgary&apos;s
                licensing tiers, and township-level rules in cottage country are all genuinely
                different problems.
              </p>
              <p>
                Operating in a smaller number of markets we understand properly is more useful to an
                owner than claiming national coverage we could not deliver. Our current{" "}
                <Link href="/locations">service areas</Link> are listed in full, and if your property
                is outside them we will tell you rather than take the work.
              </p>
            </div>

            <aside className="lg:pt-2">
              <div className="overflow-hidden rounded-[var(--radius-panel)] border border-line">
                <Image
                  src="/images/editorial/waterloo-region-home.webp"
                  alt="A living area inside a Viora Hosting house in Waterloo, Ontario"
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 420px, 92vw"
                  className="h-auto w-full"
                />
              </div>

              <Note
                icon={<IconInfo className="h-4 w-4 text-brass-600" />}
                title="Company details"
                className="mt-6"
              >
                Registered company information, founding date and team details will be published here
                once confirmed. We have deliberately left this section empty rather than fill it with
                numbers we cannot substantiate.
              </Note>

              {areas.length > 0 ? (
                <div className="mt-6 rounded-[var(--radius-card)] border border-line bg-surface-raised p-5">
                  <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                    Where we work
                  </h2>
                  <ul className="mt-3 grid gap-2">
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
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="sunken" aria-labelledby="principles-heading">
        <Container>
          <SectionHeading
            id="principles-heading"
            eyebrow="How we operate"
            title="What you can hold us to"
            description="These are the commitments we will put in writing, and the ones we will not make."
          />

          <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <li key={principle.title}>
                <h3 className="text-[1.1875rem] text-ink">{principle.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-muted">{principle.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title="Start with an assessment, not a contract"
        description="Tell us about your property. We will look at it properly and come back with a straight answer about whether we are the right fit."
      />
    </>
  );
}
