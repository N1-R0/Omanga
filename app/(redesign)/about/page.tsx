import type { Metadata } from "next";

import { CTA } from "@/components/sections/CTA";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutImpact } from "@/components/sections/AboutImpact";
import { AboutMissionVision } from "@/components/sections/AboutMissionVision";
import { AboutStory } from "@/components/sections/AboutStory";
import { JsonLd } from "@/components/seo/JsonLd";

import {
  ABOUT_CTA_HEADING_ID,
  aboutCtaContent,
} from "@/content/about-cta.content";
import {
  ABOUT_HERO_HEADING_ID,
  aboutHeroContent,
} from "@/content/about-hero.content";
import {
  ABOUT_IMPACT_HEADING_ID,
  aboutImpactContent,
} from "@/content/about-impact.content";
import {
  ABOUT_MISSION_VISION_HEADING_ID,
  aboutMissionVisionContent,
} from "@/content/about-mission-vision.content";
import {
  ABOUT_STORY_HEADING_ID,
  aboutStoryContent,
} from "@/content/about-story.content";
import { buildPageGraph } from "@/lib/schema";
import type { PageMetaContent } from "@/types/content.types";
import { buildPageMetadata } from "@/lib/seo";

/**
 * The About page — spec `Omanga-About-Page-Redesign-v1.md`.
 *
 * Built at `(redesign)/preview/about` while `app/(legacy)/about` held the live
 * `/about` route — two route groups cannot own the same URL, so the redesign
 * could not sit at its real path until the legacy page went. Now moved into
 * place: the legacy stub is deleted, this route owns `/about`, and the preview
 * segment is gone. The same sequence the homepage (41ff9c6), `/insurance`
 * (bd7de45) and `/plans` (082e036) each followed.
 *
 * The chrome is not declared here. Spec § 1 (Header) and § 8 (Footer) are both
 * ♻️ REUSED, "no changes permitted", and both are satisfied by this route
 * existing: the skip link, `header`, `main` landmark and `footer` are owned by
 * `app/(redesign)/layout.tsx`. Per "shared chrome in `layout.tsx`; pages hold
 * section composition only", this file holds section calls and nothing else.
 *
 * Three things the spec asks of the chrome, and where each stands:
 *
 *   - § 1's `About` active state. Automatic, and live now that the path is real:
 *     `Navigation` resolves it through `isCurrentPath` and draws it from
 *     `aria-current` rather than a class.
 *   - § 8's `info.omanga.biz` → `info@omanga.biz` P0. Already fixed:
 *     `CONTACT_EMAIL` in `config/site.ts`. The defect survives only in
 *     `app/(legacy)/contact/page.tsx`, which is a separate page's task.
 *   - § 8's hardcoded year → dynamic. Already fixed: the layout resolves it from
 *     `new Date().getFullYear()` at render.
 *
 * The remaining § 8 `[VERIFY]` items — registered company name, number, address,
 * phone/WhatsApp, socials, licensing and underwriter disclosure — are
 * deliberately absent from `config/site.ts`, which explains why: "An absent
 * constant fails a build loudly; a placeholder ships a false claim on a payments
 * and insurance page." They are footer blockers, not About blockers.
 *
 * ---------------------------------------------------------------------------
 * Six sections render. § 5, Meet the Team, is skipped entirely by instruction —
 * no output, no placeholder, no replacement — which is why § 6 has to carry the
 * tonal break the exec grid used to. The scroll runs light → dark → light → dark
 * → brand, so no two consecutive bands share a surface or a layout.
 *
 * ---------------------------------------------------------------------------
 * Layout references, since three of the five sections do not follow the spec's.
 *
 * The spec borrows two skeletons — Stayli for §§ 2–3, Clarity for §§ 4, 6, 7.
 * Three sections were later redirected on instruction, and each content module
 * records what displaced and where it went:
 *
 *   § 2  a supplied screenshot        Clarity's About hero, which § 0.2 ruled out
 *   § 3  Figma node 2578:131852       centred copy flanked by cropped photographs
 *   § 4  the homepage's own rail      the shared timeline, not a second build
 *   § 6  Figma node 2579:131863       hover-switched tabs, not a three-up grid
 *   § 7  the shared `CTA` band        reused unchanged, as § 7 anticipates
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] The page has one CTA moment, where § 2's CTA discipline sets two.
 *
 * § 2's hero pill is not mounted — the screenshot governing that layout has no
 * button, and § 3.4 sends it to `#mission-vision`, an anchor no element carries.
 * § 7's tiles are not mounted either; `CTA` has no slot for them. So the closer's
 * single `Explore Omanga` is the whole of the page's conversion surface, against
 * § 2's "two CTA moments … the closing moment resolves into three clickable
 * exits". Three of § 3.4's six Committed internal links are unfulfilled as a
 * result. Recorded in the two content modules, and it wants one decision rather
 * than three.
 *
 * [BLOCKER] Spec § 1 draws the nav as Home · Payments · Insurance · Plans ·
 * `Coverage` · About · Contact with `USD ▾` · `Log in` · `Open Free Account`. The
 * shipped header is Home · Insurance · Payment · Plans · About · Contact with
 * `Get Started`, which is what project-context.md files as the *resolved* nav
 * set, and `content/navigation.content.ts` already records the currency indicator
 * and account link as open content blockers. `Coverage` is a seventh item no
 * approved document lists, and § 1 says the header is reused unchanged — so
 * nothing here changes it.
 */

