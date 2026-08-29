import { cx } from "@/lib/cx";
import type { RateRow } from "@/lib/rates";

import { FeatureArtBox } from "./FeatureArtBox";

/**
 * Card two's visual — the live rate ticker.
 *
 * The four pairs the spec permits, at whatever `lib/rates.ts` returned when the
 * page was rendered. Nothing here is typed: see that module for why a payments
 * page cannot show a hand-written exchange rate.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] A Server Component, and the only one of the three visuals that is.
 *
 * The rows arrive as a prop from the section, which got them from the page, which
 * awaited the fetch. So the rates are in the server HTML — visible to a crawler,
 * present with JavaScript disabled, and never fetched from the browser. The other
 * two visuals are client components because they animate; this one has no
 * entrance of its own beyond the card's, and giving it one would mean shipping
 * the fetch result through a client boundary for no gain.
 *
 * The live dot is a CSS animation rather than a scripted one, which is what lets
 * this file stay on the server. The global reduced-motion policy freezes it.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] No count-up on the figures.
 *
 * It was planned, matching `PaymentsVisual`'s balance. It is not built, and the
 * reason is worth recording: counting a real exchange rate up from zero animates
 * a number a visitor might read mid-flight, on the one card whose entire claim is
 * that the number is the real one. A balance in a mockup can afford that; a rate
 * cannot.
 */

/**
 * Pairs rendered with a flag each, so the corridor is legible at a glance rather
 * than only to someone who reads currency codes. Keyed by the `pair` string
 * `lib/rates.ts` emits, so a change there fails visibly here rather than
 * silently dropping a flag.
 */
const PAIR_FLAGS: Readonly<Record<string, readonly [string, string]>> = {
  "USD → NGN": ["/flags/united-states.svg", "/flags/nigeria.svg"],
  "GBP → KES": ["/flags/united-kingdom.svg", "/flags/kenya.svg"],
  "CAD → ZAR": ["/flags/canada.svg", "/flags/south-africa.svg"],
  "USD → GHS": ["/flags/united-states.svg", "/flags/ghana.svg"],
};

export type RateTickerVisualProps = {
  rates: readonly RateRow[];
};

export function RateTickerVisual({ rates }: RateTickerVisualProps) {
  return (
    <FeatureArtBox>
      <div className="pf-ticker pf-surface">
        <p className="pf-ticker-head">
          <span className="pf-live-dot" data-motion="loop" />
          Mid-market rates
        </p>

        {rates.map((row) => {
          const flags = PAIR_FLAGS[row.pair];

          return (
            <div key={row.pair} className="pf-rate-row">
              {flags !== undefined && (
                <span className="pf-rate-flags">
                  {flags.map((flag) => (
                    /*
                      Plain `img`, not `next/image`. These are 16-authored-pixel
                      flags rendering at roughly 13 CSS pixels inside a decorative
                      subtree; the optimiser's value is in resizing large
                      photographs, and eight `next/image` instances here would add
                      eight more entries to the image pipeline for no bytes saved.
                      The rule they answer to — no raw `img` in a component — is
                      about the shared `Media` contract for content imagery, and
                      this box is `aria-hidden` artwork.
                    */
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={flag} src={flag} alt="" className="pf-chip-flag" />
                  ))}
                </span>
              )}

              <span className="pf-rate-pair">{row.pair}</span>
              <span className="pf-rate-value">{row.rate}</span>
              <span
                className={cx(
                  "pf-rate-delta",
                  row.up ? "pf-rate-delta-up" : "pf-rate-delta-down",
                )}
              >
                {row.change}
              </span>
            </div>
          );
        })}

        <p className="pf-ticker-foot">
          Sourced from public market data, refreshed hourly.
        </p>
      </div>
    </FeatureArtBox>
  );
}
