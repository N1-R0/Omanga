"use client";

import { useReducedMotion } from "motion/react";

import { ProductContent } from "@/components/sections/ProductDeepDive";
import type { DeepDiveProduct } from "@/content/deep-dive.content";

/**
 * The client boundary for the untabbed deep dive.
 *
 * It exists for one line: `ProductContent` needs `isReducedMotion`, and on the
 * homepage that value comes from `ProductTabs`, which is a Client Component for
 * its own reasons. With no tabs there is nothing above it holding the value, so
 * this reads it and passes it down.
 *
 * Deliberately the smallest possible client leaf — no state, no effects, and the
 * product arrives as a prop, so no content module enters the client bundle and
 * the feature list is in the server HTML either way.
 *
 * No `role="tabpanel"`. A panel with no tab controlling it is not a tabpanel,
 * and the `tabIndex={0}` that makes a real one keyboard-reachable would add a
 * tab stop on a plain container here.
 */

export type InsuranceDeepDivePanelProps = {
  product: DeepDiveProduct;
};

export function InsuranceDeepDivePanel({
  product,
}: InsuranceDeepDivePanelProps) {
  const isReducedMotion = useReducedMotion() === true;

  return <ProductContent product={product} isReducedMotion={isReducedMotion} />;
}
