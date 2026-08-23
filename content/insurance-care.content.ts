import { INSURANCE_PLANS_HREF } from "@/content/insurance.content";
import type { CallToAction, ImageAsset } from "@/types/content.types";

/**
 * How care works — spec § 6.3, promoted to its own section.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATION] The spec makes this a sub-block, not a section.
 *
 * § 6.3 sits inside "What each plan covers" as an `h3` reading "Reaching care
 * while you travel", beneath the comparison table and the inclusions list. The
 * supplied screenshot promotes it to a standalone band with its own image and
 * an `h2` reading "How care works" — which is § 6.3's *section name* in the
 * spec, the label above its sub-heading.
 *
 * Built as the screenshot shows it. Two consequences worth stating:
 *
 *   - § 11.2's heading hierarchy no longer holds. It counts six `h2`s and
 *     eight `h3`s; this makes seven and seven. Not a defect — the outline is
 *     still one `h1` and no level is skipped — but the SEO section's table is
 *     now out of date.
 *   - "Reaching care while you travel" is unused. It is the string § 11.2
 *     names, and it carries "while you travel" where "How care works" carries
 *     nothing. If the keyword matters more than the screenshot, that is a
 *     one-line change here.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATION] The spec gives this section no CTA, explicitly.
 *
 * § 6: "CTA: None. This section absorbs attention rather than diverting it —
 * MeetingsPro carries no CTA in its detail blocks either, and the approved
 * homepage document applies the same rule to its deep dive and Without/With
 * sections." `View plans` added on instruction.
 *
 * [DRIFT] Its label is a third variant. The page now says `Compare Insurance
 * Plans` (hero), `See what each plan covers` (§ 4), `View plans` (here) and
 * `Compare Plans` (§ 9) — four labels for one destination.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] Hospital categories are still undefined.
 *
 * The copy names which categories each tier opens but not what A, B and C mean.
 * Spec § 6 calls this "the highest-value fix in this section" and § 12 question
 * 2 is open. No definition is invented.
 *
 * ---------------------------------------------------------------------------
 * [RENAMED] The photograph arrived as `people-office-work-day.jpg`. Renamed to
 * `insurance-care-handshake.jpg` per coding-guidelines.md § File naming — the
 * supplied name describes a stock category rather than what the asset is for.
 *
 * [FLAGGED] It is 5466 × 7990 and 16.9MB — portrait, and roughly eight times
 * the width it is ever rendered at. Two consequences:
 *
 *   1. The band is landscape. A portrait source under `object-cover` is cropped
 *      to a horizontal strip through the middle of the frame, so most of the
 *      photograph is discarded and the framing is whatever happens to sit at
 *      the vertical centre. If the intended crop is the one in the screenshot,
 *      the asset should be re-exported already cropped rather than left to the
 *      browser to guess.
 *   2. § Image optimization: "Serve at the largest rendered size, not the source
 *      size. Re-export oversized assets." `next/image` resizes it so the browser
 *      never receives 16.9MB, but the repository does — the same note
 *      `get-started-image.content.ts` carries about its 27MB original.
 *
 * [QUESTION] It is an office handshake, not a care scene. The copy beside it is
 * about reaching a hospital through a local provider relationship; the
 * photograph shows a business greeting. It reads as "we have partners" rather
 * than "you will be admitted", which is the § 8 argument, not this one.
 * project-context.md § Design philosophy also commits to "real African
 * photography", and neither person here reads as African. Shipped as supplied;
 * raised for design.
 */

export type InsuranceCareContent = {
  readonly heading: string;
  readonly body: string;
  readonly action: CallToAction;
  readonly image: ImageAsset;
};

export const insuranceCareContent: InsuranceCareContent = {
  heading: "How care works",
  body: "Your plan is delivered through established Nigerian health providers with real hospital networks, so care is reached through a local relationship rather than a reimbursement claim filed from abroad. Hospital categories determine which facilities you can access: Silver and Gold open Category A and B, Diamond adds Category C.",
  action: {
    label: "View plans",
    href: INSURANCE_PLANS_HREF,
    emphasis: "primary",
  },
  /**
   * `alt` is deliberately empty.
   *
   * The paragraph beside it already states how care is reached, and the
   * photograph adds nothing a screen-reader user needs in order to act — so an
   * empty alt is a statement rather than an omission. If the asset is replaced
   * with one that carries an argument the copy does not make, it becomes
   * content and wants a descriptive alt.
   */
  image: {
    src: "/insurance-care-handshake.jpg",
    alt: "",
    width: 5466,
    height: 7990,
  },
} as const;

export const INSURANCE_CARE_HEADING_ID = "insurance-care-heading" as const;
