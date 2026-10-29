export type HomeSectionId =
  | "hero"
  | "products"
  | "partners"
  | "steps"
  | "why-omanga"
  | "countries"
  | "faq"
  | "final-cta";

export const homeSections: ReadonlyArray<{
  id: HomeSectionId;
  label: string;
  ref: string;
}> = [
  { id: "hero", label: "Hero", ref: "img 1" },
  { id: "partners", label: "Partners", ref: "img 3" },
  { id: "products", label: "Payments and insurance", ref: "owner card" },
  { id: "steps", label: "Sorted before you land", ref: "img 4" },
  { id: "why-omanga", label: "Why Omanga", ref: "img 5" },
  { id: "countries", label: "Countries", ref: "Wise" },
  { id: "faq", label: "FAQ", ref: "img 6" },
  { id: "final-cta", label: "Final CTA", ref: "img 6" },
];

export const homeHero = {
  title: ["Pay across Africa.", "Stay covered in Nigeria."],
  sub: "Omanga is a free wallet for 50+ African countries, plus monthly health cover for your time in Nigeria. Rate shown before you pay.",
  primary: { label: "Open your free wallet" },
  secondary: { label: "Get insurance plan", path: "/insurance/plans" },
  photo: { src: "/photos/home/hero-plane-wing.jpg", position: "50% 55%" },
} as const;

export const homeProducts = {
  eyebrow: "What you get",
  title: "Your money and your health, sorted for the trip",
  sub: "Convert and pay across Africa, and get insurance in Nigeria from Phillips HMO.",
  metricsLabel: "At a glance",
  metrics: [
    { value: "50", suffix: "+", label: "African countries to pay in" },
    { value: "6", suffix: "+", label: "Currencies in one wallet" },
    { value: "3", suffix: "", label: "Insurance plans from Phillips HMO" },
  ],
} as const;

export const homeInsurance = {
  eyebrow: "Insurance",
  title: "Insurance plans for your time in Nigeria",
  sub: "Go to a hospital in your plan's network and Phillips HMO handles your care.",
  plansLabel: "Plans",
  perMonth: "/ month",
  chats: {
    Silver: { src: "/lottie/home/insurance-chat-silver.json", stillFrame: 360 },
    Gold: { src: "/lottie/home/insurance-chat-gold.json", stillFrame: 360 },
    Diamond: { src: "/lottie/home/insurance-chat-diamond.json", stillFrame: 360 },
  } as Record<string, FeatureLottie>,
  hospitals: (access: string) => `${access} hospitals`,
  planTitle: (plan: string) => `${plan} plan`,
  cta: (plan: string) => `Get ${plan}`,
  path: "/insurance/plans",
  photo: { src: "/photos/home/insurance-phone-friends.jpg", position: "60% 30%" },
} as const;

export const homeRates = {
  eyebrow: "Payments",
  title: "Convert your money, then pay across Africa",
  sub: "Hold pounds, dollars or Canadian dollars, convert to naira when you need it, and see the rate before you confirm.",
  photo: { src: "/photos/home/rates-mountains.jpg", position: "50% 60%" },
  screen: {
    title: "Convert",
    youConvert: "You convert",
    youGet: "You get",
    facts: [
      { icon: "bank", text: "Pay by bank transfer" },
      { icon: "eye", text: "Rate shown before you confirm" },
      { icon: "wallet", text: "Free to open" },
    ],
    cta: "Convert money",
  },
  defaultAmount: 200,
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
} as const;

export const homePartners = {
  label: "Our partners",
  logos: [
    { src: "/photos/partners/phillips-hmo.png", alt: "Phillips HMO", width: 1228, height: 205, display: 20 },
    { src: "/photos/partners/fuspay.png", alt: "Fuspay", width: 770, height: 216, display: 26 },
    { src: "/photos/partners/zira.png", alt: "Zira", width: 596, height: 159, display: 26 },
  ],
} as const;

export type FeatureLottie = { src: string; stillFrame: number; phoneZoom?: number };

export type FeatureScreen =
  | { kind: "convert"; title?: string; rateLabel?: string }
  | { kind: "rows"; title: string; rows: ReadonlyArray<readonly [string, string]>; status?: string };

