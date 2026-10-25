import { WALLET_URL } from "@/config/site";
import type { CallToAction } from "@/types/content.types";

/**
 * Hero content.
 *
 * Every user-facing string is verbatim from the CEO-approved copy document,
 * § 2 · Hero Section, with NJ's tracked changes accepted.
 *
 * The tracked changes matter here more than anywhere else on the page. The
 * headline before NJ's edit read "Travel Africa with one card and one insurance
 * plan"; accepting the change replaces "one card" with "a customized payment
 * solution". That is the single most important edit in the document — the whole
 * no-physical-card rule descends from it — and rejecting it would reintroduce
 * the claim in the page's `h1`.
 *
 * ---------------------------------------------------------------------------
 * [REDESIGNED] The hero band is now the headline, the actions and the helper
 * line. Two fields are gone from this module:
 *
 *   eyebrow  "Payments & insurance for African travel"
 *   intro    "Fund your Omanga wallet in USD, GBP or CAD, spend across 43
 *             African countries, and add short-term health cover before you fly."
 *
 * The reference's hero band contains its `h1` and nothing else, and a headline
 * with a pill above it and a paragraph below it is a section rather than a hero.
 * See `HeroContent` for the full reasoning.
 *
 * Neither string is lost. `intro` is the page's meta description verbatim
 * (`app/(redesign)/page.tsx`), and the Solutions Overview immediately beneath
 * the hero opens with two paragraphs covering the same ground — so nothing that
 * was indexed has been removed from the document.
 */

/**
 * Destinations.
 *
 * [CHANGED] The primary no longer points at the marketing `/payments` page. The
 * wallet is issued off-site, so "Open Your Free Wallet" goes straight to the
 * sign-up at `WALLET_URL` and carries `isExternal`, which adds `target` and
 * `rel` at render time.
 *
 * The URL itself lives in `config/site.ts`; it is not typed here, because it is
 * also the header's and the closing band's destination and three copies of a URL
 * is three places for it to be wrong.
 */
/**
 * Exported because a second section now uses it: the Get Started page's closing
 * band takes this exact action rather than the site's `Get Started` primary,
 * which on that page would link to the page it sits on. One owner for the label
 * and the destination, so the two cannot drift.
 */
export const HERO_PRIMARY_ACTION: CallToAction = {
  label: "Open your free wallet",
  href: WALLET_URL,
  isExternal: true,
  emphasis: "primary",
} as const;

const SECONDARY_ACTION: CallToAction = {
  label: "Compare health plans",
  href: "/plans",
  emphasis: "secondary",
} as const;

export type HeroSectionContent = {
  readonly heading: string;
  /**
   * Exactly two actions, in hierarchy order: primary first.
   *
   * A fixed-length tuple rather than an array, because the hero's CTA hierarchy
   * is the point — one primary and one de-weighted secondary. An array would
   * permit three buttons, or one, or none, and "one primary button per section"
   * would then be enforceable only by review.
   */
  readonly actions: readonly [CallToAction, CallToAction];
  /*
    [REMOVED, 2026-08-29] `helperText`, which read "No monthly fee. Set up in
    minutes."

    Removed from the type as well as from the value. Leaving the field optional
    would keep a slot that renders nothing, and the next person to open this
    module would have no way to tell a deliberate removal from a missing string.

    The claim itself is not retired — it is a product fact and belongs wherever
    plans and pricing are described. It is gone from the hero only, where the
    band is now the headline and its two actions.
  */
};

// Not exported: `heroPosterContent` below is what the page renders.
const heroContent: HeroSectionContent = {
  // [CHANGED, 2026-10-14] UX copy pass. The old h1 said "one insurance plan"
  // (there are three) and "customized" (nothing is). Cover is Nigeria only, so
  // the promise names Nigeria; the wallet's wider reach is said further down.
  heading: "Travel money and health cover for your trip to Nigeria",
  actions: [HERO_PRIMARY_ACTION, SECONDARY_ACTION],
} as const;

/**
 * The heading's id.
 *
 * Exported because two components need to agree on it exactly: `HeroContent`
 * renders the `h1` with this id, and `Hero` names its `section` with
 * `aria-labelledby` pointing at it. If they ever disagree the section loses its
 * accessible name, and nothing about that failure is visible on screen.
 */
/**
 * [ADDED, 2026-10-15] The Revolut-style poster hero (`HeroPoster`, owner pick:
 * mobbin section e936d541). The h1 is unchanged; this adds the short line under
 * it and the photo. The line restates approved facts only (funding currencies,
 * wallet countries, provider, Nigeria-only cover) but is [NEW] copy and needs
 * sign-off.
 *
 * Photo: a woman with her arms up against a deep blue sky (Unsplash, free
 * licence; owner pick "Q13", 2026-10-15, after "S10", "P16" and "P03"),
 * self-hosted at public/hero-arms-up.jpg.
 */
export const heroPosterContent = {
  /*
    [CHANGED, 2026-10-15] UX writing pass (owner's Material-based UX writing
    skill): short, benefit-led, both products named, two lines at display size.
    Was the full h1 "Travel money and health cover for your trip to Nigeria",
    which ran to four lines and pushed the actions below the fold. The keyword
    phrase still leads the <title>. Alternatives offered: "Your trip to
    Nigeria, sorted" and "Land in Nigeria ready".
  */
  heading: "Pay and stay covered in Nigeria",
  intro: "One free wallet for your travel money, plus health cover for your trip.",
  actions: heroContent.actions,
  image: {
    src: "/hero-arms-up.jpg",
    alt: "",
    width: 2400,
    height: 1600,
  },
} as const;

/**
 * [ADDED, 2026-10-18] The inset photo-card home hero (`HeroCard`, owner
 * wireframe "Desktop - 2"). Same copy; the photo is the insurance hero's
 * (public/insurance-hero-sky.jpg), reused on the owner's instruction.
 */
export const heroCardContent = {
  heading: heroPosterContent.heading,
  intro: heroPosterContent.intro,
  actions: heroPosterContent.actions,
  image: { src: "/insurance-hero-sky.jpg", alt: "" },
} as const;

export const HERO_HEADING_ID = "hero-heading" as const;