/**
 * Title and description are verbatim from spec § 3.1, which states them as 57
 * and 155 characters.
 *
 * The title already carries the brand, so it is set `absolute` — the layout's
 * `%s | Omanga` template would otherwise append it twice.
 *
 * `og:image` is not set. The `(redesign)` segment's `opengraph-image.tsx` applies
 * to every route beneath it, so this page inherits a real 1200×630 image today.
 * § 3.1 asks for the Lagos skyline asset instead; there is no skyline asset in
 * `public/`, which is the same gap § 2's hero records. It becomes a per-route
 * override when the photograph exists.
 */
const aboutMeta: PageMetaContent = {
  title: "About Omanga | Integrated Destination Services for Africa",
  description:
    "Learn how Omanga combines local expertise and technology into one African travel platform — multi-currency travel payments and short-term health insurance.",
  path: "/about",
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
export const metadata: Metadata = buildPageMetadata(aboutMeta);

export default function AboutPage() {
  /*
    `buildPageGraph` emits Organization, WebSite, this WebPage and the two Service
    nodes. Two things § 3.5 asks for are deliberately not emitted:

      - `AboutPage` as the page type, with `Organization` nested inside it. The
        builder emits `WebPage` for every route and § 3.5 calls the About page's
        Organization markup "the single highest-value structured-data item Omanga
        can add: it is the canonical place Google looks to resolve a brand
        entity". It is worth doing properly — and half of `Organization`'s fields
        (`legalName`, `foundingDate`, `address`) are the § 8 `[VERIFY]` items, so
        emitting it now would publish an entity description with its identifying
        facts missing.
      - `BreadcrumbList`. Home → About, which § 3.5 asks for and `/insurance`
        already wants too. It needs a builder in `lib/schema.ts`, which every
        page shares, so it is a change of its own rather than a rider on this one.
  */
  return (
    <>
      <JsonLd graph={buildPageGraph(aboutMeta, { crumb: "About" })} />

      {/*
        Stage 2. The hero — spec § 2, and the page's only `h1`. Laid out from the
        supplied screenshot rather than from § 2's Stayli reference; the content
        module records every element that displaces and where each one went.

        The outline below it opens at `h2` without skipping a level.
      */}
      <AboutHero content={aboutHeroContent} headingId={ABOUT_HERO_HEADING_ID} />

      {/*
        Stage 3. Our Story — spec § 3. Laid out from Figma node 2578:131852: the
        story centred in its own column with a photograph cropped off each band
        edge, both hidden below desktop.

        Dark, directly after the light hero, so the colour flip is the section
        divider § 3 asks it to be. Its `h2` is visually suppressed — see the
        component — but present, so the outline is unbroken.

        [REMOVED] The full-bleed parallax band that briefly sat between the hero
        and this section, along with its content module. Removed on instruction;
        its asset is now this band's left-hand photograph.
      */}
      <AboutStory
        content={aboutStoryContent}
        headingId={ABOUT_STORY_HEADING_ID}
      />

      {/*
        Stage 4. Mission & Vision — spec § 4, on the shared timeline rail the
        homepage's How Omanga works section already uses. Two phases, Mission then
        Vision, alternating either side of the rail above desktop.

        Light, after the dark story panel, so the page alternates. Its `h2`
        continues the outline and its two `h3`s sit beneath it without skipping a
        level.

        [SKIPPED] § 5, Meet the Team — removed entirely by instruction, with no
        placeholder and no replacement. The scroll passes from here straight to
        § 6, which is why § 6 has to carry the tonal break the exec grid used to.
      */}
      <AboutMissionVision
        content={aboutMissionVisionContent}
        headingId={ABOUT_MISSION_VISION_HEADING_ID}
      />

      {/*
        Stage 5. Our Impact — spec § 6, from Figma node 2579:131863. Three pillar
        controls beside one panel, switching on hover.

        Dark, after the light timeline. That contrast is doing § 5's work as well
        as its own — see the component for why it is ink rather than § 2's blush.

        Its `h2` continues the outline and the three panel `h3`s sit beneath it
        without skipping a level. All three panels are in the server HTML, so the
        outline is complete whether or not JavaScript runs.
      */}
      <AboutImpact
        content={aboutImpactContent}
        headingId={ABOUT_IMPACT_HEADING_ID}
      />

      {/*
        Stage 6. The closing CTA band — spec § 7. `CTA` is reused unchanged; only
        the content differs, which is the fourth page to close on it and exactly
        what § 7 anticipates of this slot.

        Brand fill after two alternating bands, so the page closes on its one
        emphasis surface. Its `h2` completes the outline.

        [NOT MOUNTED] § 7's two teaser tiles and its two inline body links. The
        band has no slot for either and adding one would change three shipped
        pages; the content module records what that costs.
      */}
      <CTA content={aboutCtaContent} headingId={ABOUT_CTA_HEADING_ID} />
    </>
  );
}
