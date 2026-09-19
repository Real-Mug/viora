# VioraRental

Live site: **https://real-mug.github.io/viora/**

Professional short-term rental co-hosting and property management in Canada.

This repository holds the **built static site**, served directly by GitHub Pages
from the `main` branch root. There is no build step to run here — the files are
ready to serve.

## What's in here

44 static pages: home, about, 7 service pages, 6 property pages, 6 service-area
pages, blog with category pages, reviews, FAQ, host and contact forms, 5 legal
pages and a custom 404. Plus `sitemap.xml`, `robots.txt` and per-page structured
data.

## Notes on the content

- **Property listings are clearly-labelled samples.** They carry a visible
  "Sample listing" badge and are not properties under management.
- **No reviews are published.** The reviews page explains why rather than
  showing testimonials that cannot be verified.
- **Legal pages are drafts** pending review by Canadian legal counsel, and say
  so on the page.
- Contact details, company facts and photography are placeholders awaiting real
  values.

## Source

Built from a Next.js 15 + TypeScript + Tailwind project. The source is kept
separately; this repo is the published output only.

`.nojekyll` must stay — without it GitHub Pages runs Jekyll, which strips the
`_next/` directory and the site loads unstyled.
