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
 * padding-inline on each link, so the distance between two labels sits inside
 * one target or the other and a pointer travelling between them never crosses
 * dead ground. The column keeps a real gap, because stacked rows have no
 * horizontal padding to borrow. design.md § 9.
 *
 * [CHANGED, 2026-08-29] That padding is `--space-2` rather than `--space-3`, on
 * instruction: adjacent labels now sit 20 → 24 apart instead of 28 → 32. The
 * 44px `hit-area` floor is untouched, so the targets did not shrink with the
 * gap — a shorter label simply keeps more of its 44px as padding.
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
  /*
    [CHANGED, 2026-08-29] Centred, not stretched.

    It was `items-stretch`, which made every row span the panel's full width. At
    that width the hover and current-page rule — `inset-inline: 0` on the link —
    ran edge to edge under each label, and a full-bleed rule under a full-bleed
    row reads as a boxed list item rather than as an underline. Two of them
    stacked looked like table borders.

    `items-center` shrinks each `li` to its label, so the same rule now underlines
    the word and nothing else, and the stack centres in the panel. Nothing about
    the rule itself changed — the box was the row, not the decoration.

    Target size is unaffected: `hit-area` holds the 44px floor on the link, which
    is where it always was rather than on the stretched row.
  */
  column: "flex-col items-center gap-fluid-3 text-center",
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
