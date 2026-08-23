import {
  holidayInsuranceProduct,
  type DeepDiveProduct,
} from "@/content/deep-dive.content";

/**
 * A closer look at Holiday Insurance — the untabbed deep dive.
 *
 * The homepage's deep dive with its payments half removed. The six features are
 * imported, not retyped, so the two pages cannot drift.
 *
 * ---------------------------------------------------------------------------
 * [CONFLICT] `Omanga-Insurance-Page-Content-Spec` § 3 forbids this section.
 *
 * Verbatim: "Omit from this page. Do not recreate." Its reasoning is an SEO one
 * and it is not a weak argument — the six feature headings are `h3`s, and
 * shipping them on a second URL "would duplicate six H3s across two URLs and
 * split their ranking signal". § 3 also specifies the intended relationship: the
 * homepage's tab 2 links *into* this page, one direction, and this page does not
 * carry the content itself.
 *
 * Built on instruction. Recorded here rather than argued: if the duplication
 * shows up as cannibalisation later, this note is where the decision is.
 *
 * ---------------------------------------------------------------------------
 * [UNAPPROVED COPY] The heading and intro are not from any approved document.
 *
 * They cannot be: § 3 skips the section, so the spec supplies no strings for it,
 * and the homepage's own pair names both products — "A closer look at Omanga
 * Payments and Holiday Insurance" — which is wrong on a page with no payments
 * content.
 *
 * `heading` is transcribed from the supplied screenshot. `intro` is the
 * homepage's with its payments clause removed, which is a deletion rather than
 * a rewrite — the screenshot's own intro reads "the wallet, the card and the
 * three insurance plans", and both "the wallet" and "the card" are wrong here.
 * "The card" is doubly so: the approved homepage copy already struck it, and
 * `project-context.md` forbids reintroducing card language for Omanga's wallet.
 *
 * Both strings need copy approval.
 */

export type InsuranceDeepDiveContent = {
  readonly heading: string;
  readonly intro: string;
  readonly product: DeepDiveProduct;
};

export const insuranceDeepDiveContent: InsuranceDeepDiveContent = {
  heading: "A closer look at Holiday Insurance",
  intro: "Everything the three insurance plans actually do.",
  product: holidayInsuranceProduct,
} as const;

export const INSURANCE_DEEP_DIVE_HEADING_ID =
  "insurance-deep-dive-heading" as const;
