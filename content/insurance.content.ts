export const INSURANCE_COVERAGE_ANCHOR = "coverage" as const;

export const INSURANCE_PLAN_NAMES = ["Silver", "Gold", "Diamond"] as const;

export type InsurancePlanName = (typeof INSURANCE_PLAN_NAMES)[number];
