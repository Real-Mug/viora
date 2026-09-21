import type { FaqItem } from "@/components/ui/accordion";

/**
 * Site-wide FAQ content.
 *
 * Grouped so the /faq page can render sections and the homepage can pull a
 * short subset. Answers are written to be genuinely useful, including where the
 * honest answer is "not yet" or "it depends".
 */

export type FaqGroup = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      {
        question: "What is Airbnb co-hosting?",
        answer:
          "Someone else runs the day-to-day while you stay the owner and host of record. The listing stays in your account and you keep the final say on pricing and house rules. We take the work: guest messaging, check-ins, cleaning schedules and maintenance.",
      },
      {
        question: "How do I get started with Viora Hosting?",
        answer:
          "Submit your property details through the Become a Host form. We review the property, the market and the local rules, then come back to you with an assessment: what we would manage, what we would change, what it would cost, and whether we think short-term letting is the right use for the property at all. There is no obligation at that stage.",
      },
      {
        question: "Do I need to have an Airbnb listing already?",
        answer:
          "No. We work with owners who already have an active listing and with owners starting from an empty property. If you are starting from scratch we will tell you honestly what the property needs before it is ready to let, which sometimes includes work we do not do ourselves.",
      },
      {
        question: "Can you manage my existing Airbnb property?",
        answer:
          "Yes, and that is how most owners come to us. We take over an established listing without resetting its reviews or ranking, and agree any changes with you first.",
      },
      {
        question: "Which Canadian locations do you serve?",
        answer:
          "They are listed on the Service Areas page. A market only works if we have reliable cleaning and maintenance capacity there, so we would rather say no than run a property badly. Outside the list? Ask anyway.",
      },
    ],
  },
  {
    id: "services",
    title: "What we manage",
    items: [
      {
        question: "What exactly does Viora Hosting manage?",
        answer:
          "Depending on the arrangement: guest communication across the whole stay, check-in and check-out coordination, cleaning and turnover scheduling, maintenance coordination, listing creation and upkeep, pricing and calendar strategy, and owner reporting. You can take all of it or just the parts you want to hand over.",
      },
      {
        question: "Do you manage guest communication?",
        answer:
          "Yes. This is the service most owners want first. We handle pre-booking questions, arrival information, in-stay issues, checkout and review management, with response standards agreed with you in writing.",
      },
      {
        question: "Do you coordinate cleaning?",
        answer:
          "Yes. We schedule turnovers against the live calendar, work with vetted local cleaning teams, and check that the standard was actually met. If you already have a cleaner you trust, we will coordinate with them rather than replace them.",
      },
      {
        question: "Can you help optimize my listing?",
        answer:
          "Yes, either as part of a management arrangement or as a standalone piece of work. That covers the title, photo order, description, amenities, house rules and settings, with the reasoning behind each recommendation.",
      },
      {
        question: "Do you handle maintenance and repairs?",
        answer:
          "We coordinate them. Small, time-critical repairs go ahead within a spending limit you set in advance so a guest is not left waiting. Anything larger comes to you with options and quotes before we commit. The costs remain yours as the property owner.",
      },
    ],
  },
  {
    id: "money-and-terms",
    title: "Fees, control and terms",
    items: [
      {
        question: "How much does it cost?",
        answer:
          "It depends on the property, the location and how much you hand over, so we quote after the assessment. Fee and scope in writing before anything starts.",
      },
      {
        question: "Do you guarantee a certain income or occupancy?",
        answer:
          "No. Performance depends on demand, seasonality, competition, the property and the pricing, and no management company controls those. Anyone promising guaranteed revenue is hiding the conditions.",
      },
      {
        question: "Do I lose control of my property?",
        answer:
          "No. You remain the owner, you keep the ability to block dates for your own use, and you set the spending thresholds we work within. Under co-hosting you also remain the host of record with the listing in your own account.",
      },
      {
        question: "Who is responsible for licensing and taxes?",
        answer:
          "The legal obligations sit with you as the property owner. We will flag what we understand the requirements to be in your market and help keep your listing consistent with them, but we are not lawyers or accountants and the responsibility for compliance remains yours.",
      },
    ],
  },
  {
    id: "properties-and-booking",
    title: "Properties and booking",
    items: [
      {
        question: "Can my property have its own website?",
        answer:
          "Yes. A property can live purely on Viora Hosting at viorahosting.com/properties/your-property, or it can have its own standalone website with its own domain. Where a property has its own site, the two link to each other: the Viora Hosting page links out to the property website, and the property website links back to us as the managing company. Both are supported, and you can start with one and add the other later.",
      },
      {
        question: "Can guests book directly?",
        answer:
          "Not yet. We will not put a booking button on a page that cannot confirm a reservation. Send an enquiry and we confirm availability with you.",
      },
      {
        question: "Is the availability shown on property pages live?",
        answer:
          "No, and we say so on the pages themselves. No calendar is connected yet, so availability is confirmed by us directly rather than displayed automatically. Showing a calendar that was not synced would be worse than showing none.",
      },
      {
        question: "Are the properties shown on the site all managed by Viora Hosting?",
        answer:
          "The Properties section is currently populated with clearly labelled sample listings so the site can be reviewed before real inventory is published. Every sample carries a visible label. Once real managed properties are added, the samples are removed entirely.",
      },
    ],
  },
  {
    id: "guests",
    title: "For guests",
    items: [
      {
        question: "Who do I contact during my stay?",
        answer:
          "Message us through the platform you booked on, or use the contact details in your arrival information. Guest support is handled by Viora Hosting, not by the property owner, so you are dealing with the same team throughout your stay.",
      },
      {
        question: "What happens if something is wrong when I arrive?",
        answer:
          "Tell us straight away rather than waiting until checkout. Most arrival problems can be resolved the same day if we know about them, and we would far rather fix something than read about it in a review.",
      },
      {
        question: "How do I know a property is genuinely managed?",
        answer:
          "Properties we manage carry our details in their arrival information, and a property with its own website links back to Viora Hosting as the managing company. If you are unsure whether a listing is one of ours, contact us and we will confirm.",
      },
    ],
  },
];

/** Flattens every group into one list, for FAQPage structured data. */
export function allFaqs(): FaqItem[] {
  return faqGroups.flatMap((group) => group.items);
}

/** A short, high-intent subset for the homepage. */
export function homepageFaqs(): FaqItem[] {
  const wanted = [
    "What is Airbnb co-hosting?",
    "Can you manage my existing Airbnb property?",
    "Do you guarantee a certain income or occupancy?",
    "How much does it cost?",
    "Which Canadian locations do you serve?",
    "Can guests book directly?",
  ];
  const all = allFaqs();
  return wanted
    .map((question) => all.find((faq) => faq.question === question))
    .filter((faq): faq is FaqItem => faq !== undefined);
}
