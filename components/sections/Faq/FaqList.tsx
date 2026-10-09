import { cx } from "@/lib/cx";
import type { FaqItem } from "@/types/blog.types";

/**
 * Question-and-answer pairs as native disclosure widgets.
 *
 * `details`/`summary` rather than a scripted accordion: keyboard, screen-reader
 * and find-in-page support come from the browser, it works with JavaScript off,
 * and the answer text is in the server HTML — which is what lets crawlers read
 * it and what keeps it identical to the `FAQPage` structured data.
 */
export type FaqListProps = {
  items: readonly FaqItem[];
  /** The surface the list sits on. Picks the hairline colour for that surface. */
  tone?: "light" | "dark";
};

const BORDER_CLASS = {
  light: "border-border-hairline",
  dark: "border-border-subtle",
} as const;

export function FaqList({ items, tone = "light" }: FaqListProps) {
  const border = BORDER_CLASS[tone];

  return (
    <div className={cx("flex flex-col border-t", border)}>
      {items.map((item) => (
        <details
          key={item.question}
          className={cx("group border-b", border)}
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-fluid-3 py-fluid-3 font-sans text-h6 focus-ring [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="shrink-0 text-brand transition-standard group-open:rotate-45"
            >
              +
            </span>
          </summary>

          <p className="pb-fluid-4 font-sans text-main text-secondary measure-body">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
