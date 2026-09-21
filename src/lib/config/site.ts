/**
 * Single source of truth for brand, contact and navigation data.
 *
 * NOTE FOR THE VIORARENTAL TEAM
 * Every value tagged `PLACEHOLDER` below is editable copy that needs a real
 * value before launch. Nothing here is invented as fact - phone, email, address
 * and social handles are intentionally blank or marked until you supply them.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  children?: NavLink[];
};

/**
 * Explicitly typed rather than `as const`: several of these values are empty
 * placeholders today, and literal inference would narrow `phone: ""` to the
 * type `""`, making every `contact.phone ? ...` check dead code.
 */
export type SiteConfig = {
  name: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  country: string;
  countryName: string;
  locale: string;
  contact: {
    email: string;
    phone: string;
    phoneDisplay: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    officeHours: string;
  };
  social: { label: string; href: string }[];
  analytics: { cookieConsentRequired: boolean };
};

export const siteConfig: SiteConfig = {
  name: "Viora Hosting",
  legalName: "Viora Hosting", // PLACEHOLDER: registered legal entity name
  tagline: "Short-term rental hosting for property owners in Canada.",
  shortDescription:
    "We host short-term rentals for Canadian owners. Listing, guests, turnovers and reporting - handled.",
  country: "CA",
  countryName: "Canada",
  locale: "en-CA",

  contact: {
    // PLACEHOLDER: replace with the real published inbox before launch.
    email: "hello@viorahosting.com",
    // PLACEHOLDER: leave empty to hide the phone link site-wide.
    phone: "",
    phoneDisplay: "",
    // PLACEHOLDER: a mailing/registered address enables LocalBusiness schema.
    // Leave the fields blank and the schema falls back to Organization only.
    address: {
      streetAddress: "",
      addressLocality: "",
      addressRegion: "",
      postalCode: "",
      addressCountry: "CA",
    },
    // PLACEHOLDER: e.g. "Mon-Fri 9:00-18:00 ET". Guest support hours are
    // described qualitatively on the site until these are confirmed.
    officeHours: "",
  },

  /** Only real, verified profiles belong here. Empty array renders no icons. */
  social: [],

  /** Used by the analytics layer and consent copy. */
  analytics: {
    cookieConsentRequired: true,
  },
};

/** Primary navigation. `Services` is the only dropdown. */
export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Airbnb Co-Hosting", href: "/services/airbnb-co-hosting", description: "Day-to-day operations, you keep ownership and control." },
      { label: "Short-Term Rental Management", href: "/services/short-term-rental-management", description: "End-to-end management for your rental." },
      { label: "Vacation Rental Management", href: "/services/vacation-rental-management", description: "Seasonal and cottage-country properties." },
      { label: "Listing Optimization", href: "/services/listing-optimization", description: "Content, structure and positioning that convert." },
      { label: "Guest Communication", href: "/services/guest-communication", description: "Professional messaging across the guest journey." },
      { label: "Revenue Management", href: "/services/revenue-management", description: "Data-informed pricing and booking strategy." },
      { label: "Property Care", href: "/services/property-care", description: "Cleaning, turnovers and maintenance coordination." },
    ],
  },
  { label: "Properties", href: "/properties" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Become a Host", href: "/become-a-host" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Properties", href: "/properties" },
      { label: "Reviews", href: "/reviews" },
      { label: "Become a Host", href: "/become-a-host" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Airbnb Co-Hosting", href: "/services/airbnb-co-hosting" },
      { label: "Short-Term Rental Management", href: "/services/short-term-rental-management" },
      { label: "Vacation Rental Management", href: "/services/vacation-rental-management" },
      { label: "Listing Optimization", href: "/services/listing-optimization" },
      { label: "Revenue Management", href: "/services/revenue-management" },
      { label: "Property Care", href: "/services/property-care" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Hosting Guides", href: "/blog/category/airbnb-hosting" },
      { label: "FAQs", href: "/faq" },
      { label: "Service Areas", href: "/locations" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Cookie Policy", href: "/legal/cookie-policy" },
      { label: "Booking Terms", href: "/legal/booking-terms" },
      { label: "Cancellation Policy", href: "/legal/cancellation-policy" },
    ],
  },
];

export const CTA = {
  primary: { label: "List Your Property", href: "/become-a-host" },
  secondary: { label: "Explore Properties", href: "/properties" },
  contact: { label: "Contact Viora Hosting", href: "/contact" },
} as const;
