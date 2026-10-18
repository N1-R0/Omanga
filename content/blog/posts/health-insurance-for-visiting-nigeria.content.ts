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
 * [SEO, 2026-10-11] FAQ adds "Is it safe to visit Nigeria as a tourist?", a
 *   People Also Ask question from AnswerThePublic ("travel to nigeria", UK).
 *   Answer points to live FCDO / State Department advice instead of judging
 *   safety, because the advice changes by state and over time.
 * Plan facts restate `insurance-plans.content.ts`, `insurance-care.content.ts`,
 * `insurance-proof.content.ts` and the legal provider names.
 * [CHANGED, 2026-10-14] UX copy pass (design.md § Home UX copy pass): one named
 *   provider (Phillips HMO), cover applies in Nigeria only, activation is not
 *   cover start, and per-plan hospital categories are left to /plans.
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
      "The NHS, Medicare and most provincial plans won't pay for treatment in Nigeria. How hospital care works there, and what to look for in health cover.",
    path: "/blog/health-insurance-for-visiting-nigeria",
    ogImage: healthInsuranceImage,
  },
  category: "Insurance",
  title: "Do you need health insurance when visiting Nigeria?",
  summary:
    "Your cover at home almost certainly stops at the airport. What happens if you need a doctor in Nigeria, and what good health cover for your trip should include.",
  publishedDate: "2026-10-09",
  updatedDate: "2026-10-14",
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
        "Yes. For most visitors it isn't a close call. The NHS, Medicare and Canadian provincial plans pay little or nothing if you need a doctor in Lagos or Abuja. In Nigeria, you pay for hospital treatment as you go.",
      ],
    },
    {
      kind: "paragraph",
      content: [
        "Most trips pass without a single clinic visit. But a fever that won't settle, a bad stomach bug or a road accident can happen to anyone. Those are the moments you don't want to be negotiating a bill. Health insurance for visiting Nigeria is how you avoid that.",
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
            "From the UK: there's no reciprocal healthcare agreement with Nigeria, so the NHS won't cover treatment there. The Global Health Insurance Card (GHIC) doesn't apply either. The UK government advises you to arrange full medical cover before you travel, including air ambulance (",
            { text: "GOV.UK", href: LIVING_IN_NIGERIA_URL, isExternal: true },
            ").",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "From the US: Medicare generally doesn't pay for care outside the country (",
            { text: "Medicare.gov", href: MEDICARE_ABROAD_URL, isExternal: true },
            "), and many private plans offer limited cover abroad. From Canada: provincial plans pay a fraction of emergency costs abroad, if anything, and the rules vary by province. Wherever you're from, read your own policy rather than assume.",
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
            "The UK government's travel advice says you have to pay for treatment at public hospitals in Nigeria, and private hospitals cost more (",
            { text: "GOV.UK health advice", href: FCDO_HEALTH_URL, isExternal: true },
            "). Hospitals often ask for payment or a deposit before treatment starts. There's no national ambulance service. The emergency number is 112.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "So the type of cover matters as much as the amount. A policy that pays you back after you get home still leaves you paying first, in a hurry, in naira. Then you file a claim from abroad. Before you buy, ask any insurer how payment works at the hospital door.",
          ],
        },
      ],
    },
    {
      id: "what-to-look-for",
      heading: "What to look for in travel health cover for Nigeria",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          items: [
            [
              "Hospitals you can use. A high limit means little if the nearest hospital in the network is an hour away.",
            ],
            [
              "Hospital admission: how many days per trip are covered.",
            ],
            [
              "Diagnostics, such as tests and scans. This is often where limits run out first.",
            ],
            [
              "Emergencies: a 24/7 line, and whether emergency evacuation is included.",
            ],
            [
              "A flight home if you need one. The UK government specifically recommends it.",
            ],
            [
              "Length of cover. For a three-week visit, you shouldn't have to buy a year.",
            ],
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
            // [CHANGED, 2026-10-14] UX copy pass: one named provider, not "established
            // Nigerian health providers"; Nigeria-only; activation ≠ cover start.
            "Omanga's health cover is short-term cover for your time in Nigeria. It comes from Phillips HMO, which is regulated by Nigeria's National Insurance Commission (NAICOM) and has its own hospital network. The cover applies in Nigeria only. You can activate a plan in about five minutes, and renew or extend it from your account.",
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Silver, $50 a month",
              description: [
                "The essentials, for a short, straightforward trip: emergency assistance, 15 days in hospital per trip, basic diagnostics, emergency evacuation and essential prescription drugs.",
              ],
            },
            {
              term: "Gold, $85 a month",
              description: [
                "Everything in Silver, plus private ward admission, enhanced diagnostics, extended eye care and higher surgical limits.",
              ],
            },
            {
              term: "Diamond, $120 a month",
              description: [
                "Everything in Gold, plus the widest hospital access, the highest cover limits and unlimited CT scans.",
              ],
            },
          ],
        },
        {
          kind: "paragraph",
          content: [
            // [CHANGED, 2026-10-14] UX copy pass: removed "Silver and Gold open
            // Category A and B" (conflicts with insurance-plans.content.ts).
            "Every plan includes hospital admission, diagnostics, emergency assistance and evacuation, telemedicine, roaming across Nigeria and a contact centre. Each plan opens a different set of hospital categories. ",
            { text: "Compare health plans", href: "/plans" },
            " to see which hospitals each one covers. If your trip needs something you don't see listed, such as a flight home, ask us before you buy.",
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
            "Insurance is one part of it. Nigeria requires proof of yellow fever vaccination on arrival, and malaria is a risk all year. Book a travel clinic appointment well before your trip. Bring enough of any regular medicine to cover delays. Save your insurer's emergency number in your phone before you need it.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Money is the other half of a smooth trip. Our guide to ",
            {
              text: "how far $100 really goes in Nigeria",
              href: "/blog/how-far-does-100-dollars-go-in-nigeria",
            },
            " covers real Lagos prices, cash and exchange rates.",
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
          "Yes, it is strongly recommended. Health cover from the UK, US and Canada usually pays little or nothing for treatment in Nigeria. You pay for hospital treatment there, and hospitals often ask for payment or a deposit before they treat you.",
      },
      {
        question: "Does the NHS cover me in Nigeria?",
        answer:
          "No. The UK has no reciprocal healthcare agreement with Nigeria, so the NHS does not cover treatment there and the GHIC does not apply. The UK government advises visitors to arrange full travel cover before they go.",
      },
      {
        question: "Does Medicare cover me in Nigeria?",
        answer:
          "Generally, no. Medicare usually doesn't pay for health care outside the United States, so US visitors should arrange separate travel health cover.",
      },
      {
        question: "Is it safe to visit Nigeria as a tourist?",
        answer:
          "Many visitors travel to Nigeria without problems. But the UK Foreign Office and the US State Department advise against travel to parts of the country, and that advice changes. Check the current advice for every state you plan to visit before you book, and make sure your insurance covers you there.",
      },
      {
        question: "How much does Omanga Holiday Insurance cost?",
        answer:
          // [NOTE, 2026-10-14] "Cancel any time" is published but not owner-confirmed
          // (design.md copy to-do). Kept as it was, not repeated elsewhere.
          "Silver costs $50 a month, Gold $85 and Diamond $120. There is no commitment and you can cancel any time.",
      },
      {
        question: "Who provides Omanga Holiday Insurance?",
        answer:
          "Phillips HMO provides the cover. It is regulated by Nigeria's National Insurance Commission (NAICOM) and has its own hospital network. The cover applies in Nigeria only.",
      },
    ],
  },
  cta: {
    label: "Compare health plans",
    href: "/plans",
    prompt: [
      "Short-term health cover from Phillips HMO for your time in Nigeria. Activate a plan in about five minutes.",
    ],
  },
};
