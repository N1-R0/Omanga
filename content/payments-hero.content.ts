import { WALLET_URL } from "@/config/site";
import { COUNTRIES_SERVED_DISPLAY, PAYMENTS_RATES_ANCHOR } from "@/content/site.content";
import type { CallToAction, Eyebrow } from "@/types/content.types";

/**
 * Payments hero — spec § 2.
 *
 * The page's only `h1`, and the one heading the SEO section names twice
 * (§ 11.1 and § 11.2).
 *
 * ---------------------------------------------------------------------------
 * [CHANGED from spec] The headline loses the card.
 *
 * Spec § 2 writes it as *"One multi-currency wallet and card for travel across
 * Africa"* and counts the card as one of the three primary keywords the H1
 * carries. It cannot ship: `site.content.ts` forbids the term, the approved
 * copy's tracked changes struck every card claim, and Omanga issues no card.
 *
 * Struck rather than substituted. There is no synonym here — a headline naming
 * some other instrument would be inventing a product, which is the one thing
 * § 1 of the spec forbids outright. What survives is the wallet, which is the
 * thing that actually exists, and the two primary terms attached to it
 * (*multi-currency wallet*, *Africa*). At 49 characters it is shorter than the
 * spec's 62 and still breaks correctly against the 28ch hero measure.
 *
 * The intro carries the spend claim instead, in the confirmed construction:
 * spend *from your balance*, naming no instrument. See the page's own header
 * note for why "wherever cards are accepted" is not available as a fallback.
 */

export type PaymentsHeroContent = {
  readonly eyebrow: Eyebrow;
  readonly heading: string;
  readonly intro: string;
  /** Exactly one. See `InsuranceHeroContent` for why this is not a tuple. */
  readonly action: CallToAction;
};

export const paymentsHeroContent: PaymentsHeroContent = {
  eyebrow: "Omanga Payment Solutions",
  /*
    [CHANGED, 2026-10-10] The owner's own copy, shortened for the flood hero
    (three-line headline, two-line intro, matching the Y6 reference). The original headline was "One
    multi-currency wallet for travel across Africa"; "multi-currency" moves
    into the intro. The helper line ("No minimums. No hidden fees…") is
    removed on instruction.
  */
  heading: "One wallet for all your travel money across Africa",
  intro: `Hold, send and convert six currencies at mid-market rates, and spend in ${COUNTRIES_SERVED_DISPLAY} African countries, all in one account.`,

  /*
    [DRIFT, narrowed] The site had three labels in circulation for one action:
    "Open Your Free Wallet" on the homepage hero, "Open Free Account" on the
    insurance hero, and "Get Started" on the header. Confirmed 2026-08-29:
    "Open Your Free Wallet" is the label for now. The insurance hero's competing
    version has since been removed outright, so two of the three are gone.

    Spec § 2 requires the closing CTA to repeat this verbatim — same label, same
    weight, same destination — so the page has one conversion journey with two
    entry points. That is still the plan for § 9.

    [PLANNED] It becomes "Download Omanga app" once the app ships. That is a
    change to the label and the destination together, and both live here.
  */
  action: {
    label: "Open your free wallet",
    href: WALLET_URL,
    isExternal: true,
    emphasis: "primary",
  },
} as const;

/*
  [REMOVED, 2026-08-29] The ghost secondary, `See how it works`, and the
  `PAYMENTS_BENEFITS_ANCHOR` constant it pointed at.

  Spec § 2 adds that control deliberately — it "gives a not-yet-ready visitor
  something to do other than bounce, without leaking traffic off the page" — so
  this is a departure from the spec rather than a tidy-up, made on instruction.

  The anchor constant went with it because nothing else referenced it. § 5 does
  not need an `id` nobody links to, and an exported constant with no consumer is
  the kind of thing that gets wired back up by accident. If a jump link to the
  Without/With band is ever wanted, both halves come back together.
*/

/** Shared so the `h1` and the section's `aria-labelledby` cannot drift apart. */
export const PAYMENTS_HERO_HEADING_ID = "payments-hero-heading" as const;

/*
  [ADDED, 2026-10-10] Payments hero — Wise's "phone over traveller photo"
  (Y6, Mobbin section 622fd829), picked by the owner. Adds the second button,
  the photo, and the sample account the phone mockup shows.
*/
export const paymentsHeroSecondary: CallToAction = {
  label: "See today's rates",
  href: `#${PAYMENTS_RATES_ANCHOR}`,
  isExternal: false,
  emphasis: "secondary",
};

/** Sits above the store badges: the app is not listed in either store yet. */
export const paymentsHeroStoreLabel = "Coming soon";

export const paymentsHeroPhoto = {
  src: "/person-wearing-colorful-fashion.jpg",
  alt: "A smiling traveller in a straw hat and a peach suit, relaxing by a pool.",
} as const;

export type AppHomeTransaction = {
  readonly title: string;
  readonly detail: string;
  readonly amount: string;
  readonly secondary?: string;
  /** A named payee shows initials; everything else shows the kind's glyph. */
  readonly initials?: string;
  readonly kind: "in" | "out" | "convert";
};

export type AppHomeSample = {
  readonly firstName: string;
  /** Formatted, without the symbol, whole naira as the app shows it: "412,560". */
  readonly balance: string;
  readonly transactions: readonly AppHomeTransaction[];
};

/**
 * Illustrative only — a traveller who funded in dollars and is spending in
 * naira. Amounts sit near a believable mid-market rate but are not live.
 */
export const appHomeSample: AppHomeSample = {
  firstName: "Ada",
  balance: "412,560",
  transactions: [
    { title: "USD to NGN", detail: "10 Oct, 9:14am", amount: "+₦153,200", secondary: "−$100", kind: "convert" },
    { title: "Kofi Mensah", detail: "9 Oct, 6:52pm", amount: "−₦45,000", initials: "KM", kind: "out" },
    { title: "Bank transfer", detail: "6 Oct, 11:03am", amount: "+₦80,000", kind: "in" },
  ],
};
