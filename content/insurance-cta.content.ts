import { ctaContent } from "@/content/cta.content";
import type { CtaContent } from "@/content/cta.content";
import { INSURANCE_PLANS_HREF } from "@/content/insurance.content";

/**
 * Closing CTA band — spec § 9.
 *
 * MeetingsPro's form slot with the form removed, and not replaced with another
 * form. Spec § 9: "Do not add a form later. If lead capture becomes necessary,
 * it belongs on the homepage closer, not here."
 *
 * The `CTA` section component is reused unchanged — it takes its content and
 * heading id as props and knows nothing about which page mounts it, the same
 * arrangement the header, the footer and the partners strip have.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] One button, not the spec's two.
 *
 * § 9 specifies a two-tier row: `Compare Plans` primary and `Open Free Account`
 * secondary. The band renders one, and that is a design-system decision that
 * predates this page — design.md § 9 § Button variants records the CTA band's
 * normalisation as "give the band one filled primary instead of two outlined
 * siblings", and `CtaContent` has a single `action` field as a result.
 *
 * `Compare Plans` is the one kept: it is § 9's own primary, and it is the ask
 * that matches where the visitor is. Someone who has read the plan grid and the
 * comparison table is choosing a tier, not opening an account.
 *
 * Nothing is lost from the page. `Open Free Account` is still the hero's
 * secondary and every plan card's button goes to the same sign-up.
 *
 * ---------------------------------------------------------------------------
 * [DRIFT] The label is a fourth variant of one destination. The page says
 * `Compare Insurance Plans` (hero), `See what each plan covers` (§ 4),
 * `View plans` (§ 6.3) and `Compare Plans` (here) — all pointing at `#plans`.
 * Three of the four are the spec's own wording. It wants one decision.
 *
 * ---------------------------------------------------------------------------
 * The artwork is read from the homepage band rather than redeclared, so the
 * decorative asset has exactly one owner and no `src` is typed twice.
 */
export const insuranceCtaContent: CtaContent = {
  heading: "Choose your plan before you fly",
  intro:
    "Cover starts from $50 a month, with no commitment and no long-term contract. Pick the plan that fits your trip and travel with your health cover already arranged.",
  action: {
    label: "Compare Plans",
    href: INSURANCE_PLANS_HREF,
    emphasis: "primary",
  },
  graphic: ctaContent.graphic,
} as const;

export const INSURANCE_CTA_HEADING_ID = "insurance-cta-heading" as const;
