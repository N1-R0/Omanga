/**
 * Contact options — spec § 3.
 *
 * The page's primary conversion mechanism: two mutually exclusive paths, chosen
 * in one click, so nobody fills a field that is not relevant to them.
 *
 * Its own module rather than fields on the hero, because § 3 is its own section
 * with its own `h2` and its own copy. It renders inside the hero band — see the
 * hero content module for why the reference merges the two — so the components
 * live under `ContactHero/` while the content follows the spec's numbering.
 *
 * ---------------------------------------------------------------------------
 * Two cards, and the third is not backfilled.
 *
 * § 0 mandates it: `Get a demo` is "removed entirely, not replaced", and § 3
 * gives the reasoning — "Omanga is self-serve. A traveller wants an account in
 * minutes, not a scheduled sales call, and there is no B2B software to
 * demonstrate. The slot is not backfilled — inventing a third option to preserve
 * a 3-up grid would be layout driving content."
 *
 * The reference stacks its two cards full-width in the panel rather than running
 * them as a row, which is also what § 3 asks for: "Cards widen to fill the row
 * rather than leaving a gap where `Get a demo` was."
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Each card is a link, not a button.
 *
 * § 3 says "cards are semantically `<button>` elements, not divs with click
 * handlers — keyboard focusable, Enter/Space activate, visible focus ring."
 * They ship as links instead, and every property that requirement was protecting
 * still holds: a link is keyboard focusable, Enter activates it, and it takes the
 * same focus ring.
 *
 * The reason is § 4 note 8, which is a requirement a button cannot meet:
 * "support `?enquiry=talk` and `?enquiry=notifications` so campaigns, the
 * footer and support replies can route straight into the correct form. Reflect
 * the selection in the URL when a card is clicked so the state is shareable and
 * the browser back button behaves."
 *
 * A link *is* that. The card's href is the page with its own query, so the
 * selection is the URL rather than something mirrored into it, the back button
 * works with no history handling, the link is shareable and openable in a new
 * tab, and the panel can resolve which form to show on the server — no client
 * state, no hydration, and the routing works with JavaScript disabled.
 *
 * § 4's "the page does not navigate and the scroll position is preserved" is met
 * by `next/link` with `scroll={false}`: the URL changes and the panel
 * re-renders, and nothing moves.
 *
 * The href is written query-only (`?enquiry=talk`) so it resolves against
 * whatever path this page is mounted at. That is what lets the preview route and
 * the final `/contact` route share one content module without either knowing
 * where the other lives.
 *
 * [DEVIATION] § 3's hover is "lift + border-colour shift to maroon. Active/
 * pressed: slight scale-down." design.md § 11 principle 5 forbids all three:
 * "Nothing lifts or shadows on hover, and nothing scales except a rule sliding
 * into view." Hover is a colour transition instead — the fill inverts brand to
 * ink, which is the treatment every other control on the site uses and the one
 * § 3's own reduced-motion fallback ("colour change only") already describes.
 *
 * [NOTE] § 3: "Do not default-open either form. The grid must be the initial
 * state so the choice is conscious." With the selection living in the query, no
 * parameter means no form, which is that requirement met by construction rather
 * than by a default value someone could change.
 */

export type ContactOption = {
  readonly id: string;
  /** The query value that selects this option's form. § 4 note 8. */
  readonly enquiry: string;
  readonly heading: string;
  readonly body: string;
};

/**
 * ✏️ § 3's copy, transcribed unchanged.
 *
 * Order is load-bearing. § 3: "**Card order matters.** `Talk to us` sits first.
 * It is the higher-intent, higher-value action; `Notifications` is a consolation
 * path for visitors not ready to enquire. Clarity ordered demo → talk →
 * newsletter, i.e. descending commitment. Omanga keeps that logic with the demo
 * tier removed."
 *
 * `Talk to us` is sentence case in § 3's card heading and Title Case in its
 * section title; the heading's casing ships, which § SEO's hierarchy corroborates
 * ("H3 | Talk to us / Notifications").
 *
 * `Notifications` is § 3's own rename of Clarity's "Sign-up to travel alerts or
 * newsletter" — "retained as instructed and renamed to the shorter label."
 */
const OPTIONS: readonly ContactOption[] = [
  {
    id: "talk",
    enquiry: "talk",
    heading: "Talk to us",
    body: "Questions about payments, insurance plans, a partnership or your account? Tell us what you need and the right specialist will come back to you.",
  },
  {
    id: "notifications",
    enquiry: "notifications",
    heading: "Notifications",
    body: "Get travel alerts and Omanga updates by email — coverage changes, plan updates and practical news for travelling across Africa.",
  },
] as const;

export type ContactOptionsContent = {
  readonly heading: string;
  readonly options: readonly ContactOption[];
};

export const contactOptionsContent: ContactOptionsContent = {
  // ✏️ § 3 and § SEO's hierarchy — an `h2`, transcribed unchanged.
  heading: "How can we help?",
  options: OPTIONS,
} as const;

/** The query key § 4 note 8 specifies. One owner, read by the panel. */
export const CONTACT_ENQUIRY_PARAM = "enquiry" as const;

export const CONTACT_OPTIONS_HEADING_ID = "contact-options-heading" as const;
