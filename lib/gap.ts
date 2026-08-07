import type { Gap } from "@/types/ui.types";

/**
 * The spacing steps a layout primitive may put between siblings.
 *
 * design.md § 3 defines each step by the relationship it expresses, not by a
 * number. This map is the only place the two are connected, which is what lets
 * a section say `gap="lg"` instead of `gap-6`, and what makes a change to the
 * rhythm a one-line edit.
 *
 * Every step is FLUID — a clamp between 320px and 1440px, not a fixed value.
 * That is the change that matters most here: a fixed 64px gap is 20% of a 320px
 * screen and 3% of a 1920px one, which is why the previous system's mobile
 * layouts read as cramped between elements while being over-spaced around them.
 *
 * Eight steps, one per token in the scale. There is no ninth: a gap that does
 * not map onto the scale is a design question, not a new utility.
 *
 * Lives in `lib/` rather than beside a component because `Stack`, `Grid` and
 * `Section` all own it equally.
 */
export const GAP_CLASS: Readonly<Record<Gap, string>> = {
  xs: "gap-fluid-1", // 6  → 8   icon to label
  sm: "gap-fluid-2", // 10 → 12  adjacent controls
  md: "gap-fluid-3", // 14 → 16  rows in a list
  lg: "gap-fluid-4", // 20 → 24  card padding, heading to body
  xl: "gap-fluid-5", // 28 → 32  card art to copy
  "2xl": "gap-fluid-6", // 32 → 40  card grid gap
  "3xl": "gap-fluid-7", // 36 → 48  major intra-section gap
  "4xl": "gap-fluid-8", // 40 → 64  heading block to content block
} as const;
