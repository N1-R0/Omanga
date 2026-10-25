import type { FeatureScreen } from "@/new-redesign/content/home.content";

/**
 * Payments `/payments` (was `/wallet`). Structure: research-and-page-structure.md § 6.2.
 * Sections are built one at a time, hero first (2026-10-22).
 *
 * Owner answers 2026-10-22: in person you pay by transfer; leftover naira can
 * be converted to dollars. Still open: which currencies the wallet holds and
 * the full fee list (§ 8.5), and whether the site may mention cards (§ 8.2),
 * so nothing here says "card".
 */

/**
 * 1 · Hero (Nova reference, owner 2026-10-22): centred H1, sub,
 * one filled action, then the app home screen in a phone, standing in a
 * box of the home hero's moving crimson fabric and cut off by its bottom edge.
 */
export const walletHero = {
  title: ["Travel money,", "ready when you land"],
  sub: "Add pounds, dollars or Canadian dollars, convert them to naira, and pay by transfer.",
  primary: { label: "Open your free wallet" },
} as const;

/**
 * 2 · Proof strip (owner reference, 2026-10-22): four facts on a dark band.
 * Each one is already stated on the site or confirmed by the owner. "3
 * currencies" replaces the plan's "6+" (unconfirmed, § 8.5); update it when
 * the currency list arrives.
 */
export const walletProof = {
  label: "Wallet facts",
  items: [
    { title: "Pay in 50+ countries", text: "One wallet for trips across Africa, wherever you land." },
    { title: "Add from 3 currencies", text: "Pounds, US dollars or Canadian dollars, converted when you choose." },
    { title: "Free to open", text: "No cost to open, and no minimum to add." },
    { title: "Free to open", text: "No minimum to add, so start with what your trip needs." },
  ],
} as const;

/**
 * 3 · What you can do (owner reference, 2026-10-22): a section header, then
 * three rows that alternate a satin panel with an app card and the text. The
 * plan's six tiles fold into three rows: add and hold, convert, send and pay
 * (paying in person is a transfer, owner 2026-10-22).
 *
 * The cards are illustrative app states in the app's own words: no names, no
 * merchants. The convert card uses today's rate. No fee row on it, since the
 * conversion fee is unconfirmed (§ 8.5). The third row's link goes to the pay-in-person
 * walkthrough (section 4); the fees section was dropped (owner, 2026-10-22).
 */
export const walletFeatures = {
  eyebrow: "What you can do",
  title: "Everything your trip money needs, in one app",
  sub: "Add money before you fly, convert when you're ready, and pay in naira by transfer when you land.",
  rows: [
    {
      id: "hold",
      title: "Add money and hold each currency",
      text: "Fund a pounds, US dollars or Canadian dollars wallet. Each currency keeps its own balance until you convert it.",
      cta: { label: "See where it works", path: "/payments/countries" },
    },
    {
      id: "convert",
      title: "See the rate before you convert",
      text: "See the rate and the naira amount before you confirm, then the naira lands in your naira wallet.",
      cta: { label: "See today's rates", path: "/rates" },
    },
    {
      id: "send",
      title: "Send and pay in naira by transfer",
      text: "Send to a bank account, or pay a shop, driver or hotel by transfer. Every payment shows in your history.",
      cta: { label: "See how you pay in person", path: "/payments#pay-in-person" },
    },
  ],
  cards: {
    hold: {
      title: "Your wallets",
      meta: "4 currencies",
      wallets: [
        { code: "GBP", name: "British pound", flag: "/flags/united-kingdom.svg", balance: "£450.00" },
        { code: "USD", name: "US dollar", flag: "/flags/united-states.svg", balance: "$300.00" },
        { code: "CAD", name: "Canadian dollar", flag: "/flags/canada.svg", balance: "C$0.00" },
        { code: "NGN", name: "Nigerian naira", flag: "/flags/nigeria.svg", balance: "₦248,500" },
      ],
    },
    convert: {
      title: "Review conversion",
      from: "You convert",
      gbp: 100,
      rate: "Rate",
      to: "You get",
      note: "Shown before you confirm",
      action: "Convert",
    },
    send: {
      title: "Transactions",
      rows: [
        { title: "Paid by transfer", time: "1:40pm • Today", amount: "-₦8,500" },
        { title: "Sent to a bank account", time: "8:50am • Today", amount: "-₦15,000" },
        { title: "Converted from GBP", time: "8:30am • Today", amount: "+₦180,000" },
      ],
    },
  },
} as const;

/**
 * 4 · How you pay in person (owner wireframe, 2026-10-22): the phone in the
 * centre plays each step's clip, two steps either side. In person you pay by
 * bank transfer (owner, 2026-10-22). The clips are real app screens recorded
 * against a local mock with placeholder data, cut in Jitter ("Omanga · Pay in
 * person walkthrough") and exported as Lottie (screens embedded). `ms` is each
 * clip's length; the step timers run on it.
 * Each poster is the clip's first frame.
 */
