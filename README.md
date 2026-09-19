# VioraRental

Professional short-term rental co-hosting and property management in Canada.

A Next.js 15 (App Router) + TypeScript + Tailwind v4 site, built to ship today as a
static export to Hostinger and to grow into a direct-booking platform without a
rewrite.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # then edit the values
npm run dev                    # http://localhost:3000
```

Before shipping:

```bash
npm run verify                 # typecheck + build + post-build site audit
```

`npm run audit:site` checks the built export for duplicate titles and meta
descriptions, wrong canonicals, missing H1s, invalid JSON-LD, broken internal
links, images without alt text, and orphan pages. It exits non-zero on failure,
so it can gate a deploy.

---

## Deploying to Hostinger (static)

The default build (`DEPLOY_TARGET=static`) emits a fully static site to `./out`.

1. Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the live origin, with no
   trailing slash. Canonical tags, the sitemap and structured data all derive
   from it, so getting this wrong is the single most damaging config mistake.
2. `npm run verify`
3. Upload **the contents of `./out`** into `public_html` — the contents, not the
   folder itself.
4. Confirm `public_html/.htaccess` exists. It ships inside `out/` and carries
   the security headers, compression, caching and redirect rules.
5. In hPanel, issue the SSL certificate and confirm HTTPS serves correctly.
6. **Only then**, uncomment the HTTPS-redirect block and the canonical-host
   block in `.htaccess`, picking either www or apex — one or the other, never
   both reachable. HSTS is commented out for the same reason: it is hard to undo
   once browsers have cached it.
7. Submit `https://yourdomain/sitemap.xml` in Google Search Console.

