"use client";

import { motion } from "motion/react";

import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cx } from "@/lib/cx";
import { MOTION } from "@/lib/motion";
import type { DeepDiveFeature } from "@/content/deep-dive.content";

// Exclusive, not additive: `border-b` and `border-active` both set the bottom border
// width, so applying them together would leave the winner up to stylesheet order.
const ROW_CLASS = "border-b border-divider";
const ROW_ACTIVE_CLASS = "border-active border-brand";

const LABEL_CLASS =
  "block w-full py-fluid-3 text-left font-sans text-main focus-ring transition-standard";
const LABEL_ACTIVE_CLASS = "text-on-dark";
const LABEL_INACTIVE_CLASS = "text-on-dark-muted hover:text-on-dark";

export type FeatureItemProps = {
  feature: DeepDiveFeature;
  buttonId: string;
  regionId: string;
  isActive: boolean;
  isReducedMotion: boolean;
  onSelect: () => void;
};

export function FeatureItem({
  feature,
  buttonId,
  regionId,
  isActive,
  isReducedMotion,
  onSelect,
}: FeatureItemProps) {
  return (
    <li className={isActive ? ROW_ACTIVE_CLASS : ROW_CLASS}>
      <button
        type="button"
        id={buttonId}
        aria-expanded={isActive}
        aria-controls={regionId}
        onClick={onSelect}
        className={cx(
          LABEL_CLASS,
          isActive ? LABEL_ACTIVE_CLASS : LABEL_INACTIVE_CLASS,
        )}
      >
        {feature.label}
      </button>

      {/*
        Kept in the DOM when collapsed so every feature heading and paragraph is in the
        server HTML. Opacity only — the motion rules forbid animating height.
      */}
      <motion.div
        id={regionId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isActive}
        initial={false}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={
          isReducedMotion
            ? { duration: 0 }
            : { duration: MOTION.durationEmphasis, ease: MOTION.easeStandard }
        }
        className="pb-fluid-4"
      >
        <Heading id={`${regionId}-heading`} level="h3" role="feature">
          {feature.heading}
        </Heading>
        <div className="pt-fluid-2">
          <Text role="body" measure="feature" isSecondary>
            {feature.body}
          </Text>
        </div>
      </motion.div>
    </li>
  );
}
