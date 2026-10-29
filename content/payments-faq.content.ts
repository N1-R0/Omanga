import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { FaqContent } from "@/types/blog.types";

const PAYMENTS_FEES_ANSWER =
  "Opening an Omanga wallet is free, and there are no minimums. You see any charge in the app before you confirm.";

export const paymentsFaqContent: FaqContent = {
  heading: "Questions about the Omanga wallet",
  items: [
    {
      question: "What is the Omanga travel wallet?",
      answer: `Omanga Payment Solutions is a multi-currency wallet for travel in Africa. Fund it from USD, GBP or CAD, hold 6+ currencies and spend in ${COUNTRIES_SERVED_DISPLAY} African countries, online or in person. It is free to open.`,
    },
    {
      question: "How do I fund my Omanga wallet?",
      answer:
        "Add money from USD, GBP or CAD, with no minimum amount. You see the rate before you convert.",
    },
    {
      question: "What fees does Omanga charge?",
      answer: PAYMENTS_FEES_ANSWER,
    },
    {
      question: "Where can I spend money with Omanga?",
      answer: `You can spend from your Omanga wallet in ${COUNTRIES_SERVED_DISPLAY} African countries, online or in person.`,
    },
    {
      question: "How do I change pounds or dollars to naira?",
      answer:
        "Add pounds, dollars or Canadian dollars to your Omanga wallet, then convert them to naira in the app. You see the rate before you confirm.",
    },
  ],
};
