import { Heading } from "@/components/ui/Heading";
import type { PaymentsFeature } from "@/content/payments-features.content";
import type { RateRow } from "@/lib/rates";
import type { HeadingLevel } from "@/types/ui.types";

import { AccountDrawerVisual } from "./visuals/AccountDrawerVisual";
import { CoverageChipsVisual } from "./visuals/CoverageChipsVisual";
import { RateTickerVisual } from "./visuals/RateTickerVisual";

/**
 * One of § 4's three capability cards: a heading, then the artwork.
 *
 * One component with three visuals, not three components. The cards have
 * identical structure and component rules require that of them: "Repeated
 * structures are one component with variants, never duplicated per section."
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] The card is now the visual.
 *
 * It carried an eyebrow, a heading, two-to-three lines of body and a link. All
 * three of the first, the third and the fourth are gone, so the artwork is the
 * argument and the heading only names it. The content module records what each
 * removal cost — two of the three were not free.
 *
 * The order inverted with it: heading on top, artwork filling everything under
 * it. That is why this is not the `Card` primitive.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Not `Card`, and not a near-copy of it either.
 *
 * `Card` fixes its slot order as media → eyebrow → heading → body → action, and
 * pads uniformly on all four sides. This card needs the reverse order and an art
 * box that bleeds to three edges, and neither is expressible through its props.
 * Adding a reversal axis and a bleed axis to a shipped primitive, for one caller,
 * would put two ways of building a card into a system whose whole card rule is
 * that there is one.
 *
 * So `pf-card` is a separate shell that borrows rather than reinvents: the brand
 * surface, `--radius-md` — the system's step for "panels, media plates, large
 * surfaces", which is what a card that is mostly artwork is — and no shadow.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] All three take the brand fill.
 *
 * `design.md` § 8 reserves brand for "interaction and emphasis" and says it is
 * "never a surface behind long-form text except the closing conversion band".
 * Three brand cards is a departure, made on instruction and modelled on the
 * reference this section was designed against, where a row of flat brand cards
 * each carrying one white object is the whole device.
 *
 * There is no long-form text on them any more, which removes half the objection:
 * § 8's concern is brand *behind prose*, and these carry a heading and a picture.
 * What remains is that the page now has two brand surfaces, so the closing band
 * is no longer the only place the colour appears. It is still the only place a
 * conversion control sits on it — these cards carry no button at all.
 */

export type FeatureCardProps = {
  content: PaymentsFeature;
  /**
   * The document outline level. Passed in so the section owns the outline and a
   * card cannot skip a level.
   */
  headingLevel: HeadingLevel;
  headingId: string;
  /** Live rates, for the rate card. Ignored by the other two. */
  rates: readonly RateRow[];
};

/**
 * Resolves the card's `id` to its artwork.
 *
 * Here rather than in the section, so this file is the single place that knows
 * how the three cards differ — the same argument the docblock above makes for
 * there being one card component and not three.
 */
function FeatureVisual({
  id,
  rates,
}: Pick<FeatureCardProps, "rates"> & {
  id: PaymentsFeature["id"];
}) {
  switch (id) {
    case "wallet":
      return <AccountDrawerVisual />;
    case "rates":
      return <RateTickerVisual rates={rates} />;
    case "coverage":
      return <CoverageChipsVisual />;
  }
}

export function FeatureCard({
  content,
  headingLevel,
  headingId,
  rates,
}: FeatureCardProps) {
  return (
    <article className="pf-card">
      {/*
        `pf-card-heading` is a wrapper that bumps the heading inside it to weight
        600. `Heading` takes no `className` by design, and adding a weight axis to
        it would make the exception available to every heading on the site — see
        the utility for the design.md rule this overrides and why it is contained
        here.

        `measure="none"`: the card is already narrower than any heading measure,
        so a 30ch cap would only ever wrap the heading earlier than the card does.
      */}
      <div className="pf-card-head pf-card-heading">
        <Heading
          id={headingId}
          level={headingLevel}
          role="feature"
          measure="none"
        >
          {content.heading}
        </Heading>
      </div>

      <FeatureVisual id={content.id} rates={rates} />
    </article>
  );
}
