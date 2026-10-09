import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { FaqContent } from "@/types/blog.types";

/**
 * Payments page FAQ.
 *
 * [ADDED, 2026-10-09] Not in the approved copy document — drafted for SEO and
 * marked for the Omanga team's review. Every answer restates a claim the
 * approved Payments copy already makes; nothing new is promised. Questions are
 * phrased the way people search them, and each answer names Omanga so the
 * brand is attached to the answer wherever it is quoted.
 */
export const PAYMENTS_FAQ_HEADING_ID = "payments-faq-heading";

export const paymentsFaqContent: FaqContent = {
  heading: "Omanga Payments: frequently asked questions",
  items: [
    {
      question: "What is Omanga Payment Solutions?",
      answer: `Omanga Payment Solutions is a multi-currency wallet for travel across Africa. You can hold, send and receive money in six currencies, fund your wallet from USD, GBP or CAD, and spend from your balance in ${COUNTRIES_SERVED_DISPLAY} African countries.`,
    },
    {
      question: "Which currencies can I fund my Omanga wallet with?",
      answer:
        "You can top up your Omanga wallet from USD, GBP or CAD. Every conversion runs at the mid-market rate, and you see the rate before you confirm.",
    },
    {
      question: "Does Omanga charge hidden fees?",
      answer:
        "No. Omanga has no hidden fees and no minimums, and transfers between Omanga accounts are free.",
    },
    {
      question: "What exchange rate does Omanga use?",
      answer:
        "Omanga uses the mid-market rate, sourced from public market data and refreshed hourly. You see the real rate before you convert, so there is no markup discovered later on your statement.",
    },
    {
      question: "Where can I spend with Omanga?",
      answer: `You can spend from your Omanga balance in ${COUNTRIES_SERVED_DISPLAY} African countries, online or in person.`,
    },
    {
      question: "Who operates the Omanga wallet?",
      answer:
        "The Omanga wallet is operated by Fuspay Technologies, a registered microfinance bank holding a banking licence from the Central Bank of Nigeria.",
    },
  ],
};
