import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import type { SolutionsOverviewContent } from "@/content/solutions.content";

import { SectionHeader } from "./SectionHeader";
import { SolutionCard } from "./SolutionCard";

/**
 * The homepage's Solutions Overview section — Omanga's two core offerings,
 * introduced beside a left-hand heading column.
 *
 * A Server Component with nothing interactive in it. Both card actions are
 * links and everything else is text and images, so no part of this section
 * hydrates and all of its copy is in the server HTML — which the SEO
 * expectations require of the page's section headings and body.
 *
 * ---------------------------------------------------------------------------
 * STRUCTURE: mirrored from the layout reference, not from the Figma frame.
 *
 * The Figma frame (node 1265:12553) draws a centred heading block stacked above
 * a full-width pair of cards. `claritybusinesstravel.com` — the structural
 * reference this redesign follows — puts the heading block in a left-hand column
 * *beside* the cards, and that is the arrangement that ships. The frame's copy,
 * surfaces, art and card internals are unchanged; only the section's own
 * skeleton comes from the reference.
 *
 * Measured off the reference at a 1847 viewport, where its content column
 * resolves to 1424 (its `--site--width` is 95rem, the same figure this project
 * already uses, less a 48 margin):
 *
 *   twelve columns, 16 gutter    -> column pitch 120
 *   heading column   1 – 4       -> 464
 *   card region      5 – 12      -> 944
 *   card gap         24          -> its `--_spacing---space--4` at the wide end
 *   card radius      8           -> its `--radius--small`
 *   card padding     24 / 24 / 32
 *
 * Every one of those maps onto an existing token. The reference's `--swatch--yellow`
 * and `--swatch--light-grey` map to `--color-brand` and `--color-surface-light`:
 * its palette is not imported, only its geometry.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATES FROM THE REFERENCE] The outer grid gap is 48, not 16.
 *
 * `Grid`'s gap applies on both axes, and below the desktop breakpoint this grid
 * stacks — so the same value that separates the heading column from the cards
 * horizontally is also what separates the intro from the first card vertically.
 * 16 is right for the first job and far too tight for the second. 48 is the
 * system's column-gap step, reads correctly at desktop, and gives the stacked
 * order the separation it needs. The visible cost is about 20px off the
 * reference's heading-column width, which the 486 copy measure absorbs.
 *
 * ---------------------------------------------------------------------------
 * This section is CTA-free at section level, and stays that way. Each card
 * carries its own link and `design-system.md` rule 3 allows one primary button
 * per section — this one has none, because both offerings are peers and
 * promoting either would be a content decision nobody has made.
 */

/**
 * The card heading ids.
 *
 * Module constants rather than props: nothing outside this section consumes
 * them. The section's own heading id *is* a prop, because `Section` names itself
 * with it and the content module owns the value.
 */
const INSURANCE_HEADING_ID = "solutions-insurance-heading";
const PAYMENTS_HEADING_ID = "solutions-payments-heading";

/**
 * The `sizes` attribute for the card art, declared once here because the grid
 * that determines it lives here.
 *
 * The art box is a card's width less the card's own 24 inset. Resolved at each
 * breakpoint the layout actually changes at:
 *
 *   wide    1424 content, cards take 8 of 12 columns   -> ~406
 *   desktop cards take 8 of 12 of a fluid column       -> ~26vw
 *   tablet  cards take the full column, two up         -> ~39vw
 *   mobile  one card per row, full column              -> 100vw less the
 *                                                         gutter and the inset
 */
const IMAGE_SIZES =
  "(min-width: 90rem) 406px, (min-width: 64rem) 26vw, (min-width: 48rem) 39vw, calc(100vw - 5rem)";

export type SolutionsOverviewProps = {
  content: SolutionsOverviewContent;
  /**
   * The id of the section's `h2`.
   *
   * Passed in rather than defined here so the value has exactly one owner — the
   * content module — and the heading and the `aria-labelledby` cannot drift
   * apart.
   */
  headingId: string;
};

export function SolutionsOverview({
  content,
  headingId,
}: SolutionsOverviewProps) {
  return (
    /*
      `Section` owns the surface, the vertical rhythm, the container and the
      accessible name. The light tone gives the 64 / 88 / 100 rhythm, and 100 at
      the desktop end is what the Figma frame measures — the one section-level
      figure the frame and the reference agree on.
    */
    <Section labelledBy={headingId} tone="light">
      {/*
        The reference's twelve-column split. `Grid` collapses this to a single
        column below the desktop breakpoint, which is the right threshold here:
        a 4-column copy block beside two cards has no room to work at 768, so
        tablet gets the heading above the cards and the cards still side by side.

        `Grid` never reorders, so the DOM order — heading, then cards — is the
        reading order at every width.
      */}
      <Grid columns={12} gap="3xl">
        {/*
          Columns 1–4. The span is declared by the section, not by the child:
          "Sections declare column spans; children never position themselves."
        */}
        <div className="desktop:col-span-4">
          <SectionHeader
            headingId={headingId}
            eyebrow={content.eyebrow}
            heading={content.heading}
            intro={content.intro}
          />
        </div>

        {/* Columns 5–12, holding the card pair as its own two-column grid. */}
        <div className="desktop:col-span-8">
          {/*
            24 between the cards — the reference's own card gap, and the
            system's "adjacent" step. Equal height is `Grid`'s default and is
            load-bearing: it is what lets `Card` push both copy blocks to the
            foot of the row so the two pills land on one line however much body
            copy each offering carries.
          */}
          <Grid columns={2} gap="lg">
            {/*
              Insurance first, and emphasised. That is the frame's order and the
              frame's surface assignment; nothing here infers hierarchy, and
              swapping the two is a one-line change in this file.
            */}
            <SolutionCard
              content={content.insurance}
              emphasis="primary"
              presentation="illustration"
              headingLevel="h3"
              headingId={INSURANCE_HEADING_ID}
              imageSizes={IMAGE_SIZES}
            />

            <SolutionCard
              content={content.payments}
              emphasis="secondary"
              presentation="device"
              headingLevel="h3"
              headingId={PAYMENTS_HEADING_ID}
              imageSizes={IMAGE_SIZES}
            />
          </Grid>
        </div>
      </Grid>
    </Section>
  );
}
