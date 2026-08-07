import { ctaContent } from "@/content/cta.content";
import { HERO_PRIMARY_ACTION } from "@/content/hero.content";
import type { CtaContent } from "@/content/cta.content";

/**
 * The Get Started page's closing CTA band.
 *
 * The `CTA` section component is reused unchanged — it takes its content and its
 * heading id as props and knows nothing about which page mounts it, the same
 * arrangement the Header, the Footer and the partners strip have. Only the content
 * differs, and only in one field.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] The action is the homepage hero's, not the site's `Get Started`.
 *
 * `ctaContent` uses `PRIMARY_CTA`, which now resolves to `/get-started` — so on
 * this page the closing band's button would link to the page it sits on. Spread
 * from the homepage band's content and overridden with `HERO_PRIMARY_ACTION`:
 * "Open Your Free Wallet", off-site to the wallet sign-up.
 *
 * Spread rather than retyped so the heading, the paragraph and the artwork have
 * exactly one owner — `cta.content.ts` — and the action has exactly one owner in
 * `hero.content.ts`. Nothing here is a copy of a string.
 *
 * This is also the only closing-band action on the page that goes somewhere: the
 * enquiry form's submit stays on the page, and the two solution panels lead to
 * `/payments` and `/insurance`. The band is the one place the wallet sign-up is
 * one press away, which is what `get-started-seo.md` § Search intent expects of a
 * router's transactional exit.
 *
 * ---------------------------------------------------------------------------
 * [DEFECT, needs a decision] The heading duplicates the section above it.
 *
 * Both this band and the enquiry section directly above take § Section 4's
 * approved heading, "Ready to experience Africa?", because the approved document
 * gives this page one closing section and both components are rendering it. The
 * page therefore has two `h2`s with identical text and two regions with identical
 * accessible names, and the Ubuntu paragraph appears here having been removed from
 * the enquiry section one step earlier for length.
 *
 * Not resolvable in code: there is no second approved heading for a closing band
 * on this page, and inventing one is exactly what must not happen. Three ways out,
 * each a small change:
 *
 *   1. Approve a distinct heading for one of the two sections.
 *   2. Drop the heading and paragraph from the enquiry section, leaving the form
 *      under this band's heading — the enquiry section then needs a different
 *      accessible name, which is a copy decision too.
 *   3. Drop this band and let the enquiry section close the page, which is what
 *      the approved document's own structure describes.
 */
export const getStartedCtaContent: CtaContent = {
  ...ctaContent,
  action: HERO_PRIMARY_ACTION,
} as const;

/**
 * The heading's id. Distinct from the homepage band's `cta-heading` only because
 * this page already renders another section named by the same words — ids must be
 * unique within a document even when the text is not.
 */
export const GET_STARTED_CTA_HEADING_ID = "get-started-cta-heading" as const;
