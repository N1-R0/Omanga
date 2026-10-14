// [CHANGED, 2026-10-14] UX copy pass (design.md § Home UX copy pass): verb-first H1, wallet vs
// health cover nouns, named provider, cover scoped to Nigeria. Replaces the 2026-10-10 pass.
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { Eyebrow } from "@/types/content.types";

/**
 * Get Started hero content.
 *
 * Structure from `Omanga-Get-Started-Copy - NJ reviewed.docx` § Section 2; the
 * strings are now the 2026-10-14 UX copy pass rather than that document's text.
 *
 * [DISCREPANCY] The Hero screenshot carries the benchmark's copy ("ClarityGo",
 * insurance-page heading). It is read for layout only.
 *
 * `COUNTRIES_SERVED_DISPLAY` is interpolated so the figure has one owner. It
 * describes the wallet only: health cover applies in Nigeria only.
 */
// [CHANGED, 2026-10-14] UX copy pass: says what each product does and where, names Phillips HMO.
const INTRO = `Spend in ${COUNTRIES_SERVED_DISPLAY} African countries with a free wallet, and get health cover from Phillips HMO for your time in Nigeria. Both sit in one Omanga account.`;

export type GetStartedHeroContent = {
  readonly eyebrow: Eyebrow;
  readonly heading: string;
  /** One paragraph. */
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
  // [CHANGED, 2026-10-14] UX copy pass: verb-first, 8 words, states the choice the page exists for.
  heading: "Get a travel wallet, health cover or both",
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
