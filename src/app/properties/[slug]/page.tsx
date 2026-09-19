import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BookingPanel } from "@/components/property/booking-panel";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyGallery } from "@/components/property/property-gallery";
import { PropertyAnalytics } from "@/components/property/property-analytics";
import { CtaBand } from "@/components/marketing/sections";
import { AggregateSummary, NoReviewsYet, ReviewList } from "@/components/reviews/review-list";
import { JsonLd } from "@/components/seo/json-ld";
import { SampleBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Note } from "@/components/ui/card";
import {
  IconBath,
  IconBed,
  IconExternal,
  IconGuests,
  IconHome,
  IconInfo,
  IconMapPin,
} from "@/components/ui/icons";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { getServiceArea } from "@/content/locations";
import { AMENITY_CATEGORY_LABELS, groupAmenities } from "@/lib/data/amenities";
import { withBasePath } from "@/lib/config/env";
import { availability, properties, reviews } from "@/lib/data";
import { formatDollars } from "@/lib/pricing/quote";
import { pageMetadata } from "@/lib/seo/metadata";
import { PROPERTY_TYPE_LABELS, PROVINCE_NAMES } from "@/lib/types/property";
import { breadcrumbSchema, graph, propertySchema, type Crumb } from "@/lib/seo/schema";

/**
 * Individual property page.
 *
 * Statically generated per property from the repository, so adding a property
 * to the content file (or later, to a CMS) produces a new indexable page with
 * no code change. `dynamicParams = false` means an unknown slug 404s rather
 * than attempting a render.
 */
export async function generateStaticParams() {
  const slugs = await properties.allSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const property = await properties.getBySlug(slug);
  if (!property) return {};

  const cover = property.images.find((image) => image.isCover) ?? property.images[0];

  return pageMetadata({
    title:
      property.seoTitle ??
      `${property.name} - ${PROPERTY_TYPE_LABELS[property.propertyType]} in ${property.location.city}`,
    description:
      property.seoDescription ??
      `${property.summary} Sleeps ${property.maxGuests}. Managed by VioraRental.`,
    path: `/properties/${property.slug}`,
    ...(cover ? { image: { url: cover.src, alt: cover.alt } } : {}),
  });
}

