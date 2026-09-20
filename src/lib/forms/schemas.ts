import { z } from "zod";

import { PROVINCE_NAMES, PROPERTY_TYPE_LABELS } from "@/lib/types/property";

/**
 * One schema, used in three places: browser validation, the serverless/API
 * handler when running on a Node host, and any future admin import. Validation
 * in the browser is a convenience only - it is re-run wherever the data lands,
 * because anything sent from a client is untrusted.
 */

const provinceValues = Object.keys(PROVINCE_NAMES) as [string, ...string[]];
const propertyTypeValues = Object.keys(PROPERTY_TYPE_LABELS) as [string, ...string[]];

/**
 * Rejects control characters and caps length before anything is stored or sent.
 *
 * Length bounds are taken as arguments rather than chained afterwards: the
 * `.refine` turns the schema into a ZodEffects, which no longer exposes
 * `.min`/`.max`, so building them in keeps every call site correct by
 * construction.
 */
const safeText = (max: number, min = 0, minMessage?: string) =>
  z
    .string()
    .trim()
    .min(min, minMessage ?? `Please enter at least ${min} characters.`)
    .max(max, `Please keep this under ${max} characters.`)
    .refine((value) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value), {
      message: "This field contains characters that are not allowed.",
    });

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .optional()
  .or(z.literal(""))
  .refine(
    (value) => !value || /^https?:\/\/[^\s<>"']+$/i.test(value),
    { message: "Enter a full URL starting with http:// or https://" },
  );

const phone = z
  .string()
  .trim()
  .max(30)
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || /^[\d\s()+.-]{7,}$/.test(value), {
    message: "Enter a valid phone number.",
  });

/**
 * Anti-spam fields present on every public form:
 *   - `website` is a honeypot, hidden from users and left empty by humans;
 *   - `renderedAt` catches submissions faster than a person could type.
 */
const antiSpam = {
  website: z.string().max(0, "Submission rejected.").optional().or(z.literal("")),
  renderedAt: z.coerce.number().optional(),
};

export const MIN_FILL_SECONDS = 3;

export const hostLeadSchema = z
  .object({
    fullName: safeText(120, 2, "Enter your full name."),
    email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(254),
    phone,
    propertyAddress: safeText(200, 5, "Enter the property address."),
    city: safeText(80, 2, "Enter the city."),
    province: z.enum(provinceValues, { errorMap: () => ({ message: "Select a province or territory." }) }),
    propertyType: z.enum(propertyTypeValues, { errorMap: () => ({ message: "Select a property type." }) }),
    bedrooms: z.coerce.number().int().min(0, "Enter 0 or more.").max(50),
    bathrooms: z.coerce.number().min(0, "Enter 0 or more.").max(50),
    maxGuests: z.coerce.number().int().min(1, "Enter at least 1 guest.").max(100),
    airbnbListingUrl: optionalUrl,
    currentPlatform: z
      .enum(["airbnb", "vrbo", "booking.com", "direct", "multiple", "none"])
      .optional(),
    message: safeText(2000).optional().or(z.literal("")),
    preferredContact: z.enum(["email", "phone", "text"], {
      errorMap: () => ({ message: "Choose how you would like to be contacted." }),
    }),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Please confirm you agree to be contacted about your enquiry." }),
    }),
    ...antiSpam,
  })
  .refine(
    (data) => data.preferredContact === "email" || Boolean(data.phone),
    { path: ["phone"], message: "Add a phone number so we can reach you that way." },
  );

export const contactLeadSchema = z.object({
  fullName: safeText(120, 2, "Enter your full name."),
  email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(254),
  phone,
  topic: z.enum(["co-hosting", "management", "booking", "partnership", "other"], {
    errorMap: () => ({ message: "Choose what your message is about." }),
  }),
  message: safeText(2000, 10, "Tell us a little more - at least 10 characters."),
  preferredContact: z.enum(["email", "phone", "text"]),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you agree to be contacted about your enquiry." }),
  }),
  ...antiSpam,
});

export type HostLeadInput = z.input<typeof hostLeadSchema>;
export type HostLeadParsed = z.output<typeof hostLeadSchema>;
export type ContactLeadInput = z.input<typeof contactLeadSchema>;
export type ContactLeadParsed = z.output<typeof contactLeadSchema>;

/** Flattens a ZodError into the `{ field: messages[] }` shape the forms render. */
export function fieldErrors(error: z.ZodError): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_form";
    (result[key] ??= []).push(issue.message);
  }
  return result;
}
