/**
 * Insurance `/insurance` (was `/health-cover`). Structure: research-and-page-structure.md § 6.3.
 * Sections are built one at a time, hero first (2026-10-23).
 *
 * Still open: exclusions, waiting period, age limits, pre-existing
 * conditions, what hospital categories A, B and C mean, and named hospitals
 * (§ 8.4). Nothing here states them.
 */

import { type FeatureScreen, homePrices } from "@/new-redesign/content/home.content";

/**
 * 1 · Hero (owner, 2026-10-23): the wallet hero's layout. Centred H1, sub,
 * one filled action, then the crimson fabric box. The visual inside the box
 * is planned next, so the box is empty for now.
 *
 * The H1 is the live page's SEO heading (keyword pass 2026-10-18), not the
 * plan's "Health cover for your trip to Nigeria". The sub restates approved
 * facts: Phillips HMO, from $50 a month, Nigeria only, hospital care,
 * diagnostics and emergency evacuation.
 */
export const healthHero = {
  title: ["Travel health insurance", "for your trip to Nigeria"],
  sub: "Short-term cover from Phillips HMO while you're in Nigeria, from $50 a month. Hospital care, diagnostics and emergency evacuation included.",
  // Owner, 2026-10-23: was "Compare health plans" (the site-wide label).
  primary: { label: "Get insurance plan", path: "/insurance/plans" },
  /**
   * How cover works, as one 20s loop (Jitter "Omanga · Health cover hero",
   * owner's storyboard 2026-10-23): pick Gold, checkout, payment confirmed,
   * then the dashboard with the ID card. Transparent, so it plays over the
   * box's live fabric. Reduced motion holds frame 864 (14.4s, the dashboard).
   */
  scene: { src: "/lottie/health-cover/how-it-works.json", stillFrame: 864 },
  // Owner, 2026-10-26: replaces the moving fabric. Unsplash z2BCD8Bgd9M by
  // Fabrizio Conti (Unsplash License), a deep blue mountain range, a sibling
  // of the Payments hero's ridges; self-hosted, not used anywhere else on the
  // site. Tried and dropped the same day: a pale misty photo (read almost
  // white) and the Payments ridges themselves (owner asked for another).
  // Decorative.
  photo: { src: "/photos/insurance/hero-range.jpg", position: "50% 70%" },
} as const;

/**
 * 1b · Proof strip (owner, 2026-10-26): the Payments page's four-fact strip,
 * under the hero, with insurance facts. All four are approved site facts:
 * the prices (Paystack pages), Phillips HMO and its network, emergency
 * evacuation on Silver and so on every plan (`homePrices.plans`), and
 * telemedicine and roaming on every plan (the home plans footnote).
 */
export const healthProof = {
  label: "Insurance facts",
  items: [
    { title: "From $50 a month", text: "Three plans, paid monthly for the months you're in Nigeria." },
    { title: "Provided by Phillips HMO", text: "Your care runs through its hospital network in Nigeria." },
    { title: "Emergency evacuation", text: "Included on every plan, with hospital care and diagnostics." },
    { title: "Telemedicine included", text: "Every plan also covers telemedicine and roaming across Nigeria." },
  ],
} as const;

/**
 * 2 · What this is and isn't (owner wireframe, 2026-10-23). Fixes the audit's
 * search-intent mismatch: people looking for travel insurance out of Nigeria
 * land here. The "is" lines and the first "isn't" line are approved site copy
 * (Nigeria only, monthly, Phillips HMO's own network, the
 * FAQ's "works outside Nigeria" answer). The flights/luggage line and the
 * entry-requirement line were confirmed by the owner on 2026-10-23.
 */
export const healthScope = {
  eyebrow: "What this is",
  // [CHANGED, 2026-10-26] Owner naming: "Insurance", not "Health cover".
  title: "Insurance for your time in Nigeria",
  sub: "Short-term cover from Phillips HMO, paid monthly for the months you're there.",
  // Owner, 2026-10-23: a button under the header.
  action: { label: "Compare insurance plans", path: "/insurance/plans" },
  is: {
    title: "What it is",
    items: [
      { title: "Hospital care in Nigeria", text: "Admission, diagnostics and emergency evacuation while you're in the country." },
      // [CHANGED, 2026-10-26] "No commitment. Cancel any time." is out until
      // confirmed (§ 8.1). Monthly is confirmed: the Paystack checkouts are
      // monthly subscriptions.
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

/**
 * 3 · Choose your plan (owner pick 2026-10-26: Vercel's pricing section,
 * Mobbin 1671eb10). The plans are the home page's (`homePrices.plans`), one
 * source for names, prices, hospital categories and benefits, all approved
 * and matched to the Paystack pages (config/site.ts PLAN_CHECKOUT_URLS).
 * "Cancel any time" stays out (§ 8.1). The shared benefits are section 4, so
 * the panel's foot only points to the full comparison.
 */
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

/**
 * 4 · What every plan includes (owner pick 2026-10-26: Superpower Health
 * Gap's grouped panel, Mobbin 0fa649f3). The eight items are the shared
 * benefits only: Silver's five (every plan has them, since Gold and Diamond
 * are "Everything in Silver, plus") and the home plans footnote's three
 * (telemedicine, roaming across Nigeria, the app). Lines explain each item
 * in plain words without adding limits or promises; nothing on claims,
 * exclusions or which hospitals (§ 8.4). "The app" is worded as the Omanga
 * account, since the native app hasn't shipped.
 */
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

/**
 * 7 · Insurance questions (owner, 2026-10-26: the Payments FAQ's UI). § 5
 * and § 6 were dropped, so "who provides it" and "how care works" are
 * answered here. Every answer is approved copy, reworded only for the owner's
 * naming ("insurance", not "health cover"):
 *   - prices and monthly Paystack payments in US dollars (config/site.ts
 *     PLAN_CHECKOUT_URLS, read 2026-09-20);
 *   - Nigeria only, how HMOs work, Phillips HMO (home FAQ);
 *   - not travel insurance, not an entry requirement (§ 2, owner 2026-10-23);
 *   - plan differences (`homePrices.plans`).
 * "No commitment, cancel any time" stays out until confirmed (§ 8.1).
 */
export const healthFaq = {
  eyebrow: "Questions",
  title: "Insurance questions, answered",
  subLead: "Prices, plans and how your cover works.",
  subLink: "Chat on WhatsApp",
  subTail: "if yours isn't here.",
  items: [
    {
      q: "How much is travel insurance for Nigeria?",
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

/**
 * 8 · Closing band (owner, 2026-10-26: the Payments closing UI). "Get
 * insurance plan" is the hero's action, so the page opens and closes on it;
 * the wallet is the text link. The panel uses the home mountain photo, as
 * Payments does (owner, 2026-10-25: container images are mountains). The
 * screen is an illustrative Gold plan with approved figures only.
 */
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
