import { PLAN_CHECKOUT_URLS } from "@/config/site";
import {
  INSURANCE_COVERAGE_ANCHOR,
  type InsurancePlanName,
} from "@/content/insurance.content";
import type { CallToAction } from "@/types/content.types";

const CHECKOUT_URLS: Record<InsurancePlanName, string> = PLAN_CHECKOUT_URLS;

export type InsurancePlan = {
  readonly name: InsurancePlanName;
  readonly price: number;
  readonly description: string;
  readonly hospitalAccess: string;
  readonly included: readonly string[];
  readonly action: CallToAction;
  readonly isFeatured?: boolean;
};

export type InsurancePlansContent = {
  readonly heading: string;
  readonly intro: string;
  readonly currency: "USD";
  readonly billingPeriod: string;
  readonly accessLabel: string;
  readonly includedHeading: string;
  readonly cardFootnote: string;
  readonly plans: readonly [InsurancePlan, InsurancePlan, InsurancePlan];
  readonly footnote: string;
  readonly action: CallToAction;
};

const SILVER: InsurancePlan = {
  name: "Silver",
  price: 50,
  description: "The essentials, for a short, straightforward trip.",
  hospitalAccess: "Category A",
  included: [
    "Emergency assistance",
    "15 days in hospital per trip",
    "Basic diagnostics",
    "Emergency evacuation",
    "Essential prescription drugs",
  ],
  action: {
    label: "Buy Silver",
    href: CHECKOUT_URLS.Silver,
    isExternal: true,
    emphasis: "primary",
  },
} as const;

const GOLD: InsurancePlan = {
  name: "Gold",
  price: 85,
  description:
    "A private ward and more scans, for longer or less predictable trips.",
  hospitalAccess: "Category A + B",
  included: [
    "Everything in Silver, plus:",
    "Private ward admission",
    "Enhanced diagnostics",
    "Extended eye care",
    "Higher surgical limits",
  ],
  action: {
    label: "Buy Gold",
    href: CHECKOUT_URLS.Gold,
    isExternal: true,
    emphasis: "primary",
  },
  isFeatured: true,
} as const;

const DIAMOND: InsurancePlan = {
  name: "Diamond",
  price: 120,
  description:
    "The highest limits and unlimited scans, with the widest hospital access.",
  hospitalAccess: "Category A + B + C",
  included: [
    "Everything in Gold, plus:",
    "Widest hospital access",
    "Unlimited CT scans",
    "Highest cover limits",
    "Comprehensive care",
  ],
  action: {
    label: "Buy Diamond",
    href: CHECKOUT_URLS.Diamond,
    isExternal: true,
    emphasis: "primary",
  },
} as const;

export const insurancePlansContent: InsurancePlansContent = {
  heading: "Health insurance plans for your trip to Nigeria",
  intro:
    "Short-term health cover in Nigeria from Phillips HMO, a Nigerian health maintenance organisation (HMO). Every plan covers hospital admission, diagnostics, emergency assistance and evacuation. Plans differ in ward type, scans and hospital access.",
  currency: "USD",
  billingPeriod: "month",
  accessLabel: "Hospital access",
  includedHeading: "What's included",
  cardFootnote: "No commitment. Cancel any time.",
  plans: [SILVER, GOLD, DIAMOND],
  footnote:
    "Every plan also includes telemedicine, roaming across Nigeria, a contact centre, the mobile app and a health-tips newsletter. Renew or extend your plan from your account.",
  action: {
    label: "Compare every benefit",
    href: `#${INSURANCE_COVERAGE_ANCHOR}`,
    emphasis: "text",
  },
} as const;

export const INSURANCE_PLANS_HEADING_ID = "insurance-plans-heading" as const;
