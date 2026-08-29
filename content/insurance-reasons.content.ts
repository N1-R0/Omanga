import { INSURANCE_PLANS_HREF } from "@/content/insurance.content";
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { CallToAction } from "@/types/content.types";

/**
 * Why Omanga Insurance — three reasons. Spec § 4.
 *
 * Three cards, capped. The spec is explicit: "If a fourth reason is proposed
 * later, it replaces one — the grid does not grow." The tuple type is what
 * enforces that.
 *
 * [BLOCKER] The spec calls for three photographs here rather than icons —
 * "travellers, not hospital corridors" — and none exist. No `image` field is
 * declared: an optional one would invite a placeholder, and a card with no art
 * is a card with no art. Add the field with the assets.
 *
 * [DRIFT] The spec writes the contextual link as `See what each plan covers →`.
 * The arrow is dropped from the string — `TextLink` draws its own icon, and a
 * literal arrow in the label would be read aloud by a screen reader.
 */

export type InsuranceReason = {
  readonly heading: string;
  readonly body: string;
};

export type InsuranceReasonsContent = {
  readonly heading: string;
  readonly intro: string;
  readonly reasons: readonly [
    InsuranceReason,
    InsuranceReason,
    InsuranceReason,
  ];
  /**
   * One contextual link beneath the grid. Not a section-level primary — the
   * spec gives this section no CTA at section level, deliberately, so it stays
   * lighter than § 5 and § 6.
   */
  readonly action: CallToAction;
};

const COVERAGE: InsuranceReason = {
  heading: `Coverage across ${COUNTRIES_SERVED_DISPLAY} African countries`,
  body: "One plan for the whole itinerary, however many borders it crosses. Your cover travels with you, and roaming is included on every plan.",
} as const;

const PRICING: InsuranceReason = {
  heading: "Three plans, priced monthly",
  body: "Silver, Gold and Diamond, from $50 a month. Match the plan to the trip rather than paying for cover you won't use. No commitment, cancel anytime.",
} as const;

const SUPPORT: InsuranceReason = {
  heading: "Emergency support, around the clock",
  body: "24/7 emergency assistance, emergency evacuation and a dedicated contact centre on every plan — plus telemedicine when you'd rather not find a clinic.",
} as const;

export const insuranceReasonsContent: InsuranceReasonsContent = {
  heading: "Health cover that works where you're actually going",
  intro:
    "Three things make Omanga Insurance different from a policy bought at home and hoped for on arrival.",
  reasons: [COVERAGE, PRICING, SUPPORT],
  action: {
    label: "See what each plan covers",
    href: INSURANCE_PLANS_HREF,
    emphasis: "text",
  },
} as const;

export const INSURANCE_REASONS_HEADING_ID =
  "insurance-reasons-heading" as const;
