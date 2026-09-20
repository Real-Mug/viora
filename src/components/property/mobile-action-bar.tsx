"use client";

import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { IconStar } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import type { Property } from "@/lib/types/property";

/**
 * Sticky action bar for a property page on phones.
 *
 * On a laptop the stay panel sits in a sticky sidebar, so the two actions are
 * always on screen. On a phone that panel is the last thing on a very long
 * page, which means the main call to action is several thousand pixels below
 * the fold. This bar restores parity: the same two actions, always reachable.
 *
 * It appears only once the reader has scrolled past the gallery - showing it
 * immediately would cover content before anyone has decided they are
 * interested - and hides again over the real panel at the bottom of the page,
 * so the two are never on screen competing with each other.
 */
export function MobileActionBar({ property }: { property: Property }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const panel = document.getElementById("stay-panel");
      const scrolled = window.scrollY > 520;
      // Hide once the real panel is itself on screen.
      const panelInView = panel
        ? panel.getBoundingClientRect().top < window.innerHeight - 80
        : false;
      setVisible(scrolled && !panelInView);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const rating = property.externalRating;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur-md lg:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3",
        "transition-transform duration-300 [transition-timing-function:var(--ease-out-quint)]",
        visible ? "translate-y-0" : "translate-y-[130%]",
      )}
      // Keep it out of the tab order and off screen readers while it is down,
      // otherwise there are two identical sets of buttons on the page.
      aria-hidden={!visible}
      {...(!visible ? { inert: "" as unknown as boolean } : {})}
    >
      <div className="container-page flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.8125rem] font-medium text-ink">{property.name}</p>
          {rating ? (
            <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-subtle">
              <IconStar className="h-3.5 w-3.5 text-brass-500" />
              <span className="font-medium text-ink">{rating.ratingValue.toFixed(2)}</span>
              <span>· {rating.reviewCount} reviews</span>
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-ink-subtle">Rates on request</p>
          )}
        </div>

        {property.airbnbUrl ? (
          <ButtonLink
            href={property.airbnbUrl}
            variant="secondary"
            external
            className="h-11 shrink-0 px-4 text-sm"
            onClick={() => track({ name: "airbnb_click", params: { property_slug: property.slug } })}
          >
            Airbnb
          </ButtonLink>
        ) : null}

        <ButtonLink
          href={`/contact/?property=${encodeURIComponent(property.slug)}`}
          className="h-11 shrink-0 px-4 text-sm"
          onClick={() =>
            track({ name: "book_direct_click", params: { property_slug: property.slug } })
          }
        >
          Enquire
        </ButtonLink>
      </div>
    </div>
  );
}
