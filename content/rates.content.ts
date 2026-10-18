import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { FundingCurrency } from "@/lib/rates";
import type { FaqItem } from "@/types/blog.types";
import type { PageMetaContent } from "@/types/content.types";

/**
 * [ADDED, 2026-10-18] Live exchange-rate pages, one per funding currency
 * (owner request, from design-lab/copy-seo-review-2026-10-18.md § 5.1).
 *
 * Why these pages: the pounds↔naira search cluster is the largest money
 * search Omanga's audience makes (Semrush UK: ~180K/mo; "naira to pounds"
 * 14.8K, "pounds to naira" 12.1K). Wise's biggest traffic source is exactly
 * this kind of page. Each page targets both directions of one pair, so
 * "naira to pounds" and "pounds to naira" are one page, not two thin ones.
 *
 * Facts stay inside what is approved: Omanga converts USD, GBP and CAD to
 * naira at the mid-market rate, you see the rate before you confirm, and
 * transfers cost ₦20. The rate shown is the public reference rate from
 * `lib/rates.ts`, never a quote; the page says so. No "card" anywhere.
 */

export type RatePair = {
  /** URL segment, the way people search it. */
  readonly slug: string;
  readonly code: FundingCurrency;
  readonly symbol: string;
  /** Plural, as in "pounds to naira". */
  readonly plural: string;
  /** Full name, as in "British pounds". */
  readonly fullName: string;
};

export const RATE_PAIRS: readonly RatePair[] = [
  {
    slug: "pounds-to-naira",
    code: "GBP",
    symbol: "£",
    plural: "pounds",
    fullName: "British pounds",
  },
  {
    slug: "dollars-to-naira",
    code: "USD",
    symbol: "$",
    plural: "dollars",
    fullName: "US dollars",
  },
  {
    slug: "canadian-dollars-to-naira",
    code: "CAD",
    symbol: "C$",
    plural: "Canadian dollars",
    fullName: "Canadian dollars",
  },
];

export const getRatePair = (slug: string) =>
  RATE_PAIRS.find((pair) => pair.slug === slug);

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const titleCase = (s: string) => s.split(" ").map(capitalise).join(" ");

export function rateMeta(pair: RatePair): PageMetaContent {
  return {
    // "Pounds to Naira Today: GBP to NGN Exchange Rate | Omanga"
    title: `${titleCase(pair.plural)} to Naira Today: ${pair.code} to NGN Rate | Omanga`,
    description: `Today's ${pair.plural} to naira rate at the mid-market price, plus a ${pair.code} to NGN converter. Change ${pair.plural} to naira in a free Omanga wallet.`,
    path: `/rates/${pair.slug}`,
  };
}

export function rateCopy(pair: RatePair) {
  return {
    eyebrow: `${pair.code} to NGN exchange rate`,
    heading: `${capitalise(pair.plural)} to naira today`,
    // [CHANGED, 2026-10-18] The M1 matrix (owner pick) replaces the two
    // amount tables. The R2 chart was added and then removed the same day.
    matrixHeading: "Naira, dollar and pound rates today",
    matrixCaption: `Mid-market rates between US dollars, British pounds, Canadian dollars and Nigerian naira, including naira to ${pair.plural}`,
    stepsHeading: `Change ${pair.plural} to naira with Omanga`,
    steps: [
      {
        heading: `Add ${pair.plural}`,
        body: `Fund your free Omanga wallet in ${pair.code}. There's no minimum amount.`,
      },
      {
        heading: "Convert to naira",
        body: "Convert at the mid-market rate. You see the rate before you confirm.",
      },
      {
        heading: "Spend or send",
        body: `Pay in Nigeria or send money for ₦20. Your wallet works in ${COUNTRIES_SERVED_DISPLAY} African countries.`,
      },
    ],
    midMarketHeading: "What is the mid-market rate?",
    midMarketBody: [
      "The mid-market rate is the midpoint between the price banks buy and sell a currency at. It's the rate you see on Google or Reuters.",
      "Bureaux de change and card providers often add a margin on top of it. Omanga converts at the mid-market rate, so you can check our rate yourself.",
    ],
    sourceNote:
      "Reference rate from public market data, checked every hour. Your exact rate is shown in the Omanga app before you confirm.",
    otherRatesHeading: "Other naira rates",
    faqHeading: `${capitalise(pair.plural)} to naira: common questions`,
  };
}

const naira = (n: number) =>
  `₦${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/**
 * FAQ answers carry the live figure, so each question is answered on the page
 * and in `FAQPage` with the same characters (see `buildFaqPage`).
 */
export function rateFaq(pair: RatePair, rate: number, date: string): FaqItem[] {
  return [
    {
      question: `How much is ${pair.symbol}1 in naira today?`,
      answer: `${pair.symbol}1 is ${naira(rate)} at the mid-market rate (${date}).`,
    },
    {
      question: `How much is ${pair.symbol}100 in naira?`,
      answer: `${pair.symbol}100 is ${naira(rate * 100)} at today's mid-market rate (${date}).`,
    },
    {
      question: `What rate does Omanga use to change ${pair.plural} to naira?`,
      answer:
        "Omanga converts at the mid-market rate: the midpoint between buying and selling prices, from public market data. You see the rate before you confirm.",
    },
    {
      question: "Is this the rate I get?",
      answer:
        "This page shows the mid-market reference rate. Your exact rate is shown in the Omanga app before you confirm a conversion.",
    },
  ];
}
