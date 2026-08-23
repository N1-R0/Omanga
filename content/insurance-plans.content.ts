import { WALLET_URL } from "@/config/site";
import {
  INSURANCE_COVERAGE_HREF,
  INSURANCE_PLANS_ANCHOR,
  type InsurancePlanName,
} from "@/content/insurance.content";
import type { CallToAction } from "@/types/content.types";

/**
 * Insurance plans — spec § 5. Anchor `#plans`.
 *
 * Selection, not comparison: five elements per card, down from the live page's
 * fourteen. Everything removed reappears once in § 6.
 *
 * [BLOCKER] Currency. Prices are USD, as on the live page. Whether GBP and CAD
 * equivalents display for wallet holders funding in those currencies is spec
 * § 12 question 7, unanswered. `currency` is stated as a field rather than
 * baked into the price string so the answer is a data change, not a copy edit.
 *
 * [BLOCKER] Billing period. Spec § 12 question 8: monthly billing and a
 * trip-length product are in tension, and a two-week traveller charged $50 a
 * month needs to know what happens at week three. The page says both
 * "/month" and "cover for the length of your trip" and does not reconcile them.
 *
 * [OMITTED] Gold's "Most popular" tag. The spec permits it "only if that claim
 * is true" and flags it `[VERIFY]` against real conversion data. No such data
 * exists, so no tag — `isFeatured` carries a neutral visual lift and no claim.
 * If a label is ever added it must come with the evidence.
 */

export type InsurancePlan = {
  readonly name: InsurancePlanName;
  /** Numeric only. The currency symbol and the period are rendered, not typed. */
  readonly price: number;
  readonly description: string;
  /** The one differentiator a traveller can evaluate at a glance. */
  readonly hospitalAccess: string;
  readonly action: CallToAction;
  /**
   * A visual lift, never a claim. See the blocker note above — this must not
   * render as "Most popular" or any other unevidenced social proof.
   */
  readonly isFeatured?: boolean;
};

export type InsurancePlansContent = {
  readonly anchorId: typeof INSURANCE_PLANS_ANCHOR;
  readonly heading: string;
  readonly intro: string;
  readonly currency: "USD";
  readonly billingPeriod: string;
  readonly plans: readonly [InsurancePlan, InsurancePlan, InsurancePlan];
  /** Centred beneath the grid: the universal inclusions, then the link to § 6. */
  readonly footnote: string;
  readonly action: CallToAction;
};

const SILVER: InsurancePlan = {
  name: "Silver",
  price: 50,
  description: "Essential cover for a straightforward trip.",
  hospitalAccess: "Category A + B · Semi-private admission",
  action: {
    label: "Select Silver",
    href: WALLET_URL,
    isExternal: true,
    emphasis: "primary",
  },
} as const;

const GOLD: InsurancePlan = {
  name: "Gold",
  price: 85,
  description:
    "Private ward and wider diagnostics, for longer or less predictable trips.",
  hospitalAccess: "Category A + B · Private ward",
  action: {
    label: "Select Gold",
    href: WALLET_URL,
    isExternal: true,
    emphasis: "primary",
  },
  isFeatured: true,
} as const;

const DIAMOND: InsurancePlan = {
  name: "Diamond",
  price: 120,
  description:
    "Maximum limits and unlimited scans, with the widest hospital network.",
  hospitalAccess: "Category A + B + C · Private ward",
  action: {
    label: "Select Diamond",
    href: WALLET_URL,
    isExternal: true,
    emphasis: "primary",
  },
} as const;

export const insurancePlansContent: InsurancePlansContent = {
  anchorId: INSURANCE_PLANS_ANCHOR,
  heading: "Choose your plan",
  intro:
    "Every plan covers hospital admission, diagnostics, emergency assistance and evacuation. The difference is how much room you have — ward type, scan allowances and which hospitals you can walk into.",
  currency: "USD",
  billingPeriod: "month",
  plans: [SILVER, GOLD, DIAMOND],
  footnote:
    "No commitment. Cancel anytime. Every plan includes telemedicine, roaming, 24/7 support, the mobile app and our health-tips newsletter.",
  action: {
    label: "See the full comparison",
    href: INSURANCE_COVERAGE_HREF,
    emphasis: "text",
  },
} as const;

export const INSURANCE_PLANS_HEADING_ID = "insurance-plans-heading" as const;
