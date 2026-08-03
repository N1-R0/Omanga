import type { Eyebrow, ImageAsset, LinkTarget } from "@/types/content.types";

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

// [BLOCKER] No such route exists. The path is inferred from the approved label.
const CURRENCY_ACTION: LinkTarget = {
  label: "Go to currency and rates",
  href: "/payments/rates",
  isRoutePending: true,
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
  readonly intro: string;
  readonly services: readonly [
    ServiceContentItem,
    ServiceContentItem,
    ServiceContentItem,
  ];
  readonly closing: string;
};

export const servicesContent: ServicesContent = {
  eyebrow: "What you can do with Omanga",
  heading: "Spend, send and stay covered across Africa",
  intro:
    "From funding your wallet before you fly to reaching a clinic mid-trip, here's what your Omanga account actually does.",
  services: [
    {
      heading: "Spend across the continent",
      // [CORRECTED] "Pay with your Omanga card" -> "Pay with Omanga". NJ's tracked changes
      // strike card language in eight other places and project-context.md forbids it
      // outright; Omanga issues no card. Confirm the edited sentence with copy.
      body: "Pay with Omanga wherever cards are accepted, in 43 African countries, drawing straight from your wallet balance. One arrangement for the whole itinerary, however many borders it crosses.",
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
  closing:
    "Every one of these lives in a single account. Setting it up takes three steps.",
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const SERVICES_HEADING_ID = "services-heading";
