import { WALLET_URL } from "@/config/site";
import type { CallToAction, ImageAsset } from "@/types/content.types";

/**
 * Hero content.
 *
 * Every user-facing string is verbatim from the CEO-approved copy document,
 * § 2 · Hero Section, with NJ's tracked changes accepted.
 *
 * The tracked changes matter here more than anywhere else on the page. The
 * headline before NJ's edit read "Travel Africa with one card and one insurance
 * plan"; accepting the change replaces "one card" with "a customized payment
 * solution". That is the single most important edit in the document — the whole
 * no-physical-card rule descends from it — and rejecting it would reintroduce
 * the claim in the page's `h1`.
 *
 * ---------------------------------------------------------------------------
 * [REDESIGNED] The hero band is now the headline, the actions and the helper
 * line. Two fields are gone from this module:
 *
 *   eyebrow  "Payments & insurance for African travel"
 *   intro    "Fund your Omanga wallet in USD, GBP or CAD, spend across 43
 *             African countries, and add short-term health cover before you fly."
 *
 * The reference's hero band contains its `h1` and nothing else, and a headline
 * with a pill above it and a paragraph below it is a section rather than a hero.
 * See `HeroContent` for the full reasoning.
 *
 * Neither string is lost. `intro` is the page's meta description verbatim
 * (`app/(redesign)/page.tsx`), and the Solutions Overview immediately beneath
 * the hero opens with two paragraphs covering the same ground — so nothing that
 * was indexed has been removed from the document.
 */

/**
 * Destinations.
 *
 * [CHANGED] The primary no longer points at the marketing `/payments` page. The
 * wallet is issued off-site, so "Open Your Free Wallet" goes straight to the
 * sign-up at `WALLET_URL` and carries `isExternal`, which adds `target` and
 * `rel` at render time.
 *
 * The URL itself lives in `config/site.ts`; it is not typed here, because it is
 * also the header's and the closing band's destination and three copies of a URL
 * is three places for it to be wrong.
 */
const PRIMARY_ACTION: CallToAction = {
  label: "Open Your Free Wallet",
  href: WALLET_URL,
  isExternal: true,
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
 * omission.
 *
 * ---------------------------------------------------------------------------
 * [DISCREPANCY] The asset is probably wrong, and this is not the place to fix it.
 *
 * The brand carries "real African photography"; the asset in `public/` is an
 * aeroplane window over what appears to be a European or North American suburb.
 * Shipped as-is because it is what the repository contains, and substituting an
 * image is a design decision. Raised for design.
 *
 * If the photograph is replaced, `--color-scrim` must be re-measured — the
 * current 55% was derived from this specific image's brightest pixels.
 *
 * [NOTE] The file is named `.png` but is a 4096x2305 JPEG, and at 5.4MB it is
 * far larger than needed. `next/image` re-encodes and resizes it, so it does not
 * reach the browser at that weight, but the source should be re-exported.
 */
const IMAGE: ImageAsset = {
  src: "/hero.png",
  alt: "",
  width: 4096,
  height: 2305,
} as const;

export type HeroSectionContent = {
  readonly heading: string;
  /**
   * Exactly two actions, in hierarchy order: primary first.
   *
   * A fixed-length tuple rather than an array, because the hero's CTA hierarchy
   * is the point — one primary and one de-weighted secondary. An array would
   * permit three buttons, or one, or none, and "one primary button per section"
   * would then be enforceable only by review.
   */
  readonly actions: readonly [CallToAction, CallToAction];
  /** Risk-reducing line beneath the actions. */
  readonly helperText: string;
  readonly image: ImageAsset;
};

export const heroContent: HeroSectionContent = {
  heading:
    "Travel Africa with a customized payment solution and one insurance plan",
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
