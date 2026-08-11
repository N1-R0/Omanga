"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { MOTION } from "@/lib/motion";
import type { ImageAsset } from "@/types/content.types";

/**
 * A service photograph, with scroll-linked parallax.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATES FROM design.md § 11 principle 2] "Entrances are one-shot on
 * intersection, never scroll-linked."
 *
 * Scroll-linked, added on request. It ships under the conditions the page's other
 * scroll-linked case — `GetStartedImageBand` — already established, and the
 * technique is that component's rather than a second one:
 *
 *   - `y` only. No layout property, nothing that triggers reflow.
 *   - The image layer is `--spacing-parallax-overscan` taller than its box at each
 *     edge and travels exactly that far in each direction, so no edge can be
 *     exposed at either end of the scroll.
 *   - Reduced motion renders a structurally different, static branch: `inset-0`
 *     rather than an overscanned layer held still. Keeping the overscan there
 *     would crop 128px of the photograph for travel that never happens, so the
 *     static state shows *more* of the image rather than the same crop frozen.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Calls `next/image` directly rather than going through `Media`.
 *
 * `Media` owns its own ratio box, and the whole point here is a layer taller than
 * the box it sits in — a square `Media` inside a box overscanned by 128px would
 * leave 128px of reserved surface showing. `fill` is the only sizing that can
 * describe a box whose height is set by its parent plus the overscan, which is the
 * same reasoning and the same resolution `BandImage` records.
 *
 * The ratio, radius and crop stay fixed rather than becoming props, so the three
 * services cannot drift apart.
 */

/**
 * The scroll window: from the box's top edge entering the bottom of the viewport
 * to its bottom edge leaving the top. Mapping travel across the whole visible
 * period is what stops the movement being mid-flight when the section settles.
 */
const SCROLL_OFFSET = ["start end", "end start"] as const;

export type ServiceImageProps = {
  image: ImageAsset;
  /** Owned by the section, whose grid determines it. */
  sizes: string;
};

export function ServiceImage({ image, sizes }: ServiceImageProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: boxRef,
    offset: [...SCROLL_OFFSET],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-MOTION.parallaxOverscan, MOTION.parallaxOverscan],
  );

  return (
    <div
      ref={boxRef}
      /*
        `bg-surface-light` is the reserved surface underneath, so a failed or
        not-yet-painted photograph leaves a neutral square at full size rather
        than a collapsed box. The ratio is locked before load — no CLS.
      */
      className="relative aspect-square w-full overflow-hidden rounded-md bg-surface-light"
    >
      {isReducedMotion === true ? (
        <div className="absolute inset-0">
          <ServicePhoto image={image} sizes={sizes} />
        </div>
      ) : (
        <motion.div
          /*
            Taller than its box by one overscan at each edge, which is exactly the
            distance `y` moves. `inset-x-0` pins the width so only the vertical
            axis is overscanned.
          */
          className="absolute inset-x-0 -inset-y-parallax-overscan"
          style={{ y }}
        >
          <ServicePhoto image={image} sizes={sizes} />
        </motion.div>
      )}
    </div>
  );
}

/**
 * Not exported. It exists only inside this component and has no second caller, but
 * both branches above render it and a duplicated `Image` is a place for the two to
 * drift apart.
 */
function ServicePhoto({ image, sizes }: ServiceImageProps) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      /*
        `fill`, not width/height: the rendered box is the square plus the overscan,
        which the intrinsic dimensions cannot describe. The parent is absolutely
        positioned and fully sized, so nothing shifts on load.
      */
      fill
      sizes={sizes}
      /* Lazy. Only the hero image is eager, and this section is below the fold. */
      loading="lazy"
      className="object-cover"
    />
  );
}
