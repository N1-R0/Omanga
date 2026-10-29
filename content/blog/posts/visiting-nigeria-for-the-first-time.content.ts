import type { BlogPost } from "@/types/blog.types";
import type { ImageAsset } from "@/types/content.types";

const lagosAerialImage: ImageAsset = {
  src: "https://images.unsplash.com/photo-1765475467677-579353b25ce0?w=2000&h=1500&fit=crop",
  alt: "Lagos from the air: a bridge crosses the lagoon, speedboats leave white wakes, and towers line the far shore.",
  width: 2000,
  height: 1500,
};

const shareImage: ImageAsset = {
  src: "/blog/og/visiting-nigeria-for-the-first-time.jpg",
  alt: lagosAerialImage.alt,
  width: 1200,
  height: 630,
};

const FCDO_ADVICE_URL = "https://www.gov.uk/foreign-travel-advice/nigeria";
const FCDO_ENTRY_URL =
  "https://www.gov.uk/foreign-travel-advice/nigeria/entry-requirements";
const FCDO_HEALTH_URL =
  "https://www.gov.uk/foreign-travel-advice/nigeria/health";
const FCDO_SAFETY_URL =
  "https://www.gov.uk/foreign-travel-advice/nigeria/safety-and-security";
const US_ADVISORY_URL =
  "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/nigeria-travel-advisory.html";
const NIS_URL = "https://immigration.gov.ng/";

