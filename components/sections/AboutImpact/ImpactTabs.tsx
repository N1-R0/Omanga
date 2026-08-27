"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { MOTION } from "@/lib/motion";
import type { AboutImpactContent } from "@/content/about-impact.content";

import { ImpactPanel } from "./ImpactPanel";
import { ImpactTab } from "./ImpactTab";

/**
 * The impact tab set: a vertical list of three controls beside one panel.
 *
 * `ProductTabs`'s interaction, in a vertical layout: roving `tabIndex`, arrow
 * keys wrapping at both ends, `Home` and `End`, and one `layoutId` indicator
 * shared across the rows. The axis is the only real difference — `ArrowUp` and
 * `ArrowDown` here, where a horizontal list takes left and right — and hover.
 *
 * ---------------------------------------------------------------------------
 * [MEASURED from node 2579:131863] The panel container.
 *
 * `#2d2e2e` on `#161717` is `--color-ink-elevated` on `--color-ink`, the 8px
 * radius is `--radius-sm`, the hairline between the two columns is
 * `--color-border-subtle`, and the panel's 40 padding is `--space-6`. The tab
 * column is 427 of 1424 — 30% — which on the twelve-column grid is four columns
 * against the panel's eight, or 33/67. The three-point difference is not worth an
 * arbitrary width.
 *
 * `overflow-hidden` is what lets the active tab's fill run corner to corner and
 * still be clipped by the container's radius.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] All three panels stay in the DOM, and they cross-fade rather than
 * being swapped.
 *
 * `ProductTabs` keeps both of its panels mounted and `hidden`, "so inactive copy
 * is still in the server HTML". The same requirement holds here — § 6's three
 * statements are approved copy and a crawler should see all of them — but
 * `hidden` is `display: none`, and you cannot transition out of that. An
 * `AnimatePresence` swap would animate correctly and take two thirds of the
 * section's copy out of the document.
 *
 * So the three panels are stacked in one grid cell and their opacity is animated.
 * Three consequences, all deliberate:
 *
 *   - Every panel is in the server HTML, which is the property `ProductTabs`
 *     protects.
 *   - The container is as tall as the tallest panel at all times, so switching
 *     tabs never moves the page.
 *   - All three photographs load. That is what makes the hover instant — the
 *     requirement was "fast" — where a swapped panel would fetch its image on
 *     first hover and flash. The cost is two extra images on a section that is
 *     below the fold; the gain is that the interaction never stutters.
 *
 * Inactive panels take `aria-hidden` and `pointer-events-none` in place of
 * `hidden`. That is safe here for one specific reason: § 6 forbids the inline
 * link the reference carries, so a panel contains no focusable element and there
 * is nothing for a keyboard user to land inside while a screen reader cannot
 * describe it. If a link is ever added to a panel, this has to become `hidden`
 * and the cross-fade has to go.
 *
 * ---------------------------------------------------------------------------
 * Without JavaScript the first panel is visible, the other two are present at
 * `opacity: 0`, and the tabs do not respond. `motion` renders `animate`'s values
 * into the server markup when `initial={false}`, which is what makes that the
 * degraded state rather than three panels stacked on top of each other. The copy
 * is all readable in the source either way.
 */

/**
 * `flex-col` with `desktop:h-full` and `flex-1` rows — the reference's three
 * equal rows filling the panel height. Below desktop the list sits above the
 * panel and each row is sized by its own padding instead.
 */
const TAB_LIST_CLASS =
  "flex flex-col border-b border-border-subtle desktop:col-span-4 desktop:h-full desktop:border-b-0";

const PANEL_COLUMN_CLASS =
  "p-fluid-6 desktop:col-span-8 desktop:border-l desktop:border-border-subtle";

const CONTAINER_CLASS =
  "grid grid-cols-1 overflow-hidden rounded-sm bg-ink-elevated desktop:grid-cols-12";

/** All three panels occupy the same cell, so the box is as tall as the tallest. */
const PANEL_STACK_CLASS = "grid";
const PANEL_CLASS = "[grid-area:1/1]";

export type ImpactTabsProps = {
  pillars: AboutImpactContent["pillars"];
  /** Names the tab list for assistive technology, from the section's heading. */
  labelledBy: string;
};

export function ImpactTabs({ pillars, labelledBy }: ImpactTabsProps) {
  const isReducedMotion = useReducedMotion() === true;
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const focusTab = (index: number) => {
    const nextIndex = (index + pillars.length) % pillars.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  /**
   * A vertical tab list takes up and down. Left and right are deliberately not
   * bound: the reference's list is vertical, and binding both axes would make the
   * horizontal keys do something a sighted keyboard user has no reason to expect
   * from a column.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusTab(activeIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusTab(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(pillars.length - 1);
    }
  };

  return (
    <div className={CONTAINER_CLASS}>
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-labelledby={labelledBy}
        className={TAB_LIST_CLASS}
      >
        {pillars.map((pillar, index) => (
          <ImpactTab
            key={pillar.id}
            id={`${baseId}-${pillar.id}-tab`}
            panelId={`${baseId}-${pillar.id}-panel`}
            label={pillar.tabLabel}
            isActive={index === activeIndex}
            isLast={index === pillars.length - 1}
            indicatorLayoutId={`${baseId}-indicator`}
            isReducedMotion={isReducedMotion}
            onSelect={() => setActiveIndex(index)}
            onKeyDown={handleKeyDown}
            registerRef={(element) => {
              tabRefs.current[index] = element;
            }}
          />
        ))}
      </div>

      <div className={PANEL_COLUMN_CLASS}>
        <div className={PANEL_STACK_CLASS}>
          {pillars.map((pillar, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={pillar.id}
                role="tabpanel"
                id={`${baseId}-${pillar.id}-panel`}
                aria-labelledby={`${baseId}-${pillar.id}-tab`}
                aria-hidden={!isActive}
                className={PANEL_CLASS}
                /*
                  `initial={false}` so the first paint is the resolved state
                  rather than an entrance — the section's one-shot entrance is
                  `Reveal`'s, on the whole band, and a panel fading in on top of
                  it would read as two animations for one arrival.
                */
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={
                  isReducedMotion
                    ? { duration: 0 }
                    : {
                        /*
                          `durationStandard` (200ms) against the indicator's 250:
                          the fill is travelling a distance and the copy is only
                          changing state, so the shorter value is what stops the
                          panel trailing behind the tab it belongs to.
                        */
                        duration: MOTION.durationStandard,
                        ease: MOTION.easeStandard,
                      }
                }
                style={{ pointerEvents: isActive ? "auto" : "none" }}
              >
                <ImpactPanel pillar={pillar} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
