import { CONTACT_LINK } from "@/content/site.content";
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
 * ROUTE TODO REGISTER
 *
 * Fourteen approved labels point at routes that do not exist yet — `/coverage`
 * was the fifteenth and now resolves to `/insurance#coverage`. Each is marked
 * `isRoutePending`, which renders `data-route-pending` on the anchor so the
 * outstanding set is auditable in the DOM as well as greppable here. They are
 * 404s until a later phase adds the stubs, and every flag must be cleared
 * before launch:
 *
 *   /our-mission · /partners · /careers · /faqs · /help-centre · /claims ·
 *   /privacy-policy · /terms-of-use · /policy-terms · /complaints-procedure ·
 *   /cookie-policy
 *
 * The paths are conventional slugs derived from the approved labels, not
 * approved URLs. Confirm them before the stub routes are built — renaming a URL
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
      [RESOLVED] `/coverage` never existed and was one of the fifteen pending
      routes. `Omanga-Insurance-Page-Content-Spec` § 10 repoints it at the
      insurance page's § 6 anchor, which is a real destination, so the flag is
      cleared rather than left waiting on a route nobody is going to build.

      The spec makes the same move for "Insurance Plans" — `/plans` →
      `/insurance#plans`, with a 301 — and that half is deliberately not
      applied: `Plans` stays a nav item pointing at the real `/plans` route on
      instruction. See `content/insurance.content.ts` § CONFLICT.
    */
    { label: "Coverage — 43 countries", href: "/insurance#coverage" },
  ],
} as const;

const COMPANY: FooterLinkColumn = {
  heading: "Company",
  links: [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: "/our-mission", isRoutePending: true },
    { label: "Partners", href: "/partners", isRoutePending: true },
    { label: "Careers", href: "/careers", isRoutePending: true },
  ],
} as const;

const SUPPORT: FooterLinkColumn = {
  heading: "Support",
  links: [
    { label: "Contact", href: "/contact" },
    { label: "FAQs", href: "/faqs", isRoutePending: true },
    { label: "Help Centre", href: "/help-centre", isRoutePending: true },
    { label: "Claims", href: "/claims", isRoutePending: true },
  ],
} as const;

const LEGAL: FooterLinkColumn = {
  heading: "Legal",
  links: [
    { label: "Privacy Policy", href: "/privacy-policy", isRoutePending: true },
    { label: "Terms of Use", href: "/terms-of-use", isRoutePending: true },
    { label: "Policy Terms", href: "/policy-terms", isRoutePending: true },
    {
      label: "Complaints Procedure",
      href: "/complaints-procedure",
      isRoutePending: true,
    },
    { label: "Cookie Policy", href: "/cookie-policy", isRoutePending: true },
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
