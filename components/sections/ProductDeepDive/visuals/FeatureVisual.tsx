import type { ComponentType } from "react";

import {
  ArrowUpRight,
  Bed,
  Building,
  Check,
  Clock,
  Plane,
  Scan,
  Video,
} from "@/components/sections/SolutionsOverview/visuals/MockupGlyphs";
import { cx } from "@/lib/cx";

/**
 * The twelve deep-dive feature visuals, and the lookup that picks one.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS EXISTS
 *
 * `deep-dive.content.ts` carried a [BLOCKER]: "No preview artwork exists in
 * public/. The Figma draws a UI mockup on a brand plate; until it is supplied
 * the panel renders as the plate alone." It rendered as an empty maroon
 * rectangle, roughly a third of the band, next to a list of twelve features.
 *
 * These are that artwork. They are drawn rather than photographed, so nothing
 * here waits on an asset that may never arrive, and the visual language is
 * `dd-*` in `styles/product-visuals.css` — that file carries why this is a third
 * family rather than a reuse of the two the site already has.
 *
 * ---------------------------------------------------------------------------
 * KEYED BY FEATURE ID, NOT BY A SECOND CONTENT FIELD
 *
 * The map below is keyed by `DeepDiveFeature.id`, which is already unique across
 * both products. A `visual` field on the content type was the alternative and
 * would have been a second name for the same thing — one more place for a
 * feature and its artwork to fall out of step.
 *
 * A feature with no entry renders nothing and the plate shows as it does today.
 * That is the intended failure: adding a thirteenth feature should leave a plain
 * plate rather than break a build or draw the wrong picture.
 *
 * ---------------------------------------------------------------------------
 * ORNAMENTAL, ALL OF THEM
 *
 * Every figure below is decoration: the feature's heading and body sit
 * immediately to its left and carry the meaning. `PreviewPanel` marks the whole
 * plate `aria-hidden`, so none of the labels here is announced — which is why a
 * balance figure or a rate can appear in the artwork without a screen-reader
 * user being read a number they might act on.
 *
 * Every figure is also illustrative rather than live. No balance, rate or
 * country count here is a claim: the headings beside them make the claims, and
 * the pages those headings link to carry the evidence.
 */

/** A 20px glyph inside a tile. The tile owns the colour; this owns the box. */
function Glyph({ children }: { children: React.ReactNode }) {
  return <span className="pv-icon-20">{children}</span>;
}

/* ---------------------------------------------------------------------------
   PAYMENTS
   ------------------------------------------------------------------------ */

/**
 * Multi-currency wallet — three balance cards fanned behind one another.
 *
 * The fan is the argument. Three separate cards in a list would say "three
 * accounts", which is the thing the feature's body explicitly denies; overlapped
 * into one stack they read as one wallet holding three currencies.
 */
function MultiCurrencyWallet() {
  return (
    <div className="dd-stack">
      <div className="dd-surface dd-stack-item dd-stack-behind">
        <div className="dd-row">
          <span className="dd-title">CAD</span>
          <span className="dd-value">1,240.00</span>
        </div>
      </div>

      <div className="dd-surface dd-stack-item dd-stack-mid">
        <div className="dd-row">
          <span className="dd-title">GBP</span>
          <span className="dd-value">860.50</span>
        </div>
      </div>

      <div className="dd-surface dd-stack-item dd-stack-front">
        <div className="dd-row">
          <span className="dd-label">Total balance</span>
        </div>
        <div className="dd-row">
          <span className="dd-figure">$4,120.75</span>
        </div>
      </div>
    </div>
  );
}

/** Funding — three sources feeding one wallet. */
function Funding() {
  return (
    <div className="dd-flow">
      <div className="dd-flow-sources">
        {["USD", "GBP", "CAD"].map((code) => (
          <span key={code} className="dd-surface dd-pill">
            {code}
          </span>
        ))}
      </div>

      <span className="dd-flow-arrow">
        <ArrowUpRight />
      </span>

      <div className="dd-surface dd-card dd-card-narrow">
        <span className="dd-label">Omanga wallet</span>
        <span className="dd-figure">$4,120.75</span>
        <span className="dd-pill dd-pill-brand">Spendable now</span>
      </div>
    </div>
  );
}

/**
 * Exchange rates — a rate card.
 *
 * The figures are illustrative and deliberately unrounded: a rate written as a
 * whole number reads as a placeholder, and the feature's claim is that you see
 * the real one before you commit.
 */
