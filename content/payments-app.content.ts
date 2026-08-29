import { WALLET_URL } from "@/config/site";
import type { CallToAction, ImageAsset } from "@/types/content.types";

/**
 * The Omanga mobile app — spec § 6.
 *
 * The benchmark's "Download the app" band. Omanga's app is pre-launch, so the
 * band announces rather than converts: the job — putting the product in the
 * visitor's pocket — is the same, and only the ending changes, because the
 * honest version of this section cannot end in a store badge.
 *
 * ---------------------------------------------------------------------------
 * [CONSTRAINT] EVERY CAPABILITY IS FUTURE TENSE, AND MUST STAY THAT WAY.
 *
 * Spec § 6: "the copy must be unambiguous that the app is not yet available.
 * Every capability is written in the future tense. Nothing implies a download
 * exists today."
 *
 * This is not stylistic. § 2 of the spec records it as a **P0 defect** that the
 * live site's FAQ answers "Is there a mobile app?" with "Yes — the Omanga mobile
 * app lets you manage your wallet, card, and insurance policy, and file claims on
 * the go." That answer and this band cannot both ship: "Shipping both statements
 * is a credibility failure on a payments product, and a Google quality-rater
 * flag." The FAQ is not in this repository, so this band cannot fix it —
 * **correct the live FAQ in the same release.**
 *
 * ---------------------------------------------------------------------------
 * [CHANGED from spec] The waitlist is gone.
 *
 * § 6's action is `Join the app waitlist`, and the spec leans on it hard: it is
 * "the page's one lead-capture mechanism, absorbing the role of the benchmark's
 * closing form." Removed on instruction, along with its helper line ("One email
 * when it's live. Nothing else.") and the matching control in § 7.
 *
 * What that costs, stated plainly: the page now captures nothing. A visitor who
 * wants the app and is not ready for the wallet has no way to be told when it
 * launches, and no way to be contacted again. Every other control on the page
 * sends them off-site to the wallet. If launch notification matters, this is the
 * band that was going to do it.
 *
 * The web-app link stays, and it is doing specific work the spec is explicit
 * about: without it, this section "actively costs conversions" by inviting a
 * come-back-when-it-ships bounce. It is now the band's only control, and it is a
 * button rather than a text link — with the store slots gone it has to hold the
 * position the reference gives its two badges, and a bare underlined link in that
 * much white space reads as a footnote.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] The store slots are gone, and so is the eyebrow.
 *
 * The band was carrying two inert `iOS — coming soon` / `Android — coming soon`
 * chips where the reference puts its badges. Removed on instruction.
 *
 * Nothing is lost from the *claim* — the heading now says "coming soon" outright,
 * which is a plainer statement of the same fact than two disabled chips were, and
 * the spec's requirement is that the copy be unambiguous rather than that any
 * particular element carry it. The eyebrow went with them: it read "Coming soon"
 * directly above a heading that now says the same thing.
 *
 * What is lost is the platform detail. The band no longer says the app is coming
 * to iOS *and* Android, only that it is coming. If both platforms at launch is a
 * claim worth making, the heading or the paragraph is now the only place to make
 * it.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] The copy is cut to the reference's length.
 *
 * It was a heading and two paragraphs — six lines in a narrow column beside a
 * photograph, where the reference runs a short heading and two lines. Cut to one
 * heading and one paragraph on instruction.
 *
 * The capability list went in the cut: "send and receive money, hold and switch
 * between currencies, review your full transaction history and track your travel
 * spending". Every item on it is already stated in § 4 and § 5, which is why it
 * was the safe half to lose. What is kept is the half that was doing work nothing
 * else does — the browser redirect, which is the line the spec says this section
 * cannot afford to be without.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED from spec] Card mentions struck.
 *
 * § 6's heading is "Your wallet, your card, your whole trip — soon in your
 * pocket" and its capability list includes "access your Omanga card". Both go,
 * for the reason in the page header note. The heading has since been rewritten
 * entirely and the list cut, so neither survives in any form — recorded because
 * the spec still reads that way and a later editor working from it would
 * reintroduce both.
 */

