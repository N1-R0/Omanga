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
 *   - The base strip's centre paragraph — the LOCKED "Omanga Integrated
 *     Destination Services…" copy. Promoted to the hero's sub-paragraph, which
 *     is the same job in the new layout: company-description copy at body scale
 *     directly beneath the headline. Verbatim, and the only place on the page
 *     this paragraph appears.
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
 * [NOTE] The country count does not arise here. The locked paragraph carries no
 * figure — "across various African cities" — so the 52-vs-43 conflict recorded
 * on the page module reaches § 7, not this section.
 */

/**
 * The page's single `h1` — spec § 2 and § 3.2, ✏️ NEW, transcribed unchanged.
 *
 * [DEVIATION] § 2 sets this on "two deliberate lines" and asks for that break
 * to be preserved. It renders on three in this layout, and the copy is not
 * being edited to force two.
 *
 * design.md § 2 gives the reason and the remedy: "The hero cap also owns the
 * line count." A two-line split needs the longest line — "Integrated
 * destination services", 31 characters — to fit the column, which at the `h1`
 * scale wants roughly 990px. The screenshot's copy column is about 44% of a
 * 1424 content column, so about 620px, and no cap can widen it. The three-line
 * break that produces is "Integrated destination / services for travel /
 * across Africa", which splits the primary keyword phrase across a line end.
 *
 * Two ways out, both a decision rather than a fix: shorten the headline, or
 * widen the copy column past the screenshot's proportion. Neither is taken
 * unilaterally — § 3.2 lists this string as the page's H1 and § 2 lists the
 * two-line break as deliberate.
 */
const HEADING = "Integrated destination services for travel across Africa";

/**
 * 🔒 LOCKED — approved About copy, verbatim. Spec § 2, base strip centre.
 *
 * Not rewritten, not shortened, not split. § 2's own instruction on this
 * paragraph is that it "slots in without alteration".
 */
const INTRO =
  "Omanga Integrated Destination Services is a cutting-edge, web-enabled platform that transforms the way travelers experience Africa. We combine deep local expertise with innovative technology to create seamless, enjoyable, and remarkable travel experiences across various African cities.";

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
     * distinct element beside prose that describes a platform rather than a
     * place. Without a description a screen-reader user gets the company
     * paragraph and no sense that the page is about a continent and its people,
     * which is the whole reason the photograph is in the band.
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
