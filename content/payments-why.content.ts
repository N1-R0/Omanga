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
    "A home bank card that gets blocked or declined the moment you cross a border",
    "An exchange margin you only notice when the statement arrives",
    "A separate account or app for every currency you touch",
    "Transfer fees and minimums on money you've already earned",
    "A different payment arrangement for every country on the itinerary",
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
    "A wallet built for spending across the continent",
    "Mid-market rates, sourced from public market data and refreshed hourly",
    "Six currencies held, sent and received from one wallet",
    "No hidden fees, no minimums, and free transfers between Omanga accounts",
    `One account, spendable in ${COUNTRIES_SERVED_DISPLAY} African countries, with 24/7 support behind it`,
  ],
} as const;

export type PaymentsWhyContent = {
  readonly heading: string;
  readonly intro: string;
  readonly groups: readonly [ComparisonGroup, ComparisonGroup];
};

export const paymentsWhyContent: PaymentsWhyContent = {
  heading: "Why travellers switch to Omanga",
  intro:
    "Most people paying their way across Africa are improvising: a home bank card that may or may not work, a currency app that quietly marks up the rate, and cash for everything else. It works until it doesn't — usually at a checkout, in a country where sorting it out takes a day.",
  groups: [WITHOUT_OMANGA, WITH_OMANGA],
} as const;

export const PAYMENTS_WHY_HEADING_ID = "payments-why-heading" as const;
