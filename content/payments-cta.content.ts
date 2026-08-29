import { WALLET_URL } from "@/config/site";
import { ctaContent, type CtaContent } from "@/content/cta.content";
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";

/**
 * The closing conversion band — spec § 9.
 *
 * The benchmark ends on a `Book a demo` form because its motion is enterprise
 * sales. Omanga is self-serve, so a form is the wrong ask at the wrong moment:
 * spec § 9, "a visitor who has scrolled this entire page wants the product, not a
 * follow-up email." Six form fields become one button.
 *
 * ---------------------------------------------------------------------------
 * THE CTA REPEATS THE HERO'S, VERBATIM.
 *
 * Spec § 9 is precise about this and it is the one thing in the section that is
 * not a judgement call: "`Open Your Free Wallet` appears exactly twice on the
 * page — Hero and here — with identical wording and destination. One conversion
 * journey, two entry points, no ambiguity about the primary action."
 *
 * So the label and the destination are the hero's. They are not imported from
 * `payments-hero.content.ts`, and that is deliberate rather than an oversight:
 * importing would couple the closing ask to the opening one, so a change to the
 * hero's label would silently rewrite the page's final control. The spec wants
 * them identical *by decision*, checked when either changes, not identical by
 * mechanism. `WALLET_URL` is shared, because a destination drifting is a broken
 * link rather than a copy question.
 *
 * **If the hero's label changes, change this one in the same commit.** Both carry
 * the planned move to "Download Omanga app" when the app ships.
 *
 * ---------------------------------------------------------------------------
 * [DELIBERATELY ABSENT] The Ubuntu line.
 *
 * The homepage's closing band ends "The spirit of Ubuntu lives in us all —
 * through our collective unity, we achieve great things." Spec § 9 excludes it
 * from this page by name: "it is the emotional close on the homepage and it is
 * the most distinctive sentence Omanga owns — reusing it on a product page
 * cheapens it and makes the two pages read as the same page."
 *
 * This page closes on utility instead, "because a visitor who read eight sections
 * about FX rates and coverage is converting on rational grounds."
 *
 * ---------------------------------------------------------------------------
 * [CONSTRAINT] Closing copy recaps; it never introduces.
 *
 * Every claim in the paragraph below is made earlier on the page: the funding
 * currencies and mid-market rates in § 4's metric row, the country count in § 4's
 * third card, the fees and minimums in § 5's fourth row, 24/7 support in § 5's
 * fifth. Nothing here is new, which is what a closing band is for.
 *
 * [CHANGED from spec] § 9's paragraph reads "pay your way across 52+ African
 * countries with one card". The card goes, per the page header note, and the
 * count is interpolated.
 */

/**
 * Structurally a `CtaContent`, so the shared `CTA` section renders it unchanged.
 *
 * The decorative artwork is read from the homepage band rather than redeclared,
 * exactly as `insurance-cta.content.ts` does: the asset has one owner and no
 * `src` is typed twice.
 */
export const paymentsCtaContent: CtaContent = {
  heading: "Start spending across Africa today",
  intro: `Open your Omanga wallet in minutes, fund it from USD, GBP or CAD at mid-market rates, and pay your way across ${COUNTRIES_SERVED_DISPLAY} African countries. No minimums, no hidden fees, and 24/7 support from the moment you sign up.`,
  action: {
    label: "Open Your Free Wallet",
    href: WALLET_URL,
    isExternal: true,
    emphasis: "primary",
  },
  graphic: ctaContent.graphic,
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const PAYMENTS_CTA_HEADING_ID = "payments-cta-heading" as const;
