// [CHANGED, 2026-10-10] Copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged.
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { ComparisonGroup } from "@/content/why-omanga.content";

/**
 * Why travellers switch to Omanga — spec § 5.
 *
 * Loss framing, five rows. The spec calls this "the sharpest CRO device on the
 * page" and is explicit about why it earns its place: "Loss framing does work no
 * feature list can."
 *
 * `ComparisonGroup` is reused from the homepage's equivalent rather than
 * redeclared, so all three comparisons on the site render through the same
 * components and a change to the shape reaches every one of them.
 *
 * ---------------------------------------------------------------------------
 * THIS SECTION CARRIES THE FACTS § 4 DROPPED.
 *
 * Removing the capability cards' body copy took three claims off the page in
 * reachable text — free transfers between Omanga accounts, no minimums, and
 * rates sourced from public market data and refreshed hourly. The last of those
 * survived only inside `aria-hidden` artwork, which is to say it did not survive.
 *
 * All three are in the With column below. That is not a rescue bolted on: rows
 * two and four are the spec's own wording and always carried them. It is the
 * reason the loss was recoverable, and the reason `payments-features.content.ts`
 * names this section as where to look.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED from spec] Two With rows lose the card.
 *
 * § 5's first With row reads "A wallet **and card** built for spending across
 * the continent" and its fifth reads "One **card accepted** across 52+ African
 * countries". Neither can ship — see the page header note.
 *
 * Row one drops the two words and is otherwise the spec's. Row five is rewritten
 * rather than trimmed, because "accepted across" is an acceptance-network verb:
 * deleting the noun and keeping the verb would have left the sentence still
 * describing an instrument. It states the account and what you can do with it.
 *
 * [KEPT] The Without column's "home bank card" stays, and must.
 *
 * The vocabulary guard in `site.content.ts` is about *Omanga's* product — the
 * approved copy's tracked changes struck card claims Omanga was making about
 * itself. Row one's card belongs to the traveller's own bank, and it is the
 * problem this section is about. Removing it would remove the point.
 * `why-omanga.content.ts` reached the same conclusion for the same row.
 *
 * ---------------------------------------------------------------------------
 * [NOT BUILT] § 5's closing microcopy.
 *
 * The spec puts one line centred beneath the table: "Everything above runs on
 * bank-grade infrastructure and on-the-ground partners — built for the realities
 * of cross-border travel, not retrofitted for them."
 *
 * `WhyOmangaContent` has no field for it and `WhyOmanga` has no slot, so adding
 * it means changing a component the homepage and `/insurance` also render. Held
 * rather than forced.
 *
 * The cost is small and worth stating precisely: the line's two claims —
 * bank-grade infrastructure and on-the-ground partners — are § 8's entire
 * subject, and § 8 is two sections below this one. Nothing is lost from the page,
 * only from this position in it.
 */

/**
 * The problem side.
 *
 * Five pains, all personal and situational rather than operational. The spec is
 * deliberate about that axis: the benchmark's five are administrative because its
 * buyer is an administrator, and "Omanga's five are personal and situational
 * because its buyer is a traveller. Same device, correct axis."
 */
const WITHOUT_OMANGA: ComparisonGroup = {
  id: "without-omanga-payments",
  title: "Without Omanga",
  sentiment: "negative",
  items: [
    // [CHANGED, 2026-10-14] UX copy pass: shorter, plainer rows.
    "A bank card from home that gets declined abroad",
    "An exchange-rate markup you only find on your statement",
    "A separate account or app for each currency",
    "Minimum amounts before you can add money",
    "A different way to pay in each country on your trip",
  ],
} as const;

/**
 * The Omanga side.
 *
 * The five rows map 1:1 onto § 4's claims — wallet, rates, currencies, fees,
 * coverage — which is the spec's own anti-duplication design: "the visitor reads
 * the same five facts twice, once as a feature and once as a rescue, without
 * reading the same words twice."
 */
const WITH_OMANGA: ComparisonGroup = {
  id: "with-omanga-payments",
  title: "With Omanga",
  sentiment: "positive",
  items: [
    // [CHANGED, 2026-10-14] UX copy pass: names the ₦20 fee instead of "no
    // hidden fees"; numerals; "wallet" as the one body noun.
    "One wallet for spending across Africa",
    "The rate shown before you convert",
    "6+ currencies held, sent and received in one wallet",
    // [CHANGED, 2026-10-18] Owner: unconfirmed free-transfer claim removed.
    "Free to open, with no minimums",
    `Spend in ${COUNTRIES_SERVED_DISPLAY} African countries`,
  ],
} as const;

export type PaymentsWhyContent = {
  readonly heading: string;
  readonly intro: string;
  readonly groups: readonly [ComparisonGroup, ComparisonGroup];
};

export const paymentsWhyContent: PaymentsWhyContent = {
  heading: "Why travellers switch to Omanga",
  // [CHANGED, 2026-10-14] UX copy pass: plainer, shorter.
  intro:
    "Paying your way across Africa often means a bank card that gets declined, a rate with a hidden markup, and cash.",
  groups: [WITHOUT_OMANGA, WITH_OMANGA],
} as const;

export const PAYMENTS_WHY_HEADING_ID = "payments-why-heading" as const;
