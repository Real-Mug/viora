import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/marketing/hero";
import { JsonLd } from "@/components/seo/json-ld";
import { IconClock, IconMail, IconPhone, IconShield } from "@/components/ui/icons";
import { Container, Section } from "@/components/ui/section";
import { activeServiceAreas } from "@/content/locations";
import { siteConfig } from "@/lib/config/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/seo/schema";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const metadata: Metadata = pageMetadata({
  title: "Contact VioraRental",
  description:
    "Get in touch with VioraRental about co-hosting, short-term rental management, or staying at a property we manage in Canada.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = siteConfig;
  const areas = activeServiceAreas();

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: "Contact VioraRental",
            description:
              "Contact details and enquiry form for VioraRental short-term rental management in Canada.",
            path: "/contact",
            crumbs,
          }),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="Whether you own a property, are thinking about letting one, or are staying at one we manage - this reaches the same team."
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      />

      <Section tight>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div>
              <h2 className="text-display-sm text-ink">Send us a message</h2>
              <p className="mt-3 max-w-xl text-ink-muted">
                Tell us what you need. If it is about a specific property, mention which one and
                your dates.
              </p>
              <div className="mt-8">
                {/* The form reads enquiry details from the URL on mount, so it is
                    suspended to keep the rest of the page statically rendered. */}
                <Suspense fallback={null}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>

            <aside className="grid content-start gap-6">
              <div className="rounded-[var(--radius-panel)] border border-line bg-surface-raised p-6 shadow-subtle sm:p-7">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-brass-700">
                  Reach us directly
                </h2>
                <ul className="mt-4 grid gap-4">
                  {contact.email ? (
                    <li className="flex gap-3">
                      <IconMail className="mt-0.5 h-5 w-5 shrink-0 text-brass-600" />
                      <div>
                        <p className="text-sm font-medium text-ink">Email</p>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-[0.9375rem] text-evergreen-800 underline-offset-4 hover:underline"
                        >
                          {contact.email}
                        </a>
                      </div>
                    </li>
                  ) : null}

                  {contact.phone ? (
                    <li className="flex gap-3">
                      <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-brass-600" />
                      <div>
                        <p className="text-sm font-medium text-ink">Phone</p>
                        <a
                          href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                          className="text-[0.9375rem] text-evergreen-800 underline-offset-4 hover:underline"
                        >
                          {contact.phoneDisplay || contact.phone}
                        </a>
                      </div>
                    </li>
                  ) : null}

                  {contact.officeHours ? (
                    <li className="flex gap-3">
                      <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-brass-600" />
                      <div>
                        <p className="text-sm font-medium text-ink">Office hours</p>
                        <p className="text-[0.9375rem] text-ink-muted">{contact.officeHours}</p>
                      </div>
                    </li>
                  ) : null}
                </ul>

                <p className="mt-5 border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-ink-subtle">
                  Guests staying at a property we manage: message us through the platform you booked
                  on, or use the contact details in your arrival information - that reaches us
                  fastest.
                </p>
              </div>

              <div className="rounded-[var(--radius-panel)] border border-line bg-linen-200/60 p-6">
                <div className="flex items-center gap-2.5">
                  <IconShield className="h-5 w-5 text-brass-600" />
                  <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                    Privacy
                  </h2>
                </div>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-muted">
                  What you send is used to answer you and nothing else. It is not published, not
                  sold, and not shared with other owners or guests. Read the{" "}
                  <Link
                    href="/legal/privacy-policy"
                    className="text-evergreen-800 underline underline-offset-4"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

              <div className="rounded-[var(--radius-panel)] border border-line bg-surface-raised p-6">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                  Looking for something specific?
                </h2>
                <ul className="mt-4 grid gap-2.5 text-[0.9375rem]">
                  <li>
                    <Link
                      href="/become-a-host"
                      className="text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                    >
                      List a property for management
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/properties"
                      className="text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                    >
                      Browse managed properties
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                    >
                      Frequently asked questions
                    </Link>
                  </li>
                  {areas.length > 0 ? (
                    <li>
                      <Link
                        href="/locations"
                        className="text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                      >
                        Where we operate
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
