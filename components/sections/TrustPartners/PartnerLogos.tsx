import type { ImageAsset } from "@/types/content.types";

import { PartnerLogo } from "./PartnerLogo";

/**
 * The logo strip.
 *
 * One static row from tablet up; a horizontally drifting strip below it.
 *
 * A real `ul` with an explicit `role="list"`, so the strip announces how many
 * partners there are rather than as three loose images. The role is not
 * redundant: the global reset removes the marker and Safari drops list semantics
 * when it does — the same reason `NavigationGroup` and `FooterColumn` carry it.
 *
 * A list is also why this row is not a `Stack`: `Stack` renders a `div` and takes
 * no element prop, and the width cap below has to sit on each `li`. It keeps
 * `Stack`'s contract regardless — the gap is the parent's, so no child carries a
 * margin.
 *
 * ---------------------------------------------------------------------------
 * GEOMETRY, from the frame (node 1265:12701).
 *
 * Three 242-wide boxes at x 40 / 523 / 1006 inside a 1289 container with 40
 * padding, all vertically centred on the row's midline. Equal boxes with equal
 * space between them, flush to both edges of the content column — which is
 * `justify-between` with a 240 cap, and matches `design-system.md` § Grid system:
 * "Logo strip: single row, equal optical spacing, full content width."
 *
 * `items-center` rather than a shared baseline. § Image treatment asks for logos
 * "aligned on a shared baseline"; the frame centres them instead (all three sit
 * on a 69.09 midline, with heights of 50, 44 and 76), and the frame is the
 * primary source. Baseline alignment is not meaningful for images anyway.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] The narrow layout drifts rather than stacking.
 *
 * It was a left-aligned column: three logos costing about 250px of scroll in a
 * band that carries nothing else. It is now the single row the frame draws, kept
 * horizontal at every width and drifting left, because three 240-wide logos
 * cannot fit a 288–376px column without shrinking past legibility.
 *
 * Everything about the motion lives in the `marquee-track` and `marquee-set`
 * utilities — including the tablet threshold and the reduced-motion fallback — so
 * this component declares no timing, no keyframe and no breakpoint of its own,
 * and the deviation from the animation rules is recorded in one place rather than
 * spread through markup.
 *
 * The second set is what makes the loop seamless. It is `aria-hidden`, so a
 * screen reader hears each partner once, and nothing inside it is focusable, so
 * it cannot be reached by keyboard either. From tablet up, and under reduced
 * motion, it is not displayed at all.
 *
 * **Confirm the drift and its pace against design.**
 *
 * [NOTE] The gaps at desktop are wider than the frame's, and that is the content
 * column's doing rather than this component's. The frame spreads 242 logos across
 * a 1240 column (about 60% of it covered); `--container-content` is 1520 by an
 * earlier decision, so the same three logos cover about 50% and the spacing
 * grows. Enlarging the logos to compensate would abandon the frame's normalised
 * 242.
 */

/**
 * Clips the drift.
 *
 * Nothing overflows from tablet up, and under reduced motion the track wraps
 * rather than running past the edge — so this only ever hides motion, never
 * content.
 */
const VIEWPORT_CLASS = "overflow-hidden";

/**
 * 240 is the frame's 242 box on the 4px grid; 160 is that cap on a phone.
 *
 * Fixed rather than `w-full` below tablet: in a drifting row `w-full` resolves
 * against a `max-content` track, which has no width to take a percentage of.
 */
const ITEM_CLASS = "w-40 tablet:w-full tablet:max-w-60";

export type PartnerLogosProps = {
  partners: readonly ImageAsset[];
};

export function PartnerLogos({ partners }: PartnerLogosProps) {
  return (
    <div className={VIEWPORT_CLASS}>
      {/*
        `data-motion="loop"` is this codebase's marker for a continuously looping
        animation, read by the global reduced-motion policy in animations.css. The
        utility stops the drift itself, so this is belt and braces — but it keeps
        the convention intact, so a future change to that policy reaches here too.
      */}
      <div className="marquee-track" data-motion="loop">
        <PartnerSet partners={partners} />

        <PartnerSet partners={partners} isDuplicate />
      </div>
    </div>
  );
}

type PartnerSetProps = {
  partners: readonly ImageAsset[];
  /**
   * The copy that exists only to close the loop: translating the track by -50%
   * has to land on an identical frame. Hidden from assistive technology, and not
   * displayed at all where there is no loop to close.
   */
  isDuplicate?: boolean;
};

function PartnerSet({ partners, isDuplicate = false }: PartnerSetProps) {
  const items = partners.map((logo) => (
    <li key={logo.src} className={ITEM_CLASS}>
      <PartnerLogo logo={logo} />
    </li>
  ));

  if (isDuplicate) {
    return (
      <ul aria-hidden className="marquee-set tablet:hidden motion-reduce:hidden">
        {items}
      </ul>
    );
  }

  return (
    <ul role="list" className="marquee-set">
      {items}
    </ul>
  );
}
