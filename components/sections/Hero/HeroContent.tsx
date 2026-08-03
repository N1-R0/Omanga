import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { CallToAction } from "@/types/content.types";

import { HeroActions } from "./HeroActions";

/**
 * The hero's copy stack: badge, headline, sub-headline, actions, helper text.
 *
 * The order is the approved copy document's order, and it is fixed. Figma draws
 * no helper text — it predates copy approval — so the helper line sits beneath
 * the actions, which is the only position consistent with the document's sequence
 * and with what the line is for: reducing the risk of clicking the button
 * directly above it.
 *
 * Spacing is one value throughout. The Figma frame is a single vertical stack
 * with `spacing: 24`, and 24 is already the system's "heading to body" step, so
 * `gap="lg"` reproduces the frame exactly without introducing a hero-specific
 * number.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] No `HeroBadge` component.
 *
 * The suggested structure included one, but `Badge` is already the eyebrow pill
 * and rule 7 exists to keep its geometry identical everywhere. A `HeroBadge`
 * would do nothing but pass `tone="dark"` through — a wrapper that restyles
 * rather than adding layout or behaviour, which is the one thing composition
 * rules say wrappers must not do. `Badge` is used directly.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] No secondary-opacity text anywhere in the hero.
 *
 * The system expresses secondary copy as 80% opacity, and every other surface can
 * afford it. Over the scrim it cannot: 80% white composites toward the photograph
 * beneath, which spends the contrast headroom the 60% scrim was measured to
 * provide. All hero text is full-opacity white, and the hierarchy comes from the
 * type scale instead — which is where it should come from anyway.
 */

export type HeroContentProps = {
  headingId: string;
  eyebrow: string;
  heading: string;
  intro: string;
  actions: readonly [CallToAction, CallToAction];
  helperText: string;
};

export function HeroContent({
  headingId,
  eyebrow,
  heading,
  intro,
  actions,
  helperText,
}: HeroContentProps) {
  return (
    /*
      `text-center` is declared once and inherits to every descendant. The
      primitives have no alignment prop, correctly — alignment is a layout
      decision belonging to the parent, and `Heading` and `Text` fill the space
      they are given.

      `align="center"` on the Stack is the other half of it: that centres the
      children themselves, which is what centres the measure-capped sub-headline
      and the badge without either of them carrying a margin.
    */
    <div className="text-center">
      <Stack gap="lg" align="center">
        <Badge tone="dark">{eyebrow}</Badge>

        {/*
          The page's single `h1`, at display scale — Helvetica Light 64 with +2
          tracking, all of which travels with the `--text-display` token rather
          than being set here.

          Capped at 1136, from the frame's `.frame(width: 1134)`, normalised onto
          the 4px grid. The cap is a wrapper rather than a prop on `Heading`
          because measure is a layout decision the parent owns — and `Heading`
          deliberately takes no `className`. The parent Stack's `align="center"`
          is what centres the capped block.

          Sentence case, not the uppercase the frame renders: the supplied string
          is sentence case, and `typography.css` pins `text-transform: none` on
          headings so the uppercase cannot return by accident.
        */}
        <div className="max-w-hero-heading">
          <Heading id={headingId} level="h1" role="display">
            {heading}
          </Heading>
        </div>

        {/*
          Capped at the narrow measure (648) rather than the body measure (756).
          Centred text is harder to track from the end of one line to the start of
          the next, so the approved sub-headline — considerably longer than the
          fragment Figma shows — gets the tighter of the two caps.
        */}
        <Text role="body" measure="narrow">
          {intro}
        </Text>

        {/*
          Full width so the actions can go full-width on mobile. The parent Stack
          centres its children, which would otherwise shrink the button row to its
          content and defeat "buttons full-width, stacked" at the narrow
          breakpoint. `HeroActions` re-centres the row itself from tablet up.
        */}
        <div className="w-full">
          <HeroActions actions={actions} />
        </div>

        {/*
          The `small` role — 14, in the heading family. Not the caption role, which is
          Inter and which
          design-system.md reserves for legal and metadata. This is supporting
          body copy.
        */}
        <Text role="small">{helperText}</Text>
      </Stack>
    </div>
  );
}
