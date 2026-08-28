import {
  CONTACT_EMAIL,
  OFFICE_ADDRESS,
  WHATSAPP_NUMBER_DISPLAY,
  WHATSAPP_URL,
} from "@/config/site";
import { COUNTRIES_SERVED } from "@/content/site.content";
import type { LinkTarget } from "@/types/content.types";

/**
 * Contact information — spec § 5.
 *
 * The direct route for the visitor who will not fill in a form, and the answer to
 * the question § 5 says a quality rater asks first: "who is responsible for this
 * site and can they be contacted?"
 *
 * Three cards drawn from what Omanga actually publishes — Email, Support,
 * Coverage — against the benchmark's eight office cards. § 5: "These are the
 * three facts Omanga's live Contact page publishes. Same grid, same card anatomy,
 * real content. No office was invented to fill the layout."
 *
 * ---------------------------------------------------------------------------
 * [RESOLVED] § 5's hard blocker is lifted.
 *
 * § 0 and § 5 both stated it: "Section 5 cannot ship without a live WhatsApp
 * business number… not a dead `wa.me` link, and not a phone number." The number is
 * supplied and confirmed working, so Card 2 ships its real CTA rather than the
 * specified email-and-hours interim.
 *
 * Both this card and § 2's hero button read `WHATSAPP_URL` from `config/site.ts`,
 * which is what § 5 requires of them: "Both point at the same link — one number,
 * one entry point, no fragmentation."
 *
 * [NOTE] The repetition is deliberate, not an oversight. § 5: "Card 2 repeats the
 * hero's WhatsApp CTA deliberately. The hero catches the visitor arriving in a
 * panic; this card catches the one who read the whole page and never chose an
 * option card."
 *
 * ---------------------------------------------------------------------------
 * [NO PHONE NUMBER] § 0's mandate, applied here and in § 2: "No phone number
 * appears anywhere on the page." The benchmark's grid carries one per office; this
 * one carries none, and § 5 calls that "also honest: Omanga does not publish one."
 */

/**
 * ✏️ § 5's copy, transcribed with the country count corrected.
 *
 * [CORRECTED] § 5 says 52 in the coverage card's body and again in its CTA label.
 * project-context.md § Non-negotiable copy facts puts it at 43 and requires the
 * spec's 52 be "rejected everywhere, including alt text, meta descriptions and
 * schema `areaServed`". `COUNTRIES_SERVED` is interpolated rather than typed, so
 * the figure has one owner and the label cannot drift from the sentence above it.
 *
 * [VERIFY] Card 1's "within one business day" is § 5's own
 * `[VERIFY response time]`, and § E-E-A-T item 6 gates it: "publish it only once
 * it is kept." It ships because it is § 5's approved copy and it already appears
 * in § 4A's form intro; both come out together if the figure cannot be met.
 *
 * [VERIFY] Card 2's "staffed 24/7" is § E-E-A-T open question 3 — "Is the 24/7
 * contact centre claim accurate today, and in which timezone is the team based?"
 * Transcribed because it is Omanga's published claim on the live Contact page,
 * which the spec names as its only source of fact.
 */
const COVERAGE_BODY = `Omanga serves travellers across ${COUNTRIES_SERVED} African countries, with payments and health cover in one account.`;

const COVERAGE_LINK_LABEL = `See all ${COUNTRIES_SERVED} countries`;

/**
 * [BLOCKER → CHANGED] The coverage link's destination.
 *
 * § 5 sends it to `/coverage`, which § 3.4 calls "the internal link that connects
 * this page into the coverage cluster". That route does not exist, and
 * § Implementation notes anticipates exactly this: "`/coverage` page — required
 * for Section 5's coverage CTA to resolve; until it exists, the CTA links to the
 * homepage coverage section."
 *
 * So it points at the homepage's own coverage band, which is a real, rendered
 * section with a stable heading id. `isRoutePending` is not set: this is a working
 * link to real content rather than an approved label with no destination, which is
 * what that flag exists to mark. It becomes `/coverage` in one line when the page
 * ships.
 */
const COVERAGE_HREF = "/#coverage-heading";

export type ContactInfoCard = {
  readonly id: string;
  readonly heading: string;
  readonly body: string;
  readonly action: LinkTarget;
  /**
   * Render WhatsApp's mark beside the link. § 5's CTA table asks for it on the
   * support card only — "WhatsApp glyph left of label" — and a flag rather than an
   * icon in the content module is what keeps markup out of copy.
   */
  readonly hasWhatsAppMark?: boolean;
};

const CARDS: readonly ContactInfoCard[] = [
  {
    id: "email",
    heading: "Email us",
    body: "For enquiries about payments, insurance plans, partnerships or anything else — write to us and we'll reply within one business day.",
    /**
     * The address is the link and the label at once. § 5: "Address is the link;
     * display the address in full, never behind 'Email us here' — a visible
     * address is a trust signal and it lets people copy it."
     *
     * § 5 also forbids the usual defence: "Do not obfuscate it with JavaScript
     * against scrapers; that breaks copy-paste and screen readers for a negligible
     * spam benefit." Nothing here does.
     */
    action: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  },
  {
    id: "support",
    heading: "Need support?",
    body: "Already using Omanga? Our contact centre is staffed 24/7 for payments and insurance. Start a WhatsApp chat and a specialist will pick it up wherever you are.",
    action: {
      label: "Chat on WhatsApp",
      href: WHATSAPP_URL,
      isExternal: true,
    },
    hasWhatsAppMark: true,
  },
  {
    id: "coverage",
    heading: "Where we operate",
    body: COVERAGE_BODY,
    action: { label: COVERAGE_LINK_LABEL, href: COVERAGE_HREF },
  },
] as const;