export const visitingNigeriaForTheFirstTimePost: BlogPost = {
  slug: "visiting-nigeria-for-the-first-time",
  meta: {
    title: "Visiting Nigeria for the First Time: What to Know | Omanga",
    description:
      "First trip to Nigeria from the UK, US or Canada? Visas, yellow fever, safety advice, how to pay when sellers want transfers, and a checklist.",
    path: "/blog/visiting-nigeria-for-the-first-time",
    ogImage: shareImage,
  },
  category: "Travel",
  title: "Visiting Nigeria for the first time: what to know before you go",
  summary:
    "Visas, vaccinations, safety advice, money and getting around. The practical list our Lagos team would give a friend landing for the first time.",
  publishedDate: "2026-10-28",
  readingMinutes: 8,
  image: lagosAerialImage,
  imageCredit: {
    name: "Malik Buraimoh",
    url: "https://unsplash.com/photos/EMjpo0YjHPw",
  },
  intro: [
    {
      kind: "paragraph",
      content: [
        "Your first trip to Nigeria takes more preparation than a city break in Europe, and repays it. You need a visa before you fly, a yellow fever certificate, health cover and a plan for paying in a country that runs on bank transfers. Get those four right and the rest is food, family, music and traffic.",
      ],
    },
    {
      kind: "note",
      title: "Before you book",
      content: [
        "Apply for your visa online, get your yellow fever vaccination, arrange health cover for Nigeria, read the current UK or US travel advice for every state you'll visit, and set up a way to pay by bank transfer.",
      ],
    },
  ],
  sections: [
    {
      id: "visa-and-entry",
      heading: "Do I need a visa to visit Nigeria?",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Yes, if you're travelling on a UK, US or Canadian passport. You apply online through the ",
            { text: "Nigeria Immigration Service", href: NIS_URL, isExternal: true },
            " before you travel. GOV.UK says visa on arrival is no longer available, so don't count on sorting it out at the airport (",
            { text: "GOV.UK entry requirements", href: FCDO_ENTRY_URL, isExternal: true },
            ").",
          ],
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            ["Your passport must be valid for at least 6 months after the day you arrive."],
            ["Landing and departure cards are filled in online before you travel. You may be asked for them at the airport."],
            ["Hold a Nigerian passport as well? You can enter on that instead."],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Apply a few weeks ahead, and longer before December, when demand peaks. Fees and processing times change, so check them on the official portal rather than a third-party site.",
          ],
        },
      ],
    },
    {
      id: "health",
      heading: "Vaccinations and health cover",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "You need a certificate showing you've had a yellow fever vaccination to enter Nigeria. Babies aged 8 months or younger and adults aged 61 or over are exempt. Malaria is a risk all year, and the UK government suggests checking which vaccines you need at least 8 weeks before you travel (",
            { text: "GOV.UK health advice", href: FCDO_HEALTH_URL, isExternal: true },
            "). Book a travel clinic early and ask about malaria tablets at the same appointment.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Then health cover. The NHS, Medicare and Canadian provincial plans pay little or nothing for treatment in Nigeria, and you pay for treatment even at public hospitals. Private hospitals cost more. Omanga's short-term health cover comes from Phillips HMO, which has its own hospital network in Nigeria. It applies in Nigeria only, starts from $50 a month, and you can activate a plan in about five minutes. ",
            { text: "Explore health cover", href: "/insurance" },
            ", or read ",
            {
              text: "whether you need travel insurance for Nigeria",
              href: "/blog/health-insurance-for-visiting-nigeria",
            },
            " first.",
          ],
        },
      ],
    },
    {
      id: "is-it-safe",
      heading: "Is it safe to travel to Nigeria?",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Many people visit Nigeria every year without problems, but safety depends heavily on where you go. Read the official advice for every state on your plan before you book, and again before you fly, because it changes. As of 28 October 2026, the UK Foreign Office advises against all or all but essential travel to a number of northern, central and south-eastern states, and to riverine areas in the south. Lagos is not on that list (",
            { text: "GOV.UK travel advice", href: FCDO_ADVICE_URL, isExternal: true },
            "). US travellers should read the ",
            { text: "State Department's Nigeria advisory", href: US_ADVISORY_URL, isExternal: true },
            ".",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Day to day, the advice is about not standing out (",
            { text: "GOV.UK safety advice", href: FCDO_SAFETY_URL, isExternal: true },
            "):",
          ],
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            ["Don't carry large amounts of cash, or wear expensive watches and jewellery."],
            ["Use ATMs inside banks, malls or hotels, during the day."],
            ["Keep your card in sight when you pay. Card fraud is common."],
            ["Arrange your airport pickup before you land, with someone you know or your hotel."],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Check your travel insurance against the official advice, too: many policies don't cover areas the government advises against.",
          ],
        },
      ],
    },
    {
      id: "money",
      heading: "How to pay for things in Nigeria",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "This catches most first-time visitors out. Nigerians pay mostly by instant bank transfer: the seller gives you an account number and waits for the alert on their phone. From our team in Lagos: a transfer is the first thing most sellers ask for, from a restaurant bill to a ride. Card machines are common but drop out when the network is busy, and cash is for small things.",
          ],
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            [
              "Cards work at hotels, malls, supermarkets and bigger restaurants. Since December 2025, Nigeria's central bank has told banks to make their ATMs and card machines accept foreign cards. More in our guide to ",
              { text: "using your card in Nigeria", href: "/blog/can-i-use-my-card-in-nigeria" },
              ".",
            ],
            ["Carry a small amount of naira for tips, market stalls and roadside food."],
            [
              "For everything else, you need a way to send a bank transfer. The Omanga wallet lets you add dollars, pounds or Canadian dollars, convert to naira, and send it to any Nigerian bank account. You don't need a Nigerian bank account. ",
              { text: "See how the wallet works", href: "/payments" },
              ".",
            ],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Avoid changing large amounts at the airport, and when a card machine offers to charge you in your home currency, choose naira. To plan a budget, see ",
            {
              text: "how far $100 goes in Nigeria",
              href: "/blog/how-far-does-100-dollars-go-in-nigeria",
            },
            ", with real Lagos prices.",
          ],
        },
      ],
    },
    {
      id: "getting-around",
      heading: "Getting around, phones and data",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "In Lagos, most visitors use ride-hailing apps. Traffic is the thing to plan around: a short distance can take an hour at rush hour, and crossing between the Mainland and the Island takes longer than the map suggests. Leave early for anything with a fixed time, especially flights.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "A local SIM is cheaper than roaming and makes ride apps and transfers easier. Bring your passport to register it. A 10GB monthly data bundle cost about ₦4,500 in October 2026. Keep your home SIM reachable too, or in a second phone, because your bank may send security codes to it.",
          ],
        },
      ],
    },
    {
      id: "uk-vs-us",
      heading: "Visiting Nigeria from the UK, the US or Canada",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "The steps are the same from all three: apply for the visa online, get the yellow fever certificate, arrange health cover and plan how to pay. The differences are small but worth knowing:",
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "From the UK",
              description: [
                "There's no reciprocal healthcare agreement with Nigeria, so the NHS and GHIC don't cover you. Read the Foreign Office advice for each state you'll visit.",
              ],
            },
            {
              term: "From the US",
              description: [
                "Medicare generally doesn't pay for care abroad. Read the State Department advisory, and consider enrolling in its traveller programme (STEP).",
              ],
            },
            {
              term: "From Canada",
              description: [
                "Provincial plans pay little, if anything, for care abroad, and the rules vary by province. Check your own plan.",
              ],
            },
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Wherever you start, the Omanga wallet takes US dollars, pounds and Canadian dollars. Check today's ",
            { text: "pounds to naira", href: "/rates/pounds-to-naira" },
            " or ",
            { text: "dollar to naira", href: "/rates/dollars-to-naira" },
            " rate as you plan.",
          ],
        },
      ],
    },
    {
      id: "checklist",
      heading: "Your first-trip checklist",
      blocks: [
        {
          kind: "list",
          style: "number",
          items: [
            ["Check your passport is valid for 6 months after you arrive."],
            ["Apply for your visa online and fill in your landing card."],
            ["Get your yellow fever certificate and malaria advice, at least 8 weeks ahead."],
            ["Read the UK or US travel advice for every state you'll visit."],
            ["Arrange health cover for the whole trip."],
            ["Set up a way to pay by bank transfer, and tell your bank you're travelling."],
            ["Pack a backup card in a different bag, and plan a little naira for day one."],
            ["Arrange your airport pickup before you land."],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Travelling in December? Prices and crowds change everything. Read our ",
            {
              text: "Detty December checklist",
              href: "/blog/detty-december-nigeria-checklist",
            },
            " too.",
          ],
        },
      ],
    },
  ],
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "Can I get a visa on arrival in Nigeria?",
        answer:
          "No. UK government travel advice says visa on arrival is no longer available. Apply online through the Nigeria Immigration Service portal before you travel.",
      },
      {
        question: "Do I need a yellow fever vaccine to visit Nigeria?",
        answer:
          "Yes. You need a certificate showing you have had a yellow fever vaccination. Infants aged 8 months or younger and adults aged 61 or over are exempt.",
      },
      {
        question: "Is Lagos safe for tourists?",
        answer:
          "Many visitors travel to Lagos without problems, and on 28 October 2026 it was not among the areas the UK Foreign Office advises against. Crime does happen: avoid carrying large amounts of cash, use ATMs inside banks or malls during the day and keep your card in sight. Check the current UK or US advice before you travel.",
      },
      {
        question: "What currency should I bring to Nigeria?",
        answer:
          "Nigeria uses the naira. Bring a card for larger places and a small amount of naira for day one, and set up a way to pay by bank transfer, which is how most sellers prefer to be paid. Avoid changing large amounts at the airport.",
      },
      {
        question: "Can foreigners pay by bank transfer in Nigeria?",
        answer:
          "Yes, with a wallet that can send naira to Nigerian bank accounts. With Omanga, you add US dollars, pounds or Canadian dollars, convert to naira and send it to the seller's account number, without a Nigerian bank account.",
      },
      {
        question: "Do I need health insurance to visit Nigeria?",
        answer:
          "It is strongly recommended. You pay for treatment in Nigeria, even at public hospitals, and UK, US and Canadian health cover pays little or nothing there. Omanga offers short-term health cover in Nigeria from Phillips HMO, from $50 a month.",
      },
    ],
  },
  cta: {
    label: "Choose what to set up",
    href: "/",
    prompt: ["A wallet for paying by transfer and health cover for your time in Nigeria."],
  },
};
