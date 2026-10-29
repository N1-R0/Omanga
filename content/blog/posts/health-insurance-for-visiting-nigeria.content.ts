import type { BlogPost } from "@/types/blog.types";
import type { ImageAsset } from "@/types/content.types";

const healthInsuranceImage: ImageAsset = {
  src: "https://images.unsplash.com/photo-1666887360680-9dc27a1d2753?w=2000&h=1500&fit=crop&crop=faces",
  alt: "A nurse in blue scrubs checking an older man's blood pressure.",
  width: 2000,
  height: 1500,
};

const shareImage: ImageAsset = {
  src: "/blog/og/health-insurance-for-visiting-nigeria.jpg",
  alt: healthInsuranceImage.alt,
  width: 1200,
  height: 630,
};

const FCDO_HEALTH_URL = "https://www.gov.uk/foreign-travel-advice/nigeria/health";
const LIVING_IN_NIGERIA_URL = "https://www.gov.uk/living-in-nigeria";
const MEDICARE_ABROAD_URL = "https://www.medicare.gov/coverage/travel-outside-the-u.s.";

export const healthInsuranceVisitingNigeriaPost: BlogPost = {
  slug: "health-insurance-for-visiting-nigeria",
  meta: {
    title: "Do You Need Travel Insurance for Nigeria? | Omanga",
    description:
      "Do you need travel insurance for Nigeria? The NHS, Medicare and most provincial plans won't pay for treatment there. What your health cover should include.",
    path: "/blog/health-insurance-for-visiting-nigeria",
    ogImage: shareImage,
  },
  category: "Insurance",
  title: "Do you need travel insurance for Nigeria?",
  summary:
    "Your cover at home almost certainly stops at the airport. What happens if you need a doctor in Nigeria, and what good health cover for your trip should include.",
  publishedDate: "2026-10-09",
  updatedDate: "2026-10-28",
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
        "Most trips pass without a single clinic visit. But a fever that won't settle, a bad stomach bug or a road accident can happen to anyone. Those are the moments you don't want to be negotiating a bill. Travel insurance that covers your health in Nigeria is how you avoid that.",
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
            "Omanga's health cover is short-term cover for your time in Nigeria. It comes from Phillips HMO, a Nigerian health maintenance organisation (HMO) with its own hospital network. The cover applies in Nigeria only. You can activate a plan in about five minutes, and renew or extend it from your account.",
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
            "Insurance is one part of it. Nigeria requires proof of yellow fever vaccination on arrival; babies aged 8 months or younger and adults aged 61 or over are exempt. Malaria is a risk all year. The UK government suggests checking which vaccines you need at least 8 weeks before you travel, so book a travel clinic early. Bring enough of any regular medicine to cover delays. Save your insurer's emergency number in your phone before you need it.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Health advice for Nigeria can change at short notice. Read the latest just before you fly (",
            { text: "GOV.UK health advice", href: FCDO_HEALTH_URL, isExternal: true },
            ").",
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
            " covers real Lagos prices, and ",
            { text: "can I use my card in Nigeria?", href: "/blog/can-i-use-my-card-in-nigeria" },
            " explains how to pay when most sellers want a bank transfer. First trip? Start with our ",
            {
              text: "first-time visitor's guide to Nigeria",
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
          "Silver costs $50 a month, Gold $85 and Diamond $120. There is no commitment and you can cancel any time.",
      },
      {
        question: "Who provides Omanga Holiday Insurance?",
        answer:
          "Phillips HMO, a Nigerian health maintenance organisation (HMO) with its own hospital network, provides the cover. The cover applies in Nigeria only.",
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
