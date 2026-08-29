import type { Metadata } from "next";

import { CTA } from "@/components/sections/CTA";
import { GetStartedEnquiry } from "@/components/sections/GetStartedEnquiry";
import { GetStartedHero } from "@/components/sections/GetStartedHero";
import { GetStartedImageBand } from "@/components/sections/GetStartedImageBand";
import { GetStartedSolutions } from "@/components/sections/GetStartedSolutions";
import { TrustPartners } from "@/components/sections/TrustPartners";
import { JsonLd } from "@/components/seo/JsonLd";

import {
  GET_STARTED_CTA_HEADING_ID,
  getStartedCtaContent,
} from "@/content/get-started-cta.content";
import {
  GET_STARTED_ENQUIRY_HEADING_ID,
  getStartedEnquiryContent,
} from "@/content/get-started-enquiry.content";
import {
  GET_STARTED_HERO_HEADING_ID,
  getStartedHeroContent,
} from "@/content/get-started-hero.content";
import { getStartedImageContent } from "@/content/get-started-image.content";
import {
  GET_STARTED_SOLUTIONS_HEADING_ID,
  getStartedSolutionsContent,
} from "@/content/get-started-solutions.content";
import { TRUST_HEADING_ID, trustContent } from "@/content/trust.content";
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import { buildPageGraph } from "@/lib/schema";
import type { PageMetaContent } from "@/types/content.types";
import { buildPageMetadata } from "@/lib/seo";

/**
 * The Get Started page — a router, not a landing page.
 *
 * A new route in the `(redesign)` group, which is what gives it the redesigned
 * chrome: the skip link, the `header`, the `main` landmark and the `footer` are
 * all owned by `app/(redesign)/layout.tsx` and are not re-declared here. Per
 * coding-guidelines.md, "shared chrome in `layout.tsx`; pages hold section
 * composition only" — so this file will only ever grow section calls.
 *
 * The page is built section by section from screenshots, so this file grows one
 * call at a time. No band is mounted before its screenshot arrives — a
 * placeholder would be exactly the invented content project-context.md forbids.
 *
 * ---------------------------------------------------------------------------
 * Metadata source
 *
 * Values are from `get-started-seo.md` § Meta, with one correction that
 * project-context.md § Non-negotiable copy facts requires: the country count is
 * **43, not 52**. The SEO document's description says 52; the CEO-approved copy
 * document's tracked changes replace every 52 with 43, and copy outranks the
 * spec. `COUNTRIES_SERVED` is interpolated rather than typed so the number
 * cannot drift from the rest of the site.
 *
 * [QUESTION] Title choice. The SEO document's primary recommendation omits the
 * brand, and that is what ships here. It also offers
 * `Get Started with Omanga | Payments & Travel Insurance, Africa` "if
 * brand-in-title is a house rule" — and the homepage's title does end in
 * "| Omanga", which reads like one. Raised rather than resolved: it is a
 * one-line change and it should be a deliberate decision, not an inference
 * drawn from a single sibling page.
 *
 * `og:image` is not set here. The `(redesign)` segment's `opengraph-image.tsx`
 * already applies to every route beneath it, so this page inherits a real
 * 1200×630 image today. The SEO document asks for the new hero photograph
 * instead; that becomes a per-route override once the asset exists, which is
 * the Hero stage, not this one.
 */
const getStartedMeta: PageMetaContent = {
  title: "Get Started | Travel Payments & Holiday Insurance for Africa",
  description: `Choose Omanga Payment Solutions, Omanga Holiday Insurance, or both. One account for spending across ${COUNTRIES_SERVED_DISPLAY} African countries and short-term travel medical cover.`,
  path: "/get-started",
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
export const metadata: Metadata = buildPageMetadata(getStartedMeta);

export default function GetStartedPage() {
  /*
    `buildPageGraph` emits Organization, WebSite, this WebPage and the two
    Service nodes — which is every graph node the SEO document lists for this
    page except `BreadcrumbList` and the form's `ContactPoint`. Both are
    outstanding and neither is inventable yet: the breadcrumb's middle crumb is
    "Solutions", a route that does not exist, and the ContactPoint attaches to a
    form that is section 4.
  */
  return (
    <>
      <JsonLd graph={buildPageGraph(getStartedMeta, { crumb: "Get Started" })} />

      {/*
        Stage 3. The hero — section 2 of the approved copy document, and the
        page's only `h1`. Its heading is an `h1`, so the outline below it opens at
        `h2` without skipping a level.
      */}
      <GetStartedHero
        content={getStartedHeroContent}
        headingId={GET_STARTED_HERO_HEADING_ID}
      />

      {/*
        Stage 4. The full-bleed photographic band. It carries no heading, so it
        contributes nothing to the outline and the next section still opens at
        `h2` without skipping a level.
      */}
      <GetStartedImageBand image={getStartedImageContent} />

      {/*
        Stage 5. The Two Solutions — section 3 of the approved copy document, and
        the page's core job. Its heading is an `h2` and its panel headings are
        `h3`s, so the outline continues without skipping a level.
      */}
      <GetStartedSolutions
        content={getStartedSolutionsContent}
        headingId={GET_STARTED_SOLUTIONS_HEADING_ID}
      />

      {/*
        Stage 6. The partners strip, reused rather than rebuilt. `TrustPartners`
        takes its content and its heading id as props and knows nothing about
        which page renders it, so it needs no change to appear here — the same
        arrangement the Header and Footer already have.

        Position mirrors the homepage's: the strip follows the two solutions.
        Its label is an `h2`, so the outline continues without skipping a level.

        [CONFLICT] `get-started-seo.md` § E-E-A-T lists partner logos among the
        three things "deliberately absent from this page", alongside stat counters
        and testimonials: "All three live on the homepage. Repeating them here
        would dilute a router into a second homepage and add nothing the visitor
        hasn't already seen if they arrived by the intended path." Mounted on
        explicit instruction; raised rather than resolved silently.

        [NOTE] Both this strip and the section above it are light, where
        component-rules.md asks consecutive sections to alternate surface. The
        same pairing already exists on the homepage, and the strip's `tight`
        rhythm and logo-row layout make it read as a strip rather than as a
        second white section. Surface alternation is a page-composition decision,
        which is why it is recorded here rather than inside the component.
      */}
      <TrustPartners content={trustContent} headingId={TRUST_HEADING_ID} />

      {/*
        Stage 7. The closing enquiry section — section 4 of the approved copy
        document, and the page's only brand-filled band, so the page alternates
        here after three light sections. Its heading is an `h2`, which completes
        the outline the SEO document specifies: one `h1`, the solutions `h2` with
        two `h3`s, and this `h2`.
      */}
      <GetStartedEnquiry
        content={getStartedEnquiryContent}
        headingId={GET_STARTED_ENQUIRY_HEADING_ID}
      />

      {/*
        Stage 8. The closing CTA band, reused rather than rebuilt — `CTA` takes its
        content and heading id as props and knows nothing about which page mounts
        it. Brand fill after the dark enquiry section, so the page still alternates.

        Its action is the homepage hero's "Open Your Free Wallet" rather than the
        site's `Get Started` primary, which now resolves to this page. See
        `content/get-started-cta.content.ts`.

        [DEFECT] Its heading duplicates the enquiry section's above it — both are
        § Section 4's approved heading, and the approved document gives this page
        one closing section rather than two. Recorded in the content module with
        the three ways out; it needs a copy decision, not a code change.
      */}
      <CTA
        content={getStartedCtaContent}
        headingId={GET_STARTED_CTA_HEADING_ID}
      />
    </>
  );
}
