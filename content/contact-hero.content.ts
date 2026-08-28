import { WHATSAPP_URL } from "@/config/site";
import type { CallToAction, Eyebrow } from "@/types/content.types";

/**
 * Contact hero — spec § 2.
 *
 * Confirms the visitor is in the right place, enumerates what they can get in
 * touch about, and gives the customer who arrived with a problem an immediate
 * route to a person.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] Two columns, not a centred one — and § 3 comes with it.
 *
 * § 2 describes Clarity's layout as a "centred column… Eyebrow label → H1 → one
 * supporting paragraph → visual break → inset `Need support?` panel", with § 3's
 * option grid as a separate section below. The supplied reference — Figma node
 * 2579:131893, which is Clarity's own frame at Omanga's container width — is a
 * two-column band: all of § 2 in the left column, and § 3's panel in the right.
 *
 * That resolves a conflict rather than creating one. § Conversion notes justifies
 * the hero having no button with "adding a CTA here would compete with the option
 * grid 300px below and split the click". In this layout the option grid is not
 * 300px below — it is beside the headline, in the same band, so there is nothing
 * to split. The support CTA and the option cards are one decision surface.
 *
 * § SEO's heading hierarchy is unchanged by the move: the `h1` is still this
 * section's and § 3's `How can we help?` is still an `h2` — it just sits higher
 * up the page.
 *
 * [DEVIATION] § 2's typography note asks for the support block to sit "visually
 * recessed — Omanga's blush tint background with a subtle left rule in maroon".
 * The reference gives it neither: it is flowing copy in the left column under the
 * paragraph, and the recessed treatment belongs to § 3's panel on the right. The
 * reference's arrangement ships, and there is no blush in this system in any
 * case — design.md § 8 holds one brand colour and four neutrals.
 */

/**
 * ✏️ § 2's copy, transcribed with one correction.
 *
 * [CORRECTED] § 2's support paragraph reads "help with a payment, your card or
 * an insurance claim". `FORBIDDEN_COPY_TERMS` in `content/site.content.ts`
 * records that "tracked changes removed every 'card' claim from the approved
 * copy… Physical-card language must not reappear in copy, image alt text, or
 * component names", and project-context.md outranks a page spec — the same
 * precedence that resolves 52 to 43.
 *
 * `your wallet` is substituted rather than the phrase being dropped: the list is
 * three things and § 2 wants all three enquiry territories named, "wallet" is
 * approved vocabulary that appears throughout the copy document, and the
 * sanctioned replacement for the card claim — "a customized payment solution" —
 * is procurement language that would not survive in this sentence.
 *
 * **This is a copy change and needs approval.** Flagged rather than silent
 * because a substitution is more invasive than a corrected numeral.
 *
 * [NOTE] The paragraph's "available 24/7" is § 2's own, and § E-E-A-T open
 * question 3 asks whether the claim is accurate today and in which timezone.
 * Transcribed because it is Omanga's published claim on the live Contact page,
 * which the spec names as its only source of fact.
 *
 * [NOT LINKED] § Internal linking wants `choosing an insurance plan` →
 * `/insurance/plans` and `setting up your multi-currency wallet` → `/payments`
 * as inline anchors inside the paragraph. It ships as plain text, on
 * instruction: coding-guidelines.md holds that "copy is data, never markup", so
 * a content module cannot carry an anchor without a typed rich-text shape that
 * does not exist. `/insurance/plans` is not a route either — the tiers are at
 * `/plans`. Both destinations are in the header and the footer, so the page
 * reaches them; it costs two of the spec's 12–15 target internal links.
 */
const INTRO =
  "Whether you're choosing an insurance plan, setting up your multi-currency wallet, sorting out a transaction, exploring a partnership, or just want to know how Omanga works before you commit — we'd like to hear from you. Our Africa travel specialists are available 24/7, and you're a few clicks from a real person.";

const SUPPORT_BODY =
  "Already using Omanga and need help with a payment, your wallet or an insurance claim? Start a WhatsApp chat and one of our specialists will pick it up — no ticket number, no hold music.";

/**
 * The `Need support?` block.
 *
 * Its own type rather than fields on the hero, because it is an `h3` with its own
 * body and its own action — § SEO's hierarchy lists it as "H3 | Need support? |
 * 2 — hero panel" — and flattening it would let the two paragraphs drift apart.
 */
export type SupportBlockContent = {
  readonly heading: string;
  readonly body: string;
  readonly action: CallToAction;
};

export type ContactHeroContent = {
  readonly eyebrow: Eyebrow;
  readonly heading: string;
  readonly intro: string;
  readonly support: SupportBlockContent;
};

export const contactHeroContent: ContactHeroContent = {
  /**
   * ✏️ § 2. Clarity's eyebrow is "Say hello"; § 2 replaces it because "Clarity's
   * is charming but carries no search or wayfinding value. 'Contact' matches the
   * nav label, the URL and the query the visitor typed."
   */
  eyebrow: "Contact",
  /**
   * ✏️ § 2 and § SEO's hierarchy — the page's single `h1`, 22 characters. § 2:
   * it "keeps Clarity's warmth and its *team* noun — the implicit promise of a
   * human — but front-loads the brand for `Contact Omanga` queries."
   */
  heading: "Talk to the Omanga team",
  intro: INTRO,
  support: {
    heading: "Need support?",
    body: SUPPORT_BODY,
    /**
     * ✏️ § 2's one CTA. `emphasis: "primary"` because § 2 specifies a solid
     * button and § Conversion notes calls it "the one exception, and justified: a
     * customer with a failed transaction needs the fastest possible exit from the
     * page, not a form."
     *
     * `isExternal` is what adds `target="_blank"` and
     * `rel="noopener noreferrer"`, which § 2 requires explicitly.
     *
     * The destination is `WHATSAPP_URL` from `config/site.ts` rather than typed
     * here, so this control and § 5's support card cannot point at different
     * numbers — § 5: "one number, one entry point, no fragmentation." That
     * constant also carries the `[VERIFY]` on the number's trunk prefix.
     *
     * [MOUNTED] § 2's "WhatsApp glyph left of label". The asset now exists, so
     * `Button` gained a `leadingIcon` slot — its own note records why the slot
     * was absent and why this requirement earns it — and `WhatsAppMark` renders
     * it. The forward arrow § 2's copy shows (`Chat on WhatsApp →`) is the
     * trailing icon.
     *
     * [NOT MOUNTED] § 2's "Typical reply time" line beneath the button. § 2 gates
     * it itself: show it "**only** once Omanga can evidence a figure `[VERIFY]`.
     * An unmet promise here is worse than no promise."
     */
    action: {
      label: "Chat on WhatsApp",
      href: WHATSAPP_URL,
      isExternal: true,
      emphasis: "primary",
    },
  },
} as const;

export const CONTACT_HERO_HEADING_ID = "contact-hero-heading" as const;
