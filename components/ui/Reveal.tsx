"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { MOTION } from "@/lib/motion";

const VISIBILITY_THRESHOLD = 0.15;

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
      viewport={{ once: true, amount: VISIBILITY_THRESHOLD }}
      transition={{
        duration: MOTION.durationEntrance,
        ease: MOTION.easeStandard,
        delay: index * MOTION.staggerStep,
      }}
    >
      {children}
    </motion.div>
  );
}
