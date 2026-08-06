import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { AfricanCoverage } from "@/components/sections/AfricanCoverage";
import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProductDeepDive } from "@/components/sections/ProductDeepDive";
import { Services } from "@/components/sections/Services";
import { SolutionsOverview } from "@/components/sections/SolutionsOverview";
import { TrustPartners } from "@/components/sections/TrustPartners";
import { WhyOmanga } from "@/components/sections/WhyOmanga";
import {
  COVERAGE_HEADING_ID,
  coverageContent,
} from "@/content/coverage.content";
import { CTA_HEADING_ID, ctaContent } from "@/content/cta.content";
import {
  DEEP_DIVE_HEADING_ID,
  deepDiveContent,
} from "@/content/deep-dive.content";
import { HERO_HEADING_ID, heroContent } from "@/content/hero.content";
import {
  HOW_IT_WORKS_HEADING_ID,
  howItWorksContent,
} from "@/content/how-it-works.content";
import {
  SERVICES_HEADING_ID,
  servicesContent,
} from "@/content/services.content";
import {
  SOLUTIONS_HEADING_ID,
  solutionsContent,
} from "@/content/solutions.content";
import { TRUST_HEADING_ID, trustContent } from "@/content/trust.content";
import {
  WHY_OMANGA_HEADING_ID,
  whyOmangaContent,
} from "@/content/why-omanga.content";
import { SITE_LOCALE, SITE_NAME } from "@/config/site";
import { buildPageGraph } from "@/lib/schema";
import type { PageMetaContent } from "@/types/content.types";

/**
 * Homepage metadata. Values from the redesign spec § 5.2, with the two
 * corrections project-context.md § Non-negotiable copy facts requires: the
 * country count is 43, not the spec's 52, and the spec's "Travel Money Card"
 * becomes "Travel Money Wallet" because Omanga issues no card.
 */
const homeMeta: PageMetaContent = {
  title: "Travel Money Wallet & Holiday Insurance for Africa | Omanga",
  description:
    "Fund a multi-currency Omanga wallet in USD, GBP or CAD, spend across 43 African countries, and add short-term holiday health insurance in one account.",
  path: "/",
};

export const metadata: Metadata = {
  title: { absolute: homeMeta.title },
  description: homeMeta.description,
  alternates: { canonical: homeMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: homeMeta.path,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    title: homeMeta.title,
    description: homeMeta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: homeMeta.title,
    description: homeMeta.description,
  },
};

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

      {/* Phase 3.5. How Omanga Works — section 5 of the approved copy document. */}
      <HowItWorks
        content={howItWorksContent}
        headingId={HOW_IT_WORKS_HEADING_ID}
      />

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
        Phase 3.7. Why Omanga. Appended after the sections already mounted, for the
        same reason African Coverage was — re-ordering the calls above would be
        modifying a previous section. Dark surface, so the page alternates here.
        Its heading is an `h2` and its column headings are `h3`s, so the outline
        below it still opens at `h2` without skipping a level.
      */}
      <WhyOmanga content={whyOmangaContent} headingId={WHY_OMANGA_HEADING_ID} />

      {/*
        Phase 3.8. The closing CTA band — the only brand-filled section on the
        page. Appended after the sections already mounted, for the same reason the
        two before it were. Its heading is an `h2`, so the outline below it still
        opens at `h2` without skipping a level.
      */}
      <CTA content={ctaContent} headingId={CTA_HEADING_ID} />
    </>
  );
}
