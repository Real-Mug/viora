"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { env } from "@/lib/config/env";
import { consentDecision, setConsent } from "@/lib/analytics";

/**
 * Cookie consent.
 *
 * Shown only when analytics is actually configured - a site with no tracking
 * has nothing to ask permission for, and a consent banner that gates nothing
 * is just noise.
 *
 * It is a low-key bar rather than a modal: it does not block the page, does not
 * trap focus and does not interrupt someone reading. Declining is as easy as
 * accepting, which is what Canadian privacy expectations and PIPEDA's
 * meaningful-consent guidance point toward.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!env.gaMeasurementId) return;
    if (consentDecision() === null) setVisible(true);
  }, []);

  if (!env.gaMeasurementId || !visible) return null;

  function decide(granted: boolean) {
    setConsent(granted);
    window.dispatchEvent(new Event("viora:consent-change"));
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface-raised/97 backdrop-blur-md"
    >
      <div className="container-page flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
          We use analytics cookies to understand how this site is used, so we can improve it.
          Nothing is set until you choose. Read our{" "}
          <Link href="/legal/cookie-policy" className="text-evergreen-800 underline underline-offset-4">
            cookie policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="secondary" size="sm" onClick={() => decide(false)}>
            Decline
          </Button>
          <Button size="sm" onClick={() => decide(true)}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
