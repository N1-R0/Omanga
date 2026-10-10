import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { Eyebrow } from "@/types/content.types";

// Section 5 of Omanga-Homepage-Copy-Approval NJ edits.docx, tracked changes accepted.

export type HowItWorksStep = {
  readonly id: string;
  readonly heading: string;
  readonly body: string;
};

export type HowItWorksContent = {
  readonly eyebrow: Eyebrow;
  readonly heading: string;
  readonly intro: string;
  readonly steps: readonly [HowItWorksStep, HowItWorksStep, HowItWorksStep];
};

export const howItWorksContent: HowItWorksContent = {
  // The Figma draws no eyebrow, but the approved document supplies one and copy outranks
  // the frame. Confirm whether it should render.
  eyebrow: "How it works",
  heading: "Ready in three steps",
  // The Figma appends an author's note — "(Replaces the current intro, which repeats step 1
  // word for word.)" — which is editorial, not copy.
  intro: "All of them before you board.",
  steps: [
    {
      id: "sign-up",
      heading: "Sign up and fund your wallet",
      body: "Open your account in minutes and top up from USD, GBP or CAD. You see the exchange rate before you confirm.",
    },
    {
      id: "choose-cover",
      heading: "Choose your cover",
      // The Figma reads "your Omanga card and wallet"; the tracked changes struck "card".
      body: "Pick the plan that fits your trip. Your payments and cover sit in one account, so there's one place to manage both.",
    },
    {
      id: "explore",
      heading: "Travel with everything handled",
      // [CHANGED, 2026-08-29] The count is interpolated, not typed. The Figma read
      // 52, the tracked changes made it 43, and it is now 50+ — three values for one
      // fact in one year is the argument for the constant owning it.
      body: `Spend in ${COUNTRIES_SERVED_DISPLAY} African countries and reach healthcare if you need it.`,
    },
  ],
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const HOW_IT_WORKS_HEADING_ID = "how-it-works-heading";
