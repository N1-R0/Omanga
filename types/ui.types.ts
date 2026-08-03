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
 * The typographic roles a heading may take, named for the role in
 * design-system.md rather than for a size.
 */
export type HeadingRole =
  | "display"
  | "section"
  | "step"
  | "feature"
  | "column";

/**
 * Body text roles. `lead` and `body` differ in scale; `caption` is the legal
 * and metadata role in Inter.
 */
export type TextRole = "body" | "small" | "caption";

/**
 * Icon sizes. design-system.md § Icon usage: "Icon sizes are 16, 24 or 32.
 * Nothing between."
 *
 * - `sm` — 16, inside buttons and links, trailing arrows
 * - `md` — 24, list rows, inline with body text
 * - `lg` — 32, beside a section or column heading
 */
export type IconSize = "sm" | "md" | "lg";

/**
 * The radius tokens, named by the role each one plays.
 * Kept as a union so a component cannot invent a seventh radius.
 */
export type Radius = "pill" | "card" | "chip" | "panel" | "device" | "dot";

/**
 * Spacing steps a layout primitive may put between siblings.
 *
 * Named for the relationship the gap expresses, taken from the "Use" column of
 * design-system.md § Spacing philosophy. This is what stops `gap-7` — a value
 * that resolves fine but means nothing — appearing in a section.
 */
export type Gap =
  /** 8 — icon to label, wordmark */
  | "xs"
  /** 12 — icon to text, adjacent buttons, eyebrow to heading */
  | "sm"
  /** 16 — rows inside a card */
  | "md"
  /** 24 — card padding, heading to body, nav links */
  | "lg"
  /** 32 — section heading to intro, card content blocks */
  | "xl"
  /** 40 — heading block to content block */
  | "2xl"
  /** 48 — timeline grid columns */
  | "3xl"
  /** 64 — intro to content in dark sections */
  | "4xl"
  /** 80 — major intra-section gap */
  | "5xl";

/**
 * Horizontal and vertical alignment for layout primitives.
 * Mapped to flex/grid alignment by the primitive, never passed through raw.
 */
export type AlignInline = "start" | "center" | "end" | "stretch";
export type AlignBlock = "start" | "center" | "end" | "between";

/**
 * Maximum line length for readable copy.
 * design-system.md: body caps at 648–756, feature copy at 486.
 */
export type Measure = "body" | "narrow" | "feature" | "none";
