import type { CallToAction, ImageAsset } from "@/types/content.types";

/**
 * Hero content.
 *
 * Every user-facing string is verbatim from the CEO-approved copy document,
 * § 2 · Hero Section, with NJ's tracked changes accepted. Nothing is drafted,
 * paraphrased, or carried over from the redesign spec — project-context.md is
 * explicit that the spec's Step 6 copy is superseded.
 *
 * The tracked changes matter here more than anywhere else on the page. The
 * headline before NJ's edit read "Travel Africa with one card and one insurance
 * plan"; accepting the change replaces "one card" with "a customized payment
 * solution". That is the single most important edit in the document — the whole
 * no-physical-card rule descends from it — and rejecting the change would
 * reintroduce the claim in the page's `h1`.
 *
 * ---------------------------------------------------------------------------
 * FIGMA DISAGREES WITH THE APPROVED COPY IN FOUR PLACES
 *
 * The hero frame (node 1265:12538) was drawn before copy approval and shows:
 *
 *   Figma headline   "YOUR SEAMLESS GATEWAY TO AFRICAN TRAVEL"
 *   Approved         "Travel Africa with a customized payment solution and one
 *                     insurance plan"
 *
 *   Figma sub-head   "Payments And Insurance In One Place"
 *   Approved         the full sentence below — Figma is showing a Title-Cased
 *                    fragment of it
 *
 *   Figma secondary  "Compare Insurance Plans"
 *   Approved         "Insurance Plans"
 *
 *   Figma helper     absent
 *   Approved         "No monthly fee. Set up in minutes." — it ships
 *
 * Copy outranks Figma, so the approved strings win in all four. Two consequences
 * worth stating plainly rather than discovering in review:
 *
 *   1. The approved headline is 71 characters against Figma's 39, so it wraps to
 *      roughly three lines at the display size instead of two. The hero is
 *      taller and denser than the frame looks.
 *   2. Figma sets the headline in uppercase with positive tracking.
 *      design-system.md drops both ("sentence case everywhere, no uppercase
 *      headings"), and the redesign spec independently agrees: "Sentence case,
 *      not Title Case". So the headline renders in sentence case.
 *
 * Also corrected against the spec: the spec's hero copy says "52 African
 * countries". The approved figure is 43, and project-context.md lists the 52 as
 * obsolete and to be rejected everywhere.
 */

/**
 * Destinations.
 *
 * Not invented and not taken from the labels — the redesign spec has authority
 * over the internal-linking plan, and § 5.5 states it directly:
 * "Hero → `/payments` (primary), `/insurance` (secondary)". Both routes exist
 * in the application today, so neither is pending.
 *
 * The spec's § 5.6 also sets the hierarchy this implements: one filled primary,
 * the secondary de-weighted to an outline. That is why the two buttons are not
 * siblings of equal weight the way the current site's are.
 */
const PRIMARY_ACTION: CallToAction = {
  label: "Open Your Free Wallet",
  href: "/payments",
  emphasis: "primary",
} as const;

const SECONDARY_ACTION: CallToAction = {
  label: "Insurance Plans",
  href: "/insurance",
  emphasis: "secondary",
} as const;

/**
 * The hero photograph.
 *
 * `alt` is deliberately empty. The image is a full-bleed background sitting
 * behind the headline under a scrim; it carries no information the adjacent text
 * does not already give, so an empty alt is the correct statement rather than an
 * omission. component-rules.md requires the decision to be explicit, which is
 * what this is.
 *
 * ---------------------------------------------------------------------------
 * [DISCREPANCY] The asset is probably wrong, and this is not the place to fix it.
 *
 * The redesign spec's design note for this section says "Keep the Lagos
 * skyline", and design-system.md describes the brand as carrying "real African
 * photography". The asset in `public/` — and the one drawn in the Figma frame —
 * is an aeroplane window over what appears to be a European or North American
 * suburb. It is neither a Lagos skyline nor African photography.
 *
 * Shipped as-is because it is what both the repository and the Figma frame
 * contain, and substituting an image is a design decision. Raised for design.
 *
 * If the photograph is replaced, `--color-scrim` must be re-measured — the
 * current 60% was derived from this specific image's brightest pixels.
 *
 * [NOTE] The file is named `.png` but is actually a 4096x2305 JPEG, and at
 * 5.4MB it is far larger than needed. `next/image` re-encodes and resizes it, so
 * it does not reach the browser at that weight, but the source should be
 * re-exported: coding-guidelines.md asks for assets served "at the largest
 * rendered size, not the source size".
 */
const IMAGE: ImageAsset = {
  src: "/hero.png",
  alt: "",
  width: 4096,
  height: 2305,
} as const;

export type HeroSectionContent = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly intro: string;
  /**
   * Exactly two actions, in hierarchy order: primary first.
   *
   * A fixed-length tuple rather than an array, because the hero's CTA hierarchy
   * is the point — § 5.6 exists to establish one primary and one de-weighted
   * secondary. An array would permit three buttons, or one, or none, and rule 3
   * ("one primary button per section maximum") would then be enforceable only by
   * review.
   *
   * This is also why the hero does not use `SectionContent<T>`: that shape
   * carries a single optional `action`, and the hero needs two required ones.
   * Bending the shared type to fit would weaken it for every other section.
   */
  readonly actions: readonly [CallToAction, CallToAction];
  /** Risk-reducing line beneath the actions. */
  readonly helperText: string;
  readonly image: ImageAsset;
};

export const heroContent: HeroSectionContent = {
  eyebrow: "Payments & insurance for African travel",
  heading:
    "Travel Africa with a customized payment solution and one insurance plan",
  intro:
    "Fund your Omanga wallet in USD, GBP or CAD, spend across 43 African countries, and add short-term health cover before you fly.",
  actions: [PRIMARY_ACTION, SECONDARY_ACTION],
  helperText: "No monthly fee. Set up in minutes.",
  image: IMAGE,
} as const;

/**
 * The heading's id.
 *
 * Exported because two components need to agree on it exactly: `HeroContent`
 * renders the `h1` with this id, and `Hero` names its `section` with
 * `aria-labelledby` pointing at it. If they ever disagree the section loses its
 * accessible name, and nothing about that failure is visible on screen.
 */
export const HERO_HEADING_ID = "hero-heading" as const;
