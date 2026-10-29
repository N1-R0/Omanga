import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { cx } from "@/lib/cx";
import type { Tone } from "@/types/ui.types";

const TONE_SURFACE: Readonly<Record<Tone, string>> = {
  light: "bg-bg text-text ",
  dark: "bg-surface-inverse text-text-inverse ",
  brand: "bg-accent text-text-inverse ",
} as const;

type Rhythm = "default" | "tight" | "loose";

const RHYTHM_CLASS: Readonly<Record<Rhythm, string>> = {
  default: "section-y",
  tight: "section-y",
  loose: "section-y",
} as const;

export type SectionProps = {
  labelledBy: string;
  tone: Tone;
  rhythm?: Rhythm;
  children: ReactNode;
};

export function Section({
  labelledBy,
  tone,
  rhythm = "default",
  children,
}: SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cx(TONE_SURFACE[tone], RHYTHM_CLASS[rhythm])}
    >
      <Container>{children}</Container>
    </section>
  );
}
