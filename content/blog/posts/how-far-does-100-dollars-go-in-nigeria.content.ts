import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { BlogPost } from "@/types/blog.types";
import type { ImageAsset } from "@/types/content.types";

/**
 * Article: how far does $100 go in Nigeria?
 *
 * [ADDED, 2026-10-11] Replaces "How to pay in Nigeria as a visitor" on the
 * owner's instruction (one new post in, one old post out). The old slug
 * 301-redirects here from `next.config.ts`, and this post absorbs the old
 * post's cards / cash / exchange-rate advice so nothing it ranked for is lost.
 *
 * Why this question: "travel to nigeria" on AnswerThePublic, run in the UK,
 * US, Canada and Ireland. Questions about what dollars are worth there were the
 * only money topic that came up in all four markets: "Is $100 USD a lot in
 * Nigeria?", "How far does $100 go in Nigeria?", "Is $20 / $50 / $200 / $500 a
 * lot in Nigeria?", "Is Nigeria expensive for tourists?", "How much does a meal
 * cost in Nigeria?". See design.md § Blog SEO workflow.
 *
 * Primary keyword: "how far does $100 go in Nigeria". Secondary: "is $100 a lot
 * in Nigeria", "is $20 a lot of money in Nigeria", "is Nigeria expensive for
 * tourists", "cost of a meal in Lagos". Intent: pre-trip budgeting.
 *
 * Voice: written as one person talking to another — second person, short
 * scenes the reader recognises (landing at the airport, the first Bolt ride,
 * December prices). No invented anecdotes or customers: every "you" scene is
 * hypothetical, and every number is sourced.
 *
 * Sources (all checked 2026-10-11):
 *   - Rate: CBN official (NFEM) ~₦1,330/$ and parallel ~₦1,375–1,390/$ in early
 *     October 2026 (Vanguard, Techeconomy, ngnrates.com). The post rounds to
 *     ~₦1,350 and says so. Re-check before each refresh.
 *   - Meals, rides, SIM, data, daily budgets: 24 Hours Market, "Cost of Living
 *     in Lagos (2026 Visitor Guide)", Feb 2026.
 *   - Tourist vs local prices ("about double"): spendsanity.com Lagos guide.
 *   - MTN 10GB / 30 days at ₦4,500: 2026 Nigerian data-plan guides.
 *   - December: Tribune, "Detty December diaspora budget guide", Jul 2026
 *     (₦3,000 Lekki–VI ride reaching ₦12,000–15,000 after concerts; shortlets
 *     ₦120,000–250,000 a night in regular months). BusinessDay on 2025 season
 *     short-let price rises.
 *   - Card fraud, ATMs, carrying cash: GOV.UK Nigeria travel advice (linked).
 * Omanga claims restate the approved Payments copy only.
 * [CHANGED, 2026-10-14] UX copy pass (design.md § Home UX copy pass): names the
 *   ₦20 transfer fee instead of "no hidden fees", drops unconfirmed 24/7 wallet
 *   support, shorter sentences.
 *
 * [VERIFY] Prices move with fuel and the naira. Refresh the figures and the
 * rate every quarter, and before November for the December section.
 */

/** Carried over from the post this replaces; same Unsplash photo and crop. */
const hundredDollarsImage: ImageAsset = {
  src: "https://images.unsplash.com/photo-1687422809654-579d81c29d32?w=2000&h=1500&fit=crop&crop=faces",
  alt: "A smiling street vendor in a yellow dress and headscarf holding a phone at her fruit stand.",
  width: 2000,
  height: 1500,
};

/**
 * [ADDED, 2026-10-18] Audit quick win: the share image is the same photo,
 * cropped to 1200x630 and self-hosted (public/blog/og/), so link previews
 * don't depend on Unsplash or show a 4:3 crop.
 */
const shareImage: ImageAsset = {
  src: "/blog/og/how-far-does-100-dollars-go-in-nigeria.jpg",
  alt: hundredDollarsImage.alt,
  width: 1200,
  height: 630,
};

const FCDO_SAFETY_URL =
  "https://www.gov.uk/foreign-travel-advice/nigeria/safety-and-security";

