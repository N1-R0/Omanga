import { Reveal } from "@/components/ui/Reveal";
import type { ComparisonGroup } from "@/content/why-omanga.content";

import { ComparisonCard } from "./ComparisonCard";

/**
 * The two comparison columns.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] A hand-rolled grid rather than the `Grid` primitive.
 *
 * `Grid` is the right component for almost every case on this page and takes one
 * `gap` for both axes. This layout genuinely needs two, because the same token
 * cannot be correct on both:
 *
 *   horizontal, tablet up   the seam between the two panels, 12
 *   vertical, mobile        the break between two labelled units, 48
 *
 * `design-system.md` § Grid system specifies "Comparison: two equal columns, 10
 * gap", and 10 is not a step — 12 is the nearest, and normalising upward keeps the
 * seam looking deliberate rather than like a rounding error. But at mobile the
 * columns stack, and 12 between them would put each title closer to the panel
 * above it (12) than to its own panel (40), which inverts the hierarchy the
 * section depends on. 48 restores it.
 *
 * The two axes never interact: `gap-x` only matters once there are two columns,
 * `gap-y` only once there is more than one row. Passing `gap="sm"` to `Grid`
 * would be wrong on mobile and adding a second gap axis to `Grid` would change a
 * primitive five other sections already rely on, which is out of scope here.
 * **Worth promoting into `Grid` when a second section needs it.**
 *
 * `items-stretch` is what equalises the two columns; each card then fills its
 * stretched cell. Reading order is never reordered, so the DOM order and the
 * visual order agree at every width — the negative side first, then Omanga's.
 *
 * ---------------------------------------------------------------------------
 * MOTION. Each column enters on intersection, 80ms apart, once. `Reveal` carries
 * the tokens — 400ms, 16px upward, ease-out — and drops the animation entirely
 * under `prefers-reduced-motion` rather than replaying it or leaving content
 * hidden.
 *
 * `revealFrom` continues the section's sequence instead of restarting it, so the
 * heading, the intro and the two columns read as one cascade. The stagger stops at
 * the column: the rows inside do not stagger individually, because ten more steps
 * would still be animating after a reader had reached the first statement.
 *
 * The children are passed from a Server Component, so every statement is in the
 * server HTML even though `Reveal` is a client boundary. Nothing here depends on
 * hydration to be readable or indexable.
 */

export type ComparisonGridProps = {
  groups: readonly ComparisonGroup[];
  /**
   * Where this grid's columns sit in the section's entrance sequence.
   *
   * The section owns the order of its own reveals; without this the columns would
   * restart at zero and fire alongside the heading.
   */
  revealFrom: number;
};

export function ComparisonGrid({ groups, revealFrom }: ComparisonGridProps) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-y-12 tablet:grid-cols-2 tablet:gap-x-3 tablet:gap-y-0">
      {groups.map((group, index) => (
        <Reveal key={group.id} index={revealFrom + index}>
          <ComparisonCard group={group} />
        </Reveal>
      ))}
    </div>
  );
}
