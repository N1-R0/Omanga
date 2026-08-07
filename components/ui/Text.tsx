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
 * opacity, never as a separate grey — which is what keeps it legible on both the
 * light and the dark surface without a second token.
 */

const ROLE_CLASS: Readonly<Record<TextRole, string>> = {
  /** 18 → 20. Section intros — the paragraph directly under a section heading. */
  lead: "font-sans text-large",
  /** 16 → 18. The document default. */
  body: "font-sans text-main",
  /** 14 → 16. Helper lines, footer links, legal and metadata. */
  small: "font-sans text-small",
} as const;

/**
 * Measure caps, in characters. design.md § 2.
 *
 * Applied here, on the paragraph itself, because `ch` resolves against the
 * font-size of the element carrying it. A cap on a wrapper at the root size is
 * not the measure it claims to be.
 *
 * A body element only ever takes a body measure; `hero` and `heading` belong to
 * `Heading` and passing one here is a type error.
 */
type BodyMeasure = Extract<Measure, "body" | "narrow" | "feature" | "none">;

const MEASURE_CLASS: Readonly<Record<BodyMeasure, string>> = {
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
   * inside a card should fill the card, not stop at 70 characters.
   */
  measure?: BodyMeasure;
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
