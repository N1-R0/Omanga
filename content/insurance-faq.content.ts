// [CHANGED, 2026-10-10] Copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged.
import type { FaqContent } from "@/types/blog.types";

/**
 * Insurance page FAQ.
 *
 * [ADDED, 2026-10-09] Not in the approved copy document — drafted for SEO and
 * marked for the Omanga team's review. Prices and inclusions restate
 * `insurance-plans.content.ts`; the provider restates `legal-shared.content.ts`.
 */
export const INSURANCE_FAQ_HEADING_ID = "insurance-faq-heading";

export const insuranceFaqContent: FaqContent = {
  heading: "Common questions about Omanga Holiday Insurance",
  items: [
    {
      question: "What is Omanga Holiday Insurance?",
      // [CHANGED, 2026-10-14] Cover applies in Nigeria only; the old answer
      // claimed it travelled across every country the wallet works in.
      answer: "Omanga Holiday Insurance is short-term health insurance for the length of your trip to Nigeria. It comes from Phillips HMO, a Nigerian health provider with its own hospital network.",
    },
    {
      question: "How much does Omanga Holiday Insurance cost?",
      answer:
        "Omanga Holiday Insurance starts from $50 a month for Silver, $85 a month for Gold and $120 a month for Diamond. There's no commitment, and you can cancel any time.",
    },
    {
      question: "What does each Omanga plan cover: Silver, Gold or Diamond?",
      answer:
        "Every Omanga plan covers hospital admission, diagnostics, emergency assistance and evacuation. The plans differ in ward type, scan allowances and which hospitals you can use. Silver and Gold open Category A and B hospitals; Diamond adds Category C.",
    },
    {
      question: "How quickly does Omanga travel health cover start?",
      answer: "You can activate your Omanga cover in about five minutes.",
    },
    {
      question: "What's included on every Omanga plan?",
      answer:
        "Every Omanga plan includes telemedicine with licensed doctors, roaming cover across Nigeria, a 24/7 contact centre, the mobile app and a health-tips newsletter.",
    },
    {
      question: "Who provides Omanga Holiday Insurance?",
      answer:
        "Omanga Holiday Insurance is provided by Phillips HMO, a registered insurance provider regulated by the National Insurance Commission (NAICOM).",
    },
  ],
};
