import type { ImageAsset } from "@/types/content.types";

/**
 * Our Impact — spec § 6.
 *
 * Three concrete commitments, and the page's one moment of human imagery.
 *
 * ---------------------------------------------------------------------------
 * The tab row ships, and § 6 left that open.
 *
 * § 6: "The tab row is genuinely optional at three items. If the design team
 * judges it redundant, drop the tabs and keep the three-card grid." The design
 * team's call is the tabs, with the panel changing on hover — so this is the
 * three-up card grid collapsed into one panel that three controls switch
 * between. § 5 item 4 is answered.
 *
 * The reference is Figma node 2579:131863, which is already drawn on Omanga's
 * tokens — `#161717` and `#2d2e2e` are `--color-ink` and `--color-ink-elevated`,
 * the 8px radius is `--radius-sm`, and the hairline is `--color-border-subtle`.
 * The one value that is not Omanga's is the active tab's `#FFD200`; brand fills
 * it here.
 *
 * ---------------------------------------------------------------------------
 * [CONFLICT] The tab label and the panel heading are the same string.
 *
 * The reference pairs a category tab (`Sustainability`) with a different panel
 * headline (`Building a greener future`). § 6 gives Omanga one string per
 * pillar: the tab labels are ♻️ REUSED `People · Passion · Partnership`, and so
 * are the three card `H3`s — the same three words. So the active pillar's name
 * appears twice, once in the highlighted tab and once above its paragraph.
 *
 * Both are rendered, because § 6's card structure is "image on top, H3, then a
 * short supporting paragraph" and § 3.2 requires three `H3`s at this position —
 * dropping either would break an approved structure to fix a cosmetic
 * repetition. The real fix is one of two copy decisions, and neither is mine:
 * three short panel headlines, or no tabs.
 *
 * ---------------------------------------------------------------------------
 * [NO LINK] § 6: "Clarity places a single inline text link inside one card (to
 * its Responsible Business Report). Omanga has no equivalent published document,
 * so no inline link is added — an empty or invented link is worse than none."
 * § 3.4 lists that link as Conditional on a real document shipping.
 *
 * This is also what makes the panels safe to keep in the DOM while hidden — see
 * the section component. A link inside an `aria-hidden` panel would be a
 * keyboard trap; § 6 forbids the link, so there is nothing focusable in there.
 *
 * [NOT EXPANDED] § 6: "Omanga's approved value statements are 15–19 words and
 * carry no link. The cards will feel lighter. Do not expand the copy to match
 * Clarity's density — increase image height and internal padding instead."
 * Nothing below is padded.
 *
 * [E-E-A-T, not a copy gap] § 6: Clarity's copy is claim-plus-evidence, Omanga's
 * is statement-only, and § 3.6 item 6 files substantiation — partner counts,
 * community initiatives, countries operated in — as a phase-2 authority gain.
 * It "is not a copy gap to fill with invention".
 */

export type ImpactPillar = {
  readonly id: string;
  /** The control's label. Same string as `heading` — see the conflict above. */
  readonly tabLabel: string;
  readonly heading: string;
  readonly body: string;
  readonly image: ImageAsset;
};

/**
 * 🔒 LOCKED — approved Omanga copy, verbatim. All three bodies and all three
 * labels are § 6's, transcribed unchanged.
 *
 * The labels keep their Title Case. § 3.2 sets sentence case for new headings and
 * exempts these by name: "the value card labels `People` / `Passion` /
 * `Partnership` … Casing consistency does not override the locked-copy rule."
 *
 * None of the three bodies ends in a full stop. That is how § 6 states them, and
 * punctuation is copy.
 *
 * ---------------------------------------------------------------------------
 * [SUBSTITUTED ×3] None of these is the asset § 6 names, and § 6 names only two.
 *
 * § 6 asks for "the crowd photograph currently paired with People/Passion on the
 * live About page" and "the clasped-hands photograph currently paired with
 * Partnership". Neither is in `public/`, and § 6 marks the third image `[VERIFY]`
 * outright: "the live page runs one shared image across People and Passion.
 * Three cards need three images. Source a third Omanga-owned asset; do not
 * duplicate."
 *
 * So all three are the nearest existing Omanga assets, and no image is
 * duplicated — within this section or with the two bands above it:
 *
 *   People       a family sharing a meal. The strongest of the three against its
 *                statement. Also the Get Started page's band asset, so it now
 *                appears on two pages.
 *   Passion      a couple mid-conversation, unused until now. The weakest fit:
 *                it was shot for an advisory scene, and "unwavering passion for
 *                showcasing the very best of what Africa has to offer" is not
 *                what it shows. This is § 6's `[VERIFY]` slot and it is still
 *                open — the substitution makes the section renderable, not
 *                correct.
 *   Partnership  two colleagues over a clipboard. Collaborative rather than
 *                clasped hands, and the closest the library holds. Also the
 *                Insurance page's care band asset.
 *
 * [FLAGGED] All three sources are far larger than the 354px square they render
 * at — 27MB, 1.5MB and 16MB. § Image optimization: "Serve at the largest
 * rendered size, not the source size." `next/image` protects the browser; the
 * repository still carries the weight, and this section loads all three at once.
 *
 * [RENAMED] `insurance (2).jpg` should not keep that name — a space and a pair
 * of parentheses in a path is three characters that need escaping and one that
 * gets mangled by a CDN rule. `about-impact-passion.jpg` in the same pass that
 * re-exports it.
 *
 * `alt` is empty on all three. Each is illustrative of the statement beside it
 * and adds nothing a screen-reader user needs in order to act; the paragraph is
 * the content. An image that carried its own argument would want a description,
 * and that description would be copy for the approval document.
 */
const PILLARS: readonly ImpactPillar[] = [
  {
    id: "people",
    tabLabel: "People",
    heading: "People",
    body: "We put people at the heart of everything we do, from our travellers to our local communities and partners",
    image: {
      src: "/get-started-friends.jpg",
      alt: "",
      width: 6720,
      height: 4480,
    },
  },
  {
    id: "passion",
    tabLabel: "Passion",
    heading: "Passion",
    body: "We are driven by an unwavering passion for showcasing the very best of what Africa has to offer",
    image: {
      src: "/insurance (2).jpg",
      alt: "",
      width: 2830,
      height: 2499,
    },
  },
  {
    id: "partnership",
    tabLabel: "Partnership",
    heading: "Partnership",
    body: "We believe in the power of collaboration and building strong, lasting partnerships across the continent",
    image: {
      src: "/insurance-care-handshake.jpg",
      alt: "",
      width: 5466,
      height: 7990,
    },
  },
] as const;

export type AboutImpactContent = {
  readonly heading: string;
  readonly pillars: readonly ImpactPillar[];
};

/**
 * No `intro` and no `action`.
 *
 * § 6 gives this section a heading and three cards — no sub-line — and states
 * "No CTA at section level". § 2's CTA discipline says the same of §§ 3, 4 and 6
 * together. The type has no slot for either.
 */
export const aboutImpactContent: AboutImpactContent = {
  // ✏️ NEW. § 6 and § 3.2, transcribed unchanged. Sentence case per § 3.2.
  // The reference's own heading — "Our impact goes beyond business" — is
  // Clarity's copy and is not used.
  heading: "Our impact across Africa",
  pillars: PILLARS,
} as const;

export const ABOUT_IMPACT_HEADING_ID = "about-impact-heading" as const;
