import type { BlogPost } from "@/types/blog.types";
import type { ImageAsset } from "@/types/content.types";

/**
 * Article: Detty December checklist for visiting Nigeria.
 *
 * Primary keyword: "Detty December". Secondary: "Detty December Lagos",
 * "travelling to Nigeria in December", "Detty December checklist".
 * Intent: diaspora visitor planning a December trip.
 *
 * Seasonal. Searches peak in November and December, so this needs to be live
 * and indexed by early November. Refresh the year in the title and dates each
 * autumn rather than publishing a new URL — the slug carries no year so the
 * page keeps the links and ranking it earns.
 *
 * [REVISED, 2026-10-09] Rewritten for a more natural voice and checked facts.
 * Sources: Wikipedia "Detty December (Nigeria)" and African Business (season,
 * IJGB, rising prices and airfares); GOV.UK Nigeria travel advice (ATMs, card
 * fraud, cash); Nigerian NCDC and travel-health sources (yellow fever
 * certificate, year-round malaria). No event names, dates or prices are stated:
 * they change every year and are not Omanga's to confirm.
 *
 * [SEO, 2026-10-11] FAQ adds the visa question ("Can a UK citizen come to
 * Nigeria without a visa?" in People Also Ask, via AnswerThePublic, "travel to
 * nigeria", UK). Answer restates GOV.UK entry requirements: visitors need a
 * visa, obtained before travel.
 * [CHANGED, 2026-10-14] UX copy pass (design.md § Home UX copy pass): health
 *   cover names Phillips HMO and Nigeria only (was "Nigerian health providers"
 *   with a no-upfront-payment claim); shorter sentences; plain link text.
 */

/**
 * Cover from Unsplash (free licence): a night party in Abuja. Cropped to 4:3 by
 * the CDN on `crop=entropy` (the busiest region — hands, confetti, lights), since
 * the crowd faces away and a face crop has nothing to anchor on.
 */
const dettyDecemberImage: ImageAsset = {
  src: "https://images.unsplash.com/photo-1762237807370-41a599e6ab86?w=2000&h=1500&fit=crop&crop=entropy",
  alt: "A crowd at a night party in Abuja with hands raised as confetti falls under bright stage lights.",
  width: 2000,
  height: 1500,
};

/**
 * [ADDED, 2026-10-18] Audit quick win: the share image is the same photo,
 * cropped to 1200x630 and self-hosted (public/blog/og/), so link previews
 * don't depend on Unsplash or show a 4:3 crop.
 */
const shareImage: ImageAsset = {
  src: "/blog/og/detty-december-nigeria-checklist.jpg",
  alt: dettyDecemberImage.alt,
  width: 1200,
  height: 630,
};

const FCDO_SAFETY_URL =
  "https://www.gov.uk/foreign-travel-advice/nigeria/safety-and-security";
const FCDO_ENTRY_URL =
  "https://www.gov.uk/foreign-travel-advice/nigeria/entry-requirements";

export const dettyDecemberChecklistPost: BlogPost = {
  slug: "detty-december-nigeria-checklist",
  meta: {
    // [CHANGED, 2026-10-18] Copy audit: title 66 → 56 and description
    // 162 → 146 characters, so neither is cut off in search results.
    title: "Detty December 2026: Money and Health Checklist | Omanga",
    description:
      "Flying home to Lagos for Detty December? How to handle money, avoid bad exchange rates, keep cash safe and sort your health cover before you land.",
    path: "/blog/detty-december-nigeria-checklist",
    ogImage: shareImage,
  },
  category: "Travel",
  title: "Detty December 2026: your money and health checklist for Nigeria",
  summary:
    "Flights booked, outfits planned. Now the unglamorous part: how to pay for everything, keep your money safe, and make sure a bad week doesn't become an expensive one.",
  publishedDate: "2026-10-09",
  updatedDate: "2026-10-14",
  readingMinutes: 5,
  image: dettyDecemberImage,
  imageCredit: {
    name: "Ani Augustine",
    url: "https://unsplash.com/photos/confetti-falling-on-a-crowd-at-a-concert-swnQTaOz0-o",
  },
  intro: [
    {
      kind: "paragraph",
      content: [
        "Detty December runs from roughly late November into early January. Lagos, and more and more Abuja and other cities, fills with concerts, weddings, beach days and long family lunches. Much of the crowd is Nigerians living abroad, mostly in the UK, the US and Canada, flying home for the season. If that's you, you know the nickname: IJGB, \"I just got back\".",
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
            "The easiest mistake is converting money in a hurry: at the airport, at a hotel desk, or with a card that applies its own rate to every payment. Each one quietly costs you a few per cent. Over a month of December spending, that's real money. Move most of your budget before you travel, at a rate you can see and compare with the mid-market rate.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "The Omanga wallet is built for this. You fund it from USD, GBP or CAD at the mid-market rate and see the rate before you confirm. Once you're there, you spend from your balance online or in person. ",
            { text: "Explore the wallet", href: "/payments" },
            ".",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Then plan for how Lagos takes payment. Cash still matters for small spending. Many vendors ask you to pay by bank transfer. Your home card works in some places and not others. Have at least 2 ways to pay at all times. Our guide to ",
            {
              text: "how far $100 really goes in Nigeria",
              href: "/blog/how-far-does-100-dollars-go-in-nigeria",
            },
            " goes through each option, with real Lagos prices.",
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
            // [CHANGED, 2026-10-14] UX copy pass: was "works through Nigerian health
            // providers, so care doesn't depend on paying upfront" (unconfirmed).
            "Omanga's short-term health cover comes from Phillips HMO, which has its own hospital network in Nigeria. It applies in Nigeria only, and you can activate a plan in about five minutes. ",
            { text: "Explore health cover", href: "/insurance" },
            ".",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Nigeria requires proof of yellow fever vaccination on arrival, and malaria is a risk all year. Book a travel clinic appointment several weeks before you fly, not the week before. Check current entry requirements, including visas, for your passport (",
            { text: "GOV.UK entry requirements", href: FCDO_ENTRY_URL, isExternal: true },
            "). Our guide to ",
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
            ["Check entry requirements and visas for your passport."],
            ["Get your yellow fever certificate and malaria advice from a travel clinic."],
            ["Arrange health cover for the full length of your trip."],
            ["Tell your bank you're travelling; pack a backup card separately."],
            ["Fund your wallet at a rate you can see before you fly."],
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
          "If you are travelling on a British passport, yes. UK government travel advice says visitors must have a visa to enter Nigeria and should get it before travelling. If you hold a Nigerian passport, you can travel on that instead.",
      },
      {
        question: "How should I take money to Nigeria for December?",
        answer:
          "Use more than one way to pay. Move most of your budget before you fly, at a rate you can compare with the mid-market rate. Keep your home card as a backup and carry only small amounts of naira. Avoid converting at airports and hotel desks.",
      },
      {
        question: "Do I need travel health insurance for Detty December?",
        answer:
          "Yes, it is strongly recommended. Health cover from the UK, US and Canada pays little or nothing for treatment in Nigeria. Omanga offers short-term health cover in Nigeria from Phillips HMO, from $50 a month.",
      },
    ],
  },
  cta: {
    // [CHANGED, 2026-10-14] UX copy pass: says what happens on /get-started.
    label: "Choose what to set up",
    href: "/get-started",
    // [CHANGED, 2026-10-14] UX copy pass: "in one Omanga account" not confirmed.
    prompt: ["A wallet for your spending and health cover for your time in Nigeria."],
  },
};
