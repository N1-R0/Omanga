import { ctaContent } from "@/content/cta.content";
import type { CtaContent } from "@/content/cta.content";
import { COUNTRIES_SERVED } from "@/content/site.content";

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
 * The two products are still named in the paragraph below, which is § 7's copy
 * and is unchanged.
 *
 * [NOT MOUNTED] § 3.4's two inline body links — `52 African countries` →
 * `/coverage` and `short-term health cover` → `/insurance/plans`. `intro` is a
 * plain string, and coding-guidelines.md is explicit that "copy is data, never
 * markup", so a content module cannot carry an anchor. Neither route exists
 * either: `/coverage` is not in the application and `/insurance/plans` is not the
 * path — the tiers live at `/plans`. Both would need a route and a typed
 * rich-text shape before they could ship.
 *
 * [NOT ADDED] A form. § 7: "No form on this page. The approved Homepage owns the
 * capture form; duplicating it here creates two competing closers across the site
 * and dilutes the About page's comprehension job."
 */

/**
 * ✏️ NEW. § 7's body paragraph, with one correction.
 *
 * [CORRECTED] § 7 says "52 African countries". project-context.md § Non-negotiable
 * copy facts puts the figure at 43 — the approved copy document's tracked changes
 * replace every 52 with 43, and copy outranks a spec. `COUNTRIES_SERVED` is
 * interpolated rather than typed so the number has one owner across the site.
 *
 * This is the same correction the Insurance page and the Get Started page already
 * carry, and it is the conflict raised at the hero stage now landing: § 2's base
 * strip claimed 52 too, and that strip is gone.
 *
 * Everything else is transcribed unchanged, including the Ubuntu sentence. § 7:
 * "It is the most distinctive line Omanga owns and it belongs at the emotional
 * close of the About page." Its inclusion here is what allows § 5 item 1 — the
 * standalone *Why We Do What We Do* panel — to be retired, which is § 7's own
 * recommendation and is what this page does.
 *
 * [NOTE] Every product claim in it — the wallet and card, spending across
 * Africa, short-term cover, established local providers — already appears in
 * approved homepage copy. § 7: "Nothing new is claimed."
 */
const INTRO = `Africa rewards the traveller who arrives ready. Omanga brings the essentials into one place — a multi-currency wallet and card that works across ${COUNTRIES_SERVED} African countries, and short-term health cover from established local providers — so that the practical side of the trip is handled before you land and the continent gets your full attention. The spirit of Ubuntu lives in us all; through our collective unity, we achieve great things.`;

/**
 * The artwork is read from the homepage band rather than redeclared, so the
 * decorative asset has exactly one owner and no `src` is typed twice — the same
 * arrangement the Insurance and Plans bands already use.
 */
export const aboutCtaContent: CtaContent = {
  // ✏️ NEW. § 7 and § 3.2, transcribed unchanged. Sentence case per § 3.2.
  heading: "Begin your African journey",
  intro: INTRO,
  /**
   * ✏️ NEW. § 7's primary, pointing at the homepage.
   *
   * Not `PRIMARY_CTA` (`Get Started` → `/get-started`), which is what the
   * homepage's own band uses. § 7 is explicit about the label and the
   * destination, and about why: the four intents this page serves are "explore
   * Omanga, discover Payments, discover Insurance, begin the journey", and § 7's
   * tone calibration asks for inspiring over sales-heavy. `Explore Omanga` is an
   * invitation to look; `Get Started` is an instruction to convert, and an About
   * page's job is comprehension.
   *
   * [NOTE] This is the same label § 2 gives the hero CTA, which is not mounted —
   * so the page has one `Explore Omanga` rather than two, and no ambiguity about
   * which one a visitor means. If the hero's is restored it needs a different
   * label or a different destination; § 2 sends it to `#mission-vision`, so the
   * two are the same words pointing at different places.
   */
  action: {
    label: "Explore Omanga",
    href: "/",
    emphasis: "primary",
  },
  graphic: ctaContent.graphic,
} as const;

export const ABOUT_CTA_HEADING_ID = "about-cta-heading" as const;
