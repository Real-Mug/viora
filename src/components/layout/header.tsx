"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { IconChevronDown, IconClose, IconMenu } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { CTA, mainNav, type NavLink } from "@/lib/config/site";

/**
 * Site header.
 *
 * Accessibility notes:
 *   - the Services dropdown is a real button with aria-expanded/aria-controls,
 *     opens on hover *and* on click/Enter, and closes on Escape or outside
 *     click, so it works for pointer, keyboard and touch alike;
 *   - the mobile drawer traps nothing and hides nothing: it is a plain panel
 *     with the background marked aria-hidden via inert-style overlay, focus is
 *     moved to the close button, and Escape closes it;
 *   - the current page is marked with aria-current.
 */

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll only while the drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-line bg-surface/92 backdrop-blur-md supports-[backdrop-filter]:bg-surface/80"
          : "border-transparent bg-surface",
      )}
    >
      <div className="container-page">
        <div className="flex h-[var(--header-height)] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {mainNav.map((item) =>
                item.children?.length ? (
                  <DesktopDropdown key={item.href} item={item} pathname={pathname} />
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className={cn(
                        "inline-flex h-10 items-center rounded-full px-3.5 text-[0.9375rem] transition-colors duration-200",
                        isActive(pathname, item.href)
                          ? "text-evergreen-900 font-medium"
                          : "text-ink-muted hover:text-evergreen-900",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink href={CTA.secondary.href} variant="secondary" size="sm">
              {CTA.secondary.label}
            </ButtonLink>
            <ButtonLink href={CTA.primary.href} size="sm">
              {CTA.primary.label}
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-linen-200 lg:hidden"
          >
            <IconMenu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}

/* -------------------------------------------------------------------------- */

function DesktopDropdown({ item, pathname }: { item: NavLink; pathname: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();
  const active = isActive(pathname, item.href);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // A short delay stops the menu snapping shut while the pointer crosses the gap.
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        containerRef.current?.querySelector("button")?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    // Keyboard users tabbing out of the menu should close it too.
    const onFocusIn = (event: FocusEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  return (
    <li
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[0.9375rem] transition-colors duration-200",
          active ? "font-medium text-evergreen-900" : "text-ink-muted hover:text-evergreen-900",
        )}
      >
        {item.label}
        <IconChevronDown
          className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      <div
        id={menuId}
        hidden={!open}
        className={cn(
          "absolute left-1/2 top-[calc(100%+0.5rem)] w-[26rem] -translate-x-1/2",
          "rounded-[var(--radius-panel)] border border-line bg-surface-raised p-2 shadow-lifted",
        )}
      >
        <ul className="grid gap-0.5">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                aria-current={pathname === child.href ? "page" : undefined}
                className={cn(
                  "block rounded-xl px-3.5 py-2.5 transition-colors duration-200",
                  pathname === child.href ? "bg-evergreen-50" : "hover:bg-linen-200",
                )}
              >
                <span className="block text-[0.9375rem] font-medium text-ink">{child.label}</span>
                {child.description ? (
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-subtle">
                    {child.description}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-1 border-t border-line px-3.5 pb-1 pt-3">
          <Link
            href={item.href}
            className="text-sm font-medium text-evergreen-800 underline-offset-4 hover:underline"
          >
            View all services
          </Link>
        </div>
      </div>
    </li>
  );
}

/* -------------------------------------------------------------------------- */

function MobileNav({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      id="mobile-navigation"
      className={cn("lg:hidden", !open && "pointer-events-none")}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-linen-950/45 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label="Site menu"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-surface shadow-lifted",
          "transition-transform duration-300 [transition-timing-function:var(--ease-out-quint)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-[var(--header-height)] items-center justify-between border-b border-line px-4">
          <Logo />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-linen-200"
          >
            <IconClose className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
          <ul className="grid gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                {item.children?.length ? (
                  <details className="group" open={isActive(pathname, item.href)}>
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-linen-200 [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <IconChevronDown className="h-5 w-5 text-ink-subtle transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <ul className="mb-1 ml-3 grid gap-0.5 border-l border-line pl-3">
                      <li>
                        <Link
                          href={item.href}
                          className="block rounded-lg px-3 py-2.5 text-[0.9375rem] text-ink-muted hover:bg-linen-200"
                        >
                          All services
                        </Link>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={pathname === child.href ? "page" : undefined}
                            className={cn(
                              "block rounded-lg px-3 py-2.5 text-[0.9375rem] hover:bg-linen-200",
                              pathname === child.href ? "font-medium text-evergreen-900" : "text-ink-muted",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-3 py-3 text-base hover:bg-linen-200",
                      isActive(pathname, item.href) ? "font-medium text-evergreen-900" : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-3 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <ButtonLink href={CTA.primary.href} fullWidth size="lg">
            {CTA.primary.label}
          </ButtonLink>
          <ButtonLink href={CTA.secondary.href} variant="secondary" fullWidth size="lg">
            {CTA.secondary.label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
