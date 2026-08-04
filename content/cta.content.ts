import { PRIMARY_CTA } from "@/content/site.content";
import type { CallToAction, ImageAsset } from "@/types/content.types";

/**
 * Homepage CTA band content — the final conversion section before the footer.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] `copy.md` is still not in project knowledge, so the heading is
 * transcribed from the section screenshot rather than traced to the approved
 * document. **It needs copy approval**, like every string in `coverage.content.ts`
 * and `why-omanga.content.ts`.
 */

/**
 * The primary action.
 *
 * [DECISION] The frame reads "Open Your Free Wallet". This ships the approved
 * `PRIMARY_CTA` instead, spread so the label and destination have exactly one
 * owner and cannot drift from the header, the hero or any later band.
 *
 * `project-context.md` § Non-negotiable copy facts: "**Primary CTA is `Get
 * Started`.**" It also forbids inventing prices, and "Free" is a pricing claim no
 * approved document supports.
 *
 * [DISCREPANCY] `hero.content.ts` already ships "Open Your Free Wallet" →
 * `/payments`, cited to the redesign spec § 5.5. So the frame's label is not
 * invented — it is live on this page already, and after this change the hero's
 * primary and the band's primary read differently. That is defensible for a
 * catch-all closing band, but it is a copy decision either way.
 * **Confirm which label the band should carry.** Reverting is a one-line change
 * here and nowhere else.
 *
 * [NOTE] `/get-started` has no route yet and is not marked `isRoutePending`,
 * because `site.content.ts` owns that link and does not mark it either. The
 * missing stub is a routing task, tracked there.
 */
const PRIMARY_ACTION: CallToAction = PRIMARY_CTA;

/**
 * The secondary action.
 *
 * Label as the frame draws it: descriptive, claim-free, and carrying none of the
 * card language `project-context.md` strikes.
 *
 * [ASSUMPTION] `/insurance` rather than `/plans`. The redesign spec's
 * internal-linking plan covers the hero — "`/payments` (primary), `/insurance`
 * (secondary)" — but says nothing about this band. `/insurance` matches the
 * destination the hero already gives its own near-identical secondary label, and
 * it is the product landing page rather than a plan list. The footer maps
 * "Insurance Plans" to `/plans`, so the two are not consistent today.
 * **Confirm the band's destination.** Both routes exist, so neither is pending.
 */
const SECONDARY_ACTION: CallToAction = {
  label: "Get Insurance Plans",
  href: "/insurance",
  emphasis: "secondary",
} as const;

/**
 * The decorative line art.
 *
 * `alt` is deliberately empty. The artwork is abstract geometry sitting behind
 * the heading; it carries no information the heading and buttons do not already
 * give, so an empty alt is the correct statement rather than an omission
 * (`component-rules.md` § Image component rules).
 *
 * [DISCREPANCY] The asset carries its own greys — `#C2C2C2` and `#C8C8C8` at 0.8
 * and 1.8 stroke widths — neither of which is a token. It ships as supplied, the
 * same call `trust.content.ts` makes for the partner logos: recolouring a design
 * asset is a design decision, not an implementation one. Because the file is
 * referenced rather than inlined, no colour appears in any component.
 *
 * Several of its paths extend past the 708 × 346 viewBox on purpose, so the
 * shapes read as cropped by the band. That crop is baked into the asset and needs
 * no clipping here.
 *
 * [RENAMED] Supplied as `CTA vextor.svg`. `coding-guidelines.md` § File naming
 * requires "lowercase, hyphenated asset filenames. No spaces", and § Image
 * optimization requires assets be "renamed on import".
 */
const GRAPHIC: ImageAsset = {
  src: "/cta-graphic.svg",
  alt: "",
  width: 708,
  height: 346,
} as const;

export type CtaContent = {
  readonly heading: string;
  /**
   * Exactly two actions, primary first.
   *
   * A tuple rather than an array because the hierarchy is the content's to state
   * and `design-system.md` permits one primary per section. Nothing in the markup
   * decides which action matters more.
   */
  readonly actions: readonly [CallToAction, CallToAction];
  readonly graphic: ImageAsset;
};

export const ctaContent: CtaContent = {
  heading: "Ready to experience Africa?",
  actions: [PRIMARY_ACTION, SECONDARY_ACTION],
  graphic: GRAPHIC,
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const CTA_HEADING_ID = "cta-heading";
