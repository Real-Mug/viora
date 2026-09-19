import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/marketing/hero";
import { CtaBand } from "@/components/marketing/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowRight } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/section";
import { sortedPosts, usedCategories } from "@/content/posts";
import { POST_CATEGORY_LABELS, type PostCategory } from "@/lib/types/post";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/seo/schema";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/blog" },
];

export const metadata: Metadata = pageMetadata({
  title: "Resources for Canadian Short-Term Rental Hosts",
  description:
    "Practical guides on Airbnb co-hosting, short-term rental operations, pricing and direct booking, written for Canadian property owners.",
  path: "/blog",
});

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function BlogPage() {
  const posts = sortedPosts();
  const categories = usedCategories() as PostCategory[];
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: "Resources for Canadian Short-Term Rental Hosts",
            description: "Guides on co-hosting, operations, pricing and direct booking.",
            path: "/blog",
            crumbs,
          }),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        eyebrow="Resources"
        title="Guides for Canadian hosts"
        description="Writing that is worth reading whether or not you ever work with us. Fewer articles, each one actually useful."
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      />

      <Section>
        <Container>
          {categories.length > 0 ? (
            <nav aria-label="Categories" className="mb-10 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/category/${category}`}
                  className="inline-flex items-center rounded-full border border-line bg-surface-raised px-3.5 py-1.5 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-evergreen-800"
                >
                  {POST_CATEGORY_LABELS[category]}
                </Link>
              ))}
            </nav>
          ) : null}

          {featured ? (
            <article className="group relative rounded-[var(--radius-panel)] border border-line bg-surface-raised p-7 shadow-subtle transition-colors hover:border-line-strong sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="brand">{POST_CATEGORY_LABELS[featured.category]}</Badge>
                <span className="text-sm text-ink-subtle">{featured.readingMinutes} min read</span>
              </div>
              <h2 className="mt-5 max-w-3xl text-display-md text-ink">
                <Link href={`/blog/${featured.slug}`} className="before:absolute before:inset-0">
                  <span className="transition-colors group-hover:text-evergreen-800">
                    {featured.title}
                  </span>
                </Link>
              </h2>
              <p className="mt-4 max-w-2xl text-lead text-ink-muted">{featured.excerpt}</p>
              <p className="mt-6 text-sm text-ink-subtle">
                <time dateTime={featured.publishedAt}>
                  {dateFormatter.format(new Date(featured.publishedAt))}
                </time>
              </p>
            </article>
          ) : null}

          {rest.length > 0 ? (
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <li key={post.slug}>
                  <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface-raised p-6 shadow-subtle transition-colors hover:border-line-strong">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Badge>{POST_CATEGORY_LABELS[post.category]}</Badge>
                      <span className="text-xs text-ink-subtle">{post.readingMinutes} min</span>
                    </div>
                    <h2 className="mt-4 text-[1.1875rem] leading-snug text-ink">
                      <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">
                        <span className="transition-colors group-hover:text-evergreen-800">
                          {post.title}
                        </span>
                      </Link>
                    </h2>
                    <p className="mt-3 clamp-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-evergreen-800">
                      Read
                      <ArrowRight />
                    </span>
                  </article>
                </li>
              ))}
            </ul>
          ) : null}

          {posts.length === 0 ? (
            <div className="rounded-[var(--radius-panel)] border border-dashed border-line-strong bg-linen-200/50 p-10 text-center">
              <h2 className="text-display-sm text-ink">Guides are on the way</h2>
              <p className="mx-auto mt-3 max-w-xl text-ink-muted">
                We would rather publish a handful of genuinely useful articles than a stream of
                filler. The first are being written now.
              </p>
            </div>
          ) : null}
        </Container>
      </Section>

      <CtaBand
        title="Reading is one thing. Handing it over is another."
        description="If the checklist in these guides is longer than the time you have, that is exactly the problem we solve."
      />
    </>
  );
}