export default async function PropertyPage({ params }: Params) {
  const { slug } = await params;
  const property = await properties.getBySlug(slug);
  if (!property) notFound();

  const propertyReviews = await reviews.forProperty(slug);
  const related = await properties.related(slug, 3);
  const calendar = await availability.getCalendar(property.id);
  const area = property.location.locationSlug
    ? getServiceArea(property.location.locationSlug)
    : undefined;

  const amenityGroups = groupAmenities(property.amenities);
  const { location, pricing } = property;

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: property.name, path: `/properties/${property.slug}` },
  ];

  return (
    <>
      <JsonLd data={graph(propertySchema(property, propertyReviews), breadcrumbSchema(crumbs))} />
      <PropertyAnalytics
        slug={property.slug}
        city={location.city}
        province={location.province}
      />

      <Container className="pt-8">
        <Breadcrumbs crumbs={crumbs} />
      </Container>

      {/* --- Header ---------------------------------------------------------- */}
      <Container className="pt-6">
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
          <div className="max-w-2xl">
            {property.isPlaceholder ? <SampleBadge className="mb-3" /> : null}
            <h1 className="text-display-lg text-ink">{property.name}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-muted">
              <IconMapPin className="h-5 w-5 text-brass-600" />
              <span>
                {location.region ? `${location.region}, ` : ""}
                {location.city}, {PROVINCE_NAMES[location.province]}
              </span>
              {area ? (
                <>
                  <span aria-hidden="true" className="text-line-strong">
                    &middot;
                  </span>
                  <Link
                    href={`/locations/${area.slug}`}
                    className="text-[0.9375rem] text-evergreen-800 underline-offset-4 hover:underline"
                  >
                    Short-term rentals in {area.city}
                  </Link>
                </>
              ) : null}
            </p>
            {propertyReviews.length ? (
              <div className="mt-4">
                <AggregateSummary reviews={propertyReviews} />
              </div>
            ) : null}
          </div>

          {property.externalWebsiteUrl ? (
            <ButtonLink href={property.externalWebsiteUrl} variant="secondary" external>
              <IconExternal className="h-4 w-4" />
              Visit property website
            </ButtonLink>
          ) : null}
        </div>
      </Container>

      {/* --- Gallery --------------------------------------------------------- */}
      <Container className="pt-8">
        <PropertyGallery images={property.images} propertyName={property.name} />
      </Container>

      {/* --- Main ------------------------------------------------------------ */}
      <Section tight>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-14">
            <div>
              {/* Key facts */}
              <ul className="flex flex-wrap gap-x-8 gap-y-4 border-b border-line pb-7">
                <li className="flex items-center gap-2.5 text-ink">
                  <IconHome className="h-5 w-5 text-brass-600" />
                  {PROPERTY_TYPE_LABELS[property.propertyType]}
                </li>
                <li className="flex items-center gap-2.5 text-ink">
                  <IconGuests className="h-5 w-5 text-brass-600" />
                  Sleeps {property.maxGuests}
                </li>
                <li className="flex items-center gap-2.5 text-ink">
                  <IconBed className="h-5 w-5 text-brass-600" />
                  {property.bedrooms} {property.bedrooms === 1 ? "bedroom" : "bedrooms"} &middot;{" "}
                  {property.beds} {property.beds === 1 ? "bed" : "beds"}
                </li>
                <li className="flex items-center gap-2.5 text-ink">
                  <IconBath className="h-5 w-5 text-brass-600" />
                  {property.bathrooms} {property.bathrooms === 1 ? "bathroom" : "bathrooms"}
                </li>
              </ul>

              {/* Description */}
              <section className="pt-8" aria-labelledby="about-property">
                <h2 id="about-property" className="text-display-sm text-ink">
                  About this property
                </h2>
                <div className="prose-viora mt-5">
                  {property.description.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Video */}
              {property.videos?.length ? (
                <section className="pt-10" aria-labelledby="property-video">
                  <h2 id="property-video" className="text-display-sm text-ink">
                    Video tour
                  </h2>
                  <div className="mt-5 overflow-hidden rounded-[var(--radius-panel)] border border-line">
                    {property.videos.map((video) =>
                      video.provider === "file" ? (
                        <video
                          key={video.src}
                          controls
                          preload="none"
                          poster={video.posterSrc ? withBasePath(video.posterSrc) : undefined}
                          className="aspect-video w-full bg-linen-300"
                        >
                          <source src={withBasePath(video.src)} />
                          Your browser does not support embedded video.
                        </video>
                      ) : (
                        <iframe
                          key={video.src}
                          src={video.src}
                          title={video.title}
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                          className="aspect-video w-full border-0"
                        />
                      ),
                    )}
                  </div>
                </section>
              ) : null}

              {/* Amenities */}
              <section className="pt-10" aria-labelledby="amenities">
                <h2 id="amenities" className="text-display-sm text-ink">
                  Amenities
                </h2>
                <div className="mt-6 grid gap-8 sm:grid-cols-2">
                  {amenityGroups.map((group) => (
                    <div key={group.category}>
                      <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-brass-700">
                        {AMENITY_CATEGORY_LABELS[group.category]}
                      </h3>
                      <ul className="mt-3 grid gap-2">
                        {group.items.map((amenity) => (
                          <li key={amenity.id} className="text-[0.9375rem] text-ink-muted">
                            {amenity.label}
                            {amenity.note ? (
                              <span className="text-ink-subtle"> - {amenity.note}</span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Location */}
              <section className="pt-10" aria-labelledby="location">
                <h2 id="location" className="text-display-sm text-ink">
                  Getting around
                </h2>
                <p className="mt-4 text-ink-muted">
                  {location.region ? `${location.region}, ` : ""}
                  {location.city}, {PROVINCE_NAMES[location.province]}
                </p>
                {location.neighbourhoodNotes?.length ? (
                  <ul className="mt-4 grid gap-2.5">
                    {location.neighbourhoodNotes.map((note) => (
                      <li key={note} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass-500" />
                        {note}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-subtle">
                  The exact address is shared with confirmed guests before arrival. We do not publish
                  street addresses for properties under management.
                </p>
              </section>

              {/* House rules */}
              <section className="pt-10" aria-labelledby="house-rules">
                <h2 id="house-rules" className="text-display-sm text-ink">
                  House rules
                </h2>
                <ul className="mt-5 grid gap-2.5">
                  {property.houseRules.map((rule) => (
                    <li key={rule} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass-500" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Pricing detail */}
              {pricing ? (
                <section className="pt-10" aria-labelledby="pricing">
                  <h2 id="pricing" className="text-display-sm text-ink">
                    Rates and fees
                  </h2>
                  <dl className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {pricing.baseNightlyRate != null ? (
                      <Row label="Base nightly rate" value={formatDollars(pricing.baseNightlyRate)} />
                    ) : null}
                    {pricing.weekendNightlyRate != null ? (
                      <Row label="Weekend rate" value={formatDollars(pricing.weekendNightlyRate)} />
                    ) : null}
                    {pricing.seasonalRates?.map((season) => (
                      <Row
                        key={season.label}
                        label={season.label}
                        value={formatDollars(season.nightlyRate)}
                      />
                    ))}
                    {pricing.cleaningFee != null ? (
                      <Row label="Cleaning fee" value={formatDollars(pricing.cleaningFee)} />
                    ) : null}
                    {pricing.minimumStayNights ? (
                      <Row label="Minimum stay" value={`${pricing.minimumStayNights} nights`} />
                    ) : null}
                    {pricing.additionalGuestFee != null && pricing.guestsIncluded != null ? (
                      <Row
                        label={`Additional guest (over ${pricing.guestsIncluded})`}
                        value={`${formatDollars(pricing.additionalGuestFee)} per night`}
                      />
                    ) : null}
                    {pricing.petsAllowed && pricing.petFee != null ? (
                      <Row label="Pet fee" value={formatDollars(pricing.petFee)} />
                    ) : null}
                    {pricing.discounts?.map((discount) => (
                      <Row
                        key={discount.type}
                        label={discount.label}
                        value={`${Math.round(discount.rate * 100)}% off`}
                      />
                    ))}
                  </dl>
                  <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-subtle">
                    Taxes and service fees are applied on top and are shown in the estimate. Rates
                    are subject to confirmation at the time of booking.
                  </p>
                </section>
              ) : null}

              {/* Availability */}
              <section className="pt-10" aria-labelledby="availability">
                <h2 id="availability" className="text-display-sm text-ink">
                  Availability
                </h2>
                <Note icon={<IconInfo className="h-4 w-4 text-brass-600" />} className="mt-5">
                  {calendar.source === "unconfigured" ? (
                    <>
                      No live calendar is connected to this property yet, so we are not showing one.
                      Send us your dates and we will confirm availability directly - usually the same
                      day. Calendar synchronisation is planned, and this section will show live
                      availability once it is genuinely connected.
                    </>
                  ) : (
                    <>
                      Availability is synchronised from {calendar.source}
                      {calendar.lastSyncedAt ? ` (last updated ${calendar.lastSyncedAt})` : ""}.
                    </>
                  )}
                </Note>
              </section>

              {/* Reviews */}
              <section className="pt-10" aria-labelledby="reviews">
                <h2 id="reviews" className="text-display-sm text-ink">
                  Reviews
                </h2>
                <div className="mt-6">
                  {propertyReviews.length ? (
                    <ReviewList reviews={propertyReviews} showProperty={false} columns={2} />
                  ) : (
                    <NoReviewsYet context="property" />
                  )}
                </div>
              </section>
            </div>

            {/* Sticky stay panel */}
            <aside className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]">
              <BookingPanel property={property} />

              <div className="mt-5 rounded-[var(--radius-card)] border border-line bg-linen-200/60 p-5">
                <p className="text-sm font-medium text-ink">Managed by VioraRental</p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">
                  This property is operated by our team: guest support, cleaning, maintenance and
                  the listing itself.
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link
                    href="/about"
                    className="text-evergreen-800 underline-offset-4 hover:underline"
                  >
                    About us
                  </Link>
                  <Link
                    href="/contact"
                    className="text-evergreen-800 underline-offset-4 hover:underline"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/become-a-host"
                    className="text-evergreen-800 underline-offset-4 hover:underline"
                  >
                    List your property
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* --- Related --------------------------------------------------------- */}
      {related.length > 0 ? (
        <Section tone="sunken" aria-labelledby="related-properties">
          <Container>
            <SectionHeading
              id="related-properties"
              eyebrow="More properties"
              title={`Other properties near ${location.city}`}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        title="Own a property like this one?"
        description="We manage properties across several Canadian markets. Tell us about yours and we will come back with an honest assessment."
      />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2.5">
      <dt className="text-[0.9375rem] text-ink-muted">{label}</dt>
      <dd className="text-[0.9375rem] font-medium tabular-nums text-ink">{value}</dd>
    </div>
  );
}
