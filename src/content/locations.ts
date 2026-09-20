import type { ServiceArea } from "@/lib/types/location";

/**
 * SERVICE AREAS
 * ----------------------------------------------------------------------------
 * READ BEFORE LAUNCH
 *
 * 1. CONFIRM EVERY MARKET. A location page is a statement that VioraRental
 *    takes on work in that market. Set `active: false` for any market you do
 *    not serve - the page, its nav links, its sitemap entry and its structured
 *    data all disappear. Do not leave a market listed "to see if it ranks".
 *
 * 2. THE REGULATORY NOTES ARE A STARTING POINT, NOT LEGAL ADVICE. Short-term
 *    rental rules in Canada change frequently and vary by municipality, and
 *    several of these regimes have been amended recently. Verify each note
 *    against the current municipal or provincial source before launch, and
 *    re-check on a schedule. The pages tell owners to confirm the current
 *    requirements themselves, and that wording should stay.
 *
 * 3. DO NOT MASS-GENERATE THESE. There is intentionally no loop that fans a
 *    template across Canadian cities. Each record must carry content that is
 *    genuinely specific to the market, or it should not exist.
 */
export const serviceAreas: ServiceArea[] = [
  {
    slug: "waterloo-region",
    city: "Waterloo Region",
    province: "ON",
    active: true,
    summary:
      "Co-hosting and short-term rental management across Kitchener, Waterloo and Cambridge - the market our own managed properties sit in.",
    intro: [
      "Waterloo Region is where our own inventory is: a townhome in Kitchener and a family house in Waterloo, both run by the team that would run yours. Everything below comes from operating here rather than from a market report.",
      "Demand is unusual for a mid-sized Ontario market because it is driven by institutions rather than tourism. The University of Waterloo's co-op calendar moves students in and out on four-month cycles, Wilfrid Laurier and Conestoga add their own terms, and the tech corridor around Uptown Waterloo brings contractors and relocating staff who need somewhere furnished for weeks rather than nights. Grand River Hospital and St Mary's add a steady stream of visiting families and travelling medical staff.",
      "That mix rewards a different strategy from a cottage or a downtown Toronto condo. The strongest months here are rarely the ones a nightly-rate model would predict, and for many properties a blend of longer stays and shorter gaps earns more than chasing weekend bookings.",
    ],
    areasServed: [
      "Kitchener",
      "Waterloo",
      "Cambridge",
      "Uptown Waterloo",
      "Downtown Kitchener",
      "Elmira and Woolwich",
      "Baden and Wilmot",
    ],
    localNotes: [
      {
        title: "The rules differ between Kitchener and Waterloo, and the gap is large",
        body:
          "These are neighbouring cities with opposite regimes, so the address decides the strategy. The City of Waterloo licenses short-term rentals - defined as stays of 30 days or less - and requires that the owner lives in the unit, caps rentals at 275 days a year, and adds criminal record checks and further documentation for applications from 1 July 2026. Kitchener council rejected a proposed licensing programme in 2025 and currently has no equivalent licence. Confirm the current position with the city your property sits in before listing: this is the single most consequential local fact in the region, and it has changed more than once.",
      },
      {
        title: "Stays over 30 days are a different product, not a fallback",
        body:
          "Because Waterloo's licensing regime turns on the 30-day line, and because co-op terms and contract work run in months, mid-term furnished stays are a deliberate strategy here rather than what you do when nightly bookings dry up. They price differently, turn over far less often and attract a steadier guest - but they also change which platform, agreement and insurance you should be using.",
      },
      {
        title: "The calendar follows the universities, not the summer",
        body:
          "Co-op terms begin in January, May and September, and the weeks around each transition are the busiest of the year. Convocation and Orientation create short, sharp peaks, and Oktoberfest fills the region in October. February and the back half of December are genuinely quiet. Pricing set to a generic Ontario seasonal curve misses all of this.",
      },
      {
        title: "Parking, stairs and winter are the recurring operational facts",
        body:
          "Much of the region's rental stock is multi-level townhouses and older houses with stairs between floors, which needs saying plainly in a listing rather than discovered on arrival. Driveway parking is a genuine selling point to guests driving in from Toronto, and winter brings snow clearing obligations that have to be somebody's named responsibility before December.",
      },
    ],
    highlightedServices: ["airbnb-co-hosting", "short-term-rental-management", "revenue-management", "property-care"],
    coordinates: { lat: 43.4516, lng: -80.4925 },
    seoTitle: "Airbnb Co-Hosting in Kitchener and Waterloo",
    seoDescription:
      "Short-term rental co-hosting across Kitchener, Waterloo and Cambridge. Licensing-aware operations, mid-term stay strategy and turnovers run by a local team.",
  },

  {
    slug: "toronto",
    city: "Toronto",
    province: "ON",
    active: true,
    summary:
      "Short-term rental co-hosting and management for condo and house owners across Toronto, in a market shaped by principal-residence rules and building bylaws.",
    intro: [
      "Toronto is a dense, year-round market with steady business travel, a heavy events calendar and one of the most tightly regulated short-term rental regimes in the country. That combination rewards owners who run a genuinely professional operation and punishes those who treat it casually.",
      "The practical constraints here are less about demand and more about permission. Whether a property can be let short-term at all depends on the city's registration regime, the condominium declaration and rules, and in some buildings a blanket prohibition that no amount of listing work can get around.",
      "We work with Toronto owners on the operational side: guest communication that holds up against a demanding guest base, turnovers that fit around tight condo booking windows for elevators and loading bays, and listings that compete on clarity rather than price alone.",
    ],
    areasServed: [
      "Downtown and the Financial District",
      "Harbourfront and CityPlace",
      "King West and Liberty Village",
      "The Annex and Yorkville",
      "Leslieville and Riverside",
      "Midtown and Yonge-Eglinton",
      "North York centre",
      "Etobicoke lakeshore",
    ],
    localNotes: [
      {
        title: "Registration and principal residence",
        body:
          "Toronto operates a short-term rental registration regime, and entire-home rentals are tied to the operator's principal residence with an annual night cap. Registration numbers must appear on listings. Confirm current requirements and your own eligibility directly with the City of Toronto before listing - we will not take on a property that cannot be let lawfully.",
      },
      {
        title: "Condominium rules override everything",
        body:
          "Many downtown buildings restrict or prohibit short-term rentals in their declaration or rules, independently of what the city allows. Check your declaration and any board rules before you spend money on the unit. A building ban is the single most common reason a Toronto short-term rental plan does not proceed.",
      },
      {
        title: "Municipal Accommodation Tax",
        body:
          "Toronto applies a Municipal Accommodation Tax to short-term stays. Where a platform collects and remits it on your behalf, it still needs to be reflected correctly in your pricing and records.",
      },
      {
        title: "Operational realities",
        body:
          "Elevator and loading-dock bookings, concierge access procedures and visitor parking limits all shape how a turnover actually runs in a Toronto tower. Buildings with tight windows need cleaning scheduled days in advance, not the morning of.",
      },
    ],
    highlightedServices: ["airbnb-co-hosting", "listing-optimization", "guest-communication"],
    coordinates: { lat: 43.6532, lng: -79.3832 },
    seoTitle: "Airbnb Co-Hosting and Rental Management, Toronto",
    seoDescription:
      "Short-term rental co-hosting and property management for Toronto owners. Guest communication, turnovers, listing optimization and condo-aware operations.",
  },

  {
    slug: "vancouver",
    city: "Vancouver",
    province: "BC",
    active: true,
    summary:
      "Co-hosting and rental management for Vancouver owners, in a market where provincial and city rules tightly define what can be let short-term.",
    intro: [
      "Vancouver has consistent visitor demand across the year and a short-term rental framework that is among the strictest in Canada. British Columbia's provincial legislation and the city's own licensing regime both apply, and the two do not always work the same way.",
      "For owners, this means the first question is never how to price the property. It is whether the property qualifies at all, and under which set of rules.",
      "Where a property does qualify, the work is familiar: presenting it properly, holding a high standard of cleanliness in a competitive market, and responding to guests quickly enough that reviews stay strong.",
    ],
    areasServed: [
      "Downtown and Coal Harbour",
      "West End",
      "Yaletown",
      "Kitsilano",
      "Mount Pleasant",
      "Commercial Drive",
      "East Vancouver",
      "North Vancouver",
    ],
    localNotes: [
      {
        title: "Principal residence and licensing",
        body:
          "British Columbia's short-term rental legislation restricts short-term rentals to a host's principal residence in most communities, and the City of Vancouver requires a business licence with the licence number displayed on listings. There is also a provincial registry requirement for hosts. Verify your current obligations with both the province and the city before listing.",
      },
      {
        title: "Strata rules",
        body:
          "Strata corporations can restrict or prohibit short-term rentals, and strata bylaws apply regardless of whether you hold a city licence. Check your bylaws before committing to a short-term letting strategy.",
      },
      {
        title: "Seasonality is milder than it looks",
        body:
          "Vancouver's peak runs through the summer, but conferences, cruise season and a mild winter keep shoulder-season demand more usable than in most Canadian markets. Pricing set purely around July and August tends to leave the rest of the year underperforming.",
      },
      {
        title: "Parking is a booking factor",
        body:
          "Many Vancouver units have no parking or a single stall, and guests arriving by car treat that as a deciding detail. Getting it stated clearly and accurately in the listing prevents a predictable category of complaint.",
      },
    ],
    highlightedServices: ["airbnb-co-hosting", "guest-communication", "revenue-management"],
    coordinates: { lat: 49.2827, lng: -123.1207 },
    seoTitle: "Airbnb Co-Hosting and Rental Management, Vancouver",
    seoDescription:
      "Short-term rental co-hosting and management for Vancouver property owners, with licensing-aware operations, guest support and listing optimization.",
  },

  {
    slug: "montreal",
    city: "Montreal",
    province: "QC",
    active: true,
    summary:
      "Co-hosting and management for Montreal owners, in a market with provincial registration requirements and strong festival-driven seasonality.",
    intro: [
      "Montreal is one of Canada's strongest leisure markets, with a summer festival season that concentrates demand into a few months and a guest mix that skews heavily toward short city breaks.",
      "It is also a market with a distinct regulatory structure: Quebec operates a provincial registration regime for tourist accommodation, with registration numbers required on listings, alongside borough-level zoning rules that decide where short-term letting is permitted at all.",
      "We work with Montreal owners on operations, guest communication and seasonal pricing, with attention to the bilingual expectations of a significant share of guests.",
    ],
    areasServed: [
      "Le Plateau-Mont-Royal",
      "Ville-Marie and downtown",
      "Mile End",
      "Griffintown",
      "Old Montreal",
      "Rosemont-La Petite-Patrie",
      "Verdun",
    ],
    localNotes: [
      {
        title: "Provincial registration",
        body:
          "Quebec requires tourist accommodation establishments to be registered, with the registration number displayed on listings. Platforms are required to check for it. Confirm the current process and your eligibility with the relevant provincial authority before listing.",
      },
      {
        title: "Borough zoning decides where letting is allowed",
        body:
          "Montreal's boroughs set their own rules about where short-term rental is permitted, and the answer can change from one street to the next. Check the zoning for the specific address rather than assuming a neighbourhood-wide rule.",
      },
      {
        title: "Sharp seasonality",
        body:
          "Summer and the festival calendar carry the year, and winter is materially quieter outside specific events. Flat annual pricing leaves money on the table in July and leaves the calendar empty in February.",
      },
      {
        title: "Bilingual guests",
        body:
          "A meaningful share of guests arrive from within Quebec and expect to be able to deal with the property in French. Listings and guest communication that only work in English put those bookings at a disadvantage.",
      },
    ],
    highlightedServices: ["airbnb-co-hosting", "revenue-management", "guest-communication"],
    coordinates: { lat: 45.5019, lng: -73.5674 },
    seoTitle: "Airbnb Co-Hosting and Rental Management, Montreal",
    seoDescription:
      "Short-term rental co-hosting and management for Montreal owners: registration-aware operations, seasonal pricing and bilingual guest communication.",
  },

  {
    slug: "calgary",
    city: "Calgary",
    province: "AB",
    active: true,
    summary:
      "Co-hosting and rental management for Calgary owners, in a licensed market with strong event and corporate demand.",
    intro: [
      "Calgary is a comparatively accessible short-term rental market: licensing is required but the framework is workable, and the city does not impose the principal-residence restrictions found in Toronto or Vancouver.",
      "Demand has two distinct drivers. Corporate and relocation stays run through the year and favour longer bookings, well-equipped kitchens and a proper workspace. Event demand spikes hard around the Stampede and major conferences, and rewards owners who price for it deliberately.",
      "The property types that work here are also broader than in the dense eastern markets - townhouses and whole houses are viable in a way they often are not downtown.",
    ],
    areasServed: [
      "Beltline and downtown",
      "Kensington and Hillhurst",
      "Inglewood and Ramsay",
      "Bridgeland",
      "Mission and Cliff Bungalow",
      "Marda Loop",
      "University district",
    ],
    localNotes: [
      {
        title: "Business licensing",
        body:
          "Calgary requires a short-term rental business licence, with tiering based on the number of rooms or units. Licence numbers are expected on listings. Confirm the current requirements, fees and inspection obligations with the City of Calgary.",
      },
      {
        title: "Event demand is concentrated and predictable",
        body:
          "Stampede week and major conference dates are known well in advance. Properties priced on a flat annual rate consistently underprice these periods; properties priced only for them sit empty the rest of the year.",
      },
      {
        title: "Longer corporate stays",
        body:
          "Relocation and project-based stays of two weeks to two months are a real segment here. Properties set up for them - laundry, workspace, parking, a real kitchen - can build a more stable calendar than pure weekend letting.",
      },
      {
        title: "Winter operations",
        body:
          "Snow clearing on walkways and driveways is an operational obligation, not a nice-to-have, and it is a common source of complaints and safety risk at self-check-in properties.",
      },
    ],
    highlightedServices: ["short-term-rental-management", "revenue-management", "property-care"],
    coordinates: { lat: 51.0447, lng: -114.0719 },
    seoTitle: "Airbnb Co-Hosting and Rental Management, Calgary",
    seoDescription:
      "Short-term rental co-hosting and property management for Calgary owners: licensing-aware operations, event pricing and longer corporate stays.",
  },

  {
    slug: "muskoka",
    city: "Muskoka",
    province: "ON",
    active: true,
    summary:
      "Vacation rental management for cottage owners across Muskoka, where the season is short, suppliers are stretched and township rules differ.",
    intro: [
      "Muskoka concentrates most of its revenue into a short summer, with a shoulder season that works for the right property and a winter that does not work for most. That shape changes almost everything about how a property should be priced and run.",
      "It is also a market where operations are genuinely hard. Cleaners and trades are booked out months ahead in July and August, drive times between properties are long, and cottages carry systems - wells, septic, docks, propane, generators - that a city apartment does not have.",
      "We manage cottage properties with seasonal routines built in: opening and closing, systems checks between bookings, and guest expectations set properly before a family drives two and a half hours to get there.",
    ],
    areasServed: [
      "Township of Muskoka Lakes",
      "Bracebridge",
      "Gravenhurst",
      "Huntsville",
      "Port Carling",
      "Bala",
      "Lake of Bays",
    ],
    localNotes: [
      {
        title: "Township-level licensing",
        body:
          "Short-term rental rules in Muskoka are set township by township, and several townships operate licensing or registration regimes with occupancy limits and inspection requirements. Confirm the rules for the specific township your property sits in - they are not uniform across the region.",
      },
      {
        title: "Supplier capacity is the real constraint",
        body:
          "In peak season, cleaning and maintenance capacity is the limiting factor, not demand. Turnovers need to be locked in early, and a property without a committed cleaner going into June is a problem waiting to happen.",
      },
      {
        title: "Cottage systems need seasonal attention",
        body:
          "Water systems, septic, docks and heating all require opening and closing routines. Most serious mid-season failures at cottage properties trace back to something skipped at opening.",
      },
      {
        title: "Fire bans and weather",
        body:
          "Fire bans are common in dry summers and guests routinely arrive expecting a fire pit. Communicating restrictions in advance, and having a plan for storm-related power cuts and road conditions, avoids a predictable set of complaints.",
      },
    ],
    highlightedServices: ["vacation-rental-management", "property-care", "revenue-management"],
    coordinates: { lat: 45.0333, lng: -79.4167 },
    seoTitle: "Cottage and Vacation Rental Management, Muskoka",
    seoDescription:
      "Vacation rental management for Muskoka cottage owners: seasonal opening and closing, turnover coordination, guest support and seasonal pricing.",
  },

  {
    slug: "whistler",
    city: "Whistler",
    province: "BC",
    active: true,
    summary:
      "Management for Whistler owners, in a zoning-defined market with two strong seasons and demanding guest expectations.",
    intro: [
      "Whistler is one of the few Canadian markets with two genuine peak seasons: winter for the mountain, summer for the bike park and the trail network. That makes the annual calendar more workable than most resort markets, and it makes pricing more complicated.",
      "The defining constraint here is zoning. Whether a property may be let nightly is determined by its zoning and covenants, not by a licence you can apply for after the fact. Owners buying into the market should establish this before purchase, not after.",
      "Guest expectations are also high. Visitors are paying resort rates and comparing against hotels, so presentation, cleanliness and responsiveness carry more weight than in most markets.",
    ],
    areasServed: [
      "Whistler Village and Village North",
      "Upper Village and Blackcomb Benchlands",
      "Creekside",
      "Whistler Cay",
      "Alpine Meadows",
      "Nordic and Bayshores",
    ],
    localNotes: [
      {
        title: "Zoning determines whether nightly rental is permitted",
        body:
          "In Whistler, the right to rent nightly attaches to the property's zoning and covenants rather than to a licence any owner can obtain. Confirm the zoning for the specific property with the Resort Municipality of Whistler, and check any strata bylaws, before planning a short-term rental.",
      },
      {
        title: "Two peaks, two operations",
        body:
          "Winter brings ski gear, drying needs and snow clearing. Summer brings bikes, storage needs and different guest groups. Properties set up for only one season leave the other underperforming.",
      },
      {
        title: "Winter access is an operational risk",
        body:
          "The Sea to Sky Highway closes or slows in bad weather, guests arrive late, and turnover timing slips. Contingency communication matters more here than in city markets.",
      },
      {
        title: "Resort-standard expectations",
        body:
          "At resort nightly rates, guests compare the property against hotels. Small failures in cleanliness or response time cost proportionally more in reviews here than they would in a lower-priced market.",
      },
    ],
    highlightedServices: ["vacation-rental-management", "property-care", "guest-communication"],
    coordinates: { lat: 50.1163, lng: -122.9574 },
    seoTitle: "Whistler Vacation Rental Management",
    seoDescription:
      "Short-term rental management for Whistler owners: zoning-aware advice, two-season operations, turnover coordination and guest support.",
  },
];

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug && area.active);
}

export function activeServiceAreas(): ServiceArea[] {
  return serviceAreas.filter((area) => area.active);
}
