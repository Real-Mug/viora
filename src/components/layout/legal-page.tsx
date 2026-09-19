import Link from "next/link";
import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/marketing/hero";
import { Note } from "@/components/ui/card";
import { IconInfo } from "@/components/ui/icons";
import { Container, Section } from "@/components/ui/section";
import type { Crumb } from "@/lib/seo/schema";

/**
 * Shared shell for the legal pages.
 *
 * Every one of these documents is a STRUCTURED DRAFT, not legal advice. They
 * exist so the site has the right pages, the right sections and honest
 * placeholders, and so nothing links to a dead URL. Each carries a visible
 * notice saying it has not been reviewed by counsel, and that notice should be
 * removed only when a qualified Canadian lawyer has reviewed the final text.
 */
export function LegalPage({
  title,
  description,
  path,
  lastUpdated,
  children,
  sections,
}: {
  title: string;
  description: string;
  path: string;
  lastUpdated: string;
  children: ReactNode;
  sections?: { id: string; title: string }[];
}) {
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Legal", path: "/legal/privacy-policy" },
    { name: title, path },
  ];

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        description={description}
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            <div className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:self-start">
              <p className="text-sm text-ink-subtle">
                Last updated{" "}
                <time dateTime={lastUpdated}>
                  {new Intl.DateTimeFormat("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(lastUpdated))}
                </time>
              </p>

              {sections?.length ? (
                <nav aria-label="On this page" className="mt-6">
                  <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                    On this page
                  </h2>
                  <ul className="mt-3 grid gap-2">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="text-sm text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}

              <nav aria-label="Legal documents" className="mt-8 border-t border-line pt-6">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                  All legal documents
                </h2>
                <ul className="mt-3 grid gap-2">
                  {[
                    { label: "Privacy Policy", href: "/legal/privacy-policy" },
                    { label: "Terms of Service", href: "/legal/terms" },
                    { label: "Cookie Policy", href: "/legal/cookie-policy" },
                    { label: "Booking Terms", href: "/legal/booking-terms" },
                    { label: "Cancellation Policy", href: "/legal/cancellation-policy" },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div>
              <Note
                icon={<IconInfo className="h-4 w-4 text-brass-600" />}
                title="Draft pending legal review"
                tone="brass"
                className="mb-10"
              >
                This document is a structured draft prepared alongside the website. It has not been
                reviewed by a qualified lawyer and does not constitute legal advice. It must be
                reviewed and completed by Canadian legal counsel - including the provincial privacy
                regimes and consumer protection rules that apply to this business - before the site
                goes live. Placeholders marked in the text need real values.
              </Note>

              <div className="prose-viora">{children}</div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
