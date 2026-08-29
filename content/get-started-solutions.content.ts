import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { CallToAction, Eyebrow } from "@/types/content.types";

/**
 * The Two Solutions content.
 *
 * Verbatim from `Omanga-Get-Started-Copy - NJ reviewed.docx`, § Section 3 — The
 * two solutions, with NJ's tracked changes accepted. The section heading and both
 * card headings are corroborated independently by `get-started-seo.md` § Heading
 * hierarchy, which lists them as the page's H2 and its two H3s.
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
  /**
   * `COUNTRIES_SERVED` is interpolated where the document writes "43". The figure
   * is verbatim either way — this is the number NJ's tracked change put here,
   * replacing 52 — but the site has one owner for it, and typing it again would
   * be a second place for it to go stale.
   */
  body: `A multi-currency wallet built for spending across the continent. Fund in USD, GBP or CAD at transparent real-time rates, send and receive in six currencies, and pay directly from your balance in ${COUNTRIES_SERVED_DISPLAY} African countries — online or in person, with no FX surprises at checkout.`,
  action: {
    label: "Explore Payment Solutions",
    href: "/payments",
    emphasis: "primary",
  },
} as const;

const INSURANCE: GetStartedSolution = {
  heading: "Omanga Holiday Insurance",
  body: "Short-term travel medical cover for the length of your trip, delivered through established Nigerian health providers with real local networks. Choose Silver, Gold or Diamond, activate in under five minutes with no paperwork, and reach care in any of the countries Omanga covers.",
  action: {
    label: "Explore Holiday Insurance",
    href: "/insurance",
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
  eyebrow: "Two solutions, one account",
  heading: "Payments, protection, or both",
  intro:
    "Omanga Payment Solutions and Omanga Holiday Insurance work on their own or together in a single account. Start with the one your trip needs most — you can add the other at any time, without a second signup.",
  solutions: [PAYMENTS, INSURANCE],
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const GET_STARTED_SOLUTIONS_HEADING_ID =
  "get-started-solutions-heading" as const;
