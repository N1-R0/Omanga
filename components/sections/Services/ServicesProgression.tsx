"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cx } from "@/lib/cx";
import { MOTION } from "@/lib/motion";

// Mirrors --breakpoint-desktop (64rem); a media query cannot read a custom property.
const DESKTOP_QUERY = "(min-width: 64rem)";

// The middle 20% of the viewport. Must have real height: a rect inset 50% top and bottom
// is zero pixels tall, and a zero-area root reports intersections unreliably.
const SWITCH_BAND_ROOT_MARGIN = "-40% 0px -40% 0px";

const GRID_CLASS =
  "grid grid-cols-1 gap-10 desktop:grid-cols-12 desktop:gap-x-12 desktop:gap-y-0";

// [DEVIATES FROM component-rules.md § Layout] Sticky outside the header. The heading and
// the copy are one 100vh box so the distance between them cannot change on entry or exit.
const PINNED_COLUMN_CLASS =
  "contents desktop:col-start-1 desktop:col-span-5 desktop:self-start desktop:sticky desktop:top-0 desktop:h-screen desktop:flex desktop:flex-col desktop:justify-between desktop:py-24";

const TEXT_STACK_CLASS = "contents desktop:relative desktop:block";

const TEXT_CLASS =
  "pb-6 desktop:absolute desktop:inset-x-0 desktop:bottom-0 desktop:row-auto desktop:pb-0";

const IMAGE_COLUMN_CLASS =
  "contents desktop:col-start-7 desktop:col-span-6 desktop:flex desktop:flex-col desktop:gap-0";

// One photograph per viewport, which is also what gives the pinned column its travel.
const IMAGE_CELL_CLASS =
  "desktop:row-auto desktop:flex desktop:flex-col desktop:justify-center desktop:min-h-screen desktop:py-24";
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
 */
const MOBILE_IMAGE_ROW = ["row-start-2", "row-start-4", "row-start-6"] as const;
const MOBILE_COPY_ROW = ["row-start-3", "row-start-5", "row-start-7"] as const;


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
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const isReducedMotion = useReducedMotion();
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  // An observer reports only what changed, so the full picture has to be kept somewhere.
  const overlapRef = useRef<boolean[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const serviceCount = services.length;

  useEffect(() => {
    if (!isDesktop || typeof IntersectionObserver === "undefined") {
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
  }, [isDesktop, serviceCount]);

  return (
    <div className={GRID_CLASS}>
      <div className={PINNED_COLUMN_CLASS}>
        {/* `desktop:contents` dissolves this wrapper at desktop, so the heading
            block stays a direct child of the sticky column. Below it, the wrapper
            is the grid item that owns the first row. */}
        <div className="row-start-1 desktop:contents">{heading}</div>

        <div className={TEXT_STACK_CLASS}>
          {services.map((service, index) => {
            // Everything is visible until the enhancement is active, so the server and
            // no-JavaScript renders show all three.
            const isVisible = !isDesktop || index === activeIndex;

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
