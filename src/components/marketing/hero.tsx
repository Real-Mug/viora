import { Img as Image } from "@/components/ui/image";
import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/**
 * Hero variants.
 *
 * `HomeHero` is the full-bleed image hero used once, on the homepage.
 * `PageHero` is the quieter heading block every other page uses - a hero on
 * every page would flatten the hierarchy and cost a large image on pages where
 * it earns nothing.
 *
 * LCP: the hero image is `priority` and served at a single large size, with the
 * scrim applied as a CSS gradient rather than a second image request.
 */

export function HomeHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
  footnote,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: { src: string; alt: string };
  footnote?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-evergreen-950">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
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
