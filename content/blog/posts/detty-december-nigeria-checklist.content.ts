import type { BlogPost } from "@/types/blog.types";

/**
 * Article: Detty December checklist for visiting Nigeria.
 *
 * Seasonal. Searches for "detty december" peak in November and December, so
 * this needs to be live and indexed by early November to catch the curve.
 * Refresh the year in the title and dates each autumn rather than publishing
 * a new URL — the slug deliberately carries no year so the page keeps the
 * links and ranking it earns.
 *
 * [VERIFY] No event names, dates or prices are stated: they change every year
 * and are not Omanga's to confirm.
 */
export const dettyDecemberChecklistPost: BlogPost = {
  slug: "detty-december-nigeria-checklist",
  meta: {
    title: "Detty December 2026: Money & Health Checklist for Nigeria | Omanga",
    description:
      "Heading to Lagos or Abuja for Detty December? A practical checklist for paying for things, avoiding bad exchange rates and sorting your health cover before you fly.",
    path: "/blog/detty-december-nigeria-checklist",
  },
  category: "Travel",
  title: "Detty December 2026: your money and health checklist for Nigeria",
  summary:
    "Concerts, weddings, beach days and family time — and a lot of spending. Here's how to sort your money and health cover before you land.",
  publishedDate: "2026-10-09",
  readingMinutes: 4,
  intro: [
    {
      kind: "paragraph",
      content: [
        "Every December, people from across the diaspora head home to Nigeria for weeks of concerts, weddings, parties and family time — Detty December. It's also when visitors spend the most, and when a declined card or a sudden hospital visit is most disruptive. This checklist covers the two things worth sorting before you fly: your money and your health cover.",
      ],
    },
  ],
  sections: [
    {
      id: "money",
      heading: "Your money checklist",
      blocks: [
        {
          kind: "list",
          style: "number",
          items: [
            ["Tell your bank you're travelling, and check your card's foreign transaction fees."],
            [
              "Move money at a rate you can see. A wallet like ",
              { text: "Omanga Payment Solutions", href: "/payments" },
              " lets you fund from USD, GBP or CAD at the mid-market rate before you fly.",
            ],
            ["Keep some naira cash for markets, tips and transport — but not large amounts."],
            ["Have a second way to pay in case a card is declined at a venue."],
            ["Budget for December prices: demand peaks, and so do costs."],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "For more detail, read ",
            {
              text: "how to pay for things in Nigeria as a visitor",
              href: "/blog/how-to-pay-in-nigeria-as-a-visitor",
            },
            ".",
          ],
        },
      ],
    },
    {
      id: "health",
      heading: "Your health checklist",
      blocks: [
        {
          kind: "list",
          style: "number",
          items: [
            ["Check whether your cover at home works in Nigeria — it usually doesn't."],
            [
              "Arrange short-term health cover for the length of your trip, such as ",
              { text: "Omanga Holiday Insurance", href: "/insurance" },
              ".",
            ],
            ["Speak to a travel clinic about vaccinations and malaria prevention well before you fly."],
            ["Pack any regular medication, with enough to cover delays."],
            ["Save your insurer's emergency contact on your phone."],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "For more detail, read ",
            {
              text: "do you need health insurance when visiting Nigeria?",
              href: "/blog/health-insurance-for-visiting-nigeria",
            },
          ],
        },
      ],
    },
  ],
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "What is Detty December?",
        answer:
          "Detty December is the name for the busy festive season in Nigeria, especially Lagos, when many people from the diaspora travel home for concerts, parties, weddings and family time.",
      },
      {
        question: "How should I take money to Nigeria for December?",
        answer:
          "Use more than one method: a wallet you can fund at a clear exchange rate before you fly, your home card as a backup, and a small amount of naira cash for day-to-day spending.",
      },
      {
        question: "Do I need travel health insurance for Detty December?",
        answer:
          "It is strongly recommended. Health cover from home usually doesn't pay for treatment in Nigeria. Omanga Holiday Insurance gives short-term cover for the length of your trip, from $50 a month.",
      },
    ],
  },
  cta: {
    label: "Get started with Omanga",
    href: "/get-started",
    prompt: ["Payments and health cover for your trip, in one Omanga account."],
  },
};
