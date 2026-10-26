import type { FaqItem } from "@/types/blog.types";

import { walletClosing } from "@/new-redesign/content/wallet.content";

/**
 * The FAQ and closing panel on the pages not yet rebuilt (owner, 2026-10-26:
 * every old page uses the new FAQ and final CTA UI). Each page keeps its own
 * questions; this adds the eyebrow and sub line the new FaqSection needs.
 */
const FAQ_SUB = { subLink: "Chat on WhatsApp", subTail: "if yours isn't here." } as const;

export const OLD_PAGE_FAQ_SUB = {
  about: "Who we are and what Omanga does.",
  contact: "Getting help and reaching the team.",
  plans: "Plans, prices and buying cover.",
  safety: "Who provides what, and keeping your account safe.",
  rates: "This rate and changing money with Omanga.",
  guide: "More on this topic.",
} as const;

/** An old page's FAQ in the shape `FaqSection` takes. */
export function oldPageFaq(title: string, subLead: string, items: readonly FaqItem[]) {
  return {
    eyebrow: "Questions",
    title,
    subLead,
    ...FAQ_SUB,
    items: items.map((i) => ({ q: i.question, a: i.answer })),
  };
}

/** Plans: the page is the plan list, so the panel sells the wallet beside it. */
export const plansClosing = {
  ...walletClosing,
  title: "Keep your plan and your money in one account",
  text: "Open a free wallet, add pounds, dollars or Canadian dollars, and pay by transfer from day one.",
} as const;
