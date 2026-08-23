import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

/**
 * The list a set of navigation links lives in.
 *
 * A real `ul` with `role="list"`, so assistive technology announces how many
 * destinations there are before the user starts moving through them. The
 * explicit role is not redundant here: `list-style: none` removes list
 * semantics in Safari, and the global reset applies exactly that.
 *
 * Its whole job is the list element, the axis, and the gap between siblings —
 * which is what keeps `NavigationItem` free of any margin, per "spacing between
 * siblings comes from the parent's gap".
 *
 * Spacing is not a prop, and on the row it is not a gap either — it is
 * `--space-3` of padding-inline on each link, so two adjacent labels sit
 * 28 → 32 apart with all of that distance inside one target or the other. The
 * column keeps a real gap, because stacked full-width rows have no horizontal
 * padding to borrow. design.md § 9.
 */

type Orientation = "row" | "column";

const ORIENTATION_CLASS: Readonly<Record<Orientation, string>> = {
  /*
    No gap on the row. The reference's nav list carries none either — its
    `flex-flow: row` list sets only `justify-content: center`, and the space
    between labels is the padding on each link. Doing the same here means the
    space is inside the target rather than beside it, so a pointer travelling
    between two items never crosses dead ground.
  */
  row: "flex-row items-center gap-0",
  // Stretched, so every item in the mobile panel spans the full width and gets
  // the same generous target regardless of how short its label is.
  column: "flex-col items-stretch gap-fluid-3",
} as const;

export type NavigationGroupProps = {
  children: ReactNode;
  /**
   * The axis. Declared by the component that owns the layout change — the
   * header for its bar, the mobile panel for its stack — never inferred from
   * the viewport.
   */
  orientation: Orientation;
};

export function NavigationGroup({ children, orientation }: NavigationGroupProps) {
  return (
    <ul role="list" className={cx("flex gap-fluid-3", ORIENTATION_CLASS[orientation])}>
      {children}
    </ul>
  );
}
