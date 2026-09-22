import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "What cookies and similar technologies the Viora Hosting website uses, and how to control them.",
  path: "/legal/cookie-policy",
});

const sections = [
  { id: "summary", title: "The short version" },
  { id: "what", title: "What cookies are" },
  { id: "what-we-use", title: "What this site uses" },
  { id: "control", title: "How to change your choice" },
  { id: "browser", title: "Browser controls" },
  { id: "changes", title: "Changes" },
  { id: "contact", title: "Contact" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="What this website stores in your browser, and what it does not."
      path="/legal/cookie-policy"
      lastUpdated="2026-09-19"
      sections={sections}
    >
      <h2 id="summary">The short version</h2>
      <p>
        This site sets no advertising cookies and no third-party tracking cookies. Analytics load
        only if you accept them. If you decline, or if you simply ignore the banner, no analytics
        script is loaded at all - it is not loaded-but-silenced, it is not loaded.
      </p>

      <h2 id="what">What cookies are</h2>
      <p>
        Cookies are small files a website asks your browser to store. Related technologies -
        localStorage and sessionStorage - do a similar job. They can be used to remember a
        preference, keep you signed in, or measure how a site is used.
      </p>

      <h2 id="what-we-use">What this site uses</h2>
      <h3>Strictly necessary storage</h3>
      <ul>
        <li>
          <strong>Your cookie choice.</strong> When you accept or decline analytics, that decision is
          stored in your browser&apos;s localStorage so you are not asked again on every page. It
          contains only the word &quot;granted&quot; or &quot;denied&quot;, stays on your device, and
          is never sent to us.
        </li>
      </ul>
      <h3>Analytics, only with consent</h3>
      <ul>
        <li>
          <strong>Google Analytics 4.</strong> If configured and accepted, this sets cookies used to
          measure page views, which pages are read, and which calls to action are used. It is
          configured with IP anonymisation and with advertising and personalisation storage denied.
        </li>
      </ul>
      <p>
        If no analytics measurement ID is configured for this site, no consent banner appears and no
        analytics cookies exist, because there is nothing to consent to.
      </p>
      <h3>What this site does not use</h3>
      <ul>
        <li>Advertising or retargeting cookies</li>
        <li>Social media tracking pixels</li>
        <li>Cross-site tracking of any kind</li>
        <li>Fingerprinting</li>
      </ul>
      <p>
        Fonts are self-hosted rather than loaded from a font provider, so visiting this site does not
        make a request to a third-party font service.
      </p>

      <h2 id="control">How to change your choice</h2>
      <p>
        Clear this site&apos;s data in your browser and the banner will appear again on your next
        visit, letting you choose differently. You can also{" "}
        <Link href="/contact">contact us</Link> and we will confirm exactly what is in use.
      </p>

      <h2 id="browser">Browser controls</h2>
      <p>
        Every major browser lets you block or delete cookies and site storage. Blocking storage
        entirely is fine here: the site is built to work without it, and the only consequence is that
        your cookie choice is not remembered between visits.
      </p>

      <h2 id="changes">Changes</h2>
      <p>
        If we add a tool that sets cookies, this page is updated before it goes live. How personal
        information is handled more generally is covered in the{" "}
        <Link href="/legal/privacy-policy">privacy policy</Link>.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about cookies or site storage can be sent through our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
