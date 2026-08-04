"use client";

import { motion } from "motion/react";

import { cx } from "@/lib/cx";
import { MOTION } from "@/lib/motion";

const BASE_CLASS =
  "relative rounded-pill px-5 py-3 font-ui text-ui hit-area focus-ring transition-standard";

const LABEL_CLASS = "relative z-raised";

const ACTIVE_LABEL_CLASS = "text-on-dark";
const INACTIVE_LABEL_CLASS = "text-on-dark-muted hover:text-on-dark";

export type ProductTabProps = {
  id: string;
  panelId: string;
  label: string;
  isActive: boolean;
  /** Shared across the tab list so the brand pill animates between tabs. */
  indicatorLayoutId: string;
  isReducedMotion: boolean;
  onSelect: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  registerRef: (element: HTMLButtonElement | null) => void;
};

export function ProductTab({
  id,
  panelId,
  label,
  isActive,
  indicatorLayoutId,
  isReducedMotion,
  onSelect,
  onKeyDown,
  registerRef,
}: ProductTabProps) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={isActive}
      aria-controls={panelId}
      // Only the active tab is in the tab order; arrow keys move between them.
      tabIndex={isActive ? 0 : -1}
      ref={registerRef}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={cx(BASE_CLASS, isActive ? ACTIVE_LABEL_CLASS : INACTIVE_LABEL_CLASS)}
    >
      {isActive && (
        <motion.span
          layoutId={indicatorLayoutId}
          aria-hidden
          className="absolute inset-0 rounded-pill bg-brand"
          transition={
            isReducedMotion
              ? { duration: 0 }
              : {
                  duration: MOTION.durationUnderline,
                  ease: MOTION.easeStandard,
                }
          }
        />
      )}
      <span className={LABEL_CLASS}>{label}</span>
    </button>
  );
}
