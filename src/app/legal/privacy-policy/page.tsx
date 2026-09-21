import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/lib/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Viora Hosting collects, uses, stores and protects personal information from property owners, guests and website visitors in Canada.",
  path: "/legal/privacy-policy",
});

const LAST_UPDATED = "2026-09-19";

const sections = [
  { id: "who-we-are", title: "Who we are" },
  { id: "what-we-collect", title: "What we collect" },
  { id: "why", title: "Why we collect it" },
  { id: "consent", title: "Consent" },
  { id: "sharing", title: "Who we share it with" },
  { id: "retention", title: "How long we keep it" },
  { id: "security", title: "How we protect it" },
  { id: "your-rights", title: "Your rights" },
  { id: "cookies", title: "Cookies and analytics" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Changes" },
  { id: "contact", title: "Contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How we handle personal information from owners, guests and visitors to this website."
      path="/legal/privacy-policy"
      lastUpdated={LAST_UPDATED}
      sections={sections}
    >
      <h2 id="who-we-are">Who we are</h2>
      <p>
        Viora Hosting provides short-term rental co-hosting and property management services in
        Canada. In this policy, &quot;we&quot; and &quot;us&quot; mean {siteConfig.legalName}.
      </p>
      <p>
        <strong>PLACEHOLDER:</strong> insert the registered legal entity name, business number and
        registered address, and name the individual accountable for personal information under
        PIPEDA and any applicable provincial privacy legislation.
      </p>

      <h2 id="what-we-collect">What we collect</h2>
      <p>We collect only what we need for a specific purpose.</p>
      <h3>From property owners</h3>
      <ul>
        <li>Name, email address and, if you provide one, phone number</li>
        <li>Property address, city and province</li>
        <li>Property details: type, bedrooms, bathrooms, guest capacity</li>
        <li>Existing listing URLs and current booking platforms</li>
        <li>Anything you choose to write in the message field</li>
        <li>Your preferred contact method</li>
      </ul>
      <h3>From guests</h3>
      <ul>
        <li>Enquiry details you send us through this website</li>
        <li>
          Information passed to us by a booking platform for a stay at a property we manage, which is
          governed by that platform&apos;s own privacy terms as well as this one
        </li>
      </ul>
      <h3>From everyone who visits the site</h3>
      <ul>
        <li>
          Standard server log information kept by our hosting provider, which may include IP address,
          browser type and pages requested
        </li>
        <li>
          Analytics data, but only if you have agreed to analytics cookies. See{" "}
          <Link href="/legal/cookie-policy">the cookie policy</Link>.
        </li>
      </ul>
      <p>
        We do not collect payment card details through this website. No payment is processed here.
      </p>

      <h2 id="why">Why we collect it</h2>
      <ul>
        <li>To assess a property and respond to an enquiry</li>
        <li>To provide the management services agreed with an owner</li>
        <li>To coordinate stays, arrivals and support for guests</li>
        <li>To meet legal, tax and regulatory obligations</li>
        <li>To understand how this website is used, so we can improve it</li>
      </ul>
      <p>
        We do not sell personal information. We do not share owner or guest details with other
        owners or guests, and nothing submitted through a form on this site is published anywhere on
        it.
      </p>

      <h2 id="consent">Consent</h2>
      <p>
        When you submit a form you are asked to confirm that we may contact you about your enquiry.
        You can withdraw that consent at any time by contacting us, subject to any information we are
        legally required to keep.
      </p>

      <h2 id="sharing">Who we share it with</h2>
      <p>We share personal information only where it is necessary, and only with:</p>
      <ul>
        <li>
          Service providers who act on our behalf - for example cleaning and maintenance contractors
          who need access details, or the provider that delivers form submissions to our inbox
        </li>
        <li>Booking platforms, where a stay is arranged through one</li>
        <li>Professional advisers, where required</li>
        <li>Authorities, where we are legally required to disclose</li>
      </ul>
      <p>
        <strong>PLACEHOLDER:</strong> list the actual processors used - form handler, email provider,
        hosting provider, analytics, any CRM - and state where each stores data. Where a processor
        stores data outside Canada, say so and explain the safeguards, because Canadian privacy law
        expects that transparency.
      </p>

      <h2 id="retention">How long we keep it</h2>
      <p>
        We keep enquiry information for as long as needed to respond and for a reasonable period
        afterwards, then delete it. Information relating to an active management agreement is kept
        for the life of the agreement and for the period afterwards required by tax and business
        record obligations.
      </p>
      <p>
        <strong>PLACEHOLDER:</strong> state the actual retention periods, for example
        &quot;unsuccessful enquiries: 12 months; management records: 7 years&quot;.
      </p>

      <h2 id="security">How we protect it</h2>
      <p>
        We use appropriate safeguards for the sensitivity of the information: access is limited to
        the people who need it, the website is served over HTTPS, and form submissions are
        transmitted over encrypted connections. No system is completely secure, and we do not claim
        otherwise, but we will notify affected individuals and the relevant authorities where a
        breach creates a real risk of significant harm.
      </p>

      <h2 id="your-rights">Your rights</h2>
      <p>Under Canadian privacy law you can:</p>
      <ul>
        <li>Ask what personal information we hold about you</li>
        <li>Ask us to correct anything inaccurate</li>
        <li>Withdraw consent, subject to legal and contractual limits</li>
        <li>Ask us to delete information we no longer need</li>
        <li>Complain to us, and then to the Office of the Privacy Commissioner of Canada</li>
      </ul>
      <p>
        <strong>PLACEHOLDER:</strong> confirm whether provincial legislation applies to this business
        - Quebec&apos;s Law 25, or the private-sector acts in British Columbia and Alberta - and add
        the additional rights and timelines those regimes require.
      </p>

      <h2 id="cookies">Cookies and analytics</h2>
      <p>
        This site sets no analytics or advertising cookies unless you agree to them. See{" "}
        <Link href="/legal/cookie-policy">the cookie policy</Link> for what is used and how to change
        your mind.
      </p>

      <h2 id="children">Children</h2>
      <p>
        This website is intended for adults. We do not knowingly collect personal information from
        children. If you believe a child has provided us with information, contact us and we will
        delete it.
      </p>

      <h2 id="changes">Changes</h2>
      <p>
        If this policy changes we will update the date at the top of this page. Material changes will
        be highlighted.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about this policy, or a request about your information, can be sent to{" "}
        {siteConfig.contact.email ? (
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
        ) : (
          <strong>PLACEHOLDER: privacy contact email</strong>
        )}
        , or through our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
