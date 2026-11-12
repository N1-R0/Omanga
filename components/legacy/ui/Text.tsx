import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { Measure, TextRole } from "@/types/ui.types";

const ROLE_CLASS: Readonly<Record<TextRole, string>> = {
  prose: "font-sans type-p1",
  lead: "font-sans type-p1",
  body: "font-sans type-p1",
  small: "font-sans type-p2",
} as const;

type BodyMeasure = Extract<Measure, "body" | "narrow" | "feature" | "none">;

const MEASURE_CLASS: Readonly<Record<BodyMeasure, string>> = {
  body: "max-w-[70ch]",
  narrow: "max-w-[60ch]",
  feature: "max-w-[45ch]",
  none: "",
} as const;

type TextElement = "p" | "span" | "div";

export type TextProps = {
  children: ReactNode;
  role: TextRole;
  measure?: BodyMeasure;
  isSecondary?: boolean;
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
        isSecondary && "opacity-80",
      )}
    >
      {children}
    </Element>
  );
}
