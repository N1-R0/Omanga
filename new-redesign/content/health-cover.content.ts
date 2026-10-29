import { type FeatureScreen, homePrices } from "@/new-redesign/content/home.content";

export const healthHero = {
  title: ["Travel health insurance", "for your trip to Nigeria"],
  sub: "Short-term cover from Phillips HMO while you're in Nigeria, from $50 a month. Hospital care, diagnostics and emergency evacuation included.",
  primary: { label: "Get insurance plan", path: "/insurance/plans" },
  scene: { src: "/lottie/health-cover/how-it-works.json", stillFrame: 864 },
  photo: { src: "/photos/insurance/hero-range.jpg", position: "50% 70%" },
} as const;

export const healthProof = {
  label: "Insurance facts",
  items: [
    { title: "From $50 a month", text: "Three plans, paid monthly for the months you're in Nigeria." },
    { title: "Provided by Phillips HMO", text: "Your care runs through its hospital network in Nigeria." },
    { title: "Emergency evacuation", text: "Included on every plan, with hospital care and diagnostics." },
    { title: "Telemedicine included", text: "Every plan also covers telemedicine and roaming across Nigeria." },
  ],
} as const;

export const healthScope = {
  eyebrow: "What this is",
  title: "Insurance for your time in Nigeria",
  sub: "Short-term cover from Phillips HMO, paid monthly for the months you're there.",
  action: { label: "Compare insurance plans", path: "/insurance/plans" },
  is: {
    title: "What it is",
    items: [
      { title: "Hospital care in Nigeria", text: "Admission, diagnostics and emergency evacuation while you're in the country." },
      { title: "Monthly, for the months you're there", text: "Pay month by month while you're in Nigeria, from $50 a month." },
      { title: "Provided by Phillips HMO", text: "Care runs through Phillips HMO's own hospital network." },
    ],
  },
  isnt: {
    title: "What it isn't",
    items: [
      { title: "Cover outside Nigeria", text: "Your wallet works in 50+ African countries, but your insurance doesn't." },
      { title: "Travel insurance", text: "It doesn't cover flights, luggage or cancelled trips." },
      { title: "A visa or entry requirement", text: "You don't need it to enter Nigeria. It's there for your health while you stay." },
    ],
  },
} as const;

export const healthPlans = {
  eyebrow: "Plans and prices",
  title: "Choose your plan",
  sub: "Three plans from Phillips HMO, each paid monthly for the months you're in Nigeria.",
  popular: "Popular",
  perMonth: "/ month",
  hospitals: (access: string) => `${access} hospitals`,
  plans: homePrices.plans,
  foot: "Want every limit side by side?",
  link: { label: "Compare all plan details", path: "/insurance/plans" },
} as const;

export const healthIncludes = {
  eyebrow: "On every plan",
  title: "What every plan includes",
  sub: "Silver, Gold and Diamond all start from the same cover. Gold and Diamond add to it.",
  label: "Included on Silver, Gold and Diamond",
  groups: [
    {
      title: "Hospital care",
      items: [
        { icon: "alert", title: "Emergency assistance", text: "Help when something goes wrong in Nigeria." },
        { icon: "bed", title: "15 days in hospital", text: "Hospital admission of up to 15 days per trip." },
        { icon: "evac", title: "Emergency evacuation", text: "Transport to care in an emergency." },
      ],
    },
    {
      title: "Tests and medicines",
      items: [
        { icon: "test", title: "Basic diagnostics", text: "Standard tests to find out what's wrong." },
        { icon: "pill", title: "Essential prescription drugs", text: "Essential medicines prescribed for your treatment." },
      ],
    },
    {
      title: "Care as you travel",
      items: [
        { icon: "call", title: "Telemedicine", text: "Speak to a doctor without going to a hospital." },
        { icon: "pin", title: "Roaming across Nigeria", text: "Use your cover as you move around the country." },
        { icon: "account", title: "Your plan in your account", text: "Your plan and its details in your Omanga account." },
      ],
    },
  ],
} as const;

export const healthFaq = {
  eyebrow: "Questions",
  title: "Insurance questions, answered",
  subLead: "Prices, plans and how your cover works.",
  subLink: "Chat on WhatsApp",
  subTail: "if yours isn't here.",
  guide: { lead: "Not sure you need cover? Read", label: "our guide", path: "/blog/health-insurance-for-visiting-nigeria" },
  items: [
    {
      q: "How much is health insurance for visiting Nigeria?",
      a: "Omanga's travel health insurance for Nigeria costs $50 a month on Silver, $85 on Gold and $120 on Diamond, paid monthly for the months you're there.",
    },
    {
      q: "Who provides the insurance?",
      a: "Phillips HMO, a Nigerian health maintenance organisation (HMO). Your care runs through its hospital network.",
    },
    {
      q: "How does health insurance work in Nigeria?",
      a: "In Nigeria, health insurance usually runs through a health maintenance organisation (HMO), which works with a network of partner hospitals. Omanga's cover comes from Phillips HMO: you use the hospitals in your plan's category, and Phillips handles your care through its network.",
    },
    {
      q: "What's the difference between Silver, Gold and Diamond?",
      a: "Silver covers Category A hospitals, Gold Category A and B, and Diamond Category A, B and C. Gold adds a private ward, enhanced diagnostics, extended eye care and higher surgical limits. Diamond adds unlimited CT scans and the highest cover limits.",
    },
    {
      q: "Does Omanga insurance work outside Nigeria?",
      a: "No. Omanga insurance applies in Nigeria only. Your Omanga wallet works in 50+ African countries, but your insurance doesn't.",
    },
    {
      q: "Is this travel insurance?",
      a: "No. It covers your health while you're in Nigeria. It doesn't cover flights, luggage or cancelled trips.",
    },
    {
      q: "Do I need it to enter Nigeria?",
      a: "No. It isn't a visa or entry requirement. It's there for your health while you stay.",
    },
    {
      q: "How do I pay for my plan?",
      a: "Each plan is a monthly payment in US dollars, taken by Paystack when you buy it.",
    },
  ],
} as const;

export const healthClosing = {
  eyebrow: "Get started",
  title: "Your cover, sorted before you land",
  text: "Pick Silver, Gold or Diamond from $50 a month. Phillips HMO provides the cover while you're in Nigeria.",
  primary: { label: "Get insurance plan", path: "/insurance/plans" },
  secondary: { label: "Open your free wallet" },
  texture: { src: "/photos/home/rates-mountains.jpg" },
  screen: {
    kind: "rows",
    title: "Your cover",
    rows: [
      ["Plan", "Gold"],
      ["Hospitals", "Category A + B"],
      ["Price", "$85 / month"],
    ],
  } satisfies FeatureScreen,
} as const;
