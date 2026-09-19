import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/marketing/hero";
import { CtaBand } from "@/components/marketing/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowRight } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/section";
import { postsByCategory, usedCategories } from "@/content/posts";
import { POST_CATEGORY_LABELS, type PostCategory } from "@/lib/types/post";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/seo/schema";

/**
 * Only categories that actually contain posts get a page. Generating one per
 * declared category would create thin, near-empty pages - exactly the pattern
 * that gets a site flagged for low-value content.
 */
export function generateStaticParams() {
  return usedCategories().map((category) => ({ category }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ category: string }> };

function label(category: string): string | undefined {
  return POST_CATEGORY_LABELS[category as PostCategory];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const name = label(category);
  if (!name) return {};

  return pageMetadata({
    title: `${name} Guides for Canadian Hosts`,
    description: `Articles on ${name.toLowerCase()} for Canadian short-term rental owners, from the VioraRental team.`,
    path: `/blog/category/${category}`,
  });
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const name = label(category);
  const items = postsByCategory(category);
  if (!name || items.length === 0) notFound();

  const others = usedCategories().filter((item) => item !== category) as PostCategory[];

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/blog" },
    { name, path: `/blog/category/${category}` },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            name: `${name} Guides`,
            description: `Articles on ${name.toLowerCase()} for Canadian short-term rental owners.`,
            path: `/blog/category/${category}`,
            crumbs,
          }),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        eyebrow="Resources"
        title={name}
        description={`Everything we have written on ${name.toLowerCase()}.`}
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      />

      <Section>
        <Container>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => (
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

          {others.length > 0 ? (
            <nav aria-label="Other categories" className="mt-12 border-t border-line pt-8">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                Other categories
              </h2>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
                {others.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/blog/category/${item}`}
                      className="text-sm text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                    >
                      {POST_CATEGORY_LABELS[item]}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-evergreen-800 underline-offset-4 hover:underline"
                  >
                    All resources
                  </Link>
                </li>
              </ul>
            </nav>
          ) : null}
        </Container>
      </Section>

      <CtaBand
        title="Need this done rather than explained?"
        description="Tell us about your property and we will take the operational side off your hands."
      />
    </>
  );
}
