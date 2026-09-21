import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Cancellation Policy",
  description:
    "How cancellations are handled for stays at Viora Hosting properties, and what applies to platform bookings.",
  path: "/legal/cancellation-policy",
});

const sections = [
  { id: "status", title: "Current status" },
  { id: "platform", title: "Platform bookings" },
  { id: "direct", title: "Direct bookings" },
  { id: "we-cancel", title: "If we have to cancel" },
  { id: "changes", title: "Changing a booking" },
  { id: "owners", title: "For property owners" },
  { id: "contact", title: "Contact" },
];

export default function CancellationPolicyPage() {
  return (
    <LegalPage
      title="Cancellation Policy"
      description="What happens when a booking needs to change or be cancelled."
      path="/legal/cancellation-policy"
      lastUpdated="2026-09-19"
      sections={sections}
    >
      <h2 id="status">Current status</h2>
      <p>
        Direct booking is not yet live on this website, so every current booking at a property we
        manage is made through a booking platform. That means the platform&apos;s cancellation policy
        applies, not this one.
      </p>
      <p>
        This page sets out how cancellations work today and the structure a direct-booking policy
        will take when it is introduced.
      </p>

      <h2 id="platform">Platform bookings</h2>
      <p>
        If you booked through Airbnb or another platform, cancel through that platform. The
        cancellation policy shown on the listing at the time you booked is the one that applies, and
        the refund is calculated and issued by the platform.
      </p>
      <p>
        We cannot override a platform&apos;s cancellation terms. Where there are genuine exceptional
        circumstances, tell us - we will support a request to the platform where it is reasonable,
        but the decision is theirs.
      </p>

      <h2 id="direct">Direct bookings</h2>
      <p>
        <strong>PLACEHOLDER - to be drafted by legal counsel before direct booking launches.</strong>{" "}
        The policy will need to state, per property or per tier:
      </p>
      <ul>
        <li>The free-cancellation window after booking, if any</li>
        <li>Refund percentages at each point before check-in</li>
        <li>Whether the cleaning fee and taxes are refunded</li>
        <li>Whether any part of the deposit is non-refundable, stated clearly before payment</li>
        <li>How peak and holiday periods differ, if they do</li>
        <li>How refunds are issued and the timescale</li>
        <li>Terms for a no-show or an early departure</li>
        <li>
          Consumer protection requirements in the relevant province, which in some cases constrain
          what can be made non-refundable
        </li>
      </ul>
      <p>
        Whatever is decided, it will be shown on the property page and in the booking confirmation
        before any payment is taken - not buried on this page alone.
      </p>

      <h2 id="we-cancel">If we have to cancel</h2>
      <p>
        We cancel a confirmed booking only where the property genuinely cannot be used - a serious
        maintenance failure, damage from a previous stay, or a safety issue. It is rare and we treat
        it as a failure on our side.
      </p>
      <p>In that situation we will:</p>
      <ul>
        <li>Tell you as soon as we know, not at the last possible moment</li>
        <li>Offer a comparable alternative property where we have one</li>
        <li>Refund in full where we cannot</li>
      </ul>

      <h2 id="changes">Changing a booking</h2>
      <p>
        Date changes are handled case by case and depend on availability and how far ahead you ask.
        Ask early - a change requested months out is usually straightforward, and one requested the
        week before usually is not.
      </p>

      <h2 id="owners">For property owners</h2>
      <p>
        Cancellation of a management agreement is governed by that written agreement, not by this
        page. Notice periods and what happens to bookings already confirmed at the time of
        cancellation are set out there, and we agree them with you before anything starts.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Need to cancel or change something? Use our <Link href="/contact">contact page</Link>, or
        reply to your booking confirmation. Related documents:{" "}
        <Link href="/legal/booking-terms">booking terms</Link> and{" "}
        <Link href="/legal/terms">terms of service</Link>.
      </p>
    </LegalPage>
  );
}