export const howFarDoes100DollarsGoPost: BlogPost = {
  slug: "how-far-does-100-dollars-go-in-nigeria",
  meta: {
    // [CHANGED, 2026-10-18] Copy audit: title 68 → 59 and description
    // 167 → 145 characters, so neither is cut off in search results.
    title: "How Far Does $100 Go in Nigeria? Lagos Prices 2026 | Omanga",
    description:
      "Is $100 a lot in Nigeria? What $20, $50, $100 and $200 really buy in Lagos in 2026, why December costs more, and how to avoid bad exchange rates.",
    path: "/blog/how-far-does-100-dollars-go-in-nigeria",
    ogImage: shareImage,
  },
  category: "Payments",
  title: "How far does $100 actually go in Nigeria?",
  summary:
    "Further than at home, and not as far as people say. Here's what $20, $50, $100 and $200 really buy in Lagos right now, and the quiet ways visitors lose a chunk of it.",
  publishedDate: "2026-10-11",
  updatedDate: "2026-10-14",
  readingMinutes: 8,
  image: hundredDollarsImage,
  imageCredit: {
    name: "Ali Mkumbwa",
    url: "https://unsplash.com/photos/a-woman-standing-in-front-of-a-fruit-stand-holding-a-cell-phone-5dFuO02OHh0",
  },
  intro: [
    {
      kind: "paragraph",
      content: [
        "Ask whether $100 is a lot of money in Nigeria and you'll get two answers. One cousin says you'll live like royalty. A friend who went last December says Lagos emptied her account in a week. Both are true. It depends on what you buy, where and when.",
      ],
    },
    {
      kind: "paragraph",
      content: [
        "Here's the honest version, with real 2026 prices. No \"you'll be rich over there\" and no horror stories. Just what your money buys, so you can plan a generous trip without a scary bank statement afterwards.",
      ],
    },
    {
      kind: "note",
      title: "The short answer",
      content: [
        "At around ₦1,350 to the dollar, $100 is roughly ₦135,000. In ordinary Lagos, that covers several comfortable days of food, rides and data. In Lekki or Victoria Island in December, it might not cover one night's accommodation.",
      ],
    },
  ],
  sections: [
    {
      id: "the-rate",
      heading: "First, what is $100 in naira right now?",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "In early October 2026, the official rate was around ₦1,330 to the dollar. Street rates were a little higher, around ₦1,375 to ₦1,390. The gap is much smaller than it was 2 years ago, which is good news for visitors. This guide uses a round ₦1,350. For today's figure, see our ",
            // [ADDED, 2026-10-18] Internal link to the live rate page.
            { text: "dollars to naira rate", href: "/rates/dollars-to-naira" },
            ".",
          ],
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            ["$20 is about ₦27,000"],
            ["$50 is about ₦67,500"],
            ["$100 is about ₦135,000"],
            ["$200 is about ₦270,000"],
            ["$500 is about ₦675,000"],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Those are the numbers at a fair rate. What you actually get depends on how you convert, and that's where many visitors quietly lose money. More on that below.",
          ],
        },
      ],
    },
    {
      id: "what-it-buys",
      heading: "What $20, $50, $100 and $200 really buy in Lagos",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Prices differ between the Mainland and the Island (Lekki, Victoria Island, Ikoyi). The Island costs noticeably more. These are typical 2026 prices for the everyday things visitors buy.",
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "$20 (about ₦27,000): a good, ordinary day",
              description: [
                "A plate of rice and stew at a local buka costs ₦1,000 to ₦2,500 on the Mainland and ₦2,000 to ₦4,000 on the Island. A short Bolt or Uber ride is ₦3,000 to ₦7,000. A 10GB monthly MTN data bundle is about ₦4,500. So $20 covers lunch, a couple of rides and a month of data, with change left for water and a cold drink.",
              ],
            },
            {
              term: "$50 (about ₦67,500): a comfortable day out",
              description: [
                "A meal and a drink at a mid-range restaurant on the Island runs ₦6,000 to ₦12,000 a person. Add a cross-city ride (₦8,000 to ₦20,000 or more, depending on traffic), lunch and a few short trips, and $50 gives you a full, relaxed day without counting every naira.",
              ],
            },
            {
              term: "$100 (about ₦135,000): a few easy days, or one big night",
              description: [
                "Spread out, $100 covers three or four comfortable days of food and getting around. Spent in one go, it's dinner for two at an upscale Island spot (₦15,000 to ₦40,000 or more a person) plus drinks and rides home. It is not, on its own, a night in a nice Lekki apartment, where two-bedroom shortlets ran ₦120,000 to ₦250,000 a night even outside December.",
              ],
            },
            {
              term: "$200 (about ₦270,000): a night or two of real comfort",
              description: [
                "This is roughly one night in a good Island shortlet in a normal month, or a mid-range hotel, with money left for the day. Or, if you're staying with family, it's a week of eating out, getting around and treating people without thinking twice.",
              ],
            },
          ],
        },
        {
          kind: "paragraph",
          content: [
            "So is $100 a lot in Nigeria? For everyday living, yes. It goes a long way. For the things visitors splurge on, like Island accommodation, nights out and events, it goes about as far as in London or Toronto. Sometimes less.",
          ],
        },
      ],
    },
    {
      id: "december",
      heading: "December is a different country",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Flying in for Detty December? Double-check everything above. Demand spikes when the diaspora comes home, and prices follow. A Lekki to Victoria Island ride that normally costs about ₦3,000 can jump to ₦12,000 to ₦15,000 when a concert ends at midnight and everyone opens the app at once. Island shortlets climbed sharply in the 2025 season, enough that many visitors switched to hotels.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "December is still worth it. It's the best time of year to be there. But the \"$100 goes so far\" maths stops working. For the things in demand, budget as if you were in a big Western city: where you stay, how you get home late, and the events you've seen on Instagram since October. Our ",
            { text: "Detty December checklist", href: "/blog/detty-december-nigeria-checklist" },
            " goes through the rest.",
          ],
        },
      ],
    },
    {
      id: "daily-budget",
      heading: "A realistic daily budget for a first visit",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Not counting where you sleep, this is what food and getting around tend to cost a visitor in Lagos each day.",
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Budget: ₦7,000 to ₦15,000 a day (about $5 to $11)",
              description: [
                "Local bukas, buses or the odd shared ride, and staying mostly in one area. Very doable if you're staying with family and living like a local.",
              ],
            },
            {
              term: "Comfortable: ₦15,000 to ₦35,000 a day (about $11 to $26)",
              description: [
                "A mix of local spots and mid-range restaurants, Bolt or Uber when you need it, and a coffee or a drink out.",
              ],
            },
            {
              term: "Treating yourself: ₦40,000 a day and up (about $30 and up)",
              description: [
                "Island restaurants, rides everywhere, nights out. There's no real ceiling here, and in December this is where budgets run away.",
              ],
            },
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Then add accommodation, which is usually the biggest single cost if you're not staying with family. Book it early if you're travelling between mid-November and early January.",
          ],
        },
      ],
    },
    {
      id: "where-money-goes",
      heading: "Where visitors quietly lose money",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Most people don't overspend in Nigeria because things are expensive. They overspend because of small leaks they don't notice until they're home.",
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "A bad exchange rate",
              description: [
                "This is the big one. The mid-market rate is the rate you see on Google. Many providers convert at a worse rate and keep the difference, so a service can say \"no fees\" and still cost you. Convert $1,000 at 3% below the mid-market rate and you lose $30 without seeing a single fee. Over a few weeks, that adds up to more than any charge on a receipt.",
              ],
            },
            {
              term: "Changing cash at the airport or hotel",
              description: [
                "You've just landed, you're tired and you want naira in your hand. An airport desk feels easy, but it's usually one of the worst rates you'll be offered. Use a bank or a licensed operator, and never change money on the street.",
              ],
            },
            {
              term: "\"Visitor prices\"",
              description: [
                "If you look or sound like you just got back, some sellers and drivers will quote you more. A visitor's plate of jollof can easily cost double what a local pays. A few hundred naira is rarely worth an argument. On bigger purchases, ask a local friend what something should cost, or let them do the talking.",
              ],
            },
            {
              term: "Your home bank's card fees",
              description: [
                "Every card payment and ATM withdrawal abroad can carry a foreign transaction fee, on top of the bank's own exchange rate. One swipe doesn't hurt. 3 weeks of swiping does.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "how-to-pay",
      heading: "How to pay for things without the stress",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Nigerians pay with a mix of cash, instant bank transfers and card terminals (called POS). Many sellers simply give you an account number and wait for the alert on their phone. That's easy with a Nigerian bank account and awkward without one.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Your UK, US or Canadian card often works at hotels, malls and bigger restaurants, but not everywhere. Your bank may freeze it the first time it sees a Nigerian payment. Tell your bank before you travel, and keep a second card in a different bag. The UK Foreign Office warns that card fraud is common, so keep your card in sight when you pay (",
            { text: "GOV.UK travel advice", href: FCDO_SAFETY_URL, isExternal: true },
            ").",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Carry some naira for small things like tips, market stalls and danfo fares, but not your whole budget. The same advice warns against carrying large amounts of cash and urges care around ATMs, especially at night. Withdraw little and often, from ATMs inside banks, malls or hotels, during the day.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "The visitors with the easiest time aren't the ones with the most money. They're the ones who never rely on one way to pay.",
          ],
        },
      ],
    },
    {
      id: "make-it-go-further",
      heading: "Making your $100 go further with Omanga",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Most of the money visitors lose, they lose at the conversion. The Omanga wallet is built to fix that part. You fund it from USD, GBP or CAD and see the rate before you confirm. Then you spend from your balance online or in person across ",
            COUNTRIES_SERVED_DISPLAY,
            " African countries, Nigeria included.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            // [CHANGED, 2026-10-14] UX copy pass: named the ₦20 fee instead of "no
            // hidden fees"; removed 24/7 wallet support (not owner-confirmed).
            "The wallet is free to open and holds 6+ currencies, with no minimums. ",
            { text: "Explore the wallet", href: "/payments" },
            ".",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "It won't replace a few notes for the roadside suya man, and it isn't meant to. Use it as the main account for your trip, with a little cash for small things and your home card as a backup. While you're planning, sort out your health cover too. Our guide to ",
            {
              text: "health insurance for visiting Nigeria",
              href: "/blog/health-insurance-for-visiting-nigeria",
            },
            " explains why your cover at home stops at the airport.",
          ],
        },
      ],
    },
  ],
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "Is $100 a lot of money in Nigeria?",
        answer:
          "For everyday spending, yes. At around ₦1,350 to the dollar, $100 is about ₦135,000, enough for three or four comfortable days of food, rides and data in Lagos. It goes much less far on Island accommodation, nights out and anything in December, when prices rise sharply.",
      },
      {
        question: "Is $20 a lot of money in Nigeria?",
        answer:
          "$20 is about ₦27,000. In Lagos that covers a local lunch, a couple of short Bolt or Uber rides and a 10GB monthly data bundle, with a little left over. It is a good ordinary day, not a big night out.",
      },
      {
        question: "Is $200 or $500 a lot in Nigeria?",
        answer:
          "$200 is about ₦270,000, roughly one night in a good Lagos Island shortlet in a normal month, or a week of comfortable eating out and getting around if you are staying with family. $500 is about ₦675,000 and covers a comfortable week or more of daily spending, before accommodation.",
      },
      {
        question: "Is Nigeria expensive for tourists?",
        answer:
          "Everyday food, transport and data are cheap when converted from dollars, pounds or Canadian dollars. Island accommodation, upscale restaurants, nightlife and events can cost as much as at home, and more in December. Visitors are also sometimes quoted higher prices than locals.",
      },
      {
        question: "How much does a meal cost in Lagos?",
        answer:
          "A local buka meal costs about ₦1,000 to ₦4,000, a mid-range restaurant about ₦4,000 to ₦12,000 a person with a drink, and an upscale restaurant ₦15,000 to ₦40,000 or more a person. Prices are higher on the Island than on the Mainland.",
      },
      {
        question: "Can I use my UK or US bank card in Nigeria?",
        answer:
          "Often, at hotels, malls and larger businesses in big cities, but not everywhere. Your bank may block the card until you confirm the payment. Foreign transaction fees and exchange margins add up. Card fraud is common, so keep your card in sight and carry a backup.",
      },
      {
        question: "What is the mid-market exchange rate?",
        answer:
          "It is the midpoint between the buy and sell prices of a currency: the rate you see on Google or in financial news. The Omanga wallet shows you its rate before you confirm, so you can compare.",
      },
    ],
  },
  cta: {
    label: "Explore the wallet",
    href: "/payments",
    prompt: [
      "Fund your wallet from USD, GBP or CAD. Spend online or in person across ",
      COUNTRIES_SERVED_DISPLAY,
      " African countries. Free to open.",
    ],
  },
};
