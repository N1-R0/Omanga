import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { BlogPost } from "@/types/blog.types";
import type { ImageAsset } from "@/types/content.types";

/**
 * Article: paying for things in Nigeria as a visitor.
 *
 * Primary keyword: "how to pay in Nigeria as a visitor".
 * Secondary: "using a UK card in Nigeria", "cash in Nigeria", "best way to
 * spend money in Nigeria". Intent: practical, pre-trip planning.
 *
 * [REVISED, 2026-10-09] Rewritten for a more natural voice and checked facts.
 * Sources for Nigeria-specific claims:
 *   - GOV.UK Nigeria travel advice, safety and security (card fraud, ATMs,
 *     carrying cash) — linked in the text.
 *   - CBN payments data via TechCabal (cash still dominant in person, transfers
 *     dominant online) — https://techcabal.com/2024/12/27/everyone-does-transfers/
 *   - "Illegal to change money on the street" is from an older FCDO money page
 *     and is phrased as such.
 * Omanga claims restate the approved Payments copy only.
 */

/**
 * Cover from Unsplash (free licence), cropped to 4:3 around faces by the CDN
 * so the card and cover crops never cut through a head.
 */
const howToPayImage: ImageAsset = {
  src: "https://images.unsplash.com/photo-1687422809654-579d81c29d32?w=2000&h=1500&fit=crop&crop=faces",
  alt: "A smiling street vendor in a yellow dress and headscarf holding a phone at her fruit stand.",
  width: 2000,
  height: 1500,
};

const FCDO_SAFETY_URL =
  "https://www.gov.uk/foreign-travel-advice/nigeria/safety-and-security";

