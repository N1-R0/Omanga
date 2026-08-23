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
 * Every configuration is a single column on mobile *by default*. That is not a
 * convenience default — design.md § 10 requires multi-column patterns to
 * collapse to one column on mobile while preserving reading order in the DOM,
 * and the only way to guarantee reading order is to never reorder. There is no
 * `order` prop here, and there should never be one.
 *
 * `mobileColumns` is the one sanctioned exit from that default, and it exists
 * because the rule it bends is aimed at cards. § 10's next bullet gives the
 * reason for the collapse — "so cards never get squeezed below a readable width"
 * — which does not apply to a grid of glyph-and-one-line items with no surface,
 * no padding and no action. It is opt-in, capped at two, and a caller that takes
 * it owes a note saying why. See `InsuranceInclusions`.
 */

/**
 * Column counts the page actually uses.
 *
 * `12` is the design system's base grid, for the rare section that needs
 * asymmetric spans. Everything else is an equal-column layout.
 */
type Columns = 2 | 3 | 4 | 12;

/**
 * Breakpoint behaviour per column count, from design.md § 10:
 * two-up cards persist at tablet; denser grids wait for desktop so cards do not
 * get squeezed below a readable width at 768.
 */
const COLUMNS_CLASS: Readonly<Record<Columns, string>> = {
  2: "tablet:grid-cols-2",
  3: "tablet:grid-cols-2 desktop:grid-cols-3",
  4: "tablet:grid-cols-2 desktop:grid-cols-4",
  12: "desktop:grid-cols-12",
} as const;

/**
 * Columns below tablet. One is the rule; two is the exception a caller must ask
 * for by name.
 */
type MobileColumns = 1 | 2;

const MOBILE_COLUMNS_CLASS: Readonly<Record<MobileColumns, string>> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
} as const;

export type GridProps = {
  children: ReactNode;
  /** Columns from the tablet or desktop breakpoint up. */
  columns: Columns;
  /**
   * Columns below tablet. Defaults to 1, which design.md § 10 requires of every
   * multi-column pattern.
   *
   * Only pass 2 for a grid of small, surface-less items — a glyph, a term, a
   * line — where one-per-row is mostly whitespace. Never for cards: the rule
   * exists so a card is not squeezed below a readable width, and at 375px a
   * two-up column is about 152px.
   */
  mobileColumns?: MobileColumns;
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
  mobileColumns = 1,
  gap,
  isEqualHeight = true,
}: GridProps) {
  return (
    <div
      className={cx(
        "grid",
        MOBILE_COLUMNS_CLASS[mobileColumns],
        COLUMNS_CLASS[columns],
        GAP_CLASS[gap],
        isEqualHeight ? "items-stretch" : "items-start",
      )}
    >
      {children}
    </div>
  );
}
