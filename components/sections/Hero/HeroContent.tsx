import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import type { CallToAction } from "@/types/content.types";

import { HeroActions } from "./HeroActions";

/**
 * The hero's copy: one headline and the actions.
 *
 * ---------------------------------------------------------------------------
 * REDESIGNED against the reference. Three things changed and each is deliberate.
 *
 * 1. THE SUB-HEADLINE IS GONE.
 *    The reference's hero band contains its `h1` and nothing else. A headline
 *    with a paragraph under it is a section, not a hero — the eye has to read
 *    twice before it knows what the product is, and the headline stops being the
 *    thing that carries the page.
 *
 *    The removed sentence is not lost: it is the page's meta description
 *    verbatim, and the Solutions Overview directly beneath opens with two
 *    paragraphs covering the same ground. Nothing that was indexed is gone.
 *
 * 2. THE EYEBROW BADGE IS GONE.
 *    Same reason. A pill above the headline is a third thing to read before the
 *    headline, and the reference has none.
 *
 * 3. EVERYTHING IS LEFT-ALIGNED.
 *    Centred display type at three-plus lines is genuinely harder to read —
 *    every line starts in a different place, so the eye has to search for the
 *    start of the next one. The reference left-aligns its headline flush to the
 *    page gutter, which also puts the headline, the CTA and every section
 *    heading below it on one shared vertical edge. That single continuous edge
 *    down the left of the page is most of what reads as "designed".
 *
 * 4. [2026-08-29] THE RISK-REDUCING LINE IS GONE.
 *    "No monthly fee. Set up in minutes." sat under the actions. Removed on
 *    instruction, and it takes the same argument as 1 and 2 one step further:
 *    the reference's hero band holds its `h1` and nothing else, and this band is
 *    now the headline and the two buttons.
 *
 *    It also removes one of the two elements the unscrimmed photograph could not
 *    carry — see the contrast table in `Hero`. That is a side effect, not the
 *    reason, and the secondary button's label is still on the wing.
 *
 * What remains is a two-step hierarchy — statement, then action — with nothing
 * competing with the statement.
 */

export type HeroContentProps = {
  headingId: string;
  heading: string;
  actions: readonly [CallToAction, CallToAction];
};

export function HeroContent({
  headingId,
  heading,
  actions,
}: HeroContentProps) {
  return (
    /*
      `align="start"` rather than `stretch`: the children size to their content
      and sit against the leading edge, which is what left-aligns the action row
      without `HeroActions` knowing where it is.

      `gap="xl"` (28 → 32) between the three blocks. The reference runs its hero
      at one spacing value throughout, and this is the step that reads as
      "related but distinct" at display scale — 24 would let the CTA crowd the
      headline's descenders, 40 would break the group apart.
    */
    <Stack gap="xl" align="start">
      {/*
        The page's single `h1`, at the h1 role — 40 → 64, weight 500,
        −0.03em tracking, sentence case.

        `measure="hero"` owns where the headline breaks, applied on the heading
        itself so the `ch` unit resolves against the clamped size rather than
        against the root.

        It is set so the headline is THREE lines at the wide end and folds to
        four and five as the column narrows. That is the whole point of
        putting the cap on the heading rather than letting the container decide:
        the break is chosen, and it stays chosen at every width instead of
        landing wherever the column happens to run out.
      */}
      <Heading id={headingId} level="h1" role="hero" measure="hero">
        {heading}
      </Heading>

      <HeroActions actions={actions} />
    </Stack>
  );
}
