import { ArrowRight } from "@/components/icons/ArrowRight";
import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { SupportBlockContent } from "@/content/contact-hero.content";

/**
 * The `Need support?` block — spec § 2's inset panel, in the hero's left column.
 *
 * ---------------------------------------------------------------------------
 * [MEASURED from node 2579:131893] `Need support?` is a 40px heading at
 * line-height 1.1 with −0.03em tracking, which is `--text-h3` at its wide end, so
 * `role="step"`. Its paragraph is 18px at 1.5, which is `--text-main` at its wide
 * end. The node puts 32 between them, which is `--space-5`.
 *
 * [DEVIATION] The node draws it as flowing copy in the left column with a bold
 * phone number, not as a panel. § 2's typography note asks for "Omanga's blush
 * tint background with a subtle left rule in maroon". Neither ships: the node's
 * arrangement is the instruction, the recessed treatment belongs to § 3's panel
 * on the right, and there is no blush in this system — design.md § 8 holds one
 * brand colour and four neutrals.
 *
 * [SUBSTITUTED] The node's bold `0333 010 2157` is a phone number, and § 0
 * mandates its removal: "No phone number appears anywhere on the page." The
 * WhatsApp button takes the slot, which is § 2's own substitution and the one
 * button § Conversion notes permits in this band — "a customer with a failed
 * transaction needs the fastest possible exit from the page, not a form."
 */

export type SupportBlockProps = {
  content: SupportBlockContent;
};

export function SupportBlock({ content }: SupportBlockProps) {
  return (
    /*
      `align="start"` rather than the default `stretch`, so the button sizes to
      its own label instead of spanning the column. A pill across 680px reads as a
      banner, which is the same call `CTAActions` records for the closing band.
    */
    <Stack gap="xl" align="start">
      <Stack gap="lg" align="start">
        {/*
          An `h3`, per § SEO's hierarchy — "H3 | Need support? | 2 — hero panel" —
          sitting under this section's `h1`. `measure="none"`: it is two words and
          a cap on it would express nothing.
        */}
        <Heading
          id="contact-support-heading"
          /*
            [FIXED] Was `h3`, directly after the page's `h1`, which skipped `h2`
            entirely — the first heading a screen reader met after the page title
            was two levels down, implying a parent section that does not exist.

            `level` and `role` are separate props precisely so this can be
            corrected without touching the type scale: the outline level moves to
            `h2` and the visual size stays `step`, so nothing on the page looks
            different.
          */
          level="h2"
          role="step"
          measure="none"
        >
          {content.heading}
        </Heading>

        {/*
          [MEASURED] `measure="narrow"` (60ch) — 540px at the 18px this role
          resolves to, which is the node's own paragraph width. It matches the
          intro paragraph above it deliberately: two different caps in one column
          would put a visible step in the left edge's line length.

          It was `feature` (45ch), which is 405 and read tight.
        */}
        <Text role="body" measure="narrow">
          {content.body}
        </Text>
      </Stack>

      {/*
        `tone="light"` because the band is the page surface. The primary treatment
        on light is a brand fill with a white label at 6.70:1, inverting to ink on
        hover.

        Both icons ship, and § 2 asks for both in different places: the glyph
        "left of label", and the forward arrow its own copy shows
        (`Chat on WhatsApp →`). The mark is what says which app is about to open;
        the arrow is what says the page is about to be left.

        `isExternal` comes from the content module and is what adds
        `target="_blank"` and `rel="noopener noreferrer"`. § 2 requires both, and
        requires the link not be intercepted with a modal: on mobile it deep-links
        into the WhatsApp app, on desktop it opens WhatsApp Web.
      */}
      <Button
        as="link"
        variant={content.action.emphasis}
        tone="light"
        href={content.action.href}
        isExternal={content.action.isExternal}
        leadingIcon={<WhatsAppMark size="sm" tone="brand" />}
        trailingIcon={<ArrowRight size="sm" />}
      >
        {content.action.label}
      </Button>
    </Stack>
  );
}