function ExchangeRates() {
  const rates = [
    { pair: "USD → NGN", rate: "1,486.20" },
    { pair: "GBP → KES", rate: "168.94" },
    { pair: "CAD → GHS", rate: "10.71" },
  ];

  return (
    <div className="dd-surface dd-card dd-card-wide">
      <div className="dd-row">
        <span className="dd-label">Rate at conversion</span>
        <span className="dd-value">Live</span>
      </div>

      {rates.map((row, index) => (
        <div
          key={row.pair}
          className={cx("dd-row", index > 0 && "dd-row-divided")}
        >
          <span className="dd-title">{row.pair}</span>
          <span className="dd-value">{row.rate}</span>
        </div>
      ))}
    </div>
  );
}

/** The Wallet — balance over the two things you do with it. */
function TheWallet() {
  return (
    <div className="dd-surface dd-card dd-card-wide">
      <span className="dd-label">Omanga wallet</span>
      <span className="dd-figure">$4,120.75</span>

      <div className="dd-row dd-row-divided">
        <span className="dd-pill dd-pill-brand">Send</span>
        <span className="dd-pill dd-surface">Request</span>
      </div>
    </div>
  );
}

/**
 * Coverage — country chips.
 *
 * Eight of the eleven flags in `public/flags`, for the reason
 * `CoverageChipsVisual` records at length: the coverage list is not written down
 * anywhere in this project, so these are examples and the heading beside them
 * makes the count. Eight rather than eleven because the plate is 3:2 and a third
 * row would push the block off the vertical centre.
 */
