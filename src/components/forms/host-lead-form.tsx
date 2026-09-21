"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import {
  CheckboxField,
  ErrorSummary,
  Honeypot,
  RadioGroupField,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { Button } from "@/components/ui/button";
import { IconCheck, IconShield } from "@/components/ui/icons";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/config/site";
import { fieldErrors, hostLeadSchema } from "@/lib/forms/schemas";
import { looksAutomated, submitLead, throttled } from "@/lib/forms/submit";
import { PROPERTY_TYPE_LABELS, PROVINCE_NAMES } from "@/lib/types/property";

/**
 * Become a Host lead form.
 *
 * Validation runs here for immediate feedback and is re-run wherever the
 * submission lands - browser validation is a convenience, never a control.
 *
 * Anti-abuse, layered so none of it obstructs a real person:
 *   - honeypot field (hidden, never filled by a human);
 *   - minimum fill time (scripts submit instantly);
 *   - client-side submit throttle against double posts;
 *   - a real rate limit belongs at the receiving endpoint, which is why the
 *     Node-host route handler applies one.
 *
 * Privacy: nothing entered here is published anywhere on the site, and the form
 * asks for no more than is needed to assess a property.
 */

const PROVINCE_OPTIONS = Object.entries(PROVINCE_NAMES).map(([value, label]) => ({ value, label }));
const TYPE_OPTIONS = Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => ({ value, label }));
const PLATFORM_OPTIONS = [
  { value: "airbnb", label: "Airbnb" },
  { value: "vrbo", label: "Vrbo" },
  { value: "booking.com", label: "Booking.com" },
  { value: "direct", label: "Direct bookings only" },
  { value: "multiple", label: "More than one platform" },
  { value: "none", label: "Not currently listed" },
];
const CONTACT_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "text", label: "Text message" },
];

/** Every control is kept as a string; the schema does the coercion on submit. */
type State = {
  fullName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  city: string;
  province: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  maxGuests: string;
  airbnbListingUrl: string;
  currentPlatform: string;
  message: string;
  preferredContact: string;
  consent: string;
  website: string;
};

const INITIAL: State = {
  fullName: "",
  email: "",
  phone: "",
  propertyAddress: "",
  city: "",
  province: "",
  propertyType: "",
  bedrooms: "",
  bathrooms: "",
  maxGuests: "",
  airbnbListingUrl: "",
  currentPlatform: "",
  message: "",
  preferredContact: "email",
  consent: "false",
  website: "",
};

