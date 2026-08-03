import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { HeadingLevel, HeadingRole } from "@/types/ui.types";

/**
 * A heading.
 *
 * The point of this component is that `level` and `role` are independent.
 * `level` is the document outline — it must never skip, and there is exactly
 * one `h1` on the page. `role` is the type scale. Keeping them apart is what
 * lets a nested heading render at the size the design shows without breaking
 * the outline, which is the usual cause of a WCAG 1.3.1 failure.
 *
 * Colour is inherited from the section's surface. There is no `tone` prop:
 * a heading that could pick its own colour could pick the wrong one.
 */

/**
 * Type roles, from design-system.md § Typography hierarchy.
 *
 * Font weight, line height and tracking travel with each `--text-*` token, so
 * only the family needs pairing here.
 */
const ROLE_CLASS: Readonly<Record<HeadingRole, string>> = {
  /**
   * Hero. One per page. Helvetica Light 64/70/+2 at the wide end, uppercase.
   *
   * [OVERRIDES design-system.md] It said "sentence case everywhere, no uppercase
   * headings", and `typography.css` still carries a base-layer
   * `text-transform: none` on h1–h6 as a guard against it. Reversed for this role
   * only, by decision, to match the hero frame. The `uppercase` utility sits in
   * the utilities layer and the guard sits in base, so this wins by layer order
   * rather than by specificity or `!important`.
   *
   * The transform is CSS, not the content. `hero.content.ts` still holds the
   * headline in sentence case, which matters for two reasons: the copy stays
   * readable and diffable against the approved document, and screen readers read
   * the DOM text — several spell out genuinely capitalised words letter by letter,
   * and `text-transform` avoids that entirely.
   *
   * Scoped to `display` and nowhere else: `display` is one-per-page and only the
   * hero uses it, so no other heading can inherit the treatment by accident.
   */
  display: "font-heading text-display uppercase",
  /** The only section-level heading size. 48/52.8/-1.44. */
  section: "font-heading text-h2",
  /** Timeline step. 36/44/-1.2. */
  step: "font-heading text-h3",
  /** Deep-dive feature. 28/36.4. */
  feature: "font-heading text-h3-feature",
  /** Comparison column. 24/32. */
  column: "font-heading text-h4",
} as const;

export type HeadingProps = {
  children: ReactNode;
  /** The document outline level. Never chosen for its size. */
  level: HeadingLevel;
  /** The type scale. Never chosen for its semantics. */
  role: HeadingRole;
  /**
   * Required. Sections name themselves with `aria-labelledby` pointing at
   * their heading, so every heading that titles a section needs a stable id.
   * Making it required rather than optional means the section can rely on it.
   */
  id: string;
};

export function Heading({ children, level, role, id }: HeadingProps) {
  const Element = level;

  return (
    <Element id={id} className={cx(ROLE_CLASS[role])}>
      {children}
    </Element>
  );
}
