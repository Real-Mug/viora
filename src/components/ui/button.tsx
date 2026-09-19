import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The single button vocabulary for the site.
 *
 * `Button` renders a real <button>; `ButtonLink` renders a link that looks
 * identical. Keeping them separate matters for accessibility - a link that
 * navigates should not be a button, and vice versa.
 */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkGhost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight " +
  "rounded-full border transition-[background-color,border-color,color,transform,box-shadow] duration-300 " +
  "[transition-timing-function:var(--ease-out-quint)] " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-55 " +
  "whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-evergreen-800 text-linen-50 border-evergreen-800 shadow-subtle " +
    "hover:bg-evergreen-900 hover:border-evergreen-900 hover:shadow-card",
  secondary:
    "bg-transparent text-evergreen-900 border-line-strong " +
    "hover:border-evergreen-800 hover:bg-evergreen-50",
  ghost:
    "bg-transparent text-evergreen-800 border-transparent " +
    "hover:bg-evergreen-50 hover:text-evergreen-900",
  onDark:
    "bg-linen-50 text-evergreen-900 border-linen-50 shadow-subtle " +
    "hover:bg-white hover:border-white hover:shadow-lifted",
  onDarkGhost:
    "bg-white/10 text-white border-white/35 backdrop-blur-[2px] " +
    "hover:bg-white/20 hover:border-white/60",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-13 px-8 text-base",
};

function classesFor(variant: ButtonVariant, size: ButtonSize, fullWidth?: boolean, className?: string) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classesFor(variant, size, fullWidth, className)} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    /** Set for outbound links; adds target and the required rel attributes. */
    external?: boolean;
  };

export function ButtonLink({
  href,
  external,
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = classesFor(variant, size, fullWidth, className);

  if (external || /^(https?:|mailto:|tel:)/i.test(href)) {
    const isHttp = /^https?:/i.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

/** Arrow used on text links and buttons; shifts on hover of the parent group. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-300 [transition-timing-function:var(--ease-out-quint)] group-hover:translate-x-0.5",
        className,
      )}
    >
      <path
        d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Inline "Learn more"-style link with a consistent hover treatment. */
export function TextLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-evergreen-800",
    "underline-offset-4 hover:underline",
    className,
  );

  if (external || /^https?:/i.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <ArrowRight />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight />
    </Link>
  );
}
