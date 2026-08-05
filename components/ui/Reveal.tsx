"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { MOTION } from "@/lib/motion";

/**
 * [MEASURED] The benchmark starts its reveals as the element's top edge clears
 * the bottom of the viewport, not once 15% of it is already showing. On a tall
 * block — a card, a comparison column — 15% can be several hundred pixels, which
 * means the reveal begins well after the element is on screen and the user
 * watches it happen. A margin-based trigger fires just before the element is
 * visible, so the motion is finishing as it arrives.
 */
const VIEWPORT_MARGIN = "0px 0px -10% 0px";

export type RevealProps = {
  children: ReactNode;
  /** Position among siblings entering together, for the token's stagger step. */
  index?: number;
};

export function Reveal({ children, index = 0 }: RevealProps) {
  const isReducedMotion = useReducedMotion();

  // No `initial` at all under reduced motion, so nothing can leave content hidden.
  if (isReducedMotion === true) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: MOTION.entranceOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
      transition={{
        duration: MOTION.durationEntrance,
        ease: MOTION.easeEntrance,
        delay: MOTION.entranceDelay + index * MOTION.staggerStep,
      }}
    >
      {children}
    </motion.div>
  );
}
