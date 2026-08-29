import type { Metadata } from "next";

import { CTA } from "@/components/sections/CTA";
import { GetStartedImageBand } from "@/components/sections/GetStartedImageBand";
import { InsuranceDeepDive } from "@/components/sections/InsuranceDeepDive";
import { InsuranceHero } from "@/components/sections/InsuranceHero";
import { PaymentsApp } from "@/components/sections/PaymentsApp";
import { PaymentsFeatures } from "@/components/sections/PaymentsFeatures";
import { TrustPartners } from "@/components/sections/TrustPartners";
import { WhyOmanga } from "@/components/sections/WhyOmanga";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  PAYMENTS_APP_HEADING_ID,
  paymentsAppContent,
} from "@/content/payments-app.content";
import {
  PAYMENTS_CTA_HEADING_ID,
  paymentsCtaContent,
} from "@/content/payments-cta.content";
import {
  PAYMENTS_DEEP_DIVE_HEADING_ID,
  paymentsDeepDiveContent,
} from "@/content/payments-deep-dive.content";
import {
  PAYMENTS_FEATURES_HEADING_ID,
  paymentsFeaturesContent,
} from "@/content/payments-features.content";
import {
  PAYMENTS_HERO_HEADING_ID,
  paymentsHeroContent,
} from "@/content/payments-hero.content";
import { paymentsImageContent } from "@/content/payments-image.content";
import {
  PAYMENTS_WHY_HEADING_ID,
  paymentsWhyContent,
} from "@/content/payments-why.content";
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import { TRUST_HEADING_ID, trustContent } from "@/content/trust.content";
import { getExchangeRates } from "@/lib/rates";
import { buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import type { PageMetaContent } from "@/types/content.types";

/**
 * The Payment Solutions page.
 *
 * Source: `Omanga-Payment-Solutions-Page-v1.md`, 26 July 2026 — a content
 * specification rather than an approved copy document, structured against
 * `claritybusinesstravel.com/our-tech/claritygo` as a skeleton.
 *
 * ---------------------------------------------------------------------------
 * THIS ROUTE COMPLETES THE MIGRATION.
 *
 * `/payments` was the last page in `app/(legacy)`, and two route groups cannot
 * own the same URL — so this file could not exist until that one was deleted.
 * The whole group went with it: its root layout, its Inter/Helvetica stack, its
 * `globals.css`, its sixteen `_components` and its `_lib`. Consequences worth
 * knowing:
 *
 *   - There is now one root layout, so navigating between any two pages is a
 *     client transition rather than a full page load. That was the last thing
 *     the split was costing.
 *   - `app/(legacy)/_lib/rates.ts` went with it — the live FX fetcher § 4's rate
 *     card needs. It was recovered from git history unchanged and now lives at
 *     `lib/rates.ts`.
 *   - `public/card-front-omanga.png` and `card-back-omanga.png` are now
 *     unreferenced, and must stay that way. See the copy note below.
 *
 * ---------------------------------------------------------------------------
 * [RESOLVED] `PAYMENTS_RATES_ANCHOR` lands on § 4's rate card.
 *
 * `content/site.content.ts` exports the anchor `rates` and the homepage's
 * services section links to `/payments#rates`. It was landing at the top of this
 * page between the legacy page's deletion and § 4 shipping.
 *
 * ---------------------------------------------------------------------------
 * [RESOLVED, 2026-08-29] Two spec-wide conflicts, decided before any copy was
 * written. Both change what this page may say, so they are recorded at the top
 * of the page rather than buried in a content module.
 *
 * 1. THE SPEC IS BUILT ON A CARD. THIS PAGE HAS NONE.
 *
 *    The spec's H1, meta title, § 4 card three, § 7 card two and its entire
 *    long-tail keyword tier are about "the Omanga card". `site.content.ts`
 *    forbids the word outright — the approved copy's tracked changes struck
 *    every card claim, and Omanga issues no card. Confirmed: the card comes out
 *    and the wallet replaces it everywhere.
 *
 *    The replacement is not a synonym. "Spend from your wallet balance" is the
 *    confirmed construction, and it deliberately names no instrument: what the
 *    traveller does is spend from a balance, and where they can do it is the
 *    country count. Copy must not reach for "wherever cards are accepted"
 *    either — that describes the same object from the merchant's side and reads
 *    as the claim we just removed. Two homepage modules carried that phrasing
 *    and were corrected in the same change.
 *
 * 2. THE COUNTRY COUNT IS 50+, NOT THE SPEC'S 52+ AND NOT THE SITE'S 43.
 *
 *    Confirmed 2026-08-29 and applied across every module that carried it. See
 *    `COUNTRIES_SERVED_DISPLAY` in `site.content.ts` for why the rendered figure
 *    is open-ended and why nothing types it.
 *
 * ---------------------------------------------------------------------------
 * BUILD ORDER. Sections are mounted one at a time, in the spec's order, each
 * with its own content module. The composition below grows as they land:
 *
 *   § 1  Header                     layout — nothing to mount
 *   § 2  Hero
 *   § 3  —                          skipped per spec; the homepage deep-dive
 *                                   already owns this content, and repeating it
 *                                   would put `/` and `/payments` in competition
 *                                   for the same queries
 *   § 4  Three cards + metrics      carries the `rates` anchor
 *   § 5  Without / With             reuses `WhyOmanga`
 *   § 6  Mobile app — coming soon   half-bleed band, 4/8 split; no waitlist and
 *                                   no store slots — one heading, one paragraph,
 *                                   one link to the web app
 *   § 7  —                          skipped on instruction. Its two blocks were
 *                                   the app (now § 6) and the card (which does
 *                                   not exist), so both were already spent
 *   § 8  Trust & infrastructure     the partner strip only — the spec's narrative
 *                                   and stats are not carried; see the section
 *   § 9  Closing CTA                reuses `CTA`; repeats the hero's button
 *   § 10 Footer                     layout — nothing to mount
 *
 * ---------------------------------------------------------------------------
 * [COMPLETE] Every section the page will carry is mounted.
 *
 * What is outstanding is content and assets rather than structure. In rough order
 * of how much each costs:
 *
 *   1. Both photographs render card language on the phone screen — "Card locked
 *      via app", "Metal Card". One render of the real wallet view fixes both.
 *   2. The page states no infrastructure claim anywhere. § 5's closing microcopy
 *      and § 8's narrative both carried "bank-grade infrastructure and
 *      on-the-ground partners", and both were dropped. For a YMYL payments page
 *      that is the claim a quality rater looks for.
 *   3. The page captures no leads. The § 6 waitlist was the only mechanism.
 *   4. The three partner logos are unlabelled; all three roles are `[VERIFY]`.
 *   5. § 4's account drawer shows four invented balances.
 *   6. The live FAQ still says the mobile app exists. Spec § 2 P0.
 */

/**
 * [CHANGED from spec § 11.1] Both strings are rewritten rather than transcribed.
 *
 * The spec's title is `Multi-Currency Wallet & Travel Card for Africa | Omanga`
 * and its description ends "spend with your card across 52+ African countries".
 * Both carry the two claims resolved above, so neither can ship as written.
 *
 * Title, 64 characters. It keeps two of the spec's three primary terms —
 * *multi-currency wallet* and *cross-border payments*, both with *Africa* — and
 * drops *travel card Africa*, which is a keyword for a product that does not
 * exist. Ranking for it would be worse than not ranking for it.
 *
 * Description, 153 characters. Same four facts the spec's carries — six
 * currencies, three funding currencies, mid-market rates, the country count —
 * with the instrument replaced by the balance.
 *
 * The title already ends in "| Omanga", so `buildPageMetadata` sets it absolute
 * and the layout's `%s | Omanga` template does not append the brand twice.
 */
const paymentsMeta: PageMetaContent = {
  title: "Multi-Currency Wallet & Cross-Border Payments for Africa | Omanga",
  description: `Hold and send six currencies in one Omanga wallet, fund from USD, GBP or CAD at mid-market rates, and spend from your balance across ${COUNTRIES_SERVED_DISPLAY} African countries.`,
  path: "/payments",
};

export const metadata: Metadata = buildPageMetadata(paymentsMeta);

/**
 * Async, because § 4's rate card shows live mid-market rates.
 *
 * The fetch is owned here rather than inside the section, so one place makes the
 * request and the section stays synchronous. `lib/rates.ts` revalidates hourly
 * and falls back to two mirrors, so the page still renders statically — it is
 * prerendered with a rate snapshot and refreshed on the ISR interval rather than
 * becoming a dynamic route.
 *
 * See `lib/rates.ts` for why a payments page fetches four numbers instead of
 * typing them.
 */
export default async function PaymentsPage() {
  const rates = await getExchangeRates();

  /*
    `buildPageGraph` emits Organization, WebSite, this WebPage, the breadcrumb
    trail and both Service nodes — one of which, `Omanga Payment Solutions`,
    already names this URL as its `url`. So the structured data on every page of
    the site vouches for this route, which is the reason the legacy version's
    missing metadata mattered as much as it did.

    The crumb is the full product name. Spec § 2 P1 flags the singular/plural
    split — the footer said "Omanga Payment Solution", the headings said
    "Solutions" — and canonicalises on the plural.

    Spec § 11.6 also asks for a `Product` node for the card and an optional
    `FAQPage`. Neither is emitted: there is no card, and the FAQ block the spec
    would mark up is the one carrying the app contradiction it flags as P0.
  */
  return (
    <>
      <JsonLd
        graph={buildPageGraph(paymentsMeta, { crumb: "Omanga Payment Solutions" })}
      />

      {/*
        § 2. The hero, and the page's only `h1`. The outline below it opens at
        `h2` without skipping a level.

        [NAMING] `InsuranceHero` is reused rather than rebuilt, on instruction:
        this band is the insurance page's UI with this page's copy. It takes its
        content and its heading id as props and knows nothing about which page
        renders it — the same arrangement `GetStartedImageBand`, `TrustPartners`,
        `WhyOmanga` and `CTA` already have.

        Its name is now wrong, in exactly the way `GetStartedImageBand`'s is: it
        is the site's centred hero band and belongs at
        `components/sections/CenteredHero`. Its own docblock predicted this —
        "worth extracting before a third page wants one" — and this is the third
        page. Not extracted here, because renaming it means editing two shipped
        pages, which is outside this section's scope. It is a rename and two
        import lines whenever that scope opens.

        `PaymentsHeroContent` is a separate type from `InsuranceHeroContent`
        rather than an import of it. The shapes are identical, so it satisfies
        the prop structurally, and keeping them separate is what stops a future
        insurance-only field — a policy disclaimer, an underwriter line —
        silently becoming a required field on this page.
      */}
      <InsuranceHero
        content={paymentsHeroContent}
        headingId={PAYMENTS_HERO_HEADING_ID}
      />

      {/*
        The full-bleed band. It carries no heading, so it contributes nothing to
        the outline — which is also why it renders a `div` rather than a
        `section`: a region with no accessible name is an unlabelled landmark a
        screen-reader user has to enter to discover is empty.

        [NAMING] `GetStartedImageBand` is reused rather than rebuilt, the same
        call `/insurance` already makes. It takes an asset and knows nothing
        about which page renders it. Its name is now wrong on all three counts —
        it is the site's full-bleed parallax band and belongs at
        `components/sections/ImageBand`, as its own docblock says. Left alone
        because renaming it means editing three shipped pages.

        It is the site's third caller, so the height token it reads is now shared
        three ways — see `--spacing-image-band` for what raising it to 600 moved
        on the other two pages.
      */}
      <GetStartedImageBand image={paymentsImageContent} />

      {/*
        The untabbed deep dive. Its heading is an `h2` and its six feature
        headings are `h3`s, so the outline continues without skipping a level.

        [CONFLICT] Spec § 3 omits this section from this page entirely and gives
        an SEO reason for it. Built on instruction; the objection and its
        reasoning are recorded in `content/payments-deep-dive.content.ts`.

        [NAMING] `InsuranceDeepDive` is reused rather than rebuilt — the third
        insurance-named component this page renders, after the hero and the band.
        It takes content and a heading id and knows nothing about which page
        mounts it. All three want the same rename pass whenever that scope opens.

        Dark, after the photographic band, so the page alternates: light hero,
        photograph, dark band.
      */}
      <InsuranceDeepDive
        content={paymentsDeepDiveContent}
        headingId={PAYMENTS_DEEP_DIVE_HEADING_ID}
      />

      {/*
        § 4. Three capability cards and the figures that back them, as one block —
        the spec pairs them deliberately: claim, then proof. Its `h2` continues
        the outline and the three card headings are `h3`s.

        This section carries the `rates` anchor on its second card, which is where
        `/payments#rates` has been trying to land since the legacy page was
        deleted.

        Light, after the dark deep dive, so the page alternates.
      */}
      <PaymentsFeatures
        content={paymentsFeaturesContent}
        headingId={PAYMENTS_FEATURES_HEADING_ID}
        rates={rates}
      />

      {/*
        § 5. Without / With — the page's loss-framing band, and the spec's
        sharpest conversion device. Its `h2` continues the outline and its two
        column titles are `h3`s.

        `WhyOmanga` is reused rather than rebuilt. It takes its content and its
        heading id as props and knows nothing about which page renders it — the
        third page to mount it, after the homepage and `/insurance`, so all three
        comparisons on the site render through one set of components and cannot
        drift apart. Unlike the hero, the band and the deep dive, this one is
        already named for what it is rather than for a product.

        [DELIBERATELY CTA-FREE] The spec is explicit: no call to action in this
        section, mirroring the benchmark, so "persuasion is allowed to compound
        rather than leak". `WhyOmangaContent` has no action field, so none can be
        added without a content decision.

        Dark, after the light feature band, so the page alternates: light hero,
        photograph, dark deep dive, light features, dark comparison.
      */}
      <WhyOmanga
        content={paymentsWhyContent}
        headingId={PAYMENTS_WHY_HEADING_ID}
      />

      {/*
        § 6. The mobile app, announced rather than sold. Its `h2` continues the
        outline.

        Copy on the content column, photograph to the viewport edge — the
        reference's app band, which is the instructed layout. It renders its own
        `section` rather than using the `Section` primitive; see the component
        for why that layout is not expressible through its props.

        [CONSTRAINT] The heading states outright that the app is not out yet, and
        it is now the only element that does — the eyebrow and the two inert store
        slots were removed with the copy cut. Spec § 6 requires the band to be
        unambiguous rather than requiring any particular element to carry it, so
        the heading must not be softened into something that merely implies it.

        This is load-bearing: the live site's FAQ currently says the app exists,
        which the spec flags as a P0 credibility failure. That FAQ is not in this
        repository — correct it in the same release.

        Light, after the dark comparison, so the page alternates.
      */}
      <PaymentsApp
        content={paymentsAppContent}
        headingId={PAYMENTS_APP_HEADING_ID}
      />

      {/*
        § 8. The partner strip. Its label is an `h2`, so the outline continues
        without skipping a level.

        `TrustPartners` is reused rather than rebuilt — the fourth page to mount
        it, after the homepage, `/get-started` and `/insurance`. It takes content
        and a heading id and knows nothing about which page renders it.

        [REDUCED from spec] § 8 is a full band in the specification: an `h2`, a
        two-paragraph narrative about bank-grade infrastructure and on-the-ground
        partnerships, two large statistics, a labelled partner wall and a link to
        `/partners`. What ships is the logo strip alone, on instruction.

        Three things go with that, and the third is the one that matters:

          - The two statistics are no loss. They were 50+ and 24/7, and § 4's
            metric row already carries both with more context than a bare figure.
          - The `/partners` link is no loss either. That route does not exist —
            `/partners` is this strip, confirmed 2026-08-29.
          - The narrative IS a loss. "Bank-grade infrastructure and on-the-ground
            partnerships" is the page's only infrastructure claim, and § 5's
            closing microcopy — which made the same claim — was also dropped when
            `WhyOmanga` turned out to have no slot for it. So the page now states
            it nowhere. On a payments page in YMYL territory that is the claim a
            quality rater looks for.

        [UNCHANGED] The logos are still unlabelled. Spec § 8 wants each named by
        role — "an unlabelled logo proves nothing" — and all three roles are
        `[VERIFY]`. Same position `/insurance` is in, recorded in
        `trust.content.ts`.

        [NOTE] Light on light, following the app band. The same pairing
        `/insurance` and `/get-started` already carry: the strip's `tight` rhythm
        and single logo row make it read as a strip rather than as a second white
        section.
      */}
      <TrustPartners content={trustContent} headingId={TRUST_HEADING_ID} />

      {/*
        § 9. The closing conversion band, and the page's last control. Its `h2`
        completes the outline.

        `CTA` is reused unchanged — the fourth page to mount it, after the
        homepage, `/insurance` and `/plans`. Only the content differs.

        [CONSTRAINT] Its button repeats the hero's exactly: same label, same
        destination, same weight. Spec § 9 requires it — "one conversion journey,
        two entry points, no ambiguity about the primary action" — and the two
        are kept in step by decision rather than by a shared import. See the
        content module for why that is deliberate.

        Brand fill, after two light bands, so the page closes on its one emphasis
        surface. It is no longer the *only* brand surface on the page — § 4's
        three cards took that — but it is still the only one a conversion control
        sits on.
      */}
      <CTA content={paymentsCtaContent} headingId={PAYMENTS_CTA_HEADING_ID} />
    </>
  );
}
