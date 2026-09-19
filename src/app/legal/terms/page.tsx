import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/lib/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern use of the VioraRental website, including what this site does and does not do.",
  path: "/legal/terms",
});

const sections = [
  { id: "about", title: "About these terms" },
  { id: "what-this-site-is", title: "What this website is" },
  { id: "use", title: "Acceptable use" },
  { id: "enquiries", title: "Enquiries and assessments" },
  { id: "property-info", title: "Property information" },
  { id: "services", title: "Services and agreements" },
  { id: "external", title: "External websites" },
  { id: "ip", title: "Intellectual property" },
  { id: "liability", title: "Liability" },
  { id: "law", title: "Governing law" },
  { id: "contact", title: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="The terms on which you may use this website."
      path="/legal/terms"
      lastUpdated="2026-09-19"
      sections={sections}
    >
      <h2 id="about">About these terms</h2>
      <p>
        These terms govern your use of the VioraRental website. They do not govern a management
        agreement between {siteConfig.legalName} and a property owner - that is a separate written
        agreement - and they do not govern a stay at a property, which is covered by the{" "}
        <Link href="/legal/booking-terms">booking terms</Link> and the terms of whichever platform a
        booking is made through.
      </p>

      <h2 id="what-this-site-is">What this website is</h2>
      <p>
        This website describes our services, lists properties under management, and allows you to
        send us an enquiry. It is an information and enquiry tool.
      </p>
      <p>Specifically, this website does not currently:</p>
      <ul>
        <li>Confirm availability for any property</li>
        <li>Create, confirm or hold a booking</li>
        <li>Take payment of any kind</li>
      </ul>
      <p>
        Prices shown on property pages are estimates generated from published rates. They are
        indicative only and are confirmed by us in writing before any booking is made.
      </p>

      <h2 id="use">Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the site for any unlawful purpose</li>
        <li>Submit false information through a form, or submit on someone else&apos;s behalf without their permission</li>
        <li>Attempt to gain unauthorised access to any part of the site or its infrastructure</li>
        <li>Scrape, harvest or bulk-copy content, including property listings and photography</li>
        <li>Interfere with the operation of the site or submit automated form traffic</li>
      </ul>

      <h2 id="enquiries">Enquiries and assessments</h2>
      <p>
        Submitting an enquiry does not create a contract or oblige either party to proceed. A
        property assessment is provided at no cost and carries no obligation on either side. We may
        decline to take on a property, and we will say so directly where that is the case.
      </p>

      <h2 id="property-info">Property information</h2>
      <p>
        We take care to describe properties accurately and to keep listings current. Details can
        change, and where a property is also listed on a third-party platform, that platform&apos;s
        listing may differ. Where accuracy matters to your decision, confirm it with us in writing
        before booking.
      </p>
      <p>
        Sample listings, where shown, are clearly labelled as samples and do not represent properties
        under management.
      </p>

      <h2 id="services">Services and agreements</h2>
      <p>
        Nothing on this website is an offer capable of acceptance. Service scope and fees are set out
        in a written agreement specific to each property. Where this website and a signed agreement
        differ, the agreement governs.
      </p>
      <p>
        We do not guarantee occupancy, revenue, booking volume or any particular level of
        performance, and nothing on this site should be read as such a guarantee.
      </p>

      <h2 id="external">External websites</h2>
      <p>
        This site links to third-party websites, including booking platforms and, for some
        properties, a dedicated property website. We do not control those sites and are not
        responsible for their content, terms or privacy practices.
      </p>

      <h2 id="ip">Intellectual property</h2>
      <p>
        The content of this website, including text, layout, design and photography, is owned by{" "}
        {siteConfig.legalName} or used with permission, and may not be reproduced without written
        consent. Property photography may be owned by the property owner and is used under licence.
      </p>

      <h2 id="liability">Liability</h2>
      <p>
        <strong>PLACEHOLDER:</strong> this section must be drafted by legal counsel. A limitation of
        liability that is unenforceable is worse than none, and consumer protection legislation in
        several provinces restricts what can be excluded when dealing with consumers.
      </p>

      <h2 id="law">Governing law</h2>
      <p>
        <strong>PLACEHOLDER:</strong> specify the governing province and the courts having
        jurisdiction, once the registered place of business is confirmed.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about these terms can be sent through our <Link href="/contact">contact page</Link>
        {siteConfig.contact.email ? (
          <>
            {" "}
            or to <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </>
        ) : null}
        .
      </p>
    </LegalPage>
  );
}
