"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
import { IconCheck } from "@/components/ui/icons";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/config/site";
import { contactLeadSchema, fieldErrors } from "@/lib/forms/schemas";
import { looksAutomated, submitLead, throttled } from "@/lib/forms/submit";

/**
 * General contact form.
 *
 * It also serves as the enquiry endpoint for a specific property: the stay
 * panel on a property page links here with `?property=&from=&to=&guests=`, and
 * those values are read on mount and used to pre-fill the message. That keeps
 * one form and one inbox rather than a second, near-identical booking form.
 */

const TOPIC_OPTIONS = [
  { value: "co-hosting", label: "Co-hosting my property" },
  { value: "management", label: "Full rental management" },
  { value: "booking", label: "Staying at a property" },
  { value: "partnership", label: "Partnership or supplier enquiry" },
  { value: "other", label: "Something else" },
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
  topic: string;
  message: string;
  preferredContact: string;
  consent: string;
  website: string;
};

const INITIAL: State = {
  fullName: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
  preferredContact: "email",
  consent: "false",
  website: "",
};

export function ContactForm({ sourcePath = "/contact" }: { sourcePath?: string }) {
  const [values, setValues] = useState<State>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [started, setStarted] = useState(false);
  const renderedAt = useRef(Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);

  // Pre-fill from a property enquiry link. Values are read from the URL and are
  // therefore untrusted: they are only ever inserted as React text content,
  // never as markup, and the schema re-validates everything on submit.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const property = params.get("property");
    if (!property) return;

    const from = params.get("from");
    const to = params.get("to");
    const guests = params.get("guests");
    const name = property.replace(/[^a-z0-9-]/gi, "").replace(/-/g, " ");

    const parts = [`I would like to enquire about ${name}.`];
    if (from && to) parts.push(`Dates: ${from} to ${to}.`);
    if (guests) parts.push(`Guests: ${guests}.`);

    setValues((current) => ({
      ...current,
      topic: "booking",
      message: current.message || `${parts.join(" ")}\n\n`,
    }));
  }, []);

  const set = (key: keyof State) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (!started) {
      setStarted(true);
      track({ name: "lead_form_started", params: { form: "contact-lead", path: sourcePath } });
    }
  };

  const fieldError = (key: string) => errors[key]?.[0];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (values.website || looksAutomated(renderedAt.current)) {
      setStatus("sent");
      return;
    }

    if (throttled("contact-lead")) {
      setFormError("You have just sent a message. Give us a moment before sending another.");
      return;
    }

    const parsed = contactLeadSchema.safeParse({
      ...values,
      consent: values.consent === "true",
      renderedAt: renderedAt.current,
    });

    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setStatus("submitting");

    const result = await submitLead({
      kind: "contact-lead",
      data: parsed.data as unknown as Record<string, unknown>,
      sourcePath,
    });

    if (result.ok) {
      setStatus("sent");
      track({ name: "contact_submitted", params: { path: sourcePath } });
      track({ name: "lead_form_submitted", params: { form: "contact-lead", path: sourcePath } });
      return;
    }

    setStatus("error");
    setFormError(result.error);
  }

  if (status === "sent") {
    return (
      <div className="rounded-[var(--radius-panel)] border border-evergreen-200 bg-evergreen-50 p-8 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-evergreen-800 text-linen-50">
          <IconCheck className="h-6 w-6" />
        </span>
        <h2 className="mt-5 text-display-sm text-evergreen-900">Message received</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-evergreen-900/80">
          Thank you. We will come back to you as soon as we can, using whichever method you asked
          for.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div ref={summaryRef} tabIndex={-1}>
        <ErrorSummary errors={errors} />
      </div>

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

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => set("phone")(event.target.value)}
          error={fieldError("phone")}
        />
        <SelectField
          label="What is this about?"
          name="topic"
          required
          placeholder="Select..."
          options={TOPIC_OPTIONS}
          value={values.topic}
          onChange={(event) => set("topic")(event.target.value)}
          error={fieldError("topic")}
        />
      </div>

      <TextAreaField
        label="Message"
        name="message"
        required
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
              You can also email{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="underline underline-offset-4">
                {siteConfig.contact.email}
              </a>
              .
            </>
          ) : null}
        </p>
      ) : null}

      <div>
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send message"}
        </Button>
      </div>
    </form>
  );
}
