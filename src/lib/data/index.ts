import {
  StaticPropertyRepository,
  StaticReviewRepository,
  UnconfiguredAvailabilityRepository,
} from "@/lib/data/static-repository";
import type {
  AvailabilityRepository,
  PropertyRepository,
  ReviewRepository,
} from "@/lib/data/repository";

/**
 * Composition root for data access.
 *
 * Every page imports from here, never from a concrete implementation. Moving to
 * a CMS or database means changing these three lines and nothing else:
 *
 *   export const properties: PropertyRepository = new SanityPropertyRepository();
 */
export const properties: PropertyRepository = new StaticPropertyRepository();
export const reviews: ReviewRepository = new StaticReviewRepository();
export const availability: AvailabilityRepository = new UnconfiguredAvailabilityRepository();

export { startingRate } from "@/lib/data/static-repository";
