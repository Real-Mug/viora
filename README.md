# Viora Hosting

Short-term rental hosting for property owners in Canada.

### 🔗 Live site — [real-mug.github.io/viora](https://real-mug.github.io/viora/)

Share that link with anyone. It needs no GitHub account and no login, and it
redeploys automatically on every push to `main`. Source and site live in this
one repository — see [Deployment](#deployment-github-pages).

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

## Deployment (GitHub Pages)

**https://real-mug.github.io/viora/**

Source and site live in this one repository.
`.github/workflows/publish-site.yml` builds the static export on every push to
`main`, audits it, and hands `./out` straight to Pages through
`actions/deploy-pages`.

This used to be a two-repo split: the build was force-pushed to a public
`Real-Mug/viora-site` because Pages will not serve from a private repository on
the free plan. This repo is public now, so that second repo, its ed25519 deploy
key and the `SITE_DEPLOY_KEY` secret are all gone.

A project site is served from `/<repo>/`, so the workflow builds with
`NEXT_PUBLIC_BASE_PATH=/viora`. That is why every link must go through `<Link>`
or `next/image` rather than a hardcoded `/about`.

---

## Content: everything the team edits

All editable content lives in `src/content/` and `src/lib/config/site.ts`. No
page component contains hardcoded property, service or location data.

| File | What it holds |
| --- | --- |
| `src/lib/config/site.ts` | Brand, contact details, navigation, CTAs |
| `src/content/properties.ts` | Property records (the two live Airbnb listings) |
| `src/content/reviews.ts` | Written guest and owner reviews (**empty by design**) |
| `src/content/services.ts` | Services offered |
| `src/content/locations.ts` | Service areas |
| `src/content/posts.ts` | Blog / resources articles |
| `src/content/faqs.ts` | FAQ content |

Adding a record to any of these automatically produces the page, the nav and
footer links, the sitemap entry, the internal links and the structured data.

### Adding a property

1. Copy a record in `src/content/properties.ts`.
2. Replace every field with verified information, taken from the listing
   itself rather than written from memory.
3. Put photography in `public/images/properties/<slug>/` and reference the
   filenames. WebP, roughly 1600×1067, compressed before committing.
4. Leave `pricing` out unless there is a real published nightly rate. An
   absent `pricing` renders as "Rates on request", which is accurate; an
   invented number is not.
5. Fill `externalRating` from the listing page, including `checkedAt`. It is
   shown as that platform's figure, linked to its source, and is never folded
   into a Viora Hosting average.
6. Do not set `isPlaceholder`. It exists only for demo records, and none ship
   any more.
7. `npm run verify`.

---

## Honest-content rules this codebase enforces

These are structural, not stylistic. Breaking them takes deliberate effort.

- **No fabricated reviews.** `src/content/reviews.ts` ships empty. The review
  components render an explanatory empty state instead of testimonials.
- **No fake aggregate ratings.** `AggregateRating` structured data is emitted
  only from verified, non-placeholder reviews, and only above
  `MIN_REVIEWS_FOR_AGGREGATE`.
- **No sample properties ship.** Both published records are real inventory,
  transcribed from their live Airbnb listings. The placeholder machinery is
  still there for future use: a record marked `isPlaceholder` carries a visible
  "Sample listing" badge under `NEXT_PUBLIC_CONTENT_MODE=placeholder` (the
  default) and vanishes entirely from the site, sitemap and structured data
  under `live`. Nothing currently sets it.
- **Platform ratings are never passed off as ours.** A property's
  `externalRating` is shown as that platform's published figure for that
  listing, with a link to it and the date it was last checked. It is not mixed
  into any Viora Hosting average, and it is not a substitute for a written
  review.
- **No prices are invented.** Airbnb quotes a nightly rate only once dates are
  chosen, so both records omit `pricing` and the UI says "Rates on request"
  rather than publishing a guess.
- **No fake availability.** No calendar source is connected, so property pages
  say availability is confirmed directly rather than showing an invented one.
- **No fake booking or payment.** The stay panel routes to an enquiry, never a
  checkout. Where a record publishes rates it shows an itemised estimate from
  them; where it does not, as today, it says "Rates on request" and links to
  the Airbnb listing.
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
    reviews/              review card/list, per-property grouping, scrolling
                          wall, and the empty state
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
links back to its Viora Hosting property page as "Managed by Viora Hosting".

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

## Hero background video

The home hero can play a muted, looping clip behind the headline. **No footage
ships with the repository.** With nothing at `public/video/`, the hero renders
the photograph and nothing else — the video layer removes itself, along with its
pause control. Adding the two files turns it on; no code change is needed.

### Adding or swapping footage

1. Get a clip you are licensed to use. It wants to be calm and slow-moving —
   bright Canadian homes, a cozy interior, a summer garden — with no audio and
   no recognisable faces. [Pexels](https://www.pexels.com/videos/) and
   [Coverr](https://coverr.co/) both allow commercial use without attribution;
   keep a note of the source URL and licence with the project records.

2. Encode it:

   ```bash
   node scripts/encode-hero-video.mjs ~/Downloads/clip.mp4 --seconds 15 --crossfade 0.8
   ```

   That writes `public/video/home-hero.mp4` and `public/video/home-hero.webm`,
   capped at 1080p with the audio track stripped. `--crossfade` dissolves the
   tail into the head so the loop point is not a visible cut, which stock
   footage almost always has; pass `--crossfade 0` if your clip already loops.

3. Check the reported size. The script prints the **worst case for one
   visitor** — a browser downloads one file, not both — and warns above 3 MB.
   To get under it, raise `--crf` in the script or shorten with `--seconds`.

4. Commit both files.

### What it does at runtime

- The photograph is the `poster` and stays the LCP element. The video is not in
  the initial markup: it mounts after the `load` event on `requestIdleCallback`,
  so it never competes for bandwidth during the load Core Web Vitals measures.
- It does not load at all under `prefers-reduced-motion`, on `Save-Data`, or on
  a 2g connection. The still photograph *is* the reduced-motion experience.
- A missing or undecodable file retires the element and leaves the poster up.
- The pause control is required, not decorative: a background clip that cannot
  be stopped fails WCAG 2.2.2 once it runs past five seconds.

To remove the video entirely, delete `public/video/` or drop the `video` prop
from `<HomeHero>` in `src/app/page.tsx`.

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
