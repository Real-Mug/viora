import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Booking Terms",
  description:
    "The terms that will apply to direct bookings at VioraRental-managed properties, and what applies while direct booking is not yet live.",
  path: "/legal/booking-terms",
});

const sections = [
  { id: "status", title: "Current status" },
  { id: "enquiries", title: "How enquiries work today" },
  { id: "future", title: "Terms for direct booking" },
  { id: "rules", title: "House rules and guest conduct" },
  { id: "damage", title: "Damage and security" },
  { id: "platform", title: "Bookings made on a platform" },
  { id: "contact", title: "Contact" },
];

export default function BookingTermsPage() {
  return (
    <LegalPage
      title="Booking Terms"
      description="What applies when you enquire about or stay at a property we manage."
      path="/legal/booking-terms"
      lastUpdated="2026-09-19"
      sections={sections}
    >
      <h2 id="status">Current status</h2>
      <p>
        Direct booking is not live on this website. No booking can be created here, no dates can be
        held here, and no payment is taken here. This page sets out how enquiries work now, and the
        structure the booking terms will take when direct booking is introduced.
      </p>
      <p>
        We would rather say this plainly than display a booking button that cannot confirm a
        reservation.
      </p>

      <h2 id="enquiries">How enquiries work today</h2>
      <ul>
        <li>
          You send us your dates and group size through a property page or the{" "}
          <Link href="/contact">contact form</Link>.
        </li>
        <li>
          We confirm whether the dates are actually available. No calendar is connected to this site,
          so availability is confirmed by us rather than displayed automatically.
        </li>
        <li>
          We confirm the total price in writing. Estimates shown on property pages are generated from
          published rates and are indicative only.
        </li>
        <li>
          Where a property is listed on a booking platform, we will usually ask you to complete the
          booking there, so that the platform&apos;s payment protection and dispute process apply.
        </li>
      </ul>
      <p>
        An enquiry does not hold dates. Nothing is reserved until we confirm a booking in writing.
      </p>

      <h2 id="future">Terms for direct booking</h2>
      <p>
        <strong>PLACEHOLDER - to be drafted by legal counsel before direct booking launches.</strong>{" "}
        The following sections will be required, and each needs real values rather than
        industry-standard guesses:
      </p>
      <ul>
        <li>When a booking becomes binding, and what confirms it</li>
        <li>Deposit amount, balance due date, and accepted payment methods</li>
        <li>Taxes and fees, itemised, including any municipal accommodation tax</li>
        <li>Minimum age of the lead guest and identification requirements</li>
        <li>Maximum occupancy, and the consequences of exceeding it</li>
        <li>Check-in and check-out times, and terms for late departure</li>
        <li>
          Cancellation and refund terms, which are set out in the{" "}
          <Link href="/legal/cancellation-policy">cancellation policy</Link>
        </li>
        <li>What happens if the property becomes unavailable through no fault of the guest</li>
        <li>Damage deposit or damage waiver terms</li>
        <li>Insurance requirements and recommendations</li>
        <li>Complaints process and dispute resolution</li>
        <li>Consumer protection disclosures required in the relevant province</li>
      </ul>

      <h2 id="rules">House rules and guest conduct</h2>
      <p>
        Each property publishes its own house rules on its property page, and those rules form part
        of the booking. They commonly cover maximum occupancy, quiet hours, smoking, pets, events and
        parties.
      </p>
      <p>
        Rules exist because properties sit in real neighbourhoods and, in many Canadian
        municipalities, because noise and occupancy rules are legally enforced. Serious or repeated
        breaches may end a stay early.
      </p>

      <h2 id="damage">Damage and security</h2>
      <p>
        Guests are responsible for damage beyond fair wear and tear during their stay. Where damage
        occurs we document it, discuss it with the guest, and pursue it through the platform&apos;s
        process where the booking was made on a platform.
      </p>
      <p>
        <strong>PLACEHOLDER:</strong> state the damage deposit or damage waiver approach for direct
        bookings once it is decided.
      </p>

      <h2 id="platform">Bookings made on a platform</h2>
      <p>
        Where you book through Airbnb or another platform, that platform&apos;s terms, payment
        handling and cancellation policy govern the booking. These terms apply alongside them and do
        not replace them. Where the two conflict for a platform booking, the platform&apos;s terms
        take precedence.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about a stay or an enquiry: use our <Link href="/contact">contact page</Link>. If
        you are currently staying at a property we manage, the contact details in your arrival
        information reach us fastest.
      </p>
    </LegalPage>
  );
}
