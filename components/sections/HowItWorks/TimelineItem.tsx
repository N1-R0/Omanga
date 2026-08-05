import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import { cx } from "@/lib/cx";
import type { HowItWorksStep } from "@/content/how-it-works.content";

import { TimelineMarker } from "./TimelineMarker";

/** Which side of the centre rail this step sits on above the desktop breakpoint. */
export type TimelineSide = "start" | "end";

/**
 * One step of the timeline: a marker in the rail column and a block of copy beside
 * it.
 *
 * ---------------------------------------------------------------------------
 * [MEASURED from the structural benchmark] The row is a grid, not a two-column
 * split with the rail floating over the seam:
 *
 *   desktop   1fr | 32 | 1fr   with a 48 gap either side of the rail column
 *   narrow    32  | 1fr        with a 16 gap, both sides reading left to right
 *
 * Both templates are tokens, and the 32 in each is the same `--spacing-rail` the
 * rail itself is drawn at. That is the point of the change: previously the copy was
 * laid out by `grid-cols-2 gap-12` and the marker was absolutely positioned over
 * the top, so the 48 gap was split 24 either side of the rail and the two lined up
 * only by coincidence. Now the rail sits in a column the grid reserved for it, and
 * the copy stops a full 48 short of it on both sides.
 *
 * The copy also caps at `--container-track` (486), which the benchmark sets on
 * every timeline paragraph and which Omanga's token file has named "486 — timeline
 * / deep-dive track" all along without the timeline ever using it. Uncapped, each
 * side ran to roughly 700 inside the 1520 column, which is why the section read as
 * two thin ribbons of text with a lot of nothing between them.
 *
 * `justify-self` points the capped block at the rail from either side. Above 1100
 * the columns are already exactly 486, so it changes nothing there; between the
 * desktop breakpoint and 1100 it is what keeps the copy hugging the rail instead of
 * drifting out to the gutters.
 */

const ITEM_CLASS =
  "grid grid-cols-timeline-narrow items-start gap-4 desktop:grid-cols-timeline desktop:gap-12";

/**
 * The marker's cell. Always the rail column — column 1 narrow, column 2 wide.
 *
 * `flex justify-center` rather than a `justify-self` on the marker itself. Chrome
 * honours `justify-self` on a block-level child of a block container, which is
 * correct per CSS Box Alignment, but support outside Chromium is newer and
 * uneven — and a marker that lands 8px off the rail on one engine is the exact
 * failure this restructure exists to remove. Flex centring is understood
 * everywhere.
 */
const MARKER_CELL_CLASS = "col-start-1 flex justify-center desktop:col-start-2";

/**
 * The copy's cell, per side.
 *
 * Narrow: both sides take column 2 and read left to right. The benchmark collapses
 * its right-aligned rows the same way — a mirrored column is unreadable at 360.
 *
 * Wide: the copy takes the column on its own side of the rail, aligns toward it,
 * and is pushed against it by `justify-self`. Both sides aligning inward is what
 * the design draws.
 */
const SIDE_CLASS: Readonly<Record<TimelineSide, string>> = {
  start:
    "col-start-2 desktop:col-start-1 desktop:justify-self-end desktop:text-right",
  end: "col-start-2 desktop:col-start-3 desktop:justify-self-start desktop:text-left",
} as const;

/** The measure every step's copy caps at, on both sides. */
const TRACK_CLASS = "max-w-track";

export type TimelineItemProps = {
  step: HowItWorksStep;
  side: TimelineSide;
  /** Position among the steps, for the entrance stagger. */
  index: number;
};

export function TimelineItem({ step, side, index }: TimelineItemProps) {
  return (
    <li className={ITEM_CLASS}>
      {/*
        A cell rather than the marker itself, so the marker keeps its own 16 box and
        the grid keeps ownership of where that box sits. Giving the marker the
        placement classes directly would put layout back inside the component the
        rail has to agree with.
      */}
      <div className={MARKER_CELL_CLASS}>
        <TimelineMarker />
      </div>

      <div className={cx(SIDE_CLASS[side], TRACK_CLASS)}>
        <Reveal index={index}>
          <Heading id={`${step.id}-heading`} level="h3" role="step">
            {step.heading}
          </Heading>
          <div className="pt-4">
            <Text role="body" isSecondary>
              {step.body}
            </Text>
          </div>
        </Reveal>
      </div>
    </li>
  );
}
