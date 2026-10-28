import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { BlogPost } from "@/types/blog.types";
import type { ImageAsset } from "@/types/content.types";

/**
 * [ADDED, 2026-10-18] Phase 1 post (design-lab/copy-seo-review-2026-10-18.md
 * § 5.5). Targets the pounds↔naira cluster (Semrush UK: "pounds to naira"
 * 12.1K/mo, "pound to naira" 5.4K, "pounds to naira today" 2.9K) with the
 * question people ask next: how to get a good rate. Sends readers to the live
 * rate page for the figure itself, so the post never goes stale on numbers.
 *
 * Sources and limits:
 *   - The rate figure is not stated; the live page carries it.
 *   - Official vs street rate: the $100 post's dated October 2026 research.
 *   - UK card fees: stated as "often around 3%" and "check your bank", since
 *     each bank sets its own; the post names no bank.
 *   - Paying in local currency at the terminal, airport bureaux and ATM fees:
 *     general consumer advice, not claims about any provider.
 *   - Omanga claims restate approved copy only (GBP funding, rate shown
 *     before you confirm, free to open).
 * [REWRITTEN, 2026-10-28] Blog audit + rewrite pass:
 *   - Dropped "mid-market" and "real rate" (no-rate-disclosure rule). The
 *     yardstick is now "the rate Google shows" and, above all, naira received.
 *   - Added a worked comparison (hypothetical figures, labelled as such) so
 *     "compare naira received" is something a reader can do.
 *   - Added "Spending naira once you're there": owner's first-hand view that
 *     sellers want a transfer first; the wallet sends naira to any Nigerian
 *     bank account (owner, 2026-10-28). Links to the card and first-visit guides.
 * [NEW] copy, needs sign-off. Written without an owner interview (Phase 1
 * instruction); add Omanga's own experience when there is some.
 */
const nairaNotesImage: ImageAsset = {
  src: "https://images.unsplash.com/photo-1678693362793-e2fffac536d0?w=2000&h=1500&fit=crop",
  alt: "A hand holding a fan of blue ₦1,000 naira notes.",
  width: 2000,
  height: 1500,
};

/**
 * [ADDED, 2026-10-18] Audit quick win: the share image is the same photo,
 * cropped to 1200x630 and self-hosted (public/blog/og/), so link previews
 * don't depend on Unsplash or show a 4:3 crop.
 */
const shareImage: ImageAsset = {
  src: "/blog/og/pounds-to-naira-best-rate.jpg",
  alt: nairaNotesImage.alt,
  width: 1200,
  height: 630,
};

