"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { env } from "@/lib/config/env";
import { hasConsent, trackPageView } from "@/lib/analytics";

/**
 * Google Analytics 4 loader.
 *
 * Two deliberate choices:
 *   1. If NEXT_PUBLIC_GA_MEASUREMENT_ID is unset, this component renders
 *      nothing. The site then ships with no third-party scripts at all, which
 *      is the default state.
 *   2. Consent Mode is initialised with analytics storage denied, and the tag
 *      is only loaded once consent has been granted. No cookies are set and no
 *      hits are sent before someone opts in.
 *
 * Page views for client-side navigations are sent manually because GA's
 * automatic page view only fires on the initial document load in an SPA.
 */
export function Analytics() {
  const pathname = usePathname();
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasConsent());
    const onChange = () => setConsented(hasConsent());
    window.addEventListener("viora:consent-change", onChange);
    return () => window.removeEventListener("viora:consent-change", onChange);
  }, []);

  useEffect(() => {
    if (consented) trackPageView(pathname);
  }, [pathname, consented]);

  if (!env.gaMeasurementId || !consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${env.gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          gtag('js', new Date());
          gtag('config', '${env.gaMeasurementId}', { anonymize_ip: true, send_page_view: true });
        `}
      </Script>
    </>
  );
}
