// [CHANGED, 2026-10-14] UX copy pass (design.md § Home UX copy pass): owner-confirmed facts,
// wallet / health cover nouns, and each panel's action is the next step rather than "explore".
import { HERO_PRIMARY_ACTION } from "@/content/hero.content";
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { CallToAction, Eyebrow } from "@/types/content.types";

/**
 * The Two Solutions content.
 *
 * Structure from `Omanga-Get-Started-Copy - NJ reviewed.docx`, § Section 3. The
 * panel headings (the product names, as H3s) are still that document's; the
 * other strings are the 2026-10-14 UX copy pass.
 *
 * ---------------------------------------------------------------------------
 * [DISCREPANCY] The screenshot's copy is the benchmark's, not this page's.
 *
 * The screenshot reads "The power of both" as the heading and "Proprietary,
 * self-built technology designed around our customers…" as the intro. Both are
 * live copy from claritybusinesstravel.com/our-tech, confirmed by fetching that
 * page — as are the two card paragraphs and the "View ClarityGo" / "View
 * MeetingsPro" button labels.
 *
 * Precedence is copy doc → visual reference, and the brief's own instruction is
 * "use the approved copy… do not invent or rewrite user-facing copy", so the
 * approved strings ship and the screenshot is read for layout only. The
 * approved heading is "Payments, protection, or both", which the SEO document
 * also lists as this section's H2. Raised, not resolved: if "The power of both"
 * is wanted, it is a copy change and has to come through the approval document.
 *
 * ---------------------------------------------------------------------------
 * [OMITTED] The approved bullet lists.
 *
 * § Section 3 gives each card a BULLET POINTS block beneath its paragraph. They
 * are not rendered, for two reasons the brief settles between them: the brief
 * enumerates the card's contents as logo, description and CTA with no list, and
 * it requires that neither card "become unnecessarily tall because of content".
 *
 * This has a cost worth stating plainly. `get-started-seo.md` § Keywords places
 * the page's entire long-tail tier in "card bullets" — "spend in 43 African
 * countries", "Silver Gold Diamond insurance plans", "travel insurance active in
 * minutes". Dropping the lists drops that surface. Confirm the omission, or say
 * the word and they go back in.
 *
 * Card one's list is also broken at source: NJ deleted its third bullet ("The
 * Omanga card — accepted across 52 African countries") and left the bullet
 * empty, so card one has two bullets against card two's three. That needs
 * resolving before the lists can ship either way.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] There are no product logos.
 *
 * The brief asks each card to open with a product logo, which is what the
 * benchmark does — it has a `clarity-go.svg` and a `MeetingsPro_logo_RGB.svg`.
 * Omanga has neither equivalent: `public/` holds `logo-omanga.svg` and
 * `logo-omanga-white.svg`, both the corporate mark, and no per-product wordmark
 * exists to reuse.
 *
 * The cards therefore open with the approved product name as a real heading,
 * which is what the SEO document requires of them anyway: "Card product names
 * are H3s so both product name strings are crawlable as headings; this is the
 * page's only long-tail surface." coding-guidelines.md § Image optimization also
 * forbids "text baked into images", so a wordmark image would need the name in
 * the alt text and the heading in the outline regardless. If product wordmarks
 * are designed later they belong in the card's media slot *above* the heading,
 * not instead of it.
 */

const PAYMENTS: GetStartedSolution = {
  heading: "Omanga Payment Solutions",
  // [CHANGED, 2026-10-14] UX copy pass: owner-confirmed facts (six currencies, mid-market rate,
  // ₦20 transfers, Fuspay) replace "transparent real-time rates" and "no surprise costs".
  body: `A wallet for your trip. Fund it from USD, GBP or CAD, hold 6+ currencies and see the mid-market rate before you confirm. Spend online or in person in ${COUNTRIES_SERVED_DISPLAY} African countries. It’s free to open and transfers cost ₦20. Operated by Fuspay Technologies.`,
  // [CHANGED, 2026-10-14] UX copy pass: was "Explore payments" (/payments). The page's job is to
  // get the wallet opened, so the panel links straight to sign-up. One owner for label and URL.
  action: HERO_PRIMARY_ACTION,
} as const;

const INSURANCE: GetStartedSolution = {
  heading: "Omanga Holiday Insurance",
  // [CHANGED, 2026-10-14] UX copy pass: names Phillips HMO and the prices, scopes cover to Nigeria.
  // Dropped unverified "under 5 minutes" / "no paperwork" and the wrong "any country Omanga covers".
  body: "Short-term health cover for your time in Nigeria, from Phillips HMO, a Nigerian health maintenance organisation (HMO). Choose Silver at $50, Gold at $85 or Diamond at $120 a month. Cover applies in Nigeria only.",
  // [CHANGED, 2026-10-14] UX copy pass: was "Explore holiday insurance". Choosing a plan is the next step.
  action: {
    label: "Compare health plans",
    href: "/plans",
    emphasis: "primary",
  },
} as const;

export type GetStartedSolution = {
  readonly heading: string;
  readonly body: string;
  readonly action: CallToAction;
};

export type GetStartedSolutionsContent = {
  readonly eyebrow: Eyebrow;
  readonly heading: string;
  readonly intro: string;
  /**
   * Exactly two offerings, in the approved order — payments, then insurance.
   *
   * A fixed-length tuple rather than an array: the section's whole argument is
   * that there are two and that they are peers, and an array would permit a
   * third, or one, at which point "cards in a row are equal width and equal
   * height" stops being expressible.
   */
  readonly solutions: readonly [GetStartedSolution, GetStartedSolution];
};

/**
 * No section-level `action`, and none should be added.
 *
 * Each card carries its own link and the two offerings are peers, so a
 * section-level call to action would have to promote one over the other — a
 * content decision nobody has made. The same position `solutions.content.ts`
 * takes on the homepage's equivalent section.
 */
export const getStartedSolutionsContent: GetStartedSolutionsContent = {
  // [CHANGED, 2026-10-14] UX copy pass: eyebrow, H2 and intro say what to do here, in body nouns.
  eyebrow: "One account",
  heading: "Choose what to set up first",
  intro:
    "Start with the one your trip needs most. You can add the other later without signing up again.",
  solutions: [PAYMENTS, INSURANCE],
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const GET_STARTED_SOLUTIONS_HEADING_ID =
  "get-started-solutions-heading" as const;
