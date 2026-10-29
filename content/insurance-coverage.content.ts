import { INSURANCE_COVERAGE_ANCHOR } from "@/content/insurance.content";

export type CoverageRow = {
  readonly label: string;
  readonly silver?: string;
  readonly gold?: string;
  readonly diamond?: string;
};

export type InsuranceCoverageContent = {
  readonly anchorId: typeof INSURANCE_COVERAGE_ANCHOR;
  readonly featureColumnLabel: string;
  readonly tableLabel: string;
  readonly scrollHint: string;
  readonly heading: string;
  readonly intro: string;
  readonly rows: readonly CoverageRow[];
};

export const INCLUDED = "Included" as const;

const ROWS: readonly CoverageRow[] = [
  {
    label: "Monthly price",
    silver: "$50",
    gold: "$85",
    diamond: "$120",
  },
  {
    label: "Hospital access",
    silver: "Category A",
    gold: "Category A + B",
    diamond: "Category A + B + C",
  },
  {
    label: "Ward type",
    silver: "Semi-private",
    gold: "Private ward",
    diamond: "Private ward",
  },
  {
    label: "Hospital admission days per trip",
    silver: "15 days",
  },
  {
    label: "Psychiatric care in hospital",
    silver: "First 2 days",
    gold: "First 3 days",
    diamond: "First 5 days",
  },
  {
    label: "CT, MRI and Doppler ultrasound",
    silver: "One per trip",
    gold: "Two per trip",
    diamond: "Unlimited",
  },
  {
    label: "Echocardiography, EEG and spirometry",
    silver: "One session",
    gold: "Two sessions",
    diamond: "Unlimited",
  },
  {
    label: "Diagnostics",
    silver: "Basic",
    gold: "Enhanced",
    diamond: "Enhanced + unlimited CT",
  },
  {
    label: "Eye care",
    gold: "Extended",
  },
  {
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
    label: "Emergency assistance",
    silver: INCLUDED,
    gold: INCLUDED,
    diamond: INCLUDED,
  },
  {
    label: "Essential prescription drugs",
    silver: INCLUDED,
    gold: INCLUDED,
    diamond: INCLUDED,
  },
] as const;

export const insuranceCoverageContent: InsuranceCoverageContent = {
  anchorId: INSURANCE_COVERAGE_ANCHOR,
  featureColumnLabel: "Benefit",
  tableLabel: "Health plan comparison",
  scrollHint: "Scroll sideways to see every plan.",
  heading: "What each health plan covers",
  intro:
    "Every benefit, side by side. Plans differ most in ward type, scans and hospital access.",
  rows: ROWS,
} as const;

export const INSURANCE_COVERAGE_HEADING_ID =
  "insurance-coverage-heading" as const;
