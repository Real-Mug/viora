import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/marketing/hero";
import { CtaBand } from "@/components/marketing/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowRight } from "@/components/ui/button";
import { IconMapPin } from "@/components/ui/icons";
import { Container, Section } from "@/components/ui/section";
import { activeServiceAreas } from "@/content/locations";
import { pageMetadata } from "@/lib/seo/metadata";
import { PROVINCE_NAMES } from "@/lib/types/property";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/seo/schema";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Service Areas", path: "/locations" },
];

export const metadata: Metadata = pageMetadata({
  title: "Airbnb Management Service Areas in Canada",
  description:
    "Airbnb co-hosting and short-term rental management anywhere in Canada, with local guides to the rules and seasonality in Toronto, Waterloo Region and more.",
  path: "/locations",
});

export default function LocationsPage() {
  const areas = activeServiceAreas();

  // Group by province so the list reads geographically rather than alphabetically.
  const byProvince = new Map<string, typeof areas>();
  for (const area of areas) {
    const bucket = byProvince.get(area.province);
    if (bucket) bucket.push(area);
    else byProvince.set(area.province, [area]);
  }

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: "Service Areas - Where Viora Hosting Operates in Canada",
            description: "Canadian markets served by Viora Hosting short-term rental management.",
            path: "/locations",
            crumbs,
          }),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        eyebrow="Where we work"
        title="Airbnb co-hosting and rental management across Canada"
        description="We host short-term rentals in every part of Canada. The markets below have local guides covering the rules and seasonality that shape how a property there should run."
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      />

      <Section>
        <Container>
          {areas.length > 0 ? (
            <div className="grid gap-12">
              {[...byProvince.entries()].map(([province, items]) => (
                <section key={province} aria-labelledby={`province-${province}`}>
                  <h2
                    id={`province-${province}`}
                    className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-brass-700"
                  >
                    {PROVINCE_NAMES[province as keyof typeof PROVINCE_NAMES]}
                  </h2>

                  <ul className="mt-5 grid gap-6 md:grid-cols-2">
                    {items.map((area) => (
                      <li key={area.slug}>
                        <Link
                          href={`/locations/${area.slug}`}
                          className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface-raised p-6 shadow-subtle transition-colors hover:border-line-strong"
                        >
                          <h3 className="flex items-center gap-2 text-[1.25rem] text-ink transition-colors group-hover:text-evergreen-800">
                            <IconMapPin className="h-5 w-5 text-brass-600" />
                            {area.city}
                          </h3>
                          <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                            {area.summary}
                          </p>
                          <p className="mt-4 text-[0.8125rem] text-ink-subtle">
                            {area.areasServed.slice(0, 3).join(" · ")}
                            {area.areasServed.length > 3 ? " and more" : ""}
                          </p>
                          <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-evergreen-800">
                            Local guide
                            <ArrowRight />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-[var(--radius-panel)] border border-dashed border-line-strong bg-linen-200/50 p-10 text-center">
              <h2 className="text-display-sm text-ink">Service areas are being confirmed</h2>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-muted">
                Rather than list markets we cannot properly support, this page stays empty until the
                coverage is confirmed. Get in touch and tell us where your property is.
              </p>
            </div>
          )}

          <div className="mt-14 rounded-[var(--radius-panel)] border border-line bg-linen-200/60 p-6 sm:p-8">
            <h2 className="text-display-sm text-ink">Your city not listed?</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">
              We still cover it. Viora Hosting works with owners in every province and territory -
              these guides are simply the markets we have written up so far. Tell us where your
              property is and we will walk you through the local rules and how we would run it.
            </p>
            <p className="mt-4">
              <Link
                href="/become-a-host"
                className="text-[0.9375rem] font-medium text-evergreen-800 underline-offset-4 hover:underline"
              >
                Tell us about your property
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Local knowledge is the point"
        description="Short-term rental rules in Canada are municipal, provincial and sometimes building-specific. Wherever your property is, we learn its local rules before we list it."
      />
    </>
  );
}
