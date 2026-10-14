import type { Eyebrow, ImageAsset, LinkTarget } from "@/types/content.types";
import {
  COUNTRIES_SERVED_DISPLAY,
  PAYMENTS_RATES_ANCHOR,
} from "@/content/site.content";

// Section 4 of Omanga-Homepage-Copy-Approval NJ edits.docx, tracked changes accepted.

/*
  [CHANGED, 2026-10-14, later] Illustrations dropped on the owner's instruction.
  Cards are now full-bleed photos after Samara on Mobbin (29d6b6a5). Payments and
  Insurance reuse the site's own photos; Currencies is from Unsplash.

  [CHANGED, 2026-10-14] Layout was pick S1, "Anchor cards with label tabs"
  (`design-lab/services-grid.html`). The objects carry over.

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
/**
 * `body` is approved copy but the photo cards (2026-10-14) show only the heading
 * and the action, as the Samara reference does. Kept here so it can return
 * without another copy round.
 */
export type ServiceContentItem = {
  readonly heading: string;
  readonly body: string;
  readonly action: LinkTarget;
  /** Full-bleed card photo (pick: Samara photo cards, 2026-10-14). */
  readonly image: ImageAsset;
  /** Credit for a photo that is not Omanga's own. */
  readonly imageCredit?: { readonly name: string; readonly url: string };
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
      image: {
        src: "/service-spend.jpg",
        alt: "A woman smiling at her phone on a busy street.",
        width: 1600,
        height: 1600,
      },
    },
    {
      heading: "Move money between currencies",
      body: "Hold, send and receive several currencies, and top up from USD, GBP or CAD. You see the rate before you convert, so there are no surprises.",
      action: CURRENCY_ACTION,
      // Unsplash (free licence). Portrait crop from the CDN.
      image: {
        src: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=1200&h=1600&fit=crop",
        alt: "A hand holding a fan of banknotes in several currencies against a teal wall.",
        width: 1200,
        height: 1600,
      },
      imageCredit: {
        name: "omid armin",
        url: "https://unsplash.com/photos/hand-holding-assorted-international-banknotes-8Nppe0yLmn8",
      },
    },
    {
      heading: "Stay covered while you travel",
      body: "Choose Silver, Gold or Diamond cover for the length of your trip, get care through established Nigerian providers, and extend if the trip runs long.",
      action: INSURANCE_ACTION,
      image: {
        src: "/service-insurance.jpg",
        alt: "A smiling couple talking through cover with an adviser.",
        width: 1600,
        height: 1600,
      },
    },
  ],
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const SERVICES_HEADING_ID = "services-heading";
