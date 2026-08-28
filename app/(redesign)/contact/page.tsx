import type { Metadata } from "next";

import { ContactHero } from "@/components/sections/ContactHero";
import { ContactInformation } from "@/components/sections/ContactInformation";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_LOCALE, SITE_NAME } from "@/config/site";
import {
  CONTACT_HERO_HEADING_ID,
  contactHeroContent,
} from "@/content/contact-hero.content";
import {
  CONTACT_INFORMATION_HEADING_ID,
  contactInformationContent,
} from "@/content/contact-information.content";
import {
  CONTACT_ENQUIRY_PARAM,
  CONTACT_OPTIONS_HEADING_ID,
  contactOptionsContent,
} from "@/content/contact-options.content";
import { buildPageGraph } from "@/lib/schema";
import type { PageMetaContent } from "@/types/content.types";

/**
 * The Contact page — spec `Omanga-Contact-Page-Redesign.md`.
 *
 * Built at `(redesign)/preview/contact` while `app/(legacy)/contact` held the live
 * `/contact` route — two route groups cannot own the same URL, so the redesign
 * could not sit at its real path until the legacy page went. Now moved into place:
 * the legacy page is deleted, this route owns `/contact`, and the preview segment
 * is gone. The same sequence the homepage (41ff9c6), `/insurance` (bd7de45),
 * `/plans` (082e036) and `/about` (3fca9f0) each followed.
 *
 * With this the `(legacy)` group holds one page — `/payments`. It goes away
 * entirely when that moves, and with it the second root layout and the full page
 * load that currently happens when navigating between the two groups.
 *
 * ---------------------------------------------------------------------------
 * The chrome.
 *
 * § 1 (Header) and § 7 (Footer) both say "use the approved Omanga homepage
 * [element] exactly as signed off. No modification of any kind." They are
 * satisfied by this route existing: the skip link, `header`, `main` landmark and
 * `footer` are owned by `app/(redesign)/layout.tsx`, and per "shared chrome in
 * `layout.tsx`; pages hold section composition only" a page may not re-declare
 * them. There is nothing to add for either section, and adding anything would be
 * the defect.
 *
 * Four things the spec asks of the chrome, and where each stands:
 *
 *   - § 1's `Contact` active state. Automatic, and live now that the path is real:
 *     `Navigation` resolves it through `isCurrentPath` and draws it from
 *     `aria-current` rather than a class.
 *   - § 7's footer `Contact` active state — "Do not remove it". `FooterColumn`
 *     renders every approved link and nothing drops the current page's, so this
 *     holds by construction.
 *   - § 7's and the E-E-A-T section's `info.omanga.biz` → `info@omanga.biz` P0.
 *     Fixed in `config/site.ts`, and the last instance of the defect died with the
 *     legacy page this route replaces.
 *   - § 7's hardcoded year → dynamic. Already fixed: the layout resolves it from
 *     `new Date().getFullYear()` at render.
 *
 * § 1's "Do not add a `Contact us` CTA to the header on this page. The visitor is
 * already here." — the header takes no per-page props beyond the shared content
 * modules, so there is no mechanism by which this page could add one.
 *
 * ---------------------------------------------------------------------------
 * The page, in spec order:
 *
 *   § 1   Header             inherited from the layout, above
 *   §§ 2–3 Hero and contact options, as one two-column band
 *   § 4A  `Talk to us`       revealed in the panel, wired to Zoho
 *   § 4B  Notifications      HELD. No delivery mechanism — see `OptionsPanel`.
 *   § 5   Contact information 3 cards — Email · Support · Coverage, plus the
 *                            office map and its address beneath the grid
 *   § 6   Map                REINSTATED on instruction, against the spec — see
 *                            `OfficeMap` for why § 6's reason no longer holds.
 *   § 7   Footer             inherited from the layout, above
 *
 * Every section is built but § 4B, which is why the page moved to `/contact` with
 * that one held: § 3's Notifications card still routes somewhere real, so the gap
 * is a narrower offer rather than a broken control.
 *
 * ---------------------------------------------------------------------------
 * [RESOLVED] The WhatsApp number. Supplied and confirmed working against the live
 * account; it lives in `config/site.ts` as `WHATSAPP_URL` so § 2's support button
 * and § 5's support card cannot point at different numbers. § 0's hard blocker on
 * § 5 is lifted.
 *
 * [APPLIED] The country count. The spec says 52 throughout;
 * project-context.md § Non-negotiable copy facts puts it at 43 and requires the
 * spec's figure be rejected everywhere. Every section interpolates
 * `COUNTRIES_SERVED`, so § 5's coverage card reads 43 and its label is
 * `See all 43 countries`. Nothing on this page types the number.
 *
 * [BLOCKER] Three destinations the spec links to do not exist. `/coverage` is
 * § 5's card and § 3.4's anchor — the spec anticipates it ("until it exists, the
 * CTA links to the homepage coverage section"), so that card points at the
 * homepage's own coverage band today. `/insurance/plans` is § 2's hero link and is
 * simply the wrong path, since the tiers are at `/plans`; `/faqs` is § 4's
 * optional micro-link and is phase 2. Neither of the last two is mounted.
 *
 * [PARTIAL] The office address is supplied and renders beneath § 5's grid on an
 * embedded map, with the address itself as text. Three things still open: it is not
 * in the schema graph, because § Schema forbids marking up a `PostalAddress` "until
 * a registered address is confirmed" and this was supplied without that qualifier;
 * the company number § 5 asks for alongside it is absent; and the map embed uses
 * Google's undocumented keyless endpoint because no API key exists. See
 * `OFFICE_ADDRESS` and `OFFICE_MAP_EMBED_URL`.
 *
 * [BLOCKER — privacy] The map frame contacts Google and sets cookies, and there is
 * no consent mechanism anywhere in the application. `loading="lazy"` narrows the
 * exposure to visitors who scroll that far; it does not ask them. § E-E-A-T item 4
 * already lists the Privacy Policy as unpublished, and this is now the first
 * third-party request on the site that policy will have to disclose.
 *
 * [CONFLICT] § 1 draws the nav as Home · Payments · Insurance · Plans ·
 * `Coverage` · About · Contact with `USD ▾` · `Log in` · `Open Free Account`. The
 * shipped header is Home · Insurance · Payment · Plans · About · Contact with
 * `Get Started`, which is what project-context.md files as the *resolved* nav
 * set, and `content/navigation.content.ts` already records the currency indicator
 * and account link as the two open content blockers. `Coverage` is a seventh item
 * no approved document lists. § 1 says the header is used unmodified, so nothing
 * here changes it — the same conflict the About page records.
 *
 * [EXTENDED] The submission rail now serves two forms. `app/api/enquiry/route.ts`
 * keeps one transport, one rate limiter and one honeypot, and branches on a hidden
 * form field: `lib/contact-enquiry.ts` validates this page's fields and
 * `lib/contact-enquiry-email.ts` renders its notification, both sharing the
 * sanitisation and the email shell the Get Started form already used. That form's
 * behaviour and its email output are unchanged.
 *
 * [BLOCKER] § 4B has nowhere to send subscribers. The handler emails the business
 * mailbox once per submission, which is an enquiry mechanism rather than a mailing
 * list. Held on instruction until a provider is named — see `OptionsPanel` for
 * what the Notifications card does in the meantime.
 *
 * [BLOCKER] Both country selectors. § 4 asks for a searchable select of the 43
 * covered countries and a multi-select of the same list; no such list exists in
 * the repository and a coverage list on an insurance product is a factual claim.
 * Form A ships a free-text country field on instruction — the routing signal
 * survives, the validation and the coverage-claim reinforcement do not.
 *
 * [NOT MOUNTED] Structured data. § Schema asks for `ContactPage` with
 * `mainEntity` → the Organization, two `ContactPoint` entries with
 * `hoursAvailable`, and a `BreadcrumbList`. `lib/schema.ts` emits `WebPage` and
 * one `ContactPoint`, and has no breadcrumb builder. It is a change to a module
 * every page shares, the second `ContactPoint` needs the blocked WhatsApp number,
 * and `/about` wants the same breadcrumb work — so it is one stage of its own
 * covering both pages, not a rider on this one. § Schema's closing line already
 * holds for `PostalAddress`: "Do not mark up a `PostalAddress` until a registered
 * address is confirmed."
 */

