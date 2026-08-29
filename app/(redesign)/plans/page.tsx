import type { Metadata } from "next";

import { CTA } from "@/components/sections/CTA";
import { InsuranceCoverage } from "@/components/sections/InsuranceCoverage";
import { InsuranceInclusions } from "@/components/sections/InsuranceInclusions";
import { InsurancePlans } from "@/components/sections/InsurancePlans";
import { JsonLd } from "@/components/seo/JsonLd";

import {
  INSURANCE_COVERAGE_HEADING_ID,
  insuranceCoverageContent,
} from "@/content/insurance-coverage.content";
import {
  INSURANCE_INCLUSIONS_HEADING_ID,
  insuranceInclusionsContent,
} from "@/content/insurance-inclusions.content";
import {
  INSURANCE_PLANS_HEADING_ID,
  insurancePlansContent,
} from "@/content/insurance-plans.content";
import {
  PLANS_CTA_HEADING_ID,
  plansCtaContent,
} from "@/content/plans-cta.content";
import { buildPageGraph, buildPlanProducts } from "@/lib/schema";
import type { PageMetaContent } from "@/types/content.types";
import { buildPageMetadata } from "@/lib/seo";

/**
 * The Plans page.
 *
 * Built at `(redesign)/preview/plans` while `app/(legacy)/plans` held the live
 * `/plans` route — two route groups cannot own the same URL, so the redesign
 * could not sit at its real path until the legacy page went. Now moved into
 * place: the legacy page is deleted, this route owns `/plans`, and the
 * `preview` segment is gone with it. The third route to follow that sequence,
 * after the homepage (41ff9c6) and the insurance page.
 *
 * Chrome comes from `app/(redesign)/layout.tsx`. This file holds section
 * composition only.
 *
 * Three of the legacy group's pages remain — `/about`, `/contact` and
 * `/payments`. Until they move, navigating between the two groups is a full
 * page load, because each group owns a separate root layout.
 *
 * ---------------------------------------------------------------------------
 * Each card's button goes to that tier's own Paystack page, as on the legacy
 * page — `PLAN_CHECKOUT_URLS` in `config/site.ts`, read by
 * `insurance-plans.content.ts`. The redesign had briefly pointed all three at
 * `WALLET_URL`, which made the buyer choose the tier a second time after
 * leaving. The `[VERIFY]` on which Paystack page belongs to which tier is
 * recorded at the constant.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATION] The content spec has no plans *page*.
 *
 * `Omanga-Insurance-Page-Content-Spec` § 5 and § 6 are sections of the
 * insurance page, addressed as `#plans` and `#coverage`, and § 1 requires
 * `/plans` to 301 into them: "This keeps the homepage focused… and concentrates
 * all plan-detail authority on one URL instead of splitting it across three
 * thin pages."
 *
 * Instructed otherwise. The consequence to watch is the one § 1 names — plan
 * detail now lives on its own URL rather than on the page that argues for it,
 * so `/insurance` and `/plans` both target plan intent and each has to earn its
 * own inbound links. `content/insurance.content.ts` records the same conflict
 * from the insurance side.
 *
 * The content is ready: `insurance-plans.content.ts` (§ 5) and
 * `insurance-coverage.content.ts` (§ 6.1 and § 6.2). Both keep their
 * `insurance-` prefix because they are insurance plans wherever they render.
 *
 * ---------------------------------------------------------------------------
 * [PROVISIONAL] "Choose your plan" is the page's `h1`.
 *
 * § 5's heading is an `h2` in the spec, under the insurance page's `h1`. On its
 * own page something has to take the top level and there is no hero, so it is
 * promoted and the tier names follow as `h2`s. The alternative is a hero band
 * above it, which needs an `h1` and a paragraph that exist in no approved
 * document. Reversible in one prop pair — see `InsurancePlans`.
 *
 * ---------------------------------------------------------------------------
 * `/plans` was already in `app/sitemap.ts`, already the nav's `Plans`
 * destination, already the footer's "Insurance Plans" link, and already where
 * `INSURANCE_PLANS_HREF` points — so the move touched none of them.
 */

