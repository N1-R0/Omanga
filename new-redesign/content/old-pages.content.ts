import type { FaqItem } from "@/types/blog.types";

import { walletClosing } from "@/new-redesign/content/wallet.content";

const FAQ_SUB = { subLink: "Chat on WhatsApp", subTail: "if yours isn't here." } as const;

export const OLD_PAGE_FAQ_SUB = {
  about: "Who we are and what Omanga does.",
  contact: "Getting help and reaching the team.",
  plans: "Plans, prices and buying cover.",
  safety: "Who provides what, and keeping your account safe.",
  rates: "This rate and changing money with Omanga.",
  guide: "More on this topic.",
} as const;

export function oldPageFaq(title: string, subLead: string, items: readonly FaqItem[]) {
  return {
    eyebrow: "Questions",
    title,
    subLead,
    ...FAQ_SUB,
    items: items.map((i) => ({ q: i.question, a: i.answer })),
  };
}

export const plansClosing = {
  ...walletClosing,
  title: "Keep your plan and your money in one account",
  text: "Open a free wallet, add pounds, dollars or Canadian dollars, and pay by transfer from day one.",
} as const;