/**
 * Title and description are verbatim from § SEO SPECIFICATION § Meta, which
 * states them as 58 and 154 characters.
 *
 * [NOTE] The description says "specialists available 24/7 across Africa", which
 * is § E-E-A-T open question 3 — "Is the 24/7 contact centre claim accurate
 * today, and in which timezone is the team based?" It is transcribed rather than
 * softened because it is Omanga's own published claim on the live Contact page,
 * which is the spec's stated source for every fact on it.
 *
 * The title already carries the brand, so it is set `absolute` — the layout's
 * `%s | Omanga` template would otherwise append it twice.
 *
 * `path` is `/contact`, which § Meta specifies as the canonical and which this
 * route now owns.
 *
 * `og:image` is not set. The `(redesign)` segment's `opengraph-image.tsx` applies
 * to every route beneath it, so this page inherits a real 1200×630 image today.
 * § Meta asks for an Omanga contact/brand image and marks the asset `[VERIFY]`;
 * that becomes a per-route override once it exists.
 */
const contactMeta: PageMetaContent = {
  title: "Contact Omanga | Payments & Travel Insurance Support",
  description:
    "Contact the Omanga team about payments, travel insurance, partnerships or support. Email us or start a WhatsApp chat — specialists available 24/7 across Africa.",
  path: "/contact",
};

