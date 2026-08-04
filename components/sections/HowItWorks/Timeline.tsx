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
    <div className="relative">
      <TimelineConnector />

      <ol role="list" className="flex flex-col gap-20">
        {items.map(({ step, side }, index) => (
          <TimelineItem key={step.id} step={step} side={side} index={index} />
        ))}
      </ol>
    </div>
  );
}
