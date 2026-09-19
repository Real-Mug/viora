import type { Post } from "@/lib/types/post";

/**
 * RESOURCES / BLOG
 * ----------------------------------------------------------------------------
 * A small number of genuinely useful articles, not a content farm. Each one
 * answers a question owners actually ask and is written to be worth reading on
 * its own, independently of whether the reader ever becomes a client.
 *
 * Adding a post means appending a record: the index, the category pages, the
 * sitemap and the internal links all read from this array. Posts use a block
 * model rather than raw HTML so they can move to a CMS later without rewriting
 * the rendering layer.
 */
export const posts: Post[] = [
  {
    slug: "what-is-airbnb-co-hosting",
    title: "What Is Airbnb Co-Hosting, and How Does It Actually Work?",
    excerpt:
      "Co-hosting sits between doing everything yourself and handing your property to a full-service manager. Here is what it covers, what it does not, and how to tell which one you need.",
    category: "co-hosting",
    publishedAt: "2026-02-04",
    author: "VioraRental",
    readingMinutes: 7,
    relatedServices: ["airbnb-co-hosting", "short-term-rental-management"],
    relatedPosts: ["short-term-rental-management-checklist", "airbnb-vs-direct-booking"],
    seoTitle: "What Is Airbnb Co-Hosting? A Guide for Hosts",
    seoDescription:
      "A plain explanation of Airbnb co-hosting for Canadian property owners: what a co-host does, what it costs you in control, and when full management makes more sense.",
    body: [
      {
        type: "paragraph",
        text: "Most people who own a short-term rental did not set out to run a hospitality business. They had a property, letting it nightly made more sense than letting it annually, and the operational side arrived as a side effect. Co-hosting exists for exactly that situation.",
      },
      { type: "heading", level: 2, text: "The short definition" },
      {
        type: "paragraph",
        text: "A co-host is someone added to your listing who takes on part of the work of running it. You remain the host of record. The listing stays in your account, the payouts still go to you, and you keep the final say on pricing, house rules and who stays. What changes is who does the work.",
      },
      {
        type: "paragraph",
        text: "That distinction matters more than it sounds. Full-service management usually means signing a contract that transfers control of the listing, the calendar and often the guest relationship. Co-hosting is a support arrangement you can shape and unwind. For owners who are unsure about giving up control, it is a far easier first step.",
      },
      { type: "heading", level: 2, text: "What a co-host typically handles" },
      {
        type: "list",
        items: [
          "Guest messaging, from pre-booking questions through to post-checkout follow-up",
          "Check-in and check-out coordination, including access issues and late departures",
          "Cleaning and turnover scheduling against a calendar that keeps moving",
          "Triaging maintenance problems and getting the right trade to the property",
          "Keeping the listing content accurate as the property changes",
          "Writing guest reviews and responding to the ones left for your property",
        ],
      },
      {
        type: "paragraph",
        text: "Not every co-host does all of it. The arrangement is usually scoped: some owners hand over guest communication only and keep everything else, which is a perfectly sensible place to start.",
      },
      { type: "heading", level: 2, text: "What co-hosting does not do" },
      {
        type: "paragraph",
        text: "It does not make a badly located property work. It does not resolve a condominium rule that prohibits short-term rentals. It does not remove your legal obligations as the owner - licensing, tax and insurance stay with you. And it does not guarantee that your revenue will go up.",
      },
      {
        type: "callout",
        title: "Be careful with revenue promises",
        text: "If a co-host or management company guarantees a specific income or occupancy figure, ask exactly how that guarantee is funded and what happens if it is not met. In most cases the answer is either that it is not really a guarantee, or that it is paid for by conditions elsewhere in the agreement.",
      },
      { type: "heading", level: 2, text: "Co-hosting or full management?" },
      {
        type: "paragraph",
        text: "A reasonable way to decide is to ask what you actually want back. If you want your evenings and weekends back but still enjoy the business side - looking at the numbers, deciding the rate, choosing the furniture - co-hosting is probably the right shape. If you want the property to be genuinely off your plate and are happy to receive a report rather than make decisions, full management fits better.",
      },
      {
        type: "paragraph",
        text: "The other honest test is volume. One property alongside a full-time job is manageable with support. Three or four properties is a business, and running it part-time tends to show up in the reviews.",
      },
      { type: "heading", level: 2, text: "Questions worth asking any co-host" },
      {
        type: "list",
        ordered: true,
        items: [
          "What exactly is in scope, in writing, and what is explicitly not?",
          "What response time do you commit to, and during which hours?",
          "What can you spend without asking me, and what always comes to me first?",
          "Who are the cleaners and trades, and what happens when they are unavailable?",
          "What do I receive, how often, and what does it actually show?",
          "How do I end the arrangement, and what happens to the listing when I do?",
        ],
      },
      {
        type: "paragraph",
        text: "A co-host who cannot answer those clearly is telling you something useful.",
      },
    ],
  },

  {
    slug: "airbnb-vs-direct-booking",
    title: "Airbnb vs Direct Booking: What Canadian Owners Should Weigh Up",
    excerpt:
      "Direct booking is often pitched as an obvious win. It can be, but it moves real work and real risk onto you. Here is the honest trade-off.",
    category: "direct-booking",
    publishedAt: "2026-02-18",
    author: "VioraRental",
    readingMinutes: 8,
    relatedServices: ["revenue-management", "short-term-rental-management"],
    relatedPosts: ["what-is-airbnb-co-hosting", "how-to-improve-your-vacation-rental-listing"],
    seoTitle: "Airbnb vs Direct Booking in Canada",
    seoDescription:
      "An honest comparison of platform bookings and direct bookings for Canadian short-term rental owners: costs, risk, demand and what direct booking really requires.",
    body: [
      {
        type: "paragraph",
        text: "The argument for direct booking is easy to state: you keep the platform fee, you own the guest relationship, and you are not exposed to a policy change made by a company in another country. All of that is true. It is also only half the picture.",
      },
      { type: "heading", level: 2, text: "What the platform is actually selling you" },
      {
        type: "paragraph",
        text: "The fee a platform takes is not a payment for a booking form. It is payment for demand, trust and dispute infrastructure. A guest who has never heard of your property will book it on Airbnb because Airbnb stands behind the transaction. The same guest on your own website is being asked to send money to a stranger.",
      },
      {
        type: "paragraph",
        text: "Underneath that sit things owners tend to underestimate: payment processing and chargeback exposure, identity and fraud screening, cancellation handling, damage claims, and a support function that runs at two in the morning. Going direct means either building those or accepting the risk.",
      },
      { type: "heading", level: 2, text: "Where direct booking genuinely works" },
      {
        type: "list",
        items: [
          "Repeat guests who have already stayed and already trust the property",
          "Properties with a distinctive identity that people search for by name",
          "Longer stays, where the fee saving is large enough to matter to both sides",
          "Markets with strong local or word-of-mouth demand",
          "Owners with several properties, where the fixed cost of doing it properly is spread",
        ],
      },
      {
        type: "paragraph",
        text: "The common thread is that direct booking works best where demand already exists. It is a way to capture demand more cheaply, not a way to create it.",
      },
      { type: "heading", level: 2, text: "What it actually takes to do properly" },
      {
        type: "list",
        ordered: true,
        items: [
          "A site that loads fast, works on a phone and looks like it belongs to a real business",
          "Live availability that is genuinely synced, not a calendar someone updates by hand",
          "Payment processing with sensible deposit and cancellation terms",
          "Written booking terms, a cancellation policy and a privacy policy that reflect Canadian requirements",
          "Damage protection or a deposit process, and a plan for when it is needed",
          "Someone who answers enquiries quickly, because there is no platform inbox to fall back on",
        ],
      },
      {
        type: "callout",
        title: "The calendar is the part that bites",
        text: "Double bookings are the fastest way to destroy trust in a direct channel, and they happen when a property is live in two places without a reliable sync. If you take one thing seriously before going direct, make it calendar synchronisation.",
      },
      { type: "heading", level: 2, text: "The pragmatic answer for most owners" },
      {
        type: "paragraph",
        text: "Run both. Keep the platform listing for reach and for first-time guests, and build a direct channel for repeat guests and longer stays. The platform absorbs the cost of finding new guests; the direct channel keeps the ones who already know the property.",
      },
      {
        type: "paragraph",
        text: "That is the approach we take. VioraRental property pages link to the Airbnb listing where one exists, and the site is built so that direct booking can be switched on per property once availability, pricing and payment are genuinely connected. Until they are, we do not display a booking button, because a button that cannot confirm a reservation is worse than no button at all.",
      },
    ],
  },

  {
    slug: "short-term-rental-management-checklist",
    title: "A Short-Term Rental Management Checklist for Canadian Owners",
    excerpt:
      "The operational checklist we work through with owners: before listing, between every stay, monthly, and seasonally.",
    category: "property-operations",
    publishedAt: "2026-03-10",
    author: "VioraRental",
    readingMinutes: 9,
    relatedServices: ["property-care", "short-term-rental-management", "guest-communication"],
    relatedPosts: ["what-is-airbnb-co-hosting", "how-to-improve-your-vacation-rental-listing"],
    seoTitle: "Short-Term Rental Management Checklist",
    seoDescription:
      "A practical short-term rental management checklist covering pre-listing setup, turnovers between stays, monthly reviews and seasonal maintenance in Canada.",
    body: [
      {
        type: "paragraph",
        text: "Running a short-term rental well is not difficult in any single moment. It is difficult because the same twenty things have to happen reliably, between every booking, indefinitely. What follows is the structure we use.",
      },
      { type: "heading", level: 2, text: "Before the property is listed" },
      {
        type: "list",
        items: [
          "Confirm you are permitted to let short-term: municipal rules, provincial requirements, and the condominium declaration or strata bylaws",
          "Obtain any licence or registration required, and note where the number must be displayed",
          "Tell your insurer what the property is being used for and get confirmation in writing",
          "Fit and test smoke alarms, carbon monoxide alarms and a fire extinguisher",
          "Decide how guests get in, and what happens when that method fails at 11pm",
          "Photograph the property properly, in daylight, after it has been staged",
          "Write house rules that address your property's actual risks, not a generic list",
          "Set up a cleaning arrangement with someone who can cover a same-day turnover",
        ],
      },
      { type: "heading", level: 2, text: "Between every stay" },
      {
        type: "list",
        items: [
          "Full clean to a written standard, not to whatever the cleaner remembers",
          "Linen and towel change, with a spare set on site",
          "Restock consumables before they run out mid-stay",
          "Check that everything that plugs in still works, including the Wi-Fi",
          "Walk the property for damage and log anything new with a photograph",
          "Reset access codes where the lock supports it",
          "Send arrival information before the guest needs to ask for it",
        ],
      },
      {
        type: "callout",
        title: "Log damage the same day",
        text: "Platform damage claims have time limits and are far easier to substantiate with a dated photograph taken at turnover. Discovering damage three bookings later almost always means absorbing the cost yourself.",
      },
      { type: "heading", level: 2, text: "Every month" },
      {
        type: "list",
        items: [
          "Review occupancy, rate achieved and the nights that went unsold",
          "Look at the gap nights - orphan nights between bookings are the quietest revenue leak there is",
          "Read the reviews properly, including the middling ones, and look for repeats",
          "Check the listing is still accurate after any change to the property",
          "Reconcile cleaning and maintenance costs against what was charged to guests",
          "Check upcoming demand: local events, school holidays, long weekends",
        ],
      },
      { type: "heading", level: 2, text: "Every season" },
      {
        type: "list",
        items: [
          "Deep clean beyond the turnover standard, including appliances and soft furnishings",
          "Service heating and cooling before the season it is needed, not during",
          "Replace tired linen, cookware and anything guests have mentioned twice",
          "Review pricing structure for the season ahead, including minimum stays",
          "Re-check licensing and registration requirements, which change more often than owners expect",
          "For seasonal properties: complete the opening or closing routine in full, including water systems and outdoor equipment",
        ],
      },
      { type: "heading", level: 2, text: "The part most owners skip" },
      {
        type: "paragraph",
        text: "Keeping a written record. Not for its own sake, but because patterns only become visible when they are written down. Three guests mentioning the shower over five months reads as three separate complaints in your inbox and as one plumbing problem in a log.",
      },
      {
        type: "paragraph",
        text: "If you would rather not run this yourself, that is precisely the work we take on. It is also worth saying that this checklist is useful whether or not you ever hire anyone.",
      },
    ],
  },

  {
    slug: "how-to-improve-your-vacation-rental-listing",
    title: "How to Improve a Vacation Rental Listing That Is Not Converting",
    excerpt:
      "If your listing gets views but not bookings, the problem is usually not price. Here is the order to work through it.",
    category: "airbnb-hosting",
    publishedAt: "2026-04-02",
    author: "VioraRental",
    readingMinutes: 8,
    relatedServices: ["listing-optimization", "revenue-management"],
    relatedPosts: ["short-term-rental-management-checklist", "airbnb-vs-direct-booking"],
    seoTitle: "How to Improve a Vacation Rental Listing",
    seoDescription:
      "A practical order of work for improving an underperforming short-term rental listing: diagnose views versus bookings, then fix photos, title, description and settings.",
    body: [
      {
        type: "paragraph",
        text: "When bookings are slow, the instinct is to drop the price. Sometimes that is right. More often it treats a symptom, because the listing is being seen and rejected rather than never seen at all.",
      },
      { type: "heading", level: 2, text: "First, work out which problem you have" },
      {
        type: "paragraph",
        text: "There are two failures and they need opposite responses. If your listing gets few views, the problem is visibility: search positioning, filters, availability settings, minimum stays. If it gets plenty of views and few bookings, the problem is conversion: what people see when they arrive.",
      },
      {
        type: "paragraph",
        text: "Check your views before changing anything else. Changing the price when the real problem is that you are filtered out of half the searches will cost you money without fixing anything.",
      },
      { type: "heading", level: 2, text: "If the problem is conversion" },
      { type: "heading", level: 3, text: "The first photo" },
      {
        type: "paragraph",
        text: "It carries more weight than everything else combined, because it is most of the decision about whether anyone clicks at all. It should be the single most compelling true image of the property - usually the main living space or the view, rarely the exterior, and almost never the bathroom.",
      },
      { type: "heading", level: 3, text: "Photo order" },
      {
        type: "paragraph",
        text: "Sequence the photos the way someone walks through the property: arrival, main living space, kitchen, bedrooms in order, bathrooms, outdoor space, then the neighbourhood. A shuffled gallery makes a good property feel disorganised.",
      },
      { type: "heading", level: 3, text: "The title" },
      {
        type: "paragraph",
        text: "Describe the stay, not the building. 'Lakefront cottage with private dock, sleeps 8' does work that 'Beautiful 4BR Property' does not. Lead with whatever is genuinely distinctive, and if nothing is, that is worth knowing too.",
      },
      { type: "heading", level: 3, text: "The first three lines of the description" },
      {
        type: "paragraph",
        text: "Most guests read no further before deciding. Those lines should answer who the property suits, what is unusual about it, and where it is in relation to the thing people come for.",
      },
      { type: "heading", level: 3, text: "Amenities" },
      {
        type: "paragraph",
        text: "Fill in every structured field honestly and completely. These fields drive filters, and a missing tick is an invisible exclusion from searches you would have won. This is the single most common unforced error we see.",
      },
      {
        type: "callout",
        title: "Do not overstate",
        text: "Claiming an amenity you do not really have converts better and reviews worse. A guest who booked for a workspace and found a kitchen chair will say so in writing, permanently.",
      },
      { type: "heading", level: 2, text: "If the problem is visibility" },
      {
        type: "list",
        items: [
          "Check your minimum stay against what guests in your market actually book",
          "Look at how far ahead your calendar is open - a short booking window suppresses long-lead-time bookings",
          "Review your cancellation policy, which is a filter on many platforms",
          "Check for accidental blocks, preparation-time settings and stale availability",
          "Compare your rate against genuinely comparable properties, not the whole market",
        ],
      },
      { type: "heading", level: 2, text: "Then leave it alone" },
      {
        type: "paragraph",
        text: "Make the changes, then give them time before judging. Short-term rental booking cycles run weeks ahead, so a week of data tells you almost nothing. Changing five things at once and reversing them after four days is how owners end up convinced that nothing works.",
      },
      {
        type: "paragraph",
        text: "If you would rather have someone work through this with you, listing optimization is something we do as a standalone piece of work - you do not need to hand over management to get it.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function postsByCategory(category: string): Post[] {
  return posts
    .filter((post) => post.category === category)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function sortedPosts(): Post[] {
  return [...posts].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function relatedPosts(slug: string): Post[] {
  const post = getPost(slug);
  if (!post?.relatedPosts?.length) return [];
  return post.relatedPosts.map(getPost).filter((item): item is Post => item !== undefined);
}

/** Categories that actually have posts - avoids empty category pages. */
export function usedCategories(): string[] {
  return [...new Set(posts.map((post) => post.category))];
}
