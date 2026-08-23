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
 * Where the plan content lives.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] Both destinations are on `/plans`, not anchors on this page.
 *
 * Spec § 5 and § 6 are sections of the insurance page, addressed as `#plans`
 * and `#coverage`, and § 1 301s `/plans` into them. Instructed otherwise: the
 * plan grid and the comparison table become a standalone `/plans` page, which
 * is also the route the nav's `Plans` item already points at.
 *
 * So `INSURANCE_PLANS_HREF` is a route, not a fragment. Every link that the
 * spec sends to `#plans` — the hero primary, § 4's contextual link, the care
 * band's `View plans`, the closing CTA — now leaves the page. Four controls,
 * one constant, which is why they read this rather than typing a path.
 *
 * Until `/plans` is redesigned they resolve to the legacy page. That is a real
 * page about the plans, so the links work; they simply cross into the old
 * design until the redesign moves into place.
 *
 * `INSURANCE_COVERAGE_ANCHOR` survives as a real anchor, because the comparison
 * table is a section *within* `/plans` and § 5's "see the full comparison" link
 * still jumps to it.
 */
export const INSURANCE_PLANS_HREF = "/plans" as const;

export const INSURANCE_COVERAGE_ANCHOR = "coverage" as const;
export const INSURANCE_COVERAGE_HREF =
  `${INSURANCE_PLANS_HREF}#${INSURANCE_COVERAGE_ANCHOR}` as const;

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
