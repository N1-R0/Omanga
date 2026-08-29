import { INSURANCE_PLANS_HREF } from "@/content/insurance.content";
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
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
  heading: "Travel health insurance for Africa, sorted before you fly",
  intro: `Short-term health cover for the length of your trip, delivered through established Nigerian health providers with real hospital networks on the ground. Choose Silver, Gold or Diamond, and travel across ${COUNTRIES_SERVED_DISPLAY} African countries knowing that care is arranged, not improvised.`,
  helper: "Cover for your trip, not a year. Cancel anytime.",
  action: {
    label: "View Insurance Plans",
    href: INSURANCE_PLANS_HREF,
    emphasis: "primary",
  },
} as const;

/** Shared so the `h1` and the section's `aria-labelledby` cannot drift apart. */
export const INSURANCE_HERO_HEADING_ID = "insurance-hero-heading" as const;
