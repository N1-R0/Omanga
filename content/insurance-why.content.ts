// [CHANGED, 2026-10-10] Copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged.
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
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
  items: [
    "A policy from an insurer with no local hospital network",
    "Paying up front and claiming it back weeks later",
    "An annual policy that keeps charging after you're home",
    "One rigid level of cover at one price",
    "A new arrangement for every country on the itinerary",
    "Insurance in one place, travel money in another",
  ],
} as const;

const WITH_OMANGA: ComparisonGroup = {
  id: "with-omanga-insurance",
  title: "With Omanga",
  sentiment: "positive",
  items: [
    "Cover delivered through established Nigerian health providers",
    "Hospital admission through your provider, not a refund form",
    "Short-term cover for the length of your trip; cancel any time",
    "Three plans from $50 a month, so the cover matches your trip",
    `One plan across ${COUNTRIES_SERVED_DISPLAY} African countries, roaming included`,
    "Insurance and your Omanga wallet in the same account",
  ],
} as const;

export type InsuranceWhyContent = {
  readonly heading: string;
  readonly intro: string;
  readonly groups: readonly [ComparisonGroup, ComparisonGroup];
};

export const insuranceWhyContent: InsuranceWhyContent = {
  heading: "Why choose Omanga Holiday Insurance",
  intro:
    "Many travellers to Africa buy cover at home from an insurer with no local presence, and learn what it's worth when they need it.",
  groups: [WITHOUT_OMANGA, WITH_OMANGA],
} as const;

export const INSURANCE_WHY_HEADING_ID = "insurance-why-heading" as const;
