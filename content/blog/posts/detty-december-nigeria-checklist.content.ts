import type { BlogPost } from "@/types/blog.types";
import type { ImageAsset } from "@/types/content.types";

const dettyDecemberImage: ImageAsset = {
  src: "https://images.unsplash.com/photo-1762237807370-41a599e6ab86?w=2000&h=1500&fit=crop&crop=entropy",
  alt: "A crowd at a night party in Abuja with hands raised as confetti falls under bright stage lights.",
  width: 2000,
  height: 1500,
};

const shareImage: ImageAsset = {
  src: "/blog/og/detty-december-nigeria-checklist.jpg",
  alt: dettyDecemberImage.alt,
  width: 1200,
  height: 630,
};

const FCDO_SAFETY_URL =
  "https://www.gov.uk/foreign-travel-advice/nigeria/safety-and-security";
const FCDO_HEALTH_URL =
  "https://www.gov.uk/foreign-travel-advice/nigeria/health";
const FCDO_ENTRY_URL =
  "https://www.gov.uk/foreign-travel-advice/nigeria/entry-requirements";

export const dettyDecemberChecklistPost: BlogPost = {
  slug: "detty-december-nigeria-checklist",
  meta: {
    title: "Detty December 2026: Money and Health Checklist | Omanga",
    description:
      "Flying to Lagos for Detty December 2026? How to pay when sellers want transfers, avoid bad exchange rates, keep cash safe and sort health cover.",
    path: "/blog/detty-december-nigeria-checklist",
    ogImage: shareImage,
  },
  category: "Travel",
  title: "Detty December 2026: your money and health checklist for Nigeria",
  summary:
    "Flights booked, outfits planned. Now the unglamorous part: how to pay for everything, keep your money safe, and make sure a bad week doesn't become an expensive one.",
  publishedDate: "2026-10-09",
  updatedDate: "2026-10-28",
  readingMinutes: 6,
  image: dettyDecemberImage,
  imageCredit: {
    name: "Ani Augustine",
    url: "https://unsplash.com/photos/confetti-falling-on-a-crowd-at-a-concert-swnQTaOz0-o",
  },
  intro: [
    {
      kind: "paragraph",
      content: [
        "Detty December runs from roughly late November into early January, and the 2026 season is weeks away. Lagos, and more and more Abuja and other cities, fills with concerts, weddings, beach days and long family lunches. Much of the crowd is Nigerians living abroad, mostly in the UK, the US and Canada, flying home for the season. If that's you, you know the nickname: IJGB, \"I just got back\".",
      ],
    },
    {
      kind: "paragraph",
      content: [
        "It's also the most expensive time of year in Lagos. Flights climb months ahead, and transport, food and events cost more as demand rises. So the boring preparation, your money and your health cover, matters more in December than at any other time. Here's what to get done before you fly.",
      ],
    },
  ],
  sections: [
    {
      id: "money",
      heading: "Sort your money before you land",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "The easiest mistake is converting money in a hurry: at the airport, at a hotel desk, or with a card that applies its own rate to every payment. Each one quietly costs you a few per cent. Over a month of December spending, that's real money. Move most of your budget before you travel, at a rate you can see before you confirm.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "The Omanga wallet is built for this. You add US dollars, pounds or Canadian dollars, convert to naira when you need it, and see the rate before you confirm. Then you pay sellers by sending naira to their bank account, which is how most of Lagos wants to be paid. You don't need a Nigerian bank account. ",
            { text: "Explore the wallet", href: "/payments" },
            ".",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Then plan for how Lagos takes payment. Most sellers ask for a bank transfer first. Cash still matters for small spending. Your home card works at hotels, malls and bigger restaurants, and since December 2025 Nigeria's central bank has told banks to make their ATMs and card machines work with foreign cards. Card machines still drop out when the network is busy, and December is busy. Have at least 2 ways to pay at all times. Our guide to ",
            {
              text: "using your card in Nigeria",
              href: "/blog/can-i-use-my-card-in-nigeria",
            },
            " explains each option, and ",
            {
              text: "how far $100 goes in Nigeria",
              href: "/blog/how-far-does-100-dollars-go-in-nigeria",
            },
            " has real Lagos prices to budget with.",
          ],
        },
      ],
    },
    {
      id: "safety",
      heading: "Keep your money safe on the move",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "December brings crowds, so take the UK Foreign Office's advice seriously (",
            { text: "GOV.UK travel advice", href: FCDO_SAFETY_URL, isExternal: true },
            "). It warns that visitors who seem wealthy have been targeted, that card fraud is common, and that crime around banks and ATMs has risen. Don't carry large amounts of cash. Keep your card in sight when you pay. Use ATMs inside banks, malls or hotels, during the day. Leave the expensive watch at home.",
          ],
        },
      ],
    },
    {
      id: "health",
      heading: "Sort your health cover and vaccinations",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Late nights, street food, heat and heavy traffic are all part of the season. So, now and then, is a trip to a clinic. The NHS, Medicare and Canadian provincial plans won't pay for treatment in Nigeria, and hospitals there often expect payment before they treat you. ",
            "Omanga's short-term health cover comes from Phillips HMO, which has its own hospital network in Nigeria. It applies in Nigeria only, and you can activate a plan in about five minutes. ",
            { text: "Explore health cover", href: "/insurance" },
            ".",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Nigeria requires proof of yellow fever vaccination on arrival, and malaria is a risk all year. The UK government suggests checking vaccines at least 8 weeks before you travel, so for December that means booking a travel clinic now. Health advice can change quickly, so read the latest before you fly (",
            { text: "GOV.UK health advice", href: FCDO_HEALTH_URL, isExternal: true },
            ").",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "If you're travelling on a foreign passport, apply for your visa online before you go. GOV.UK says visa on arrival is no longer available, and that landing and departure cards are now filled in online too (",
            { text: "GOV.UK entry requirements", href: FCDO_ENTRY_URL, isExternal: true },
            "). First trip? Our ",
            {
              text: "first-time visitor's guide to Nigeria",
              href: "/blog/visiting-nigeria-for-the-first-time",
            },
            " covers the basics. And our guide to ",
            {
              text: "health insurance for visiting Nigeria",
              href: "/blog/health-insurance-for-visiting-nigeria",
            },
            " explains how cover works.",
          ],
        },
      ],
    },
    {
      id: "checklist",
      heading: "Your Detty December checklist",
      blocks: [
        {
          kind: "list",
          style: "number",
          items: [
            ["Apply for your visa online, if you need one, and fill in your landing card."],
            ["Get your yellow fever certificate and malaria advice from a travel clinic."],
            ["Arrange health cover for the full length of your trip."],
            ["Tell your bank you're travelling; pack a backup card separately."],
            ["Fund your wallet before you fly, so you can pay by transfer from day one."],
            ["Plan a small amount of naira for your first day."],
            ["Budget for December prices: transport, food and events all cost more."],
            ["Save your bank, wallet and insurer's support numbers on your phone."],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Get these done in October or early November and you'll spend December doing what you came home for.",
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
          "Detty December is Nigeria's festive season, roughly late November to early January, centred on Lagos. It is known for concerts, parties, weddings and family gatherings, and for the many Nigerians living abroad who travel home for it.",
      },
      {
        question: "What does IJGB mean?",
        answer:
          "IJGB stands for \"I just got back\", the nickname for Nigerians from the diaspora who have returned home, usually for the December season.",
      },
      {
        question: "Do I need a visa to visit Nigeria from the UK?",
        answer:
          "If you are travelling on a British passport, yes. UK government travel advice says visitors must get a visa before travelling, applied for through Nigeria's online portal, and that visa on arrival is no longer available. If you hold a Nigerian passport, you can travel on that instead.",
      },
      {
        question: "How should I take money to Nigeria for December?",
        answer:
          "Use more than one way to pay. Most sellers in Lagos prefer a bank transfer, so set up a wallet you can send naira from before you fly. Keep your home card for hotels and malls, carry a backup card and only small amounts of naira. Avoid converting at airports and hotel desks.",
      },
      {
        question: "Do I need travel health insurance for Detty December?",
        answer:
          "Yes, it is strongly recommended. Health cover from the UK, US and Canada pays little or nothing for treatment in Nigeria. Omanga offers short-term health cover in Nigeria from Phillips HMO, from $50 a month.",
      },
      {
        question: "Can I use my card in Lagos during Detty December?",
        answer:
          "Yes, at hotels, malls, supermarkets and bigger restaurants. Many smaller sellers, drivers and event vendors prefer a bank transfer, and card machines can fail when networks are busy. Carry a backup card and a way to pay by transfer.",
      },
    ],
  },
  cta: {
    label: "Choose what to set up",
    href: "/",
    prompt: ["A wallet for your spending and health cover for your time in Nigeria."],
  },
};
