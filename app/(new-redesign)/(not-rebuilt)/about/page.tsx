import type { Metadata } from "next";

import { aboutFaqContent } from "@/content/page-faqs.content";

import { JsonLd } from "@/components/seo/JsonLd";

import { buildPageGraph } from "@/lib/schema";
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { PageMetaContent } from "@/types/content.types";
import { buildPageMetadata } from "@/lib/seo";
import { AboutHero } from "@/new-redesign/components/sections/about/AboutHero";
import { AboutStory } from "@/new-redesign/components/sections/about/AboutStory";
import { AboutMissionVision } from "@/new-redesign/components/sections/about/AboutMissionVision";
import { AboutValues } from "@/new-redesign/components/sections/about/AboutValues";
import { FaqSection } from "@/new-redesign/components/ui/FaqSection";
import { OLD_PAGE_FAQ_SUB, oldPageFaq } from "@/new-redesign/content/old-pages.content";
import { HomeFinalCta } from "@/new-redesign/components/sections/home/HomeFinalCta";

const ABOUT_HERO_HEADING_ID = "about-hero-heading";
const ABOUT_STORY_HEADING_ID = "about-story-heading";
const ABOUT_MISSION_VISION_HEADING_ID = "about-mission-vision-heading";
const ABOUT_VALUES_HEADING_ID = "about-values-heading";

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
 * single `Open your free wallet` is the page's own conversion surface, against
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
 * `og:image` is not set: the `(redesign)` segment's `opengraph-image.tsx`
 * applies to every route beneath it. § 3.1's Lagos skyline asset does not exist
 * in `public/`; it becomes a per-route override when it does.
 */
const aboutMeta: PageMetaContent = {
  // [CHANGED, 2026-10-14] UX copy pass: was "About". Brand + keywords, 47 chars,
  // matching the home title's "Health Insurance" (the searched term).
  title: "About Omanga: Travel Money and Health Insurance",
  // [CHANGED, 2026-10-14] UX copy pass: was "…health insurance for Africa".
  // Wallet = 50+ African countries; health cover = Nigeria only.
  description: `Omanga is a Lagos company for visitors to Nigeria: a free wallet you can spend in ${COUNTRIES_SERVED_DISPLAY} African countries and short-term health cover from Phillips HMO.`,
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
      <JsonLd
        graph={buildPageGraph(aboutMeta, {
          crumb: "About",
          pageType: "AboutPage",
        })}
      />

      {/*
        Stage 2. The hero — spec § 2, and the page's only `h1`. Laid out from the
        supplied screenshot rather than from § 2's Stayli reference; the content
        module records every element that displaces and where each one went.

        The outline below it opens at `h2` without skipping a level.
      */}
      {/* [CHANGED, 2026-10-26] New-design hero (owner): A1, text then a video box. */}
      <AboutHero headingId={ABOUT_HERO_HEADING_ID} />

      {/* [CHANGED, 2026-10-27] New-design story (owner): Mobbin B1, Ramp's "Our Story". */}
      <AboutStory headingId={ABOUT_STORY_HEADING_ID} />

      {/* [CHANGED, 2026-10-27] New-design mission and vision (owner): Mobbin C1, 7shifts. */}
      <AboutMissionVision headingId={ABOUT_MISSION_VISION_HEADING_ID} />

      {/* [CHANGED, 2026-10-27] New-design values (owner): Mobbin D1, Figma. */}
      <AboutValues headingId={ABOUT_VALUES_HEADING_ID} />

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
      {/*
        [REMOVED, 2026-10-18] The comparison split card (`WhyOmanga`), on the
        owner's instruction: removed from every page.
      */}
      {/* [CHANGED, 2026-10-18] Page-specific questions (content/page-faqs). */}
      <FaqSection {...oldPageFaq(aboutFaqContent.heading, OLD_PAGE_FAQ_SUB.about, aboutFaqContent.items)} />

      <HomeFinalCta />
    </>
  );
}