export const metadata: Metadata = {
  title: { absolute: contactMeta.title },
  description: contactMeta.description,
  alternates: { canonical: contactMeta.path },
  // Indexable now that this is the real route, per § Meta. It was `noindex` behind
  // `/preview` so a crawler could not find a half-built duplicate of the page that
  // was live at the time.
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: contactMeta.path,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    title: contactMeta.title,
    description: contactMeta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: contactMeta.title,
    description: contactMeta.description,
  },
};

/** This route's own path. One owner, so the cards and `Go back` cannot drift. */
const CONTACT_PATH = "/contact";

/**
 * `searchParams` is a Promise in this version of Next, so the page is async.
 *
 * Reading it makes this route dynamic, which is correct and not incidental: the
 * panel's content depends on the query, so a statically rendered page could only
 * ever serve the unselected state. § 4 note 8 requires the selection to live in
 * the URL, and this is what that costs — one dynamic route in exchange for a form
 * whose state is shareable, survives the back button, and needs no client state
 * to decide which form is open.
 */
export default async function ContactPreviewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params[CONTACT_ENQUIRY_PARAM];

  /*
    A repeated parameter arrives as an array. Taking the first entry rather than
    rejecting it: `?enquiry=talk&enquiry=notifications` is a malformed URL rather
    than an attack, and an unrecognised value falls through to the unselected
    state anyway — `OptionsPanel` matches against the approved options and shows
    the cards when nothing matches.
  */
  const selectedEnquiry = Array.isArray(raw) ? raw[0] : raw;

  return (
    <>
      {/*
        `buildPageGraph` emits Organization, WebSite, this WebPage and the two
        Service nodes — including the `contactPoint` carrying `info@omanga.biz`,
        which is the one thing on this page a quality rater looks for in structured
        data. What § Schema asks for beyond that is recorded in the note above and
        is a stage of its own.
      */}
      <JsonLd graph={buildPageGraph(contactMeta)} />

      {/*
        Stage 2. The hero — spec §§ 2 and 3, from Figma node 2579:131893, and the
        page's only `h1`.

        Both sections are one band, because the node puts § 3's options panel
        beside the headline rather than 300px below it. That resolves § 2's own
        justification for the hero carrying no CTA — there is no grid below to
        split the click with — and it leaves § SEO's heading hierarchy intact:
        `h1`, then § 3's `h2`, then the two option cards' `h3`s.

        Stage 3 adds § 4 to the same panel. A card click sets `?enquiry=talk` or
        `?enquiry=notifications` with the scroll position held — § 4 note 8's URL
        contract — and the panel resolves it on the server, so the reveal needs no
        client state and works with JavaScript disabled.
      */}
      <ContactHero
        content={contactHeroContent}
        options={contactOptionsContent}
        headingId={CONTACT_HERO_HEADING_ID}
        optionsHeadingId={CONTACT_OPTIONS_HEADING_ID}
        selectedEnquiry={selectedEnquiry}
        path={CONTACT_PATH}
      />

      {/*
        Stage 4. Contact information — spec § 5, and the last band on the page.

        Three cards drawn from what Omanga publishes — Email, Support, Coverage —
        with the office address as a paragraph beneath the grid, which is where
        § 5 puts it: "not as a fourth card, which would imply a visitable office
        Omanga has not confirmed."

        Its `h2` and three `h3`s complete § SEO's hierarchy.

        [REVERSES § 6] The spec removes the map "entirely. Not replaced." One is
        added on instruction: its reason was that there was nothing to pin, and an
        address now exists. `OfficeMap` answers § 6's other objections and records
        the privacy question an embedded Google frame opens on a site with no
        consent mechanism and no published Privacy Policy.
      */}
      <ContactInformation
        content={contactInformationContent}
        headingId={CONTACT_INFORMATION_HEADING_ID}
      />
    </>
  );
}