export const walletPayInPerson = {
  eyebrow: "Paying in person",
  title: "How you pay at a shop, a hotel or a taxi",
  sub: "You pay by bank transfer from your naira wallet, the way people in Nigeria pay each other every day.",
  /** Under every step (owner). Uses the header's Download target, the footer's app row, until store links exist (§ 8.6). */
  // Same action as the header: the app isn't in the stores yet (sitemap-v2.md).
  cta: { label: "Open your free wallet" },
  steps: [
    {
      title: "Have naira ready",
      text: "Convert from your pounds or dollars wallet before you pay.",
      lottie: "/lottie/wallet/pay-step-1.json",
      poster: "/photos/wallet/walkthrough/step-1.jpg",
      ms: 8000,
    },
    {
      title: "Ask for their account",
      text: "Type their bank and account number. The app checks the name with their bank.",
      lottie: "/lottie/wallet/pay-step-2.json",
      poster: "/photos/wallet/walkthrough/step-2.jpg",
      ms: 8000,
    },
    {
      title: "Check the name, then send",
      text: "See who you're paying before you confirm with your PIN.",
      lottie: "/lottie/wallet/pay-step-3.json",
      poster: "/photos/wallet/walkthrough/step-3.jpg",
      ms: 4800,
    },
    {
      title: "Show the receipt",
      text: "Share the receipt as an image or a PDF, so they can see the payment.",
      lottie: "/lottie/wallet/pay-step-4.json",
      poster: "/photos/wallet/walkthrough/step-4.jpg",
      ms: 4800,
    },
  ],
} as const;

/**
 * 6 · The rate (wireframe approved 2026-10-22). [CHANGED, 2026-10-25] Owner:
 * the rate source, refresh timing and fee amounts aren't public, so the
 * section now says only that the app shows the rate before you confirm, plus
 * today's reference rates.
 */
export const walletRates = {
  eyebrow: "The rate",
  title: "See the rate before you convert",
  sub: "Check today's rate any time, then see exactly how many naira you'll get before anything moves.",
  points: [
    { title: "Today's rate, up front", text: "Check pounds, dollars and Canadian dollars against the naira whenever you like." },
    { title: "No minimum", text: "Convert as little or as much as you need." },
    { title: "You see it before you confirm", text: "The app shows the rate and the naira you'll get on the review screen, before anything moves." },
  ],
  cta: { label: "See all rates", path: "/rates" },
  card: {
    title: "Today's rates",
    rows: [
      { code: "GBP", label: "£1", flag: "/flags/united-kingdom.svg" },
      { code: "USD", label: "$1", flag: "/flags/united-states.svg" },
      { code: "CAD", label: "C$1", flag: "/flags/canada.svg" },
    ],
    note: (date: string | null) => (date ? `Reference rates · ${date}` : "Reference rates"),
  },
} as const;

/**
 * 7 · Countries, after Cartesia's globe + list (owner, 2026-10-22). The globe
 * is drawn live with cobe from each country's `location` (lat, lng). The
 * countries are the 11 home names; the rest of the "50+" is behind the link
 * (full list is owner question § 8.5). Copy keeps to the approved claim.
 */
export const walletCountries = {
  eyebrow: "Countries",
  title: "Pay in 50+ countries across Africa",
  sub: "The same wallet, online or in person, wherever the trip goes next.",
  listLabel: "Where you can pay",
  countries: [
    { name: "Nigeria", flag: "/flags/nigeria.svg", location: [9.08, 8.68] },
    { name: "Ghana", flag: "/flags/ghana.svg", location: [7.95, -1.02] },
    { name: "Kenya", flag: "/flags/kenya.svg", location: [-0.02, 37.91] },
    { name: "South Africa", flag: "/flags/south-africa.svg", location: [-30.56, 22.94] },
    { name: "Rwanda", flag: "/flags/rwanda.svg", location: [-1.94, 29.87] },
    { name: "Cameroon", flag: "/flags/cameroon.svg", location: [7.37, 12.35] },
    { name: "Benin", flag: "/flags/benin.svg", location: [9.31, 2.32] },
    { name: "Sierra Leone", flag: "/flags/sierra-leone.svg", location: [8.46, -11.78] },
    { name: "Niger", flag: "/flags/niger.svg", location: [17.61, 8.08] },
    { name: "Republic of the Congo", flag: "/flags/republic-of-congo.svg", location: [-0.23, 15.83] },
    { name: "South Sudan", flag: "/flags/south-sudan.svg", location: [6.88, 31.31] },
  ],
  cta: { label: "See all 50+ countries", path: "/payments/countries" },
} as const;

/**
 * 8 · Leftover naira (owner, 2026-10-22: leftover naira can be converted to
 * dollars). Only that is claimed: nothing about sending dollars back to a
 * bank at home, which is unconfirmed. Step 3 rests on the per-currency
 * wallets: converted dollars sit in the dollar wallet.
 */