export const poundsToNairaBestRatePost: BlogPost = {
  slug: "pounds-to-naira-best-rate",
  meta: {
    title: "Pounds to Naira: How to Get the Best Rate in Nigeria | Omanga",
    description:
      "Changing pounds to naira for Nigeria? Where visitors lose money on the rate, why to pay in naira, and how to check you're getting a fair deal.",
    path: "/blog/pounds-to-naira-best-rate",
    ogImage: shareImage,
  },
  category: "Payments",
  title: "Pounds to naira: how to get the best rate in Nigeria",
  summary:
    "The rate on Google isn't always the rate you get. Where the gap comes from when you change pounds to naira, and how to keep more of your money.",
  publishedDate: "2026-10-18",
  updatedDate: "2026-10-28",
  readingMinutes: 6,
  image: nairaNotesImage,
  imageCredit: {
    name: "Sunday Abegunde",
    url: "https://unsplash.com/photos/a-persons-hand-reaching-for-a-piece-of-paper-money-C8N-j4ZmZBU",
  },
  intro: [
    {
      kind: "paragraph",
      content: [
        "You check the pounds to naira rate before you fly, then change your money and get noticeably less. That gap isn't bad luck. It's the margin someone adds on top of the rate Google shows you.",
      ],
    },
    {
      kind: "paragraph",
      content: [
        "Here's where that margin hides, and how to keep more of your pounds when you change them to naira.",
      ],
    },
  ],
  sections: [
    {
      id: "todays-rate",
      heading: "What is the pound to naira rate today?",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "The rate Google shows is a useful starting point, but nobody changes money at exactly that rate. Our ",
            { text: "pounds to naira page", href: "/rates/pounds-to-naira" },
            " shows today's figure, a converter and today's rates against dollars and Canadian dollars.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Use it as your yardstick. Whatever you're offered, work out how many naira you actually receive after every fee. That one number is the only fair way to compare.",
          ],
        },
        {
          kind: "note",
          title: "A quick example",
          content: [
            "Say you're changing £500. Offer A has a better headline rate but adds a £10 fee. Offer B has a slightly worse rate and no fee. Multiply what's left after the fee by the rate for each, and whichever gives more naira wins. Headline rates alone hide the fee; a \"no fee\" offer can hide a worse rate. (Figures here are for illustration only.)",
          ],
        },
      ],
    },
    {
      id: "official-street",
      heading: "Official rate and street rate",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Nigeria has an official rate and a street (parallel market) rate, offered by bureaux de change. In October 2026 the gap between them was small, much smaller than a couple of years ago. It still moves, so check both before you change a large amount.",
          ],
        },
      ],
    },
    {
      id: "where-you-lose",
      heading: "Where visitors lose money changing pounds",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          items: [
            [
              "Airport bureaux. Convenient, but the rate is usually one of the worst you'll see. Change only what you need for the first few hours.",
            ],
            [
              "Card fees. Many UK debit and credit cards add a fee for spending in a foreign currency, often around 3%. Check your bank's fee before you travel.",
            ],
            [
              "Paying in pounds at the till. If a card machine offers to charge you in pounds, say no and pay in naira. The conversion the machine offers usually costs more.",
            ],
            [
              "ATM withdrawals. Your bank and the local ATM can both charge a fee, on top of the exchange rate.",
            ],
            [
              "Small, repeated exchanges. Fixed fees hurt most on small amounts, so changing little and often costs more.",
            ],
          ],
        },
      ],
    },
    {
      id: "best-rate",
      heading: "How to get a good pounds to naira rate",
      blocks: [
        {
          kind: "list",
          style: "number",
          items: [
            ["Check the rate on Google or our rate page on the day you change money."],
            [
              "Compare what you'll receive in naira, after every fee, not the headline rate.",
            ],
            ["Always choose to pay in naira, not pounds."],
            ["Use the airport only for a small amount, if at all."],
            ["Change larger amounts less often, where it's safe to do so."],
          ],
        },
      ],
    },
    {
      id: "with-omanga",
      heading: "Changing pounds to naira with Omanga",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "With an Omanga wallet you add pounds, then convert them to naira. You see the rate before you confirm, so you know exactly how many naira you'll get. The wallet is free to open, with no minimums. It also works in ",
            COUNTRIES_SERVED_DISPLAY,
            " African countries if Nigeria isn't your only stop. ",
            { text: "Explore the wallet", href: "/payments" },
            ".",
          ],
        },
      ],
    },
    {
      id: "spending-naira",
      heading: "Spending your naira once you're there",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Getting a good rate is half of it. The other half is paying the way Nigerian sellers want. From our team in Lagos: most sellers ask for a bank transfer first. Card machines are common but often drop out, and cash is for small things. So naira sitting in a wallet you can send transfers from is more useful than a pile of notes.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "With Omanga, you send naira to any Nigerian bank account using the seller's account number, without a Nigerian bank account of your own. Naira you don't spend can be converted back. For cards, ATMs and what to carry, read ",
            { text: "can I use my card in Nigeria?", href: "/blog/can-i-use-my-card-in-nigeria" },
            " If it's your first trip, start with our ",
            {
              text: "first-time visitor's guide",
              href: "/blog/visiting-nigeria-for-the-first-time",
            },
            ".",
          ],
        },
      ],
    },
  ],
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "What is the best way to change pounds to naira?",
        answer:
          "Compare how many naira each offer gives you after fees, not the headline rate. Avoid airport bureaux for large amounts and always pay in naira, not pounds. A wallet like Omanga shows you the rate before you confirm.",
      },
      {
        question: "Is it better to pay in pounds or naira in Nigeria?",
        answer:
          "Pay in naira. When a card machine offers to charge you in pounds, the conversion it uses usually costs more than your own card's or wallet's rate.",
      },
      {
        question: "Where can I check the pounds to naira rate today?",
        answer:
          "Omanga's pounds to naira page shows today's reference rate and a converter.",
      },
      {
        question: "Why is the rate I get lower than the rate on Google?",
        answer:
          "Banks, bureaux and card providers often convert at a worse rate than the one Google shows and keep the difference, and some add fees as well. The difference is what the exchange costs you.",
      },
      {
        question: "How do I pay in naira in Nigeria without a Nigerian bank account?",
        answer:
          "Most sellers prefer a bank transfer. With an Omanga wallet you convert pounds to naira and send it to the seller's Nigerian bank account by account number. You do not need a Nigerian bank account. Carry a little cash for small purchases.",
      },
    ],
  },
  cta: {
    label: "See today's rate",
    href: "/rates/pounds-to-naira",
    prompt: [
      "Check today's pounds to naira rate, then convert in a free Omanga wallet.",
    ],
  },
};
