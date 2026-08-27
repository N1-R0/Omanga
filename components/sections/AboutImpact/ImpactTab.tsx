"use client";

import { motion } from "motion/react";

import { cx } from "@/lib/cx";
import { MOTION } from "@/lib/motion";

/**
 * One row of the impact tab list.
 *
 * `ProductTab`'s pattern, re-shaped for a vertical list: same roving `tabIndex`,
 * same `aria-selected` / `aria-controls` pair, and the same `layoutId` indicator
 * so the brand fill slides between rows rather than cutting. It is not that
 * component — that one is a pill in a horizontal group at button scale, this one
 * is a full-bleed row at heading scale — but the interaction contract is
 * deliberately identical, so the two tab sets on the site behave the same way.
 *
 * ---------------------------------------------------------------------------
 * [MEASURED from node 2579:131863] The row.
 *
 * Three rows of 145 fill the panel's 434 height, so the height is not a value to
 * set: `flex-1` divides whatever the panel turns out to be, which is what keeps
 * the tab column and the panel column the same height as the panel's content
 * changes. Padding is 30 inline and ~32 block, which is `--space-5` (28 → 32) on
 * both axes.
 *
 * The label is 24.5px medium, which is `text-h5` (22 → 26). Not `text-button`:
 * that is `ProductTab`'s size and it is body-scale by design, where this
 * reference sets its tabs at heading scale and they carry the section's
 * hierarchy.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATION] Hover selects.
 *
 * Requested, and it is what the reference does. It is additive rather than
 * instead of anything: click still selects, arrow keys still move, and
 * `aria-selected` still carries the state — so a keyboard or touch user reaches
 * every panel without a pointer. Hover is the fast path, not the only one.
 *
 * `onFocus` selects too, which is what keeps the two in agreement: a tab that
 * took focus without selecting would announce itself while a different panel was
 * on screen.
 */

/**
 * `text-left` because a button centres its label by default and these are rows of
 * a list, not controls in a group.
 *
 * `border-b` on every row but the last — the reference draws one on all three,
 * with the third landing exactly on the clipped container edge, which is the same
 * result with one more declaration.
 */
const BASE_CLASS =
  "relative w-full px-fluid-5 py-fluid-5 text-left font-sans text-h5 hit-area focus-ring transition-standard desktop:flex-1";

const DIVIDER_CLASS = "border-b border-border-subtle";

/**
 * Only the label's colour changes here. The fill is the indicator below, so the
 * active row declares no background of its own — two elements painting the same
 * surface is how a sliding indicator ends up with a hard-edged twin underneath it.
 *
 * `text-on-dark-muted` at rest is the same resting treatment `ProductTab` uses,
 * so an unselected tab reads the same on both pages.
 */
const ACTIVE_LABEL_CLASS = "text-on-dark";
const INACTIVE_LABEL_CLASS = "text-on-dark-muted hover:text-on-dark";

/** Above the indicator, so the fill slides behind the word rather than over it. */
const LABEL_CLASS = "relative z-raised";

export type ImpactTabProps = {
  id: string;
  panelId: string;
  label: string;
  isActive: boolean;
  isLast: boolean;
  /** Shared across the list so the brand fill animates between rows. */
  indicatorLayoutId: string;
  isReducedMotion: boolean;
  onSelect: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  registerRef: (element: HTMLButtonElement | null) => void;
};

export function ImpactTab({
  id,
  panelId,
  label,
  isActive,
  isLast,
  indicatorLayoutId,
  isReducedMotion,
  onSelect,
  onKeyDown,
  registerRef,
}: ImpactTabProps) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={isActive}
      aria-controls={panelId}
      // Only the active tab is in the tab order; arrow keys move between them.
      tabIndex={isActive ? 0 : -1}
      ref={registerRef}
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onKeyDown={onKeyDown}
      className={cx(
        BASE_CLASS,
        !isLast && DIVIDER_CLASS,
        isActive ? ACTIVE_LABEL_CLASS : INACTIVE_LABEL_CLASS,
      )}
    >
      {isActive && (
        <motion.span
          layoutId={indicatorLayoutId}
          aria-hidden
          /*
            No radius. The reference fills the row corner to corner and lets the
            panel's own 8px clip the outer corners, which is what makes the fill
            read as part of the panel rather than as a chip inside it.
          */
          className="absolute inset-0 bg-brand"
          transition={
            isReducedMotion
              ? { duration: 0 }
              : {
                  /*
                    `durationUnderline` (250ms), the same token `ProductTab`'s
                    indicator uses. It is the site's value for a mark that says
                    where you are — the nav underline and both tab indicators —
                    and holding one value is worth more than the 50ms a "faster"
                    number would buy.
                  */
                  duration: MOTION.durationUnderline,
                  ease: MOTION.easeStandard,
                }
          }
        />
      )}
      <span className={LABEL_CLASS}>{label}</span>
    </button>
  );
}
