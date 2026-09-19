/**
 * Booking model - Phase 4.
 *
 * Nothing in the shipped site creates a booking. These types exist so the
 * property page UI, the quote calculator and a future checkout speak the same
 * language, and so adding a real booking engine is an implementation task
 * rather than a redesign.
 */

export type BookingStatus =
  | "enquiry"
  | "pending-payment"
  | "confirmed"
  | "cancelled"
  | "completed";

export type StayDates = {
  /** ISO date, check-in. */
  checkIn: string;
  /** ISO date, check-out (exclusive). */
  checkOut: string;
};

export type GuestCount = {
  adults: number;
  children: number;
  infants: number;
  pets: number;
};

/** A fully itemised, auditable price breakdown. */
export type QuoteLine = {
  id: string;
  label: string;
  /** In cents, to avoid floating-point drift. */
  amountCents: number;
  kind: "accommodation" | "fee" | "tax" | "discount";
  detail?: string;
};

export type Quote = {
  propertyId: string;
  currency: "CAD";
  nights: number;
  lines: QuoteLine[];
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
  /** Populated when the request violates a stay rule. */
  issues: string[];
};

export type BookingRequest = {
  propertyId: string;
  dates: StayDates;
  guests: GuestCount;
  guest: { fullName: string; email: string; phone?: string; message?: string };
  quote: Quote;
};

export type Booking = BookingRequest & {
  id: string;
  reference: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
};

/**
 * The seam a payment provider implements. No provider is wired up: the site
 * never collects card details and never displays a checkout.
 */
export interface PaymentProvider {
  readonly id: string;
  createCheckoutSession(input: {
    booking: BookingRequest;
    successUrl: string;
    cancelUrl: string;
  }): Promise<{ redirectUrl: string }>;
}

/** The seam a booking engine implements once Phase 4 begins. */
export interface BookingEngine {
  readonly id: string;
  checkAvailability(
    propertyId: string,
    dates: StayDates,
  ): Promise<{ available: boolean; reason?: string }>;
  quote(propertyId: string, dates: StayDates, guests: GuestCount): Promise<Quote>;
  create(request: BookingRequest): Promise<Booking>;
}
