import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
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
  heading: "Omanga Holiday Insurance: frequently asked questions",
  items: [
    {
      question: "What is Omanga Holiday Insurance?",
      answer: `Omanga Holiday Insurance is short-term travel health insurance for the length of your trip, delivered through established Nigerian health providers with real hospital networks. Your cover travels with you across ${COUNTRIES_SERVED_DISPLAY} African countries.`,
    },
    {
      question: "How much does Omanga Holiday Insurance cost?",
      answer:
        "Plans start from $50 a month for Silver, $85 a month for Gold and $120 a month for Diamond. There is no commitment and you can cancel anytime.",
    },
    {
      question: "What is the difference between Silver, Gold and Diamond?",
      answer:
        "Every plan covers hospital admission, diagnostics, emergency assistance and evacuation. The difference is how much room you have: ward type, scan allowances and which hospitals you can use. Silver and Gold open Category A and B hospitals; Diamond adds Category C.",
    },
    {
      question: "How quickly does my cover start?",
      answer: "You can activate your Omanga cover in about five minutes.",
    },
    {
      question: "What is included on every Omanga plan?",
      answer:
        "Every plan includes telemedicine with licensed doctors, roaming cover across the countries Omanga serves, a 24/7 contact centre, the mobile app and a health-tips newsletter.",
    },
    {
      question: "Who provides Omanga Holiday Insurance?",
      answer:
        "Omanga Holiday Insurance is provided by Phillips HMO, a registered insurance provider regulated by the National Insurance Commission (NAICOM).",
    },
  ],
};
