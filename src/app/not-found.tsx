import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { CTA } from "@/lib/config/site";

/**
 * Custom 404.
 *
 * Kept useful rather than decorative: the most likely reasons someone lands
 * here are a moved property URL or a mistyped path, so the page routes them
 * back to the two things they were probably looking for.
 *
 * On the static export this renders to /404.html, which public/.htaccess sets
 * as the Apache ErrorDocument.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page does not exist. Browse the properties Viora Hosting manages in Kitchener and Waterloo, or get in touch and we will point you the right way.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col justify-center py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-brass-600">Error 404</p>
          <h1 className="mt-5 text-display-lg text-ink">This page does not exist</h1>
          <p className="mt-5 text-lead text-ink-muted">
            The link may be out of date, or a property may no longer be listed. Everything below is
            still where it should be.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg">
              Back to the homepage
            </ButtonLink>
            <ButtonLink href={CTA.secondary.href} variant="secondary" size="lg">
              {CTA.secondary.label}
            </ButtonLink>
          </div>

          <nav aria-label="Helpful links" className="mt-12 border-t border-line pt-8">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              Popular pages
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {[
                { label: "Our services", href: "/services" },
                { label: "Properties we manage", href: "/properties" },
                { label: "How it works", href: "/how-it-works" },
                { label: "List your property", href: "/become-a-host" },
                { label: "Service areas", href: "/locations" },
                { label: "Frequently asked questions", href: "/faq" },
                { label: "Resources and guides", href: "/blog" },
                { label: "Contact us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9375rem] text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </Container>
  );
}
