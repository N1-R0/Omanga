import type { Eyebrow, ImageAsset } from "@/types/content.types";

// Section 6 of Omanga-Homepage-Copy-Approval NJ edits.docx, tracked changes accepted.

export type DeepDiveFeature = {
  readonly id: string;
  readonly label: Eyebrow;
  readonly heading: string;
  readonly body: string;
};

export type DeepDiveProduct = {
  readonly id: string;
  readonly tabLabel: string;
  readonly features: readonly DeepDiveFeature[];
  // [BLOCKER] No preview artwork exists in public/. The Figma draws a UI mockup on a
  // brand plate; until it is supplied the panel renders as the plate alone.
  readonly preview?: ImageAsset;
};

export type DeepDiveContent = {
  readonly heading: string;
  readonly intro: string;
  readonly products: readonly [DeepDiveProduct, DeepDiveProduct];
};

const PAYMENTS_FEATURES: readonly DeepDiveFeature[] = [
  {
    id: "multi-currency-wallet",
    label: "Multi-currency wallet",
    heading: "One wallet, several currencies",
    body: "Hold, manage, send and receive multiple currencies on a single platform. No separate account per currency and no closing a position just to open another.",
  },
  {
    id: "funding",
    label: "Funding",
    heading: "Top up in the currency you earn in",
    body: "Fund directly from USD, GBP or CAD. Your home currency goes in, spendable balance comes out.",
  },
  {
    id: "exchange-rates",
    label: "Exchange rates",
    heading: "See the rate before you commit",
    body: "Transparent, real-time exchange rates shown at the moment of conversion — so the cost of a transaction is never a surprise on your statement.",
  },
  {
    id: "the-wallet",
    label: "The Wallet",
    heading: "Your Omanga Wallet, ready to spend",
    body: "Pay with ease from your wallet balance, wherever cards are accepted.",
  },
  {
    id: "coverage",
    label: "Coverage",
    heading: "Works across 43 African countries",
    // [CORRECTED] "One card for a multi-country trip" -> "One wallet". The last surviving
    // card claim in the document; NJ struck the rest and project-context.md forbids it.
    // Confirm the edited sentence with copy.
    body: "One wallet for a multi-country trip, instead of a new arrangement at every border.",
  },
  {
    id: "control",
    label: "Control",
    heading: "Manage everything from one account",
    body: "Balances, transactions and your insurance plan in a single view.",
  },
] as const;

const INSURANCE_FEATURES: readonly DeepDiveFeature[] = [
  {
    id: "plan-tiers",
    label: "Plan tiers",
    heading: "Silver, Gold and Diamond",
    body: "Three levels of short-term health cover, so you can match protection to trip length and budget rather than buying more than you need.",
  },
  {
    id: "providers",
    label: "Providers",
    heading: "Cover from established Nigerian providers",
    body: "Your plan is delivered through top Nigerian health providers with real local networks — not a distant policy that struggles on the ground.",
  },
  {
    id: "trip-length-cover",
    label: "Trip-length cover",
    heading: "Short-term cover, built for trips",
    body: "Cover for the duration of your travel, not an annual policy you keep paying for after you're home.",
  },
  {
    id: "renew-and-extend",
    label: "Renew and extend",
    heading: "Extend without starting again",
    body: "Trip running long? Renew or extend your plan from your account.",
  },
  {
    id: "care-access",
    label: "Care access",
    heading: "Reach healthcare while you travel",
    body: "Access care when you need it during your trip, across the countries Omanga covers.",
  },
  {
    id: "one-account",
    label: "One account",
    heading: "Bought and managed alongside your wallet",
    body: "Select your plan on the same platform you use to pay — no second signup, no second login.",
  },
] as const;

const OMANGA_PAYMENTS: DeepDiveProduct = {
  id: "omanga-payments",
  tabLabel: "Omanga Payments",
  features: PAYMENTS_FEATURES,
} as const;

/**
 * Exported because the insurance page renders this same product untabbed.
 *
 * Shared rather than copied, so the six features cannot drift between the two
 * pages. That the content appears twice at all is a deliberate override of
 * `Omanga-Insurance-Page-Content-Spec` § 3 — see
 * `content/insurance-deep-dive.content.ts`, where the objection is recorded.
 */
export const holidayInsuranceProduct: DeepDiveProduct = {
  id: "holiday-insurance",
  tabLabel: "Holiday Insurance",
  features: INSURANCE_FEATURES,
} as const;

export const deepDiveContent: DeepDiveContent = {
  heading: "A closer look at Omanga Payments and Holiday Insurance",
  // The Figma reads "the wallet, the card and the three insurance plans"; the approved
  // document drops "the card", and copy outranks the frame.
  intro: "Everything the wallet and the three insurance plans actually do.",
  products: [OMANGA_PAYMENTS, holidayInsuranceProduct],
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const DEEP_DIVE_HEADING_ID = "deep-dive-heading";
