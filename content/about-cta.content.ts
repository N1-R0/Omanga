// [CHANGED, 2026-10-10] Copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged.
import { ctaContent } from "@/content/cta.content";
import type { CtaContent } from "@/content/cta.content";
import { HERO_PRIMARY_ACTION } from "@/content/hero.content";
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";

/**
 * Final CTA — spec § 7.
 *
 * The page's close: understanding turned into movement, without a hard sell.
 *
 * The `CTA` section component is reused unchanged — it takes its content and
 * heading id as props and knows nothing about which page mounts it, the same
 * arrangement the header, the footer and the partners strip have. This is the
 * fourth page to close on it.
 *
 * ---------------------------------------------------------------------------
 * [NOT MOUNTED] § 7's two teaser tiles.
 *
 * § 7 specifies "two image teaser tiles with short labels, each linking to a
 * destination" — `Omanga Payment Solutions` → `/payments` and
 * `Omanga Holiday Insurance` → `/insurance`, each with an ✏️ NEW sub-label and an
 * `h3`. `CtaContent` has no field for them and `CTA` has no slot: the band is one
 * heading, one paragraph, one action and a decorative backdrop.
 *
 * They are not added, because adding them means changing the shared band that
 * closes the homepage, the Insurance page and the Plans page — three shipped
 * pages, to serve one. That is a decision about the component, not about this
 * page's copy, and it should be made as one.
 *
 * What it costs is worth stating plainly rather than leaving to review:
 *
 *   - § 3.4 lists both tiles as Committed internal links, and § 3.2 lists their
 *     two `h3`s in the heading hierarchy. Both are now unfulfilled.
 *   - § 7's own reasoning for them was that Clarity's closer "resolves into three
 *     clickable exits", and Omanga's point "inward to `/payments` and
 *     `/insurance`, which is strictly better for internal link equity". The
 *     footer still carries both destinations, so the links exist on the page —
 *     just not as the closer's own exits.
 *
 * The two products are still named in the paragraph below.
 *
 * [NOT MOUNTED] Inline body links ("Explore the wallet" → /payments, "Compare
 * health plans" → /plans). `intro` is a
 * plain string, and coding-guidelines.md is explicit that "copy is data, never
 * markup", so a content module cannot carry an anchor, and `CTA` takes one
 * action only.
 *
 * [NOT ADDED] A form. § 7: "No form on this page. The approved Homepage owns the
 * capture form; duplicating it here creates two competing closers across the site
 * and dilutes the About page's comprehension job."
 */

// [CHANGED, 2026-10-14] UX copy pass: wallet scope (50+ countries) and health
// cover scope (Nigeria) stated separately; names the starting price.
const INTRO = `Open a free wallet you can spend in ${COUNTRIES_SERVED_DISPLAY} African countries, then add health cover for your time in Nigeria. Plans start at $50 a month.`;

/**
 * The artwork is read from the homepage band rather than redeclared, so the
 * decorative asset has exactly one owner and no `src` is typed twice — the same
 * arrangement the Insurance and Plans bands already use.
 */
export const aboutCtaContent: CtaContent = {
  // [CHANGED, 2026-10-14] UX copy pass: was "Travel Africa with your wallet and
  // cover ready", which implied cover outside Nigeria.
  heading: "Land in Nigeria with money and cover sorted",
  intro: INTRO,
  // [CHANGED, 2026-10-14] UX copy pass: was "Explore Omanga" → "/". The site's
  // one primary action, shared with the home hero so label and URL cannot drift.
  action: HERO_PRIMARY_ACTION,
  graphic: ctaContent.graphic,
} as const;

export const ABOUT_CTA_HEADING_ID = "about-cta-heading" as const;
