import type { ReactNode } from "react";

import { GAP_CLASS } from "@/lib/gap";
import { cx } from "@/lib/cx";
import type { AlignBlock, AlignInline, Gap } from "@/types/ui.types";

/**
 * One-dimensional flow with a token gap.
 *
 * layout rules: "Spacing between siblings comes from the parent's gap.
 * Children carry no margins." Stack is how that rule is kept — it is the
 * only sanctioned way to space a column or row of siblings, so a child never
 * needs a margin and a review can treat any margin as a defect.
 *
 * Direction changes at the tablet breakpoint when `direction` is
 * `"column-to-row"`, which covers the two real cases on the page: stacked
 * buttons that sit side by side on wider screens, and a heading block that
 * pairs with an action.
 */

type Direction = "column" | "row" | "column-to-row";

const DIRECTION_CLASS: Readonly<Record<Direction, string>> = {
  column: "flex-col",
  row: "flex-row",
  // Mobile-first: the narrow layout is the default, the wider one is additive.
  "column-to-row": "flex-col tablet:flex-row",
} as const;

/** Cross-axis alignment. */
const ALIGN_INLINE_CLASS: Readonly<Record<AlignInline, string>> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const;

/** Main-axis distribution. */
const ALIGN_BLOCK_CLASS: Readonly<Record<AlignBlock, string>> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const;

export type StackProps = {
  children: ReactNode;
  gap: Gap;
  /** Defaults to a column, which is the mobile-first case. */
  direction?: Direction;
  /**
   * Cross-axis alignment. Defaults to `stretch`, which is what makes buttons
   * fill the column on mobile without any button knowing it should.
   */
  align?: AlignInline;
  /** Main-axis distribution. Defaults to `start`. */
  justify?: AlignBlock;
  /**
   * Allow items to wrap onto a new line. Only meaningful for rows.
   * Wrapped rows keep the same gap on both axes.
   */
  isWrapping?: boolean;
};

export function Stack({
  children,
  gap,
  direction = "column",
  align = "stretch",
  justify = "start",
  isWrapping = false,
}: StackProps) {
  return (
    <div
      className={cx(
        "flex",
        DIRECTION_CLASS[direction],
        GAP_CLASS[gap],
        ALIGN_INLINE_CLASS[align],
        ALIGN_BLOCK_CLASS[justify],
        isWrapping && "flex-wrap",
      )}
    >
      {children}
    </div>
  );
}
