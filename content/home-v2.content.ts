import { WALLET_URL } from "@/config/site";
import { HERO_PRIMARY_ACTION } from "@/content/hero.content";
import { insuranceFaqContent } from "@/content/insurance-faq.content";
import { paymentsFaqContent } from "@/content/payments-faq.content";
import { howItWorksContent } from "@/content/how-it-works.content";
import { whyOmangaContent } from "@/content/why-omanga.content";

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
  steps: "v2-steps-heading",
  comparison: "v2-comparison-heading",
  faq: "v2-faq-heading",
  closing: "v2-closing-heading",
} as const;

export const homeV2Content = {





  steps: {
    heading: howItWorksContent.heading,
    intro: howItWorksContent.intro,
    items: howItWorksContent.steps.map((step) => ({
      id: step.id,
      heading: step.heading,
      body: step.body,
      // [CHANGED, 2026-10-15] No 3D object: each step shows an app screen
      // instead (Norma layout, owner pick). Screens live in StepsV2.
    })),
    // [CHANGED, 2026-10-15] Norma's closing line ("Or start a scan from …")
    // as the three funding currencies, a confirmed fact. It replaces the
    // section's button: the hero and closing panel already carry the wallet CTA.
    fundFrom: {
      label: "Fund your wallet from",
      currencies: [
        { code: "USD", flag: "/flags/united-states.svg" },
        { code: "GBP", flag: "/flags/united-kingdom.svg" },
        { code: "CAD", flag: "/flags/canada.svg" },
      ],
    },
  },


  comparison: {
    heading: whyOmangaContent.heading,
    intro: whyOmangaContent.intro,
    groups: whyOmangaContent.groups,
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
      // [CHANGED, 2026-10-14] Price replaces "How quickly does cover start?"
      // until the waiting period is confirmed (design.md § Copy to-do).
      insuranceFaqContent.items[1],
      insuranceFaqContent.items[2],
    ],
  },

  closing: {
    // [CHANGED, 2026-10-14] Home-only copy; the shared ctaContent still reads
    // "Ready to experience Africa?" on other pages until their pass.
    heading: "Land with everything sorted",
    intro: "Open your free wallet, add health cover, and arrive in Nigeria with both ready.",
    action: { ...HERO_PRIMARY_ACTION, href: WALLET_URL, isExternal: true },
  },
} as const;
