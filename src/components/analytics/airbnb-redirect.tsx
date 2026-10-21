"use client";

import { useEffect } from "react";

const INSIGHTS_SCRIPT = 'script[src*="/_vercel/insights/script.js"]';

/**
 * Sends the visitor on to Airbnb once the page view has been recorded.
 *
 * Redirecting straight away would leave before the Vercel Analytics script has
 * run, and the click would never be counted. That script is injected by the
 * layout after this effect runs, so this watches for it, waits for it to load
 * (or fail - it is absent off Vercel) plus a short beat for the beacon, and
 * never holds the visitor longer than 1.5s whatever happens.
 */
export function AirbnbRedirect({ to }: { to: string }) {
  useEffect(() => {
    const timers: number[] = [];
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.location.replace(to);
    };
    const soon = () => timers.push(window.setTimeout(go, 300));

    timers.push(window.setTimeout(go, 1500));
    const watch = window.setInterval(() => {
      const script = document.querySelector<HTMLScriptElement>(INSIGHTS_SCRIPT);
      if (!script) return;
      window.clearInterval(watch);
      script.addEventListener("load", soon, { once: true });
      script.addEventListener("error", go, { once: true });
    }, 50);

    return () => {
      window.clearInterval(watch);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [to]);

  return null;
}
