import type { AvailabilityCalendar, Property } from "@/lib/types/property";
import type { Review } from "@/lib/types/review";
import type { HostLead } from "@/lib/types/lead";

/**
 * INTEGRATION SEAMS
 * ----------------------------------------------------------------------------
 * None of these integrations exist yet. Nothing in the site claims otherwise,
 * and no page calls an unimplemented provider.
 *
 * They are declared now so that when a channel manager, PMS or CRM is chosen,
 * the work is writing one adapter class rather than reworking pages. Each
 * provider is registered in `integrations` below; `configured: false` is what
 * the app checks before offering any dependent feature.
 */

export type IntegrationStatus = {
  id: string;
  name: string;
  /** Flipped to true only when credentials are present and the adapter is wired. */
  configured: boolean;
  category: "channel" | "pms" | "calendar" | "payments" | "crm" | "messaging" | "revenue";
};

/** Pulls listing and calendar data from a channel manager or OTA. */
export interface ChannelProvider {
  readonly id: string;
  /** Listings as the channel sees them, mapped into our Property shape. */
  fetchListings(): Promise<Property[]>;
  fetchCalendar(externalListingId: string): Promise<AvailabilityCalendar>;
  /** Push a confirmed direct booking back so the channel blocks those dates. */
  pushBlock(externalListingId: string, start: string, end: string): Promise<void>;
}

/** Two-way calendar sync, typically over iCal or a PMS API. */
export interface CalendarProvider {
  readonly id: string;
  pull(propertyId: string): Promise<AvailabilityCalendar>;
  push(calendar: AvailabilityCalendar): Promise<void>;
}

/** Imports reviews from a platform so they can be displayed with attribution. */
export interface ReviewProvider {
  readonly id: string;
  fetchReviews(externalListingId: string): Promise<Review[]>;
}

/** Where owner enquiries go once a CRM is in place. */
export interface CrmProvider {
  readonly id: string;
  createLead(lead: HostLead & { sourcePath: string }): Promise<{ id: string }>;
}

/** Automated guest messaging, once a messaging platform is selected. */
export interface MessagingProvider {
  readonly id: string;
  sendTemplate(input: { to: string; template: string; variables: Record<string, string> }): Promise<void>;
}

/** Dynamic pricing tools (PriceLabs, Beyond and similar). */
export interface RevenueProvider {
  readonly id: string;
  suggestRates(propertyId: string, from: string, to: string): Promise<{ date: string; rate: number }[]>;
}

/**
 * The live registry. Everything is unconfigured; the UI reads this rather than
 * assuming a capability exists. Add an entry, set `configured: true` and
 * register the adapter when an integration actually ships.
 */
export const integrations: IntegrationStatus[] = [
  { id: "airbnb", name: "Airbnb", configured: false, category: "channel" },
  { id: "ical", name: "iCal calendar sync", configured: false, category: "calendar" },
  { id: "pms", name: "Property management system", configured: false, category: "pms" },
  { id: "payments", name: "Payment processor", configured: false, category: "payments" },
  { id: "crm", name: "CRM", configured: false, category: "crm" },
  { id: "messaging", name: "Guest messaging", configured: false, category: "messaging" },
  { id: "revenue", name: "Revenue management", configured: false, category: "revenue" },
];

export function isConfigured(id: string): boolean {
  return integrations.some((integration) => integration.id === id && integration.configured);
}

/** True once any source can answer "are these dates free?" for real. */
export const bookingEngineAvailable = false;
