import { insuranceFaqContent } from "@/content/insurance-faq.content";
import { paymentsFaqContent } from "@/content/payments-faq.content";
import type { FaqContent, FaqItem } from "@/types/blog.types";

/**
 * [ADDED, 2026-10-18] Page-specific FAQ lists (copy audit,
 * design-lab/copy-seo-review-2026-10-18.md § 7).
 *
 * Home, About, Contact and Get Started all rendered the same six questions,
 * so four pages carried identical FAQ blocks and identical FAQPage schema.
 * About and Contact now pick the questions their visitors ask. Every answer
 * is an existing approved answer, picked by its question text (not by index)
 * so reordering the source lists cannot swap answers.
 */
const ALL: readonly FaqItem[] = [
  ...paymentsFaqContent.items,
  ...insuranceFaqContent.items,
];

function pick(questions: readonly string[]): FaqItem[] {
  return questions.map((question) => {
    const item = ALL.find((candidate) => candidate.question === question);
    if (item === undefined) throw new Error(`FAQ not found: ${question}`);
    return item;
  });
}

/** About: who Omanga is and who stands behind each product. */
export const aboutFaqContent: FaqContent = {
  heading: "Questions about Omanga",
  items: pick([
    "What is the Omanga travel wallet?",
    "What health insurance does Omanga offer for Nigeria?",
    "What fees does Omanga charge?",
    "Who provides Omanga's health cover?",
    "Where can I spend money with Omanga?",
    "Does Omanga health cover work outside Nigeria?",
  ]),
};

/** Contact: the practical questions people write in about. */
export const contactFaqContent: FaqContent = {
  heading: "Answers to common questions",
  items: pick([
    "How do I fund my Omanga wallet?",
    "What fees does Omanga charge?",
    "How do I change pounds or dollars to naira?",
    "How quickly can I get Omanga health cover?",
    "Can I extend my Omanga plan if my trip runs long?",
    "Does Omanga health cover work outside Nigeria?",
  ]),
};

/**
 * Plans: questions about choosing and keeping a plan. Was the full
 * insurance FAQ, which duplicated /insurance word for word (owner approved
 * the split 2026-10-18).
 */
export const plansFaqContent: FaqContent = {
  heading: "Choosing a health plan: common questions",
  items: pick([
    "How much is travel insurance for Nigeria?",
    "What does each Omanga plan cover: Silver, Gold or Diamond?",
    "What's included on every Omanga plan?",
    "Can I extend my Omanga plan if my trip runs long?",
    "Does Omanga health cover work outside Nigeria?",
    "How does health insurance work in Nigeria?",
  ]),
};
