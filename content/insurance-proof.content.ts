import type { CallToAction, ImageAsset } from "@/types/content.types";

/**
 * Who stands behind your cover — spec § 8.
 *
 * Third-party validation before the ask. The evidence is the provider network,
 * not a case study, because Omanga has none of the case-study kind.
 *
 * [NOTE] Every figure below is already published on Omanga's own pages. No
 * percentage appears, deliberately — a percentage implies measurement Omanga
 * has not published.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] The country count is out of the stat row.
 *
 * Spec § 8's first figure is "52 / African countries covered", and it is wrong:
 * the country count describes where the *wallet* spends, not where the *cover*
 * admits you. Removed on instruction.
 *
 * The approved Get Started copy already draws that line. Its payments paragraph
 * says "spending across 43 African countries"; its insurance paragraph
 * deliberately does not give a number at all — "reach care in any of the
 * countries Omanga covers". Two documents, one careful distinction, and the
 * insurance spec collapsed it.
 *
 * Replaced with activation time, which is the only other figure published on
 * Omanga's own pages that is genuinely about the cover: the same approved
 * paragraph says a plan is activated "in under five minutes with no paperwork".
 * "5 min" states that conservatively — it claims no faster than the source does.
 *
 * [BLOCKER] Three other places on this page still make the country claim *for
 * insurance*, and this change contradicts them:
 *
 *   - the hero — "travel across 43 African countries knowing that care is
 *     arranged"
 *   - § 4 card 1 — "Coverage across 43 African countries"
 *   - § 7 row 5 — "One plan across 43 African countries, roaming included"
 *
 * All three are the spec's own copy with the count corrected from 52. If the
 * cover does not reach 43 countries, all three are wrong and need rewriting to
 * whatever the real coverage is. Changing one stat and leaving three sentences
 * standing is the worse outcome of the two.
 *
 * [BLOCKER ×3] Partner roles. The spec labels the three logos "Health cover
 * partner", "Payments partner" and "Technology partner" and marks all three
 * `[VERIFY role]`. Spec § 8: "Labelling the logos is the whole point… a
 * mislabelled partner is worse than an unlabelled one." So `role` is optional
 * and all three are absent. This leaves the strip doing what the spec says
 * three unlabelled logos currently do on the homepage — proving nothing — which
 * is the honest state until the roles are confirmed. Spec § 12 question 5.
 *
 * [BLOCKER] Testimonials. Spec § 8 leaves room for a traveller quote row
 * beneath the stats in phase 2 and says plainly: do not launch with invented
 * quotes. No field is declared for one; add it with the consented quotes.
 *
 * [BLOCKER, launch] Spec § 8 § E-E-A-T: this page sells a health product in
 * YMYL territory and needs the named underwriter or HMO stated explicitly, a
 * working `info@omanga.biz`, policy terms and a claims procedure before launch.
 * `config/site.ts` deliberately holds no underwriter constant.
 */

export type ProofStat = {
  /** Rendered large. A string because "24/7" is not a number. */
  readonly figure: string;
  readonly label: string;
};

export type ProofPartner = {
  readonly name: string;
  /** Absent until confirmed. See the blocker above. */
  readonly role?: string;
};

export type InsuranceProofContent = {
  readonly heading: string;
  readonly intro: string;
  readonly stats: readonly ProofStat[];
  /**
   * Not currently rendered. See the partner-role blocker above — until the
   * three roles are confirmed the strip is three unlabelled logos, which the
   * spec itself says proves nothing. Kept here because the content is § 8's and
   * mounting it is a one-line change once the roles land.
   */
  readonly partners: readonly ProofPartner[];
  /** Not currently rendered, for the same reason, and `/partners` has no route. */
  readonly action: CallToAction;
  readonly image: ImageAsset;
};

const STATS: readonly ProofStat[] = [
  { figure: "5 min", label: "to activate your cover" },
  { figure: "3", label: "plans to choose from" },
  { figure: "24/7", label: "emergency assistance" },
  { figure: "$50", label: "entry price per month" },
] as const;

const PARTNERS: readonly ProofPartner[] = [
  { name: "phillips.hmo" },
  { name: "fuspay" },
  { name: "zira" },
] as const;

export const insuranceProofContent: InsuranceProofContent = {
  heading: "Who stands behind your cover",
  intro:
    "Omanga Insurance isn't underwritten from a distance. Your plan is delivered through established Nigerian health providers with real hospital networks, so the cover you buy before you fly is the cover that admits you when you arrive.",
  stats: STATS,
  partners: PARTNERS,
  action: {
    label: "Meet our partners",
    href: "/partners",
    // `/partners` is one of the approved footer destinations with no route yet.
    isRoutePending: true,
    emphasis: "text",
  },
  /**
   * `alt` is deliberately empty. The paragraph beside it makes the section's
   * argument in full; the photograph adds nothing a screen-reader user needs.
   *
   * [RENAMED] Supplied as `business-discussion-talking-deal-concept.jpg`.
   *
   * [FLAGGED] 6335 × 4483 and 13.3MB — about eleven times the width it renders
   * at. § Image optimization: "Serve at the largest rendered size, not the
   * source size. Re-export oversized assets." `next/image` protects the browser;
   * the repository still carries the weight.
   *
   * [QUESTION] It is a landscape frame in a portrait box, so `object-cover`
   * crops away roughly half the width. It is also a business discussion, where
   * the section's argument is that a Nigerian health provider will admit you —
   * closer to the § 8 partner point than to the cover itself.
   */
  image: {
    src: "/insurance-proof-discussion.jpg",
    alt: "",
    width: 6335,
    height: 4483,
  },
} as const;

export const INSURANCE_PROOF_HEADING_ID = "insurance-proof-heading" as const;
