import { ABOUT_MISSION_VISION_HEADING_ID } from "@/content/about-mission-vision.content";
import { INSURANCE_COVERAGE_HREF } from "@/content/insurance.content";
import {
  CONTACT_LINK,
  COUNTRIES_SERVED_DISPLAY,
  PRIMARY_CTA,
} from "@/content/site.content";
import { TRUST_HEADING_ID } from "@/content/trust.content";
import type { FooterLinkColumn, LinkTarget } from "@/types/content.types";

/**
 * Footer content.
 *
 * Every string is verbatim from the CEO-approved copy document, § 11 · Footer.
 * Nothing is drafted, paraphrased or inferred.
 *
 * ---------------------------------------------------------------------------
 * WHAT THE FIGMA FOOTER SHOWS THAT WE ARE NOT SHIPPING
 *
 * design.md rule 13 lists the footer's template artifacts and forbids
 * them. Two are visible in node 1265:13178 and are dropped here:
 *
 *   - "© Copyright Butler 2023" — a third-party line from the template. The
 *     approved notice replaces it, with a dynamic year (project-context.md
 *     lists the hardcoded year as a P0 defect).
 *   - The oversized "OMANGA" watermark across the base of the footer.
 *
 * A third is a copy conflict rather than an artifact: Figma's Services column
 * contains "Pricing", which does not appear anywhere in the approved copy. The
 * copy document outranks Figma on content, so "Pricing" is rejected, and the
 * two approved Services items Figma omits — "Insurance Plans" and
 * "Coverage — 43 countries" — are restored. Figma also draws "Omanga Holiday
 * Insurance" where the approved label is "Holiday Insurance", and omits
 * "Claims", "Complaints Procedure" and "Cookie Policy" entirely. Approved copy
 * wins in each case. All raised, none resolved unilaterally.
 *
 * Figma also draws no brand paragraph and no contact address, both of which the
 * approved copy specifies. They ship.
 *
 * ---------------------------------------------------------------------------
 * ROUTE REGISTER
 *
 * This register previously listed fourteen approved labels pointing at routes
 * that did not exist, each marked `isRoutePending` so the outstanding set was
 * auditable in the DOM as well as greppable here.
 *
 * [CLEARED] There are no pending routes in the footer any more, and no
 * `isRoutePending` flags. The five legal routes were built; the remaining six
 * were either repointed at real content or removed — see the note above
 * `COMPANY` for which and why.
 *
 * Still worth building, in rough order of value, and each needs content that
 * does not exist yet rather than a route:
 *
 *   /claims        currently repointed at `/policy-terms#claims`. A dedicated
 *                  page is the right home once the claims process, the emergency
 *                  number and the notification deadline are confirmed.
 *   /faqs          real search demand, and the strongest candidate for a
 *                  `FAQPage` rich result. Needs actual questions.
 *   /coverage      would substantiate the 43-country claim the positioning rests
 *                  on. Blocked: the list of 43 countries is not written down
 *                  anywhere in this project.
 *   /help-centre · /careers · /partners as standalone pages.
 *
 * The paths are conventional slugs derived from the approved labels, not
 * approved URLs. Confirm them before the routes are built — renaming a URL
 * after launch costs a redirect.
 */

const SERVICES: FooterLinkColumn = {
  heading: "Services",
  links: [
    // Approved copy resolves open blocker 5 in favour of the plural: the
    // document uses "Omanga Payment Solutions" in both § 3 and § 11, and never
    // the singular. Flagged for confirmation, but the highest-precedence
    // source is consistent.
    { label: "Omanga Payment Solutions", href: "/payments" },
    { label: "Holiday Insurance", href: "/insurance" },
    { label: "Insurance Plans", href: "/plans" },
    /*
      [FIXED] This pointed at `/insurance#coverage`, which was not a 404 and was
      still broken — the worst combination, because nothing reports it.

      Two things were wrong. `/insurance` does not render a coverage section at
      all (there is no `InsuranceCoverage` import in its page), and the anchor
      `coverage` is emitted by that component, which renders on `/plans`. So the
      link landed part-way down a page with no coverage content on it.

      `INSURANCE_COVERAGE_HREF` in `content/insurance.content.ts` already composed
      the correct value — `/plans#coverage` — and was simply not used here. It is
      now the single source for this destination, so the two cannot drift again.
    */
    {
      label: `Coverage — ${COUNTRIES_SERVED_DISPLAY} countries`,
      href: INSURANCE_COVERAGE_HREF,
    },
    /*
      [ADDED] `/get-started` had almost no inbound links.

      It is the site's primary conversion route and the destination of
      `PRIMARY_CTA`, but every link to it was chrome — the header button on every
      page and the closing CTA band — which is the weakest kind of internal link
      there is: identical anchor text, in a template, on every page, so it says
      nothing about what the page is.

      One entry in the Services column gives it a contextual link that sits among
      the things it is a route into, which is what tells a crawler what
      "Get Started" means here. It uses the approved label rather than a
      keyword-stuffed alternative.
    */
    { label: "Get Started", href: PRIMARY_CTA.href },
  ],
} as const;

