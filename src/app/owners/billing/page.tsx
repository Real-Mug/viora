import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/marketing/hero";
import { ButtonLink } from "@/components/ui/button";
import { Note } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { ownerBilling, siteConfig } from "@/lib/config/site";
import { pageMetadata } from "@/lib/seo/metadata";
import type { Crumb } from "@/lib/seo/schema";

/**
 * /owners/billing/ - where owners we manage for set up and manage the monthly
 * bank debit. Everything sensitive happens on Stripe's own pages; this page
 * explains the arrangement and links out. Noindex: it is for existing owners,
 * not a page anyone should land on from search.
 */
const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Owner billing", path: "/owners/billing" },
];

export const metadata: Metadata = pageMetadata({
  title: "Owner Billing",
  description:
    "How Viora Hosting bills the owners it manages for: monthly statements, automatic bank debit through Stripe, and where to see invoices.",
  path: "/owners/billing",
  noindex: true,
});

const STEPS = [
  {
    title: "Our fee comes through Airbnb",
    body: "Our management fee and the guest cleaning fee are paid to us by Airbnb's co-host payout, after each check-in. You are never invoiced for them.",
  },
  {
    title: "Statement on the 1st",
    body: "Each month we email a statement: every booking, our fee, and any supplies or repairs we paid for, with the receipts.",
  },
  {
    title: "Automatic debit on the 3rd",
    body: "Stripe takes that month's expenses and the HST on our fee from your bank account, and emails you a receipt.",
  },
];

export default function OwnerBillingPage() {
  const { setupUrl, portalUrl } = ownerBilling;

  return (
    <>
      <PageHero
        title="Owner billing"
        description="For owners whose homes we manage. Set up the monthly bank debit once, then see every invoice and receipt in one place."
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
            <div className="max-w-2xl">
              <h2 className="text-display-sm text-ink">How billing works</h2>
              <ol className="mt-6 grid gap-5">
                {STEPS.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-evergreen-900 text-sm font-semibold text-linen-50">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-[1.0625rem] font-medium text-ink">{step.title}</h3>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h2 className="mt-12 text-display-sm text-ink">What can be charged</h2>
              <ul className="mt-4 grid list-disc gap-2 pl-5 text-[0.9375rem] leading-relaxed text-ink-muted">
                <li>Supplies and consumables at cost, with no markup</li>
                <li>Repairs and maintenance at cost. Anything over $150 needs your approval first</li>
                <li>13% HST on our management fee</li>
              </ul>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">
                Nothing else is taken without your agreement. If a charge looks wrong, email us
                before the 3rd and we will hold it.
              </p>
            </div>

            <aside className="grid content-start gap-5">
              <div className="rounded-[var(--radius-panel)] border border-line bg-surface-raised p-6">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                  Your billing
                </h2>
                {setupUrl || portalUrl ? (
                  <div className="mt-4 grid gap-3">
                    {setupUrl ? (
                      <ButtonLink href={setupUrl} external fullWidth>
                        Set up automatic payments
                      </ButtonLink>
                    ) : null}
                    {portalUrl ? (
                      <ButtonLink href={portalUrl} external variant="secondary" fullWidth>
                        View invoices and manage billing
                      </ButtonLink>
                    ) : null}
                    <p className="text-[0.8125rem] leading-relaxed text-ink-subtle">
                      Both open Stripe&apos;s secure pages. Your bank details go to Stripe and are
                      never stored on this site.
                    </p>
                  </div>
                ) : (
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                    When you sign with us, we email you a secure Stripe link to set up the monthly
                    debit. Your bank details go to Stripe, never to this site.
                  </p>
                )}
              </div>

              <Note title="Questions about a statement?">
                Email{" "}
                <span className="font-medium text-ink">{siteConfig.contact.email}</span> and we
                will look into it.
              </Note>

              <p className="text-[0.875rem] text-ink-muted">
                Not working with us yet?{" "}
                <Link href="/become-a-host" className="text-evergreen-800 underline underline-offset-4">
                  Tell us about your property
                </Link>
                .
              </p>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
