import type { Metadata } from "next";

import { CTA } from "@/components/sections/CTA";
import { GetStartedImageBand } from "@/components/sections/GetStartedImageBand";
import { InsuranceCare } from "@/components/sections/InsuranceCare";
import { InsuranceDeepDive } from "@/components/sections/InsuranceDeepDive";
import { InsuranceHero } from "@/components/sections/InsuranceHero";
import { InsuranceProof } from "@/components/sections/InsuranceProof";
import { TrustPartners } from "@/components/sections/TrustPartners";
import { WhyOmanga } from "@/components/sections/WhyOmanga";
import { JsonLd } from "@/components/seo/JsonLd";

import {
  INSURANCE_CARE_HEADING_ID,
  insuranceCareContent,
} from "@/content/insurance-care.content";
import {
  INSURANCE_CTA_HEADING_ID,
  insuranceCtaContent,
} from "@/content/insurance-cta.content";
import {
  INSURANCE_DEEP_DIVE_HEADING_ID,
  insuranceDeepDiveContent,
} from "@/content/insurance-deep-dive.content";
import {
  INSURANCE_HERO_HEADING_ID,
  insuranceHeroContent,
} from "@/content/insurance-hero.content";
import { insuranceImageContent } from "@/content/insurance-image.content";
import {
  INSURANCE_PROOF_HEADING_ID,
  insuranceProofContent,
} from "@/content/insurance-proof.content";
import {
  INSURANCE_WHY_HEADING_ID,
  insuranceWhyContent,
} from "@/content/insurance-why.content";
import { TRUST_HEADING_ID, trustContent } from "@/content/trust.content";
import { buildPageGraph } from "@/lib/schema";
import type { PageMetaContent } from "@/types/content.types";
import { buildPageMetadata } from "@/lib/seo";

/**
 * The Insurance page.
 *
 * Built at `(redesign)/preview/insurance` while `app/(legacy)/insurance` held
 * the live `/insurance` route — two route groups cannot own the same URL, so
 * the redesign could not sit at its real path until the legacy page went. Now
 * moved into place: the legacy page is deleted, this route owns `/insurance`,
 * and the preview segment is gone. The same sequence the homepage followed in
 * commit 41ff9c6.
 *
 * The chrome is not declared here. The skip link, `header`, `main` landmark and
 * `footer` all come from `app/(redesign)/layout.tsx`. Per "shared chrome in
 * `layout.tsx`; pages hold section composition only", this file holds section
 * calls and nothing else.
 *
 * Three of the legacy group's pages remain — `/about`, `/contact` and
 * `/payments`. Until they move, navigating between the two groups is a full
 * page load, because each group owns a separate root layout.
 *
 * ---------------------------------------------------------------------------
 * Spec § 5 Insurance plans and § 6 Plan details & coverage are not sections of
 * this page. Both are mounted on `app/(redesign)/plans/page.tsx` instead — see
 * the `[CHANGED]` note in `content/insurance.content.ts` — so the four controls
 * the spec sends to `#plans` (the hero primary, § 4's contextual link, the care
 * band's `View plans`, the closing CTA) are routes to `/plans` rather than
 * anchors, and all four now land on rendered content.
 */

/**
 * Title and description are verbatim from `Omanga-Insurance-Page-Content-Spec`
 * § 11.1, which states them as 58 and 154 characters. Both are transcribed
 * rather than interpolated: neither contains a country count, so the 52/43
 * correction applied across the content modules does not reach them.
 *
 * The title already ends in "| Omanga", so it is set `absolute` — the layout's
 * `%s | Omanga` template would otherwise append the brand twice.
 *
 * `og:image` is not set. The `(redesign)` segment's `opengraph-image.tsx`
 * applies to every route beneath it, so this page inherits a real 1200×630
 * image today. § 11.1 asks for OG image to be "set"; a per-route override
 * becomes possible once the hero photograph exists.
 */
