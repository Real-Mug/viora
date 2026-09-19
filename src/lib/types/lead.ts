import type { PropertyType, Province } from "./property";

export type ContactMethod = "email" | "phone" | "text";

export type BookingPlatform =
  | "airbnb"
  | "vrbo"
  | "booking.com"
  | "direct"
  | "multiple"
  | "none";

/** Payload produced by the Become a Host form. */
export type HostLead = {
  fullName: string;
  email: string;
  phone?: string;
  propertyAddress: string;
  city: string;
  province: Province;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  airbnbListingUrl?: string;
  currentPlatform?: BookingPlatform;
  message?: string;
  preferredContact: ContactMethod;
  consent: boolean;
};

/** Payload produced by the general contact form. */
export type ContactLead = {
  fullName: string;
  email: string;
  phone?: string;
  topic: "co-hosting" | "management" | "booking" | "partnership" | "other";
  message: string;
  preferredContact: ContactMethod;
  consent: boolean;
};

export type LeadSubmission<T> = {
  kind: "host-lead" | "contact-lead";
  data: T;
  /** Page the form was submitted from - useful for attribution. */
  sourcePath: string;
  submittedAt: string;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
