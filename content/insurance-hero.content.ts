// [CHANGED, 2026-10-10] Copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged.
import { INSURANCE_PLANS_HREF } from "@/content/insurance.content";
import type { CallToAction, Eyebrow } from "@/types/content.types";

/**
 * Insurance hero — spec § 2.
 *
 * The page's only `h1`. It is the one heading the SEO section names twice
 * (§ 11.1 and § 11.2), so it is transcribed exactly.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] One call to action, not two.
 *
 * `Open Free Account` is removed and the primary is relabelled from `Compare
 * Insurance Plans` to `View Insurance Plans`.
 *
 * Both changes resolve things that were already flagged here. The removed
 * secondary was the site's third label for one action — the homepage said "Open
 * Your Free Wallet", this said "Open Free Account", the header says "Get
 * Started" — and the note that used to sit at the top of this file asked for one
 * decision rather than two labels. Taking it off this hero is that decision for
 * this page: an insurance visitor is here for cover, and the wallet sign-up is
 * still reachable from the header on every screen, so no path is lost.
 *
 * The relabel is the smaller half and the more useful one. "Compare" describes
 * what the visitor does on arrival at `/plans`; "View" describes where the
 * button goes. The destination is a page of plans, and an anchor that names its
 * destination is what the SEO expectations ask of every link on this site.
 */

export type InsuranceHeroContent = {
  readonly eyebrow: Eyebrow;
  readonly heading: string;
  readonly intro: string;
  /** Sits below the button. Not a caption and not a legal line. */
  readonly helper: string;
  /**
   * Exactly one.
   *
   * [CHANGED] Was `readonly [CallToAction, CallToAction]`. A tuple of two was
   * the right shape while both heroes carried a primary and a ghost; both now
   * carry one, so a tuple would be a two-slot container permanently holding one
   * value. `design.md` § Component consistency permits one primary per section
   * and this is it, which makes a single field the honest type — a second action
   * is now a design decision that has to change this line, rather than an empty
   * slot anyone can quietly fill.
   */
  readonly action: CallToAction;
};

export const insuranceHeroContent: InsuranceHeroContent = {
  eyebrow: "Omanga Holiday Insurance",
  // [CHANGED, 2026-10-14] UX copy pass: cover applies in Nigeria only, so the
  // h1 names Nigeria, not Africa. Who, what, where and price now sit in the hero.
  // [CHANGED, 2026-10-18] Semrush keyword pass (design-lab/copy-seo-review-2026-10-18.md): adds "travel", matching
  // "travel health insurance in nigeria" and the page title.
  heading: "Travel health insurance for your trip to Nigeria",
  intro:
    "Short-term health cover from Phillips HMO for tourists, Nigerians living abroad and anyone visiting Nigeria. Plans cost $50 to $120 a month and cover hospital admission, diagnostics and emergency evacuation in Nigeria.",
  helper: "No commitment. Cancel any time.",
  action: {
    // [CHANGED, 2026-10-14] UX copy pass: the site-wide label for /plans.
    label: "Compare health plans",
    href: INSURANCE_PLANS_HREF,
    emphasis: "primary",
  },
} as const;

/** Shared so the `h1` and the section's `aria-labelledby` cannot drift apart. */
export const INSURANCE_HERO_HEADING_ID = "insurance-hero-heading" as const;

/**
 * [ADDED, 2026-10-15] Content for the photo hero (`PhotoHero`, the home
 * page's layout, owner request). The h1 is unchanged (SEO § 11). The intro is
 * cut to one short line so the actions stay above the fold; it restates the
 * approved intro's facts only, but is [NEW] copy and needs sign-off. The full
 * intro above stays for reference until it is signed off.
 *
 * Photo: a woman with crossed arms raised against a plain blue sky
 * (Unsplash ZYV7qZNe5wY, free licence), chosen to match the home photo.
 * Self-hosted at public/insurance-hero-sky.jpg.
 */
export const insurancePhotoHeroContent = {
  heading: insuranceHeroContent.heading,
  intro:
    "Short-term cover from Phillips HMO, from $50 a month. Hospital care, diagnostics and emergency evacuation included.",
  helper: insuranceHeroContent.helper,
  actions: [insuranceHeroContent.action],
  image: {
    src: "/insurance-hero-sky.jpg",
    alt: "",
    width: 2400,
    height: 1594,
  },
} as const;
