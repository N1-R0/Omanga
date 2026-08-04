import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import { cx } from "@/lib/cx";
import type { HowItWorksStep } from "@/content/how-it-works.content";

import { TimelineMarker } from "./TimelineMarker";

/** Which side of the centre rail this step sits on above the desktop breakpoint. */
export type TimelineSide = "start" | "end";

const ITEM_CLASS =
  "relative pl-10 desktop:grid desktop:grid-cols-2 desktop:gap-12 desktop:pl-0";

// Both sides align their text toward the rail, which is what the design draws.
const SIDE_CLASS: Readonly<Record<TimelineSide, string>> = {
  start: "desktop:col-start-1 desktop:text-right",
  end: "desktop:col-start-2 desktop:text-left",
} as const;

export type TimelineItemProps = {
  step: HowItWorksStep;
  side: TimelineSide;
  /** Position among the steps, for the entrance stagger. */
  index: number;
};

export function TimelineItem({ step, side, index }: TimelineItemProps) {
  return (
    <li className={ITEM_CLASS}>
      <TimelineMarker />

      <div className={cx(SIDE_CLASS[side])}>
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
