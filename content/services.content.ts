import type { Eyebrow, ImageAsset, LinkTarget } from "@/types/content.types";
import {
  COUNTRIES_SERVED_DISPLAY,
  PAYMENTS_RATES_ANCHOR,
} from "@/content/site.content";

// Section 4 of Omanga-Homepage-Copy-Approval NJ edits.docx, tracked changes accepted.

const SPEND_IMAGE: ImageAsset = {
  src: "/service-spend.jpg",
  alt: "A traveller using the Omanga app on her phone on a city street.",
  width: 1600,
  height: 1600,
} as const;

// [ASSUMPTION] Matched by elimination — the source file was named "explore africa", which
// names no service here. Confirm the pairing.
const CURRENCY_IMAGE: ImageAsset = {
  src: "/service-currency.jpg",
  alt: "Musicians and neighbours celebrating in a bunting-strung street.",
  width: 1600,
  height: 1600,
} as const;

const INSURANCE_IMAGE: ImageAsset = {
  src: "/service-insurance.jpg",
  alt: "A couple in conversation with an adviser.",
  width: 1600,
  height: 1600,
} as const;

const SPEND_ACTION: LinkTarget = {
  label: "Go to payments",
  href: "/payments",
} as const;

/*
  [FIXED] `href` was `/payments/rates`, which 404s. Like the coverage CTA, it was
  never in the footer's route register, so nothing tracked it — and it sits on the
  homepage.

  The route was inferred from the approved label at a point when nobody had
  checked whether the content existed somewhere already. It does: `/payments`
  renders a live exchange-rate table, fed by `app/(legacy)/_lib/rates.ts`, which
  fetches a public FX snapshot. So the destination the label promises is real; only
  the path was wrong.

  It now points at that section by anchor. The `id` is defined beside the section
  it names, in `app/(legacy)/payments/page.tsx`, so the link and its target move
  together — and it survives the page's migration into `(redesign)` as long as the
  anchor comes with it.
*/
const CURRENCY_ACTION: LinkTarget = {
  label: "Go to currency and rates",
  href: `/payments#${PAYMENTS_RATES_ANCHOR}`,
} as const;

const INSURANCE_ACTION: LinkTarget = {
  label: "Go to insurance plans",
  href: "/plans",
} as const;

/** `action` carries no emphasis: the pattern fixes it, so copy does not choose it. */
export type ServiceContentItem = {
  readonly heading: string;
  readonly body: string;
  readonly action: LinkTarget;
  readonly image: ImageAsset;
};

/** A fixed three-tuple, so a fourth service or a missing one fails the build. */
export type ServicesContent = {
  readonly eyebrow: Eyebrow;
  readonly heading: string;
  readonly services: readonly [
    ServiceContentItem,
    ServiceContentItem,
    ServiceContentItem,
  ];
  /*
    [REMOVED, 2026-08-29] `closing`, which read "Every one of these lives in a
    single account. Setting it up takes three steps."

    Gone from the type as well as from the value, so nothing renders an empty
    slot and the next reader cannot mistake a deliberate removal for a missing
    string. `Services` carried an [ASSUMPTION] note against it — the approved
    copy document never placed the line, and it has now been taken out rather
    than confirmed.

    Nothing it said is lost. "A single account" is the Solutions Overview's whole
    argument, and "three steps" is the How It Works section immediately below,
    which states them.
  */
};

export const servicesContent: ServicesContent = {
  eyebrow: "What you can do with Omanga",
  heading:
    "From funding your wallet before you fly to reaching a clinic mid-trip, here's what your Omanga account actually does.",
  services: [
    {
      heading: "Spend across the continent",
      /*
        [CORRECTED] "Pay with your Omanga card" -> "Pay with Omanga". NJ's tracked
        changes strike card language in eight other places and the vocabulary guard
        in `site.content.ts` forbids it outright; Omanga issues no card.

        [CHANGED, 2026-08-29] "wherever cards are accepted" is struck too.

        The first correction removed the card from Omanga's side of the sentence and
        left it on the merchant's — which reads, to anyone not holding the style
        guide, as a description of the instrument Omanga just stopped claiming. The
        approved replacement for the whole construction is to name the balance and
        say nothing about form factor: what a traveller does is spend from the
        wallet, and where they can do it is the country list.
      */
      body: `Spend straight from your wallet balance in ${COUNTRIES_SERVED_DISPLAY} African countries, online or in person. One arrangement for the whole itinerary, however many borders it crosses.`,
      action: SPEND_ACTION,
      image: SPEND_IMAGE,
    },
    {
      heading: "Move money between currencies",
      body: "Hold, send and receive several currencies in one place, and top up from USD, GBP or CAD. You see the real-time rate at the moment of conversion, so a transaction never costs more than you agreed to.",
      action: CURRENCY_ACTION,
      image: CURRENCY_IMAGE,
    },
    {
      heading: "Stay covered while you travel",
      body: "Choose Silver, Gold or Diamond short-term health cover for the length of your trip, reach care through established Nigerian health providers, and extend from your account if the trip runs long.",
      action: INSURANCE_ACTION,
      image: INSURANCE_IMAGE,
    },
  ],
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const SERVICES_HEADING_ID = "services-heading";
