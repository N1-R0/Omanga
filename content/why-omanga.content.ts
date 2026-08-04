/**
 * Why Omanga content — the comparison section.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] `copy.md` is still not in project knowledge.
 *
 * Every string here is transcribed from the section screenshot and then
 * corrected against `project-context.md` § Non-negotiable copy facts, which is
 * the only copy authority available. **All of it needs copy approval.** Same
 * position as `coverage.content.ts`, and the same precedent `trust.content.ts`
 * and `how-it-works.content.ts` set.
 *
 * [BLOCKER] Two strings are reconstructed, not transcribed.
 *
 * In the screenshot both third rows overflow their card and are clipped
 * mid-word — "…from a provider with no local n" and "…established Nigerian
 * health provide". Neither can be read in full. Each is completed below with the
 * only sensible reading and marked at its site. **Both need verifying against the
 * source document before launch.**
 *
 * The clipping is itself a finding: the frame's cards are too narrow for the
 * frame's own copy. `component-rules.md` § Card rules requires that "content
 * length variation is handled by the card, not by truncation", so this
 * implementation wraps instead of clipping and the cards grow. That is a
 * deliberate departure from what the frame renders.
 */

/**
 * Which side of the comparison a group sits on.
 *
 * Semantic, not visual. The mark, the card treatment and the reading order are
 * all derived from it by the components — `component-rules.md`: "Props never
 * carry design values." A `sentiment` of `positive` is a statement about the
 * content, not an instruction to draw a brand border.
 */
export type ComparisonSentiment = "negative" | "positive";

export type ComparisonGroup = {
  readonly id: string;
  readonly title: string;
  readonly sentiment: ComparisonSentiment;
  readonly items: readonly string[];
};

export type WhyOmangaContent = {
  readonly heading: string;
  readonly intro: string;
  /**
   * Exactly two groups. A tuple rather than an array because a comparison with
   * one side or three is not a state this section can render, and the type is
   * the cheapest place to say so.
   */
  readonly groups: readonly [ComparisonGroup, ComparisonGroup];
};

/**
 * The problem side.
 *
 * [NOTE] "A home bank card" and the intro's "a bank card" are left as written.
 * `project-context.md` forbids reintroducing card language for *Omanga's* wallet
 * — "'one card' became 'a customized payment solution'" — and both of these
 * describe the traveller's existing third-party bank card, which is the problem
 * the section is about. Removing the word here would remove the point.
 */
const WITHOUT_OMANGA: ComparisonGroup = {
  id: "without-omanga",
  title: "Without Omanga",
  sentiment: "negative",
  items: [
    "A home bank card that gets blocked or declined abroad",
    "Exchange markups you only find on the statement",
    // [UNVERIFIED] Clipped in the frame at "…with no local n". Reconstructed.
    "Insurance bought separately, from a provider with no local network",
    "A different arrangement for every country on the itinerary",
    "Money in one app, cover in another, no single view",
  ],
} as const;

/**
 * The Omanga side.
 */
const WITH_OMANGA: ComparisonGroup = {
  id: "with-omanga",
  title: "With Omanga",
  sentiment: "positive",
  items: [
    // [CORRECTED] The frame reads "A wallet and card built for spending across
    // the continent". project-context.md: "Wallet, not card... Never reintroduce
    // physical-card language in copy, image alt text, or component names." This
    // is Omanga's own product, so "and card" is struck.
    "A wallet built for spending across the continent",
    "Transparent, real-time rates shown before you confirm",
    // [UNVERIFIED] Clipped in the frame at "…health provide". Reconstructed.
    "Short-term cover from established Nigerian health providers",
    // [CORRECTED] The frame reads 52. project-context.md: "43 African countries.
    // Not 52. The spec's 52 is obsolete — reject it everywhere." Six sections
    // have now shipped with 43.
    "One account across 43 African countries",
    "Payments and insurance managed in the same place",
  ],
} as const;

export const whyOmangaContent: WhyOmangaContent = {
  heading: "Why Omanga",
  intro:
    "Most travellers to Africa end up assembling this themselves: a bank card that may or may not work, a separate insurance policy, and no clear view of what either is costing them.",
  groups: [WITHOUT_OMANGA, WITH_OMANGA],
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const WHY_OMANGA_HEADING_ID = "why-omanga-heading";
