import type { Eyebrow, ImageAsset, LinkTarget } from "@/types/content.types";

/**
 * Solutions Overview content.
 *
 * Every string is verbatim from the Figma frame `Section` (node 1265:12553),
 * which is the only source for this section's copy: there is no
 * `homepage.md` or `copy.md` in the project knowledge base, so the frame's
 * text layers are the closest thing to an approved document that exists. Where
 * the frame conflicts with `project-context.md` the context document wins, and
 * every such case is recorded below rather than silently resolved.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] The eyebrow is omitted, deliberately.
 *
 * The frame's eyebrow pill reads "ClarityGo". That is the brand name of
 * claritybusinesstravel.com — the structural benchmark this redesign follows —
 * and it survives in the frame as an un-replaced placeholder. Confirmed by
 * searching the benchmark's own markup: "ClarityGo" appears there as a logo
 * asset, and "Local expertise, built into the technology" does not appear at
 * all, so the heading is Omanga-authored and the eyebrow is not.
 *
 * Shipping a competitor's brand name in Omanga's homepage would be a defect of
 * a different order from a spacing mismatch, and both
 * `component-rules.md` § Section rules and `coding-guidelines.md` § Error
 * handling give the same instruction: "a section with unverified content
 * renders without that element rather than with a placeholder".
 *
 * So `eyebrow` is absent, the section renders no pill, and `SectionHeader`
 * still wires the slot. Approving a string here is the only change needed.
 *
 * ---------------------------------------------------------------------------
 * [CORRECTED] The payments body copy is edited to remove a card claim.
 *
 * The frame reads:
 *
 *   "A global multi-currency wallet and card that lets you hold, manage, send
 *    and receive multiple currencies on a single platform"
 *
 * `project-context.md` is unambiguous: "**Wallet, not card.** Tracked changes
 * removed every 'card' claim; 'one card' became 'a customized payment
 * solution'. Never reintroduce physical-card language in copy, image alt text,
 * or component names." The same rule is what produced the approved hero
 * headline, so this is not a marginal preference — it is the single most
 * load-bearing copy decision on the page.
 *
 * "and card" is therefore struck, and the terminal full stop the frame omits is
 * restored so the two card paragraphs punctuate alike. Nothing else is touched.
 * **Confirm the edited sentence with copy.**
 */

/**
 * The insurance illustration.
 *
 * Figma draws this as a Lottie composition (`__lottie_element_3`, node
 * 1265:12571) — a ring of travel glyphs orbiting the Omanga mark. It ships as
 * the frame's static SVG export instead: `design.md` § Motion principles
 * permits Lottie, but `coding-guidelines.md` requires heavy animation to load on
 * intersection, pause off-screen and stay out of the initial bundle, and none of
 * that infrastructure exists yet. A static export is the honest version of the
 * design until it does. **The animated asset is outstanding.**
 *
 * `alt` is empty, deliberately. The glyph ring is ornamental — it names no
 * benefit the heading and body beneath it do not already state — so an empty
 * alt is the correct statement rather than an omission.
 *
 * [NOTE] The export bakes the brand fill into the artwork as a full-bleed
 * `#AE2448` rectangle. Harmless here, because the artwork only ever sits on the
 * brand product card, but it does mean the file is not reusable on any other
 * surface. A transparent re-export would fix that.
 */
const INSURANCE_IMAGE: ImageAsset = {
  src: "/solutions-insurance-cover.svg",
  alt: "",
  width: 366,
  height: 272,
} as const;

/**
 * The payments app mockup.
 *
 * `alt` describes the product, not the pixels, and carries no figure from the
 * mockup: `project-context.md` forbids inventing statistics, and the balances
 * drawn on the screen are placeholder data. It also carries no card language,
 * which the same document requires of alt text specifically.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] The asset bakes unapproved figures into an image.
 *
 * The mockup renders "$25,000.40", "$20,000" and "$17,000" as artwork. Two
 * rules land on that at once: `coding-guidelines.md` § Image optimization says
 * "no text baked into images", and `project-context.md` says "do not invent
 * statistics". A homepage that shows a $25,000 balance is making an implicit
 * claim about the product in a form no reviewer can diff and no screen reader
 * can read.
 *
 * Shipped as-is because it is what the frame contains and replacing it is a
 * design decision, not an implementation one. **Raised for design:** either
 * approve the figures or re-export the mockup with neutral values.
 */
