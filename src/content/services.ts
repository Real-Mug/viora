import type { Service } from "@/lib/types/service";

/**
 * SERVICES
 * ----------------------------------------------------------------------------
 * Only list a service here if VioraRental actually delivers it. Adding one is
 * a matter of appending a record: the services index, the nav dropdown, the
 * homepage grid, the sitemap and the internal links all read from this array.
 *
 * Copy rules applied throughout: describe what is done, who it suits and what
 * the owner still owns. No revenue or occupancy promises, no superlatives.
 */
export const services: Service[] = [
  {
    slug: "airbnb-co-hosting",
    name: "Airbnb Co-Hosting",
    heading: "Airbnb co-hosting for Canadian property owners",
    summary:
      "We handle the operational side of your short-term rental while you keep ownership, pricing authority and the listing itself.",
    icon: "co-hosting",
    featured: true,
    intro: [
      "Co-hosting is the middle ground between doing everything yourself and handing your property to a full-service manager on a long contract. Your listing stays in your name. Your calendar, your rates and your house rules stay under your control. What changes is who answers the 11pm message about the lockbox, who reschedules the cleaner when a guest leaves late, and who notices that your listing has slipped down the search results.",
      "For most owners the decision is not really about money. It is about the fact that a short-term rental generates a steady stream of small, time-sensitive decisions, and those decisions do not pause for your job, your holiday or your time zone.",
      "We take on as much or as little of that operational load as you want. Some owners hand over guest communication only. Others move everything except the final say on pricing.",
    ],
    includes: [
      {
        title: "Guest messaging across the whole stay",
        description:
          "Pre-booking questions, arrival instructions, in-stay issues and post-checkout follow-up, handled in a consistent voice with response times that protect your listing metrics.",
      },
      {
        title: "Check-in and check-out coordination",
        description:
          "Arrival logistics, access instructions, late checkout requests and the handover between guests and cleaners.",
      },
      {
        title: "Cleaning and turnover scheduling",
        description:
          "We book your cleaners around the calendar, confirm each turnover and chase the gaps when a booking changes at short notice.",
      },
      {
        title: "Listing upkeep",
        description:
          "Keeping descriptions, photos, amenities and house rules accurate as the property changes, rather than letting a listing drift a year out of date.",
      },
      {
        title: "Issue triage",
        description:
          "A first response to maintenance problems, guest complaints and platform disputes, with a clear escalation point back to you when a decision is yours to make.",
      },
      {
        title: "Owner reporting",
        description:
          "A regular written summary of what happened at the property, what it cost and what we think is worth changing.",
      },
    ],
    bestFor: [
      "Owners with an existing Airbnb listing who are tired of being on call",
      "Hosts who travel, work irregular hours or live in a different time zone from their property",
      "Owners who want help with operations but are not ready to give up control of the listing",
      "Anyone managing one or two properties alongside a full-time job",
    ],
    faqs: [
      {
        question: "Do I keep control of my Airbnb listing?",
        answer:
          "Yes. In a co-hosting arrangement the listing stays in your account and you remain the host of record. We are added as a co-host with the permissions we need to do the work you have asked us to do, and those permissions can be changed or removed by you at any time.",
      },
      {
        question: "Who sets the nightly rate?",
        answer:
          "That is your call. We will bring you pricing recommendations with the reasoning behind them, and if you would rather we managed rates day to day we can do that within limits you set. Either way, nothing changes without your agreement on the approach.",
      },
      {
        question: "What happens if something breaks during a stay?",
        answer:
          "We respond to the guest first so they are not left waiting, then assess whether it is something a trade can resolve quickly. Small, time-critical fixes go ahead within a spending limit you set in advance. Anything larger comes to you with options before we commit.",
      },
      {
        question: "Can you co-host a property that is not on Airbnb?",
        answer:
          "Yes. The same operational work applies whether your bookings come from Airbnb, Vrbo, another platform or directly. Airbnb is simply where most Canadian owners start.",
      },
    ],
    relatedServices: ["short-term-rental-management", "guest-communication", "listing-optimization"],
    seoTitle: "Airbnb Co-Hosting Services in Canada",
    seoDescription:
      "Airbnb co-hosting for Canadian property owners. We manage guest communication, turnovers and daily operations while you keep control of your listing.",
  },

  {
    slug: "short-term-rental-management",
    name: "Short-Term Rental Management",
    heading: "Full short-term rental management",
    summary:
      "End-to-end management of your rental: listing, guests, pricing, cleaning, maintenance and reporting, with one point of contact.",
    icon: "management",
    featured: true,
    intro: [
      "Full management suits owners who want the property to run without their involvement. We take responsibility for the whole operation and report back to you, rather than handing you a list of decisions to make each week.",
      "In practice that means we own the calendar, the guest relationship, the supplier relationships and the standard the property is kept to. You retain the property, the final say on major spending, and the ability to block dates for your own use.",
      "We are deliberate about which properties we take on. A property that is poorly located for short-term letting, or where the local rules make it impractical, is not a property we will pretend to be able to fix.",
    ],
    includes: [
      {
        title: "Listing creation and ongoing management",
        description:
          "Building or rebuilding the listing, writing the copy, structuring the amenities and keeping it current across whichever platforms you use.",
      },
      {
        title: "Calendar and booking management",
        description:
          "Availability, minimum stays, gap nights and booking decisions, managed against how the property actually performs.",
      },
      {
        title: "Full guest lifecycle",
        description:
          "Enquiry through to post-stay follow-up, including screening, arrival coordination and review responses.",
      },
      {
        title: "Cleaning, laundry and turnover management",
        description:
          "Scheduling, quality checks and restocking of consumables, with a standard the property is returned to between every stay.",
      },
      {
        title: "Maintenance coordination",
        description:
          "Routine upkeep and reactive repairs through vetted trades, with approval thresholds agreed with you in advance.",
      },
      {
        title: "Performance reporting",
        description:
          "Occupancy, rate achieved, guest feedback and costs, written up so you can see what the property is actually doing.",
      },
    ],
    bestFor: [
      "Owners who want a genuinely hands-off arrangement",
      "Investors holding a property purely as a short-term rental",
      "Owners who live far from the property and have no local support",
      "Second-home owners who use the property occasionally and let it the rest of the year",
    ],
    faqs: [
      {
        question: "What is the difference between co-hosting and full management?",
        answer:
          "Co-hosting is a support arrangement: you remain the host and we take over the parts of the work you choose. Full management is a delegation: we run the operation end to end and report to you. Most owners start with co-hosting and move across if they want less involvement.",
      },
      {
        question: "Can I still use the property myself?",
        answer:
          "Yes. Owner stays are blocked in the calendar like any other booking. We just ask for reasonable notice so we are not blocking dates that are already being enquired about, and so cleaning can be scheduled around you.",
      },
      {
        question: "Do you take on every property?",
        answer:
          "No. Some properties are not suited to short-term letting because of location, building rules, municipal licensing or the condition of the unit. If we do not think we can run your property well, we will say so at the assessment stage rather than take it on.",
      },
      {
        question: "How are your fees structured?",
        answer:
          "Fees depend on the property, the location and how much of the operation you want us to take on. We quote after the property assessment, in writing, with the scope attached. We do not publish a single headline percentage because it would not be accurate for every property.",
      },
    ],
    relatedServices: ["airbnb-co-hosting", "revenue-management", "property-care"],
    seoTitle: "Short-Term Rental Management Services in Canada",
    seoDescription:
      "End-to-end short-term rental management for Canadian property owners: listings, guests, pricing, cleaning, maintenance and owner reporting.",
  },

  {
    slug: "vacation-rental-management",
    name: "Vacation Rental Management",
    heading: "Vacation rental management for seasonal properties",
    summary:
      "Management built around cottages, chalets and second homes, where the season, the weather and the drive time all shape the operation.",
    icon: "vacation",
    featured: true,
    intro: [
      "A cottage on a lake and a condo downtown are not the same business. Vacation properties concentrate most of their bookings into a short season, sit further from suppliers, and carry systems - wells, septic, docks, heating, snow clearing - that a city apartment simply does not have.",
      "They also attract longer bookings from larger groups, which changes how the property needs to be presented, what guests expect on arrival, and how much damage a poorly screened booking can do.",
      "We manage seasonal properties with that in mind: opening and closing routines, a supplier network that will actually travel to the property, and guest expectations set properly before anyone gets in the car.",
    ],
    includes: [
      {
        title: "Season opening and closing",
        description:
          "Coordinating the routine that gets a property ready for the season and shut down safely afterwards, including water systems and outdoor equipment where relevant.",
      },
      {
        title: "Group and longer-stay handling",
        description:
          "Screening, house rules and arrival information written for larger groups and week-long bookings.",
      },
      {
        title: "Seasonal pricing and minimum stays",
        description:
          "Rate and minimum-stay strategy built around the property's real demand pattern rather than a flat annual rate.",
      },
      {
        title: "Remote property oversight",
        description:
          "Regular checks between bookings and during shoulder season, so problems are found before a guest finds them.",
      },
      {
        title: "Local supplier coordination",
        description:
          "Cleaners, trades, snow clearing and grounds work in markets where suppliers are thinner on the ground and book up early.",
      },
      {
        title: "Weather and access contingencies",
        description:
          "A plan for the arrivals that go wrong because of a storm, a road closure or a power cut.",
      },
    ],
    bestFor: [
      "Cottage and chalet owners in seasonal markets",
      "Second-home owners who let the property when they are not using it",
      "Owners whose property is several hours from where they live",
      "Properties with systems that need genuine seasonal attention",
    ],
    faqs: [
      {
        question: "Do you manage properties outside major cities?",
        answer:
          "Yes, where we have a supplier network we trust. Seasonal markets live or die on whether you can get a cleaner or a trade to the property at short notice, so we check that before agreeing to manage a property in a new area.",
      },
      {
        question: "How do you handle the off-season?",
        answer:
          "That depends on the property. Some stay listed year-round at lower rates and shorter minimums; some close entirely. We will give you an honest view of which makes more sense once we have seen the property and the market.",
      },
      {
        question: "Who pays for seasonal maintenance?",
        answer:
          "Costs at the property remain the owner's. We coordinate the work, get it quoted, and keep it within thresholds you agree in advance so nothing lands as a surprise.",
      },
    ],
    relatedServices: ["short-term-rental-management", "property-care", "revenue-management"],
    seoTitle: "Vacation Rental Management in Canada",
    seoDescription:
      "Vacation rental management for Canadian cottages, chalets and second homes: seasonal operations, group bookings, local suppliers and remote oversight.",
  },

  {
    slug: "listing-optimization",
    name: "Listing Optimization",
    heading: "Listing optimization for short-term rentals",
    summary:
      "Improve how your property is presented, structured and positioned so the right guests find it and understand it before they book.",
    icon: "listing",
    featured: true,
    intro: [
      "Most underperforming listings are not underperforming because of price. They are underperforming because the photos are in the wrong order, the title describes the building instead of the stay, the amenity list is half-filled, and the description answers none of the questions a guest actually has.",
      "Listing work is unglamorous and it compounds. A clearer listing attracts guests who are a better fit for the property, which produces better reviews, which improves how the listing ranks, which reduces how hard the price has to work.",
      "We rebuild listings from the guest's point of view: what they are trying to work out, in what order, and what is currently stopping them.",
    ],
    includes: [
      {
        title: "Listing audit",
        description:
          "A written review of the title, photo order, description, amenities, house rules and settings, with the reasoning for each recommendation.",
      },
      {
        title: "Copy rewrite",
        description:
          "Titles and descriptions written for the guest making the decision, structured so the important information is not buried below the fold.",
      },
      {
        title: "Photo sequencing and briefing",
        description:
          "Ordering the photos you have for maximum effect, and briefing a photographer on the shots that are missing.",
      },
      {
        title: "Amenity and filter accuracy",
        description:
          "Completing the structured fields properly so the listing appears in the filtered searches it should appear in.",
      },
      {
        title: "Positioning",
        description:
          "Deciding who the property is genuinely for, and letting go of the guests it was never going to win.",
      },
      {
        title: "House rules and expectation setting",
        description:
          "Rules written to prevent the specific problems your property has had, not a generic list.",
      },
    ],
    bestFor: [
      "Listings that get views but few bookings",
      "Properties that have been live for a year or more without being updated",
      "New listings that have not yet built up reviews",
      "Owners who have recently renovated and are still showing the old property",
    ],
    faqs: [
      {
        question: "Can you optimize a listing without managing the property?",
        answer:
          "Yes. Listing optimization is available as a standalone piece of work. You get the audit and the rewritten content, and you can apply it yourself.",
      },
      {
        question: "Will this guarantee more bookings?",
        answer:
          "No, and anyone who tells you otherwise is guessing. A clearer, better-structured listing removes obstacles between a guest and a booking, but demand, pricing, seasonality and competition all sit outside a listing rewrite. We will tell you which of those we think is actually your constraint.",
      },
      {
        question: "Do you take new photos?",
        answer:
          "We do not shoot photography ourselves. We will tell you exactly which shots are missing and brief a local photographer, or work with the images you already have if new photography is not practical right now.",
      },
    ],
    relatedServices: ["airbnb-co-hosting", "revenue-management", "guest-communication"],
    seoTitle: "Airbnb Listing Optimization Services",
    seoDescription:
      "Listing optimization for Canadian short-term rentals: audits, rewritten copy, photo sequencing, amenity accuracy and clearer positioning.",
  },

  {
    slug: "guest-communication",
    name: "Guest Communication",
    heading: "Guest communication and support",
    summary:
      "Professional, consistent messaging across the whole guest journey, from the first enquiry to the review that follows checkout.",
    icon: "communication",
    featured: true,
    intro: [
      "Guest communication is the part of hosting that never fits around a normal life. Enquiries arrive while you are at work, arrival questions arrive while you are asleep, and the response time you manage over a month is visible on your listing.",
      "It is also where most bad reviews are actually decided. A genuine problem handled quickly and openly rarely becomes a one-star review. The same problem met with silence usually does.",
      "We take over the messaging with a defined tone, defined escalation rules and a defined standard for how quickly a guest hears back.",
    ],
    includes: [
      {
        title: "Enquiry and booking-request handling",
        description:
          "Answering pre-booking questions and screening requests against the rules you have set for the property.",
      },
      {
        title: "Pre-arrival information",
        description:
          "Directions, parking, access, Wi-Fi and the local detail guests always ask for, sent before they need to ask.",
      },
      {
        title: "In-stay support",
        description:
          "A real response when something is not working, and coordination of whoever needs to attend.",
      },
      {
        title: "Checkout and follow-up",
        description:
          "Checkout instructions, damage or issue reporting, and a follow-up that gives good guests a reason to leave a review.",
      },
      {
        title: "Review management",
        description:
          "Writing guest reviews and responding to the reviews left for your property, including the critical ones.",
      },
      {
        title: "Escalation rules",
        description:
          "Clear agreement on what we settle, what we spend and what comes straight to you.",
      },
    ],
    bestFor: [
      "Hosts whose response time is slipping",
      "Owners in a different time zone from their property",
      "Properties that generate a lot of pre-booking questions",
      "Owners who find the guest-facing side the most draining part of hosting",
    ],
    faqs: [
      {
        question: "What are your response times?",
        answer:
          "We agree a target with you in writing when we take the property on, and it depends on the service level you choose - not every owner needs overnight cover. We would rather commit to a standard we can actually hold than advertise a number we cannot.",
      },
      {
        question: "Do guests know they are talking to a co-host?",
        answer:
          "We do not pretend to be you. We message as part of the property's team, which is normal and expected on every major platform. Guests care that someone competent answers, not who owns the building.",
      },
      {
        question: "Do you handle communication in French?",
        answer:
          "Language coverage depends on the market and the property. Tell us what you need at the assessment stage and we will be straight with you about what we can support.",
      },
    ],
    relatedServices: ["airbnb-co-hosting", "short-term-rental-management", "listing-optimization"],
    seoTitle: "Airbnb Guest Communication and Guest Management",
    seoDescription:
      "Professional guest communication for Canadian short-term rentals: enquiries, pre-arrival information, in-stay support and review management.",
  },

  {
    slug: "revenue-management",
    name: "Revenue Management",
    heading: "Revenue and pricing management",
    summary:
      "Data-informed pricing, minimum-stay and calendar strategy, reviewed against how your property actually performs.",
    icon: "revenue",
    featured: true,
    intro: [
      "Pricing a short-term rental is not a one-time decision. Rates that were right in March are wrong by June, gap nights need different treatment from a week in peak season, and a minimum stay that protects your cleaning schedule can also be the reason your calendar has holes in it.",
      "We work through the levers in order: base rate, seasonal shape, weekend premium, minimum stays, lead-time discounting and length-of-stay discounts. Each one gets changed deliberately, and we watch what happens.",
      "What we will not do is promise a number. Revenue depends on demand in your market, your property, your competition and the season. We can tell you what we would change and why. We cannot guarantee what it will earn, and we will not pretend to.",
    ],
    includes: [
      {
        title: "Rate structure review",
        description:
          "Base, weekend and seasonal rates set against the property's real demand pattern rather than a flat annual number.",
      },
      {
        title: "Minimum stay strategy",
        description:
          "Minimums that reflect cleaning costs, guest quality and the shape of your calendar, adjusted by season.",
      },
      {
        title: "Gap night management",
        description:
          "Finding and filling the orphan nights that sit between bookings and quietly cost a month of occupancy.",
      },
      {
        title: "Discount policy",
        description:
          "Weekly, monthly, early-booking and last-minute discounts used where they earn their keep, not by default.",
      },
      {
        title: "Competitive context",
        description:
          "An honest read of what comparable properties in your market are doing and where yours genuinely sits among them.",
      },
      {
        title: "Ongoing review",
        description:
          "Regular reassessment as the season turns, with the changes and the reasoning written down.",
      },
    ],
    bestFor: [
      "Properties with strong occupancy but low rates, or strong rates but weak occupancy",
      "Owners who have never changed their pricing since listing",
      "Seasonal properties with a sharp peak and a long shoulder",
      "Investors comparing performance across more than one property",
    ],
    faqs: [
      {
        question: "Do you guarantee a revenue increase?",
        answer:
          "No. Any company that guarantees short-term rental revenue is either making it up or hiding conditions in the contract. We will show you what we would change, explain the reasoning and report honestly on what happened.",
      },
      {
        question: "Do you use dynamic pricing tools?",
        answer:
          "Pricing tools are useful inputs and poor decision-makers. Where a tool is worth using for a property we will say so and tell you what it would cost. The strategy behind it still needs a person who knows the property.",
      },
      {
        question: "How often are rates reviewed?",
        answer:
          "Actively through the run-up to a season, and less frequently in quiet periods. The exact cadence is set with you, and every change is recorded so you can see what was done and when.",
      },
    ],
    relatedServices: ["short-term-rental-management", "listing-optimization", "vacation-rental-management"],
    seoTitle: "Short-Term Rental Revenue and Pricing Management",
    seoDescription:
      "Data-informed pricing and calendar strategy for Canadian short-term rentals: rate structure, minimum stays, gap nights and discount policy.",
  },

  {
    slug: "property-care",
    name: "Property Care",
    heading: "Cleaning, turnovers and maintenance coordination",
    summary:
      "Coordinating the cleaning, restocking and maintenance that decide whether a guest walks in impressed or disappointed.",
    icon: "care",
    featured: true,
    intro: [
      "Almost every serious complaint in short-term rentals traces back to the physical state of the property: the clean that was rushed, the light that has been out for three weeks, the shower that never had enough pressure.",
      "None of that is complicated. It is just relentless, and it has to happen between bookings on a schedule that changes constantly.",
      "We coordinate the people who keep the property in shape, check that the work was actually done, and keep a record of the property's condition over time so recurring problems get fixed rather than re-reported.",
    ],
    includes: [
      {
        title: "Turnover scheduling",
        description:
          "Cleans booked around the live calendar, including same-day turnarounds and last-minute changes.",
      },
      {
        title: "Cleaning standards and checks",
        description:
          "An agreed standard for the property, with checks that it has been met rather than assumed.",
      },
      {
        title: "Linen and consumables",
        description:
          "Restocking and replacing the supplies guests expect, before they run out mid-stay.",
      },
      {
        title: "Maintenance coordination",
        description:
          "Vetted trades booked and supervised for both routine upkeep and reactive repairs.",
      },
      {
        title: "Condition tracking",
        description:
          "A running record of wear, damage and repairs, so patterns are visible and replacement can be planned.",
      },
      {
        title: "Safety checks",
        description:
          "Keeping alarms, extinguishers and access equipment in working order as part of the routine, not as an afterthought.",
      },
    ],
    bestFor: [
      "Owners without a reliable local cleaner",
      "Properties with frequent same-day turnovers",
      "Remote owners who cannot inspect the property themselves",
      "Properties where the reviews keep mentioning cleanliness or upkeep",
    ],
    faqs: [
      {
        question: "Do you employ your own cleaners?",
        answer:
          "We work with vetted local cleaning teams in the markets we serve. Where you already have a cleaner you trust, we are happy to coordinate with them instead of replacing them.",
      },
      {
        question: "How are cleaning costs handled?",
        answer:
          "Cleaning is a property cost, normally recovered through the cleaning fee charged to guests. We coordinate the work and keep the charges visible in your reporting.",
      },
      {
        question: "What happens if a guest damages something?",
        answer:
          "We document it, report it through the platform's process within the required window, and arrange the repair. Where a claim is involved we handle the submission and keep you updated on the outcome.",
      },
    ],
    relatedServices: ["short-term-rental-management", "vacation-rental-management", "guest-communication"],
    seoTitle: "Airbnb Cleaning and Maintenance Coordination",
    seoDescription:
      "Cleaning, turnover and maintenance coordination for Canadian short-term rentals, with condition tracking and safety checks.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function featuredServices(): Service[] {
  return services.filter((service) => service.featured);
}

export function relatedServices(slug: string): Service[] {
  const service = getService(slug);
  if (!service) return [];
  return service.relatedServices
    .map(getService)
    .filter((item): item is Service => item !== undefined);
}