/**
 * [PENDING COPY] Title and description are provisional.
 *
 * § 11.1 supplies meta for `/insurance` only. Rather than leave the page
 * untitled, both strings are assembled from § 5's own approved copy — the three
 * tier names and the $50 entry price — and deliberately avoid repeating the
 * insurance page's title, which would put two near-identical titles on two URLs
 * targeting the same intent.
 *
 * Replace when meta for this page is written.
 */
const plansMeta: PageMetaContent = {
  title: "Insurance Plans — Silver, Gold and Diamond | Omanga",
  description:
    "Compare Omanga Holiday Insurance plans side by side. Silver, Gold and Diamond from $50 a month, with ward type, scan allowances and hospital access set out in full.",
  path: "/plans",
};

/**
 * Metadata comes from the shared builder in `lib/seo.ts`.
 *
 * [REPLACED] A hand-written ~20-line object, one of six near-identical copies.
 * Five of those six shipped no `og:image` and no `twitter:image` at all — the
 * pages shared as a bare link with no card. The builder sets the share image for
 * every page, so that class of omission cannot recur. Its own comment records
 * how the gap arose.
 */
export const metadata: Metadata = buildPageMetadata(plansMeta);

export default function PlansPage() {
  /*
    `buildPageGraph` emits Organization, WebSite, this WebPage and the two
    Service nodes.

    [SHIPPED] § 11.5's `Product` + `Offer` ×3, which this note deferred until the
    builder existed and § 5 had landed. Both are now true, so it is emitted.

    The condition the note set — "structured data must not describe content the
    page does not render" — is met literally: the products are built from
    `insurancePlansContent.plans`, the same array the cards above render from, so
    the marked-up name, description and price are the strings on the page rather
    than a second copy of them. `buildPlanProducts` records what is deliberately
    left out, and why.
  */
  return (
    <>
      <JsonLd
        graph={buildPageGraph(plansMeta, {
          crumb: "Insurance Plans",
          nodes: buildPlanProducts(
            insurancePlansContent.plans.map((plan) => ({
              name: plan.name,
              description: plan.description,
              price: plan.price,
              currency: insurancePlansContent.currency,
              url: plan.action.href,
            })),
          ),
        })}
      />

      {/*
        Stage 1. Choose your plan — spec § 5. Carries the page's `h1`; see the
        section component for why it is promoted from the spec's `h2`.
      */}
      <InsurancePlans
        content={insurancePlansContent}
        headingId={INSURANCE_PLANS_HEADING_ID}
      />

      {/*
        Stage 2. What each plan covers — spec § 6.1 and § 6.2, and the target of
        every `#coverage` link on the site. Its `h2` and the inclusions `h3`
        continue the outline without skipping a level.

        The plans are handed straight through, so the table's three column
        headers are the same three objects the cards above render.
      */}
      <InsuranceCoverage
        content={insuranceCoverageContent}
        plans={insurancePlansContent.plans}
        headingId={INSURANCE_COVERAGE_HEADING_ID}
      />

      {/*
        Stage 3. Included on every plan — spec § 6.2, lifted out of the coverage
        section into a band of its own because the Figma frame draws it as a
        standalone three-column grid. Its `h2` and five `h3` terms continue the
        outline without skipping a level.
      */}
      <InsuranceInclusions
        content={insuranceInclusionsContent}
        headingId={INSURANCE_INCLUSIONS_HEADING_ID}
      />

      {/*
        Stage 4. The closing CTA band. `CTA` is reused unchanged; only the
        action differs from the insurance page's, because that one points at
        this page. Brand fill after three light bands, so the page closes on its
        one emphasis surface.
      */}
      <CTA content={plansCtaContent} headingId={PLANS_CTA_HEADING_ID} />
    </>
  );
}
