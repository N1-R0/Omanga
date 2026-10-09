import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { BlogPost } from "@/types/blog.types";

/**
 * Article: do you need health insurance when visiting Nigeria?
 *
 * Target searches (unverified volumes — check in Keyword Planner):
 * "health insurance for visiting nigeria", "travel health insurance nigeria",
 * "short term health insurance nigeria".
 *
 * [VERIFY] Plan facts come from `insurance-plans.content.ts`,
 * `insurance-care.content.ts`, `insurance-proof.content.ts` and the legal
 * provider names. The NHS statement is general guidance phrased as "usually";
 * the team should confirm the wording before launch. Nothing here states what a
 * specific home policy covers — readers are told to check their own.
 */
export const healthInsuranceVisitingNigeriaPost: BlogPost = {
  slug: "health-insurance-for-visiting-nigeria",
  meta: {
    title: "Do You Need Health Insurance When Visiting Nigeria? | Omanga",
    description:
      "What your home cover usually won't pay for, what happens if you need a hospital in Nigeria, and how short-term travel health insurance from Omanga works.",
    path: "/blog/health-insurance-for-visiting-nigeria",
  },
  category: "Insurance",
  title: "Do you need health insurance when visiting Nigeria?",
  summary:
    "What your cover at home usually won't pay for abroad, what happens if you need a hospital during your trip, and how to choose short-term cover.",
  publishedDate: "2026-10-09",
  readingMinutes: 5,
  intro: [
    {
      kind: "paragraph",
      content: [
        "Most trips to Nigeria go without a single visit to a doctor. But if you do fall ill or have an accident — a fever, food poisoning, a road injury — the question of who pays, and which hospital will see you, matters fast. This guide explains why health cover is worth sorting before you fly, and how Omanga Holiday Insurance works.",
      ],
    },
    {
      kind: "note",
      title: "The short version",
      content: [
        "Your health cover at home usually won't pay for treatment in Nigeria. Short-term travel health cover, arranged before you fly, means care is organised through a local provider instead of paid for out of pocket.",
      ],
    },
  ],
  sections: [
    {
      id: "home-cover",
      heading: "Does your cover at home work in Nigeria?",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Usually not. The NHS generally doesn't pay for treatment outside the UK, and many US and Canadian health plans offer limited or no cover abroad. Some general travel insurance policies include medical cover, but limits, exclusions and how claims are paid vary widely. Check your own policy before you rely on it.",
          ],
        },
      ],
    },
    {
      id: "getting-care",
      heading: "What happens if you need a hospital in Nigeria?",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Private hospitals in Nigeria often expect payment or a deposit before treatment. If your cover only reimburses you after you get home, you may still need to pay upfront and file a claim from abroad.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Omanga works differently. Your plan is delivered through established Nigerian health providers with real hospital networks, so care is reached through a local relationship rather than a reimbursement claim filed from abroad.",
          ],
        },
      ],
    },
    {
      id: "what-to-look-for",
      heading: "What to look for in travel health cover",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          items: [
            ["Hospital admission, and how many days per trip are covered."],
            ["Diagnostics — tests and scans — and any limits on them."],
            ["Emergency assistance and evacuation."],
            ["Which hospitals you can actually use."],
            ["Whether you can cover just the length of your trip, not a full year."],
          ],
        },
      ],
    },
    {
      id: "omanga-plans",
      heading: "How Omanga Holiday Insurance works",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Omanga Holiday Insurance is short-term health cover for the length of your trip, provided by Phillips HMO, which is regulated by the National Insurance Commission (NAICOM). Cover activates in about five minutes, there's no commitment, and you can cancel anytime.",
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Silver — from $50 a month",
              description: [
                "Essential cover for a straightforward trip: 24/7 emergency assistance, 15 days' admission per trip, basic diagnostics, emergency evacuation and essential prescription drugs.",
              ],
            },
            {
              term: "Gold — from $85 a month",
              description: [
                "Everything in Silver, plus private ward admission, enhanced diagnostics, extended eye care and higher surgical limits.",
              ],
            },
            {
              term: "Diamond — from $120 a month",
              description: [
                "Everything in Gold, plus premium hospital access, maximum coverage limits and unlimited scans.",
              ],
            },
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Every plan includes telemedicine with licensed doctors, cover that travels with you across ",
            COUNTRIES_SERVED_DISPLAY,
            " African countries, and a 24/7 contact centre. ",
            { text: "Compare the plans side by side", href: "/plans" },
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
        question: "Do I need health insurance to visit Nigeria?",
        answer:
          "It is strongly recommended. Health cover from home usually doesn't pay for treatment in Nigeria, and private hospitals often expect payment or a deposit before treatment.",
      },
      {
        question: "Does the NHS cover me in Nigeria?",
        answer:
          "Generally, no. The NHS doesn't usually pay for treatment outside the UK, so visitors from the UK should arrange their own health cover for the trip.",
      },
      {
        question: "How much does Omanga Holiday Insurance cost?",
        answer:
          "Plans start from $50 a month for Silver, $85 for Gold and $120 for Diamond. There is no commitment and you can cancel anytime.",
      },
      {
        question: "Who provides Omanga Holiday Insurance?",
        answer:
          "Cover is provided by Phillips HMO, which is regulated by the National Insurance Commission (NAICOM), and delivered through established Nigerian health providers with real hospital networks.",
      },
    ],
  },
  cta: {
    label: "View Omanga insurance plans",
    href: "/plans",
    prompt: [
      "Short-term health cover for the length of your trip, active in about five minutes. Cancel anytime.",
    ],
  },
};
