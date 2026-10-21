import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { IconBath, IconBed, IconCheck, IconGuests, IconMapPin } from "@/components/ui/icons";
import { Img as Image } from "@/components/ui/image";
import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { airbnbOutHref } from "@/lib/outbound";
import type { Property } from "@/lib/types/property";
import { PROVINCE_NAMES } from "@/lib/types/property";

/**
 * The homepage spotlight: one home shown large, ahead of the regular grid.
 *
 * Everything on it comes from the property record - the photos, the facts and
 * the `highlights` taken from the listing - so swapping which home is in the
 * spotlight is a one-line data change (`spotlight: true`), not a layout edit.
 */
export function PropertySpotlight({ property }: { property: Property }) {
  const [cover, ...rest] = property.images;
  const side = rest.slice(0, 2);
  const href = `/properties/${property.slug}`;
  const { location } = property;
  const highlights = property.highlights?.length
    ? property.highlights
    : property.amenities.slice(0, 6).map((amenity) => amenity.label);

  return (
    <Section tone="evergreen" aria-labelledby="spotlight-heading">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
              {cover ? (
                <Link
                  href={href}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] bg-evergreen-800 sm:row-span-2 sm:aspect-auto sm:min-h-[22rem]"
                >
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 1280px) 460px, (min-width: 640px) 60vw, 92vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.04]"
                  />
                </Link>
              ) : null}
              {side.map((image) => (
                <Link
                  key={image.src}
                  href={href}
                  // Tab once per card, not three times: the extra photos are
                  // decorative duplicates of the same destination.
                  tabIndex={-1}
                  aria-hidden="true"
                  className="group relative hidden aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] bg-evergreen-800 sm:block"
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 230px, 30vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.04]"
                  />
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-brass-300">
              Featured home
            </p>
            <h2 id="spotlight-heading" className="mt-3 text-display-md text-linen-50">
              {property.name}
            </h2>
            <p className="mt-3 flex items-center gap-1.5 text-[0.9375rem] text-linen-200">
              <IconMapPin className="h-4 w-4 text-brass-300" />
              {location.city}, {PROVINCE_NAMES[location.province]}
            </p>

            <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem] text-linen-100">
              <div className="flex items-center gap-1.5">
                <IconGuests className="h-4 w-4 text-brass-300" />
                <dt className="sr-only">Sleeps</dt>
                <dd>{property.maxGuests} guests</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <IconBed className="h-4 w-4 text-brass-300" />
                <dt className="sr-only">Bedrooms</dt>
                <dd>{property.bedrooms} bedrooms</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <IconBath className="h-4 w-4 text-brass-300" />
                <dt className="sr-only">Bathrooms</dt>
                <dd>{property.bathrooms} baths</dd>
              </div>
            </dl>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex gap-2 text-[0.9375rem] leading-snug text-linen-100">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brass-300" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={href} variant="onDark">
                View the home
              </ButtonLink>
              {property.airbnbUrl ? (
                <ButtonLink href={airbnbOutHref(property.slug)} variant="onDarkGhost" external>
                  See it on Airbnb
                </ButtonLink>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
