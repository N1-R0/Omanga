import { CONTACT_EMAIL, WHATSAPP_NUMBER_DISPLAY } from "@/config/site";
import type { FaqItem } from "@/types/blog.types";
import type { PageMetaContent } from "@/types/content.types";

/**
 * [ADDED, 2026-10-18] "Is Omanga safe?" (Phase 1 of the copy and SEO plan,
 * design-lab/copy-seo-review-2026-10-18.md § 5.3). Revolut and Wise both run
 * a page titled with this question; it answers the trust check a first-time
 * visitor makes before handing over money.
 *
 * [CHANGED, 2026-10-18] Owner: the wallet's operating partner and backend
 * set-up aren't public, so this page is general: what you see before you
 * pay, who provides cover (Phillips HMO, customer-facing), account tips.
 * Earlier the same day: regulator and licence wording is softened
 * site-wide until the licences are confirmed (SEO audit: no CBN record found
 * for "Fuspay"; HMOs are usually NHIA-licensed, not NAICOM). The page names
 * the partners only. Restore regulators, licence numbers and register links
 * once confirmed. Other claims are approved: Fuspay operates the wallet,
 * Phillips HMO provides cover in Nigeria only, mid-market rate
 * shown before you confirm, ₦20 per transfer, free to open, no card. Nothing
 * about how funds are held, insured or segregated is stated: unconfirmed.
 * The account-safety tips are general advice, not Omanga policy claims.
 * [NEW] copy, needs sign-off.
 */
export const SAFETY_HEADING_ID = "safety-heading" as const;

export const safetyMeta: PageMetaContent = {
  title: "Is Omanga Safe? Your Wallet and Health Cover | Omanga",
  description:
    "Is Omanga safe? What you see before you pay, who provides your health cover, and how to keep your Omanga account safe.",
  path: "/safety",
};

export const safetyContent = {
  eyebrow: "Safety and trust",
  heading: "Is Omanga safe?",
  intro:
    "What you see before you pay, who provides your health cover, and how to keep your account safe.",
  pillarsHeading: "How Omanga keeps things clear",
  pillars: [
    {
      heading: "You see the rate before you pay",
      body: "Conversions use the mid-market rate, shown before you confirm. Transfers cost ₦20. Opening the wallet is free.",
    },
    {
      heading: "A Nigerian HMO provides your cover",
      body: "Phillips HMO provides every Omanga health plan and runs its own hospital network in Nigeria. Omanga isn't the insurer.",
    },
    {
      heading: "Help when something looks wrong",
      body: "Message us on WhatsApp or email us, and we'll pass your message to the right person.",
    },
  ],
  factsHeading: "What Omanga is, and isn't",
  facts: [
    "Omanga is a Lagos company for people visiting Nigeria and travelling across Africa.",
    "Omanga doesn't issue a card. You pay from your wallet balance.",
    "Health cover applies in Nigeria only. The wallet works in 50+ African countries.",
  ],
  tipsHeading: "Keep your account safe",
  tips: [
    "Don't share your PIN, password or one-time codes with anyone.",
    "Sign in only through the links on omanga.biz, not links sent to you by message.",
    "Use a strong screen lock on the phone you use for your wallet.",
    "If something looks wrong, contact us straight away.",
  ],
  contactHeading: "Worried about a payment or your account?",
  contactBody: `Email ${CONTACT_EMAIL} or message us on WhatsApp at ${WHATSAPP_NUMBER_DISPLAY}.`,
  faqHeading: "Safety questions",
} as const;

export const safetyFaq: readonly FaqItem[] = [
  {
    question: "Is Omanga safe to use?",
    answer:
      "You see the mid-market rate before you confirm a conversion, and transfers cost a flat ₦20. Health cover comes from Phillips HMO, a Nigerian health maintenance organisation (HMO). Keep your PIN and one-time codes private, and contact us if something looks wrong.",
  },
  {
    question: "Who provides Omanga's health cover?",
    answer:
      "Phillips HMO provides Omanga Holiday Insurance. It's a Nigerian health maintenance organisation (HMO) with its own hospital network.",
  },
  {
    question: "Does Omanga issue a card?",
    answer:
      "No. Omanga doesn't issue a card. You pay from your wallet balance, online or in person.",
  },
  {
    question: "What should I do if I see a payment I don't recognise?",
    answer: `Contact Omanga straight away by email at ${CONTACT_EMAIL} or on WhatsApp at ${WHATSAPP_NUMBER_DISPLAY}.`,
  },
];
