# Launch checklist

Written for: the Viora Hosting team and whoever deploys the site.

Items marked **BLOCKER** should not go live without being resolved. Everything
else is a quality improvement that can follow.

---

## 1. Things only you can supply

### BLOCKER — Legal pages need counsel review

All five documents in `src/app/legal/` are structured drafts. They carry a
visible "draft pending legal review" notice and contain `PLACEHOLDER` markers.

- [ ] Privacy Policy — retention periods, processors used and where they store
      data, accountable individual, and whether Quebec Law 25 / BC PIPA /
      Alberta PIPA apply on top of PIPEDA
- [ ] Terms of Service — the liability section and governing law are marked as
      requiring counsel; a limitation that is unenforceable is worse than none
- [ ] Booking Terms — the direct-booking section is a list of what must be
      drafted, not draft terms
- [ ] Cancellation Policy — refund percentages and windows
- [ ] Remove the draft notice from `src/components/layout/legal-page.tsx` only
      once a lawyer has signed off

### Service areas — confirmed

Viora hosts across all of Canada, so every market in `src/content/locations.ts`
stays `active: true`. The location pages are local guides, not the full list of
where we work, and the site copy says so.

- [x] Coverage confirmed: every province and territory
- [ ] Verify every regulatory note against the current municipal or provincial
      source. These regimes change frequently and several were amended recently.
      The notes are written as "confirm this yourself" for that reason — keep
      that framing.

### BLOCKER — Real contact details

In `src/lib/config/site.ts`:

- [x] `contact.email` — `bakhtsanankhan@gmail.com`
- [ ] `contact.phone` / `phoneDisplay` — blank, so no phone link renders. Fill in
      or leave blank deliberately.
- [ ] `legalName` — the registered entity name
- [ ] `contact.address` — filling this in enables richer LocalBusiness schema;
      leaving it blank keeps the schema to Organization only, which is correct
      if there is no public business address
- [ ] `social` — add only profiles that exist; an empty array renders nothing

### Form endpoint — done

- [x] Forms post to Formspree (`https://formspree.io/f/mzedvwbg`, the default in
      `src/lib/config/env.ts`). `NEXT_PUBLIC_FORM_ENDPOINT` overrides it.
- [x] Submit each form end to end and confirm the message arrives
- [x] Confirm the receiving inbox is monitored

### Photography

- [x] Replace the generated SVG placeholders in `public/images/` with real
      photography (no "Placeholder image" alt text remains in `src/`)
- [ ] Replace `public/images/brand/og-default.png` with a designed 1200×630 card
      — it is the first impression of every shared link
- [ ] Compress before committing; target under ~250 KB per photo

### Properties

- [x] Real inventory in `src/content/properties.ts` (Kitchener and Waterloo,
      transcribed from their Airbnb listings; no `isPlaceholder` records left)
- [ ] Get written permission from each owner before publishing their property
- [ ] Confirm no exact street address appears anywhere in the content
- [ ] Set `NEXT_PUBLIC_CONTENT_MODE=live` once no samples remain

### Reviews

- [ ] Add reviews to `src/content/reviews.ts` only once you can point to their
      source. The file ships empty deliberately; the template at the top of the
      file explains the rules.

---

## 2. Deployment

- [ ] `NEXT_PUBLIC_SITE_URL` set to the live origin, no trailing slash
- [ ] `npm run verify` passes
- [ ] Contents of `out/` uploaded to `public_html` (contents, not the folder)
- [ ] `public_html/.htaccess` present — check for it explicitly; FTP clients
      routinely skip dotfiles
- [ ] SSL certificate issued and HTTPS confirmed working in hPanel
- [ ] **Then** uncomment the HTTPS redirect in `.htaccess`
- [ ] **Then** uncomment exactly one canonical-host block (www or apex, never
      leave both reachable)
- [ ] Optionally enable HSTS last — it is hard to undo once cached
- [ ] Visit `/does-not-exist` and confirm the custom 404 renders
- [ ] Visit `/list-your-property` and confirm it 301s to `/become-a-host/`

## 3. Search Console and analytics

- [ ] Verify the property in Google Search Console (set
      `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` for the meta-tag method)
- [ ] Submit `/sitemap.xml`
- [ ] Test a property page and a service page in the Rich Results Test
- [ ] If using GA4: set `NEXT_PUBLIC_GA_MEASUREMENT_ID`, then confirm the cookie
      banner appears, that declining loads no script, and that accepting does
- [ ] Mark the conversions you care about in GA4: `lead_form_submitted`,
      `contact_submitted`, `book_direct_click`, `airbnb_click`

## 4. Final pass

- [ ] Run Lighthouse on the homepage, a property page and the host form, on
      mobile — the build has not been measured in a real browser
- [ ] Walk the whole site by keyboard: nav dropdown, mobile drawer, gallery
      lightbox, filters, both forms
- [ ] Check every page at 360 px wide
- [ ] Confirm no remaining `PLACEHOLDER` text is visible to visitors:
      `grep -rn "PLACEHOLDER" src/` (all current ones are in comments or in the
      legal drafts)
- [ ] Confirm nothing anywhere says VirtuPro

---

## 5. Deliberately not built

These are absent because building a convincing version of them would have meant
faking functionality:

- **Live availability** — no calendar source exists. Property pages say so.
- **Direct booking and payment** — the stay panel estimates a price and routes
  to an enquiry. The interfaces are defined in `src/lib/types/booking.ts`.
- **Owner and admin dashboards** — architected for (`/owner/`, `/admin/` are
  already excluded in `robots.txt`) but not stubbed with fake UI.
- **Airbnb / PMS / channel-manager sync** — seams declared in
  `src/lib/integrations/`, all registered as `configured: false`.
