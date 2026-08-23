import type { Metadata } from "next";

import { CTA } from "@/components/sections/CTA";
import { InsuranceCoverage } from "@/components/sections/InsuranceCoverage";
import { InsuranceInclusions } from "@/components/sections/InsuranceInclusions";
import { InsurancePlans } from "@/components/sections/InsurancePlans";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_LOCALE, SITE_NAME } from "@/config/site";
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
import { buildPageGraph } from "@/lib/schema";
import type { PageMetaContent } from "@/types/content.types";

/**
 * The Plans page — built behind `/preview` while the legacy page stays live.
 *
 * `app/(legacy)/plans/page.tsx` owns `/plans`, and two route groups cannot
 * resolve to the same URL, so this builds at `/preview/plans` and is renamed
 * into place when the last section lands. The third route to follow that
 * sequence, after the homepage (41ff9c6) and the insurance page.
 *
 * Chrome comes from `app/(redesign)/layout.tsx`. This file holds section
 * composition only, and sections are mounted one per screenshot.
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
 * The move, when the last section lands
 *
 *   1. delete `app/(legacy)/plans/`
 *   2. `git mv "app/(redesign)/preview/plans" "app/(redesign)/plans"`
 *   3. flip `robots` below to `{ index: true, follow: true }`
 *   4. change `plansMeta.path` from `/preview/plans` to `/plans`
 *
 * `/plans` is already in `app/sitemap.ts`, already the nav's `Plans`
 * destination, already the footer's "Insurance Plans" link, and already where
 * `INSURANCE_PLANS_HREF` points — so none of those need touching on the move.
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
  path: "/preview/plans",
};

export const metadata: Metadata = {
  title: { absolute: plansMeta.title },
  description: plansMeta.description,
  alternates: { canonical: plansMeta.path },
  /*
    The preview route is publicly reachable, so it is kept out of the index
    explicitly — a crawler that found it would otherwise index a half-built page
    duplicating the one currently live at `/plans`.
  */
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: plansMeta.path,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    title: plansMeta.title,
    description: plansMeta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: plansMeta.title,
    description: plansMeta.description,
  },
};

export default function PlansPreviewPage() {
  /*
    `buildPageGraph` emits Organization, WebSite, this WebPage and the two
    Service nodes. § 11.5's `Product` + `Offer` ×3 belongs on this page rather
    than on `/insurance` now that the prices render here — it needs a builder in
    `lib/schema.ts`, which every page shares, so it lands with § 5 rather than
    ahead of it. Structured data must not describe content the page does not
    render.
  */
  return (
    <>
      <JsonLd graph={buildPageGraph(plansMeta)} />

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