export const howToPayInNigeriaPost: BlogPost = {
  slug: "how-to-pay-in-nigeria-as-a-visitor",
  meta: {
    title: "How to Pay in Nigeria as a Visitor: Cards, Cash & Transfers | Omanga",
    description:
      "Visiting Nigeria from the UK, US or Canada? How cash, cards and bank transfers really work, where visitors lose money on exchange rates, and how to plan before you fly.",
    path: "/blog/how-to-pay-in-nigeria-as-a-visitor",
    ogImage: howToPayImage,
  },
  category: "Payments",
  title: "How to pay for things in Nigeria as a visitor",
  summary:
    "Cash still matters, transfers are everywhere, and your home card is a backup rather than a plan. Here's how paying actually works, and where visitors lose money.",
  publishedDate: "2026-10-09",
  readingMinutes: 7,
  image: howToPayImage,
  imageCredit: {
    name: "Ali Mkumbwa",
    url: "https://unsplash.com/photos/a-woman-standing-in-front-of-a-fruit-stand-holding-a-cell-phone-5dFuO02OHh0",
  },
  intro: [
    {
      kind: "paragraph",
      content: [
        "Paying for things in Nigeria works differently from what most visitors from the UK, the US or Canada are used to. Cash still carries a lot of everyday spending. Bank transfers are how many businesses expect to be paid. And the card in your wallet may get you through a hotel check-in but not a market, a taxi or a caterer.",
      ],
    },
    {
      kind: "paragraph",
      content: [
        "None of this is hard once you know it. It just pays to plan before you land rather than at a counter in Lagos with a declined card and a queue behind you.",
      ],
    },
    {
      kind: "note",
      title: "The short version",
      content: [
        "Use more than one method. Keep modest amounts of naira for small spending, treat your home card as a backup, and know what exchange rate you're getting before you convert anything.",
      ],
    },
  ],
  sections: [
    {
      id: "how-people-pay",
      heading: "How people actually pay in Nigeria",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Cash is still the most common way to pay in person, according to Central Bank of Nigeria data. Alongside it, instant bank transfers have become the default for a huge share of payments, and they dominate online. A shop, a driver or an event vendor will often simply give you an account number and wait for the alert on their phone. Card terminals, known locally as POS, are everywhere too, and many double as places to withdraw cash.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "For a visitor, the catch is that paying by transfer needs a Nigerian bank account. Without one, you'll need another way to pay those sellers: cash, a card they accept, or someone who can transfer on your behalf.",
          ],
        },
      ],
    },
    {
      id: "home-card",
      heading: "Will my UK, US or Canadian card work in Nigeria?",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Often, yes, particularly at hotels, larger restaurants and shops in the big cities. But it's the least predictable option you have. Some terminals won't accept a foreign card. Your bank may treat a Nigerian transaction as suspicious and freeze the card until you call them. And the rate your bank uses to convert the payment is rarely the one you see on Google, often with a foreign transaction fee added on top.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "The UK Foreign Office also warns that card fraud is common in Nigeria and advises keeping your card in sight when you pay (",
            { text: "GOV.UK travel advice", href: FCDO_SAFETY_URL, isExternal: true },
            "). In practice, that means not letting it be carried off to another room, and checking the amount on the terminal before you enter your PIN.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Before you go, tell your bank where you're travelling, find out what it charges for foreign transactions, and keep a second card somewhere separate from the first.",
          ],
        },
      ],
    },
    {
      id: "cash",
      heading: "Cash: useful, but carry less than you think",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "You'll want naira for markets, tips, small shops and some transport. Just don't carry a week's budget around. The Foreign Office advises against carrying large amounts of cash, notes a rise in crime around banks and ATMs, and recommends extra care when withdrawing money, especially at night. ATMs inside banks, malls and hotels during the day are the safer choice, and topping up little and often beats one big withdrawal.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "When you change money, use a bank or a licensed operator. Earlier Foreign Office guidance pointed out that changing money on the street is illegal, and airport and hotel desks rarely offer a good rate.",
          ],
        },
      ],
    },
    {
      id: "exchange-rate",
      heading: "The exchange rate is where visitors lose the most",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "The mid-market rate is the midpoint between the prices at which banks buy and sell a currency. It's the rate you see on Google or in financial news. Most providers don't give it to you. They convert your money at a slightly worse rate and keep the difference, which is why a service can honestly say \"no fees\" and still cost you money.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "The difference adds up quietly. If £1,000 is converted at a rate 3% below the mid-market rate, you've paid £30 that never appears as a fee on any receipt. Over a few weeks of spending, and especially over December, that hidden margin can easily cost more than any charge you can see. The simplest habit to build: before you confirm a conversion, compare the rate you're offered with the mid-market rate. If a provider won't show you the rate first, assume you're paying for it somewhere.",
          ],
        },
      ],
    },
    {
      id: "multi-currency-wallet",
      heading: "Where a multi-currency wallet fits",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "A multi-currency wallet lets you move money before you travel, at a rate you can see, and then spend from a balance you already hold, rather than converting every payment at whatever rate your bank picks that day.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "That's the job ",
            { text: "Omanga Payment Solutions", href: "/payments" },
            " is built for. You fund your wallet from USD, GBP or CAD at the mid-market rate, see the rate before you confirm, and spend from your balance across ",
            COUNTRIES_SERVED_DISPLAY,
            " African countries, Nigeria included, online or in person. The wallet holds six currencies, has no minimums and no hidden fees, and transfers between Omanga accounts are free, which is handy if family members use it too. It's operated by Fuspay Technologies, a microfinance bank licensed by the Central Bank of Nigeria, and support is available 24/7.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "It won't replace a few notes for a roadside seller, and it isn't meant to. Think of it as the main account for the trip, with cash for the small things and your home card as the backup.",
          ],
        },
      ],
    },
    {
      id: "before-you-fly",
      heading: "Before you fly",
      blocks: [
        {
          kind: "list",
          style: "number",
          items: [
            ["Tell your bank you're travelling and check its foreign transaction fees."],
            ["Set up and fund your wallet at a rate you can see, so you're not converting under pressure on arrival."],
            ["Plan a small amount of naira for the first day: transport, tips, a SIM card."],
            ["Keep a second card in a different bag from the first."],
            ["Save your bank's and your wallet provider's support numbers on your phone."],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "The visitors who have the easiest time aren't the ones with the best card. They're the ones who never depend on a single way to pay. Sort out your health cover while you're planning, too; our guide to ",
            {
              text: "health insurance for visiting Nigeria",
              href: "/blog/health-insurance-for-visiting-nigeria",
            },
            " explains why it matters.",
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
          "Often, especially at hotels and larger businesses in big cities, but not everywhere. Some terminals don't accept foreign cards, your bank may block the card until you confirm the payment, and the exchange rate it applies may be poor. Card fraud is also common, so keep your card in sight when you pay and carry a backup.",
      },
      {
        question: "Is Nigeria a cash economy?",
        answer:
          "Cash is still the most common way to pay in person, but instant bank transfers are now used for a large share of payments, and card terminals (POS) are widespread. Visitors without a Nigerian bank account usually rely on cash and cards, or a wallet they can spend from.",
      },
      {
        question: "Where should I change money in Nigeria?",
        answer:
          "Use a bank or a licensed operator rather than street changers, and avoid airport and hotel desks if you can, as their rates are usually poor. Compare any rate you're offered with the mid-market rate before you agree.",
      },
      {
        question: "What is the mid-market exchange rate?",
        answer:
          "It is the midpoint between the buy and sell prices of a currency, the rate you see on Google or in financial news. Omanga converts at the mid-market rate and shows you the rate before you confirm.",
      },
      {
        question: "Can I send money to family in Nigeria with Omanga?",
        answer:
          "Omanga lets you hold, send and receive money in six currencies from one wallet, and transfers between Omanga accounts are free.",
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
