import type { Object3D } from "@/content/home-v2.content";
import type { Eyebrow, LinkTarget } from "@/types/content.types";
import {
  COUNTRIES_SERVED_DISPLAY,
  PAYMENTS_RATES_ANCHOR,
} from "@/content/site.content";

// Section 4 of Omanga-Homepage-Copy-Approval NJ edits.docx, tracked changes accepted.

/*
  [CHANGED, 2026-10-10] The three service photos are replaced by 3D objects
  from the app's set, on the owner's instruction (pick K5, "tilted deck",
  from `design-lab/services-stack.html`). The objects are decorative.
*/

const SPEND_ACTION: LinkTarget = {
  label: "Explore payments",
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
  label: "See today's rates",
  href: `/payments#${PAYMENTS_RATES_ANCHOR}`,
} as const;

const INSURANCE_ACTION: LinkTarget = {
  label: "Compare plans",
  href: "/plans",
} as const;

/** `action` carries no emphasis: the pattern fixes it, so copy does not choose it. */
export type ServiceContentItem = {
  readonly heading: string;
  readonly body: string;
  readonly action: LinkTarget;
  /** The 3D object that carries the card. */
  readonly object: Object3D;
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
  // [CHANGED, 2026-10-10] Shortened on instruction. Was "From funding your
  // wallet before you fly to reaching a clinic mid-trip, here's what your
  // Omanga account actually does."
  heading: "From funding before you fly to care mid-trip",
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
      body: `Pay from your wallet balance in ${COUNTRIES_SERVED_DISPLAY} African countries, online or in person, however many borders your trip crosses.`,
      action: SPEND_ACTION,
      object: "africa-continent",
    },
    {
      heading: "Move money between currencies",
      body: "Hold, send and receive several currencies, and top up from USD, GBP or CAD. You see the rate before you convert, so there are no surprises.",
      action: CURRENCY_ACTION,
      object: "exchange",
    },
    {
      heading: "Stay covered while you travel",
      body: "Choose Silver, Gold or Diamond cover for the length of your trip, get care through established Nigerian providers, and extend if the trip runs long.",
      action: INSURANCE_ACTION,
      object: "insurance-kit",
    },
  ],
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const SERVICES_HEADING_ID = "services-heading";
