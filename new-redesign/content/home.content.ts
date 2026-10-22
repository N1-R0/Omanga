/**
 * Home page structure, LOCKED 2026-10-21 (v4).
 * new-redesign/doc/research-and-page-structure.md § 6.1 and design-lab/home-wireframe.html.
 *
 * The order here is the page's order (all nine built 2026-10-21). Change the
 * order only with owner sign-off.
 */
export type HomeSectionId =
  | "hero"
  | "partners"
  | "what-omanga-does"
  | "steps"
  | "prices"
  | "why-omanga"
  | "countries"
  | "faq"
  | "final-cta";

export const homeSections: ReadonlyArray<{
  id: HomeSectionId;
  label: string;
  /** Layout reference from the owner's screenshots. */
  ref: string;
}> = [
  { id: "hero", label: "Hero", ref: "img 1" },
  { id: "partners", label: "Partners", ref: "img 3" },
  { id: "what-omanga-does", label: "What Omanga does", ref: "img 2" },
  { id: "steps", label: "Sorted before you land", ref: "img 4" },
  { id: "prices", label: "Health cover prices", ref: "pricing ref" },
  { id: "why-omanga", label: "Why Omanga", ref: "img 5" },
  { id: "countries", label: "Countries", ref: "Wise" },
  { id: "faq", label: "FAQ", ref: "img 6" },
  { id: "final-cta", label: "Final CTA", ref: "img 6" },
];

/**
 * 1 · Hero (img 1). H1 rewritten 2026-10-21 so the wallet reads Africa-wide and
 * only health cover names Nigeria (sitemap § 5 rule).
 */
export const homeHero = {
  title: ["Pay across Africa.", "Stay covered in Nigeria."],
  sub: "A free wallet for 50+ African countries, plus monthly health cover for your time in Nigeria. Rate shown before you pay.",
  primary: { label: "Open your free wallet" },
  secondary: { label: "Compare health plans", path: "/health-cover/plans" },
} as const;

/**
 * Hero converter (owner, 2026-10-21): under the CTAs, a white card in the
 * glass frame. Mid-market rates from lib/rates.ts (public daily snapshot,
 * revalidated hourly), the same source as the live site's rate pages.
 */
export const heroConverter = {
  // [CHANGED, 2026-10-21] Owner: content follows Wise's converter: a heading
  // and one-line sub, the two amounts, then label/value rows (Wise's
  // "Arrives" and "Total fees"), then a link. Only confirmed facts:
  //   - "You add", not Wise's "exactly": whether converting costs anything
  //     is owner question § 8.5.
  //   - No "Guaranteed for" rate lock, no "Arrives" (no speed claims) and no
  //     "You could save" (no comparison claims).
  title: "Convert at the real rate",
  sub: "See the mid-market rate before you confirm.",
  youAdd: "You add",
  youGet: "Your wallet gets",
  swapLabel: "Swap currencies",
  defaultAmount: 200,
  /**
   * The four currencies the live rate pages already cover (lib/rates.ts
   * crossMatrix). More African currencies wait on owner question § 8.5
   * (which currencies the wallet holds).
   */
  currencies: [
    { code: "GBP", name: "British pound", country: "United Kingdom", symbol: "£", flag: "/flags/united-kingdom.svg" },
    { code: "USD", name: "US dollar", country: "United States", symbol: "$", flag: "/flags/united-states.svg" },
    { code: "CAD", name: "Canadian dollar", country: "Canada", symbol: "C$", flag: "/flags/canada.svg" },
    { code: "NGN", name: "Nigerian naira", country: "Nigeria", symbol: "₦", flag: "/flags/nigeria.svg" },
  ],
  picker: {
    searchPlaceholder: "Type a currency / country",
    searchLabel: "Search currencies",
    allLabel: "All currencies",
    empty: "No currency matches",
    chooseLabel: (side: string, code: string) => `${side} currency, ${code}. Change`,
  },
  rateLabel: "Exchange rate",
  rateNote: "Mid-market, updated hourly",
  feeLabel: "Transfer fee",
  fee: "₦20 flat",
  feeNote: "To any Nigerian bank account",
  link: { label: "See all rates", path: "/rates" },
} as const;

/**
 * 2 · Partners (img 3). The same three partners and label the live site shows
 * (content/trust.content.ts). The Fuspay logo was restored by the owner on
 * 2026-10-19; copy about who runs the wallet stays off public pages. Logos only:
 * partner roles are still an open owner question, so there are no captions and
 * no roles in the alt text.
 */
