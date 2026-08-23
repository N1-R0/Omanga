import { WALLET_URL } from "@/config/site";
import { INSURANCE_PLANS_HREF } from "@/content/insurance.content";
import { COUNTRIES_SERVED } from "@/content/site.content";
import type { CallToAction, Eyebrow } from "@/types/content.types";

/**
 * Insurance hero — spec § 2.
 *
 * The page's only `h1`. It is the one heading the SEO section names twice
 * (§ 11.1 and § 11.2), so it is transcribed exactly.
 *
 * [DRIFT] The secondary CTA's label. The spec writes `Open Free Account`; the
 * homepage hero's equivalent, pointing at the same destination, is "Open Your
 * Free Wallet". Both are in circulation and neither is in the approved copy
 * document. The spec's label ships here because it is the newer document and it
 * uses the same string in § 9, but the site now says two things for one action.
 * Worth one decision rather than two labels.
 */

export type InsuranceHeroContent = {
  readonly eyebrow: Eyebrow;
  readonly heading: string;
  readonly intro: string;
  /** Sits below the buttons. Not a caption and not a legal line. */
  readonly helper: string;
  readonly actions: readonly [CallToAction, CallToAction];
};

export const insuranceHeroContent: InsuranceHeroContent = {
  eyebrow: "Omanga Holiday Insurance",
  heading: "Travel health insurance for Africa, sorted before you fly",
  intro: `Short-term health cover for the length of your trip, delivered through established Nigerian health providers with real hospital networks on the ground. Choose Silver, Gold or Diamond, and travel across ${COUNTRIES_SERVED} African countries knowing that care is arranged, not improvised.`,
  helper: "Cover for your trip, not a year. Cancel anytime.",
  actions: [
    {
      label: "Compare Insurance Plans",
      href: INSURANCE_PLANS_HREF,
      emphasis: "primary",
    },
    {
      label: "Open Free Account",
      href: WALLET_URL,
      isExternal: true,
      emphasis: "secondary",
    },
  ],
} as const;

/** Shared so the `h1` and the section's `aria-labelledby` cannot drift apart. */
export const INSURANCE_HERO_HEADING_ID = "insurance-hero-heading" as const;
