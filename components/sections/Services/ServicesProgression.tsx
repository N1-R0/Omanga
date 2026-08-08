"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cx } from "@/lib/cx";
import { MOTION } from "@/lib/motion";

/**
 * When the pinned progression is actually on.
 *
 * 64rem mirrors `--breakpoint-desktop`; a media query cannot read a custom
 * property, so the value is repeated rather than referenced.
 *
 * MIRRORS the `pinned` variant in `utilities.css`, which carries the reasoning
 * for the height term. The two must stay identical: this query decides which
 * copy block is visible, and that variant decides whether they are stacked on
 * top of one another. If they disagree, the enhancement hides two of three
 * blocks in a layout that has laid them out in a column — two thirds of the
 * section silently blank.
 */
const PINNED_QUERY = "(min-width: 64rem) and (min-height: 42rem)";

/**
 * Vertical gutter for the pinned column and the image cells.
 *
 * [FIXED] Was a flat `py-24` — 96px top and bottom, 192px of a viewport that
 * browser zoom can reduce to 648px. Nearly a third of the available height went
 * to padding at exactly the sizes with none to spare.
 *
 * `vh` in the middle term so the gutter tracks the space it is dividing, with a
 * 2rem floor that keeps the column off the section edge and a 6rem cap that
 * preserves today's spacing on a full-height desktop viewport.
 *
 * Not a token: two usages, one component. utilities.css — "if a style is used by
 * one component, it belongs in that component".
 */
const PINNED_GUTTER_CLASS = "desktop:py-[clamp(2rem,6vh,6rem)]";

// The middle 20% of the viewport. Must have real height: a rect inset 50% top and bottom
// is zero pixels tall, and a zero-area root reports intersections unreliably.
const SWITCH_BAND_ROOT_MARGIN = "-40% 0px -40% 0px";

const GRID_CLASS =
  "grid grid-cols-1 gap-fluid-6 desktop:grid-cols-12 desktop:gap-x-fluid-7 desktop:gap-y-0";

/**
 * The left column: heading at the top, the changing copy at the bottom.
 *
 * [DEVIATES FROM component-rules.md § Layout] Sticky outside the header.
 *
 * [FIXED] `h-screen` → `min-h-screen`, and the pin is gated on `pinned` rather
 * than on width alone.
 *
 * An exact `100vh` is a promise that the content fits, and nothing here was
 * keeping it. Once the viewport fell below what the heading and the copy need
 * together — which browser zoom does routinely — the box could not grow, so the
 * two overlapped. A minimum lets it grow instead: the visual result is identical
 * wherever the content already fits, and it stops being a collision wherever it
 * does not.
 *
 * `gap` is the second half of that guarantee. `justify-between` distributes slack
 * and does nothing at all once there is none, so on its own it permits zero
 * separation; the gap is a floor it cannot distribute away.
 */
const PINNED_COLUMN_CLASS = `contents desktop:col-start-1 desktop:col-span-5 desktop:self-start desktop:flex desktop:flex-col desktop:justify-between desktop:gap-fluid-6 ${PINNED_GUTTER_CLASS} pinned:sticky pinned:top-0 pinned:min-h-screen`;

/**
 * [FIXED] The copy blocks stack in one grid cell instead of being absolutely
 * positioned.
 *
 * This is the actual defect. Three `position: absolute` blocks anchored to
 * `bottom: 0` left this wrapper zero pixels tall, so the flex column above
 * measured its content as "the heading, and nothing else" and placed the heading
 * accordingly. The copy then painted upward from the bottom edge into whatever
 * the heading already occupied. No amount of spacing could have fixed that: out
 * of flow means the layout is not permitted to know the copy exists.
 *
 * `grid` with every child in row 1, column 1 gives the same result the absolute
 * positioning was chosen for — the three occupy the same space, so the column
 * does not jump as the active service changes — while the wrapper takes the
 * height of the tallest of them and the flex column can finally account for it.
 *
 * The rendered position at a full-height viewport is unchanged: the wrapper's
 * bottom edge sits where the old zero-height box sat, so the copy's baseline
 * lands exactly where it did.
 */
const TEXT_STACK_CLASS = "contents desktop:block pinned:grid";

const TEXT_CLASS = "pb-fluid-4 pinned:[grid-area:1/1] pinned:pb-0";

const IMAGE_COLUMN_CLASS =
  "contents desktop:col-start-7 desktop:col-span-6 desktop:flex desktop:flex-col desktop:gap-0";