export const homePartners = {
  label: "Our partners",
  /**
   * Trimmed copies of the live site's PNGs (public/photos/partners, cut to the
   * mark with no baked-in whitespace). `display` is the desktop height in px,
   * balanced by aspect ratio (26 × √(3.7 ÷ aspect)) so the wide Phillips mark
   * doesn't outweigh the other two.
   */
  logos: [
    { src: "/photos/partners/phillips-hmo.png", alt: "Phillips HMO", width: 1228, height: 205, display: 20 },
    { src: "/photos/partners/fuspay.png", alt: "Fuspay", width: 770, height: 216, display: 26 },
    { src: "/photos/partners/zira.png", alt: "Zira", width: 596, height: 159, display: 26 },
  ],
} as const;

/**
 * 3 · What Omanga does (img 2).
 *
 * [CHANGED, 2026-10-21] Owner asked for the items to read like a competitor's
 * (Wise, Grey): a benefit-led title, one concrete sentence, and an action
 * link. Every claim is already approved copy: ₦20 flat per transfer, 6+
 * currencies and 50+ countries (wallet FAQ), mid-market rate refreshed
 * hourly, plan prices, and Phillips HMO handling care. Kept out: "card"
 * (copy rule), speed claims, "cancel any time" (§ 8.1) and any claims-process
 * detail such as "show your cover" (§ 8.4). Lagos and Nairobi are cities in
 * the published 11-country sample (Nigeria, Kenya).
 *
 * [CHANGED, 2026-10-21] Owner: the ₦20 send item is replaced by a wallet item
 * after Grey's "Open a global multi-currency account", and it now leads, so
 * the list runs open → convert → spend → cover → care. "Wallet", not "bank
 * account": Omanga isn't a bank and no licence is named (copy rules). ₦20
 * stays in the converter and Why Omanga.
 *
 * [CHANGED, 2026-10-21] Owner's call: the convert title uses Grey's "best
 * rates". Flagged: "best" is a comparative claim with no comparison behind it
 * yet, so the body keeps the provable fact (the mid-market rate, hourly). Back
 * it with a dated comparison against named providers before cutover.
 *
 * Copy from the locked wireframe, with one cut:
 * the sub no longer says "without paying a deposit up front". That's an
 * unconfirmed insurance fact (owner question § 8.4).
 *
 * Screens are illustrative app states, not real accounts: no names, no
 * invented merchants, no speed claims, and no "card" (copy rule).
 */
/**
 * A Lottie version of a motion scene (owner, 2026-10-22): vector, 60fps, so
 * it stays sharp where the MP4s went soft. Exported from the Jitter
 * "· Lottie test (transparent)" artboards, so it has no satin: the panel's U2
 * texture shows through behind it. `stillFrame` is the frame shown for
 * reduced motion (the scene's result). `phoneZoom` overrides the 1.35×
 * zoom the accordion applies below 1024px.
 */
export type FeatureLottie = { src: string; stillFrame: number; phoneZoom?: number };

export type FeatureScreen =
  | { kind: "convert"; title?: string; rateLabel?: string }
  | { kind: "rows"; title: string; rows: ReadonlyArray<readonly [string, string]>; status?: string };

