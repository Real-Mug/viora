# Contributing

## Setup

```bash
npm install
cp .env.example .env.local     # then edit the values
npm run dev                    # http://localhost:3000
```

## Before you open a pull request

```bash
npm run verify                 # typecheck + build + post-build site audit
```

CI runs the same three checks and will block the PR on any of them. The site
audit is the one people forget: it fails the build on duplicate titles or meta
descriptions, wrong canonicals, missing H1s, invalid JSON-LD, broken internal
links, images without alt text, and orphan pages.

## Branches and commits

- Branch off `main`; name it `feat/…`, `fix/…`, `content/…` or `chore/…`.
- Write commit subjects in the imperative: "Add owner FAQ section".
- Keep a PR to one concern. A copy rewrite and a layout change are two PRs.

## Conventions worth knowing

- **Deployment is config-driven.** `DEPLOY_TARGET=static` (the default) emits
  `./out` for Hostinger and GitHub Pages; `DEPLOY_TARGET=node` produces a server
  build. Don't branch on the target in application code — `next.config.ts` owns
  that decision.
- **`NEXT_PUBLIC_SITE_URL` drives canonicals, the sitemap and structured data.**
  Getting it wrong is the most damaging config mistake available, so never
  hardcode an origin in a component.
- **`NEXT_PUBLIC_BASE_PATH`** is empty for the real domain and `/viora` for the
  Pages preview. Use Next's `<Link>` and `next/image` so the prefix is applied
  for you; a hand-written `href="/about"` breaks the preview.
- **Static export has no server.** No route handlers, no on-demand image
  optimisation, no middleware while `DEPLOY_TARGET=static`.
- Every new page needs a unique title, meta description, canonical and a single
  H1, and must be linked from somewhere — the audit enforces all of it.

## Content changes

Prices, service descriptions and guarantees are business commitments. Change
them only from a source the business has approved, and flag it in the PR
description so it gets a second read.
