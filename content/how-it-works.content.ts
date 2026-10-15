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
  heading: "Set up in three steps",
  // The Figma appends an author's note — "(Replaces the current intro, which repeats step 1
  // word for word.)" — which is editorial, not copy.
  // [CHANGED, 2026-10-14] UX copy pass (home audit).
  intro: "Do it all before you fly.",
  steps: [
    {
      id: "sign-up",
      heading: "Open your wallet",
      body: "Sign up in minutes and top up from USD, GBP or CAD.",
    },
    {
      id: "choose-cover",
      heading: "Add health cover",
      // The Figma reads "your Omanga card and wallet"; the tracked changes struck "card".
      body: "Pick Silver, Gold or Diamond for the length of your trip. It sits in the same account as your wallet.",
    },
    {
      id: "explore",
      heading: "Land ready",
      // [CHANGED, 2026-08-29] The count is interpolated, not typed. The Figma read
      // 52, the tracked changes made it 43, and it is now 50+ — three values for one
      // fact in one year is the argument for the constant owning it.
      // Care is Nigeria only; spending is the wallet's wider reach.
      body: `Spend in ${COUNTRIES_SERVED_DISPLAY} African countries, and get care in Nigeria if you need it.`,
    },
  ],
} as const;
