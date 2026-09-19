import Link from "next/link";

import { IconChevronRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { Crumb } from "@/lib/seo/schema";

/**
 * Visible breadcrumb trail. The matching BreadcrumbList structured data is
 * emitted by the page from the same `crumbs` array, so markup and page content
 * can never drift apart.
 *
 * The final crumb is the current page: it is rendered as plain text with
 * aria-current rather than as a link to itself.
 */
export function Breadcrumbs({
  crumbs,
  className,
  onDark = false,
}: {
  crumbs: Crumb[];
  className?: string;
  onDark?: boolean;
}) {
  if (crumbs.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span
                  aria-current="page"
                  className={cn("font-medium", onDark ? "text-linen-200" : "text-ink-muted")}
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className={cn(
                    "underline-offset-4 hover:underline",
                    onDark ? "text-linen-300 hover:text-white" : "text-ink-subtle hover:text-evergreen-800",
                  )}
                >
                  {crumb.name}
                </Link>
              )}
              {!isLast ? (
                <IconChevronRight
                  className={cn("h-3.5 w-3.5", onDark ? "text-linen-400/70" : "text-line-strong")}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
