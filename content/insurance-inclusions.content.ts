/**
 * Included on every plan — spec § 6.2, as a section of its own.
 *
 * [CHANGED] § 6.2 is a sub-block of "What each plan covers" in the spec, an
 * `h3` beneath the comparison table. The Figma frame draws it as a standalone
 * three-column feature grid with its own rhythm, so it is lifted out and given
 * its own `h2`. The table section keeps § 6.1 alone.
 *
 * The five inclusions are the spec's, verbatim, and they are the same five § 5's
 * footnote names beneath the plan grid — telemedicine, roaming, 24/7 support,
 * the mobile app and the newsletter. Stated twice on the page deliberately: once
 * as a one-line reassurance under the prices, once here in full.
 *
 * ---------------------------------------------------------------------------
 * [REPLACED] The frame's icons are not the ones shipping.
 *
 * It draws a 40px line icon above each term, and its five assets are the
 * template's own — named `Lock-2.svg`, `Search.svg`, `Code.svg`,
 * `Offsite Bold.svg` and `Frame.svg`, rendering as a padlock, a magnifier, a
 * pair of angle brackets, an offsite arrow and a receipt. A padlock above
 * "Telemedicine" and `</>` above "24/7 dedicated contact centre" describe
 * nothing; they survived from whatever the frame was built over.
 *
 * Replaced with glyphs that mean what the terms say, drawn from `lucide-react`
 * — already a dependency, ISC licensed, and the set the legacy insurance pages
 * already used for these same five concepts. Which glyph goes with which term
 * is a design decision, not copy, so the mapping lives in the section component
 * and this module carries only a stable `id` to key it by.
 */

export type Inclusion = {
  /** Keys the icon mapping in the section. Never rendered. */
  readonly id: string;
  readonly term: string;
  readonly description: string;
};

export type InsuranceInclusionsContent = {
  readonly heading: string;
  readonly inclusions: readonly Inclusion[];
};

export const insuranceInclusionsContent: InsuranceInclusionsContent = {
  heading: "Included on every plan, whichever you choose",
  inclusions: [
    {
      id: "telemedicine",
      term: "Telemedicine",
      description:
        "Virtual consultations with licensed doctors, wherever you are.",
    },
    {
      id: "roaming",
      term: "Roaming",
      description:
        "Your cover travels with you across the countries Omanga serves.",
    },
    {
      id: "contact-centre",
      term: "24/7 dedicated contact centre",
      description: "Round-the-clock support when you need it.",
    },
    {
      id: "newsletter",
      term: "Health-tips newsletter",
      description: "Weekly wellness tips and health insights.",
    },
    {
      id: "mobile-app",
      term: "Mobile app",
      description: "Manage your policy and claims on the go.",
    },
  ],
} as const;

export const INSURANCE_INCLUSIONS_HEADING_ID =
  "insurance-inclusions-heading" as const;
