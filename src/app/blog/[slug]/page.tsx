import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CtaBand } from "@/components/marketing/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/section";
import { getPost, posts, relatedPosts } from "@/content/posts";
import { getService } from "@/content/services";
import type { Service } from "@/lib/types/service";
import { POST_CATEGORY_LABELS } from "@/lib/types/post";
import type { PostBlock } from "@/lib/types/post";
import { clampDescription, pageMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema, graph, type Crumb } from "@/lib/seo/schema";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.seoTitle ?? post.title,
    description: clampDescription(post.seoDescription ?? post.excerpt),
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    ...(post.cover ? { image: { url: post.cover.src, alt: post.cover.alt } } : {}),
  });
}

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

/**
 * Renders the post block model.
 *
 * Blocks carry plain text, never HTML, so nothing here needs to inject markup -
 * which removes the usual injection surface of a blog rendering layer.
 */
function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? <h2>{block.text}</h2> : <h3>{block.text}</h3>;
    case "list":
      return block.ordered ? (
        <ol>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="rounded-[var(--radius-card)] border border-brass-200 bg-brass-50 p-5 not-prose">
          <p className="font-sans text-[0.9375rem] font-semibold text-brass-900">{block.title}</p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-brass-900/85">{block.text}</p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-brass-400 pl-5 italic">
          {block.text}
          {block.attribution ? (
            <footer className="mt-2 text-sm not-italic text-ink-subtle">
              {block.attribution}
            </footer>
          ) : null}
        </blockquote>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(slug);
  const services = (post.relatedServices ?? [])
    .map(getService)
    .filter((service): service is Service => service !== undefined);

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/blog" },
    { name: POST_CATEGORY_LABELS[post.category], path: `/blog/category/${post.category}` },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd data={graph(articleSchema(post), breadcrumbSchema(crumbs))} />

      <Container className="pt-8">
        <Breadcrumbs crumbs={crumbs} />
      </Container>

      <article>
        <Container prose className="pt-8">
          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/blog/category/${post.category}`}>
              <Badge tone="brand">{POST_CATEGORY_LABELS[post.category]}</Badge>
            </Link>
            <span className="text-sm text-ink-subtle">{post.readingMinutes} min read</span>
          </div>

          <h1 className="mt-5 text-display-lg text-ink">{post.title}</h1>
          <p className="mt-5 text-lead text-ink-muted">{post.excerpt}</p>

          <p className="mt-6 border-t border-line pt-6 text-sm text-ink-subtle">
            {post.author} &middot;{" "}
            <time dateTime={post.publishedAt}>
              {dateFormatter.format(new Date(post.publishedAt))}
            </time>
            {post.updatedAt ? (
              <>
                {" · Updated "}
                <time dateTime={post.updatedAt}>
                  {dateFormatter.format(new Date(post.updatedAt))}
                </time>
              </>
            ) : null}
          </p>
        </Container>

        <Container prose className="pb-4 pt-10">
          <div className="prose-viora">
            {post.body.map((block, index) => (
              <Block key={`${block.type}-${index}`} block={block} />
            ))}
          </div>
        </Container>
      </article>

      <Section tight>
        <Container prose>
          <div className="grid gap-10 border-t border-line pt-10 sm:grid-cols-2">
            {services.length > 0 ? (
              <div>
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                  Related services
                </h2>
                <ul className="mt-4 grid gap-2.5">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-[0.9375rem] text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {related.length > 0 ? (
              <div>
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                  Keep reading
                </h2>
                <ul className="mt-4 grid gap-2.5">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/blog/${item.slug}`}
                        className="text-[0.9375rem] text-ink-muted underline-offset-4 hover:text-evergreen-800 hover:underline"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Would rather not do all of this yourself?"
        description="That is the work we take on. Tell us about your property and we will come back with what we would change first."
      />
    </>
  );
}
