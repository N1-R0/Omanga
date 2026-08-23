import { WALLET_URL } from "@/config/site";
import { insuranceCtaContent } from "@/content/insurance-cta.content";
import type { CtaContent } from "@/content/cta.content";

/**
 * The Plans page's closing CTA band.
 *
 * The `CTA` section component is reused unchanged, and so is the insurance
 * page's content — spread rather than retyped, so the heading, the paragraph
 * and the artwork keep exactly one owner and nothing here is a copy of a
 * string.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] The action, and only the action.
 *
 * `insuranceCtaContent`'s primary is `Compare Plans` → `/plans`. On this page
 * that button links to the page it sits on, and the visitor has just read the
 * comparison — the same problem `get-started-cta.content.ts` solved when
 * `PRIMARY_CTA` started resolving to the page it was mounted on.
 *
 * Replaced with spec § 9's *secondary*, `Open Free Account`, promoted to the
 * band's one button. It is the right ask here: someone who has read three
 * cards and a thirteen-row table is deciding, not discovering, and the only
 * step left is opening the account. Both labels are § 9's own, so neither is
 * drafted.
 *
 * [DRIFT] `Open Free Account` is the spec's label; the homepage hero says
 * "Open Your Free Wallet" for the same destination. Two labels for one action
 * across the site, already flagged in `insurance-hero.content.ts`.
 */
export const plansCtaContent: CtaContent = {
  ...insuranceCtaContent,
  action: {
    label: "Open Free Account",
    href: WALLET_URL,
    isExternal: true,
    emphasis: "primary",
  },
} as const;

/**
 * The heading's id. Distinct from the insurance page's band only because ids
 * must be unique within a document even when the text is not.
 */
export const PLANS_CTA_HEADING_ID = "plans-cta-heading" as const;