export const homeFeatures = {
  eyebrow: "What Omanga does",
  title: "One app for your money and your health on the trip",
  sub: "Hold and convert your money at the real rate, pay across Africa, and get care in Nigeria through Phillips HMO.",
  items: [
    {
      title: "Open a free multi-currency wallet",
      text: "Sign up with your email in a few minutes, then fund it in pounds, dollars or Canadian dollars. Hold 6+ currencies in one place.",
      link: { label: "See how the wallet works", path: "/wallet" },
      lottie: { src: "/lottie/home/wallet.json", stillFrame: 594 },
      screen: {
        kind: "rows",
        title: "Your wallet",
        rows: [
          ["Fund in", "GBP, USD or CAD"],
          ["Holds", "6+ currencies"],
          ["To open", "Free"],
        ],
        status: "Wallet open",
      },
    },
    {
      title: "Convert money at the best rates",
      text: "Exchange pounds, dollars or Canadian dollars at the midpoint between buying and selling prices. Check it before you confirm. It refreshes every hour.",
      link: { label: "Check today's rate", path: "/rates" },
      lottie: { src: "/lottie/home/convert.json", stillFrame: 760 },
      screen: { kind: "convert" },
    },
    {
      title: "Spend in 50+ African countries",
      text: "Pay online or in person from your wallet balance, from Lagos to Nairobi.",
      link: { label: "See the countries", path: "/wallet/countries" },
      // Its card is wider (the map), so phones zoom it less than the 1.35× default.
      lottie: { src: "/lottie/home/spend.json", stillFrame: 556, phoneZoom: 1.05 },
      screen: {
        kind: "rows",
        title: "Payment",
        rows: [
          ["Where", "Accra, Ghana"],
          ["Amount", "GH₵120.00"],
          ["Paid from", "GBP balance"],
        ],
        status: "Paid",
      },
    },
    {
      title: "Health cover from $50 a month",
      text: "Pick Silver, Gold or Diamond and pay monthly for the months you're in Nigeria. Phillips HMO provides the cover.",
      link: { label: "Compare plans", path: "/health-cover/plans" },
      lottie: { src: "/lottie/home/cover.json", stillFrame: 590 },
      screen: {
        kind: "rows",
        title: "Health plans",
        rows: [
          ["Silver", "$50 / month"],
          ["Gold", "$85 / month"],
          ["Diamond", "$120 / month"],
        ],
      },
    },
    {
      title: "Fall ill? Go to a network hospital",
      text: "Visit a Phillips HMO hospital in your plan's category. Phillips HMO handles your care through its network.",
      link: { label: "Get care now", path: "/get-care" },
      lottie: { src: "/lottie/home/care.json", stillFrame: 590 },
      screen: {
        kind: "rows",
        title: "Your cover",
        rows: [
          ["Plan", "Gold"],
          ["Hospitals", "Category A and B"],
          ["Provider", "Phillips HMO"],
        ],
        status: "Cover active",
      },
    },
  ] satisfies ReadonlyArray<{ title: string; text: string; link: { label: string; path: string }; lottie?: FeatureLottie; screen: FeatureScreen }>,
  texture: { src: "/photos/brand/bg-flowing-waves-u2.jpg", width: 2400, height: 1350 },
  convertScreen: { title: "Convert", add: "You add", get: "You get", rate: "Mid-market rate", amount: 200 },
} as const;

/**
 * 4 · Sorted before you land (img 4). The approved three steps. The wireframe's
 * "No Nigerian ID needed [confirm]" is left out until the owner confirms it
 * (§ 8.5).
 */
export const homeSteps = {
  eyebrow: "How it works",
  // [CHANGED, 2026-10-21] Owner: heading and sub were too short beside the
  // other sections' two-line blocks. Facts from the approved FAQ (plan bought
  // before travel, wallet funded in GBP/USD/CAD).
  title: "Three steps at home before you fly",
  sub: "A few minutes on your phone is all it takes. Your naira and your health cover are ready the moment you land.",
  steps: [
    {
      title: "Open your free wallet",
      text: "Sign up with your email in a few minutes.",
      screen: {
        kind: "rows",
        title: "Create your account",
        rows: [
          ["Step", "1 of 3"],
          ["Email", "you@example.com"],
        ],
        status: "Continue",
      },
    },
    {
      title: "Add money",
      text: "Fund in pounds, dollars or Canadian dollars at the rate you see.",
      // "Rate" rather than "Mid-market rate": the step card is too narrow for both.
      screen: { kind: "convert", title: "Add money", rateLabel: "Rate" },
    },
    {
      title: "Pick your cover",
      text: "Choose a plan for the months you're away.",
      screen: {
        kind: "rows",
        title: "Your plan",
        rows: [
          ["Plan", "Gold"],
          ["Price", "$85 / month"],
        ],
        status: "Cover active",
      },
    },
  ] satisfies ReadonlyArray<{ title: string; text: string; screen: FeatureScreen }>,
  texture: { src: "/photos/brand/bg-flowing-waves-u2.jpg", alt: "" },
} as const;

/**
 * 5 · Health cover prices (pricing reference). Plan facts, descriptions,
 * included lists and checkout links are the live site's approved copy
 * (content/insurance-plans.content.ts, config/site.ts PLAN_CHECKOUT_URLS). The
 * Paystack pages were read on 2026-09-20 and are recurring monthly
 * subscriptions.
 *
 * The trip-length switch only multiplies the monthly price; it promises no
 * discount. "No commitment. Cancel any time." is published copy that the owner
 * hasn't confirmed (§ 8.1), kept as on the live site and not strengthened.
 */
