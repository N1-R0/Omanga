/**
 * Insurance page — shared constants and the provenance note for every
 * `insurance-*.content.ts` module.
 *
 * Source: `Omanga-Insurance-Page-Content-Spec.md`, 26 July 2026, which is a
 * content specification rather than an approved copy document. It states its
 * own sources as the approved Homepage Redesign v2 and two insurance
 * screenshots, and carries eleven `[VERIFY]` tokens of its own.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATION, page-wide] The spec says 52 African countries. The site says 43.
 *
 * `project-context.md` § Non-negotiable copy facts records 43 as a resolved
 * conflict — the CEO-approved copy document's tracked changes replace every 52
 * with 43 — and `COUNTRIES_SERVED` already owns the figure everywhere else on
 * the site. Every "52" in the spec is therefore interpolated as
 * `COUNTRIES_SERVED` rather than typed, in the hero, § 4 card 1, § 7 row 5 and
 * the § 8 stat row. The spec inherited 52 from the live pages, which are the
 * pages the tracked change was correcting.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] Unverified values are omitted, not guessed.
 *
 * coding-guidelines.md: "Missing or unverified content renders nothing rather
 * than a placeholder, an empty container, or invented data." Every `[VERIFY]`
 * cell in the spec is therefore absent from these modules and each absence is
 * marked at its site. The visible consequence is a comparison table with holes
 * in it, which is the correct behaviour: the holes are the spec's § 12 open
 * questions, and a table that quietly inherited "Everything in Silver +" would
 * hide four commercially significant unknowns behind a tick.
 *
 * ---------------------------------------------------------------------------
 * [CONFLICT] § 1 of the spec is not applied.
 *
 * It removes `Plans` and `Coverage` from the global nav and 301s `/plans` and
 * `/coverage` into this page's anchors. Instructed otherwise: `Plans` stays a
 * nav item pointing at the real `/plans` route. Only the footer's `Coverage`
 * link moves, because `/coverage` never existed — it was flagged
 * `isRoutePending`, and this page's § 6 is now a real destination for it.
 *
 * § 1 also specifies `USD ▾` and `Log in` beside an `Open Free Account` header
 * CTA. Not applied: the primary stays `Get Started` → `/get-started`, and the
 * currency indicator and account link remain the two open content blockers
 * recorded in `navigation.content.ts`.
 */

/**
 * In-page anchors.
 *
 * Ids rather than hrefs, so the section that renders the heading and the links
 * that point at it read the same constant. `#` is added at the link site.
 */
export const INSURANCE_PLANS_ANCHOR = "plans" as const;
export const INSURANCE_COVERAGE_ANCHOR = "coverage" as const;

export const INSURANCE_PLANS_HREF = `#${INSURANCE_PLANS_ANCHOR}` as const;
export const INSURANCE_COVERAGE_HREF = `#${INSURANCE_COVERAGE_ANCHOR}` as const;

/**
 * The three tiers, in the approved order.
 *
 * Named here because § 5 and § 6 both key off them and the two must not drift.
 * "Package" is dropped per spec § 5 § Naming — the live cards read "Silver
 * Package", and one of them reads "Sliver Package", a P0 typo currently in
 * production.
 */
export const INSURANCE_PLAN_NAMES = ["Silver", "Gold", "Diamond"] as const;

export type InsurancePlanName = (typeof INSURANCE_PLAN_NAMES)[number];
