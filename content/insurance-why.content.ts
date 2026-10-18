// [CHANGED, 2026-10-10] Copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged.
import type { ComparisonGroup } from "@/content/why-omanga.content";

/**
 * Why choose Omanga Insurance — spec § 7.
 *
 * Loss framing, six rows. The sixth — the wallet — is last because it is the
 * one differentiator no standalone insurer can match.
 *
 * `ComparisonGroup` is reused from the homepage's equivalent section rather
 * than redeclared, so both comparisons render through the same components and
 * a change to the shape reaches both.
 *
 * [NOTE] No "Without" row names a competitor, and none should be added. Spec
 * § 7: naming a named insurer creates a legal exposure this page does not need.
 *
 * [CONFLICT] Spec § 11.4 asks row 6 to link "Omanga wallet" to `/payments`.
 * `ComparisonGroup` items are plain strings, and the homepage's comparison
 * renders none of its rows as links. Adding inline links to one comparison and
 * not the other needs a component decision before a content one — flagged
 * rather than forced.
 */

const WITHOUT_OMANGA: ComparisonGroup = {
  id: "without-omanga-insurance",
  title: "Without Omanga",
  sentiment: "negative",
  // [CHANGED, 2026-10-14] UX copy pass: row 5 was about multi-country cover,
  // which the plan does not give (Nigeria only). Now 24/7 help, a confirmed fact.
  items: [
    "An insurer with no hospital network in Nigeria",
    "Paying up front and claiming the money back later",
    "An annual policy you keep paying for after you leave",
    "One level of cover at one price",
    "No one to call when you need a doctor at night",
    "Health cover in one app, travel money in another",
  ],
} as const;

const WITH_OMANGA: ComparisonGroup = {
  id: "with-omanga-insurance",
  title: "With Omanga",
  sentiment: "positive",
  // [CHANGED, 2026-10-14] UX copy pass: names Phillips HMO; drops the
  // 50+-country claim (cover applies in Nigeria only).
  items: [
    "Cover from Phillips HMO, with its own hospital network in Nigeria",
    "Hospital admission through Phillips HMO, not a refund form",
    "Monthly plans with no commitment. Cancel any time",
    "Three plans from $50 to $120 a month",
    "A contact centre and telemedicine with licensed doctors",
    "Your plan and your wallet in one account",
  ],
} as const;

export type InsuranceWhyContent = {
  readonly heading: string;
  readonly intro: string;
  readonly groups: readonly [ComparisonGroup, ComparisonGroup];
};

export const insuranceWhyContent: InsuranceWhyContent = {
  heading: "Why choose Omanga Holiday Insurance",
  // [CHANGED, 2026-10-14] UX copy pass: Nigeria, not Africa; fluff cut.
  intro:
    "Many visitors buy travel insurance at home, from an insurer with no hospitals in Nigeria.",
  groups: [WITHOUT_OMANGA, WITH_OMANGA],
} as const;

export const INSURANCE_WHY_HEADING_ID = "insurance-why-heading" as const;
