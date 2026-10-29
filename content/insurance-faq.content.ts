import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { FaqContent } from "@/types/blog.types";

export const insuranceFaqContent: FaqContent = {
  heading: "Travel insurance for Nigeria: common questions",
  items: [
    {
      question: "What health insurance does Omanga offer for Nigeria?",
      answer:
        "Omanga Holiday Insurance is short-term health insurance for your trip to Nigeria. It comes from Phillips HMO, a Nigerian health provider with its own hospital network. Cover applies in Nigeria only.",
    },
    {
      question: "How much is travel insurance for Nigeria?",
      answer:
        "Omanga's travel health insurance for Nigeria costs $50 a month on Silver, $85 on Gold and $120 on Diamond. There's no commitment, and you can cancel any time.",
    },
    {
      question: "What does each Omanga plan cover: Silver, Gold or Diamond?",
      answer:
        "Every plan covers hospital admission, diagnostics, emergency assistance and evacuation. The plans differ in ward type, scan allowances and which hospital categories you can use. Diamond opens the most hospitals, including Category C.",
    },
    {
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
      question: "How does health insurance work in Nigeria?",
      answer:
        "In Nigeria, health insurance usually runs through a health maintenance organisation (HMO), which works with a network of partner hospitals. Omanga's cover comes from Phillips HMO: you use the hospitals in your plan's category, and Phillips handles your care through its network.",
    },
  ],
};
