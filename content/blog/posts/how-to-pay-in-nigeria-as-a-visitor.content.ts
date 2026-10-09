import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { BlogPost } from "@/types/blog.types";

/**
 * Article: paying for things in Nigeria as a visitor.
 *
 * Target searches (unverified volumes — check in Keyword Planner):
 * "how to pay in nigeria as a visitor", "can i use my uk card in nigeria",
 * "best way to spend money in nigeria from abroad".
 *
 * [VERIFY] Omanga claims are taken only from the approved Payments copy (six
 * currencies, USD/GBP/CAD funding, mid-market rates, no minimums, free
 * Omanga-to-Omanga transfers). General statements about Nigeria are written as
 * tendencies, not rules, and need a read by the Omanga team before launch.
 */
export const howToPayInNigeriaPost: BlogPost = {
  slug: "how-to-pay-in-nigeria-as-a-visitor",
  meta: {
    title: "How to Pay for Things in Nigeria as a Visitor | Omanga",
    description:
      "Cards, cash, transfers or a multi-currency wallet: a practical guide to paying for things in Nigeria when you're visiting from the UK, US or Canada.",
    path: "/blog/how-to-pay-in-nigeria-as-a-visitor",
  },
  category: "Payments",
  title: "How to pay for things in Nigeria as a visitor",
  summary:
    "Your home card, cash, bank transfers or a multi-currency wallet — what works, what to watch for, and how to avoid losing money on the exchange rate.",
  publishedDate: "2026-10-09",
  readingMinutes: 6,
  intro: [
    {
      kind: "paragraph",
      content: [
        "If you're visiting Nigeria from the UK, the US or Canada — for family, a wedding, business or December — paying for things is rarely as simple as tapping the card you use at home. This guide walks through the main options, what each one costs you, and how Omanga fits in.",
      ],
    },
    {
      kind: "note",
      title: "The short version",
      content: [
        "Don't rely on one method. Carry a little cash in naira, know that your home card may be declined or charged a poor rate, and move money at a rate you can see before you travel.",
      ],
    },
  ],
  sections: [
    {
      id: "home-bank-card",
      heading: "Using your home bank card in Nigeria",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "A UK, US or Canadian card can work in Nigeria, but it is the least predictable option. Some merchants and card terminals don't accept foreign cards, some banks block card payments abroad until you tell them you're travelling, and the exchange rate your bank applies is often worse than the rate you see online.",
          ],
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            ["Tell your bank you're travelling before you fly."],
            ["Check your card's foreign transaction fee and the rate it uses."],
            ["Keep a second way to pay in case the card is declined."],
          ],
        },
      ],
    },
    {
      id: "cash",
      heading: "Cash: still useful, but limited",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Naira cash is still handy for markets, small shops, tips and transport. But carrying large amounts is a risk, and exchanging money at airports or hotels usually comes with a poor rate. Treat cash as a backup for small spending, not your main way to pay.",
          ],
        },
      ],
    },
    {
      id: "bank-transfers",
      heading: "Bank transfers and point-of-sale payments",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Many businesses in Nigeria take payment by bank transfer or at a point-of-sale (POS) terminal. That works well if you have a way to pay from a balance you already hold — which is where a wallet helps, rather than paying international transfer fees every time.",
          ],
        },
      ],
    },
    {
      id: "exchange-rates",
      heading: "Why the exchange rate matters more than the fee",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "The mid-market rate is the midpoint between the buy and sell prices of two currencies — the rate you see on Google or financial news. Many providers advertise \"no fees\" but convert your money at a rate below the mid-market rate, keeping the difference. On a trip's worth of spending, that hidden margin can cost more than any visible fee.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Before you convert, compare the rate you're offered with the mid-market rate. If you can't see the rate before you confirm, assume you're paying for it somewhere.",
          ],
        },
      ],
    },
    {
      id: "multi-currency-wallet",
      heading: "Using a multi-currency wallet like Omanga",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "A multi-currency wallet lets you move money before you travel and spend from a balance you already hold. With ",
            { text: "Omanga Payment Solutions", href: "/payments" },
            ", you fund your wallet from USD, GBP or CAD at the mid-market rate, see the rate before you confirm, and spend from your balance across ",
            COUNTRIES_SERVED_DISPLAY,
            " African countries, including Nigeria.",
          ],
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            ["Hold, send and receive money in six currencies from one wallet."],
            ["No minimums and no hidden fees."],
            ["Free transfers between Omanga accounts — useful for sending money to family."],
            ["24/7 support if something goes wrong mid-trip."],
          ],
        },
      ],
    },
    {
      id: "checklist",
      heading: "A quick money checklist before you fly",
      blocks: [
        {
          kind: "list",
          style: "number",
          items: [
            ["Tell your bank you're travelling and check your card's foreign fees."],
            ["Set up a wallet and fund it at a rate you can see."],
            ["Plan a small amount of naira cash for day-to-day spending."],
            ["Save your provider's support contact on your phone."],
            [
              "Sort your health cover too — see ",
              { text: "Omanga Holiday Insurance", href: "/insurance" },
              ".",
            ],
          ],
        },
      ],
    },
  ],
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "Can I use my UK or US bank card in Nigeria?",
        answer:
          "Often, yes, but not everywhere. Some merchants and terminals don't accept foreign cards, some banks block payments abroad until you tell them you're travelling, and the exchange rate applied may be poor. Carry a second way to pay.",
      },
      {
        question: "What is the best way to pay for things in Nigeria as a visitor?",
        answer:
          "Use more than one method: a wallet or account you can fund at a clear exchange rate for most spending, plus a small amount of naira cash for markets, tips and transport.",
      },
      {
        question: "What is the mid-market exchange rate?",
        answer:
          "It is the midpoint between the buy and sell prices of two currencies, the rate you see on Google or financial news. Omanga converts at the mid-market rate and shows you the rate before you confirm.",
      },
      {
        question: "Can I send money to family in Nigeria with Omanga?",
        answer:
          "Yes. Omanga lets you hold, send and receive money in six currencies from one wallet, and transfers between Omanga accounts are free.",
      },
    ],
  },
  cta: {
    label: "Explore Omanga Payments",
    href: "/payments",
    prompt: [
      "Fund in USD, GBP or CAD at the mid-market rate and spend across ",
      COUNTRIES_SERVED_DISPLAY,
      " African countries from one Omanga wallet.",
    ],
  },
};