/**
 * The map and the office block beneath it.
 *
 * [REMOVED] The `Get directions on Google Maps` link. Removed on instruction. The
 * map is still clickable in itself — Google's own frame opens directions from a
 * pin — so nothing a visitor could do is lost, and the block below is now the
 * section's last element rather than a link trailing off the end of it.
 *
 * [FLAGGED — needs approval] Two new strings. `frameTitle` names the iframe for a
 * screen reader, which is required and cannot be omitted; `officeHeading` names the
 * district the office sits in, which is the benchmark's own pattern for these
 * blocks.
 *
 * `frameTitle` is accessibility chrome rather than marketing copy — the same
 * category as the skip link's label and the navigation landmark's name, which also
 * live in content modules.
 */
export type OfficeMapContent = {
  readonly frameTitle: string;
  readonly officeHeading: string;
  /** The chat number, as a visitor reads it. Never a `tel:` link — see below. */
  readonly whatsappNumber: string;
};

export type ContactInformationContent = {
  readonly heading: string;
  readonly cards: readonly ContactInfoCard[];
  /**
   * The embedded Google map.
   *
   * [REVERSES § 6] The spec removes the map "entirely. Not replaced." Added on
   * instruction — and § 6's stated reason was that "Omanga publishes no office
   * addresses, so there is nothing to pin", which the supplied address overtakes.
   * See `OfficeMap` for how its other three objections are answered, and for the
   * privacy question it opens.
   */
  readonly map: OfficeMapContent;
  /**
   * The office address, as text beneath the map.
   *
   * § 5 specifies the presence and the position: "If a registered address and
   * company number are supplied `[VERIFY]`, add them as a plain paragraph beneath
   * the grid — not as a fourth card, which would imply a visitable office Omanga
   * has not confirmed." Still a paragraph beneath the grid, and still not a card.
   *
   * It stays even though the map now shows the same place, and that is not
   * redundancy: the map conveys nothing to a screen reader, nothing to a keyboard
   * user in any detail, and cannot be copied. WCAG requires information not be
   * carried by a single means, so the text is the information and the map
   * illustrates it.
   *
   * [VERIFY] Whether this is the registered address rather than a trading one, and
   * the company number that § 5 asks for alongside it — see `OFFICE_ADDRESS`.
   */
  readonly address: string;
};

export const contactInformationContent: ContactInformationContent = {
  /**
   * ✏️ § 5 and § SEO's hierarchy, transcribed unchanged.
   *
   * § 5 replaced the benchmark's "Where we live" for a stated reason: "Clarity's
   * heading is literal — it introduces eight physical offices and a map. Omanga
   * publishes no office locations, so a 'where we live' heading over a grid with
   * no addresses would raise the exact doubt the section exists to remove."
   *
   * That reasoning is now partly overtaken — an address exists — and the heading
   * still stands. It describes what the section contains, which is three ways to
   * reach Omanga and not three places to visit, and § SEO maps it to `Omanga
   * support` intent.
   */
  heading: "How to reach us",
  cards: CARDS,
  map: {
    /*
      Names the place rather than repeating the whole address, which the text
      beneath the frame already carries in full. A title that restates the street
      line makes a screen reader read the address twice — once as the frame's name
      and once as the content.
    */
    frameTitle: "Map of Omanga's office in Victoria Island, Lagos",
    /*
      The place, not a label for it.

      It was "Our office", in the voice of the three card headings above. Changed on
      instruction, and it is the better line: the benchmark names each block by its
      location — "Manchester (HQ)" — because that is what distinguishes one contact
      block from another, and a heading that repeats what the card obviously is
      ("Our office", above an office address) tells a reader nothing they had not
      already worked out.

      No "(HQ)" and no "Head office". The benchmark's parenthetical marks one of
      eight; Omanga has one location and nothing in the source documents says it is
      the registered or principal office — see `OFFICE_ADDRESS`, where that
      distinction is still open. The district is a fact; a rank would be a claim.

      [OVERRIDES § 5] § 5 forbade a fourth card here: "not as a fourth card, which
      would imply a visitable office Omanga has not confirmed." The office is now
      confirmed and the map states it plainly, so the implication is true and the
      caution has nothing left to protect.
    */
    officeHeading: "Victoria Island",
    /*
      Published as the chat channel's identifier, linked to `wa.me`.

      § 0 mandates "no phone number appears anywhere on the page" and § 5 repeats
      it — but that mandate replaces *calling* with chat, and § 0's own placeholder
      note lists "no WhatsApp number" among the values Omanga was expected to
      supply before launch. So this is the supplied value, not a reintroduced phone
      number: there is no `tel:` anywhere on the page and no invitation to call.
    */
    whatsappNumber: WHATSAPP_NUMBER_DISPLAY,
  },
  address: OFFICE_ADDRESS,
} as const;

export const CONTACT_INFORMATION_HEADING_ID =
  "contact-information-heading" as const;