export const homePrices = {
  eyebrow: "Health cover in Nigeria",
  title: "Simple monthly cover for your trip",
  sub: "Pick a plan for the months you're in Nigeria. Phillips HMO provides the cover and handles your care.",
  tripLabel: "Trip length",
  trips: [
    { months: 1, label: "1 month" },
    { months: 3, label: "3 months" },
  ],
  perMonth: "per month",
  totalFor: (total: string, months: number) => (months === 1 ? "Billed monthly" : `${total} for ${months} months`),
  accessLabel: "Hospitals",
  popular: "Popular",
  plans: [
    {
      name: "Silver",
      price: 50,
      description: "The essentials, for a short, straightforward trip.",
      access: "Category A",
      included: ["Emergency assistance", "15 days in hospital per trip", "Basic diagnostics", "Emergency evacuation", "Essential prescription drugs"],
      action: "Buy Silver",
      featured: false,
    },
    {
      name: "Gold",
      price: 85,
      description: "A private ward and more scans, for longer or less predictable trips.",
      access: "Category A + B",
      included: ["Everything in Silver, plus:", "Private ward admission", "Enhanced diagnostics", "Extended eye care", "Higher surgical limits"],
      action: "Buy Gold",
      featured: true,
    },
    {
      name: "Diamond",
      price: 120,
      description: "The highest limits and unlimited scans, with the widest hospital access.",
      access: "Category A + B + C",
      included: ["Everything in Gold, plus:", "Widest hospital access", "Unlimited CT scans", "Highest cover limits", "Comprehensive care"],
      action: "Buy Diamond",
      featured: false,
    },
  ],
  featuredTexture: "/photos/brand/bg-dark-fabric-u3.jpg",
  footnote: "No commitment. Cancel any time. Every plan also includes telemedicine, roaming across Nigeria and the app.",
  link: { label: "Compare all plan details", path: "/health-cover/plans" },
} as const;

/**
 * 6 · Why Omanga (img 5). Wireframe copy, tightened to confirmed facts only:
 *   - "No hidden markup" is out: whether converting costs anything is owner
 *     question § 8.5.
 *   - "No pay-then-claim" is out: the claims process is § 8.4. The tile uses
 *     the approved "Phillips HMO handles your care" line instead.
 *   - The sub no longer says "every partner named", since the owner keeps the
 *     wallet's operator off public pages.
 */
export const homeWhy = {
  eyebrow: "Why Omanga",
  title: "Honest about rates, clear about who does what",
  sub: "Every number shown before you pay, and a plain answer to who provides what.",
  tiles: [
    { icon: "rate", title: "Mid-market rate", text: "Refreshed hourly and shown before you confirm." },
    { icon: "tag", title: "One flat fee", text: "₦20 per transfer, shown before you send." },
    { icon: "wallet", title: "No minimum", text: "Free to open. Add as little as you like." },
    { icon: "care", title: "Care through a network", text: "Go to a network hospital and Phillips HMO handles your care." },
    { icon: "info", title: "Who's who", text: "Phillips HMO provides the cover. Omanga isn't the insurer." },
    { icon: "chat", title: "Real people to talk to", text: "Chat with us on WhatsApp when you need help." },
  ],
  link: { label: "Is Omanga safe?", path: "/safety" },
} as const;

/**
 * 7 · Countries (Wise "works nearly everywhere").
 *
 * "Pay in" lists the same 11 African countries the live site shows as its
 * sample of 50+ (content/coverage.content.ts COVERAGE_FLAGS). The full list is
 * owner question § 8.5, so there's no inline "show all": the link goes to
 * /wallet/countries, the page that will hold it. Each country links there too
 * until /wallet/[country] pages exist (sitemap § 5 marks them later).
 *
 * "Exchange rates" lists the live site's three rate pages (content/rates.content.ts).
 */
