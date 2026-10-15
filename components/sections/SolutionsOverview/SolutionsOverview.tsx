import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Reveal } from "@/components/ui/Reveal";
import type { SolutionsOverviewContent } from "@/content/solutions.content";

import { SectionHeader } from "./SectionHeader";
import { ProductPanel } from "./ProductPanel";
import { ConverterVisual } from "./visuals/ConverterVisual";
import { CoverPillVisual } from "./visuals/CoverPillVisual";

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
 * carries its own link and `design.md` rule 3 allows one primary button
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
  /*
    [CHANGED, 2026-10-15] Wise product cards (owner reference). The original
    twelve-column split stays: heading and intro in columns 1–4, the two cards
    in 5–12. Payments first, as in the reference's order of emphasis.
  */
  return (
    <Section labelledBy={headingId} tone="light">
      <Grid columns={12} gap="2xl">
        <div className="desktop:col-span-4">
          <Reveal index={0}>
            <SectionHeader
              headingId={headingId}
              eyebrow={content.eyebrow}
              heading={content.heading}
              intro={content.intro}
            />
          </Reveal>
        </div>

        <div className="desktop:col-span-8">
          <Grid columns={2} gap="lg">
            <Reveal index={1}>
              <ProductPanel content={content.insurance} headingId={INSURANCE_HEADING_ID} media="asset">
                {/* Wise-style cover pill (owner pick over a painted globe). */}
                <CoverPillVisual />
              </ProductPanel>
            </Reveal>
            <Reveal index={2}>
              <ProductPanel content={content.payments} headingId={PAYMENTS_HEADING_ID} media="widget">
                <ConverterVisual action={content.payments.primaryAction} />
              </ProductPanel>
            </Reveal>
          </Grid>
        </div>
      </Grid>
    </Section>
  );
}
