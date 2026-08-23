import { INSURANCE_COVERAGE_ANCHOR } from "@/content/insurance.content";

/**
 * What each plan covers — spec § 6. Anchor `#coverage`.
 *
 * The page's reference artefact and, per spec § 11.3, its long-tail engine:
 * every row label is a real query and the table gives them structure prose
 * cannot.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER ×4] Four cells are absent, not empty.
 *
 * The source plan cards state benefits cumulatively — Gold reads "Everything in
 * Silver +", Diamond "Everything in Gold +" — and a table cannot inherit. The
 * spec marks these four `[VERIFY]` and says plainly: "Get the four flagged
 * values from Omanga before build. Do not infer them."
 *
 *   - Admission days per trip — Gold, Diamond
 *   - Eye care — Silver, Diamond
 *   - Surgical limits — Silver
 *
 * They are omitted rather than filled, so a missing cell renders as missing.
 * Spec § 6 calls the admission-days gap "likely the single most commercially
 * significant unknown on the page"; hiding it behind an inherited value would
 * be the one outcome worse than the hole.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] Hospital categories are undefined.
 *
 * Spec § 6: "'Category A + B' appears on all three live cards with no
 * definition anywhere on the page… it is the one thing a non-Nigerian traveller
 * cannot decode. This blocks conversion more than any copy change." § 6.3's copy
 * states which categories each tier opens but not what they mean. No definition
 * is invented here. It needs either inline text or a linked glossary.
 *
 * ---------------------------------------------------------------------------
 * [MOVED] § 6.3 is no longer part of this section. "How care works" is now its
 * own band with its own `h2` and image — see
 * `content/insurance-care.content.ts`, where the deviation and the spec § 11.4
 * link conflict are both recorded. This module holds § 6.1 and § 6.2 only.
 *
 * ---------------------------------------------------------------------------
 * [DESIGN] Spec § 6.1 § Table notes: sticky header row on scroll, and on mobile
 * one accordion per plan rather than horizontal scroll — a four-column table is
 * unusable at 375px. Recorded here because it constrains the component that
 * consumes this data, not the data itself.
 */

/**
 * One row of the comparison.
 *
 * Per-plan cells are optional and every absence is a blocker above. There is
 * deliberately no "inherit from the tier below" mechanism: that is exactly the
 * inference the spec forbids.
 */
export type CoverageRow = {
  readonly label: string;
  readonly silver?: string;
  readonly gold?: string;
  readonly diamond?: string;
};

export type CoverageInclusion = {
  readonly term: string;
  readonly description: string;
};

export type InsuranceCoverageContent = {
  readonly anchorId: typeof INSURANCE_COVERAGE_ANCHOR;
  readonly heading: string;
  readonly intro: string;
  /** Most-decisive first; the universal rows last. Order is the spec's. */
  readonly rows: readonly CoverageRow[];
  readonly inclusionsHeading: string;
  readonly inclusions: readonly CoverageInclusion[];
};

/**
 * The mark used for a benefit that is present on every tier.
 *
 * A string in the content rather than an icon chosen by the component, because
 * it is the cell's value. Whatever renders it must also give it an accessible
 * name — a bare "✓" announces as nothing useful.
 */
const INCLUDED = "Included" as const;

const ROWS: readonly CoverageRow[] = [
  {
    label: "Monthly price",
    silver: "$50",
    gold: "$85",
    diamond: "$120",
  },
  {
    label: "Hospital access",
    silver: "Category A + B",
    gold: "Category A + B",
    diamond: "Category A + B + C",
  },
  {
    label: "Admission",
    silver: "Semi-private",
    gold: "Private ward",
    diamond: "Private ward",
  },
  {
    // Gold and Diamond unstated at source. Spec § 12 question 1.
    label: "Admission days per trip",
    silver: "15 days",
  },
  {
    label: "Inpatient psychiatric care",
    silver: "First 2 days",
    gold: "First 3 days",
    diamond: "First 5 days",
  },
  {
    label: "CT, MRI & Doppler ultrasound",
    silver: "One per trip",
    gold: "Two per trip",
    diamond: "Unlimited",
  },
  {
    label: "Echocardiography, EEG & spirometry",
    silver: "One session",
    gold: "Two sessions",
    diamond: "Unlimited",
  },
  {
    label: "Diagnostic services",
    silver: "Basic",
    gold: "Enhanced",
    diamond: "Enhanced + unlimited CT",
  },
  {
    // Silver and Diamond unstated at source. Spec § 12 question 3.
    label: "Eye care",
    gold: "Extended",
  },
  {
    // Silver unstated at source. Spec § 12 question 3.
    label: "Surgical limits",
    gold: "Higher",
    diamond: "Maximum",
  },
  {
    label: "Emergency evacuation",
    silver: INCLUDED,
    gold: INCLUDED,
    diamond: INCLUDED,
  },
  {
    label: "24/7 emergency assistance",
    silver: INCLUDED,
    gold: INCLUDED,
    diamond: INCLUDED,
  },
  {
    label: "Prescription essential drugs",
    silver: INCLUDED,
    gold: INCLUDED,
    diamond: INCLUDED,
  },
] as const;

const INCLUSIONS: readonly CoverageInclusion[] = [
  {
    term: "Telemedicine",
    description:
      "Virtual consultations with licensed doctors, wherever you are.",
  },
  {
    term: "Roaming",
    description:
      "Your cover travels with you across the countries Omanga serves.",
  },
  {
    term: "24/7 dedicated contact centre",
    description: "Round-the-clock support when you need it.",
  },
  {
    term: "Health-tips newsletter",
    description: "Weekly wellness tips and health insights.",
  },
  {
    term: "Mobile app",
    description: "Manage your policy and claims on the go.",
  },
] as const;

export const insuranceCoverageContent: InsuranceCoverageContent = {
  anchorId: INSURANCE_COVERAGE_ANCHOR,
  heading: "What each plan covers",
  intro:
    "The full detail, side by side. If you're deciding between two plans, the differences are in the ward type, the scan allowances and the hospital categories you can access.",
  rows: ROWS,
  inclusionsHeading: "Included on every plan, whichever you choose",
  inclusions: INCLUSIONS,
} as const;

export const INSURANCE_COVERAGE_HEADING_ID =
  "insurance-coverage-heading" as const;
