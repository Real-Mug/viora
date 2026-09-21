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
  title: "Service Areas Across Canada",
  description:
    "The Canadian markets where Viora Hosting provides short-term rental co-hosting and property management, with local rules and operating context for each.",
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
        eyebrow="Service areas"
        title="Where we work"
        description="We take on properties only in markets where we have reliable cleaning and maintenance capacity. That is a shorter list than 'across Canada', and it is a more useful one."
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
            <h2 className="text-display-sm text-ink">Property outside these areas?</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">
              Send it to us anyway. Whether we can take on a new market depends on whether we can
              find cleaning and maintenance capacity we trust there - sometimes we can, sometimes we
              cannot, and we will tell you which it is rather than take the property and hope.
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
        description="Short-term rental rules in Canada are municipal, provincial and sometimes building-specific. Knowing a handful of markets properly beats claiming all of them."
      />
    </>
  );
}
