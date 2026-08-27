/**
 * UI vocabulary shared across three or more primitives.
 *
 * coding-guidelines.md: "Types live beside their component unless shared by
 * three or more consumers." Everything in this file clears that bar. A type
 * used by one or two components stays in that component's file.
 *
 * Every type here is a closed union. There are no enums (union literals
 * instead) and no independent booleans where a union would prevent an
 * impossible combination.
 */

/**
 * The surface a component is being rendered onto.
 *
 * component-rules.md: "Surface context is passed explicitly, never inferred
 * from the DOM or a parent class." A component cannot look upward to discover
 * whether it sits on a dark section — the parent tells it.
 *
 * - `light` — #FFFFFF page or #F6F6F6 card
 * - `dark`  — #161717 section or #2D2E2E card
 * - `brand` — the CTA band, the only brand-filled surface on the page
 */
export type Tone = "light" | "dark" | "brand";

/**
 * Heading level for the document outline.
 *
 * Level is a semantic choice and is always separate from visual size, so a
 * section can render an `h3` at display scale without skipping a level.
 *
 * `h1` is included because the hero needs it, but exactly one may exist per
 * page. That is a page-composition rule the type cannot enforce; it is checked
 * in review and by the axe pass in CI.
 */
export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * The typographic roles a heading may take, named for the job the heading does
 * rather than for a size. design.md § 2.
 *
 * `display` is an emphasis role, not a size the page reaches for casually — it
 * belongs to the closing conversion band and nowhere else. The hero uses `hero`,
 * which is the h1 scale.
 */
export type HeadingRole =
  /** 64 → 112. The closing conversion band only. */
  | "display"
  /** 40 → 64. The page's single h1. */
  | "hero"
  /** 32 → 48. Every section-level heading. */
  | "section"
  /** 30 → 40. Timeline step. */
  | "step"
  /** 24 → 28. Deep-dive feature, card heading. */
  | "feature"
  /** 22 → 26. Comparison column. */
  | "column"
  /** 16 → 20. Eyebrow, tab label, footer column heading. */
  | "label";

/**
 * Body text roles. design.md § 2.
 *
 * - `prose` — 22 → 28. Prose that is the subject of its own band.
 * - `lead`  — 18 → 20. Section intros.
 * - `body`  — 16 → 18. The document default.
 * - `small` — 14 → 16. Helper lines, footer links, legal and metadata.
 *
 * `prose` is the fourth, added for the About page's Our Story panel. Every one
 * of its values — weight 400, line height 1.5, tracking 0 — is what § 2's table
 * already assigns to body copy; only the size is new. See the token for why the
 * gap was real rather than a caller wanting a bespoke size. It is not a general
 * "big text" role: a section reaching for it is claiming that its prose is the
 * largest thing in the band, and if that is not true the role is `lead`.
 */
export type TextRole = "prose" | "lead" | "body" | "small";

/**
 * Icon sizes. design.md § 9: "Icon sizes are 16, 24 or 32.
 * Nothing between."
 *
 * - `sm` — 16, inside buttons and links, trailing arrows
 * - `md` — 24, list rows, inline with body text
 * - `lg` — 32, beside a section or column heading
 */
export type IconSize = "sm" | "md" | "lg";

/**
 * The radius tokens. design.md § 6 — four values, named by size, because the
 * reference applies them by size rather than by role.
 *
 * Kept as a union so a component cannot invent a fifth radius. The previous
 * system's `chip` (12) and `device` (50) are gone: neither exists in the
 * reference and both were one-off values dressed as tokens.
 */
export type Radius = "xs" | "sm" | "md" | "pill";

/**
 * Spacing steps a layout primitive may put between siblings.
 *
 * Named for the relationship the gap expresses, from design.md § 3. This is what
 * stops `gap-7` — a value that resolves fine but means nothing — appearing in a
 * section. Every step is fluid between 320 and 1440.
 */
export type Gap =
  /** 6 → 8 — icon to label */
  | "xs"
  /** 10 → 12 — adjacent controls */
  | "sm"
  /** 14 → 16 — rows in a list */
  | "md"
  /** 20 → 24 — card padding, heading to body */
  | "lg"
  /** 28 → 32 — card art to copy */
  | "xl"
  /** 32 → 40 — card grid gap */
  | "2xl"
  /** 36 → 48 — major intra-section gap */
  | "3xl"
  /** 40 → 64 — heading block to content block */
  | "4xl";

/**
 * Horizontal and vertical alignment for layout primitives.
 * Mapped to flex/grid alignment by the primitive, never passed through raw.
 */
export type AlignInline = "start" | "center" | "end" | "stretch";
export type AlignBlock = "start" | "center" | "end" | "between";

/**
 * Maximum line length for readable copy, in characters. design.md § 2.
 *
 * `hero` (28ch) and `heading` (30ch) are heading measures and are applied by
 * `Heading`; the other three are body measures applied by `Text`.
 */
export type Measure = "hero" | "heading" | "body" | "narrow" | "feature" | "none";
