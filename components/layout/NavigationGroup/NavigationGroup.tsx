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
 * The gap is not a prop. design.md § 3 gives the nav one
 * value ("24 — card padding, heading-to-body, nav link gap"), and it is the same
 * value on both axes, so there is nothing for a caller to decide.
 */

type Orientation = "row" | "column";

const ORIENTATION_CLASS: Readonly<Record<Orientation, string>> = {
  row: "flex-row items-center",
  // Stretched, so every item in the mobile panel spans the full width and gets
  // the same generous target regardless of how short its label is.
  column: "flex-col items-stretch",
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
    <ul role="list" className={cx("flex gap-fluid-4", ORIENTATION_CLASS[orientation])}>
      {children}
    </ul>
  );
}