// One photograph per viewport, which is also what gives the pinned column its travel.
const IMAGE_CELL_CLASS = `desktop:flex desktop:flex-col desktop:justify-center desktop:min-h-screen ${PINNED_GUTTER_CLASS}`;
/**
 * Narrow-viewport row placement.
 *
 * Below `desktop` the two columns collapse with `display: contents`, so the
 * heading, the three copy blocks and the three photographs all become items of
 * one single-column grid. Explicit rows then interleave them — each photograph
 * above the copy that explains it — which is the arrangement the mobile
 * reference uses. Without it the narrow layout reads as three descriptions
 * followed by three unexplained images.
 *
 * Rows rather than `order`: the DOM keeps every copy block in document order, so
 * the calls to action are still reached top to bottom and the reading sequence
 * stays coherent.
 *
 * One entry per service. A service past the end of these tables falls back to
 * automatic placement, which degrades to copy-then-images rather than breaking.
 *
 * [FIXED] Scoped to `max-desktop`, where they were previously unscoped and
 * cancelled at desktop by a `row-auto` on each consumer. That worked only while
 * nothing else placed those elements on the grid — the moment the copy blocks
 * needed `grid-area` for stacking, correctness depended on which of two
 * competing declarations Tailwind happened to emit last, which is not something
 * to rely on. Confining them to the viewport they were written for removes the
 * conflict rather than resolving it, and matches what this note already said
 * they were: narrow-viewport row placement.
 */
const MOBILE_IMAGE_ROW = [
  "max-desktop:row-start-2",
  "max-desktop:row-start-4",
  "max-desktop:row-start-6",
] as const;

const MOBILE_COPY_ROW = [
  "max-desktop:row-start-3",
  "max-desktop:row-start-5",
  "max-desktop:row-start-7",
] as const;


export type ProgressionService = {
  readonly key: string;
  readonly text: ReactNode;
  readonly image: ReactNode;
};

export type ServicesProgressionProps = {
  heading: ReactNode;
  /** Server-rendered children, so every string stays in the server HTML. */
  services: readonly ProgressionService[];
};

export function ServicesProgression({
  heading,
  services,
}: ServicesProgressionProps) {
  const isPinned = useMediaQuery(PINNED_QUERY);
  const isReducedMotion = useReducedMotion();
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  // An observer reports only what changed, so the full picture has to be kept somewhere.
  const overlapRef = useRef<boolean[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const serviceCount = services.length;

  useEffect(() => {
    if (!isPinned || typeof IntersectionObserver === "undefined") {
      return;
    }

    const images = imageRefs.current;
    const overlaps = overlapRef.current;

    overlaps.length = serviceCount;
    overlaps.fill(false);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = images.findIndex((image) => image === entry.target);

          if (index !== -1) {
            overlaps[index] = entry.isIntersecting;
          }
        }

        // Lowest photograph in the band wins: two overlap at a boundary and entry order
        // is not guaranteed, so this is the deterministic choice.
        const next = overlaps.lastIndexOf(true);

        if (next !== -1) {
          setActiveIndex(next);
        }
      },
      { rootMargin: SWITCH_BAND_ROOT_MARGIN },
    );

    for (const image of images) {
      if (image !== null) {
        observer.observe(image);
      }
    }

    return () => {
      observer.disconnect();
      overlaps.fill(false);
    };
  }, [isPinned, serviceCount]);

  return (
    <div className={GRID_CLASS}>
      <div className={PINNED_COLUMN_CLASS}>
        {/* `desktop:contents` dissolves this wrapper at desktop, so the heading
            block stays a direct child of the sticky column. Below it, the wrapper
            is the grid item that owns the first row. */}
        <div className="row-start-1 desktop:contents">{heading}</div>

        <div className={TEXT_STACK_CLASS}>
          {services.map((service, index) => {
            /*
              Everything is visible until the enhancement is active, so the
              server and no-JavaScript renders show all three — and so does the
              unpinned two-column layout, where the blocks are in normal flow and
              hiding two of them would blank most of the column.
            */
            const isVisible = !isPinned || index === activeIndex;

            return (
              <motion.div
                key={service.key}
                // Focus promotes the block, so a keyboard user never lands on an
                // invisible link.
                onFocus={() => setActiveIndex(index)}
                initial={false}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={
                  isReducedMotion === true
                    ? { duration: 0 }
                    : {
                        duration: MOTION.durationEmphasis,
                        ease: MOTION.easeStandard,
                      }
                }
                className={cx(
                  TEXT_CLASS,
                  MOBILE_COPY_ROW[index],
                  !isVisible && "pointer-events-none",
                )}
              >
                {service.text}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className={IMAGE_COLUMN_CLASS}>
        {services.map((service, index) => (
          <div
            key={service.key}
            ref={(element) => {
              imageRefs.current[index] = element;
            }}
            className={cx(IMAGE_CELL_CLASS, MOBILE_IMAGE_ROW[index])}
          >
            {service.image}
          </div>
        ))}
      </div>
    </div>
  );
}
