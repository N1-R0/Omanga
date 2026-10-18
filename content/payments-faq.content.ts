// [CHANGED, 2026-10-10] Copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged.
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

/**
 * The fee answer, exported so the wallet's structured data
 * (`feesAndCommissionsSpecification`, lib/schema.ts) states the same fee the
 * page shows.
 */
export const PAYMENTS_FEES_ANSWER =
  "Opening an Omanga wallet is free. Each transfer costs ₦20, transfers between Omanga accounts are free, and there are no minimums.";

export const paymentsFaqContent: FaqContent = {
  // [CHANGED, 2026-10-14] UX copy pass: shorter.
  heading: "Questions about the Omanga wallet",
  items: [
    {
      question: "What is Omanga Payment Solutions?",
      // [CHANGED, 2026-10-14] UX copy pass: one sentence fewer; adds "free to open". Shown on home (index 0).
      answer: `Omanga Payment Solutions is a multi-currency wallet for travel in Africa. Fund it from USD, GBP or CAD, hold 6 currencies and spend in ${COUNTRIES_SERVED_DISPLAY} African countries, online or in person. It is free to open.`,
    },
    {
      question: "How do I fund my Omanga wallet?",
      // [CHANGED, 2026-10-14] UX copy pass: verb-first; "see the rate before you
      // confirm" is left to the shared deep dive. Shown on home (index 1).
      answer:
        "Add money from USD, GBP or CAD, with no minimum amount. Omanga converts it at the mid-market rate.",
    },
    {
      // [CHANGED, 2026-10-14] Was "Does Omanga charge hidden fees?" answered
      // without naming a fee. ₦20 is confirmed; whether conversion is free is
      // not yet (design.md § Copy to-do).
      question: "What fees does Omanga charge?",
      answer: PAYMENTS_FEES_ANSWER,
    },
    {
      question: "What exchange rate does Omanga use?",
      // [CHANGED, 2026-10-14] UX copy pass: dropped "no markup", which implied
      // conversion is free (unconfirmed), and a repeat of "see the rate first".
      answer:
        "Omanga uses the mid-market rate: the midpoint between buying and selling prices, taken from public market data and refreshed hourly.",
    },
    {
      question: "Where can I spend money with Omanga?",
      answer: `You can spend from your Omanga wallet in ${COUNTRIES_SERVED_DISPLAY} African countries, online or in person.`,
    },
    {
      // [ADDED, 2026-10-18] Semrush: "pounds to naira" (12.1K/mo UK) and
      // "british pounds to naira". Facts already approved: GBP/USD funding,
      // mid-market conversion. [NEW] copy, needs sign-off.
      question: "How do I change pounds or dollars to naira?",
      answer:
        "Add pounds, dollars or Canadian dollars to your Omanga wallet, then convert them to naira in the app at the mid-market rate. You see the rate before you confirm.",
    },
    {
      question: "Who operates the Omanga wallet?",
      // [CHANGED, 2026-10-14] UX copy pass: active voice, shorter.
      answer:
        "Fuspay Technologies operates the Omanga wallet. Fuspay is a microfinance bank licensed by the Central Bank of Nigeria.",
    },
  ],
};