export type PaymentsAppContent = {
  /**
   * Carries the "coming soon" statement itself, now that no eyebrow and no
   * store slot does. It is the section's one required claim, so it must not be
   * reworded into something that merely implies the app is unreleased.
   */
  readonly heading: string;
  /** One short paragraph. The second sentence is doing the CRO work. */
  readonly body: string;
  readonly action: CallToAction;
  readonly image: ImageAsset;
};

export const paymentsAppContent: PaymentsAppContent = {
  heading: "The Omanga app is coming soon",
  body: "Your whole account, in your pocket — wallet, currencies and spending, from anywhere the trip takes you. Everything Omanga does today already works in your browser.",
  /*
    [CHANGED, 2026-08-29] `primary`, not `secondary` — the brand fill.

    `Button` resolves `primary` on a light surface to `bg-brand` with a white
    label, which is the brand colour asked for here. It is also the correct
    hierarchy now rather than an override of it: with the store slots gone this is
    the band's only control, and an outlined pill alone in a third of a
    viewport-tall section reads as an afterthought.

    It does mean the page carries a second brand-filled button outside the closing
    band. The one it competes with is the hero's `Open Your Free Wallet`, which
    goes to the same destination — so the duplication is in emphasis, not in
    direction, and both press toward the same place.
  */
  action: {
    label: "Use the web app",
    href: WALLET_URL,
    isExternal: true,
    emphasis: "primary",
  },

  /**
   * [CHANGED, 2026-08-29] The pocket photograph is replaced by this one, and the
   * frame turns portrait with it.
   *
   * That is the substantive difference rather than a swap of one picture for
   * another. The band is 100dvh at desktop and its media cell is two thirds of
   * the width — a landscape source in a box that tall is cropped hard top and
   * bottom, and the previous photograph lost most of the jacket. A portrait
   * source fills the same box with almost no crop, so the composition that was
   * shot is close to the composition that renders.
   *
   * Below desktop the relationship inverts: the band stacks and the media cell
   * becomes wide and short, so this one is cropped there instead. The phone sits
   * near the centre of the frame and survives both.
   *
   * [RE-EXPORTED] Supplied as a 74MB, 12288 × 16384 PNG named `Free iPhone mockup
   * on multicolored background (Mockuuups Studio).png`. Re-exported to
   * 1800 × 2400 JPEG at 193KB and renamed per coding-guidelines.md § File naming.
   *
   * The original was removed rather than left beside it, for the reason the last
   * one was: a file that size is permanent once it reaches git history, and this
   * is the second 70MB-plus PNG to arrive in `public/` in one session. **Export
   * at the size the page renders before adding an asset** — the design tool's
   * default is 8K or larger and nothing on this site needs it.
   *
   * `payments-app-pocket.jpg` was deleted in the same change. It had one
   * consumer, this line, and an unreferenced 527KB photograph is dead weight.
   *
   * ---------------------------------------------------------------------------
   * [BLOCKER, unchanged] The phone screen still renders card language.
   *
   * The transaction rows read "Card unlocked via app" and "Card locked via app",
   * and both are labelled "Metal Card" — a tier Omanga does not offer. This band's
   * copy has had its card mentions struck, so the photograph contradicts the
   * paragraph beside it.
   *
   * It is more legible here than in the pocket shot: the phone is straight-on and
   * larger in frame. Both this and `payments-image.content.ts` are fixed by the
   * same single change — one render of the real wallet view.
   */
  image: {
    src: "/payments-app-colour.jpg",
    alt: "The Omanga app open on a phone resting on panels of coloured glass.",
    width: 1800,
    height: 2400,
  },
} as const;

export const PAYMENTS_APP_HEADING_ID = "payments-app-heading" as const;
