import type { HowItWorksContent } from "@/content/how-it-works.content";

import { TimelineConnector } from "./TimelineConnector";
import { TimelineItem } from "./TimelineItem";
import type { TimelineSide } from "./TimelineItem";

/**
 * Which side each step takes. Kept here rather than in the content module: the side is a
 * layout decision, and `coding-guidelines.md` keeps design values out of content.
 */
const STEP_SIDES: readonly [TimelineSide, TimelineSide, TimelineSide] = [
  "end",
  "start",
  "end",
] as const;

export type TimelineProps = {
  steps: HowItWorksContent["steps"];
};

export function Timeline({ steps }: TimelineProps) {
  const [firstSide, secondSide, thirdSide] = STEP_SIDES;
  const [first, second, third] = steps;

  const items = [
    { step: first, side: firstSide },
    { step: second, side: secondSide },
    { step: third, side: thirdSide },
  ];

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

      <ol role="list" className="flex flex-col gap-12 desktop:gap-20">
        {items.map(({ step, side }, index) => (
          <TimelineItem key={step.id} step={step} side={side} index={index} />
        ))}
      </ol>
    </div>
  );
}
