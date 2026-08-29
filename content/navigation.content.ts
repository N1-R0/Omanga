import { PRIMARY_CTA } from "@/content/site.content";
import type { CallToAction, NavigationEntry } from "@/types/content.types";

/**
 * The primary navigation.
 *
 * Every label below is verbatim from the CEO-approved copy document,
 * § 1 · Header / Navigation, and from project-context.md § Non-negotiable copy
 * facts, which restates the set as a resolved conflict:
 *
 *   "Primary CTA is `Get Started`. Nav is Home · Insurance · Payment · About ·
 *    Contact."
 *
 * Nothing here is drafted. The order is the approved order.
 *
 * ---------------------------------------------------------------------------
 * CONFLICT — Figma omits "Home"
 *
 * The Figma header frame (node 1265:12524) draws four items: Insurance,
 * Payment, About, Contact. The approved copy and project-context both list
 * five, beginning with Home.
 *
 * Precedence is copy doc → Figma → spec, and project-context files the nav set
 * under *resolved* conflicts, so "Home" ships. Raised for design, not resolved
 * silently: if the Figma frame is the newer decision, this is a one-line change
 * here and nowhere else.
 *
 * ---------------------------------------------------------------------------
 * CONFLICT — the approved copy's other two header elements
 *
 * § 1 also specifies a CURRENCY INDICATOR ("USD") and an ACCOUNT LINK
 * ("Log in"). Neither appears in the Figma frame, neither has a defined
 * destination, and the currency indicator has no defined behaviour
 * (display-only, or a switcher that changes pricing?). design.md
 * describes its *geometry* but no interaction.
 *
 * Both are therefore omitted rather than invented. They are the phase's two
 * open content blockers.
 */

/**
 * Nav destinations map onto routes that exist in the application today. None is
 * pending: `/`, `/insurance`, `/payments`, `/plans`, `/about` and `/contact` are
 * all live routes in the legacy group and will be migrated in a later phase.
 *
 * [QUESTION] The label is "Payment" (singular, approved) while the route is
 * `/payments` (existing). There is also an external payments destination in
 * the legacy link module. This points at the internal route: the SEO plan asks
 * for 22–28 internal links, and sending the primary nav off-site would work
 * against that. Confirm the intended target.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATION] "Plans" is a sixth item the approved copy does not list.
 *
 * project-context.md § Non-negotiable copy facts states the set as a *resolved*
 * conflict — "Nav is Home · Insurance · Payment · About · Contact" — so this is
 * a deliberate departure from an approved decision rather than a gap being
 * filled, added on instruction. Recorded here because a resolved conflict that
 * quietly reopens is the kind of thing that gets re-litigated six weeks later
 * with nobody able to say when it changed.
 *
 * Position is after Payment: `/plans` sells the Silver/Gold/Diamond insurance
 * tiers, so it sits with the products rather than with the company pages, and
 * placing it after both keeps Insurance and Payment adjacent.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] "Company" and "Blog", on instruction.
 *
 * About and Contact are no longer top-level entries. They are the two items of
 * a "Company" menu, which reopens the resolved conflict recorded above a second
 * time — the approved set was Home · Insurance · Payment · About · Contact, and
 * neither Company nor Blog is in it. Recorded rather than absorbed, for the same
 * reason "Plans" is: a decision that changes quietly cannot be defended later.
 *
 * They are moved, not duplicated. A destination that appears both at the top
 * level and inside a menu gives a screen-reader user two identical links to the
 * same page and gives everyone else the impression the two might differ.
 *
 * "Company" itself has no route and is deliberately not given one — see
 * `LinkGroup` in `types/content.types.ts`.
 */
const PRIMARY_ITEMS: readonly NavigationEntry[] = [
  { label: "Home", href: "/" },
  { label: "Insurance", href: "/insurance" },
  { label: "Payment", href: "/payments" },
  { label: "Plans", href: "/plans" },
  {
    label: "Company",
    items: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  /*
    [PENDING ROUTE] `/blog` does not exist and is not being stubbed. An
    unmatched path resolves to `app/not-found.tsx`, which is the real 404 page
    with the header, the footer and the recovery links — so the instruction to
    "put the 404 UI there for now" is satisfied by routing rather than by a
    placeholder page that would have to be found and deleted later.

    `isRoutePending` is what keeps it auditable: the entry emits
    `data-route-pending` in the DOM, so this outstanding stub is greppable in
    the source and assertable in a crawl. It is also why `/blog` is absent from
    `config/routes.ts` — a sitemap must not advertise a URL that 404s.
  */
  { label: "Blog", href: "/blog", isRoutePending: true },
] as const;

export const navigationContent: {
  readonly items: readonly NavigationEntry[];
  readonly action: CallToAction;
  /** Accessible name for the navigation landmark. Not marketing copy. */
  readonly landmarkLabel: string;
  /** Accessible name for the menu toggle, per state. Not marketing copy. */
  readonly menuOpenLabel: string;
  readonly menuCloseLabel: string;
  /** Accessible name for the home link that wraps the logo. */
  readonly homeLabel: string;
} = {
  items: PRIMARY_ITEMS,
  // Imported rather than retyped, so the label cannot drift between the
  // header, the hero and the CTA band.
  action: PRIMARY_CTA,
  landmarkLabel: "Main",
  menuOpenLabel: "Open menu",
  menuCloseLabel: "Close menu",
  homeLabel: "Omanga — home",
} as const;