const insuranceMeta: PageMetaContent = {
  title: "Travel Health Insurance for Africa — Plans from $50 | Omanga",
  description:
    "Short-term travel health insurance for Africa. Silver, Gold and Diamond plans from $50/month, delivered through established Nigerian health providers.",
  path: "/insurance",
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
export const metadata: Metadata = buildPageMetadata(insuranceMeta);

export default function InsurancePreviewPage() {
  /*
    `buildPageGraph` emits Organization, WebSite, this WebPage and the two
    Service nodes. Two nodes § 11.5 asks for are deliberately not emitted yet:

      - `Product` + `Offer` ×3. The prices exist in
        `content/insurance-plans.content.ts`, but § 5 is not built, and
        structured data that describes content the page does not render is a
        markup violation before it is an SEO decision. Add it with the section.
      - `BreadcrumbList`. Home → Insurance, now that the path is real. It needs
        a builder in `lib/schema.ts`, which every page shares, so it is a change
        of its own rather than a rider on this move.
  */
  return (
    <>
      <JsonLd graph={buildPageGraph(insuranceMeta, { crumb: "Holiday Insurance" })} />

      {/*
        Stage 1. The hero — spec § 2, and the page's only `h1`. The outline
        below it opens at `h2` without skipping a level.
      */}
      <InsuranceHero
        content={insuranceHeroContent}
        headingId={INSURANCE_HERO_HEADING_ID}
      />

      {/*
        Stage 2. The full-bleed photographic band. It carries no heading, so it
        contributes nothing to the outline.

        [NAMING] `GetStartedImageBand` is reused rather than rebuilt — it takes
        an asset and knows nothing about which page renders it, exactly like
        `TrustPartners` and `CTA`. Its name is now wrong: it is the site's
        full-bleed parallax band and belongs at `components/sections/ImageBand`.
        Left alone here because renaming it means editing a shipped page, which
        is outside this phase.
      */}
      <GetStartedImageBand image={insuranceImageContent} />

      {/*
        Stage 3. The untabbed deep dive. Its heading is an `h2` and its six
        feature headings are `h3`s, so the outline continues without skipping a
        level.

        [CONFLICT] The content spec's § 3 omits this section from this page
        entirely. Built on instruction; the objection and its reasoning are
        recorded in `content/insurance-deep-dive.content.ts`.
      */}
      <InsuranceDeepDive
        content={insuranceDeepDiveContent}
        headingId={INSURANCE_DEEP_DIVE_HEADING_ID}
      />

      {/*
        Stage 4. How care works — spec § 6.3, promoted from a sub-block to its
        own band with an `h2`. Light, after the dark deep dive, so the page
        alternates.

        [DEVIATION] The spec gives this section no CTA. `View plans` added on
        instruction; see the content module.
      */}
      <InsuranceCare
        content={insuranceCareContent}
        headingId={INSURANCE_CARE_HEADING_ID}
      />

      {/*
        Stage 5. Why choose Omanga Insurance — spec § 7.

        `WhyOmanga` is reused rather than rebuilt. It takes its content and its
        heading id as props and knows nothing about which page renders it, the
        same arrangement `TrustPartners` and `CTA` already have — so the two
        comparisons on the site render through one set of components and cannot
        drift apart. Its `h2` and two `h3` column titles continue the outline
        without skipping a level.

        Dark, after the light care band, so the page still alternates.
      */}
      <WhyOmanga
        content={insuranceWhyContent}
        headingId={INSURANCE_WHY_HEADING_ID}
      />

      {/*
        Stage 6. Who stands behind your cover — spec § 8. Light, after the dark
        comparison, so the page alternates. Its `h2` continues the outline; the
        stat figures are a `dl` and contribute nothing to it.
      */}
      <InsuranceProof
        content={insuranceProofContent}
        headingId={INSURANCE_PROOF_HEADING_ID}
      />

      {/*
        Stage 7. The partners strip, reused rather than rebuilt — the same
        arrangement the homepage and Get Started already have.

        Position is deliberate: it sits directly under § 8's argument, which is
        the one section on the page the logos actually evidence. On the homepage
        the strip proves nothing in particular; here it is the provider network
        the paragraph above it just described.

        [UNRESOLVED] The logos are still unlabelled. Spec § 8 wants each one
        named — "Health cover partner", "Payments partner", "Technology partner"
        — and calls the labelling "the whole point", because for an insurance
        product the provider relationship *is* the credibility. All three roles
        are `[VERIFY]` (§ 12 question 5), and `TrustPartners` takes bare
        `ImageAsset`s with no role field. Labelling them means confirming the
        roles first and then extending the shared component, which would change
        the homepage too.

        [NOTE] Light on light, following § 8. The same pairing the Get Started
        page already carries: the strip's `tight` rhythm and single logo row make
        it read as a strip rather than as a second white section.
      */}
      <TrustPartners content={trustContent} headingId={TRUST_HEADING_ID} />

      {/*
        Stage 8. The closing CTA band — spec § 9, the form slot with the form
        removed. `CTA` is reused unchanged; only the content differs.

        Brand fill after two light bands, so the page closes on its one emphasis
        surface. Its `h2` completes the outline.
      */}
      <CTA
        content={insuranceCtaContent}
        headingId={INSURANCE_CTA_HEADING_ID}
      />
    </>
  );
}
