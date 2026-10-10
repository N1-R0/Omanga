import { WALLET_URL } from "@/config/site";
import { HERO_PRIMARY_ACTION } from "@/content/hero.content";
import { insuranceFaqContent } from "@/content/insurance-faq.content";
import { insurancePlansContent } from "@/content/insurance-plans.content";
import { paymentsFaqContent } from "@/content/payments-faq.content";
import { servicesContent } from "@/content/services.content";
import { howItWorksContent } from "@/content/how-it-works.content";
import { whyOmangaContent } from "@/content/why-omanga.content";
import { coverageContent } from "@/content/coverage.content";
import { ctaContent } from "@/content/cta.content";
import { solutionsContent } from "@/content/solutions.content";
import { trustContent } from "@/content/trust.content";
import { COUNTRIES_SERVED_DISPLAY, PRIMARY_CTA } from "@/content/site.content";

/**
 * Home v2 — content for the redesigned home sections. Some are live on `/`
 * (steps, comparison, FAQ, closing panel); the rest wait to be placed.
 *
 * Section order and layouts are the picks from design-lab/home-layouts.html
 * (2026-10-09): N1 header, H1 hero, T3 partners, P1 products, F2 features,
 * B3 statement, S4 steps, C3 coverage, W1 comparison, R5 collage, Q1 FAQ,
 * X1 closing panel, Z3 footer. Insurance plans were skipped on purpose.
 *
 * Copy is reused from the approved content modules wherever a section says the
 * same thing, so v2 cannot drift from what the CEO signed off. Strings
 * written fresh for v2 are marked [NEW] and need the team's review
 * before they go live.
 *
 * The no-card rule (FORBIDDEN_COPY_TERMS) still applies: the only "card" here
 * is the traveller's home bank card in the comparison, which is approved copy.
 *
 * `object` is a file name in public/3d/web (512px WebP). The 2048px PNG
 * masters sit beside them in public/3d.
 */

export type Object3D =
  | "africa-continent" | "airplane" | "boarding-pass" | "card-declined"
  | "coin-dollar" | "coin-naira" | "coin-pound" | "coin-stack" | "coin-omanga"
  | "exchange" | "globe" | "heart-pulse" | "insurance-kit" | "location-pin"
  | "passport-pay" | "passport-stamped" | "phone-app" | "question-bubble"
  | "shield-check" | "sparkle-gold" | "sparkle-pink" | "speech-stars"
  | "success-check" | "suitcase" | "wallet-closed" | "wallet-open";

export const HOME_V2_IDS = {
  hero: "v2-hero-heading",
  partners: "v2-partners-heading",
  products: "v2-products-heading",
  features: "v2-features-heading",
  statement: "v2-statement-heading",
  steps: "v2-steps-heading",
  coverage: "v2-coverage-heading",
  comparison: "v2-comparison-heading",
  collage: "v2-collage-heading",
  faq: "v2-faq-heading",
  closing: "v2-closing-heading",
} as const;

