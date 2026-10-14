// [CHANGED, 2026-10-10] Locked copy rewritten on the owner's instruction ("do it perfectly"): hype words and US spellings removed, meaning kept.
// [CHANGED, 2026-10-10] Copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged.
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { Eyebrow, ImageAsset } from "@/types/content.types";

/**
 * About hero content — spec § 2.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] The reference for this section is now the supplied screenshot, not
 * Stayli.
 *
 * Spec § 2 mirrors Stayli's About hero: no eyebrow, headline, one pill CTA, a
 * three-part utility strip across the base (metric · paragraph · provenance),
 * then a full-bleed photograph below as the transition into § 3. The supplied
 * screenshot is a different arrangement entirely — eyebrow pill, headline,
 * sub-paragraph in the left column, one squared photograph in the right, no
 * strip and no CTA. It is Clarity's own About hero, which spec § 0.2 had ruled
 * out for this page.
 *
 * The screenshot is the later instruction, so it governs the layout. What that
 * costs, and how each of § 2's four displaced elements is handled:
 *
 *   - The eyebrow. § 2 is explicit that Stayli has "no eyebrow label above it"
 *     and that "the whitespace *is* the design". The screenshot has a pill, so
 *     one ships. `About` is Clarity's own label in that slot, it is the approved
 *     nav label, and it is the heading the live page already runs under the
 *     headline as "About US" — so no string is invented to fill it.
 *   - The base strip's centre paragraph. Promoted to the hero's sub-paragraph:
 *     company-description copy at body scale directly beneath the headline.
 *   - The base strip's left metric (`52 African countries`) and right provenance
 *     (`SINCE [VERIFY founding year]`). Not rendered — the layout they belonged
 *     to is gone. This also retires, for now, the founding-year blocker: § 5's
 *     first factual gap existed to fill the provenance stamp, and there is no
 *     longer a stamp to fill. It returns with `foundingDate` in the § 3.5
 *     schema, which is where the year does real work.
 *   - The full-bleed photograph. Not rendered here. § 2 gives it one job —
 *     "the transition device into the Story section" — so whether it returns
 *     between this band and § 3 is a § 3 decision, not a § 2 one.
 *
 * [FLAGGED] The hero CTA. § 2's single `Explore Omanga` pill is not rendered:
 * the screenshot has no button, and § 3.4 sends it to `#mission-vision`, which
 * is § 4 and does not exist yet. Both reasons are temporary in different ways,
 * so the type deliberately has no `action` field — adding the CTA back means
 * deleting this note, which is the point.
 *
 * What it costs is worth stating plainly: § 2's CTA discipline sets "two CTA
 * moments in the page body — one in the hero, one at the close", and § 3.4
 * lists this link as Committed. Without it the page has one, in § 7. Raised for
 * a decision at the § 4 stage, when the anchor it needs finally exists.
 *
 * [NOTE] The country count is interpolated from `COUNTRIES_SERVED_DISPLAY`,
 * never typed.
 */

/**
 * The page's single `h1`.
 */
// [CHANGED, 2026-10-14] UX copy pass: was "Travel payments and health insurance
// for Africa". Health cover applies in Nigeria only, so the h1 names Nigeria.
const HEADING = "Money and health cover for your trip to Nigeria";

// [CHANGED, 2026-10-14] UX copy pass: was "Omanga Integrated Destination
// Services is an online platform…". Says who we are, what we do and where each
// product applies (wallet = 50+ countries, health cover = Nigeria).
const INTRO = `Omanga is a Lagos company for anyone visiting Nigeria. One account gives you a wallet you can spend in ${COUNTRIES_SERVED_DISPLAY} African countries and short-term health cover for your time in Nigeria.`;

export type AboutHeroContent = {
  readonly eyebrow: Eyebrow;
  readonly heading: string;
  readonly intro: string;
  readonly image: ImageAsset;
};

export const aboutHeroContent: AboutHeroContent = {
  eyebrow: "About",
  heading: HEADING,
  intro: INTRO,
  /**
   * [SUBSTITUTED] Not the asset § 2 names.
   *
   * § 2 asks for "Omanga's existing Lagos skyline asset" and § 3.1 asks for the
   * same photograph as the `og:image`. There is no skyline asset in `public/`,
   * and § 2 assigns it the full-bleed transition slot rather than this one — the
   * screenshot's right-hand box is a slot § 2 does not have at all, so no asset
   * is specified for it.
   *
   * `explore africa.jpg` is used instead: an existing, unused Omanga asset, and
   * the only one in the library that carries the continent's culture and people
   * rather than a product. That is the argument this section makes — "we combine
   * deep local expertise" — and it is the same ground § 6's People / Passion /
   * Partnership cards stand on.
   *
   * [RENAMED] Supplied as `explore africa.jpg`. The space in the filename means
   * the URL carries `%20`, which is legal but is the kind of path that gets
   * mangled by a CDN rule or a copy-paste. Worth renaming to
   * `about-hero-celebration.jpg` in the same pass that re-exports it.
   *
   * [FLAGGED] 5824 × 3264 and 4.3MB — about nine times the width it renders at.
   * `next/image` protects the browser; the repository still carries the weight.
   *
   * [QUESTION] It is a 16:9 landscape source in a square box, so `object-cover`
   * crops roughly a quarter off each side. The subject sits centre-frame so the
   * crop holds, but a square-ish re-export would stop the framing depending on
   * that.
   */
  image: {
    /**
     * `alt` is not empty, unlike the homepage hero's. That image is a full-bleed
     * background behind copy that already says everything it says; this one is a
     * distinct element beside prose that describes a company rather than a
     * place, so it gets a short description.
     *
     * It describes what is visible and claims no location: nothing in the source
     * documents identifies the city, and naming one would be an invented fact in
     * an attribute nobody proofreads.
     */
    src: "/explore africa.jpg",
    alt: "Musicians and dancers performing in a street draped with festival bunting",
    width: 5824,
    height: 3264,
  },
} as const;

/**
 * The heading's id.
 *
 * Exported because two components must agree on it exactly: the hero renders the
 * `h1` with this id and names its `section` with `aria-labelledby` pointing at
 * it. If they disagree the section loses its accessible name, and nothing about
 * that failure is visible on screen.
 */
export const ABOUT_HERO_HEADING_ID = "about-hero-heading" as const;
