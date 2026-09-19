"use client";

import { env } from "@/lib/config/env";

/**
 * Analytics façade.
 *
 * Components call `track(...)` and never touch `gtag` directly. If no
 * measurement ID is configured, nothing is loaded and nothing is sent - the
 * site ships with zero third-party scripts by default, which is both a
 * performance and a privacy position.
 *
 * Consent: `hasConsent()` gates every call. The cookie banner writes the
 * decision; until someone opts in, events are dropped rather than queued.
 */

export type AnalyticsEvent =
  | { name: "lead_form_started"; params: { form: "host-lead" | "contact-lead"; path: string } }
  | { name: "lead_form_submitted"; params: { form: "host-lead" | "contact-lead"; path: string } }
  | { name: "contact_submitted"; params: { path: string } }
  | { name: "property_viewed"; params: { property_slug: string; city: string; province: string } }
  | { name: "property_filtered"; params: { filters: string; results: number } }
  | { name: "airbnb_click"; params: { property_slug: string } }
  | { name: "book_direct_click"; params: { property_slug: string } }
  | { name: "property_website_click"; params: { property_slug: string } }
  | { name: "cta_click"; params: { cta: string; path: string } };

const CONSENT_KEY = "viora-cookie-consent";

type Gtag = (command: string, targetOrName: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    // Private browsing or blocked storage - treat as no consent.
    return false;
  }
}

export function setConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  } catch {
    /* storage unavailable; the choice simply is not remembered */
  }
  window.gtag?.("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}

export function consentDecision(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/** Fire a typed analytics event. A no-op when unconfigured or without consent. */
export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  if (!env.gaMeasurementId || !hasConsent()) return;
  window.gtag?.("event", event.name, event.params);
}

/** Page view for client-side route changes. */
export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;
  if (!env.gaMeasurementId || !hasConsent()) return;
  window.gtag?.("event", "page_view", { page_path: path, page_location: window.location.href });
}