export const homeFeatures = {
  eyebrow: "What Omanga does",
  title: "One app for your money and your health on the trip",
  sub: "Hold and convert your money, pay across Africa, and get care in Nigeria through Phillips HMO.",
  items: [
    {
      title: "Open a free multi-currency wallet",
      text: "Sign up with your email in a few minutes, then fund it in pounds, dollars or Canadian dollars. Hold 6+ currencies in one place.",
      link: { label: "See how the wallet works", path: "/payments" },
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
      text: "Exchange pounds, dollars or Canadian dollars for naira, and check the rate before you confirm.",
      link: { label: "Check today's rate", path: "/rates" },
      lottie: { src: "/lottie/home/convert.json", stillFrame: 760 },
      screen: { kind: "convert" },
    },
    {
      title: "Spend in 50+ African countries",
      text: "Pay online or in person from your wallet balance, from Lagos to Nairobi.",
      link: { label: "See the countries", path: "/payments/countries" },
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
      link: { label: "Compare plans", path: "/insurance/plans" },
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
      link: { label: "Get care now", path: "/insurance/get-care" },
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
  convertScreen: { title: "Convert", add: "You add", get: "You get", rate: "Rate", amount: 200 },
} as const;

export const homeSteps = {
  eyebrow: "How it works",
  title: "Set up at home before you fly",
  sub: "A few minutes on your phone is all it takes. Your wallet is funded and your plan is picked before you leave.",
  from: "Home",
  to: "Lagos",
  dip: 40,
  photo: "/photos/home/rates-mountains.jpg",
  steps: [
    {
      title: "Open your free wallet",
      text: "Sign up with your email in a few minutes.",
      screen: { kind: "signup", title: "Create account", label: "Email", value: "you@example.com", action: "Continue" },
    },
    {
      title: "Add money",
      text: "Fund in pounds, dollars or Canadian dollars, and convert when you're ready.",
      screen: { kind: "add", title: "Add money", wallet: "GBP wallet", flag: "/flags/united-kingdom.svg", amount: "£200", action: "Add money" },
    },
    {
      title: "Pick your insurance plan",
      text: "Choose Silver, Gold or Diamond from Phillips HMO.",
      screen: { kind: "plan", title: "Your plan", plans: ["Silver", "Gold", "Diamond"], picked: "Gold", row: "Gold · $85 / month", sub: "Category A + B hospitals" },
    },
  ],
  stepOf: (n: number, total: number) => `${n} of ${total}`,
  cta: { label: "Open your free wallet" },
} as const;

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
  link: { label: "Compare all plan details", path: "/insurance/plans" },
} as const;

export const homeWhy = {
  eyebrow: "Why Omanga",
  title: "Honest about rates, clear about who does what",
  sub: "Every number shown before you pay, and a plain answer to who provides what.",
  tiles: [
    { icon: "rate", title: "Rate shown first", text: "See the rate before you confirm a conversion." },
    { icon: "tag", title: "Pay by transfer", text: "Pay shops, drivers and hotels in naira by bank transfer." },
    { icon: "wallet", title: "No minimum", text: "Free to open. Add as little as you like." },
    { icon: "care", title: "Care through a network", text: "Go to a network hospital and Phillips HMO handles your care." },
    { icon: "info", title: "Who's who", text: "Phillips HMO provides the cover. Omanga isn't the insurer." },
    { icon: "chat", title: "Real people to talk to", text: "Chat with us on WhatsApp when you need help." },
  ],
  link: { label: "Is Omanga safe?", path: "/safety" },
} as const;

export const homeCountries = {
  eyebrow: "Countries",
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
      ].map(([name, flag]) => ({ label: `Pay in ${name}`, flag: `/flags/${flag}.svg`, path: "/payments/countries" })),
      more: { label: "See all 50+ countries", path: "/payments/countries" },
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

export const homeFaq = {
  eyebrow: "Questions",
  title: "Everything you need before you go",
  subLead: "Rates, cover, safety and getting started.",
  subLink: "Chat on WhatsApp",
  subTail: "if yours isn't here.",
  guide: { lead: "Wondering if Omanga is safe?", label: "Here's how it works", path: "/safety" },
  items: [
    {
      q: "What is the Omanga travel wallet?",
      a: "Omanga Payment Solutions is a multi-currency wallet for travel in Africa. Fund it from USD, GBP or CAD, hold 6+ currencies and spend in 50+ African countries, online or in person. It is free to open.",
    },
    {
      q: "How much is health insurance for visiting Nigeria?",
      a: "Omanga's travel health insurance for Nigeria costs $50 a month on Silver, $85 on Gold and $120 on Diamond, paid monthly for the months you're there.",
    },
    {
      q: "Does Omanga health cover work outside Nigeria?",
      a: "No. Omanga health cover applies in Nigeria only. Your Omanga wallet works in 50+ African countries, but your health cover doesn't.",
    },
    {
      q: "Is Omanga safe to use?",
      a: "You see the rate before you confirm a conversion. Health cover comes from Phillips HMO, a Nigerian health maintenance organisation (HMO). Keep your PIN and one-time codes private, and contact us if something looks wrong.",
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
      a: "Opening an Omanga wallet is free, and there are no minimums. You see any charge in the app before you confirm.",
    },
  ],
} as const;

export const homeFinalCta = {
  eyebrow: "Get started",
  title: "Land with everything sorted",
  text: "Open your free wallet today and add cover when you book your trip.",
  primary: { label: "Open your free wallet" },
  secondary: { label: "Compare health plans", path: "/insurance/plans" },
  texture: { src: "/photos/home/final-cta-wing.jpg" },
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