export const homeCountries = {
  eyebrow: "Countries",
  // [CHANGED, 2026-10-21] Owner: too short; see homeSteps. Facts from the
  // approved wallet FAQ (50+ countries, online or in person).
  title: "One wallet for 50+ countries across Africa",
  sub: "Hold and convert your money, then pay online or in person wherever you travel. Today's naira rates are a tab away.",
  tabs: [
    {
      id: "pay",
      label: "Pay in",
      items: [
        ["Benin", "benin"],
        ["Cameroon", "cameroon"],
        ["Ghana", "ghana"],
        ["Kenya", "kenya"],
        ["Niger", "niger"],
        ["Nigeria", "nigeria"],
        ["Republic of the Congo", "republic-of-congo"],
        ["Rwanda", "rwanda"],
        ["Sierra Leone", "sierra-leone"],
        ["South Africa", "south-africa"],
        ["South Sudan", "south-sudan"],
      ].map(([name, flag]) => ({ label: `Pay in ${name}`, flag: `/flags/${flag}.svg`, path: "/wallet/countries" })),
      more: { label: "See all 50+ countries", path: "/wallet/countries" },
    },
    {
      id: "rates",
      label: "Exchange rates",
      items: [
        { label: "Pounds to naira", flag: "/flags/united-kingdom.svg", path: "/rates/pounds-to-naira" },
        { label: "Dollars to naira", flag: "/flags/united-states.svg", path: "/rates/dollars-to-naira" },
        { label: "Canadian dollars to naira", flag: "/flags/canada.svg", path: "/rates/canadian-dollars-to-naira" },
      ],
      more: { label: "See all exchange rates", path: "/rates" },
    },
  ],
} as const;

/**
 * 8 · FAQ (img 6). Every answer is published copy from the live site, so no
 * new claims:
 *   content/payments-faq.content.ts, content/insurance-faq.content.ts,
 *   content/safety.content.ts.
 * Three wireframe questions had no approved answer and were swapped for
 * approved ones: "Do I need a Nigerian bank account?", "Is health cover
 * required to enter Nigeria?" and "What happens to leftover money?". They come
 * back once the owner supplies the facts (§ 8.4, § 8.5).
 */
export const homeFaq = {
  eyebrow: "Questions",
  title: "Everything you need before you go",
  subLead: "Rates, cover, safety and getting started.",
  subLink: "Chat on WhatsApp",
  subTail: "if yours isn't here.",
  items: [
    {
      q: "What is the Omanga travel wallet?",
      a: "Omanga Payment Solutions is a multi-currency wallet for travel in Africa. Fund it from USD, GBP or CAD, hold 6+ currencies and spend in 50+ African countries, online or in person. It is free to open.",
    },
    {
      q: "How much is travel insurance for Nigeria?",
      a: "Omanga's travel health insurance for Nigeria costs $50 a month on Silver, $85 on Gold and $120 on Diamond. There's no commitment, and you can cancel any time.",
    },
    {
      q: "What exchange rate does Omanga use?",
      a: "Omanga uses the mid-market rate: the midpoint between buying and selling prices, taken from public market data and refreshed hourly.",
    },
    {
      q: "Does Omanga health cover work outside Nigeria?",
      a: "No. Omanga health cover applies in Nigeria only. Your Omanga wallet works in 50+ African countries, but your health cover doesn't.",
    },
    {
      q: "Is Omanga safe to use?",
      a: "You see the mid-market rate before you confirm a conversion, and transfers cost a flat ₦20. Health cover comes from Phillips HMO, a Nigerian health maintenance organisation (HMO). Keep your PIN and one-time codes private, and contact us if something looks wrong.",
    },
    {
      q: "How does health insurance work in Nigeria?",
      a: "In Nigeria, health insurance usually runs through a health maintenance organisation (HMO), which works with a network of partner hospitals. Omanga's cover comes from Phillips HMO: you use the hospitals in your plan's category, and Phillips handles your care through its network.",
    },
    {
      q: "Where can I spend money with Omanga?",
      a: "You can spend from your Omanga wallet in 50+ African countries, online or in person.",
    },
    {
      q: "What fees does Omanga charge?",
      a: "Opening an Omanga wallet is free. Each transfer costs ₦20, and there are no minimums.",
    },
  ],
} as const;

/**
 * 9 · Final CTA (img 6). "Land with everything sorted" is the story's ending,
 * locked in the sitemap § 5 closing band. The app screen is an illustrative
 * home state; the naira figure matches the converter's £200 example.
 */
export const homeFinalCta = {
  eyebrow: "Get started",
  title: "Land with everything sorted",
  text: "Open your free wallet today and add cover when you book your trip.",
  primary: { label: "Open your free wallet" },
  secondary: { label: "Compare health plans", path: "/health-cover/plans" },
  texture: { src: "/photos/brand/bg-aurora-g1.jpg" },
  screen: {
    kind: "rows",
    title: "Home",
    rows: [
      ["Naira", "₦356,021"],
      ["Pounds", "£120.00"],
      ["Health cover", "Gold"],
    ],
    status: "Cover active",
  } satisfies FeatureScreen,
} as const;
