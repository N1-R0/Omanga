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
    heading: "Six currencies, one wallet",
    body: "Hold, send and receive 6+ currencies without opening a separate account for each.",
  },
  {
    id: "funding",
    label: "Funding",
    heading: "Top up in the currency you earn in",
    body: "Fund your wallet from USD, GBP or CAD, and spend from one balance.",
  },
  {
    id: "exchange-rates",
    label: "Exchange rates",
    heading: "The real rate, before you convert",
    body: "Every conversion uses the mid-market rate, refreshed hourly. You see it before you confirm.",
  },
  {
    id: "the-wallet",
    label: "Spending",
    heading: "Ready to spend",
    /*
      [CHANGED, 2026-08-29] "wherever cards are accepted" struck, for the reason
      recorded at the same phrase in `services.content.ts`: it describes the
      instrument by naming the one Omanga does not issue.
    */
    body: "Pay straight from your wallet balance, online or in person.",
  },
  {
    id: "coverage",
    label: "Where it works",
    heading: `Works across ${COUNTRIES_SERVED_DISPLAY} African countries`,
    // [CORRECTED] "One card for a multi-country trip" -> "One wallet". The last surviving
    // card claim in the document; NJ struck the rest and project-context.md forbids it.
    // Confirm the edited sentence with copy.
    body: "One wallet for every country on your trip, instead of a new arrangement at each border.",
  },
  {
    id: "control",
    label: "One view",
    heading: "See it all in one place",
    body: "Your balances, transactions and health plan, in one account.",
  },
] as const;

// [CHANGED, 2026-10-10] INSURANCE_FEATURES only: copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged.
const INSURANCE_FEATURES: readonly DeepDiveFeature[] = [
  {
    id: "plan-tiers",
    label: "Plan tiers",
    heading: "Three plans: Silver, Gold and Diamond",
    body: "Three levels of short-term health cover, from $50 a month, so you pay only for what your trip needs.",
  },
  {
    id: "providers",
    label: "Provider",
    heading: "Care from Phillips HMO",
    body: "Your plan comes from Phillips HMO, a Nigerian health provider regulated by NAICOM, with its own hospital network.",
  },
  {
    id: "trip-length-cover",
    label: "Trip-length cover",
    heading: "Cover for your trip, not the whole year",
    body: "Cover lasts as long as your trip. No annual policy to keep paying for once you're home.",
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
    heading: "Get care across Nigeria",
    body: "See a doctor or go to hospital in Phillips HMO's network, wherever you are in Nigeria.",
  },
  {
    id: "one-account",
    label: "One account",
    heading: "Manage your cover alongside your wallet",
    body: "Your plan and your wallet live in one account: one sign-up, one login.",
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
  tabLabel: "Wallet",
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
  tabLabel: "Health cover",
  features: INSURANCE_FEATURES,
} as const;

export const deepDiveContent: DeepDiveContent = {
  heading: "Everything in your Omanga account",
  // The Figma reads "the wallet, the card and the three insurance plans"; the approved
  // document drops "the card", and copy outranks the frame.
  intro: "The wallet and the three health plans, feature by feature.",
  products: [omangaPaymentsProduct, holidayInsuranceProduct],
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const DEEP_DIVE_HEADING_ID = "deep-dive-heading";
