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
    author: "Viora Hosting",
    readingMinutes: 7,
    relatedServices: ["airbnb-co-hosting", "short-term-rental-management"],
    relatedPosts: ["short-term-rental-management-checklist", "airbnb-vs-direct-booking"],
    seoTitle: "What Is Airbnb Co-Hosting? A Guide for Hosts",
    seoDescription:
      "What an Airbnb co-host does, what you keep control of, and when full management makes more sense. A plain guide for Canadian property owners.",
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
        text: "A reasonable way to decide is to ask what you actually want back. If you want your evenings and weekends back but still enjoy the business side - looking at the numbers, deciding the rate, choosing the furniture - co-hosting is probably the right shape. If you want the property to be genuinely off your plate and are happy to receive a report rather than make decisions, [full short-term rental management](/services/short-term-rental-management) fits better.",
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
        text: "A co-host who cannot answer those clearly is telling you something useful. Our [Airbnb co-hosting service](/services/airbnb-co-hosting) page sets out how we answer them, and [how it works](/how-it-works) covers what gets agreed in writing.",
      },
    ],
  },

  {
    slug: "airbnb-vs-direct-booking",
    title: "Airbnb vs Direct Booking: What Canadian Owners Should Weigh Up",
    excerpt:
      "Direct booking is pitched as an obvious win. It also moves real work and real risk onto you.",
    category: "direct-booking",
    publishedAt: "2026-02-18",
    author: "Viora Hosting",
    readingMinutes: 8,
    relatedServices: ["revenue-management", "short-term-rental-management"],
    relatedPosts: ["what-is-airbnb-co-hosting", "how-to-improve-your-vacation-rental-listing"],
    seoTitle: "Airbnb vs Direct Booking in Canada",
    seoDescription:
      "Airbnb or direct booking? An honest comparison for Canadian short-term rental owners: platform fees, risk, demand and what going direct really takes.",
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
        text: "That is the approach we take. Viora Hosting [property pages](/properties) link to the Airbnb listing where one exists, and the site is built so that direct booking can be switched on per property once availability, pricing and payment are genuinely connected. Until they are, we do not display a booking button, because a button that cannot confirm a reservation is worse than no button at all.",
      },
    ],
  },

  {
    slug: "short-term-rental-management-checklist",
    title: "A Short-Term Rental Management Checklist for Canadian Owners",
    excerpt:
      "What we check before listing, between stays, monthly and seasonally.",
    category: "property-operations",
    publishedAt: "2026-03-10",
    author: "Viora Hosting",
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
          "Confirm you are permitted to let short-term: municipal rules, provincial requirements, and the condominium declaration or strata bylaws - our [Toronto](/locations/toronto) and [Waterloo Region](/locations/waterloo-region) guides cover the local rules there",
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
        text: "If you would rather not run this yourself, that is precisely the work we take on through [short-term rental management](/services/short-term-rental-management) and [property care](/services/property-care). It is also worth saying that this checklist is useful whether or not you ever hire anyone.",
      },
    ],
  },

  {
    slug: "how-to-improve-your-vacation-rental-listing",
    title: "How to Improve a Vacation Rental Listing That Is Not Converting",
    excerpt:
      "Views but no bookings? It is usually not price. Work through it in this order.",
    category: "airbnb-hosting",
    publishedAt: "2026-04-02",
    author: "Viora Hosting",
    readingMinutes: 8,
    relatedServices: ["listing-optimization", "revenue-management"],
    relatedPosts: ["short-term-rental-management-checklist", "airbnb-vs-direct-booking"],
    seoTitle: "How to Improve Your Airbnb Listing",
    seoDescription:
      "Views but no bookings? A practical order of work for fixing an Airbnb or vacation rental listing: photos, title, description, amenities and settings.",
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
        text: "If you would rather have someone work through this with you, [listing optimization](/services/listing-optimization) is something we do as a standalone piece of work - you do not need to hand over management to get it.",
      },
    ],
  },

  {
    slug: "how-much-does-an-airbnb-co-host-charge-canada",
    title: "How Much Does an Airbnb Co-Host Charge in Canada?",
    excerpt:
      "Co-host fees in Canada come in a few common shapes, and the headline number means little until you know what it is calculated on. Here is how pricing works, how Airbnb's payout splits work, and what to watch for.",
    category: "co-hosting",
    publishedAt: "2026-10-18",
    author: "Viora Hosting",
    readingMinutes: 8,
    relatedServices: ["airbnb-co-hosting", "short-term-rental-management", "revenue-management"],
    relatedPosts: ["what-is-airbnb-co-hosting", "short-term-rental-management-checklist"],
    seoTitle: "Airbnb Co-Host Fees in Canada: How Pricing Works",
    seoDescription:
      "How Airbnb co-host fees work in Canada: percentage, flat and à-la-carte pricing, what the percentage is based on, payout splits and the red flags to avoid.",
    body: [
      {
        type: "paragraph",
        text: "Ask around and you will hear that a co-host charges a percentage, and that is usually true. It is also not very useful on its own. Two co-hosts can quote the same percentage and cost you very different amounts, because they calculate it on different numbers, include different work and add different extras. This guide explains how Airbnb co-host fees in Canada are usually structured, so you can compare quotes properly before you sign anything.",
      },
      {
        type: "paragraph",
        text: "We are not going to give you a 'typical' percentage. We looked for one from Airbnb or from a published industry survey and could not find a source we would stand behind. Most figures online come from software vendors and management companies with an interest in the answer, and they disagree with each other. What we can do is show you how the pricing is built, which is what actually decides your cost.",
      },
      { type: "heading", level: 2, text: "The three common fee structures" },
      { type: "heading", level: 3, text: "A percentage of booking revenue" },
      {
        type: "paragraph",
        text: "This is the most common model. The co-host takes an agreed share of what each booking earns. The appeal is that it ties their income to yours: when the property earns more, they earn more, and in a quiet month they feel it too. The catch is that 'a percentage of revenue' can mean several different things.",
      },
      { type: "heading", level: 3, text: "A flat monthly fee" },
      {
        type: "paragraph",
        text: "Some co-hosts charge a fixed amount each month regardless of bookings. It is predictable, which suits owners who budget carefully or who rent mostly for longer stays. It also means the co-host is paid the same whether the calendar is full or empty, so it is worth asking what they are doing to fill it.",
      },
      { type: "heading", level: 3, text: "À-la-carte pricing" },
      {
        type: "paragraph",
        text: "Here you pay for specific tasks: a fee per turnover, per check-in, per listing setup, or an hourly rate for maintenance coordination. This fits owners who want help with one or two things, such as guest messaging or cleaning coordination, and want to keep the rest. Airbnb's own Co-Host Network reflects this: co-hosts list which services they offer, from listing setup and pricing through to guest messaging, onsite support and cleaning, and agree pricing with the host.",
      },
      {
        type: "paragraph",
        text: "Many arrangements are a mix, for example a percentage for ongoing management plus a per-turnover cleaning charge.",
      },
      { type: "heading", level: 2, text: "What the percentage is calculated on" },
      {
        type: "paragraph",
        text: "This is the single most important question to ask about any percentage quote. The same rate can be applied to very different numbers:",
      },
      {
        type: "list",
        items: [
          "Gross booking value: everything the guest pays, sometimes including the cleaning fee and the platform's guest-facing charges",
          "Your payout: what Airbnb pays you after its host service fee is deducted",
          "Your payout excluding the cleaning fee: the nightly revenue only, after platform fees",
        ],
      },
      {
        type: "paragraph",
        text: "The difference is not small. Airbnb's help centre says it is moving home hosts to a single host-only service fee, where the whole fee comes out of the host's payout, and that most hosts on that structure pay 15.5%. A percentage taken before that fee is deducted is a percentage of money you never receive. Including the cleaning fee in the base matters too, because cleaning money is mostly passed straight through to the cleaner.",
      },
      {
        type: "callout",
        title: "Get the base in writing",
        text: "A useful test: ask the co-host to work through one real booking from your calendar, line by line, and show what they would take and what you would keep. If the arithmetic is hard to follow, the contract will be too.",
      },
      { type: "heading", level: 2, text: "How cleaning fees pass through to guests" },
      {
        type: "paragraph",
        text: "On Airbnb, you can set a cleaning fee in your listing details and it is charged to the guest as part of the booking. In most co-hosting arrangements, that money is used to pay for the clean itself. Some co-hosts handle the cleaning and keep the cleaning fee as payment for it; others pass it to an independent cleaner. Either is fine, as long as you know which. Problems start when the cleaning fee is collected from the guest, the co-host's percentage is calculated on a base that includes it, and a separate cleaning charge is also billed to you.",
      },
      { type: "heading", level: 2, text: "Setup and onboarding fees" },
      {
        type: "paragraph",
        text: "Some co-hosts charge a one-time fee to get a property ready: photography, writing or rewriting the listing, setting up pricing tools and smart locks, and buying linen and supplies. Others build this into the ongoing fee. A setup fee is not a bad sign in itself, because the work is real, but you should know exactly what it buys and whether supplies are charged at cost or with a markup. Ask also whether the photos and listing copy are yours to keep if the arrangement ends.",
      },
      { type: "heading", level: 2, text: "What drives a co-host's quote" },
      {
        type: "list",
        items: [
          "Scope: messaging only costs less than messaging, turnovers, maintenance, pricing and restocking combined",
          "Location: a property a short drive from the co-host's team is cheaper to service than one that needs a dedicated trip, and cleaning and trades rates vary by market",
          "Property size and complexity: more bedrooms mean longer turnovers, more linen and more to go wrong; hot tubs, pools and septic systems add work",
          "Seasonality: a cottage that is busy for ten weeks and quiet the rest of the year is priced differently from a city unit with steady demand",
          "Number of listings: several properties with one owner can often be serviced more efficiently than one",
          "Booking pattern: many short stays mean many turnovers; a property rented mostly for a month at a time is lighter work",
        ],
      },
      {
        type: "paragraph",
        text: "This is why we do not publish a price list. Viora Hosting quotes after a free assessment of the property, the market and what you actually want to hand over, and the fee and scope are set out in writing before anything starts. If you would like a number for your property, [request a free assessment](/become-a-host).",
      },
      { type: "heading", level: 2, text: "How co-host payouts work on Airbnb" },
      {
        type: "paragraph",
        text: "Airbnb has a built-in way for a listing owner to share part of each booking's payout with a co-host, so you do not have to pay them separately. According to Airbnb's help centre, the options are:",
      },
      {
        type: "list",
        items: [
          "Cleaning fee: the co-host receives the cleaning fee set in the listing",
          "Cleaning fee plus a percentage: the cleaning fee plus a percentage of each booking, excluding the cleaning fee",
          "Percentage: a percentage of each booking, with the cleaning fee either included or excluded",
          "Fixed amount: a set amount per booking",
        ],
      },
      {
        type: "paragraph",
        text: "A few details are worth knowing. Only the listing owner can set up, edit or remove co-host payouts; a co-host cannot set their own. The co-host has to confirm the proposal, and payouts apply only to bookings that check in after they confirm. Payouts are calculated on the host's potential earnings for each booking, which Airbnb describes as the nightly price times the number of nights plus extras such as the cleaning fee, minus the host service fee and applicable taxes and fees. In other words, the built-in percentage is applied after Airbnb's fee, not before it.",
      },
      {
        type: "paragraph",
        text: "Airbnb also says co-hosts are paid first, and the host receives whatever remains, so if a booking earns less than expected the shortfall lands on the owner. For tax reporting, the listing owner receives a tax document covering the full booking amount, and the co-host receives one for what they were paid. Airbnb notes that limits may apply depending on where the host and co-host are located, so check the current terms in your own account.",
      },
      {
        type: "paragraph",
        text: "The payout tool only covers Airbnb stays. If the property is also listed elsewhere, or the co-host charges for things outside the booking, such as maintenance call-outs or a monthly fee, those will be invoiced separately.",
      },
      {
        type: "callout",
        title: "A note on HST",
        text: "A co-host's fee is a charge for a service, and a co-host who is registered for GST/HST will normally add it to their invoice. Ask whether a quote includes HST. Your own GST/HST position as an owner of short-term accommodation is a separate question, and one for your accountant.",
      },
      { type: "heading", level: 2, text: "Red flags in a co-host's pricing" },
      {
        type: "list",
        items: [
          "Guaranteed income: no co-host controls demand, seasonality or competition. If someone guarantees a figure, find out how it is funded and what conditions sit behind it",
          "Hidden minimums: a monthly minimum fee that applies when bookings are low turns a percentage model into a flat fee in the quiet months",
          "Long lock-ins: multi-year terms, or large penalties for ending early, remove your main protection against poor service",
          "The co-host owning the listing: if your property is listed in their account rather than yours, the listing, its reviews and its booking history are tied to their account. Ending the arrangement can mean starting again from zero",
          "Undisclosed markups: on cleaning, supplies or repairs, buried in a monthly statement",
          "A vague base: any percentage quote that does not say what it is calculated on",
        ],
      },
      {
        type: "paragraph",
        text: "On the listing point: Airbnb lets co-hosts with full access do almost everything on a listing, including designating themselves as the primary host shown to guests. That is a normal part of how co-hosting works, but the listing itself should stay in your account, with you as the listing owner. Our [guide to Airbnb co-hosting](/blog/what-is-airbnb-co-hosting) explains why that distinction matters.",
      },
      { type: "heading", level: 2, text: "Questions to ask before you sign" },
      {
        type: "list",
        ordered: true,
        items: [
          "What exactly is the percentage, or fee, calculated on? Show me on a real booking.",
          "Who receives the cleaning fee, and is cleaning ever billed to me on top of it?",
          "Is there a setup fee, a monthly minimum or any other fixed charge?",
          "Are supplies and repairs charged at cost, or with a markup?",
          "What can you spend without asking me first?",
          "Will you be paid through Airbnb's co-host payouts, by invoice, or both?",
          "Does your quote include HST?",
          "Whose account is the listing in, and what happens to it if we stop working together?",
          "How much notice do either of us need to give to end the agreement?",
        ],
      },
      {
        type: "paragraph",
        text: "A good co-host will be glad you asked. If you want to see how we answer them, our [Airbnb co-hosting](/services/airbnb-co-hosting) page sets out the scope, [how it works](/how-it-works) covers what is agreed in writing, and the [FAQ](/faq) covers fees, control and terms. When you are ready for a quote based on your property rather than an average, [request a free assessment](/become-a-host).",
      },
      { type: "heading", level: 2, text: "Sources" },
      {
        type: "list",
        items: [
          "https://www.airbnb.com/help/article/3389",
          "https://www.airbnb.com/help/article/1534",
          "https://www.airbnb.com/help/article/1857",
          "https://www.airbnb.com/e/local-partners",
        ],
      },
    ],
  },

  {
    slug: "airbnb-co-host-vs-property-manager",
    title: "Airbnb Co-Host vs Property Manager: Which Does Your Rental Need?",
    excerpt:
      "The real difference between co-hosting and full management is not the task list. It is who owns the listing, who receives the money, and what you are signing. Here is how to decide.",
    category: "co-hosting",
    publishedAt: "2026-10-18",
    author: "Viora Hosting",
    readingMinutes: 8,
    relatedServices: ["airbnb-co-hosting", "short-term-rental-management", "property-care"],
    relatedPosts: ["what-is-airbnb-co-hosting", "short-term-rental-management-checklist"],
    seoTitle: "Airbnb Co-Host vs Property Manager",
    seoDescription:
      "Airbnb co-host vs property manager: who controls the listing and payouts, contract terms, licensing, tax and insurance, and how to choose for your rental.",
    body: [
      {
        type: "paragraph",
        text: "If you have read our [introduction to Airbnb co-hosting](/blog/what-is-airbnb-co-hosting), you know the short version: a co-host helps run your listing while you stay the host of record, and a full-service manager takes the operation off your hands. This article goes a level deeper. The day-to-day work can look almost identical under both models. The differences that matter sit underneath it, in who controls the listing, where the money goes, what the contract says, and who carries the legal obligations.",
      },
      { type: "heading", level: 2, text: "Who controls the listing" },
      {
        type: "paragraph",
        text: "Under co-hosting, the listing lives in your Airbnb account. You invite the co-host through the co-hosts section of the listing editor and choose their permission level. Airbnb currently offers three:",
      },
      {
        type: "list",
        items: [
          "Full access: the co-host can manage nearly everything, including the calendar, pricing, reservations, the earnings dashboard and Resolution Center requests, and can invite or remove other co-hosts (but not add another full-access co-host)",
          "Calendar and messaging: the co-host can message guests and see the calendar, but cannot edit it",
          "Calendar only: the co-host can see the calendar, and nothing else",
        ],
      },
      {
        type: "paragraph",
        text: "Airbnb is clear on one limit that protects owners: co-hosts cannot view or change the listing owner's payout method or taxpayer information, whatever their permission level. And because the listing is yours, removing a co-host leaves the listing, its reviews and its history exactly where they were.",
      },
      {
        type: "paragraph",
        text: "Under full management, practice varies. Some managers work inside your account as a full-access co-host. Others list properties in their own account or through their own software, often alongside other platforms. That is not wrong, and it can be efficient, but it changes what you hold. If the listing sits in the manager's account, its reviews and ranking are attached to that account, and ending the relationship may mean rebuilding from scratch.",
      },
      { type: "heading", level: 2, text: "The host-of-record question" },
      {
        type: "paragraph",
        text: "Airbnb draws a distinction between the listing owner and the primary host. The listing owner is the account the listing belongs to. The primary host is the person guests see as their host, and a full-access co-host can designate themselves or another co-host as primary host. So a co-host can be the face of your listing while you remain its owner.",
      },
      {
        type: "paragraph",
        text: "Airbnb also says the listing owner remains responsible for all co-hosts on the listing, including any added by a full-access co-host. That is the practical meaning of host of record: when something goes wrong, the platform looks to the owner of the listing. Under co-hosting, that is you, with someone working on your behalf. Under full management in the manager's account, the manager is the host on the platform, and your relationship with them is governed by your contract rather than by Airbnb.",
      },
      { type: "heading", level: 2, text: "Who receives the payouts" },
      {
        type: "paragraph",
        text: "With co-hosting, Airbnb pays the listing owner. If you use Airbnb's co-host payout feature, you set up the split yourself: only the listing owner can create or edit a co-host's payout, and the co-host has to accept it. You see every booking's earnings, and you are paid directly. Airbnb sends the tax document for the full booking amount to the listing owner, and a separate one to the co-host for their share.",
      },
      {
        type: "paragraph",
        text: "With full management, the money often flows the other way. The manager collects the booking revenue, deducts their fee and expenses, and pays you the balance with a statement. That is convenient, but it means your visibility depends on the quality of their reporting. Ask how often you are paid, what the statement shows, whether funds are held in a separate trust account, and whether you can see the underlying booking data.",
      },
      { type: "heading", level: 2, text: "Contract terms" },
      {
        type: "paragraph",
        text: "Co-hosting arrangements tend to be lighter: a written scope, a fee, a spending limit and a notice period. Because the listing is yours, ending the arrangement is mostly a matter of removing the co-host and finishing any committed work. Full management contracts are usually longer and more detailed, which is reasonable given the manager is taking on more. Read these clauses in particular:",
      },
      {
        type: "list",
        items: [
          "Term and termination: the minimum length, the notice required and any early-exit fee",
          "Future bookings: who honours reservations already on the calendar when the contract ends, and who is paid for them",
          "Listing ownership: whose account the listing is in and whether it, its photos and its content transfer to you at the end",
          "Owner use: how you block dates for yourself, and whether there are limits on doing so",
          "Spending authority: what the manager can spend without asking, and how repairs are approved",
          "Markups: whether cleaning, supplies and maintenance are charged at cost",
          "Exclusivity: whether you can also list the property yourself or through anyone else",
        ],
      },
      {
        type: "callout",
        title: "Watch the bookings that outlast the contract",
        text: "Short-term rentals are booked months ahead. A contract that lets the manager keep all future reservations made before you gave notice can extend the relationship long after you thought it ended. Get the treatment of those bookings in writing at the start.",
      },
      { type: "heading", level: 2, text: "Licensing, tax and insurance" },
      {
        type: "paragraph",
        text: "This is where owners are most often surprised. Under either model, the legal obligations of owning a short-term rental generally stay with the owner. A good co-host or manager will help: Airbnb's Co-Host Network even lists licensing and permits among the services co-hosts can offer. Helping is not the same as being responsible.",
      },
      {
        type: "list",
        items: [
          "Municipal licensing: many Canadian municipalities require a short-term rental licence or registration, and some limit short-term rentals to a principal residence. Check whose name the licence will be in under your arrangement, and who is answerable if the rules are broken",
          "Income tax: rental income is yours to report, whoever collects it. Airbnb sends the listing owner a tax document for the full booking amount, even where part of it goes to a co-host",
          "GST/HST: since July 2021, short-term accommodation booked through platforms in Canada has been brought into the GST/HST system, with the platform collecting it in some cases and the registered owner in others. Whether you need to register depends on your situation, so ask your accountant",
          "Insurance: a standard home policy may not cover nightly rentals. Tell your insurer how the property is used and get confirmation in writing. Ask any manager what liability insurance they carry themselves",
          "Condominium rules: a condo declaration or bylaw can prohibit short-term rentals regardless of what the city allows",
        ],
      },
      {
        type: "paragraph",
        text: "We are not lawyers or accountants, and nor are most co-hosts or managers. Anyone who tells you compliance becomes entirely their problem should be asked to put that in the contract.",
      },
      { type: "heading", level: 2, text: "How the cost is structured" },
      {
        type: "paragraph",
        text: "Co-hosting is usually priced by scope. You pay for the parts you hand over, either as a share of each booking, a fixed amount per booking, a monthly fee or a charge per task, and you keep doing (and not paying for) the rest. If you set pricing yourself and only want messaging and turnovers covered, you pay for messaging and turnovers.",
      },
      {
        type: "paragraph",
        text: "Full management is usually priced as a single, larger share of revenue that covers the whole operation, from listing and pricing through guests, cleaning coordination, maintenance and reporting. Cleaning, supplies and repairs are often charged on top. Because the manager is carrying more of the work and risk, the share is normally higher than for a narrow co-hosting scope. Whichever you are comparing, ask what the percentage is calculated on, what is billed separately, and whether there are minimums. Our article on [how much an Airbnb co-host charges in Canada](/blog/how-much-does-an-airbnb-co-host-charge-canada) goes through those questions in detail.",
      },
      { type: "heading", level: 2, text: "Which does your rental need?" },
      { type: "heading", level: 3, text: "Choose co-hosting if…" },
      {
        type: "list",
        items: [
          "You want the listing, the reviews and the payouts to stay in your own account",
          "You enjoy, or want to keep, the business decisions: pricing, furnishing, who stays",
          "You live close enough to deal with the occasional issue, or simply want to stay involved",
          "You have one or two properties and need help with specific parts of the work",
          "You are new to hosting, or new to working with anyone, and want an arrangement that is easy to change",
          "You want to see every booking's numbers directly rather than through a statement",
        ],
      },
      { type: "heading", level: 3, text: "Choose full management if…" },
      {
        type: "list",
        items: [
          "You want the property genuinely off your plate and are happy to receive a report rather than make decisions",
          "You live far from the property, or travel often enough that you cannot be the backstop",
          "You own several properties and running them has become a job",
          "You want one party accountable for pricing, guests, cleaning and maintenance together",
          "You have read the contract, understand whose account the listing is in, and are comfortable with the exit terms",
        ],
      },
      {
        type: "paragraph",
        text: "Plenty of owners start with co-hosting and move to fuller management later, or the reverse. Neither choice is permanent if the contract is written fairly.",
      },
      { type: "heading", level: 2, text: "How Viora handles it" },
      {
        type: "paragraph",
        text: "We offer both. With [Airbnb co-hosting](/services/airbnb-co-hosting), the listing stays in your account, you remain the host of record and you choose what we take on. With [short-term rental management](/services/short-term-rental-management), we run the whole operation, with you still owning the property, setting spending limits and blocking dates for your own use. [How it works](/how-it-works) explains what gets agreed in writing. We work with owners anywhere in Canada, and we quote after a free assessment rather than from a price list, so if you are weighing the two, [request a free assessment](/become-a-host) and we will tell you honestly which one we think fits.",
      },
      { type: "heading", level: 2, text: "Sources" },
      {
        type: "list",
        items: [
          "https://www.airbnb.com/help/article/1534",
          "https://www.airbnb.com/help/article/3389",
          "https://www.airbnb.com/e/local-partners",
          "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/digital-economy.html",
        ],
      },
    ],
  },

  {
      slug: "ontario-short-term-rental-rules",
      title:
        "Short-Term Rental Rules in Ontario (2026): Toronto, Ottawa, Waterloo, Kitchener, London, Hamilton, Mississauga and Muskoka",
      excerpt:
        "Ontario has no single short-term rental law. Each city sets its own rules, and they differ a lot. Here is what Toronto, Ottawa, Waterloo, Kitchener, London, Hamilton, Mississauga and the Muskoka towns require in 2026, checked against each city's own pages.",
      category: "canadian-rental-market",
      publishedAt: "2026-10-18",
      author: "Viora Hosting",
      readingMinutes: 12,
      relatedServices: ["short-term-rental-management", "airbnb-co-hosting", "vacation-rental-management"],
      relatedPosts: ["short-term-rental-management-checklist", "what-is-airbnb-co-hosting"],
      seoTitle: "Ontario Short-Term Rental Rules by City (2026)",
      seoDescription:
        "Ontario short-term rental rules 2026: licences, principal-residence limits, night caps and accommodation tax in seven cities and Muskoka, checked at source.",
      body: [
        {
          type: "paragraph",
          text: "There is no single Ontario short-term rental law. The province leaves licensing to municipalities, so the rules for an Airbnb in Toronto have little in common with the rules for a cottage in Muskoka or a townhouse in Kitchener. Some cities only allow short-term rentals in the home you live in. Some cap the nights. One has decided not to license them at all.",
        },
        {
          type: "paragraph",
          text: "This guide covers the places Ontario owners ask us about most. We checked every rule against the municipality's own website, by-law or council report in October 2026, and every source is listed at the end. Where we could not confirm something from an official source, we say so rather than guess.",
        },
        {
          type: "callout",
          title: "Information, not legal advice",
          text: "These rules change often, and by-laws take precedence over the summaries on city websites. Before you list, buy or sign anything, confirm the current rules with the municipality and, where the stakes are high, with a lawyer or accountant.",
        },
        { type: "heading", level: 2, text: "Three things that apply everywhere in Ontario" },
        { type: "heading", level: 3, text: "1. Your condo or lease can say no, whatever the city says" },
        {
          type: "paragraph",
          text: "A city licence only means the municipality allows the rental. It does not override your condominium's governing documents. The Condominium Authority of Ontario states plainly that condo corporations can restrict short-term rentals through provisions in their governing documents. If your declaration or rules prohibit stays under a set length, a licence will not help you. Several cities, including Mississauga, London and Waterloo (for apartment units), ask for written proof from the condo board before they issue one. Tenants usually need written landlord permission too.",
        },
        { type: "heading", level: 3, text: "2. HST can apply" },
        {
          type: "paragraph",
          text: "The Canada Revenue Agency says that if you earn more than $30,000 in gross revenue over four calendar quarters from accommodation sharing, you must register for, collect and remit GST/HST. Since 1 July 2021, accommodation platforms have been required to collect and remit GST/HST on short-term accommodation supplied through them by hosts who are not registered. All income from accommodation sharing is also subject to income tax. How this plays out depends on your situation, so this is one to take to an accountant.",
        },
        { type: "heading", level: 3, text: "3. Non-compliant rentals lose their tax deductions" },
        {
          type: "paragraph",
          text: "This is the federal rule many owners have not heard of. For tax years after 2023, the CRA denies income-tax deductions for expenses of a non-compliant short-term rental. A short-term rental here means a residential property rented or offered for rent for less than 90 consecutive days. It is non-compliant if it is in a place where short-term rentals are not allowed, or if it does not meet all applicable provincial or municipal registration, licensing and permit requirements.",
        },
        {
          type: "paragraph",
          text: "The denied amount is prorated: total expenses, multiplied by the days the property was a non-compliant short-term rental, divided by the days it was a short-term rental in the year. Operating without a required licence can therefore cost you a share of your mortgage interest, insurance, utilities and other deductions as well as any municipal fines.",
        },
        { type: "heading", level: 2, text: "Toronto" },
        {
          type: "list",
          items: [
            "Registration: required before you operate, and renewed every year. A short-term rental is all or part of a dwelling rented for less than 28 consecutive days.",
            "Principal residence: short-term rentals are only allowed in your principal residence. Owners and tenants can both register, and only one registration is allowed per dwelling unit.",
            "Night cap: entire-unit registrations may rent for a maximum of 180 nights per calendar year. You can rent up to three bedrooms in your principal residence for an unlimited number of nights.",
            "Fee: the City lists a $390 registration fee, and a 2026 renewal fee of $390.",
            "Accommodation tax: operators must collect and remit a 6% Municipal Accommodation Tax (MAT), unless the platform collects it under an agreement with the City. A temporary 8.5% rate applied from 1 June 2025 to 31 July 2026.",
            "Listing: your City registration number must appear in every listing.",
            "Condos: condo rules can prohibit short-term rentals, and you must follow them.",
          ],
        },
        {
          type: "paragraph",
          text: "In practice, Toronto rules out the investment-condo model. If you own a second unit you do not live in, it cannot be a legal short-term rental in Toronto. Our [Toronto page](/locations/toronto) covers how we approach the city.",
        },
        { type: "heading", level: 2, text: "Ottawa" },
        {
          type: "list",
          items: [
            "Permit: hosts need a City-issued host permit under Short-Term Rental By-law 2021-104, and must re-apply every two years.",
            "Principal residence: permits are for your principal residence. There is a separate cottage rental permit for properties in the rural area, which is in addition to any principal-residence permit.",
            "Fee: the City's host requirements page lists $116 for a two-year permit. Older City pages show $110, so confirm the current amount when you apply.",
            "Accommodation tax: the City's MAT page states the rate is 6% from 1 January 2026, on stays under 30 days.",
            "Listing: the permit number must be shown on listings.",
            "Condos and rentals: condo and co-op owners can host in their principal residence unless their corporation or co-op prohibits it. Renters need landlord permission.",
          ],
        },
        {
          type: "paragraph",
          text: "We did not find a night cap in Ottawa's rules. Ottawa's website blocked direct reading of some pages while we checked, so the fee, MAT rate and listing rule above come from the City's own pages as indexed. Confirm them on ottawa.ca before relying on them.",
        },
        { type: "heading", level: 2, text: "Waterloo" },
        {
          type: "list",
          items: [
            "Licence: required for any rental of 30 days or less. A revised Rental Housing Licensing By-law came into force on 1 July 2026. Class B covers houses, townhouses and secondary units; Class S covers apartment units.",
            "Principal residence: the owner must live in the unit. The by-law defines owner-occupied as occupied by people holding at least 33% of the title. Tenants cannot license a short-term rental.",
            "Day cap: a maximum of 275 rental days per year, a maximum of 30 days per stay, and a maximum of five bedrooms.",
            "Fees: from $460 (one bedroom) to $600 (five bedrooms) for a new Class B licence, and $520 to $675 for Class S. Renewals are lower.",
            "New for 2026: a criminal record check for new applications submitted on or after 1 July 2026, government-issued photo ID, and a heating appliance inspection or declaration.",
            "Condos: Class S applicants need a letter from the building owner, property manager or condo board confirming short-term rentals are allowed.",
            "Listing: the by-law prohibits advertising a short-term rental without a licence. We did not find an explicit rule requiring the licence number in the listing, so confirm with the City.",
          ],
        },
        { type: "heading", level: 2, text: "Kitchener" },
        {
          type: "paragraph",
          text: "On 23 June 2025, Kitchener City Council decided not to pursue a municipal licensing program for short-term rentals, judging that the cost and staffing of a City-run system would be unsustainable. As of October 2026 we found no newer decision. There is no City short-term rental licence, principal-residence rule or night cap in Kitchener. Noise, property upkeep and similar complaints are handled through existing by-laws, including the Noise By-law and Property Standards By-law.",
        },
        {
          type: "paragraph",
          text: "That does not make Kitchener rule-free. Zoning, the Ontario Fire Code, your condo documents, your insurance policy and the tax rules above still apply. A 4% municipal accommodation tax is widely reported across Waterloo Region, but we could not confirm the current rate or who administers it from an official Kitchener or Region page. Check your platform's tax settings and ask the City. Kitchener could also revisit licensing, so it is worth watching. We manage homes in both Kitchener and Waterloo, and our [Waterloo Region page](/locations/waterloo-region) explains the local picture.",
        },
        { type: "heading", level: 2, text: "London" },
        {
          type: "list",
          items: [
            "Licence: a Short-Term Accommodation Provider Licence has been required since 1 February 2023, before you advertise or host. Short-term means stays of 28 days or less.",
            "Principal residence: the rental must be at your resident address, the place where you normally live. It can be owned or rented.",
            "One licence per host: from 1 October 2026, each provider is limited to one short-term accommodation, one Provider Licence and one ownership interest in a unit used as a short-term accommodation. Until 30 September 2026, providers could hold up to two at the same address. The City's FAQ still mentions a second unit on the same property, so if that applies to you, confirm with the City how the two rules fit.",
            "Fees: $552 for a new application, made up of a $201 annual licence and a one-time $351 inspection fee.",
            "Inspections: as of 31 March 2026, every short-term accommodation must pass a property standards inspection and a fire safety inspection.",
            "Accommodation tax: a MAT plus HST, shown as a separate line on each guest receipt. The City's licensing page says 4%, but its MAT page and by-law give 5% from 1 May 2025, so confirm the current rate with the City.",
            "Listing: the licence number must appear in all advertisements and listings.",
            "Condos and rentals: condo owners need written authorization from the board, and renters need written authorization from the landlord.",
            "Other: unhosted rentals may offer no more than five bedrooms, and a local emergency contact must be able to attend within one hour.",
          ],
        },
        {
          type: "paragraph",
          text: "We did not find a night cap in London's rules. We manage a home in London, and our [London page](/locations/london-ontario) covers how we approach the city.",
        },
        { type: "heading", level: 2, text: "Hamilton" },
        {
          type: "list",
          items: [
            "Licence: required. A short-term rental is all or part of a dwelling rented for less than 28 consecutive days.",
            "Principal residence: allowed only in the operator's principal residence. Operators are limited to one licence, and commercial or multi-listing operations are prohibited. A corporation cannot have a principal residence.",
            "Fees: set on a cost-recovery basis and published in the City's Business Licence Reference Guide. We could not confirm the current amounts, and third-party figures disagree, so check with the City.",
            "Accommodation tax: from 1 July 2026, licensed short-term rental operators must collect and remit a 4% MAT on stays of 29 consecutive days or less. The City says Airbnb, VRBO and Booking.com are not currently collecting it for Hamilton operators, so operators remain responsible.",
            "Other: at least $1,000,000 of liability insurance, a maximum of two overnight guests per sleeping room, a 24/7 emergency contact and a fire escape plan.",
            "Condos and rentals: condo board or property owner approval is required where applicable.",
          ],
        },
        {
          type: "paragraph",
          text: "We did not find a night cap or an explicit listing-number rule on Hamilton's short-term rental page.",
        },
        { type: "heading", level: 2, text: "Mississauga" },
        {
          type: "list",
          items: [
            "Licence: required before you advertise or host, valid for one year, with a City inspection before it is issued. Short-term means 30 consecutive days or less.",
            "Principal residence: you can only operate from your principal residence, so you can only have one short-term rental in Mississauga. If the property has a secondary or laneway suite, you can only rent the part you live in.",
            "Night cap: the City's 2026 operator guide lists 'not rented for more than 180 days per calendar year' as an inspection item.",
            "Fee: $283 per year, according to the 2026 operator guide.",
            "Applicant requirements: a Peel Regional Police criminal record check issued in the last 60 days, and at least $2 million of liability insurance.",
            "Accommodation tax: 6% MAT, reported monthly. Some platforms collect it for you, so confirm with yours.",
            "Listing: your licence number must appear on every advertisement.",
            "Condos and rentals: condo owners must provide proof that short-term rentals are permitted, and renters need written landlord permission.",
          ],
        },
        { type: "heading", level: 2, text: "Muskoka" },
        {
          type: "paragraph",
          text: "Muskoka is different from the cities above. The area municipalities, not the District, license short-term rentals, and most of them are not limited to principal residences, because cottages are the point. Each one sets its own fees and conditions. These are the ones we confirmed.",
        },
        {
          type: "list",
          items: [
            "Township of Muskoka Lakes: an annual licence under By-law 2025-049 for stays of 28 days or less. The fee is $1,000 for Waterfront and R4 zoned properties and $500 elsewhere. From 1 May 2026, Waterfront and R4 rentals must take at least seven consecutive nights off in each of June, July and August, and between the Friday before Victoria Day and the Tuesday after Labour Day only one rental group is allowed per six consecutive nights. The limit is two people per bedroom unless the septic system supports more, and the licence number must be on all advertisements.",
            "Town of Huntsville: a licence for rentals of 30 days or less, capped at 250 units on a first-come basis. You must own the property for a full year before applying. 2026 fees are $750 (principal residence) or $1,000 (secondary residence) for new licences, and $375 or $750 to renew. New short-term rentals are no longer allowed in the Urban Low Density (UR1) precinct, and three valid complaints in two years means revocation. Operators must collect MAT; confirm the rate with the Town.",
            "Town of Bracebridge: an annual licence costing $1,500, with a demerit point system. A 4% MAT has applied since 1 October 2025.",
            "Town of Gravenhurst: a licence for stays of 28 days or less, required before you advertise. The 2026 fee is $800. A 4% MAT applies, remitted quarterly through ORHMA.",
            "Township of Lake of Bays: a licence under By-law 2024-065; renting without one is unlawful. Fees are in the Township's Fees and Charges By-law. A 4% MAT applies to licensed short-term rentals from 1 January 2026.",
            "Township of Georgian Bay: we could not confirm current rules from an official source. Contact the Township before listing.",
          ],
        },
        {
          type: "paragraph",
          text: "If you are buying a cottage with rental income in mind, check the zoning, the licence cap and the septic capacity before you make an offer. Our [Muskoka page](/locations/muskoka) covers how we approach cottage rentals there.",
        },
        { type: "heading", level: 2, text: "What this means for owners: a city-by-city summary" },
        {
          type: "list",
          items: [
            "Toronto: registration required; principal residence only; 180-night cap on entire units; $390; 6% MAT; number on listing.",
            "Ottawa: two-year host permit; principal residence, plus a rural cottage permit; no night cap found; $116 (confirm); 6% MAT; number on listing.",
            "Waterloo: licence required; owner must live in the unit; 275 days a year and 30 days a stay; $460 to $675 new; MAT not confirmed; criminal record check for new applications.",
            "Kitchener: no City licence, no principal-residence rule, no cap; other by-laws, zoning, condo rules and tax still apply; MAT not confirmed.",
            "London: licence required; resident address only; one licence per host from 1 October 2026; no night cap found; $552 first year; MAT of 4% or 5% (City pages differ, confirm); number on listing.",
            "Hamilton: licence required; principal residence and one licence only; no night cap found; fee not confirmed; 4% MAT from 1 July 2026.",
            "Mississauga: licence required; principal residence only; 180 days a year; $283; 6% MAT; number on listing.",
            "Muskoka: licensing by each town or township; cottages generally allowed; fees from $500 to $1,500; 4% MAT in Bracebridge, Gravenhurst and Lake of Bays; summer limits on Muskoka Lakes waterfront.",
          ],
        },
        {
          type: "paragraph",
          text: "The pattern is clear. In most of urban Ontario, a short-term rental has to be the home you live in. If you are weighing an investment property, it will usually need to be a long-term rental, a mid-term furnished rental of more than the local short-term threshold, or a cottage in a municipality that allows it.",
        },
        { type: "heading", level: 2, text: "Before you list: a short checklist" },
        {
          type: "list",
          ordered: true,
          items: [
            "Read your condo declaration, by-laws and rules, or your lease. If they prohibit short stays, stop there.",
            "Confirm the municipality's current licence, fees and caps on its own website.",
            "Get the licence before you advertise. Most of these cities treat advertising without one as an offence.",
            "Put the licence or registration number in every listing where the city requires it.",
            "Find out whether your platform collects MAT and HST for you, or whether you must.",
            "Track your nights or days if your city has a cap.",
            "Keep records showing you were licensed, because the CRA can deny deductions for any non-compliant period.",
          ],
        },
        {
          type: "paragraph",
          text: "Our [short-term rental management checklist](/blog/short-term-rental-management-checklist) covers the operating side once the rental is legal. If you want help running a compliant rental, our [Airbnb co-hosting](/services/airbnb-co-hosting) and [short-term rental management](/services/short-term-rental-management) services work with owners anywhere in Canada. Licensing, tax and insurance stay your responsibility as the owner, but we help keep them on track. You can [tell us about your property](/become-a-host) to start.",
        },
        { type: "heading", level: 2, text: "Sources (last checked October 2026)" },
        {
          type: "list",
          items: [
            "Canada Revenue Agency, Changes to rules for eligible deductions from short-term rental income: https://www.canada.ca/en/revenue-agency/news/newsroom/tax-tips/tax-tips-2025/changes-rules-eligible-deductions-short-term-rental-income.html",
            "Canada Revenue Agency, Sharing economy: https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/compliance/platform-economy/sharing-economy.html",
            "Canada Revenue Agency, Find out if you need to register for the GST/HST (digital economy): https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/digital-economy-gsthst/find-out-need-register.html",
            "Condominium Authority of Ontario, What are short-term rentals and can condos restrict them: https://www.condoauthorityontario.ca/knowledge-base/what-are-short-term-rentals-and-can-condos-restrict-them/",
            "City of Toronto, Short-Term Rental Operators/Hosts: https://www.toronto.ca/community-people/housing-shelter/rental-housing-rights-information/short-term-rentals/short-term-rental-operators-hosts/",
            "City of Toronto, Short-Term Rental Municipal Accommodation Tax: https://www.toronto.ca/community-people/housing-shelter/rental-housing-rights-information/short-term-rentals/short-term-rental-operators-hosts/short-term-rental-municipal-accommodation-tax/",
            "City of Toronto, Municipal Accommodation Tax, Guests: https://www.toronto.ca/services-payments/property-taxes-utilities/municipal-accommodation-tax/guests/",
            "City of Ottawa, Requirements for a short-term rental host: https://ottawa.ca/en/business/permits-and-licences/short-term-rentals/requirements-short-term-rental-host",
            "City of Ottawa, Short-Term Rentals: https://ottawa.ca/en/business/permits-and-licences/short-term-rentals/short-term-rentals",
            "City of Ottawa, Short-Term Rental Host Application Form: https://app06.ottawa.ca/online_services/forms/bylaws/short_term_rental_host_operator_en.pdf",
            "City of Ottawa, Hotel and short term accommodation tax: https://ottawa.ca/en/living-ottawa/taxes/hotel-and-short-term-accommodation-tax",
            "City of Waterloo, Get a short-term rental licence: https://www.waterloo.ca/building-and-renovating/residential-rental-licences/get-a-short-term-rental-licence/",
            "City of Waterloo, Rental Housing Licensing Bylaw: https://www.waterloo.ca/bylaws-and-enforcement/bylaw-directory/rental-housing-licensing-bylaw/",
            "City of Kitchener (EngageWR), Council decides against licensing short-term rentals: https://www.engagewr.ca/shorttermrentals/council-decides-against-licensing-short-term-rentals",
            "City of London, Short-term accommodation licensing: https://london.ca/business-development/business-licences/short-term-accommodation-licensing",
            "City of London, Municipal Accommodation Tax: https://london.ca/municipal-accommodation-tax-mat",
            "City of Hamilton, Short-Term Rentals: https://www.hamilton.ca/build-invest-grow/starting-small-business/business-licences/short-term-rentals",
            "City of Hamilton, Communication Update, MAT Implementation for Short-Term Rentals (17 June 2026): https://www.hamilton.ca/sites/default/files/2026-06/comm-update-Municipal-Accommodation-Tax-%28MAT%29-Implementation-for-STR.pdf",
            "City of Mississauga, Short-term rental operator's guide 2026: https://www.mississauga.ca/wp-content/uploads/2026/04/15112655/enf_ShortTermRental_handbook_25607_online_f.pdf",
            "Township of Muskoka Lakes, Short Term Rental Accommodations: https://www.muskokalakes.ca/township-hall/by-law-enforcement/short-term-rental-accommodations/",
            "Township of Muskoka Lakes, For Operators: Applications & Renewals: https://www.muskokalakes.ca/township-hall/by-law-enforcement/short-term-rental-accommodations/for-operators-applications-renewals/",
            "Town of Huntsville, Short Term Rental Licensing: https://www.huntsville.ca/business-development-environment/business-licensing-and-permits/short-term-rental-licensing/",
            "Town of Bracebridge, Short Term Rental Accommodations (STRA): https://www.bracebridge.ca/town-services/short-term-rental-accommodations-stra/",
            "Town of Gravenhurst, Short-Term Rental Accommodation Licences: https://www.gravenhurst.ca/business-building-development/business-licences/short-term-rental-accommodation-licences/",
            "Township of Lake of Bays, Short-term Rentals: https://www.lakeofbays.on.ca/invest-and-build/short-term-rentals/",
            "Township of Lake of Bays, Municipal Accommodation Tax: https://www.lakeofbays.on.ca/municipal-services/budget-and-finance/municipal-accommodation-tax/",
          ],
        },
      ],
    },

  {
    slug: "airbnb-taxes-canada",
    title: "Airbnb Taxes in Canada (2026): Income Tax, GST/HST and Municipal Accommodation Tax",
    excerpt:
      "How short-term rental income is taxed in Canada: rental or business income, which expenses count, the rule that denies deductions to non-compliant rentals, what Airbnb collects for you, and what is still your job.",
    category: "canadian-rental-market",
    publishedAt: "2026-10-18",
    author: "Viora Hosting",
    readingMinutes: 9,
    relatedServices: ["short-term-rental-management", "airbnb-co-hosting"],
    relatedPosts: ["short-term-rental-management-checklist", "what-is-airbnb-co-hosting"],
    seoTitle: "Airbnb Taxes in Canada: Income Tax, HST and MAT",
    seoDescription:
      "Airbnb taxes in Canada explained: T776 vs T2125, the deduction rule for non-compliant rentals, GST/HST, Ontario's accommodation tax and the records to keep.",
    body: [
      {
        type: "paragraph",
        text: "Tax on a short-term rental involves three levels of government: the federal government taxes your income and charges GST/HST, your province may add its own rules, and many municipalities charge an accommodation tax on top. This guide walks through each layer for owners anywhere in Canada, with Ontario examples where the rules are local.",
      },
      {
        type: "callout",
        title: "Information, not tax advice",
        text: "This article explains the general rules as published by the Canada Revenue Agency (CRA), provincial governments and municipalities, as we found them in October 2026. It is not tax or legal advice, and it cannot account for your circumstances. Rules and rates change. Before you file or make a decision based on anything here, confirm it with the CRA or a qualified accountant.",
      },
      { type: "heading", level: 2, text: "Your Airbnb income is taxable" },
      {
        type: "paragraph",
        text: "There is no minimum below which short-term rental income stops counting. If you earn money renting a room, a suite or a whole property, it goes on your tax return. Platforms also report to the CRA: under the Reporting Rules for Digital Platform Operators, in force since 1 January 2024, platforms that facilitate rentals of property in Canada report details such as the listing address, the number of days rented and the amounts paid to hosts. Assume the CRA already knows roughly what you earned.",
      },
      { type: "heading", level: 2, text: "Rental income or business income: T776 or T2125?" },
      {
        type: "paragraph",
        text: "The first question is what kind of income you are earning, because it decides which form you fill in. The CRA's test is about the services you provide, not the platform you list on.",
      },
      {
        type: "list",
        items: [
          "Rental income from property (Form T776, Statement of Real Estate Rentals): in most cases, if you rent out space and provide only basic services such as heat, utilities, parking and laundry facilities, the CRA treats the income as rental income.",
          "Business income (Form T2125, Statement of Business or Professional Activities): if you provide additional services such as meals, security or cleaning, the income may be business income. In the CRA's words, the more services you provide, the greater the chance that your rental operation is a business.",
        ],
      },
      {
        type: "paragraph",
        text: "Many short-term rentals sit somewhere in between, and no single rule draws the line. If you are unsure which side you fall on, settle it with an accountant early, because it decides which form you file and how some expenses are treated.",
      },
      { type: "heading", level: 2, text: "What you can deduct" },
      {
        type: "paragraph",
        text: "Current expenses recur and give a short-term benefit, and you deduct them in the year you incur them. The CRA's list includes advertising, insurance, interest and bank charges, office expenses, legal and accounting fees, management and administration fees, repairs and maintenance, salaries and wages, property taxes, travel, utilities, motor vehicle expenses and other costs such as condominium fees.",
      },
      {
        type: "paragraph",
        text: "Capital expenses give a benefit that lasts for years: the purchase price of the property, the furniture and equipment you rent with it, and renovations that improve it beyond its original condition. Instead of deducting these at once, you may claim capital cost allowance (CCA) over several years. The CRA's example: repairing wooden steps is a current expense, replacing them with concrete is a capital one. You cannot use CCA to create or increase a rental loss.",
      },
      {
        type: "list",
        items: [
          "If you rent out part of your own home, deduct only the share of shared costs that relates to the rented area. The CRA accepts a reasonable split by square metres or number of rooms.",
          "You cannot deduct the value of your own labour.",
        ],
      },
      { type: "heading", level: 2, text: "The 2024 rule: no deductions for non-compliant short-term rentals" },
      {
        type: "paragraph",
        text: "For tax years after 2023, the federal government denies income tax deductions for expenses related to non-compliant short-term rentals. It applies to both forms, T776 and T2125.",
      },
      {
        type: "list",
        items: [
          "A short-term rental, for this rule, is a residential property rented or offered for rent for less than 90 consecutive days.",
          "It is non-compliant if it is located in a province or municipality that does not permit short-term rentals at that location, or if it does not comply with all applicable provincial or municipal registration, licensing and permit requirements.",
          "The denied amount is prorated by days: the expenses you would otherwise deduct, multiplied by the number of non-compliant days, divided by the number of short-term rental days in the year. Capital cost allowance is caught too.",
          "For 2024 only, a rental that became compliant by 31 December 2024 was treated as compliant for the whole of 2024. That relief does not carry forward to 2025 or later years.",
        ],
      },
      {
        type: "paragraph",
        text: "In practice, if your city requires a licence or registration and you operate without one, you can be taxed on gross rental income with no deduction for interest, property tax, cleaning or anything else for the non-compliant days. The CRA also expects documents showing the location allowed short-term rentals and that you met every registration and licensing requirement. Toronto, for example, requires operators to register with the city, and London requires a business licence. Check your own municipality and province before you list. Our [short-term rental management checklist](/blog/short-term-rental-management-checklist) covers licensing alongside the other setup steps.",
      },
      { type: "heading", level: 2, text: "GST/HST on short-term rentals" },
      {
        type: "paragraph",
        text: "Long-term residential rents of one month or more are exempt from GST/HST. Short-term accommodation is different: the CRA treats continuous stays of less than one month as taxable. The rate is the one for the province where the property is: 13% HST in Ontario, 14% HST in Nova Scotia, 15% HST in New Brunswick, Newfoundland and Labrador and Prince Edward Island, and 5% GST everywhere else.",
      },
      { type: "heading", level: 3, text: "The small supplier threshold" },
      {
        type: "paragraph",
        text: "You generally have to register for, charge and remit GST/HST once your taxable revenue goes over $30,000, either in a single calendar quarter or over four consecutive calendar quarters. The threshold counts your worldwide taxable revenue plus that of any associates, not just one listing. Below it you are a small supplier and registration is optional. Some hosts register voluntarily to claim input tax credits, but that commits them to charging tax and filing returns. Exactly which revenue counts towards your threshold when a platform has been collecting tax for you is a question to confirm with the CRA or an accountant.",
      },
      { type: "heading", level: 3, text: "What Airbnb handles, and what it does not" },
      {
        type: "paragraph",
        text: "Since 1 July 2021, the federal digital economy rules make a platform operator that facilitates short-term accommodation in Canada responsible for the GST/HST when the host is not registered. The CRA describes the accommodation covered as a stay of less than one month costing more than $20 per night. In practice this splits hosts into two groups.",
      },
      {
        type: "list",
        items: [
          "If you are not registered: Airbnb charges and remits the GST/HST (and QST in Quebec) on your Airbnb bookings. Its help centre says this covers the listing price including cleaning fees, for stays of 30 nights or less.",
          "If you are registered: you remain responsible for charging and remitting the tax yourself, even on platform bookings. Airbnb asks registered hosts for their GST/HST (and QST) number so it does not add the tax on top, and you report it on your own GST/HST return.",
          "Either way, Airbnb's collection does not cover bookings you take directly. If you are registered, you charge the tax on those yourself.",
        ],
      },
      {
        type: "paragraph",
        text: "Airbnb also collects some provincial taxes, such as provincial sales tax in British Columbia, Manitoba and Saskatchewan, Alberta's tourism levy and Quebec's lodging tax. The current list is on Airbnb's help centre page on tax collection in Canada, and it only covers bookings made on Airbnb.",
      },
      { type: "heading", level: 2, text: "Municipal Accommodation Tax (MAT) in Ontario" },
      {
        type: "paragraph",
        text: "Ontario lets single-tier and lower-tier municipalities choose to charge a tax on transient accommodation, usually called the Municipal Accommodation Tax. Each municipality that adopts it sets its own rate and scope, and must share part of the revenue with an eligible not-for-profit tourism organization. The guest pays it, but the operator is responsible for seeing that it is collected and remitted.",
      },
      { type: "heading", level: 3, text: "Toronto" },
      {
        type: "paragraph",
        text: "Registered short-term rental operators in Toronto must collect and remit a 6% MAT on all rentals. A temporary increase to 8.5% ended on 1 August 2026, so check which rate applied when you reconcile earlier periods. A platform can sign a voluntary collection agreement with the city to collect MAT for its hosts, and Airbnb lists Toronto as a place where it does. Even so, Toronto says operators must file a MAT report for every quarterly period, due within 30 days of the quarter's end, even if no tax was collected or a platform collected it. See our [Toronto page](/locations/toronto).",
      },
      { type: "heading", level: 3, text: "London" },
      {
        type: "paragraph",
        text: "London has applied its MAT to short-term rentals since 1 October 2022, on the room cost for stays of less than 30 nights. The city's MAT page and by-law give the rate as 5%, effective 1 May 2025, but its short-term accommodation licensing page still describes a 4% MAT plus HST per stay, so confirm the current rate with the City of London. The licensing page says the MAT must appear as a separate line on each guest receipt, and the city has designated the Ontario Restaurant Hotel & Motel Association (ORHMA) to help collect it. London was not on Airbnb's list of places where it collects MAT when we checked, so do not assume the platform is handling it.",
      },
      { type: "heading", level: 3, text: "Kitchener and Waterloo" },
      {
        type: "paragraph",
        text: "Airbnb's help centre lists a MAT it collects on bookings in the Waterloo Regional Tourism District, which includes Kitchener and Waterloo. We could not find the short-term rental rate on an official municipal page, so we have left it out. If you host in [Waterloo Region](/locations/waterloo-region), confirm the rate and your obligations with your city.",
      },
      {
        type: "callout",
        title: "Check who collects, then check who files",
        text: "A platform may collect a tax on its own bookings and still leave you with a filing obligation, as in Toronto, and it will not cover anything you book directly. For every tax that applies to your property, write down who collects it, who remits it and who files the return.",
      },
      { type: "heading", level: 2, text: "Your home, the principal residence exemption and change in use" },
      {
        type: "paragraph",
        text: "If you rent out a home you live in, or turn your old home into a short-term rental, think about capital gains as well as income. When a property has been your principal residence for every year you owned it, you generally pay no tax on the gain when you sell it, though you must still report the sale and designate the property on your return.",
      },
      {
        type: "list",
        items: [
          "Changing your whole home to a rental is treated as selling it at fair market value and buying it back at the same amount. Gains from that point on may be taxable.",
          "You can elect under subsection 45(2) of the Income Tax Act not to be treated as having changed the use, by attaching a letter to your return for that year. While the election is in effect you cannot claim CCA on the property.",
          "Renting part of your home usually counts as a change in use of that part, unless the rental use is small relative to your own use, you make no structural changes for it, and you claim no CCA on it.",
        ],
      },
      {
        type: "paragraph",
        text: "How these rules apply depends heavily on your situation. If you are about to convert a home, speak to an accountant before the first booking.",
      },
      { type: "heading", level: 2, text: "Record keeping" },
      {
        type: "paragraph",
        text: "The CRA expects detailed records of rental income and expenses, backed by invoices, receipts or contracts, generally kept for six years from the end of the tax year they relate to. Records about buying and selling the property should be kept longer. A simple system:",
      },
      {
        type: "list",
        items: [
          "Download platform payout reports every month and keep them with your bank statements.",
          "Keep receipts for every expense, and mark the ones shared with your own use of the property.",
          "Log nights booked, nights you used the property and nights it sat empty. You need this to split expenses.",
          "Keep your licence or registration, renewals and inspection results, with dates. Under the 2024 rule, this is tax documentation now.",
          "Keep your GST/HST and MAT filings and the platform statements showing what was collected for you.",
        ],
      },
      {
        type: "paragraph",
        text: "If you work with us on [full short-term rental management](/services/short-term-rental-management) or [co-hosting](/services/airbnb-co-hosting), you get statements you can pass straight to your accountant. We do not prepare tax returns or give tax advice.",
      },
      { type: "heading", level: 2, text: "When to talk to an accountant" },
      {
        type: "list",
        items: [
          "You are not sure whether your income is rental income or business income.",
          "Your taxable revenue is close to $30,000, or you are thinking about registering for GST/HST voluntarily.",
          "Your property was not licensed or registered for any part of a year since 2024.",
          "You are converting your home to a rental, renting part of it, or selling a property that was ever a rental.",
          "You own the property with someone else or through a corporation, or you are not a resident of Canada.",
          "You take direct bookings and need to collect GST/HST or MAT yourself.",
        ],
      },
      {
        type: "paragraph",
        text: "An hour with an accountant before you start costs far less than fixing several years of returns later. If you want help with the running of the property while your accountant handles the tax, [tell us about your property](/become-a-host) or read our [FAQ](/faq).",
      },
      { type: "heading", level: 2, text: "Sources (last checked October 2026)" },
      {
        type: "list",
        items: [
          "https://www.canada.ca/en/revenue-agency/news/newsroom/tax-tips/tax-tips-2025/changes-rules-eligible-deductions-short-term-rental-income.html",
          "https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/compliance/platform-economy/sharing-economy.html",
          "https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/t4036/rental-income.html",
          "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/rental-income/completing-form-t776-statement-real-estate-rentals/rental-expenses-you-deduct.html",
          "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/sole-proprietorships-partnerships/report-business-income-expenses/completing-form-t2125/expenses-section-form-t2125.html",
          "https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/compliance/reporting-rules-digital-platforms.html",
          "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/digital-economy-gsthst/charge-collect/platform-based-accommodation.html",
          "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/digital-economy.html",
          "https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/rc4022/general-information-gst-hst-registrants.html",
          "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html",
          "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12700-capital-gains/principal-residence-other-real-estate.html",
          "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/keeping-records/where-keep-your-records-long-request-permission-destroy-them-early.html",
          "https://www.ontario.ca/document/ontario-municipal-councillors-guide/9-fiscal-context",
          "https://www.toronto.ca/community-people/housing-shelter/rental-housing-rights-information/short-term-rentals/short-term-rental-operators-hosts/short-term-rental-municipal-accommodation-tax/",
          "https://www.toronto.ca/services-payments/property-taxes-utilities/municipal-accommodation-tax/",
          "https://london.ca/municipal-accommodation-tax-mat",
          "https://london.ca/by-laws/municipal-accommodation-tax-law-8290-227-0",
          "https://london.ca/business-development/business-licences/short-term-accommodation-licensing",
          "https://www.airbnb.com/help/article/2283",
        ],
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
