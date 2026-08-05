import Image from "next/image";

import { cx } from "@/lib/cx";
import type { ImageAsset } from "@/types/content.types";

/**
 * The art at the top of a solution card.
 *
 * The two cards carry genuinely different kinds of image, and the difference is
 * behavioural rather than cosmetic — which is why it is a closed union here and
 * not two components:
 *
 *   illustration  flat vector, fitted whole inside the box and centred
 *   device        a phone mockup, anchored to the top and clipped by the box
 *
 * `design-system.md` § Image treatment specifies both cases separately ("Product
 * card art | Contained within card padding, no bleed to the card edge" and
 * "Device mockup | 393 × 450 visible, 50 radius, Shadow XL"), so the union has
 * exactly as many members as the design has treatments.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Calls `next/image` directly rather than going through `Media`.
 *
 * `Media` paints `bg-surface-light` on its box unconditionally. On the brand
 * product card that would put a light plate behind the artwork, which is the one
 * thing the design does not draw. It also centres its image and offers no
 * top-anchored, deliberately-clipped mode, so the device case cannot be
 * expressed through it at all.
 *
 * This follows the precedent `HeroImage`, `Logo` and `Avatar` already set: four
 * genuinely different image cases, four components, rather than one component
 * with props that half its callers ignore. The rule that matters —
 * "components never use a raw image element" — still holds, because this is the
 * shared component for the card-art case.
 *
 * ---------------------------------------------------------------------------
 * The box is square and locked before load, so nothing reflows. Figma draws it
 * at 491 × 478 on the insurance card and 491 × 482 on the payments card — two
 * readings of the same box, three per cent apart, on a card whose siblings must
 * be equal height. One square ratio is the systematic answer to that, and it is
 * why there is no ratio prop: a caller that could choose could make the two
 * cards' art disagree.
 */

/**
 * Presentation × behaviour.
 *
 * Every number below resolves through Tailwind's dynamic spacing scale from the
 * 4px `--spacing` base, so there are no arbitrary values here and no radius,
 * colour or shadow at all — the artwork carries its own.
 *
 * The insets are the Figma frame's, re-derived for the narrower card the layout
 * reference produces. The frame draws a 491-wide card because it stacks the
 * cards under a full-width heading; the reference puts them in eight of twelve
 * columns beside a heading column, which lands the card content at roughly 406.
 * Absolute offsets carried over from the frame would have swallowed a third of
 * the box, so each one is scaled and then snapped back onto the 4px grid:
 *
 *   illustration   62.5 of 491  (12.7%)  ->  48   `p-12`
 *   device x       49   of 491  (10.0%)  ->  40   `px-10`
 *   device y       102  of 491  (20.8%)  ->  80   `pt-20`
 *
 * `illustration`: Figma centres a 366-wide artwork with equal space either side.
 * `object-contain` inside the padded box reproduces that at any card width.
 *
 * `device`: Figma places a 393-wide mockup below the box's top edge and lets the
 * box crop whatever falls past its bottom. `overflow-hidden` on the box is the
 * crop. The mockup is *meant* to run off the bottom, so no height is set on the
 * image and `h-auto` keeps its own proportions.
 *
 * `isUnoptimized` tracks the asset format rather than the presentation, and the
 * two happen to coincide because the design says they should:
 * `coding-guidelines.md` requires "SVG for logos, icons, and flat illustration"
 * and a device mockup is a raster export. There is nothing for the optimizer to
 * do to an SVG, and stating that is cheaper than depending on the framework's
 * pass-through behaviour staying the same across versions — the same reasoning
 * `Logo` already applies to the brand mark.
 */
const PRESENTATION = {
  illustration: {
    box: "p-8 tablet:p-12",
    image: "size-full object-contain",
    isUnoptimized: true,
  },
  device: {
    box: "px-6 pt-12 tablet:px-10 tablet:pt-20",
    image: "h-auto w-full",
    isUnoptimized: false,
  },
} as const;

type Presentation = keyof typeof PRESENTATION;

export type SolutionIllustrationProps = {
  /** Source, alt and intrinsic dimensions travel together as one value. */
  image: ImageAsset;
  presentation: Presentation;
  /**
   * The `sizes` attribute. Required, never omitted — an inaccurate or missing
   * value is the most common cause of a phone downloading a desktop-sized
   * asset, which is the single biggest risk to this page's LCP budget.
   */
  sizes: string;
};

export function SolutionIllustration({
  image,
  presentation,
  sizes,
}: SolutionIllustrationProps) {
  const { box, image: imageClass, isUnoptimized } = PRESENTATION[presentation];

  return (
    <div className={cx("aspect-square w-full overflow-hidden", box)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        unoptimized={isUnoptimized}
        /*
          Lazy, not eager. "Only the hero image is eager. Everything else is
          lazy." This section sits below the fold on every breakpoint.
        */
        loading="lazy"
        className={imageClass}
      />
    </div>
  );
}
