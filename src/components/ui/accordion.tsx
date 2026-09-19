import { IconChevronDown } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * FAQ accordion built on native <details>/<summary>.
 *
 * No JavaScript, no ARIA guesswork: the browser gives correct semantics,
 * keyboard support and find-in-page behaviour for free, and the content is in
 * the DOM for crawlers even while collapsed.
 */

export type FaqItem = { question: string; answer: string };

export function Accordion({
  items,
  className,
  headingLevel = 3,
}: {
  items: FaqItem[];
  className?: string;
  headingLevel?: 2 | 3 | 4;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left",
              "transition-colors duration-200 hover:text-evergreen-800",
              "[&::-webkit-details-marker]:hidden",
            )}
          >
            <Heading className="font-sans text-base font-medium leading-snug text-ink sm:text-[1.0625rem]">
              {item.question}
            </Heading>
            <IconChevronDown
              className={cn(
                "mt-0.5 h-5 w-5 text-ink-subtle transition-transform duration-300",
                "[transition-timing-function:var(--ease-out-quint)] group-open:rotate-180",
              )}
            />
          </summary>
          <div className="pb-6 pr-10 text-[0.9375rem] leading-relaxed text-ink-muted">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
