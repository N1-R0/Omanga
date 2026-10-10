import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
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

// [CHANGED, 2026-10-10] Copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged. (PAYMENTS_FEATURES only.)
const PAYMENTS_FEATURES: readonly DeepDiveFeature[] = [
  {
    id: "multi-currency-wallet",
    label: "Multi-currency wallet",
    heading: "One wallet, several currencies",
    body: "Hold, send and receive several currencies in one wallet. You don't need a separate account for each one.",
  },
  {
    id: "funding",
    label: "Funding",
    heading: "Top up in the currency you earn in",
    body: "Fund your wallet from USD, GBP or CAD. Your home currency goes in and a spendable balance comes out.",
  },
  {
    id: "exchange-rates",
    label: "Exchange rates",
    heading: "See the rate before you commit",
    body: "See the exchange rate before you convert, so the cost is clear up front.",
  },
  {
    id: "the-wallet",
    label: "The wallet",
    heading: "Your Omanga wallet, ready to spend",
    /*
      [CHANGED, 2026-08-29] "wherever cards are accepted" struck, for the reason
      recorded at the same phrase in `services.content.ts`: it describes the
      instrument by naming the one Omanga does not issue.
    */
    body: "Pay straight from your wallet balance, online or in person.",
  },
  {
    id: "coverage",
    label: "Coverage",
    heading: `Works across ${COUNTRIES_SERVED_DISPLAY} African countries`,
    // [CORRECTED] "One card for a multi-country trip" -> "One wallet". The last surviving
    // card claim in the document; NJ struck the rest and project-context.md forbids it.
    // Confirm the edited sentence with copy.
    body: "One wallet for a trip through several countries, instead of a new arrangement at every border.",
  },
  {
    id: "control",
    label: "Control",
    heading: "Manage everything from one account",
    body: "See your balances, transactions and insurance plan in one place.",
  },
] as const;

// [CHANGED, 2026-10-10] INSURANCE_FEATURES only: copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged.
const INSURANCE_FEATURES: readonly DeepDiveFeature[] = [
  {
    id: "plan-tiers",
    label: "Plan tiers",
    heading: "Three plans: Silver, Gold and Diamond",
    body: "Three levels of short-term health cover, so you match the cover to your trip length and budget without paying for more than you need.",
  },
  {
    id: "providers",
    label: "Providers",
    heading: "Care from established Nigerian health providers",
    body: "Your plan comes from established Nigerian health providers with local networks, not a distant insurer.",
  },
  {
    id: "trip-length-cover",
    label: "Trip-length cover",
    heading: "Cover for your trip, not the whole year",
    body: "You're covered for the length of your trip, not tied to an annual policy you keep paying for after you're home.",
  },
  {
    id: "renew-and-extend",
    label: "Renew and extend",
    heading: "Extend your cover if your trip runs long",
    body: "Renew or extend your plan from your Omanga account, without starting again.",
  },
  {
    id: "care-access",
    label: "Care access",
    heading: "Reach healthcare while you travel",
    body: "Get care when you need it during your trip, across the countries Omanga covers.",
  },
  {
    id: "one-account",
    label: "One account",
    heading: "Manage your cover alongside your wallet",
    body: "Choose your plan in the same account you use to pay, with no second sign-up and no second login.",
  },
] as const;

/**
 * Exported because the payments page renders this same product untabbed.
 *
 * [CHANGED, 2026-08-29] Was the module-private `OMANGA_PAYMENTS`. Exported and
 * renamed to match `holidayInsuranceProduct`, which had been exported for the
 * insurance page for exactly the same reason. Both halves of this section now
 * appear on a second URL, and both are shared rather than copied so the features
 * cannot drift between the two pages that render them.
 *
 * That the content appears twice at all is a deliberate override of the spec —
 * see `content/payments-deep-dive.content.ts`, where the objection is recorded.
 */
export const omangaPaymentsProduct: DeepDiveProduct = {
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
  heading: "What's inside Omanga",
  // The Figma reads "the wallet, the card and the three insurance plans"; the approved
  // document drops "the card", and copy outranks the frame.
  intro: "The wallet and the three insurance plans, feature by feature.",
  products: [omangaPaymentsProduct, holidayInsuranceProduct],
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const DEEP_DIVE_HEADING_ID = "deep-dive-heading";
