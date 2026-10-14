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
 * "Open your free wallet", off-site to the wallet sign-up.
 *
 * Spread rather than retyped so the heading, the paragraph and the artwork have
 * exactly one owner — `cta.content.ts` — and the action has exactly one owner in
 * `hero.content.ts`. Nothing here is a copy of a string.
 *
 * Since the 2026-10-14 UX copy pass the wallet panel above carries the same
 * action, so the sign-up is one press away at both the choice and the close.
 *
 * [CHANGED, 2026-10-14] UX copy pass: the duplicate-heading defect once recorded
 * here was resolved on 2026-10-10 (the enquiry section has its own heading), and
 * the shared band now reads "Land with everything sorted". Stale note removed.
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
