import { TimelineConnector } from "./TimelineConnector";
import { TimelineItem } from "./TimelineItem";
import type { TimelineSide, TimelineStep } from "./TimelineItem";

/**
 * The rail and the entries on it.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] Takes any number of entries, where it previously took exactly three.
 *
 * A second page needs this timeline: the About page's § 4 runs the same rail with
 * two Mission/Vision phases. The three-tuple and the hard destructure were what
 * made it the homepage's component rather than the site's.
 *
 * The homepage's output is unchanged. Its sides were the literal list
 * `["end", "start", "end"]`, which is alternation starting on the end side — so
 * that is now derived rather than transcribed, and it produces the identical
 * sequence for three entries while giving two entries `end` then `start`.
 *
 * Deriving it is also the safer form: a list of sides and a list of steps can
 * disagree in length, and the previous pair only lined up because both were
 * fixed at three.
 */

/**
 * Which side an entry takes above the desktop breakpoint.
 *
 * Alternating, starting on the end side, which is what the design draws on both
 * pages. Kept here rather than in a content module: the side is a layout
 * decision, and coding-guidelines.md keeps design values out of content.
 */
function sideForIndex(index: number): TimelineSide {
  return index % 2 === 0 ? "end" : "start";
}

export type TimelineProps = {
  steps: readonly TimelineStep[];
};

export function Timeline({ steps }: TimelineProps) {
  return (
    /*
      [MEASURED] Capped at `--container-timeline` (1100) and centred, which is the
      benchmark's own timeline block: 486 track, 48 gap, 32 rail, 48 gap, 486 track.
      Below 1100 the cap does nothing and the row grid absorbs the difference.

      The cap belongs here rather than on `Container`: the rest of the page is drawn
      on the 1520 column and only the timeline is narrower, so this is a section's
      layout decision, not a change to the page's horizontal rhythm.

      `relative` makes this the positioned ancestor for the rail, which means the
      rail spans exactly the list — from the first marker's row to the last — and
      the heading block above it is untouched.
    */
    <div className="relative mx-auto max-w-timeline">
      <TimelineConnector />

      <ol role="list" className="flex flex-col gap-fluid-7 desktop:gap-fluid-8">
        {steps.map((step, index) => (
          <TimelineItem
            key={step.id}
            step={step}
            side={sideForIndex(index)}
            index={index}
          />
        ))}
      </ol>
    </div>
  );
}