const PAYMENTS_IMAGE: ImageAsset = {
  src: "/solutions-payments-app.png",
  alt: "The Omanga wallet app, showing a multi-currency balance with send and receive controls.",
  width: 1764,
  height: 1992,
} as const;

/**
 * Destinations.
 *
 * Both routes already exist in the application, so neither is
 * `isRoutePending`. The labels are the frame's and they name their target,
 * which is what `types/content.types.ts` requires of a `LinkTarget` — "learn
 * more" and "click here" are forbidden by the SEO expectations.
 */
const INSURANCE_ACTION: LinkTarget = {
  label: "Explore Insurance",
  href: "/insurance",
} as const;

const PAYMENTS_ACTION: LinkTarget = {
  label: "Explore Payments",
  href: "/payments",
} as const;

/**
 * One of the section's two offerings.
 *
 * `action` is a `LinkTarget` rather than a `CallToAction`, and that is the
 * point: a `CallToAction` carries an `emphasis`, and the emphasis of a product
 * card's button is fixed by the card it sits in — `design.md` § Card
 * variants gives the brand card a secondary-on-dark button and the light card a
 * secondary-on-light one. Copy does not get to choose it, so copy does not
 * carry it.
 */
export type SolutionContent = {
  readonly heading: string;
  readonly body: string;
  readonly action: LinkTarget;
  readonly image: ImageAsset;
};

/**
 * The section's content.
 *
 * Deliberately not `SectionContent<T>`. That shape carries a single optional
 * `intro` string, and the frame's intro is two separate paragraphs with a 12
 * gap between them — which is two `<p>` elements, not one string with a break
 * in it. Bending the shared type to accept an array would weaken it for every
 * other section, so this follows the precedent `hero.content.ts` already set
 * and declares its own shape.
 *
 * The two offerings are named fields rather than a tuple. A tuple would force
 * the section to select each card's surface and media treatment by index, and
 * `component-rules.md` is explicit that a primitive carries "no positional or
 * ordinal logic". Naming them means the section reads as composition.
 */
export type SolutionsOverviewContent = {
  /** Absent until a replacement for "ClarityGo" is approved. See above. */
  readonly eyebrow?: Eyebrow;
  readonly heading: string;
  /** Exactly two paragraphs, in the frame's order. */
  readonly intro: readonly [string, string];
  readonly insurance: SolutionContent;
  readonly payments: SolutionContent;
};

export const solutionsContent: SolutionsOverviewContent = {
  heading: "Local expertise, built into the technology",
  intro: [
    "Two things make travel across Africa harder than it should be: moving money without losing it to hidden markups, and finding health cover that actually works when you arrive.",
    "Omanga solves both in one account — combining ground-level knowledge of how the continent really works with technology that keeps up.",
  ],
  insurance: {
    heading: "Omanga Holiday Insurance",
    body: "Short-term health cover for your trip, underwritten by established Nigerian providers, in three plans.",
    action: INSURANCE_ACTION,
    image: INSURANCE_IMAGE,
  },
  payments: {
    heading: "Omanga Payment Solutions",
    body: "A global multi-currency wallet that lets you hold, manage, send and receive multiple currencies on a single platform.",
    action: PAYMENTS_ACTION,
    image: PAYMENTS_IMAGE,
  },
} as const;

/**
 * The section heading's id.
 *
 * Exported because two components must agree on it exactly: `SectionHeader`
 * renders the `h2` with this id, and `SolutionsOverview` names its `section`
 * with `aria-labelledby` pointing at it. If they drift the section loses its
 * accessible name, and nothing about that failure is visible on screen.
 */
export const SOLUTIONS_HEADING_ID = "solutions-heading" as const;
