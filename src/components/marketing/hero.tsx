import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { HeroVideo } from "@/components/marketing/hero-video";
import { withBasePath } from "@/lib/config/env";
import manifest from "@/lib/data/image-manifest.json";

/**
 * Hero variants.
 *
 * `HomeHero` is the full-bleed image hero used once, on the homepage.
 * `PageHero` is the quieter heading block every other page uses - a hero on
 * every page would flatten the hierarchy and cost a large image on pages where
 * it earns nothing.
 *
 * LCP: the hero image is the largest thing on the page and the thing Core Web
 * Vitals is measuring, so it is the one image served as AVIF as well as WebP -
 * roughly 40% fewer bytes for the same picture. The scrim is a CSS gradient
 * rather than a second image request.
 *
 * This is the one image that does not go through `Img`/next/image: next/image
 * emits a single `<img>`, and a second format needs `<picture>` with a typed
 * `<source>`. The preload below is typed too, so a browser without AVIF
 * ignores it rather than fetching bytes it cannot use, and one that has it
 * never downloads the WebP.
 */

type Variants = { width: number; height: number; widths: number[] };

const VARIANTS = manifest as Record<string, Variants>;

/** Where `scripts/generate-image-variants.mjs` also renders AVIF. */
const AVIF_PREFIX = "/images/hero/";

function heroSources(src: string) {
  const entry = VARIANTS[src];
  if (!entry) return { fallback: withBasePath(src) };

  const stem = src.replace(/\.[^.]+$/, "");
  // Widths actually written to disk: every candidate below the source's own.
  // At or above it the original file is the best available, exactly as
  // src/lib/image-loader.ts resolves it.
  const rendered = entry.widths.filter((w) => w < entry.width);
  // A full-bleed hero is never painted at thumbnail size, so the smallest
  // variants would only pad the srcset with candidates nothing picks.
  const useful = rendered.filter((w) => w >= 384);

  const webpSrcSet = [
    ...useful.map((w) => `${withBasePath(`${stem}-${w}w.webp`)} ${w}w`),
    `${withBasePath(src)} ${entry.width}w`,
  ].join(", ");

  const avifSrcSet = src.startsWith(AVIF_PREFIX)
    ? useful.map((w) => `${withBasePath(`${stem}-${w}w.avif`)} ${w}w`).join(", ")
    : undefined;

  return {
    fallback: withBasePath(src),
    webpSrcSet,
    avifSrcSet,
    width: entry.width,
    height: entry.height,
  };
}

export function HomeHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
  video,
  footnote,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: { src: string; alt: string };
  /**
   * Optional background footage. The photograph above is its poster and stays
   * the LCP element; omit this and the hero is exactly the still it was.
   */
  video?: { mp4: string; webm: string };
  footnote?: ReactNode;
}) {
  const hero = heroSources(image.src);

  return (
    <section className="hero-parallax relative isolate overflow-hidden bg-evergreen-950">
      {/*
        The photograph drifts rather than sitting still: a slow scale-and-pan on
        its own wrapper, plus a scroll-linked rise driven by CSS alone. It costs
        no extra bytes over the still image it replaces, animates only transform
        (so it stays on the compositor and never triggers layout), and is turned
        off wholesale by prefers-reduced-motion.
      */}
      {/*
        Preloads the AVIF specifically. `type` is what makes this safe: a
        browser without AVIF skips the preload entirely rather than fetching
        an image it cannot decode, and falls back to the WebP srcset below.
      */}
      {hero.avifSrcSet ? (
        <link
          rel="preload"
          as="image"
          type="image/avif"
          imageSrcSet={hero.avifSrcSet}
          imageSizes="100vw"
          fetchPriority="high"
        />
      ) : null}

      <div className="hero-drift absolute inset-0">
        <picture>
          {hero.avifSrcSet ? (
            <source type="image/avif" srcSet={hero.avifSrcSet} sizes="100vw" />
          ) : null}
          {/*
            A raw <img> rather than next/image: next/image renders a single
            <img> and cannot offer a second format. Serving AVIF needs
            <picture> with a typed <source>, and this is the LCP element, so
            the bytes are worth the exception.
          */}
          <img
            src={hero.fallback}
            srcSet={hero.webpSrcSet}
            sizes="100vw"
            alt={image.alt}
            width={hero.width}
            height={hero.height}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
      </div>
      {video ? (
        <HeroVideo mp4={video.mp4} webm={video.webm} poster={hero.fallback} />
      ) : null}

      {/*
        Aurora: slow blooms of brass and evergreen light over the photograph.
        It sits above the image and below the scrim, so the scrim still
        governs headline contrast. Decorative, so it is hidden from assistive
        technology, and it is pure CSS - no image, no script, no extra bytes.
      */}
      <div aria-hidden="true" className="hero-aurora" />

      <div aria-hidden="true" className="scrim-hero absolute inset-0" />

      <Container className="relative">
        <div className="flex min-h-[32rem] flex-col justify-end py-20 sm:min-h-[36rem] lg:min-h-[42rem] lg:py-28">
          <div className="max-w-3xl">
            <Eyebrow onDark className="rise-in">
              {eyebrow}
            </Eyebrow>

            <h1
              className="rise-in mt-5 text-display-xl text-linen-50"
              style={{ animationDelay: "60ms" }}
            >
              {title}
            </h1>

            <p
              className="rise-in mt-6 max-w-2xl text-lead text-linen-200"
              style={{ animationDelay: "120ms" }}
            >
              {description}
            </p>

            <div
              className="rise-in mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "180ms" }}
            >
              <ButtonLink href={primaryCta.href} variant="onDark" size="lg">
                {primaryCta.label}
              </ButtonLink>
              <ButtonLink href={secondaryCta.href} variant="onDarkGhost" size="lg">
                {secondaryCta.label}
              </ButtonLink>
            </div>

            {footnote ? (
              <div className="rise-in mt-8 text-sm text-linen-300" style={{ animationDelay: "240ms" }}>
                {footnote}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section className={cn("border-b border-line bg-linen-200/45", className)}>
      <Container>
        <div className="py-10 sm:py-14 lg:py-16">
          {breadcrumbs ? <div className="mb-6">{breadcrumbs}</div> : null}

          <div className="max-w-3xl">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className={cn("text-display-lg text-ink", eyebrow && "mt-4")}>{title}</h1>
            {description ? <p className="mt-5 text-lead text-ink-muted">{description}</p> : null}
          </div>

          {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
