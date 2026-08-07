import { Check } from "@/components/icons/Check";
import { Close } from "@/components/icons/Close";
import { Card } from "@/components/ui/Card";
import type { CardProps } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import type { ComparisonGroup } from "@/content/why-omanga.content";

import { ComparisonList } from "./ComparisonList";

/**
 * One side of the comparison: a titled heading row, then the panel of statements.
 *
 * The title sits *outside* the panel, which is what the frame draws and what makes
 * the two sides scan as a pair of labelled columns rather than two unrelated cards.
 *
 * ---------------------------------------------------------------------------
 * Everything visual is derived from `sentiment`, so a group cannot be given a
 * tick and a plain border, or a cross and the emphasised one:
 *
 *   negative -> `Close`, `comparison`           #2D2E2E, 1px subtle border
 *   positive -> `Check`, `comparison-emphasis`  #2D2E2E, 5px brand border
 *
 * Both variants already exist on the `Card` primitive and are used as-is —
 * `design.md` § Card variants defines the pair, and `card rules` require
 * that "emphasis is a border, never shadow, scale, or a different padding".
 * Nothing here restyles the card.
 *
 * The heading is `h3` at the `column` role, which is 24/32 — `design.md`
 * names that role "H4 (comparison column)" for precisely this element. The level
 * is `h3` because the section's own heading is the `h2`; the level and the size
 * are independent by design, so neither is chosen for the other's reason.
 *
 * The 32 mark beside it is the "beside a section or column heading" size, and the
 * 12 gap to the label is the icon-pairing step. Both are the values § Icon usage
 * states.
 *
 * ---------------------------------------------------------------------------
 * [DISCREPANCY] The frame's panels carry roughly 90 of empty space below their
 * last row, and both panels are the same height despite that slack — a fixed
 * height in the design file. `component-rules.md` § Layout rules forbids
 * reproducing it: "No fixed heights on content containers. Height follows
 * content." The panels here are equal to each other and no taller than their
 * content. **Confirm the intended panel height with design.**
 *
 * [DISCREPANCY] The frame's emphasised panel reads darker than its sibling, as
 * though it were filled with the section colour rather than the card colour.
 * `design.md` specifies #2D2E2E for both and the `Card` primitive
 * implements that, so both are filled identically here. Changing it would mean
 * editing a primitive five other components rely on. **Confirm with design.**
 */

const MARK = {
  negative: Close,
  positive: Check,
} as const;

const CARD_VARIANT: Readonly<
  Record<ComparisonGroup["sentiment"], CardProps["variant"]>
> = {
  negative: "comparison",
  positive: "comparison-emphasis",
} as const;

export type ComparisonCardProps = {
  group: ComparisonGroup;
};

export function ComparisonCard({ group }: ComparisonCardProps) {
  const { id, title, sentiment, items } = group;
  const titleId = `${id}-title`;
  const Mark = MARK[sentiment];

  return (
    <div className="flex h-full flex-col gap-fluid-4 tablet:gap-fluid-6">
      <div className="flex items-center gap-fluid-2">
        <Mark size="lg" />

        <Heading id={titleId} level="h3" role="column">
          {title}
        </Heading>
      </div>

      {/*
        `grow` on the wrapper plus the card's own `h-full` is what makes the two
        panels finish level when one side's statements wrap further than the
        other's. The card cannot be given a class directly — primitives take no
        `className` — so the height contract lives on the wrapper the section owns.
      */}
      <div className="grow">
        <Card
          variant={CARD_VARIANT[sentiment]}
          body={
            <ComparisonList
              items={items}
              sentiment={sentiment}
              labelledBy={titleId}
            />
          }
        />
      </div>
    </div>
  );
}
