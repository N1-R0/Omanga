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
  // Owner, 2026-10-25: the stage is a full-width photo band. Unsplash
  // mqO0Rf-PUMs by Paul Pastourmatzis (Unsplash License), layered blue ridges
  // in mist, self-hosted, not used anywhere else on the site. Decorative.
  photo: { src: "/photos/wallet/hero-ridges.jpg", position: "50% 55%" },
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
    // [CHANGED, 2026-10-25] Owner: the first "Free to open" (left by the fee
    // cleanup) repeated the second; it's now the pay-by-transfer fact.
    { title: "Pay by transfer", text: "Pay shops, drivers and hotels in naira, the way Nigeria pays." },
    { title: "Free to open", text: "No minimum to add, so start with what your trip needs." },
  ],
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
 * 3 · How it works (owner, 2026-10-25): one step walkthrough for the whole
 * trip, replacing "What you can do", "Paying in person" and "Going home",
 * which repeated each other. Each step plays its own Jitter Lottie (file
 * "Omanga — Payments how it works", one artboard per step, vector screens
 * rebuilt from the app, not screenshots) while its timer fills; `ms` is the
 * Lottie's length and `stillFrame` its settled frame for reduced motion.
 * Example amounts at example rates; no fees, no names (the payee's name is
 * a placeholder bar), no funding method.
 */
export const walletHowItWorks = {
  eyebrow: "How it works",
  title: "From home to Nigeria, and back again",
  sub: "Add money before you fly, convert when you're ready, pay by transfer in Nigeria, and turn what's left into dollars when you leave.",
  steps: [
    { title: "Add money", text: "Fund a pounds, dollars or Canadian dollars wallet before you fly. There's no minimum.", lottie: "/lottie/wallet/how-1.json", ms: 5000, stillFrame: 288 },
    { title: "Convert to naira", text: "Pick an amount and see the rate and the naira you'll get before you confirm.", lottie: "/lottie/wallet/how-2.json", ms: 6000, stillFrame: 348 },
    { title: "Pay by transfer", text: "Pay a shop, a driver or a hotel. Enter their account, check the name, then send.", lottie: "/lottie/wallet/how-3.json", ms: 6000, stillFrame: 348 },
    { title: "Going home", text: "Convert what's left into dollars and keep them in your dollar wallet for the next trip.", lottie: "/lottie/wallet/how-4.json", ms: 6000, stillFrame: 348 },
  ],
  // The home page's mountain photo (owner, 2026-10-25: every container uses it).
  photo: "/photos/home/rates-mountains.jpg",
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
  // [ADDED, 2026-10-28] SEO audit: link the matching guide.
  guide: { lead: "Planning a budget? See", label: "how far $100 goes in Nigeria", path: "/blog/how-far-does-100-dollars-go-in-nigeria" },
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
  // [CHANGED, 2026-10-25] Owner: the home page's mountain photo, not the
  // crimson aurora texture.
  texture: { src: "/photos/home/rates-mountains.jpg" },
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
