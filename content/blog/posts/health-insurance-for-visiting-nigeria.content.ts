import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { BlogPost } from "@/types/blog.types";
import type { ImageAsset } from "@/types/content.types";

/**
 * Article: do you need health insurance when visiting Nigeria?
 *
 * Primary keyword: "health insurance for visiting Nigeria".
 * Secondary: "does the NHS cover me in Nigeria", "travel health insurance
 * Nigeria", "short-term health insurance Nigeria". Intent: decide whether cover
 * is needed and what kind.
 *
 * [REVISED, 2026-10-09] Rewritten for a more natural voice and checked facts.
 * Sources:
 *   - GOV.UK "Living in Nigeria": no UK–Nigeria reciprocal healthcare agreement;
 *     visitors should arrange cover incl. air ambulance and full medical.
 *   - GOV.UK Nigeria travel advice, health: pay for treatment at public
 *     hospitals, private is more expensive, no national ambulance service, 112.
 *   - medicare.gov "Travel outside the U.S.": Medicare usually doesn't pay.
 *   - Canadian provincial plans: limited, varying out-of-country cover —
 *     phrased generally because rules differ by province and have changed.
 * Plan facts restate `insurance-plans.content.ts`, `insurance-care.content.ts`,
 * `insurance-proof.content.ts` and the legal provider names.
 */

/**
 * Cover from Unsplash (free licence), cropped to 4:3 around faces by the CDN
 * so the card and cover crops never cut through a head.
 */
const healthInsuranceImage: ImageAsset = {
  src: "https://images.unsplash.com/photo-1666887360680-9dc27a1d2753?w=2000&h=1500&fit=crop&crop=faces",
  alt: "A nurse in blue scrubs checking an older man's blood pressure.",
  width: 2000,
  height: 1500,
};

const FCDO_HEALTH_URL = "https://www.gov.uk/foreign-travel-advice/nigeria/health";
const LIVING_IN_NIGERIA_URL = "https://www.gov.uk/living-in-nigeria";
const MEDICARE_ABROAD_URL = "https://www.medicare.gov/coverage/travel-outside-the-u.s.";