export function HostLeadForm({ sourcePath = "/become-a-host" }: { sourcePath?: string }) {
  const [values, setValues] = useState<State>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [started, setStarted] = useState(false);
  const renderedAt = useRef(Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof State) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (!started) {
      setStarted(true);
      track({ name: "lead_form_started", params: { form: "host-lead", path: sourcePath } });
    }
  };

  const fieldError = (key: string) => errors[key]?.[0];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    // Silent rejection for obvious automation: a bot gets a success-shaped
    // no-op rather than a clue about which check it failed.
    if (values.website || looksAutomated(renderedAt.current)) {
      setStatus("sent");
      return;
    }

    if (throttled("host-lead")) {
      setFormError("You have just submitted this form. Give us a moment before sending another.");
      return;
    }

    const parsed = hostLeadSchema.safeParse({
      ...values,
      consent: values.consent === "true",
      renderedAt: renderedAt.current,
    });

    if (!parsed.success) {
      const next = fieldErrors(parsed.error);
      setErrors(next);
      setStatus("idle");
      // Move focus to the summary so the errors are announced.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setStatus("submitting");

    const result = await submitLead({
      kind: "host-lead",
      data: parsed.data as unknown as Record<string, unknown>,
      sourcePath,
    });

    if (result.ok) {
      setStatus("sent");
      track({ name: "lead_form_submitted", params: { form: "host-lead", path: sourcePath } });
      return;
    }

    setStatus("error");
    setFormError(result.error);
  }

  if (status === "sent") {
    return (
      <div className="rounded-[var(--radius-panel)] border border-evergreen-200 bg-evergreen-50 p-8 text-center sm:p-10">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-evergreen-800 text-linen-50">
          <IconCheck className="h-6 w-6" />
        </span>
        <h2 className="mt-5 text-display-sm text-evergreen-900">Thank you - we have your details</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-evergreen-900/80">
          We will review the property and come back to you with an honest assessment. If anything is
          unclear we will ask before we put numbers to it.
        </p>
        {siteConfig.contact.email ? (
          <p className="mt-4 text-sm text-evergreen-900/70">
            Need to add something? Email{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="underline underline-offset-4">
              {siteConfig.contact.email}
            </a>
            .
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <div ref={summaryRef} tabIndex={-1}>
        <ErrorSummary errors={errors} />
      </div>

      <fieldset className="grid gap-5">
        <legend className="text-sm font-semibold uppercase tracking-[0.12em] text-brass-700">
          About you
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Full name"
            name="fullName"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={(event) => set("fullName")(event.target.value)}
            error={fieldError("fullName")}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => set("email")(event.target.value)}
            error={fieldError("email")}
          />
        </div>

        <TextField
          label="Phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          hint="Only needed if you would rather we called or texted."
          value={values.phone}
          onChange={(event) => set("phone")(event.target.value)}
          error={fieldError("phone")}
          className="sm:max-w-sm"
        />
      </fieldset>

      <hr className="border-line" />

      <fieldset className="grid gap-5">
        <legend className="text-sm font-semibold uppercase tracking-[0.12em] text-brass-700">
          About the property
        </legend>

        <TextField
          label="Property address"
          name="propertyAddress"
          autoComplete="street-address"
          required
          hint="We use this to check local rules and travel times. It is never published."
          value={values.propertyAddress}
          onChange={(event) => set("propertyAddress")(event.target.value)}
          error={fieldError("propertyAddress")}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="City"
            name="city"
            autoComplete="address-level2"
            required
            value={values.city}
            onChange={(event) => set("city")(event.target.value)}
            error={fieldError("city")}
          />
          <SelectField
            label="Province or territory"
            name="province"
            required
            placeholder="Select..."
            options={PROVINCE_OPTIONS}
            value={values.province}
            onChange={(event) => set("province")(event.target.value)}
            error={fieldError("province")}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            label="Property type"
            name="propertyType"
            required
            placeholder="Select..."
            options={TYPE_OPTIONS}
            value={values.propertyType}
            onChange={(event) => set("propertyType")(event.target.value)}
            error={fieldError("propertyType")}
          />
          <SelectField
            label="Currently listed on"
            name="currentPlatform"
            placeholder="Select..."
            options={PLATFORM_OPTIONS}
            value={values.currentPlatform}
            onChange={(event) => set("currentPlatform")(event.target.value)}
            error={fieldError("currentPlatform")}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <TextField
            label="Bedrooms"
            name="bedrooms"
            type="number"
            inputMode="numeric"
            min={0}
            max={50}
            required
            value={values.bedrooms}
            onChange={(event) => set("bedrooms")(event.target.value)}
            error={fieldError("bedrooms")}
          />
          <TextField
            label="Bathrooms"
            name="bathrooms"
            type="number"
            inputMode="decimal"
            min={0}
            max={50}
            step={0.5}
            required
            value={values.bathrooms}
            onChange={(event) => set("bathrooms")(event.target.value)}
            error={fieldError("bathrooms")}
          />
          <TextField
            label="Guest capacity"
            name="maxGuests"
            type="number"
            inputMode="numeric"
            min={1}
            max={100}
            required
            value={values.maxGuests}
            onChange={(event) => set("maxGuests")(event.target.value)}
            error={fieldError("maxGuests")}
          />
        </div>

        <TextField
          label="Current listing URL"
          name="airbnbListingUrl"
          type="url"
          inputMode="url"
          placeholder="https://www.airbnb.ca/rooms/..."
          hint="An existing Airbnb or Vrbo listing helps us give you a far more useful assessment."
          value={values.airbnbListingUrl}
          onChange={(event) => set("airbnbListingUrl")(event.target.value)}
          error={fieldError("airbnbListingUrl")}
        />
      </fieldset>

      <hr className="border-line" />

      <fieldset className="grid gap-5">
        <legend className="text-sm font-semibold uppercase tracking-[0.12em] text-brass-700">
          What you need
        </legend>

        <TextAreaField
          label="Tell us about your situation"
          name="message"
          hint="What is taking up your time, what has gone wrong before, what you want to change."
          value={values.message}
          onChange={(event) => set("message")(event.target.value)}
          error={fieldError("message")}
        />

        <RadioGroupField
          label="Preferred contact method"
          name="preferredContact"
          required
          options={CONTACT_OPTIONS}
          value={values.preferredContact}
          onChange={set("preferredContact")}
          error={fieldError("preferredContact")}
        />
      </fieldset>

      <CheckboxField
        name="consent"
        label="Consent"
        checked={values.consent === "true"}
        onChange={(checked) => set("consent")(String(checked))}
        error={fieldError("consent")}
      >
        I agree that Viora Hosting may contact me about this enquiry, and I have read the{" "}
        <Link href="/legal/privacy-policy" className="text-evergreen-800 underline underline-offset-4">
          privacy policy
        </Link>
        .
      </CheckboxField>

      <Honeypot value={values.website} onChange={set("website")} />

      {formError ? (
        <p role="alert" className="rounded-xl border border-danger/35 bg-danger/5 p-4 text-sm text-danger">
          {formError}
          {siteConfig.contact.email ? (
            <>
              {" "}
              You can also email us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="underline underline-offset-4">
                {siteConfig.contact.email}
              </a>
              .
            </>
          ) : null}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Request a property assessment"}
        </Button>
        <p className="text-sm text-ink-subtle">No obligation. No cost for the assessment.</p>
      </div>

      <div className="flex gap-3 rounded-[var(--radius-card)] border border-line bg-linen-200/60 p-4 text-[0.8125rem] leading-relaxed text-ink-muted">
        <IconShield className="mt-0.5 h-4 w-4 shrink-0 text-brass-600" />
        <p>
          Your details are used to assess your property and respond to you. They are never published
          on this site, never sold, and never shared with other owners or guests. You can ask us to
          delete them at any time. See the{" "}
          <Link href="/legal/privacy-policy" className="text-evergreen-800 underline underline-offset-4">
            privacy policy
          </Link>{" "}
          for how long we keep enquiry information.
        </p>
      </div>
    </form>
  );
}
