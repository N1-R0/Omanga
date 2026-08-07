import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { HeadingLevel, HeadingRole, Measure } from "@/types/ui.types";

/**
 * A heading.
 *
 * The point of this component is that `level` and `role` are independent.
 * `level` is the document outline — it must never skip, and there is exactly one
 * `h1` on the page. `role` is the type scale. Keeping them apart is what lets a
 * nested heading render at the size the design shows without breaking the
 * outline, which is the usual cause of a WCAG 1.3.1 failure.
 *
 * Colour is inherited from the section's surface. There is no `tone` prop: a
 * heading that could pick its own colour could pick the wrong one.
 */

/**
 * Type roles. design.md § 2.
 *
 * Font weight (500 for every heading), line height and tracking all travel with
 * the `--text-*` token, so nothing but the family is paired here.
 *
 * Sentence case throughout. The previous system uppercased the display role;
 * the reference uppercases nothing, and `typography.css` pins
 * `text-transform: none` on h1–h6 so it cannot return by accident.
 */
const ROLE_CLASS: Readonly<Record<HeadingRole, string>> = {
  /** 64 → 112. The closing conversion band only — this is the page's one
      emphasis size and spending it anywhere else makes it mean nothing. */
  display: "font-sans text-display",
  /** 40 → 64. The page's single h1. */
  hero: "font-sans text-h1",
  /** 32 → 48. Every section-level heading. */
  section: "font-sans text-h2",
  /** 30 → 40. Timeline step. */
  step: "font-sans text-h3",
  /** 24 → 28. Deep-dive feature, card heading. */
  feature: "font-sans text-h4",
  /** 22 → 26. Comparison column. */
  column: "font-sans text-h5",
  /** 16 → 20. Eyebrow, tab label, footer column heading. */
  label: "font-sans text-h6",
} as const;

/**
 * Measure caps.
 *
 * Applied HERE, on the heading itself, and not by a wrapper. `ch` resolves
 * against the font-size of the element carrying it, so a cap on a wrapper at the
 * root size is not the measure it claims to be — which is exactly how the
 * previous system ended up with a hero headline running 78 characters wide once
 * the display size clamped down.
 *
 * A heading only ever takes a heading measure. `body`, `narrow` and `feature`
 * are body measures and belong to `Text`; passing one here is a type error.
 */
type HeadingMeasure = Extract<Measure, "hero" | "heading" | "none">;

const MEASURE_CLASS: Readonly<Record<HeadingMeasure, string>> = {
  hero: "measure-hero",
  heading: "measure-heading",
  none: "",
} as const;

export type HeadingProps = {
  children: ReactNode;
  /** The document outline level. Never chosen for its size. */
  level: HeadingLevel;
  /** The type scale. Never chosen for its semantics. */
  role: HeadingRole;
  /**
   * Line-length cap.
   *
   * Defaults to `heading` (30ch) rather than to `none`, because an uncapped
   * heading is a defect the design system exists to prevent and a default of
   * `none` would make the correct behaviour the thing every caller has to
   * remember. The hero opts up to `hero` (20ch); a heading inside a card that is
   * already narrow opts out with `none`.
   */
  measure?: HeadingMeasure;
  /**
   * Required. Sections name themselves with `aria-labelledby` pointing at their
   * heading, so every heading that titles a section needs a stable id. Making it
   * required rather than optional means the section can rely on it.
   */
  id: string;
};

export function Heading({
  children,
  level,
  role,
  measure = "heading",
  id,
}: HeadingProps) {
  const Element = level;

  return (
    <Element id={id} className={cx(ROLE_CLASS[role], MEASURE_CLASS[measure])}>
      {children}
    </Element>
  );
}