function Coverage() {
  const countries = [
    { name: "Nigeria", flag: "/flags/nigeria.svg" },
    { name: "Kenya", flag: "/flags/kenya.svg" },
    { name: "Ghana", flag: "/flags/ghana.svg" },
    { name: "South Africa", flag: "/flags/south-africa.svg" },
    { name: "Rwanda", flag: "/flags/rwanda.svg" },
    { name: "Cameroon", flag: "/flags/cameroon.svg" },
    { name: "Benin", flag: "/flags/benin.svg" },
    { name: "Sierra Leone", flag: "/flags/sierra-leone.svg" },
  ];

  return (
    <div className="dd-chips">
      {countries.map((country) => (
        <span key={country.name} className="dd-surface dd-chip">
          {/*
            Plain `img`, for the reason the payments-page chips already record:
            an 18-authored-pixel flag inside decorative, hidden artwork gets
            nothing from the image pipeline.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={country.flag} alt="" className="dd-chip-flag" />
          {country.name}
        </span>
      ))}
    </div>
  );
}

/** Control — the three things the account holds, in one card. */
function Control() {
  const rows = [
    { label: "Balances", value: "3 currencies" },
    { label: "Transactions", value: "This month" },
    { label: "Insurance plan", value: "Gold" },
  ];

  return (
    <div className="dd-surface dd-card dd-card-wide">
      <span className="dd-label">One account</span>

      {rows.map((row, index) => (
        <div
          key={row.label}
          className={cx("dd-row", index > 0 && "dd-row-divided")}
        >
          <span className="dd-title">{row.label}</span>
          <span className="dd-value">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   INSURANCE
   ------------------------------------------------------------------------ */

/**
 * Plan tiers — three cards with the middle one raised.
 *
 * Raised, not highlighted. The feature's body says to match protection to the
 * trip rather than buy more than you need, so marking one tier as the
 * recommended purchase would contradict the copy beside it. The lift reads as
 * "there is a range" rather than as "pick this one", and no price appears —
 * prices live on the plans page and would be a claim here.
 */
function PlanTiers() {
  const tiers = [
    { name: "Silver", raised: false },
    { name: "Gold", raised: true },
    { name: "Diamond", raised: false },
  ];

  return (
    <div className="dd-tiers">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={cx("dd-surface dd-tier", tier.raised && "dd-tier-raised")}
        >
          <span className="dd-tile">
            <Glyph>
              <Check />
            </Glyph>
          </span>
          <span className="dd-title">{tier.name}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Providers — a short list of what a provider network gives you.
 *
 * No provider is named and no logo appears. Phillips HMO is the confirmed
 * insurance provider, but the hospitals behind it are not documented anywhere in
 * this project, and drawing a named hospital into marketing artwork asserts a
 * relationship nobody has verified.
 */
function Providers() {
  const rows = [
    { label: "Hospital network", value: "Category A–C", Icon: Building },
    { label: "Local presence", value: "On the ground", Icon: Check },
    { label: "Direct settlement", value: "No upfront", Icon: Check },
  ];

  return (
    <div className="dd-surface dd-card dd-card-wide">
      <span className="dd-label">Delivered through established providers</span>

      {rows.map((row, index) => (
        <div
          key={row.label}
          className={cx("dd-row", index > 0 && "dd-row-divided")}
        >
          <span className="dd-tile">
            <Glyph>
              <row.Icon />
            </Glyph>
          </span>
          <span className="dd-title">{row.label}</span>
          <span className="dd-value">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Trip-length cover — a trip as a track, with cover filling exactly it.
 *
 * The fill stops where the trip does. That is the whole feature: an annual
 * policy would be a track that keeps running after the return marker, and the
 * body copy names that as the thing this is not.
 */
function TripLengthCover() {
  return (
    <div className="dd-surface dd-card dd-card-wide">
      <div className="dd-row">
        <span className="dd-label">Depart</span>
        <span className="dd-value">Return</span>
      </div>

      <div className="dd-track">
        <span className="dd-track-fill" style={{ inlineSize: "100%" }} />
      </div>

      <div className="dd-row dd-row-divided">
        <span className="dd-title">Covered for the trip</span>
        <span className="dd-value">30 days</span>
      </div>
    </div>
  );
}

/**
 * Renew and extend — the same track, carrying on.
 *
 * Deliberately the same object as `TripLengthCover` with one segment added. Two
 * unrelated pictures would make renewal look like a separate product; the same
 * track extending is what "extend without starting again" looks like.
 *
 * The 30 and the 14 are illustrative. `policy-terms.content.ts` confirms 30 days
 * as the cover period; the extension length is not documented anywhere, so it is
 * shown as a shape rather than stated as a term.
 */
function RenewAndExtend() {
  return (
    <div className="dd-surface dd-card dd-card-wide">
      <div className="dd-row">
        <span className="dd-label">Original trip</span>
        <span className="dd-value">Extended</span>
      </div>

      <div className="dd-track">
        <span className="dd-track-fill" style={{ inlineSize: "62%" }} />
        <span
          className="dd-track-extend"
          style={{ insetInlineStart: "62%", insetInlineEnd: "0" }}
        />
      </div>

      <div className="dd-row dd-row-divided">
        <span className="dd-title">Extended from your account</span>
        <span className="dd-pill dd-pill-brand">+ days</span>
      </div>
    </div>
  );
}

/**
 * Care access — what you can reach while travelling.
 *
 * The four rows are the cover items already published on the plans page and
 * repeated by the homepage insurance visual. Nothing new is claimed here, and no
 * limit or figure appears — those differ per plan, so stating one on a card that
 * describes all three would be a claim rather than a summary.
 */
function CareAccess() {
  const rows = [
    { label: "Hospital admission", Icon: Bed },
    { label: "Diagnostic scans", Icon: Scan },
    { label: "Emergency evacuation", Icon: Plane },
    { label: "Telemedicine", Icon: Video },
  ];

  return (
    <div className="dd-surface dd-card dd-card-wide">
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={cx("dd-row", index > 0 && "dd-row-divided")}
        >
          <span className="dd-tile">
            <Glyph>
              <row.Icon />
            </Glyph>
          </span>
          <span className="dd-title">{row.label}</span>
        </div>
      ))}
    </div>
  );
}

/** One account — the wallet and the plan inside a single card. */
function OneAccount() {
  return (
    <div className="dd-surface dd-card dd-card-wide">
      <span className="dd-label">Omanga account</span>

      <div className="dd-row">
        <span className="dd-tile">
          <Glyph>
            <Building />
          </Glyph>
        </span>
        <span className="dd-title">Wallet</span>
        <span className="dd-value">$4,120.75</span>
      </div>

      <div className="dd-row dd-row-divided">
        <span className="dd-tile">
          <Glyph>
            <Clock />
          </Glyph>
        </span>
        <span className="dd-title">Insurance plan</span>
        <span className="dd-value">Active</span>
      </div>

      <span className="dd-pill dd-pill-brand">One signup, one login</span>
    </div>
  );
}

/**
 * Feature id to artwork.
 *
 * A plain record rather than a switch, so the set of features that have artwork
 * is greppable in one place and an unillustrated feature is a missing key rather
 * than a missing branch.
 */
const VISUALS: Readonly<Record<string, ComponentType>> = {
  "multi-currency-wallet": MultiCurrencyWallet,
  funding: Funding,
  "exchange-rates": ExchangeRates,
  "the-wallet": TheWallet,
  coverage: Coverage,
  control: Control,
  "plan-tiers": PlanTiers,
  providers: Providers,
  "trip-length-cover": TripLengthCover,
  "renew-and-extend": RenewAndExtend,
  "care-access": CareAccess,
  "one-account": OneAccount,
};

export type FeatureVisualProps = {
  /** `DeepDiveFeature.id`. An unknown id renders nothing. */
  featureId: string;
};

export function FeatureVisual({ featureId }: FeatureVisualProps) {
  const Visual = VISUALS[featureId];

  if (Visual === undefined) {
    return null;
  }

  return (
    <div className="dd-stage">
      <Visual />
    </div>
  );
}
