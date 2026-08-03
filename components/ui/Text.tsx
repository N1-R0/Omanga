import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { Measure, TextRole } from "@/types/ui.types";

/**
 * Body copy.
 *
 * Three roles only. Anything that needs a fourth size is either a heading or a
 * design question.
 *
 * Colour is inherited from the section surface. Secondary text is expressed as
 * opacity, never as a separate grey — design-system.md is explicit about this,
 * and it is also what keeps secondary text legible on both the light and the
 * dark surface without two tokens.
 */

const ROLE_CLASS: Readonly<Record<TextRole, string>> = {
  /** 18/27 at the wide end, 16 on mobile, in the heading family. */
  body: "font-heading text-body",
  /** 14/22. Badge text and helper lines. */
  small: "font-heading text-body-sm",
  /** Inter 12/20 with +1 tracking. Legal and metadata only. */
  caption: "font-ui text-caption",
} as const;

/**
 * Maximum measure. design-system.md: body copy caps at 648–756px on wide
 * screens, feature copy at 486px. `body` is the 756 cap; `narrow` is 648.
 */
const MEASURE_CLASS: Readonly<Record<Measure, string>> = {
  body: "measure-body",
  narrow: "measure-narrow",
  feature: "measure-feature",
  none: "",
} as const;

/** Elements body copy is ever legitimately rendered as. */
type TextElement = "p" | "span" | "div";

export type TextProps = {
  children: ReactNode;
  role: TextRole;
  /**
   * Line-length cap. Defaults to `none` so the parent decides — a paragraph
   * inside a card should fill the card, not stop at 756px.
   */
  measure?: Measure;
  /**
   * Secondary copy: the same colour at 80% opacity. Measured at 4.9:1 on the
   * light surface and 14:1 on the dark one, so both clear AA.
   */
  isSecondary?: boolean;
  /** Defaults to `p`. Use `span` for inline text, `div` only inside a `p`. */
  as?: TextElement;
};

export function Text({
  children,
  role,
  measure = "none",
  isSecondary = false,
  as = "p",
}: TextProps) {
  const Element = as;

  return (
    <Element
      className={cx(
        ROLE_CLASS[role],
        MEASURE_CLASS[measure],
        isSecondary && "text-secondary",
      )}
    >
      {children}
    </Element>
  );
}
