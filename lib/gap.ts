import type { Gap } from "@/types/ui.types";

/**
 * The spacing steps a layout primitive may put between siblings, mapped to
 * their Tailwind utilities.
 *
 * design-system.md § Spacing philosophy defines each step by the relationship
 * it expresses, not by a number. This map is the only place the two are
 * connected, which is what lets a section say `gap="lg"` (card padding,
 * heading to body) instead of `gap-6`, and what makes a change to the rhythm a
 * one-line edit.
 *
 * Lives in `lib/` rather than beside a component because both `Stack` and
 * `Grid` own it equally, and `Section` will be the third consumer.
 */
export const GAP_CLASS: Readonly<Record<Gap, string>> = {
  xs: "gap-2", // 8  — icon to label, wordmark
  sm: "gap-3", // 12 — icon to text, adjacent buttons, eyebrow to heading
  md: "gap-4", // 16 — rows inside a card
  lg: "gap-6", // 24 — card padding, heading to body, nav links
  xl: "gap-8", // 32 — section heading to intro, card content blocks
  "2xl": "gap-10", // 40 — heading block to content block
  "3xl": "gap-12", // 48 — timeline grid columns
  "4xl": "gap-16", // 64 — intro to content in dark sections
  "5xl": "gap-20", // 80 — major intra-section gap
} as const;