export const healthInsuranceVisitingNigeriaPost: BlogPost = {
  slug: "health-insurance-for-visiting-nigeria",
  meta: {
    title: "Health Insurance for Visiting Nigeria: Do You Need It? | Omanga",
    description:
      "The NHS, Medicare and most provincial plans won't pay for treatment in Nigeria. What that means for your trip, how hospital care works there, and what to look for in cover.",
    path: "/blog/health-insurance-for-visiting-nigeria",
    ogImage: healthInsuranceImage,
  },
  category: "Insurance",
  title: "Do you need health insurance when visiting Nigeria?",
  summary:
    "Your cover at home almost certainly stops at the airport. Here's what happens if you need a doctor in Nigeria, and what good travel health cover should include.",
  publishedDate: "2026-10-09",
  readingMinutes: 6,
  image: healthInsuranceImage,
  imageCredit: {
    name: "Nappy",
    url: "https://unsplash.com/photos/a-doctor-checking-a-patients-blood-pressure-dcBO4nt4MRE",
  },
  intro: [
    {
      kind: "paragraph",
      content: [
        "Yes, and for most visitors it's not a close call. The health cover you rely on at home, whether that's the NHS, Medicare or a Canadian provincial plan, will pay for little or nothing if you need a doctor in Lagos or Abuja. In Nigeria, you pay for hospital treatment as you go.",
      ],
    },
    {
      kind: "paragraph",
      content: [
        "Most trips pass without a single clinic visit. But the illnesses and accidents that do happen to travellers, like a fever that won't settle, a bad stomach bug or a road accident, are exactly the moments you don't want to be negotiating a bill. Health insurance for visiting Nigeria is what turns that into a phone call.",
      ],
    },
  ],
  sections: [
    {
      id: "home-cover",
      heading: "Your cover at home stops at the border",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "If you're from the UK, there's no reciprocal healthcare agreement between the UK and Nigeria, so the NHS won't cover treatment there, and the Global Health Insurance Card only applies in Europe. The UK government's advice is to arrange comprehensive cover before you travel, including full medical cover and air ambulance (",
            { text: "GOV.UK", href: LIVING_IN_NIGERIA_URL, isExternal: true },
            ").",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "If you're from the US, Medicare generally doesn't pay for care outside the country (",
            { text: "Medicare.gov", href: MEDICARE_ABROAD_URL, isExternal: true },
            "), and many private plans offer limited cover abroad. If you're from Canada, provincial plans cover only a fraction of emergency costs outside the country, if anything, and the rules vary by province. Whichever applies to you, read your own policy rather than assuming.",
          ],
        },
      ],
    },
    {
      id: "getting-care",
      heading: "What happens if you need a hospital in Nigeria",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "According to the UK government's travel advice, you have to pay for treatment at public hospitals in Nigeria, and private hospitals cost more (",
            { text: "GOV.UK health advice", href: FCDO_HEALTH_URL, isExternal: true },
            "). It's common for hospitals to ask for payment or a deposit before treatment starts. The same advice notes there's no national ambulance service; the emergency number is 112.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "This is where the type of cover matters as much as the amount. A policy that reimburses you after you get home still leaves you paying upfront, in a hurry, possibly in a currency you haven't budgeted for, and then filing a claim from abroad. Cover that works through a local provider means the hospital deals with your insurer, not your wallet.",
          ],
        },
      ],
    },
    {
      id: "what-to-look-for",
      heading: "What to look for in travel health cover for Nigeria",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Start with which hospitals you can actually use. A generous limit means little if the nearest facility on the network is an hour away. Then look at hospital admission, including how many days per trip are covered, and at diagnostics such as tests and scans, which are often where limits run out first.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Check how emergencies are handled: is there a 24/7 line, and is emergency evacuation included? It's also worth asking whether you're covered to be flown home if needed, which the UK government specifically recommends. And look at the length of cover. If you're visiting for three weeks, you shouldn't have to buy a year.",
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
            "Omanga Holiday Insurance is short-term health cover for the length of your trip. It's provided by Phillips HMO, which is regulated by Nigeria's National Insurance Commission (NAICOM), and delivered through established Nigerian health providers with real hospital networks. So if you need care, you reach it through a local relationship rather than a reimbursement claim filed from abroad. Cover activates in about five minutes, there's no commitment, and you can cancel anytime.",
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Silver, from $50 a month",
              description: [
                "Essential cover for a straightforward trip: 24/7 emergency assistance, 15 days' admission per trip, basic diagnostics, emergency evacuation and essential prescription drugs.",
              ],
            },
            {
              term: "Gold, from $85 a month",
              description: [
                "Everything in Silver, plus private ward admission, enhanced diagnostics, extended eye care and higher surgical limits.",
              ],
            },
            {
              term: "Diamond, from $120 a month",
              description: [
                "Everything in Gold, plus premium hospital access, maximum coverage limits and unlimited scans.",
              ],
            },
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Hospital categories set which facilities you can walk into: Silver and Gold open Category A and B hospitals, and Diamond adds Category C. Every plan includes telemedicine with licensed doctors, a 24/7 contact centre, and cover that travels with you across ",
            COUNTRIES_SERVED_DISPLAY,
            " African countries. ",
            { text: "Compare the plans side by side", href: "/plans" },
            ", and ask the team about anything your trip needs that you don't see listed, such as cover for a flight home.",
          ],
        },
      ],
    },
    {
      id: "before-you-fly",
      heading: "A few health checks before you fly",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Insurance is one part of it. Nigeria requires proof of yellow fever vaccination on arrival, and malaria is a risk all year, so book a travel clinic appointment well before your trip. Bring enough of any regular medication to cover delays, and save your insurer's emergency number in your phone before you need it.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Your money is the other half of a smooth trip. Our guide on ",
            {
              text: "how to pay for things in Nigeria as a visitor",
              href: "/blog/how-to-pay-in-nigeria-as-a-visitor",
            },
            " covers cards, cash and exchange rates.",
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
          "Yes, it is strongly recommended. Health cover from the UK, US and Canada usually pays little or nothing for treatment in Nigeria, you have to pay for hospital treatment there, and hospitals commonly ask for payment or a deposit before treatment.",
      },
      {
        question: "Does the NHS cover me in Nigeria?",
        answer:
          "No. The UK has no reciprocal healthcare agreement with Nigeria, so the NHS does not cover treatment there and the GHIC does not apply. The UK government advises visitors to arrange comprehensive travel cover before they go.",
      },
      {
        question: "Does Medicare cover me in Nigeria?",
        answer:
          "Generally, no. Medicare usually doesn't pay for health care you get outside the United States, so US visitors should arrange separate travel health cover.",
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
