# Security policy

## Reporting a vulnerability

Please do **not** open a public issue for a security problem.

Report it privately to **hello@viorahosting.com**, or use GitHub's
[private vulnerability reporting](https://docs.github.com/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability)
on this repository (Security → Report a vulnerability).

Include the affected URL or file, the steps to reproduce, and what an attacker
could do with it. You will get an acknowledgement within 3 business days.

## Scope

In scope: this repository's source, the built site at viorahosting.com, and the
GitHub Pages preview.

Out of scope: findings against third-party platforms the business uses (Airbnb,
Vrbo, the hosting control panel) — report those to the vendor directly.

## Secrets

This repo ships no credentials. `.env.example` documents the variable names
only; real values live in `.env.local` (git-ignored) and in the deployment
environment. If you believe a secret has been committed, treat it as an incident
and report it by the process above rather than opening a PR that deletes it —
a deleted secret is still in the git history and must be rotated.