Forms need an endpoint. On static hosting there is no server, so set
`NEXT_PUBLIC_FORM_ENDPOINT` to a form service (Formspree, Web3Forms, or
Hostinger's own handler). Until it is set, the forms tell the visitor the form is
not connected and to email instead — they never show a false success.

### Moving to a Node host later

Set `DEPLOY_TARGET=node` and:

1. Create `src/app/api/leads/route.ts`:
   ```ts
   export { POST } from "@/server/lead-handler";
   export const runtime = "nodejs";
   ```
2. Implement `deliver()` in [`src/server/lead-handler.ts`](src/server/lead-handler.ts).
3. Set `NEXT_PUBLIC_FORM_ENDPOINT=/api/leads`.

The handler is already written: schema re-validation, per-IP rate limiting, body
size cap, honeypot and timing checks, optional Turnstile verification. The
browser forms need no changes — they post wherever the env var points.

---

## Shareable preview (GitHub Pages)

**https://real-mug.github.io/viora-site/**

This repository is private, and GitHub Pages will not publish from a private
repository on a free plan. So the split is:

| Repo | Visibility | Holds |
| --- | --- | --- |
| `Real-Mug/viora` | private | the source (this repo) |
| `Real-Mug/viora-site` | public | the built `./out`, served by Pages |

`.github/workflows/publish-site.yml` rebuilds and force-pushes `./out` to
`viora-site` on every push to `main`. It authenticates with an ed25519 deploy
key — the public half is a read-write deploy key on `viora-site`, the private
half is the `SITE_DEPLOY_KEY` secret here. `GITHUB_TOKEN` cannot be used because
it is scoped to a single repository.

Never commit to `viora-site` by hand; the workflow force-pushes over it. The
preview builds with `NEXT_PUBLIC_BASE_PATH=/viora-site`, which is why every link
must go through `<Link>` or `next/image` rather than a hardcoded `/about`.

---

## Content: everything the team edits

All editable content lives in `src/content/` and `src/lib/config/site.ts`. No
page component contains hardcoded property, service or location data.

| File | What it holds |
| --- | --- |
| `src/lib/config/site.ts` | Brand, contact details, navigation, CTAs |
| `src/content/properties.ts` | Property records |
| `src/content/reviews.ts` | Guest and owner reviews (**empty by design**) |
| `src/content/services.ts` | Services offered |
| `src/content/locations.ts` | Service areas |
| `src/content/posts.ts` | Blog / resources articles |
| `src/content/faqs.ts` | FAQ content |

Adding a record to any of these automatically produces the page, the nav and
footer links, the sitemap entry, the internal links and the structured data.

### Adding a property

1. Copy a record in `src/content/properties.ts`.
2. Replace every field with verified information.
3. Put photography in `public/images/properties/<slug>/` and reference the
   filenames. JPG or WebP; roughly 1600×1067; compress before committing.
4. **Delete the `isPlaceholder: true` line.**
5. `npm run verify`.

---

## Honest-content rules this codebase enforces

These are structural, not stylistic. Breaking them takes deliberate effort.

- **No fabricated reviews.** `src/content/reviews.ts` ships empty. The review
  components render an explanatory empty state instead of testimonials.
- **No fake aggregate ratings.** `AggregateRating` structured data is emitted
  only from verified, non-placeholder reviews, and only above
  `MIN_REVIEWS_FOR_AGGREGATE`.
- **Sample properties are labelled.** With `NEXT_PUBLIC_CONTENT_MODE=placeholder`
  (the default) every sample carries a visible "Sample listing" badge. Set it to
  `live` and samples vanish from the site, the sitemap and the structured data.
- **No fake availability.** No calendar source is connected, so property pages
  say availability is confirmed directly rather than showing an invented one.
- **No fake booking or payment.** The stay panel produces a real price estimate
  from published rates and then routes to an enquiry. There is no checkout.
- **No invented company facts.** Phone, address, social profiles, founding date
  and team size are blank or marked `PLACEHOLDER` in `site.ts`, and the UI hides
  what is not set rather than showing a placeholder to visitors.

---

## Architecture

```
src/
  app/                    routes (App Router, all statically generated)
  components/
    analytics/            consent-gated GA4 loader and cookie banner
    forms/                accessible field primitives + the two lead forms
    layout/               header, footer, breadcrumbs, legal shell
    marketing/            hero, trust, services grid, how-it-works, CTA, FAQ
    property/             card, explorer (filters), gallery, stay panel
    reviews/              review card/list + the empty state
    seo/                  JSON-LD renderer
    ui/                   button, card, section, badge, accordion, icons
  content/                ALL editable content
  lib/
    config/               env + site config (nothing reads process.env directly)
    data/                 repository interfaces + the static implementation
    forms/                Zod schemas + submission adapter
    integrations/         seams for Airbnb, PMS, calendar, payments, CRM
    pricing/              quote engine (shared by UI and any future API)
    seo/                  metadata builder + JSON-LD builders
    types/                the domain model
  server/                 Node-host lead route handler (not wired by default)
```

### The seams that make later phases cheap

**Data access.** Pages depend on `PropertyRepository` / `ReviewRepository`
(`src/lib/data/repository.ts`), never on a concrete source. Moving to a CMS or
database means writing one class and changing three lines in
`src/lib/data/index.ts`. Every method is async already, so no call site changes.

**Pricing.** `buildQuote()` in `src/lib/pricing/quote.ts` is pure and isomorphic.
It already handles seasonal rates, weekend rates, length-of-stay discounts,
extra-guest fees, cleaning, pet, service fees and tax. The same function can back
a `/api/quote` endpoint with no duplication.

**Booking.** `BookingEngine` and `PaymentProvider` interfaces exist in
`src/lib/types/booking.ts`. The stay panel is already laid out for the flow;
flipping `bookingEngineAvailable` and implementing the interface adds the
availability check and checkout without touching the layout.

**Integrations.** `src/lib/integrations/index.ts` declares the provider
interfaces and a registry where everything is `configured: false`. The UI checks
the registry rather than assuming a capability exists.

**Property websites (both directions).** A property can live only at
`/properties/<slug>`, or additionally have its own domain. Set
`externalWebsiteUrl` on the record and a "Visit property website" button appears
and is added to the property's `sameAs` structured data. The standalone site
links back to its VioraRental property page as "Managed by VioraRental".

**Future dashboards.** `/owner/` and `/admin/` are already disallowed in
`robots.txt` so they can never be indexed by accident. Nothing else is stubbed —
there is no fake dashboard UI.

---

## SEO

- Per-page `title`, `description` and canonical through one builder
  (`src/lib/seo/metadata.ts`); the audit fails the build on duplicates.
- Canonicals match the trailing-slash form the static host actually serves, so
  no canonical points at a URL that redirects.
- JSON-LD: Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage,
  LodgingBusiness, ProfessionalService, Article. Ratings only when they qualify.
- Sitemap and robots generated from the same repository the pages use, so they
  cannot drift.
- Location pages exist only for markets marked `active`. There is deliberately
  no generator that fans a template across Canadian cities.
- Breadcrumbs are rendered and marked up from the same array.

## Performance

- Fully static HTML; ~102 kB shared First Load JS.
- Fonts self-hosted at build time by `next/font` — no third-party font request.
- Icons are inline SVG; no icon package.
- Zero third-party scripts unless `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set **and**
  the visitor accepts cookies.
- Images carry explicit dimensions; the hero and first card row are `priority`,
  everything else is lazy.
- Long-cache headers for fingerprinted assets, no-cache for HTML (`.htaccess`).

## Accessibility

Semantic landmarks, a skip link, one H1 per page, visible focus states, labelled
form controls with `aria-describedby` hints and errors, an error summary that
takes focus, a keyboard-navigable gallery with focus containment and Escape, a
`<details>`-based FAQ, `aria-current` on active nav, and `prefers-reduced-motion`
respected globally.

## Security

Input validated with Zod on the client and again server-side wherever it lands;
honeypot, timing and throttle checks on public forms; per-IP rate limiting in the
Node handler; CSP and security headers in `.htaccess`; no secrets in
`NEXT_PUBLIC_*`; no raw HTML rendered from content; external links carry
`rel="noopener noreferrer"`; exact property addresses are never published.

---

## Before launch

See [`docs/LAUNCH-CHECKLIST.md`](docs/LAUNCH-CHECKLIST.md). The items that
genuinely block launch are the legal pages (counsel review), the service-area
confirmation, real contact details, real photography, and the form endpoint.
