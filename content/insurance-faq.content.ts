// [CHANGED, 2026-10-10] Copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged.
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { FaqContent } from "@/types/blog.types";

/**
 * Insurance page FAQ.
 *
 * [ADDED, 2026-10-09] Not in the approved copy document — drafted for SEO and
 * marked for the Omanga team's review. Prices and inclusions restate
 * `insurance-plans.content.ts`; the provider restates `legal-shared.content.ts`.
 */
// [CHANGED, 2026-10-14] UX copy pass: answers name Phillips HMO and Nigeria.
// Order is load-bearing: home shows items[0], [1] and [2] by index. Two items
// added at the end (where cover applies, extending a plan).
export const insuranceFaqContent: FaqContent = {
  // [CHANGED, 2026-10-18] Semrush keyword pass (design-lab/copy-seo-review-2026-10-18.md): searchable heading.
  heading: "Travel insurance for Nigeria: common questions",
  items: [
    {
      // [CHANGED, 2026-10-18] Owner: phrased as a search ("health insurance … nigeria").
      question: "What health insurance does Omanga offer for Nigeria?",
      answer:
        "Omanga Holiday Insurance is short-term health insurance for your trip to Nigeria. It comes from Phillips HMO, a Nigerian health provider with its own hospital network. Cover applies in Nigeria only.",
    },
    {
      // [CHANGED, 2026-10-18] Semrush keyword pass (design-lab/copy-seo-review-2026-10-18.md): phrased as the search
      // ("how much is travel insurance in nigeria"). Same facts.
      question: "How much is travel insurance for Nigeria?",
      answer:
        "Omanga's travel health insurance for Nigeria costs $50 a month on Silver, $85 on Gold and $120 on Diamond. There's no commitment, and you can cancel any time.",
    },
    {
      question: "What does each Omanga plan cover: Silver, Gold or Diamond?",
      // [CHANGED, 2026-10-14] Per-tier categories cut: the old "Silver and Gold
      // open A and B" disagreed with the /plans cards (Silver: Category A).
      answer:
        "Every plan covers hospital admission, diagnostics, emergency assistance and evacuation. The plans differ in ward type, scan allowances and which hospital categories you can use. Diamond opens the most hospitals, including Category C.",
    },
    {
      // [CHANGED, 2026-10-14] Asks what is known (activation time). When cover
      // starts after activation is unconfirmed; see design.md copy to-do.
      question: "How quickly can I get Omanga health cover?",
      answer:
        "You can activate a plan from your Omanga account in about five minutes. Buy your plan before you travel to Nigeria.",
    },
    {
      question: "What's included on every Omanga plan?",
      answer:
        "Every plan includes telemedicine with licensed doctors, roaming cover across Nigeria, a contact centre, the mobile app and a health-tips newsletter.",
    },
    {
      // [CHANGED, 2026-10-18] Owner: phrased the way people ask it.
      question: "Who provides Omanga's health cover?",
      answer:
        "Phillips HMO provides Omanga Holiday Insurance. It's a Nigerian health maintenance organisation (HMO) with its own hospital network.",
    },
    {
      question: "Does Omanga health cover work outside Nigeria?",
      answer: `No. Omanga health cover applies in Nigeria only. Your Omanga wallet works in ${COUNTRIES_SERVED_DISPLAY} African countries, but your health cover doesn't.`,
    },
    {
      question: "Can I extend my Omanga plan if my trip runs long?",
      answer:
        "Yes. Renew or extend your plan from your Omanga account. There's no commitment, so you can also cancel any time.",
    },
    {
      // [ADDED, 2026-10-18] Semrush: "how does health insurance work in
      // nigeria", "hmo health insurance in nigeria". [NEW] copy, needs sign-off.
      question: "How does health insurance work in Nigeria?",
      answer:
        "In Nigeria, health insurance usually runs through a health maintenance organisation (HMO), which works with a network of partner hospitals. Omanga's cover comes from Phillips HMO: you use the hospitals in your plan's category, and Phillips handles your care through its network.",
    },
  ],
};
