import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";

/**
 * [ADDED, 2026-10-15] One features section in place of two on the home page
 * (owner decision): "What you can do with Omanga" (three photo cards,
 * `services.content.ts`) and "Everything in your Omanga account" (twelve
 * tabbed features, `deep-dive.content.ts`) said the same five things twice.
 *
 * Six cards, three per product, each one claim. The two facts only the deep
 * dive carried are kept on the card they belong to: rates refresh hourly
 * (card 2) and Phillips HMO is NAICOM-regulated (card 5). Dropped as
 * restatements of the section heading: "See it all in one place" and "One
 * account". No card language (Omanga issues no card) and no "my".
 */

export type AccountFeatureIcon =
  | "top-up"
  | "convert"
  | "spend"
  | "plans"
  | "care"
  | "extend"
  | "wallet"
  | "pay"
  | "one-view"
  | "provider"
  | "trip";

export type AccountFeature = {
  readonly icon: AccountFeatureIcon;
  readonly heading: string;
  readonly body: string;
};

export type AccountFeatureGroup = {
  /** Omitted when the section has one group (the product pages). */
  readonly label?: string;
  readonly features: readonly AccountFeature[];
};

export type AccountFeaturesContent = {
  readonly eyebrow?: string;
  readonly heading: string;
  readonly intro?: string;
  readonly groups: readonly AccountFeatureGroup[];
};

export const accountFeaturesContent: AccountFeaturesContent = {
  eyebrow: "What you can do with Omanga",
  heading: "Everything your trip needs, in one account",
  groups: [
    {
      label: "Wallet",
      features: [
        {
          icon: "top-up",
          heading: "Top up in the currency you earn",
          body: "Fund your wallet from USD, GBP or CAD and hold 6+ currencies in one place.",
        },
        {
          icon: "convert",
          heading: "Convert at the real rate",
          body: "Every conversion uses the mid-market rate, refreshed hourly. You see it before you confirm.",
        },
        {
          icon: "spend",
          heading: `Spend in ${COUNTRIES_SERVED_DISPLAY} African countries`,
          body: "Pay from your balance, online or in person, wherever your trip takes you.",
        },
      ],
    },
    {
      label: "Health cover",
      features: [
        {
          icon: "plans",
          heading: "Pick Silver, Gold or Diamond",
          body: "Short-term health cover from $50 a month, for as long as your trip lasts.",
        },
        {
          icon: "care",
          heading: "Get care across Nigeria",
          body: "See a doctor or visit a hospital in Phillips HMO's network.",
        },
        {
          icon: "extend",
          heading: "Extend if you stay longer",
          body: "Renew or extend your plan from your account without starting again.",
        },
      ],
    },
  ],
} as const;

export const ACCOUNT_FEATURES_HEADING_ID = "account-features-heading";

/**
 * Turns a deep-dive product's features into one card group, keeping their
 * approved heading and body. `icons` names an icon per feature id.
 */
export function cardsFromDeepDive(
  features: readonly { id: string; heading: string; body: string }[],
  icons: Readonly<Record<string, AccountFeatureIcon>>,
): AccountFeatureGroup {
  return {
    features: features.map(({ id, heading, body }) => {
      const icon = icons[id];
      if (!icon) throw new Error(`No icon for feature "${id}"`);
      return { icon, heading, body };
    }),
  };
}
