import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { PageMetaContent } from "@/types/content.types";

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
  title: "Health Insurance for Visiting Nigeria, from $50 | Omanga",
  description:
    "Travel health insurance for your trip to Nigeria: hospital care from Phillips HMO, from $50 a month for the months you're there. Compare plans.",
  path: "/insurance",
};

export const aboutMeta: PageMetaContent = {
  title: "About Omanga: Travel Money and Health Insurance",
  description: `Omanga is a Lagos company for visitors to Nigeria: a free wallet you can spend in ${COUNTRIES_SERVED_DISPLAY} African countries and short-term health cover from Phillips HMO.`,
  path: "/about",
};

export const faqItems = (items: ReadonlyArray<{ q: string; a: string }>) => items.map(({ q, a }) => ({ question: q, answer: a }));
