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

### BLOCKER — Confirm the service areas

`src/content/locations.ts` currently lists Toronto, Vancouver, Montreal,
Calgary, Muskoka and Whistler as `active: true`. **A location page is a public
statement that you take on work in that market.**

- [ ] Set `active: false` for any market you do not actually serve. The page, its
      links, its sitemap entry and its structured data all disappear.
- [ ] Verify every regulatory note against the current municipal or provincial
      source. These regimes change frequently and several were amended recently.
      The notes are written as "confirm this yourself" for that reason — keep
      that framing.

### BLOCKER — Real contact details

In `src/lib/config/site.ts`:

- [ ] `contact.email` — currently `hello@viorahosting.com`; confirm it exists and
      is monitored
- [ ] `contact.phone` / `phoneDisplay` — blank, so no phone link renders. Fill in
      or leave blank deliberately.
- [ ] `legalName` — the registered entity name
- [ ] `contact.address` — filling this in enables richer LocalBusiness schema;
      leaving it blank keeps the schema to Organization only, which is correct
      if there is no public business address
- [ ] `social` — add only profiles that exist; an empty array renders nothing

### BLOCKER — Form endpoint

- [ ] Set `NEXT_PUBLIC_FORM_ENDPOINT`. Until it is set, both forms tell the
      visitor the form is not connected and to email instead. They never show a
      false success, but they also never deliver a lead.
- [ ] Submit each form end to end and confirm the message arrives
- [ ] Confirm the receiving inbox is monitored

### Photography

- [ ] Replace the generated SVG placeholders in `public/images/` with real
      photography. Every placeholder has an `alt` beginning "Placeholder image",
      which is a fast way to find them: `grep -rn "Placeholder image" src/`
- [ ] Replace `public/images/brand/og-default.png` with a designed 1200×630 card
      — it is the first impression of every shared link
- [ ] Compress before committing; target under ~250 KB per photo

### Properties

- [ ] Replace the six sample records in `src/content/properties.ts` with real
      inventory, and **delete each `isPlaceholder: true` line**
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
