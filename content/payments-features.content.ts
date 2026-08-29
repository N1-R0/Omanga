import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { Eyebrow } from "@/types/content.types";

/**
 * What Omanga Payment Solutions does — spec § 4.
 *
 * Three capability cards, then the figures that back them. The spec pairs those
 * two as one continuous block deliberately: "claim, then proof, before the
 * visitor has a chance to doubt the claim." They are one section here for the
 * same reason.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED from spec] Card three was the card.
 *
 * § 4d is titled "The Omanga card" and headed "One card, accepted across 52+
 * African countries". Neither can ship — see the page header note. The eyebrow
 * becomes the capability rather than the object, and the heading names the
 * balance, which is the confirmed construction.
 *
 * "Accepted" went with it. It is an acceptance-network word: a wallet is not
 * "accepted across" countries, an instrument is, so keeping the verb would have
 * re-implied the thing the noun stopped claiming.
 *
 * § 4a's intro loses "tapping your card at a market stall in Accra" for the same
 * reason. "Paying at a market stall in Accra" keeps the image and the place.
 *
 * ---------------------------------------------------------------------------
 * [FIGURES] Every number in the metric row is published on `omanga.biz`, with
 * the country count taken from the constant rather than typed.
 *
 * § 4e is explicit about what may not be added: "transaction volumes, user
 * counts, 'trusted by thousands', average issuance time, or settlement speed."
 * None is here. The spec also names the two figures that would be worth adding
 * if Omanga can evidence them — a funding-settlement time and an issuance time —
 * and both remain unevidenced.
 */

export type PaymentsFeatureId = "wallet" | "rates" | "coverage";

/**
 * A card is a heading and a visual. Nothing else.
 *
 * [CHANGED, 2026-08-29] `eyebrow`, `body` and `action` are gone, on instruction,
 * so the artwork carries the card and the heading only names it.
 *
 * Deleted rather than left unrendered. An optional field nothing reads is how a
 * section quietly regrows the thing it was stripped of, and the strings are in
 * git if the decision reverses.
 *
 * What each removal cost, recorded because two of the three are real:
 *
 *   `body`     The spec's § 4 paragraphs carried the only statement on this page
 *              of three facts — that transfers between Omanga accounts are free,
 *              that there are no minimums, and that rates come from public market
 *              data refreshed hourly. The first two survive in the hero's helper
 *              line; the third now exists only inside the rate visual's caption,
 *              which is `aria-hidden` artwork. **A screen-reader user can no
 *              longer reach it.** § 5's Without/With rows are the natural place
 *              to restore it.
 *
 *   `action`   Three of the twelve-to-sixteen internal links § 11.4 asks for came
 *              from this section — `Explore the wallet`, `See live rates`,
 *              `Get your Omanga card`. The spec calls these cards "the
 *              internal-linking engine" and gives the section no other CTA by
 *              design. The page is now three links short of that target and § 4
 *              contributes none.
 *
 *   `eyebrow`  No cost. It restated the heading one size smaller.
 */
export type PaymentsFeature = {
  /** Selects the visual. A closed union, so a card cannot ask for artwork that
      does not exist and a fourth card cannot be added without a design decision. */
  readonly id: PaymentsFeatureId;
  readonly heading: string;
};

/**
 * One entry in the proof row beneath the cards.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] Was `{ figure, label }` — a large numeral over a caption.
 *
 * It is now a term and a description, on instruction, following the pattern
 * `InsuranceInclusions` already uses: a glyph, a short term, one or two lines of
 * secondary copy. The row reads as four facts rather than as a scoreboard.
 *
 * **Every figure survives, inside its term.** That was the constraint: `50+`,
 * `six`, `three` and `24/7` are all still stated, and none is stated anywhere
 * else in this section now that the cards carry no body copy. The spec's § 4e
 * exists to put numbers on the page and it still does — they are set in the
 * feature size rather than at h3 scale, which is the whole visual change.
 *
 * What the longer form buys back is the thing removing the card body cost: the
 * descriptions restate, in reachable text, several facts that had fallen into
 * `aria-hidden` artwork — the mid-market rate, the corridors, that support
 * covers every country served.
 *
 * `id` keys the glyph mapping in the section, and is never rendered. It exists
 * so renaming a term cannot silently change its icon.
 */
export type PaymentsMetric = {
  readonly id: string;
  readonly term: string;
  readonly description: string;
};

export type PaymentsFeaturesContent = {
  readonly eyebrow: Eyebrow;
  readonly heading: string;
  readonly intro: string;
  readonly features: readonly [
    PaymentsFeature,
    PaymentsFeature,
    PaymentsFeature,
  ];
  readonly metricsLabel: string;
  readonly metrics: readonly PaymentsMetric[];
};

const FEATURES: readonly [PaymentsFeature, PaymentsFeature, PaymentsFeature] = [
  {
    id: "wallet",
    heading: "Hold and move money in the currency you need",
  },
  {
    id: "rates",
    heading: "See the real rate before you convert",
  },
  {
    id: "coverage",
    heading: `Spend across ${COUNTRIES_SERVED_DISPLAY} African countries`,
  },
] as const;

/**
 * The metric row.
 *
 * `Omanga by the numbers` is the label the live site already uses for its
 * equivalent block. The spec is explicit about keeping it rather than adopting
 * the benchmark's "Live insights", and it is the one string in this section
 * carried over verbatim from something published.
 */
const METRICS: readonly PaymentsMetric[] = [
  {
    id: "coverage",
    term: `${COUNTRIES_SERVED_DISPLAY} African countries`,
    description:
      "One account and one set of rates, from Algiers to Cape Town — however many borders the trip crosses.",
  },
  {
    id: "currencies",
    term: "Six currencies, one wallet",
    description:
      "Hold, send and receive across all six without opening a separate account for each one.",
  },
  {
    id: "funding",
    term: "Three funding currencies",
    description:
      "Top up from USD, GBP or CAD. Every conversion runs at the mid-market rate, with no minimum.",
  },
  {
    id: "support",
    term: "24/7 travel support",
    description:
      "Emergency assistance whenever you need it, in every country Omanga covers.",
  },
] as const;

export const paymentsFeaturesContent: PaymentsFeaturesContent = {
  eyebrow: "What Omanga Payment Solutions does",
  heading: "Cross-border payments built for how Africa travels",
  intro:
    "From funding your wallet before you fly to paying at a market stall in Accra, three capabilities cover the whole journey — and they all live in one account.",
  features: FEATURES,
  metricsLabel: "Omanga by the numbers",
  metrics: METRICS,
} as const;

export const PAYMENTS_FEATURES_HEADING_ID = "payments-features-heading" as const;
