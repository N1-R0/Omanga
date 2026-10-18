import type { Metadata } from "next";

import { CTA } from "@/components/sections/CTA";
import { Faq } from "@/components/sections/Faq";
import { InsuranceCare } from "@/components/sections/InsuranceCare";
import { AccountFeatures } from "@/components/sections/AccountFeatures";
import { InsuranceProof } from "@/components/sections/InsuranceProof";
import { TrustPartners } from "@/components/sections/TrustPartners";
import { SkyHero } from "@/components/sections/SkyHero";
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
  insurancePhotoHeroContent,
} from "@/content/insurance-hero.content";
import {
  INSURANCE_PROOF_HEADING_ID,
  insuranceProofContent,
} from "@/content/insurance-proof.content";
import { TRUST_HEADING_ID, trustContent } from "@/content/trust.content";
import {
  INSURANCE_FAQ_HEADING_ID,
  insuranceFaqContent,
} from "@/content/insurance-faq.content";
import { buildFaqPage, buildPageGraph } from "@/lib/schema";
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
 * band's link, the closing CTA) are routes to `/plans` rather than
 * anchors, and all four now land on rendered content.
 */

/**
 * Title is set `absolute` by the shared builder, so it carries the brand itself.
 *
 * `og:image` is not set. The `(redesign)` segment's `opengraph-image.tsx`
 * applies to every route beneath it, so this page inherits a real 1200×630
 * image today.
 */
const insuranceMeta: PageMetaContent = {
  // [CHANGED, 2026-10-14] UX copy pass: cover applies in Nigeria only, so the
  // title names Nigeria ("travel insurance nigeria"), in the home "Omanga: …" form.
  // [CHANGED, 2026-10-18] Semrush keyword pass (design-lab/copy-seo-review-2026-10-18.md):
  // "travel insurance nigeria" / "…for nigeria" (UK 260 + 170/mo, KD 16)
  // lead the title; "health cover" keeps it honest (health only, no trip cover).
  title: "Travel Insurance for Nigeria: Health Cover from $50 | Omanga",
  description:
    "Travel insurance for Nigeria that covers your health: short-term plans from Phillips HMO, from $50 a month. Compare health plans.",
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
      <JsonLd
        graph={buildPageGraph(insuranceMeta, {
          crumb: "Holiday Insurance",
          services: ["insurance"],
          nodes: [buildFaqPage(insuranceMeta, insuranceFaqContent.items)],
        })}
      />

      {/*
        Stage 1. The hero — spec § 2, and the page's only `h1`. The outline
        below it opens at `h2` without skipping a level.
      */}
      {/*
        [CHANGED, 2026-10-15] The centred `InsuranceHero` band is replaced by
        `PhotoHero`, the home page's layout (owner request). On desktop the
        photo is pushed right and its left edge fades into the sampled sky, so
        the raised arms clear the copy; on small screens it starts low and
        fades in from the top.
      */}
      {/*
        [CHANGED, 2026-10-18] `PhotoHero` -> `SkyHero`, the shared hero every
        photo-hero page now uses (owner request). Same copy and heading id.
      */}
      <SkyHero
        headingId={INSURANCE_HERO_HEADING_ID}
        heading={insurancePhotoHeroContent.heading}
        intro={insurancePhotoHeroContent.intro}
        helper={insurancePhotoHeroContent.helper}
        actions={insurancePhotoHeroContent.actions}
      />

      {/*
        [REMOVED, 2026-10-15] Stage 2, the full-bleed photo band (the couple
        reading papers, insurance-consultation.jpg), removed at the owner's
        request. The photo hero now carries the page's imagery.
      */}

      {/*
        Stage 3. The untabbed deep dive. Its heading is an `h2` and its six
        feature headings are `h3`s, so the outline continues without skipping a
        level.

        [CONFLICT] The content spec's § 3 omits this section from this page
        entirely. Built on instruction; the objection and its reasoning are
        recorded in `content/insurance-deep-dive.content.ts`.
      */}
      {/* [CHANGED, 2026-10-15] The deep dive is now the features card grid (owner request). */}
      <AccountFeatures
        content={insuranceDeepDiveContent}
        headingId={INSURANCE_DEEP_DIVE_HEADING_ID}
      />

      {/*
        Stage 4. How care works — spec § 6.3, promoted from a sub-block to its
        own band with an `h2`. Light, after the dark deep dive, so the page
        alternates.

        [DEVIATION] The spec gives this section no CTA. `Compare health plans` added on
        instruction; see the content module.
      */}
      <InsuranceCare
        content={insuranceCareContent}
        headingId={INSURANCE_CARE_HEADING_ID}
      />

      {/*
        [REMOVED, 2026-10-18] The comparison split card (`WhyOmanga`), on the
        owner's instruction: removed from every page.
      */}

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
      {/*
        [ADDED, 2026-10-09] FAQ — not in the content spec. Added for search:
        answers phrased the way people ask, each naming Omanga. Dark between
        the light partners strip and the brand CTA. Its `FAQPage` node is in
        the graph above.
      */}
      <Faq content={insuranceFaqContent} headingId={INSURANCE_FAQ_HEADING_ID} />

      <CTA content={insuranceCtaContent} headingId={INSURANCE_CTA_HEADING_ID} />
    </>
  );
}