export const homeV2Content = {
  hero: {
    // [NEW, 2026-10-09] Wise-style statement: short enough to set huge in two
    // or three lines. The approved h1 stays as the line underneath, so nothing
    // it claimed is lost.
    heading: "Pay and stay covered across Africa",
    intro:
      "Travel Africa with a customized payment solution and one insurance plan.",
    primary: { ...HERO_PRIMARY_ACTION, href: WALLET_URL, isExternal: true },
    payments: {
      title: "Omanga Payments",
      // Facts from the approved Payments FAQ and features: six currencies,
      // three funding currencies, 50+ countries.
      body: `Hold six currencies, fund from USD, GBP or CAD, and spend in ${COUNTRIES_SERVED_DISPLAY} African countries.`,
      link: { label: "Explore payments", href: "/payments" },
      widgetLabel: "Your wallet",
      // The same sample balances the Payments page's account drawer uses, so
      // the two pages never show different "example" numbers.
      accounts: [
        { code: "NGN", name: "Nigerian Naira", balance: "₦1,240,500", flag: "/flags/nigeria.svg" },
        { code: "USD", name: "US Dollar", balance: "$3,180.42", flag: "/flags/united-states.svg" },
        { code: "GBP", name: "British Pound", balance: "£745.20", flag: "/flags/united-kingdom.svg" },
        { code: "CAD", name: "Canadian Dollar", balance: "C$960.00", flag: "/flags/canada.svg" },
      ],
      sampleNote: "Example balances",
      action: { label: "Open your wallet", href: WALLET_URL },
    },
    insurance: {
      title: "Omanga Holiday Insurance",
      body: "Short-term health cover for your trip from established Nigerian providers. Cover starts in about five minutes.",
      link: { label: "Explore insurance", href: "/insurance" },
      widgetLabel: "Choose your plan",
      // Prices, hospital access and inclusions come straight from the plans
      // module, so the hero can't quote a stale price.
      plans: insurancePlansContent.plans,
      billingPeriod: insurancePlansContent.billingPeriod,
      accessLabel: insurancePlansContent.accessLabel,
      defaultPlan: "Gold",
    },
  },

  partners: {
    label: trustContent.label,
    logos: trustContent.partners,
  },

  products: {
    heading: solutionsContent.heading,
    items: [
      {
        name: "Omanga Payment Solutions",
        body: "A global multi-currency wallet that lets you hold, manage, send and receive multiple currencies on a single platform.",
        link: { label: "Explore payments", href: "/payments" },
        object: "phone-app",
        tone: "brand",
      },
      {
        name: "Omanga Holiday Insurance",
        body: "Short-term health cover for your trip, underwritten by established Nigerian providers, in three plans.",
        link: { label: "Explore insurance", href: "/insurance" },
        object: "insurance-kit",
        tone: "blush",
      },
    ],
  },

  features: {
    eyebrow: servicesContent.eyebrow,
    heading:
      "From funding your wallet before you fly to reaching a clinic mid-trip",
    items: servicesContent.services.map((item, index) => ({
      heading: item.heading,
      body: item.body,
      link: item.action,
      object: (["wallet-closed", "exchange", "heart-pulse"] as const)[index],
    })),
  },

  statement: {
    eyebrow: "Why we exist",
    heading: solutionsContent.heading,
    body: solutionsContent.intro[0],
  },

  steps: {
    heading: howItWorksContent.heading,
    intro: howItWorksContent.intro,
    items: howItWorksContent.steps.map((step, index) => ({
      id: step.id,
      heading: step.heading,
      body: step.body,
      object: (["coin-stack", "shield-check", "location-pin"] as const)[index],
    })),
    action: PRIMARY_CTA,
  },

  coverage: {
    eyebrow: coverageContent.eyebrow,
    heading: coverageContent.heading,
    intro: coverageContent.intro,
    flags: coverageContent.flags,
    action: coverageContent.action,
  },

  comparison: {
    heading: whyOmangaContent.heading,
    intro: whyOmangaContent.intro,
    groups: whyOmangaContent.groups,
  },

  collage: {
    // [NEW] No testimonials exist yet, so this is a photo band with a claim
    // the business can stand behind, not invented quotes. Swap in real reviews
    // when the team has them.
    heading: "Made for travellers moving across Africa",
    intro: `One account for spending and health cover in ${COUNTRIES_SERVED_DISPLAY} African countries.`,
    photos: [
      { src: "/service-spend.jpg", alt: "A traveller using the Omanga app on a city street." },
      { src: "/explore africa.jpg", alt: "" },
      { src: "/person-wearing-colorful-fashion.jpg", alt: "" },
      { src: "/service-currency.jpg", alt: "" },
      { src: "/get-started-friends.jpg", alt: "Friends together on a trip." },
      { src: "/spend more.jpg", alt: "" },
      { src: "/insurance-care-handshake.jpg", alt: "" },
      { src: "/payments-app-colour.jpg", alt: "" },
    ],
  },

  faq: {
    heading: "Frequently asked questions",
    // The "Can't find your answer? Contact us" line is FAQ_HELP in site.content.
    // The top questions a first-time visitor has, from the two approved FAQs.
    items: [
      paymentsFaqContent.items[0],
      insuranceFaqContent.items[0],
      paymentsFaqContent.items[1],
      paymentsFaqContent.items[2],
      insuranceFaqContent.items[3],
      insuranceFaqContent.items[2],
    ],
  },

  closing: {
    heading: ctaContent.heading,
    intro: ctaContent.intro,
    action: { ...HERO_PRIMARY_ACTION, href: WALLET_URL, isExternal: true },
  },
} as const;
