import type { ReactNode } from "react";

import { GAP_CLASS } from "@/lib/gap";
import { cx } from "@/lib/cx";
import type { Gap } from "@/types/ui.types";

/**
 * Two-dimensional layout with a token gap.
 *
 * layout rules: "One grid primitive owns columns and gaps. Sections declare
 * column spans; children never position themselves."
 *
 * Every configuration is a single column on mobile. That is not a convenience
 * default — responsive rules require multi-column patterns to collapse to one
 * column on mobile while preserving reading order in the DOM, and the only way
 * to guarantee reading order is to never reorder. There is no `order` prop
 * here, and there should never be one.
 */

/**
 * Column counts the page actually uses.
 *
 * `12` is the design system's base grid, for the rare section that needs
 * asymmetric spans. Everything else is an equal-column layout.
 */
type Columns = 2 | 3 | 4 | 12;

/**
 * Breakpoint behaviour per column count, from design-system.md § Breakpoints:
 * two-up cards persist at tablet; denser grids wait for desktop so cards do not
 * get squeezed below a readable width at 768.
 */
const COLUMNS_CLASS: Readonly<Record<Columns, string>> = {
  2: "tablet:grid-cols-2",
  3: "tablet:grid-cols-2 desktop:grid-cols-3",
  4: "tablet:grid-cols-2 desktop:grid-cols-4",
  12: "desktop:grid-cols-12",
} as const;

export type GridProps = {
  children: ReactNode;
  /** Columns from the tablet or desktop breakpoint up. Always 1 on mobile. */
  columns: Columns;
  gap: Gap;
  /**
   * Stretch every cell to the height of the tallest in its row.
   *
   * card rules require cards in a row to be equal height with actions aligned
   * across the row. Defaults to `true` because that is the correct behaviour
   * for every card grid, and a ragged row is the exception that must be asked
   * for.
   */
  isEqualHeight?: boolean;
};

export function Grid({
  children,
  columns,
  gap,
  isEqualHeight = true,
}: GridProps) {
  return (
    <div
      className={cx(
        "grid grid-cols-1",
        COLUMNS_CLASS[columns],
        GAP_CLASS[gap],
        isEqualHeight ? "items-stretch" : "items-start",
      )}
    >
      {children}
    </div>
  );
}
