import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { FundingCurrency } from "@/lib/rates";
import type { FaqItem } from "@/types/blog.types";
import type { PageMetaContent } from "@/types/content.types";

export type RatePair = {
  readonly slug: string;
  readonly code: FundingCurrency;
  readonly symbol: string;
  readonly plural: string;
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
    title: `${titleCase(pair.plural)} to Naira Today: ${pair.code} to NGN Rate | Omanga`,
    description: `Today's ${pair.plural} to naira rate, plus a ${pair.code} to NGN converter. Change ${pair.plural} to naira in a free Omanga wallet.`,
    path: `/rates/${pair.slug}`,
  };
}

export function rateCopy(pair: RatePair) {
  return {
    eyebrow: `${pair.code} to NGN exchange rate`,
    heading: `${capitalise(pair.plural)} to naira today`,
    matrixHeading: "Naira, dollar and pound rates today",
    matrixCaption: `Reference rates between US dollars, British pounds, Canadian dollars and Nigerian naira, including naira to ${pair.plural}`,
    stepsHeading: `Change ${pair.plural} to naira with Omanga`,
    steps: [
      {
        heading: `Add ${pair.plural}`,
        body: `Fund your free Omanga wallet in ${pair.code}. There's no minimum amount.`,
      },
      {
        heading: "Convert to naira",
        body: "Convert in the app. You see the rate before you confirm.",
      },
      {
        heading: "Spend or send",
        body: `Pay in Nigeria or send money to a bank account. Your wallet works in ${COUNTRIES_SERVED_DISPLAY} African countries.`,
      },
    ],
    sourceNote:
      "Reference rate only. Your exact rate is shown in the Omanga app before you confirm.",
    otherRatesHeading: "Other naira rates",
    faqHeading: `${capitalise(pair.plural)} to naira: common questions`,
  };
}

const naira = (n: number) =>
  `₦${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function rateFaq(pair: RatePair, rate: number, date: string): FaqItem[] {
  return [
    {
      question: `How much is ${pair.symbol}1 in naira today?`,
      answer: `${pair.symbol}1 is ${naira(rate)} at the reference rate (${date}).`,
    },
    {
      question: `How much is ${pair.symbol}100 in naira?`,
      answer: `${pair.symbol}100 is ${naira(rate * 100)} at today's reference rate (${date}).`,
    },
    {
      question: "Is this the rate I get?",
      answer:
        "This page shows a reference rate. Your exact rate is shown in the Omanga app before you confirm a conversion.",
    },
  ];
}
