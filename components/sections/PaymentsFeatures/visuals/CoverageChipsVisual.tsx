import { cx } from "@/lib/cx";

import { FeatureArtBox } from "./FeatureArtBox";

/**
 * Card three's visual — two rows of country chips, drifting in opposite
 * directions. Nothing else.
 *
 * Two rows rather than one, and running against each other, because that is what
 * separates "a field of countries" from "a ticker". One row scrolling in one
 * direction reads as a list being presented; two reading past each other read as
 * more countries than the frame can hold, which is the claim.
 *
 * A Server Component. The drift is a CSS animation, so nothing here hydrates and
 * the country names are in the server HTML — though they are inside an
 * `aria-hidden` box, so they are artwork rather than content either way.
 *
 * ---------------------------------------------------------------------------
 * [CONSTRAINT] Only countries whose flag exists in `public/flags/`.
 *
 * Eleven African flags are in the repository, so eleven countries appear. That is
 * a fraction of the count the heading claims, and the gap is honest rather than
 * awkward: the chips are examples, the heading makes the claim, and the metric
 * row beneath the section is where it is evidenced. No chip asserts a corridor
 * that is not already named somewhere on the site.
 *
 * The alternative — typing forty more country names to fill the rows — would be
 * inventing the coverage list, which is the same blocker `coverage.content.ts`
 * records for why a coverage page cannot be built: "that list is not written down
 * anywhere in this project."
 *
 * Supply the list and both this visual and that page become possible.
 */

/**
 * Split into two groups, largest markets first in each so the strongest names
 * are the ones on screen when the visual is first seen.
 */
const ROW_ONE = [
  { name: "Nigeria", flag: "/flags/nigeria.svg" },
  { name: "Kenya", flag: "/flags/kenya.svg" },
  { name: "Ghana", flag: "/flags/ghana.svg" },
  { name: "South Africa", flag: "/flags/south-africa.svg" },
  { name: "Rwanda", flag: "/flags/rwanda.svg" },
  { name: "Cameroon", flag: "/flags/cameroon.svg" },
] as const;

const ROW_TWO = [
  { name: "Benin", flag: "/flags/benin.svg" },
  { name: "Niger", flag: "/flags/niger.svg" },
  { name: "Sierra Leone", flag: "/flags/sierra-leone.svg" },
  { name: "South Sudan", flag: "/flags/south-sudan.svg" },
  { name: "Congo", flag: "/flags/republic-of-congo.svg" },
] as const;

type Country = { readonly name: string; readonly flag: string };

/**
 * One chip set. Rendered twice per row — the second copy is what makes the loop
 * seamless, since the track translates by exactly -50%.
 *
 * The duplicate needs no `aria-hidden` of its own: the whole box is hidden by
 * `FeatureArtBox`, so nothing inside it is announced once, let alone twice.
 */
function ChipSet({ countries }: { countries: readonly Country[] }) {
  return (
    <div className="pf-chip-set">
      {countries.map((country) => (
        <span key={country.name} className="pf-chip pf-surface">
          {/*
            Plain `img` for the same reason recorded in `RateTickerVisual`: a
            16-authored-pixel flag inside decorative, hidden artwork.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={country.flag} alt="" className="pf-chip-flag" />
          {country.name}
        </span>
      ))}
    </div>
  );
}

function ChipRow({
  countries,
  isReversed = false,
}: {
  countries: readonly Country[];
  isReversed?: boolean;
}) {
  return (
    <div className="pf-chip-row">
      <div
        className={cx("pf-chip-track", isReversed && "pf-chip-track-reverse")}
        data-motion="loop"
      >
        <ChipSet countries={countries} />
        <ChipSet countries={countries} />
      </div>
    </div>
  );
}

/**
 * [CHANGED, 2026-08-29] No props. The count and its caption are gone — see the
 * `pf-chip-rows` note in `styles/product-visuals.css` for why.
 *
 * The component took `count` and `caption` so the figure and the metric row could
 * not disagree. With nothing to state, the coupling is gone too: the artwork is
 * countries, and the count is the heading's job and the metric row's evidence.
 */
export function CoverageChipsVisual() {
  return (
    <FeatureArtBox>
      <div className="pf-chip-rows">
        <ChipRow countries={ROW_ONE} />
        <ChipRow countries={ROW_TWO} isReversed />
      </div>
    </FeatureArtBox>
  );
}