export const walletLeftover = {
  eyebrow: "Going home",
  title: "Naira left when you fly home? Turn it into dollars",
  sub: "Convert what you didn't spend before you leave, at the rate the app shows you before you confirm.",
  steps: ["Open your naira wallet", "Convert to dollars at today's rate", "Keep them in your dollar wallet for the next trip"],
  cta: { label: "See today's rates", path: "/rates" },
  card: {
    label: "Converting what's left",
    naira: 50000,
    from: { name: "Naira wallet", flag: "/flags/nigeria.svg" },
    to: { name: "Dollar wallet", flag: "/flags/united-states.svg" },
    rateLabel: "Rate",
    note: (date: string | null) => (date ? `Example amount · ${date}` : "Example amount"),
  },
} as const;

/**
 * 11 · FAQ, in the home FAQ's UI (owner, 2026-10-23). `id="faq"` is the
 * footer's Fees link target. Answers are approved copy, no new claims:
 *   - content/payments-faq.content.ts (what it is, fees, rate, pounds to
 *     naira, where to spend);
 *   - content/safety.content.ts ("Is Omanga safe to use?", wallet half only);
 *   - owner answers 2026-10-22 (pay in person by transfer; leftover naira
 *     converts to dollars), worded as sections 4 and 8 already say them.
 * Health-cover questions stay on home and /health-cover.
 */
export const walletFaq = {
  eyebrow: "Questions",
  title: "Wallet questions, answered",
  subLead: "Rates, fees and paying in person.",
  subLink: "Chat on WhatsApp",
  subTail: "if yours isn't here.",
  items: [
    {
      q: "What is the Omanga travel wallet?",
      a: "Omanga Payment Solutions is a multi-currency wallet for travel in Africa. Fund it from USD, GBP or CAD, hold 6+ currencies and spend in 50+ African countries, online or in person. It is free to open.",
    },
    {
      q: "What fees does Omanga charge?",
      a: "Opening an Omanga wallet is free, and there are no minimums. You see any charge in the app before you confirm.",
    },
    {
      q: "How do I change pounds or dollars to naira?",
      a: "Add pounds, dollars or Canadian dollars to your Omanga wallet, then convert them to naira in the app. You see the rate before you confirm.",
    },
    {
      q: "How do I pay in person in Nigeria?",
      a: "Pay by bank transfer from your naira wallet. Ask for the seller's bank and account number, check the name the app shows, then confirm with your PIN.",
    },
    {
      q: "What happens to my naira when I leave?",
      a: "You can convert leftover naira to dollars in the app before you fly home.",
    },
    {
      q: "Where can I spend money with Omanga?",
      a: "You can spend from your Omanga wallet in 50+ African countries, online or in person.",
    },
    {
      q: "Is Omanga safe to use?",
      a: "You see the rate before you confirm a conversion. Keep your PIN and one-time codes private, and contact us if something looks wrong.",
    },
  ],
} as const;

/**
 * 12 · Closing band (owner, 2026-10-23): the shared CTA panel with the G1
 * aurora, like home's final CTA. "Open your free wallet" is the page's one
 * primary action again; health cover is a single text link, the only place
 * the page mentions it (the cover section was dropped). "A few minutes" is
 * approved home copy. The screen is an illustrative wallet: balances only,
 * no cover row, no status line.
 */
export const walletClosing = {
  eyebrow: "Get started",
  title: "Your naira, ready before you land",
  text: "Open your free wallet in a few minutes, add pounds or dollars, and pay by transfer from day one.",
  primary: { label: "Open your free wallet" },
  secondary: { label: "Add health cover for your trip", path: "/insurance/plans" },
  texture: { src: "/photos/brand/bg-aurora-g1.jpg" },
  screen: {
    kind: "rows",
    title: "Your wallet",
    rows: [
      ["Naira", "₦356,021"],
      ["Pounds", "£120.00"],
      ["Dollars", "$40.00"],
    ],
  } satisfies FeatureScreen,
} as const;

/**
 * The app home screen in the hero phone, rebuilt from the Omanga app's home
 * tab (owner screenshot, 2026-10-22). An illustrative state: no names, no
 * merchants, relative times so it never dates. The real tab bar has a
 * "Cards" tab, which the site can't mention yet (§ 8.2); the crop ends above
 * it, and it isn't drawn.
 */
export const walletAppHome = {
  greeting: "Hi there",
  currency: "NGN",
  balance: 248500,
  updated: "Last updated just now",
  actions: ["Add money", "Send", "Convert", "More"],
  transactionsLabel: "Transactions",
  seeAll: "See all",
  /** The first row's amount is £100 at today's rate. */
  converted: { title: "Converted from GBP", time: "9:12am • Today", gbp: 100 },
  rows: [
    { title: "Sent to a bank account", time: "8:50am • Today", amount: -15000 },
  ],
  /** The app's "Coming soon" row (insurance-promo-card.tsx), verbatim. */
  promo: {
    heading: "Coming soon",
    title: "Insurance from $50 a month",
    image: { src: "/photos/wallet/app-insurance-promo.webp", width: 690, height: 523 },
  },
} as const;
