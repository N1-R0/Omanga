import Image from "next/image";

import type { ImageAsset } from "@/types/content.types";

/**
 * One flag, in its chip.
 *
 * ---------------------------------------------------------------------------
 * GEOMETRY, from the supplied frame spec: a 96 × 96 box holding a 70 × 70 flag.
 *
 *   96  -> `size-24`   on the 4px scale
 *   70  -> `size-18`   normalised to 72; 70 is not a multiple of 4
 *
 * Both resolve through Tailwind's dynamic spacing scale from the 4px
 * `--spacing` base, so there is no arbitrary value here.
 *
 * ---------------------------------------------------------------------------
 * [NORMALISED] Three of the spec's four appearance values are not tokens, and
 * `design-system.md` says a raw value in a component is a bug "including one that
 * matches Figma". Each is mapped onto the nearest role:
 *
 *   radius 24              -> `rounded-panel` (16). The radius tokens are
 *                             8 / 12 / 16 / 50 / pill; 24 is not among them.
 *   two shadows, 0 4 3 and
 *   0 10 7.5 at 10%        -> `shadow-elevated`, the single `0 12 24` elevation.
 *                             "One elevation only."
 *   border #E6E6E6         -> `border-border-hairline`. #E6E6E6 is named in
 *                             design-system.md as a one-off duplicate to
 *                             collapse.
 *
 * The chips therefore read slightly less rounded and slightly softer than the
 * frame draws. **Confirmed with design as the token-compliant reading.**
 *
 * [NORMALISED] The spec fills the box with white at zero opacity — fully
 * transparent, which only reads as white because the section behind it is white.
 * `bg-surface-page` states the intent, so the chip does not depend on its
 * surface to look right.
 *
 * ---------------------------------------------------------------------------
 * `unoptimized`, following `SolutionIllustration` and `Logo`: there is nothing
 * for the optimizer to do to an SVG, and saying so is cheaper than depending on
 * the framework's pass-through behaviour staying the same across versions.
 *
 * The corner rounding on the flag artwork is the asset's own — each file draws a
 * rounded rectangle in its 32 × 32 viewBox — so no radius is applied here. The
 * chip never sets its own margin or position; the column owns both.
 */

/**
 * The rendered width at every breakpoint.
 *
 * A single value is accurate because the chip is a fixed 96 box at every
 * breakpoint and the flag a fixed 72 inside it. Declared rather than omitted —
 * a missing `sizes` is the usual cause of a phone fetching a desktop-sized
 * asset.
 */
const RENDERED_SIZE = "72px";

export type FlagItemProps = {
  /** Source, alt and intrinsic dimensions travel together as one value. */
  flag: ImageAsset;
};

export function FlagItem({ flag }: FlagItemProps) {
  return (
    <div className="flex size-24 shrink-0 items-center justify-center rounded-panel border border-border-hairline bg-surface-page shadow-elevated">
      <Image
        src={flag.src}
        alt={flag.alt}
        width={flag.width}
        height={flag.height}
        sizes={RENDERED_SIZE}
        unoptimized
        loading="lazy"
        className="size-18"
      />
    </div>
  );
}
