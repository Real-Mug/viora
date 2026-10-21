import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AirbnbRedirect } from "@/components/analytics/airbnb-redirect";
import { Container } from "@/components/ui/section";
import { properties } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";

/**
 * /go/airbnb/<slug>/ - the hop every "on Airbnb" link on the site goes through.
 *
 * Airbnb never tells a host where a guest came from, so the only way to count
 * how many visitors this site sends to each listing is to count them on the
 * way out. Each hop is an ordinary page view in Vercel Web Analytics (custom
 * events need a paid plan; page views do not), so "Pages → /go/airbnb/..."
 * reads directly as clicks per property.
 *
 * Noindex rather than disallowed in robots.txt: a blocked URL can still be
 * indexed from a link, and Google has to fetch the page to see the noindex.
 */
type Params = { slug: string };

export async function generateStaticParams() {
  const { items } = await properties.list({ pageSize: 1000 });
  return items.filter((property) => property.airbnbUrl).map((property) => ({ slug: property.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const property = await properties.getBySlug(slug);
  return pageMetadata({
    // Short and unique per home: the site audit checks these pages too.
    title: property
      ? `${property.bedrooms}-bedroom ${property.location.city} home on Airbnb`
      : "Opening Airbnb",
    description: property
      ? `Opening the Airbnb listing for ${property.name}, a home Viora Hosting manages in ${property.location.city}.`
      : "Opening this home's Airbnb listing.",
    path: `/go/airbnb/${slug}`,
    noindex: true,
  });
}

export default async function GoToAirbnb({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const property = await properties.getBySlug(slug);
  if (!property?.airbnbUrl) notFound();

  return (
    <Container>
      <div className="flex min-h-[50vh] flex-col justify-center py-20">
        <div className="max-w-xl">
          <p className="eyebrow text-brass-700">Taking you to Airbnb</p>
          <h1 className="mt-5 text-display-md text-ink">{property.name}</h1>
          <p className="mt-5 text-ink-muted">
            Opening the Airbnb listing now. If nothing happens,{" "}
            <a
              href={property.airbnbUrl}
              rel="nofollow noopener"
              className="font-medium text-evergreen-800 underline underline-offset-4 hover:text-evergreen-900"
            >
              continue to Airbnb
            </a>
            .
          </p>
          <AirbnbRedirect to={property.airbnbUrl} />
        </div>
      </div>
    </Container>
  );
}
