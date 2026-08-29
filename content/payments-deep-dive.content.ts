import {
  omangaPaymentsProduct,
  type DeepDiveProduct,
} from "@/content/deep-dive.content";

/**
 * A closer look at Omanga Payments — the untabbed deep dive.
 *
 * The homepage's deep dive with its insurance half removed. The six features are
 * imported, not retyped, so the two pages cannot drift.
 *
 * The exact mirror of `insurance-deep-dive.content.ts`, which does the same with
 * the other half. Both halves of the homepage section now also live on their own
 * product page.
 *
 * ---------------------------------------------------------------------------
 * [CONFLICT] `Omanga-Payment-Solutions-Page-v1` § 3 forbids this section.
 *
 * It is the strongest objection in that document, and it is worth stating in
 * full rather than paraphrasing, because it is being overridden:
 *
 *   "Do not recreate it here… Reproducing those six H3s on `/payments` would put
 *    `/` and `/payments` in direct competition for the same long-tail queries —
 *    classic cannibalisation, and it splits the internal links that should be
 *    consolidating on one URL."
 *
 * § 3 also specifies the intended relationship, which this inverts: the homepage
 * deep-dive tab should link *into* `/payments`, one direction, "to direct
 * authority to the page that should rank for commercial payments intent" — and
 * `/payments` should not carry the content itself.
 *
 * Built on instruction, following the precedent the insurance page set against
 * the identical objection in its own spec. Recorded rather than argued: if the
 * duplication shows up as cannibalisation later, this note is where the decision
 * is, and the fix is to delete this module and the section call that uses it.
 *
 * [NOTE] The exposure is now symmetric and larger than either page's spec
 * anticipated. Both of the homepage's tabs are duplicated on a product page, so
 * every one of the twelve `h3`s in that section exists on two URLs.
 *
 * ---------------------------------------------------------------------------
 * [UNAPPROVED COPY] The heading and intro are not from any approved document.
 *
 * They cannot be: § 3 skips the section, so the spec supplies no strings for it.
 * The homepage's own pair names both products — "A closer look at Omanga
 * Payments and Holiday Insurance" — which is wrong on a page with no insurance
 * content.
 *
 * Both are the homepage's with the insurance clause removed, which is a deletion
 * rather than a rewrite, and the same construction `insurance-deep-dive` used
 * for its half. The homepage intro reads "Everything the wallet and the three
 * insurance plans actually do"; the second half goes and the verb agrees.
 *
 * Both strings need copy approval.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER, inherited] There is still no preview artwork.
 *
 * `DeepDiveProduct.preview` is optional and `omangaPaymentsProduct` sets none,
 * so `PreviewPanel` renders its brand plate empty — a large flat #ae2448
 * rectangle beside the feature list. That is a known gap on the homepage and it
 * arrives here unchanged rather than being introduced by this page.
 *
 * It is more conspicuous here than on the homepage, because this page already
 * carries a phone mockup in the band directly above it. Supplying a wallet-view
 * render would fill this plate and replace that mockup in one change.
 */

export type PaymentsDeepDiveContent = {
  readonly heading: string;
  readonly intro: string;
  readonly product: DeepDiveProduct;
};

export const paymentsDeepDiveContent: PaymentsDeepDiveContent = {
  heading: "A closer look at Omanga Payments",
  intro: "Everything the wallet actually does.",
  product: omangaPaymentsProduct,
} as const;

export const PAYMENTS_DEEP_DIVE_HEADING_ID =
  "payments-deep-dive-heading" as const;
