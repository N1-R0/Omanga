import type { PageMetaContent } from "@/types/content.types";

/**
 * Search titles and descriptions for the pages live in the new design
 * (cutover, 2026-10-26). Titles are the old pages' keyword-tested ones
 * (Semrush pass 2026-10-18, design-lab/copy-seo-review-2026-10-18.md), so
 * rankings carry over. Descriptions follow the owner's naming ("insurance",
 * not "health cover") and the no-rate, no-fee rule.
 */
export const homeMeta: PageMetaContent = {
  title: "Omanga: Travel Money and Health Insurance for Nigeria",
  description:
    "Open a free Omanga wallet, add pounds, dollars or Canadian dollars and spend in 50+ African countries. Add health insurance for your trip to Nigeria.",
  path: "/",
};

export const paymentsMeta: PageMetaContent = {
  title: "Travel Money Wallet: Pounds and Dollars to Naira | Omanga",
  description:
    "A free travel money wallet: change pounds, dollars or Canadian dollars to naira, see the rate before you confirm, and pay by transfer in Nigeria.",
  path: "/payments",
};

export const insuranceMeta: PageMetaContent = {
  title: "Travel Insurance for Nigeria: Health Cover from $50 | Omanga",
  description:
    "Travel insurance for Nigeria that covers your health: short-term plans from Phillips HMO, from $50 a month. Compare insurance plans.",
  path: "/insurance",
};

/** The FAQ sections' { q, a } pairs, in the shape lib/schema.ts reads. */
export const faqItems = (items: ReadonlyArray<{ q: string; a: string }>) => items.map(({ q, a }) => ({ question: q, answer: a }));
