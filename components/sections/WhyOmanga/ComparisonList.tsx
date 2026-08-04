import type { ComparisonSentiment } from "@/content/why-omanga.content";

import { ComparisonItem } from "./ComparisonItem";

/**
 * The rows of one comparison panel.
 *
 * A real `ul` with an explicit `role="list"`, so the panel announces how many
 * statements it holds rather than as five loose lines. The role is not redundant:
 * the global reset removes the marker and Safari drops list semantics when it
 * does — the same reason `PartnerLogos` and `FooterColumn` carry it.
 *
 * `labelledBy` points at the panel's visible `h3`, so the list takes its
 * accessible name from the heading a sighted user reads rather than from a
 * duplicate `aria-label` that could drift from it.
 *
 * A `ul` is why this is not a `Stack`: `Stack` renders a `div` and takes no
 * element prop. It keeps `Stack`'s contract regardless — the 16 gap is the
 * parent's, so no row carries a margin. 16 is the step `design-system.md` § Card
 * variants names for this exact case: "Comparison card ... Icon + body rows at 16
 * gap".
 */

export type ComparisonListProps = {
  items: readonly string[];
  sentiment: ComparisonSentiment;
  /** The id of the heading that names this list. */
  labelledBy: string;
};

export function ComparisonList({
  items,
  sentiment,
  labelledBy,
}: ComparisonListProps) {
  return (
    <ul role="list" aria-labelledby={labelledBy} className="flex flex-col gap-4">
      {items.map((item) => (
        <ComparisonItem key={item} sentiment={sentiment}>
          {item}
        </ComparisonItem>
      ))}
    </ul>
  );
}
