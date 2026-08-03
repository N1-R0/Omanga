import { PRIMARY_CTA } from "@/content/site.content";
import type { CallToAction, LinkTarget } from "@/types/content.types";

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
 * (display-only, or a switcher that changes pricing?). design-system.md
 * describes its *geometry* but no interaction.
 *
 * Both are therefore omitted rather than invented. They are the phase's two
 * open content blockers.
 */

/**
 * Nav destinations map onto routes that exist in the application today. None is
 * pending: `/`, `/insurance`, `/payments`, `/about` and `/contact` are all live
 * routes in the legacy group and will be migrated in a later phase.
 *
 * [QUESTION] The label is "Payment" (singular, approved) while the route is
 * `/payments` (existing). There is also an external payments destination in
 * the legacy link module. This points at the internal route: the SEO plan asks
 * for 22–28 internal links, and sending the primary nav off-site would work
 * against that. Confirm the intended target.
 */
const PRIMARY_ITEMS: readonly LinkTarget[] = [
  { label: "Home", href: "/" },
  { label: "Insurance", href: "/insurance" },
  { label: "Payment", href: "/payments" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const navigationContent: {
  readonly items: readonly LinkTarget[];
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