/**
 * [FIXED] Six links here returned 404 on every page of the site.
 *
 * The footer renders on every route, so each pending entry was a dead link
 * multiplied across the whole site — and with no `not-found.tsx` in the app they
 * landed on Next's bare default, which has no header, no footer and no links.
 * A crawler that followed one left the site entirely.
 *
 * Each is now resolved in one of two ways, and never by inventing a page:
 *
 *   repointed   where the content already exists somewhere real. "Our Mission"
 *               goes to the About page's Mission & Vision section, which is
 *               literally that content. "Partners" goes to the homepage band that
 *               shows the partner logos. "Claims" goes to the Policy Terms
 *               section that explains how to claim — the only place on the site
 *               that does.
 *   removed     where nothing to link to exists. "Careers", "FAQs" and
 *               "Help Centre" have no content anywhere in this project, and a
 *               careers page cannot be written from an audit. Removing the link
 *               is honest; leaving a 404 in the footer of every page is not.
 *
 * The three removed labels are approved copy, so this is a deliberate deviation
 * from the copy document and is recorded as one. They should come back the day
 * the pages exist — the labels are in the register above, not lost.
 */
const COMPANY: FooterLinkColumn = {
  heading: "Company",
  links: [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: `/about#${ABOUT_MISSION_VISION_HEADING_ID}` },
    { label: "Partners", href: `/#${TRUST_HEADING_ID}` },
  ],
} as const;

const SUPPORT: FooterLinkColumn = {
  heading: "Support",
  links: [
    { label: "Contact", href: "/contact" },
    { label: "Claims", href: "/policy-terms#claims" },
    /*
      [REMOVED] A second "Complaints" entry pointing at `/complaints-procedure`.

      The Legal column already links there under its approved label, "Complaints
      Procedure", so this was a second link to the same URL in the same footer —
      two anchors competing to describe one page, and a duplicate for a visitor
      scanning the columns. The Legal one stays because that is where the
      approved copy puts it.
    */
  ],
} as const;

/**
 * [RESOLVED] All five legal routes now exist and the pending flags are cleared.
 *
 * These were five of the fourteen entries in the ROUTE TODO REGISTER above,
 * marked `isRoutePending` because the labels were approved before the pages were
 * built and the links 404ed. They are now real pages under `app/(redesign)`, so
 * the flag — and the `data-route-pending` attribute it rendered — is gone.
 *
 * The slugs are the conventional ones the register recorded, unchanged, so no
 * redirect is needed and every link that was already pointing here now resolves.
 */
const LEGAL: FooterLinkColumn = {
  heading: "Legal",
  links: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Policy Terms", href: "/policy-terms" },
    { label: "Complaints Procedure", href: "/complaints-procedure" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
} as const;

/**
 * The approved copyright notice, with the year supplied at render.
 *
 * The whole sentence lives here rather than being assembled in JSX, so it stays
 * traceable to one line of the approved document. The year is the only variable
 * — project-context.md lists "dynamic copyright year" as a P0 defect to fix in
 * this build.
 *
 * Note: the page renders statically, so the year is fixed at build time. That
 * is correct for a site that redeploys, and it is not a claim that can go
 * stale silently — but it does mean a site left undeployed across New Year
 * shows the previous year.
 */
export function formatCopyright(year: number): string {
  return `© ${year} Omanga. All rights reserved.`;
}

export const footerContent: {
  readonly brandParagraph: string;
  readonly columns: readonly FooterLinkColumn[];
  readonly contact: LinkTarget;
  /** Accessible name for the footer's link navigation. Not marketing copy. */
  readonly landmarkLabel: string;
} = {
  brandParagraph:
    "Your integrated destination services platform for seamless African travel. We combine local expertise with technology to showcase the very best of what the continent has to offer.",
  columns: [SERVICES, COMPANY, SUPPORT, LEGAL],
  contact: CONTACT_LINK,
  landmarkLabel: "Footer",
} as const;

/**
 * BLOCKER — social profiles are not shipping.
 *
 * The approved copy lists four platforms under SOCIAL: "LinkedIn · Instagram ·
 * X · Facebook". The handles and URLs are open blocker 6 in
 * project-context.md, and a social URL cannot be derived from a platform name
 * the way a slug can be derived from a page title — guessing one risks linking
 * to an account Omanga does not control.
 *
 * The brief is explicit that social profiles are never invented, so the block
 * is omitted entirely rather than rendered with dead links. There is no
 * `socialLinks` export by design: adding the four URLs here is the only change
 * needed to ship it, and the absence fails loudly rather than quietly.
 *
 * BLOCKER — regulatory disclosure is not shipping.
 *
 * project-context.md requires "contactability, regulatory disclosure, and
 * labelled partners" as launch requirements for a YMYL page, and open blockers
 * 2 and 6 hold the payments licensing entity, the insurance underwriter, and
 * the registered company name, number and address. None appears in the
 * approved copy or in Figma, so the footer trust block is absent, not stubbed.
 */
