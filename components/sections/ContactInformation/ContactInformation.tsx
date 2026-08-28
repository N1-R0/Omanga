import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import type { ContactInformationContent } from "@/content/contact-information.content";
import type { Tone } from "@/types/ui.types";

import { ContactInfoCard } from "./ContactInfoCard";
import { OfficeMap } from "./OfficeMap";

/**
 * Contact information — spec § 5, and the last band on the page.
 *
 * A heading over a three-up card grid, with the office address as a paragraph
 * beneath it. A Server Component throughout: three cards and four links, nothing
 * interactive.
 *
 * [REVERSES § 6] The spec removes the map "entirely. Not replaced." One is added
 * on instruction, and § 6's stated reason — "Omanga publishes no office addresses,
 * so there is nothing to pin" — is overtaken by the address existing rather than
 * overruled. `OfficeMap` answers § 6's three remaining objections and records the
 * privacy question the frame opens.
 *
 * The page still ends here, and the footer follows.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Light, where the hero above it is also light.
 *
 * § 5 states no surface. The page runs hero → this → footer, and the footer is
 * ink, so the only alternation available is between these two bands or against
 * the footer. Light is the right choice for two reasons: the cards carry their own
 * `--color-surface-light` fill, which is what separates the grid from the page
 * without a second band colour, and § 1's own rhythm check claims the break comes
 * from layout rather than tone — "centred hero + inset panel → 2-up card grid →
 * single-column form → 3-up info grid → multi-column footer. No two consecutive
 * sections share a pattern."
 *
 * A dark band here would sit directly against the ink footer and merge with it,
 * which is the worse of the two.
 */
const SECTION_TONE: Tone = "light";

export type ContactInformationProps = {
  content: ContactInformationContent;
  headingId: string;
};

export function ContactInformation({
  content,
  headingId,
}: ContactInformationProps) {
  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      {/*
        `gap="4xl"` (40 → 64) between the heading block and the grid — the step
        that separates a heading block from a content block, and the one every
        other section on the site uses in this position.
      */}
      <Stack gap="4xl">
        <Reveal index={0}>
          {/*
            Centred, matching the hero's options panel and the rest of the site's
            section headings. `text-center` is declared once here and inherits,
            because centring is this band's layout decision — `Heading` takes no
            `className`, and a primitive that could choose its own alignment could
            choose the wrong one.
          */}
          <div className="text-center">
            <Stack gap="lg" align="center">
              <Heading id={headingId} level="h2" role="section">
                {content.heading}
              </Heading>
            </Stack>
          </div>
        </Reveal>

        <Reveal index={1}>
          {/*
            Three up at desktop, two at tablet, one below — `Grid`'s own
            breakpoint behaviour, from design.md § 10: "3-up and 4-up wait for
            desktop, so cards never get squeezed below a readable width at 768."

            `isEqualHeight` is the default and is what card rules require: cards in
            a row are equal height with their actions aligned across the row, which
            `Card`'s own `justify-between` then delivers regardless of how much
            body copy each one carries.
          */}
          <Grid columns={3} gap="2xl">
            {content.cards.map((card) => (
              <ContactInfoCard key={card.id} card={card} />
            ))}
          </Grid>
        </Reveal>

        {/*
          The office, on a map, with its address in text beneath it.

          Still beneath the grid and still not a fourth card, which is what § 5
          requires of the address. The map itself reverses § 6's removal — added on
          instruction, and § 6's reason was that there was nothing to pin, which an
          actual address overtakes. `OfficeMap` records how § 6's other three
          objections are answered and the one question it leaves open.
        */}
        <Reveal index={2}>
          <OfficeMap content={content.map} address={content.address} />
        </Reveal>
      </Stack>
    </Section>
  );
}
