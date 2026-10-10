import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_TAGLINE } from "@/config/site";
import { AfricanCoverage } from "@/components/sections/AfricanCoverage";
import { CTA } from "@/components/sections/CTA";
import { Faq } from "@/components/sections/Faq";
import { WhyOmanga } from "@/components/sections/WhyOmanga";
import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";
import { StepsV2 } from "@/components/home-v2/StepsV2";
import { Hero } from "@/components/sections/Hero";
import { ProductDeepDive } from "@/components/sections/ProductDeepDive";
import { Services } from "@/components/sections/Services";
import { SolutionsOverview } from "@/components/sections/SolutionsOverview";
import { TrustPartners } from "@/components/sections/TrustPartners";
import {
  COVERAGE_HEADING_ID,
  coverageContent,
} from "@/content/coverage.content";
import {
  DEEP_DIVE_HEADING_ID,
  deepDiveContent,
} from "@/content/deep-dive.content";
import { HERO_HEADING_ID, heroContent } from "@/content/hero.content";
import {
  SERVICES_HEADING_ID,
  servicesContent,
} from "@/content/services.content";
import {
  SOLUTIONS_HEADING_ID,
  solutionsContent,
} from "@/content/solutions.content";
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import { TRUST_HEADING_ID, trustContent } from "@/content/trust.content";

import { buildPageGraph } from "@/lib/schema";
import type { PageMetaContent } from "@/types/content.types";
import { buildPageMetadata } from "@/lib/seo";

/**
 * Homepage metadata. Values from the redesign spec § 5.2, with two corrections:
 * the spec's "Travel Money Card" becomes "Travel Money Wallet" because Omanga
 * issues no card, and the country count comes from the constant rather than the
 * spec's 52.
 *
 * [CHANGED, 2026-08-29] The count is interpolated. It was typed as 43, which is
 * how a meta description gets left behind when the figure moves — and it has now
 * moved to 50+. Nothing on this page types the number.
 */
const homeMeta: PageMetaContent = {
  // [CHANGED, 2026-10-07] Shortened on instruction so Google shows the brand
  // line, not a keyword string. Sitelink titles come from these, so short wins.
  title: SITE_TAGLINE,
  description: `Fund a multi-currency Omanga wallet in USD, GBP or CAD, spend across ${COUNTRIES_SERVED_DISPLAY} African countries, and add short-term holiday health insurance in one account.`,
  path: "/",
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
export const metadata: Metadata = buildPageMetadata(homeMeta);

export default function HomePage() {
  return (
    <>
      <JsonLd graph={buildPageGraph(homeMeta)} />

      <Hero content={heroContent} headingId={HERO_HEADING_ID} />

      {/*
        Phase 3.2. The real Solutions Overview section, rendered directly beneath
        the Hero in the homepage's specified order. Its heading is an `h2` and its
        card headings are `h3`s, so the outline below it continues to open at
        `h2` without skipping a level.
      */}
      <SolutionsOverview
        content={solutionsContent}
        headingId={SOLUTIONS_HEADING_ID}
      />

      {/*
        The real Trust / Partners strip, in the frame's order — it sits below the
        Solutions Overview at y 2066 on the homepage frame. Its label is an `h2`,
        so the outline below it still opens at `h2` without skipping a level.
      */}
      <TrustPartners content={trustContent} headingId={TRUST_HEADING_ID} />

      {/* Phase 3.3. Services — section 4 of the approved copy document. */}
      <Services content={servicesContent} headingId={SERVICES_HEADING_ID} />

      {/*
        [CHANGED, 2026-10-09] How it works is the v2 "connected circles" layout
        (pick S4, see design.md § Home v2 preview). Same approved copy, read from
        `how-it-works.content.ts` through `home-v2.content.ts`.
      */}
      <StepsV2 />

      {/* Phase 3.4. Product Deep Dive — section 6 of the approved copy document. */}
      <ProductDeepDive
        content={deepDiveContent}
        headingId={DEEP_DIVE_HEADING_ID}
      />

      {/*
        Phase 3.6. African Coverage. Appended after the sections already mounted
        rather than inserted at its position in the specified order — the brief
        forbids touching a previous section, and re-ordering the calls above would
        be doing exactly that. Its heading is an `h2`, so the outline below it
        still opens at `h2` without skipping a level.
      */}
      <AfricanCoverage
        content={coverageContent}
        headingId={COVERAGE_HEADING_ID}
      />

      {/*
        [CHANGED, 2026-10-09] v2 split card (pick W1), same approved copy.
        Since 2026-10-10 this design is the shared `WhyOmanga` on every page.
      */}
      <WhyOmanga content={homeV2Content.comparison} headingId={HOME_V2_IDS.comparison} />

      {/*
        [ADDED, 2026-10-09] v2 FAQ (pick Q1). Six questions from the approved
        Payments and Insurance FAQs, chosen as the ones a first-time visitor asks.
      */}
      <Faq content={homeV2Content.faq} headingId={HOME_V2_IDS.faq} />

      {/* [CHANGED, 2026-10-09] v2 panel with 3D objects (pick X1), same approved copy. Shared `CTA` since 2026-10-10. */}
      <CTA content={homeV2Content.closing} headingId={HOME_V2_IDS.closing} />
    </>
  );
}
