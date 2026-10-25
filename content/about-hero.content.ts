// [CHANGED, 2026-10-10] Locked copy rewritten on the owner's instruction ("do it perfectly"): hype words and US spellings removed, meaning kept.
// [CHANGED, 2026-10-10] Copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged.
import { heroPosterContent } from "@/content/hero.content";

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

/**
 * The heading's id.
 *
 * Exported because two components must agree on it exactly: the hero renders the
 * `h1` with this id and names its `section` with `aria-labelledby` pointing at
 * it. If they disagree the section loses its accessible name, and nothing about
 * that failure is visible on screen.
 */
export const ABOUT_HERO_HEADING_ID = "about-hero-heading" as const;

/**
 * [ADDED, 2026-10-15] Content for the photo hero (`PhotoHero`, the home
 * page's layout, owner request). The h1 is unchanged. The intro is cut to one
 * short line so the actions stay above the fold; it restates the approved
 * intro's facts only, but is [NEW] copy and needs sign-off. The actions are
 * the home hero's two, reused as-is (this hero had none).
 *
 * Photo: a smiling man saluting under a soft evening sky (Unsplash
 * Uwz5MKKgD8g, free licence). Self-hosted at public/about-hero-sky.jpg. The
 * festival photo above is no longer shown in the hero.
 */
export const aboutPhotoHeroContent = {
  heading: HEADING,
  intro:
    "A Lagos company for anyone visiting Nigeria: one account for your travel wallet and your health cover.",
  actions: heroPosterContent.actions,
  image: {
    src: "/about-hero-sky.jpg",
    alt: "",
    width: 2400,
    height: 1600,
  },
} as const;
