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
 *   - the mobile drawer is a modal dialog: while open, focus moves to the close
 *     button, Tab is kept inside it and Escape closes it, returning focus to the
 *     menu button; while closed it is `inert`, so its links are not tabbable;
 *   - hovering opens the Services menu, and the click that follows a hover
 *     keeps it open rather than toggling it shut;
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
  const [progress, setProgress] = useState(0);
  // Stable, so the drawer's open/keyboard effects do not re-run on every render.
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    // One listener drives both the header's solid/transparent state and the
    // progress hairline, and it is rAF-throttled so scrolling stays smooth.
    let frame = 0;

    const measure = () => {
      frame = 0;
      const top = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(top > 8);
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, top / scrollable)) : 0);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
        "sticky top-0 z-50 border-b transition-all duration-300 [transition-timing-function:var(--ease-out-quint)]",
        scrolled
          ? "border-line bg-surface/92 shadow-subtle backdrop-blur-md supports-[backdrop-filter]:bg-surface/80"
          : "border-transparent bg-surface",
      )}
    >
      <div className="container-page">
        <div className="flex h-[var(--header-height)] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main" className="hidden min-w-0 xl:block">
            <ul className="flex items-center">
              {mainNav.map((item) =>
                item.children?.length ? (
                  <DesktopDropdown key={item.href} item={item} pathname={pathname} />
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      data-active={isActive(pathname, item.href) ? "true" : undefined}
                      className={cn(
                        "nav-underline relative inline-flex h-10 items-center whitespace-nowrap rounded-full px-3",
                        "text-[0.9375rem] transition-colors duration-200",
                        isActive(pathname, item.href)
                          ? "font-medium text-evergreen-900"
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

          {/*
            One CTA only, at every width.

            A second button used to appear at 2xl. That could never fit: the row
            lives inside .container-page, which is capped at 80rem, so the space
            available here stops growing at 1280px while the 2xl rule fires at
            1536px and adds ~165px. The result was "Explore Properties" sitting
            on top of the Contact link at every viewport from 1536px up.

            Dropping it rather than widening the container also removes a
            duplicate: "Properties" is already in the nav, two links away.
          */}
          <div className="hidden shrink-0 items-center xl:flex">
            <ButtonLink href={CTA.primary.href} size="sm">
              {CTA.primary.label}
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 hover:border-line-strong hover:bg-linen-200 active:scale-95 xl:hidden"
          >
            <IconMenu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      {/*
        Reading-progress hairline along the bottom edge of the header.
        Purely decorative, so it is hidden from assistive tech; scaleX keeps it
        on the compositor instead of animating width.
      */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
        <div
          className="h-full origin-left bg-brass-500/80"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <MobileNav open={mobileOpen} onClose={closeMobile} pathname={pathname} />
    </header>
  );
}

/* -------------------------------------------------------------------------- */

function DesktopDropdown({ item, pathname }: { item: NavLink; pathname: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef(false);
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
        if (!open) openedByHover.current = true;
        setOpen(true);
      }}
      onMouseLeave={() => {
        openedByHover.current = false;
        scheduleClose();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          // Hovering opens the menu, so the click that usually follows must
          // not toggle it straight back shut.
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
            return;
          }
          setOpen((value) => !value);
        }}
        data-active={active ? "true" : undefined}
        className={cn(
          "nav-underline relative inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-3",
          "text-[0.9375rem] transition-colors duration-200",
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
          open && "menu-in",
        )}
      >
        <ul className="grid gap-0.5">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                aria-current={pathname === child.href ? "page" : undefined}
                className={cn(
                  "block rounded-xl px-3.5 py-2.5 transition-all duration-200",
                  "hover:translate-x-0.5",
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
  const dialogRef = useRef<HTMLDivElement>(null);
  // Where focus was when the drawer opened (the menu button), so dismissing
  // the drawer can hand focus back instead of dropping it on <body>.
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const dismiss = useCallback(() => {
    onClose();
    returnFocusRef.current?.focus();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
        return;
      }
      // Keep Tab inside the drawer while it is open: it is a modal dialog.
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      );
      const visible = [...focusable].filter((el) => el.offsetParent !== null);
      const first = visible[0];
      const last = visible[visible.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, dismiss]);

  return (
    <div
      id="mobile-navigation"
      className={cn("xl:hidden", !open && "pointer-events-none")}
      aria-hidden={!open}
      // `inert` takes the closed drawer's links out of the Tab order;
      // aria-hidden and pointer-events alone leave them focusable.
      inert={!open}
    >
      {/* Backdrop */}
      <div
        onClick={dismiss}
        className={cn(
          "fixed inset-0 z-40 bg-linen-950/45 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={dialogRef}
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
            onClick={dismiss}
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
