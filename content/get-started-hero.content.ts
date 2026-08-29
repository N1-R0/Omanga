import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { Eyebrow } from "@/types/content.types";

/**
 * Get Started hero content.
 *
 * Verbatim from `Omanga-Get-Started-Copy - NJ reviewed.docx`, § Section 2 —
 * Hero, with NJ's tracked changes accepted. The heading is corroborated
 * independently by `get-started-seo.md` § Heading hierarchy, which lists the
 * same string as the page's single H1.
 *
 * ---------------------------------------------------------------------------
 * [DISCREPANCY] The screenshot's copy is not this page's copy.
 *
 * The Hero screenshot reads "ClarityGo" in the pill, "Travel health insurance
 * for Africa, sorted before you fly" as the heading, and a paragraph ending
 * "travel across 52 African countries". None of it is in the approved document:
 * "ClarityGo" is the structural benchmark's own brand name — the same string
 * `content/solutions.content.ts` already refuses to ship — the heading is
 * insurance-page copy rather than a router's, and 52 is the country count NJ's
 * tracked changes struck out.
 *
 * Precedence is copy doc → visual reference, so the approved strings ship and
 * the screenshot is read for layout only. Raised, not resolved: if the intent is
 * that this page's hero should carry insurance copy, that is a copy change and
 * has to come back through the approval document.
 *
 * ---------------------------------------------------------------------------
 * [RESOLVED — needs confirmation] The country count is missing from the source.
 *
 * The approved paragraph reads "a multi-currency wallet for spending across
 * ␣␣African countries" — two spaces, no number. The figure was removed and
 * never replaced, so the document as written cannot be rendered verbatim.
 *
 * `COUNTRIES_SERVED` is interpolated rather than a number being typed here. That
 * is the site's single owner of the figure, it is the value NJ's own tracked
 * change wrote into the neighbouring paragraph of this same document
 * (52 → 43), and project-context.md § Non-negotiable copy facts states 43
 * "everywhere". So this is the project's already-resolved fact being applied,
 * not a number invented at the component. Confirm the blank was meant to be 43.
 */
/**
 * [SHORTENED] The document's second hero line is dropped, not rewritten.
 *
 * § Section 2 follows the paragraph with "Select the solution that fits your trip,
 * or choose both." Removed on instruction, by selection rather than by editing —
 * the remaining paragraph is the one that says what Omanga is.
 *
 * Nothing indexed is lost. The dropped line is an instruction to choose between
 * the two offerings, and the section that presents that choice opens with its own
 * approved version of it: "Start with the one your trip needs most — you can add
 * the other at any time, without a second signup."
 */
const INTRO = `Omanga is an integrated destination services platform: a multi-currency wallet for spending across ${COUNTRIES_SERVED_DISPLAY} African countries, and short-term holiday insurance from established Nigerian health providers — set up in one account, before you fly.`;

export type GetStartedHeroContent = {
  readonly eyebrow: Eyebrow;
  readonly heading: string;
  /** One paragraph. See the note above on which of the document's two, and why. */
  readonly intro: string;
};

/**
 * No `action` field, and none should be added.
 *
 * The approved document is explicit: "No button in this section. The two buttons
 * in Section 3 cover the same actions." The type has no slot for one, so a CTA
 * cannot be added here without deleting this note first.
 */
export const getStartedHeroContent: GetStartedHeroContent = {
  eyebrow: "Get started",
  heading:
    "One platform for travel payments and holiday insurance in Africa",
  intro: INTRO,
} as const;

/**
 * The heading's id.
 *
 * Exported because two components must agree on it exactly: the hero renders the
 * `h1` with this id and names its `section` with `aria-labelledby` pointing at
 * it. If they disagree the section loses its accessible name, and nothing about
 * that failure is visible on screen.
 */
export const GET_STARTED_HERO_HEADING_ID = "get-started-hero-heading" as const;
