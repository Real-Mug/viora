import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { IconMail, IconPhone } from "@/components/ui/icons";
import { CTA, footerNav, siteConfig } from "@/lib/config/site";
import { serviceAreas } from "@/content/locations";

/**
 * Footer.
 *
 * Doubles as the site's internal-linking hub: every service, resource, legal
 * page and active service area is reachable from here, which is what keeps the
 * deeper pages out of orphan status.
 *
 * Contact details render only when configured - no invented phone number.
 */
export function Footer() {
  const { contact, social } = siteConfig;
  const activeAreas = serviceAreas.filter((area) => area.active);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-linen-200/60">
      {/* Closing conversion band */}
      <div className="border-b border-line">
        <div className="container-page py-12 sm:py-16">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-display-sm text-ink">
                Thinking about handing over the day-to-day?
              </h2>
              <p className="mt-3 text-ink-muted">
                Tell us about your property and we will come back with an honest assessment of what
                we would manage, what we would change, and what it would cost.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href={CTA.primary.href} size="lg">
                {CTA.primary.label}
              </ButtonLink>
              <ButtonLink href={CTA.contact.href} variant="secondary" size="lg">
                {CTA.contact.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Professional short-term rental co-hosting and property management in Canada. We look
              after listings, guests and operations so owners do not have to.
            </p>

            <div className="mt-6 grid gap-2 text-sm">
              {contact.email ? (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline min-h-11 sm:min-h-0"
                >
                  <IconMail className="h-4 w-4 text-brass-600" />
                  {contact.email}
                </a>
              ) : null}
              {contact.phone ? (
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                  className="inline-flex items-center gap-2 text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline min-h-11 sm:min-h-0"
                >
                  <IconPhone className="h-4 w-4 text-brass-600" />
                  {contact.phoneDisplay || contact.phone}
                </a>
              ) : null}
            </div>

            {social.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-3">
                {social.map((profile) => (
                  <li key={profile.href}>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                    >
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                  {group.title}
                </h2>
                <ul className="mt-4 grid gap-0.5 sm:gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex min-h-11 items-center text-sm text-ink-muted underline-offset-4 transition-colors hover:text-evergreen-800 hover:underline sm:min-h-0"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {activeAreas.length > 0 ? (
          <div className="mt-12 border-t border-line pt-8">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              Where we work
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
              {activeAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/locations/${area.slug}`}
                    className="text-sm text-ink-muted underline-offset-4 transition-colors hover:text-evergreen-800 hover:underline"
                  >
                    {area.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 text-sm text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="max-w-xl text-xs leading-relaxed">
            VioraRental provides co-hosting and rental management services. We do not guarantee
            occupancy or revenue, and owners remain responsible for meeting the short-term rental
            rules that apply to their property.
          </p>
        </div>
      </div>
    </footer>
  );
}
