import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type { CallToAction } from "@/types/content.types";

import { CTAActions } from "./CTAActions";

/**
 * The closing conversion band's copy.
 *
 * ---------------------------------------------------------------------------
 * [REDESIGNED] This band was the weakest thing on the page: a section-sized
 * heading in a 400px column with a decorative graphic beside it, spaced exactly
 * like every other band. Nothing about it said "this is the moment to act".
 * Four changes, in order of how much each contributes.
 *
 * 1. THE HEADING IS AT `display` SCALE — 64 → 112, against the 32 → 48 it was.
 *    `display` exists for precisely one band on the page, and this is it.
 *    Spending the system's largest size anywhere else would make it mean
 *    nothing; never spending it at all, which is what was happening, means the
 *    page has no climax. At 112px "Ready to experience Africa?" breaks to three
 *    lines and fills the band, which is the point.
 *
 * 2. IT IS CENTRED, and it is the only band on the page that is.
 *    Every other heading — the hero included — sits on one continuous left edge.
 *    Breaking that edge exactly once, at the end, is what marks this band as a
 *    different kind of thing rather than one more section. The reference does
 *    the same: its closing band is the only centred heading on its homepage.
 *
 * 3. THE 400px COLUMN IS GONE.
 *    The whole block was capped by a `measure-feature` wrapper — 45 characters,
 *    a cap meant for copy inside a card. Applied to a band that spans the page
 *    it left two-thirds of the width empty and the heading crammed into a
 *    column narrower than the paragraph beneath it. Each element now carries its
 *    own measure, applied on the typed element so `ch` resolves correctly.
 *
 * 4. THE SPACING STEPS UP.
 *    `3xl` (36 → 48) between the copy group and the action, against the `xl`
 *    (28 → 32) it had. A button that sits as close to its paragraph as the
 *    paragraph sits to its heading reads as part of the paragraph.
 */

export type CTAContentProps = {
  heading: string;
  headingId: string;
  intro: string;
  action: CallToAction;
};

export function CTAContent({
  heading,
  headingId,
  intro,
  action,
}: CTAContentProps) {
  return (
    /*
      `text-center` inherits to every descendant, and `align="center"` centres
      the children themselves — which is what centres the measure-capped heading
      and paragraph without either carrying a margin.
    */
    <div className="relative text-center">
      <Stack gap="3xl" align="center">
        <Reveal index={0}>
          <Stack gap="md" align="center">
            {/*
              `measure="heading"` (30ch) rather than the default: at the display
              size that is ~2000px, well past the content column, so the heading
              wraps at the column and the cap only engages if the copy is ever
              replaced with something much longer. It is a guard, not a
              constraint.
            */}
            <Heading
              id={headingId}
              level="h2"
              role="display"
              measure="heading"
            >
              {heading}
            </Heading>

            {/*
              `lead` (18 → 20) rather than `body`. Under a 112px heading, body
              size reads as fine print. `narrow` (60ch) because centred text is
              harder to track from the end of one line to the start of the next,
              so it gets the tighter of the two body caps.
            */}
            <Text role="lead" measure="narrow">
              {intro}
            </Text>
          </Stack>
        </Reveal>

        <Reveal index={1}>
          <CTAActions action={action} />
        </Reveal>
      </Stack>
    </div>
  );
}
