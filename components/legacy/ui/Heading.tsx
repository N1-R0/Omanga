import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { HeadingLevel, HeadingRole, Measure } from "@/types/ui.types";

const ROLE_CLASS: Readonly<Record<HeadingRole, string>> = {
  display: "font-sans type-h1",
  hero: "font-sans type-h1",
  section: "font-sans type-h2",
  step: "font-sans type-h3",
  feature: "font-sans type-h3",
  column: "font-sans type-h3",
  label: "font-sans type-h3",
} as const;

type HeadingMeasure = Extract<Measure, "hero" | "heading" | "none">;

const MEASURE_CLASS: Readonly<Record<HeadingMeasure, string>> = {
  hero: "max-w-[28ch]",
  heading: "max-w-[30ch]",
  none: "",
} as const;

export type HeadingProps = {
  children: ReactNode;
  level: HeadingLevel;
  role: HeadingRole;
  measure?: HeadingMeasure;
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
