import { absoluteUrl, env } from "@/lib/config/env";
import { siteConfig } from "@/lib/config/site";
import type { Property } from "@/lib/types/property";
import { PROVINCE_NAMES } from "@/lib/types/property";
import type { Review } from "@/lib/types/review";
import { MIN_REVIEWS_FOR_AGGREGATE } from "@/lib/types/review";
import type { Service } from "@/lib/types/service";
import type { ServiceArea } from "@/lib/types/location";
import type { Post } from "@/lib/types/post";

/**
 * JSON-LD builders.
 *
 * Rules applied throughout:
 *   - structured data describes what is actually on the page, nothing more;
 *   - anything unverified (ratings, prices, availability) is omitted rather
 *     than guessed, because wrong markup is a manual-action risk;
 *   - placeholder records never reach structured data.
 */

type JsonLd = Record<string, unknown>;

const ORG_ID = `${env.siteUrl}/#organization`;
const SITE_ID = `${env.siteUrl}/#website`;

export function organizationSchema(): JsonLd {
  const { address, email, phone } = siteConfig.contact;
  const hasAddress = Boolean(address.streetAddress && address.addressLocality);

  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: env.siteUrl,
    description: siteConfig.shortDescription,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/brand/logo.svg"),
    },
    areaServed: { "@type": "Country", name: "Canada" },
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(hasAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: address.streetAddress,
            addressLocality: address.addressLocality,
            addressRegion: address.addressRegion,
            postalCode: address.postalCode,
            addressCountry: address.addressCountry,
          },
        }
      : {}),
    // Only real, verified profiles. An empty list is omitted entirely.
    ...(siteConfig.social.length
      ? { sameAs: siteConfig.social.map((profile) => profile.href) }
      : {}),
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: env.siteUrl,
    name: siteConfig.name,
    description: siteConfig.shortDescription,
    inLanguage: "en-CA",
    publisher: { "@id": ORG_ID },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function webPageSchema(input: {
  name: string;
  description: string;
  path: string;
  crumbs?: Crumb[];
}): JsonLd {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(input.path)}#webpage`,
    url: absoluteUrl(input.path),
    name: input.name,
    description: input.description,
    isPartOf: { "@id": SITE_ID },
    inLanguage: "en-CA",
    about: { "@id": ORG_ID },
    ...(input.crumbs?.length ? { breadcrumb: breadcrumbSchema(input.crumbs) } : {}),
  };
}

export function serviceSchema(service: Service): JsonLd {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.name,
    description: service.summary,
    serviceType: service.name,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Canada" },
    // No `offers` block: VioraRental does not publish fixed service pricing,
    // and inventing a price here would be false markup.
  };
}

/** FAQPage markup. Only emit when the questions are visible on the page. */
export function faqSchema(faqs: { question: string; answer: string }[]): JsonLd | null {
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * Aggregate rating, emitted only when the data genuinely qualifies: real,
 * verified, non-placeholder reviews, at or above the minimum count.
 */
export function aggregateRatingSchema(reviews: Review[]): JsonLd | null {
  const eligible = reviews.filter((review) => review.verified && !review.isPlaceholder);
  if (eligible.length < MIN_REVIEWS_FOR_AGGREGATE) return null;

  const total = eligible.reduce((sum, review) => sum + review.rating, 0);
  return {
    "@type": "AggregateRating",
    ratingValue: Number((total / eligible.length).toFixed(2)),
    reviewCount: eligible.length,
    bestRating: 5,
    worstRating: 1,
  };
}

function reviewSchema(review: Review): JsonLd {
  return {
    "@type": "Review",
    author: { "@type": "Person", name: review.guestName },
    datePublished: review.date,
    reviewBody: review.body,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    ...(review.title ? { name: review.title } : {}),
  };
}

/**
 * Property markup.
 *
 * Uses LodgingBusiness for a managed rental listing. Price is expressed as a
 * `priceRange` hint rather than an `offers` block, because an Offer implies a
 * bookable price and availability that this site does not yet serve.
 */
export function propertySchema(property: Property, propertyReviews: Review[] = []): JsonLd {
  const url = absoluteUrl(`/properties/${property.slug}`);
  const cover = property.images.find((image) => image.isCover) ?? property.images[0];
  const rating = aggregateRatingSchema(propertyReviews);
  const eligibleReviews = propertyReviews.filter((review) => review.verified && !review.isPlaceholder);

  return {
    "@type": "LodgingBusiness",
    "@id": `${url}#lodging`,
    name: property.name,
    description: property.summary,
    url,
    ...(cover ? { image: absoluteUrl(cover.src) } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location.city,
      addressRegion: PROVINCE_NAMES[property.location.province],
      addressCountry: "CA",
    },
    ...(property.location.coordinates
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: property.location.coordinates.lat,
            longitude: property.location.coordinates.lng,
          },
        }
      : {}),
    numberOfRooms: property.bedrooms,
    petsAllowed: property.pricing?.petsAllowed ?? false,
    amenityFeature: property.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.label,
      value: true,
    })),
    ...(property.pricing?.baseNightlyRate
      ? { priceRange: `From CAD ${property.pricing.baseNightlyRate} per night` }
      : {}),
    ...(rating ? { aggregateRating: rating } : {}),
    ...(eligibleReviews.length ? { review: eligibleReviews.map(reviewSchema) } : {}),
    ...(property.externalWebsiteUrl ? { sameAs: [property.externalWebsiteUrl] } : {}),
    isPartOf: { "@id": ORG_ID },
  };
}

/**
 * LocalBusiness for a service area. Emitted only for markets marked active,
 * and without opening hours or an address unless real ones are configured.
 */
export function serviceAreaSchema(area: ServiceArea): JsonLd {
  const url = absoluteUrl(`/locations/${area.slug}`);
  return {
    "@type": "ProfessionalService",
    "@id": `${url}#localbusiness`,
    name: `${siteConfig.name} - ${area.city}`,
    description: area.summary,
    url,
    parentOrganization: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: area.city,
      containedInPlace: { "@type": "State", name: PROVINCE_NAMES[area.province] },
    },
    ...(area.coordinates
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: area.coordinates.lat,
            longitude: area.coordinates.lng,
          },
        }
      : {}),
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
  };
}

export function articleSchema(post: Post): JsonLd {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author, "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-CA",
    mainEntityOfPage: url,
    ...(post.cover ? { image: absoluteUrl(post.cover.src) } : {}),
  };
}

/** Wraps one or more nodes into a single @graph document. */
export function graph(...nodes: (JsonLd | null | undefined)[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes.filter((node): node is JsonLd => Boolean(node)),
  });
}
