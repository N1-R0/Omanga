import type { BlogPost } from "@/types/blog.types";
import type { ImageAsset } from "@/types/content.types";

const cardAtStallImage: ImageAsset = {
  src: "https://images.unsplash.com/photo-1677058272033-6fc5a7c5aef1?w=2000&h=1500&fit=crop&crop=entropy",
  alt: "A shopper holds a bank card towards a seller's card terminal over a basket of oranges at a market stall.",
  width: 2000,
  height: 1500,
};

const shareImage: ImageAsset = {
  src: "/blog/og/can-i-use-my-card-in-nigeria.jpg",
  alt: cardAtStallImage.alt,
  width: 1200,
  height: 630,
};

const CBN_DIRECTIVE_URL = "https://allafrica.com/stories/202512220152.html";
const FCDO_SAFETY_URL =
  "https://www.gov.uk/foreign-travel-advice/nigeria/safety-and-security";

export const canIUseMyCardInNigeriaPost: BlogPost = {
  slug: "can-i-use-my-card-in-nigeria",
  meta: {
    title: "Can I Use My Card in Nigeria? A Visitor's Guide | Omanga",
    description:
      "Will your UK, US or Canadian card work in Nigeria? Where cards work, ATM tips, why sellers ask for a transfer, and how to pay without a Nigerian bank account.",
    path: "/blog/can-i-use-my-card-in-nigeria",
    ogImage: shareImage,
  },
  category: "Payments",
  title: "Can I use my card in Nigeria?",
  summary:
    "Usually, yes, at hotels, malls and bigger shops. But most of Lagos runs on bank transfers. Here's where your card works, where it doesn't, and how to pay the way sellers actually want.",
  publishedDate: "2026-10-28",
  readingMinutes: 6,
  image: cardAtStallImage,
  imageCredit: {
    name: "Yoco Photography",
    url: "https://unsplash.com/photos/a-person-holding-a-smart-phone-in-front-of-a-basket-of-oranges-OO6R9SBIbIc",
  },
  intro: [
    {
      kind: "paragraph",
      content: [
        "Yes, you can use a UK, US or Canadian Visa or Mastercard in Nigeria, mostly at hotels, malls, supermarkets and bigger restaurants in Lagos and Abuja. What surprises first-time visitors is how often they're asked for something else. At a market stall, a small restaurant or the end of a car ride, the usual question is \"can you send a transfer?\"",
      ],
    },
    {
      kind: "note",
      title: "The short answer",
      content: [
        "Bring your card and use it where it's accepted. Carry a little naira for small things. For everything in between, be ready to pay by bank transfer, because that's how most people in Nigeria pay.",
      ],
    },
  ],
  sections: [
    {
      id: "do-foreign-cards-work",
      heading: "Do foreign cards work in Nigeria?",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "They should, and they work better than they did a few years ago. In December 2025 the Central Bank of Nigeria (CBN) told banks and payment companies to set up their ATMs, card machines (called POS) and online payment pages to accept foreign cards (",
            { text: "allAfrica report", href: CBN_DIRECTIVE_URL, isExternal: true },
            "). The same directive says the machine must show you the exchange rate and any charges before you confirm a payment.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "In practice, acceptance still depends on the place. Here's what to expect:",
          ],
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            ["Hotels, malls, supermarkets, airlines and larger restaurants: cards usually work."],
            ["Smaller restaurants, bars and shops: they often have a POS machine, but the connection can drop. \"Network is down\" is a phrase you'll hear."],
            ["Market stalls, roadside food, drivers and small traders: expect cash or a bank transfer."],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "The CBN rules also add an extra security check, such as a code sent to your phone, once your card spending passes $200 in a day, $500 in a week or $1,000 in a month. If you're roaming on a foreign SIM, that code may arrive late or not at all, so keep your phone number with your bank up to date and know how to reach them from abroad.",
          ],
        },
      ],
    },
    {
      id: "debit-or-credit",
      heading: "Debit card or credit card?",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Both work in the same places, and both can carry a foreign transaction fee from your bank on every payment and withdrawal. Check your card's terms before you go, because that fee varies a lot between banks and card types. Whatever you use, pack 2 cards and keep them in different bags. If one is blocked or lost, you're not stuck.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "One habit saves money on either card: when a card machine asks whether to charge you in pounds, dollars or naira, choose naira. The conversion the machine offers is usually worse than your own bank's. Our guide to ",
            {
              text: "getting a good pounds to naira rate",
              href: "/blog/pounds-to-naira-best-rate",
            },
            " explains why.",
          ],
        },
      ],
    },
    {
      id: "atms",
      heading: "Using ATMs in Nigeria with a foreign card",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Most bank ATMs in the big cities take Visa and Mastercard. Expect a fee from the ATM, a fee from your own bank and a limit on how much you can take out at once, which is often lower than you're used to. ATMs can also run out of cash, especially at weekends and in December.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "The UK Foreign Office says crime around banks and ATMs has risen and that card fraud is common (",
            { text: "GOV.UK travel advice", href: FCDO_SAFETY_URL, isExternal: true },
            "). So:",
          ],
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            ["Use ATMs inside banks, malls or hotels, during the day."],
            ["Take out what you need for a few days, not your whole budget."],
            ["Keep your card in sight when you pay, and cover the keypad."],
          ],
        },
      ],
    },
    {
      id: "why-transfer",
      heading: "Why do Nigerian sellers ask for a transfer?",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Bank transfers in Nigeria are instant and cheap, so they're how most people pay for most things. The seller tells you their account number and bank, you send the money from your phone, and they wait for the alert on theirs. No machine, no signal problems at the till, no card fees for the seller.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "From our team in Lagos: a transfer is the first thing most sellers will ask for, from a plate of food to a tailor's fitting. Card machines are common but unreliable, and cash is for the small stuff. For a visitor, that's the awkward part. Paying by transfer normally needs a Nigerian bank account, and most visitors don't have one.",
          ],
        },
      ],
    },
    {
      id: "pay-by-transfer",
      heading: "Paying by transfer without a Nigerian bank account",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "This is what the Omanga wallet is for. You add money in US dollars, pounds or Canadian dollars, convert it to naira inside the app, and send naira to any Nigerian bank account using the seller's account number. You see the rate before you confirm each conversion, and you don't need a Nigerian bank account of your own.",
          ],
        },
        {
          kind: "list",
          style: "number",
          items: [
            ["Before you fly: open the wallet (it's free, with no minimums) and add some of your trip budget."],
            ["When you need naira: convert from your dollar, pound or Canadian dollar balance."],
            ["At the till: ask for the seller's account number and bank, send the transfer, and show them the confirmation."],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Naira you don't spend can be converted back to dollars. ",
            { text: "See how the wallet works", href: "/payments" },
            ", or check today's ",
            { text: "dollar to naira rate", href: "/rates/dollars-to-naira" },
            " first. If you want to know how we keep your money safe, read ",
            { text: "how Omanga protects your account", href: "/safety" },
            ".",
          ],
        },
      ],
    },
    {
      id: "what-to-carry",
      heading: "What to carry: a simple setup",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "The visitors who have the easiest time use more than one way to pay. This setup covers almost every situation:",
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "A wallet you can send transfers from",
              description: [
                "For restaurants, shops, drivers, tailors and anyone who asks for a transfer. This is most of your spending.",
              ],
            },
            {
              term: "Your main card",
              description: [
                "For hotels, malls, supermarkets and online bookings.",
              ],
            },
            {
              term: "A backup card, packed separately",
              description: ["In case the first one is blocked, lost or skimmed."],
            },
            {
              term: "A small amount of naira",
              description: [
                "For tips, market stalls, roadside food and danfo fares. Don't carry more than you'd be fine losing.",
              ],
            },
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Before you fly, tell your bank you're travelling to Nigeria and save its international support number in your phone. For real prices to plan around, see ",
            {
              text: "how far $100 goes in Nigeria",
              href: "/blog/how-far-does-100-dollars-go-in-nigeria",
            },
            ". Travelling for the festive season? Our ",
            {
              text: "Detty December checklist",
              href: "/blog/detty-december-nigeria-checklist",
            },
            " covers the rest.",
          ],
        },
      ],
    },
  ],
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "Can I use my UK debit card in Nigeria?",
        answer:
          "Usually, yes. UK Visa and Mastercard debit cards work at most hotels, malls, supermarkets and larger restaurants, and at bank ATMs in the big cities. Many smaller sellers prefer a bank transfer or cash. Your bank may charge a foreign transaction fee, so check its terms before you travel.",
      },
      {
        question: "Can I use my US credit card in Nigeria?",
        answer:
          "Yes, in the same places as a debit card: hotels, malls, supermarkets, airlines and bigger restaurants. Keep the card in sight when you pay, because card fraud is common, and carry a second card in case the first is blocked.",
      },
      {
        question: "Do Nigerian ATMs accept foreign cards?",
        answer:
          "Most bank ATMs in Lagos, Abuja and other big cities accept Visa and Mastercard. In December 2025 the Central Bank of Nigeria told banks to make sure their ATMs work with foreign cards. Expect withdrawal limits and fees from both the ATM and your own bank, and use ATMs inside banks, malls or hotels during the day.",
      },
      {
        question: "Should I pay in naira or in my own currency?",
        answer:
          "Pay in naira. When a card machine offers to charge you in pounds, dollars or Canadian dollars, the conversion it uses is usually worse than your own bank's.",
      },
      {
        question: "How do I pay by bank transfer in Nigeria without a Nigerian bank account?",
        answer:
          "Use a wallet that can send naira to Nigerian bank accounts. With Omanga, you add US dollars, pounds or Canadian dollars, convert to naira in the app and send it to the seller's account number. You do not need a Nigerian bank account.",
      },
      {
        question: "Is it better to bring cash or a card to Nigeria?",
        answer:
          "Bring both, plus a way to pay by transfer. Cards work in larger places, cash is for small purchases, and bank transfers are how most sellers prefer to be paid. Don't carry large amounts of cash.",
      },
    ],
  },
  cta: {
    label: "See how the wallet works",
    href: "/payments",
    prompt: [
      "Convert to naira and pay any Nigerian bank account by transfer. Free to open.",
    ],
  },
};
