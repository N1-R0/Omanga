import type { Metadata } from "next";

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

/**
 * Foundation smoke check — a development surface, not a page of the site.
 *
 * It exists for two reasons:
 *
 *   1. It gives the `(redesign)` root layout a route, so the layout is
 *      actually exercised by the build instead of sitting inert.
 *   2. It renders the token layer, both font families and every primitive
 *      that has one, so a design review can check colour, type scale, spacing
 *      and focus behaviour in a browser before any real section is built.
 *
 * Phase 3 renders the real Hero section at the top of this route so it can be
 * reviewed in a browser without creating `app/(redesign)/page.tsx` — mounting the
 * homepage is a routing decision belonging to the cutover phase, not to a section
 * build. Everything below the Hero remains the primitive smoke check.
 *
 * At cutover the homepage moves to `app/(redesign)/page.tsx`, that page replaces
 * `app/(legacy)/page.tsx`, and this route is deleted.
 *
 * Deliberately carries no marketing copy. Every string below names the thing
 * it is demonstrating — nothing here is drafted, and nothing is a placeholder
 * for approved copy.
 */

export const metadata: Metadata = {
  title: "Foundation preview",
  // Thin, internal, and temporary. It must never be indexed or followed.
  robots: { index: false, follow: false },
};

export default function FoundationPreviewPage() {
  return (
    <>
      {/*
        The real Hero. It owns the page's single `h1`, which is why the smoke
        check below now opens at `h2` — two `h1`s would break the outline and the
        "exactly one H1" rule the SEO plan sets out.
      */}
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
