import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { cx } from "@/lib/cx";
import type { Tone } from "@/types/ui.types";

/**
 * A page section: surface, vertical rhythm, container, accessible name.
 *
 * section rules: "A section owns its surface, its vertical rhythm, its
 * container, and its heading level. Nothing else." Section knows nothing about
 * what it contains and nothing about where it sits on the page.
 *
 * The surface is an explicit choice, not a theme mode — there is no dark-mode
 * toggle here. Consecutive sections alternate light and dark by composition,
 * which is the page's decision, not this component's.
 */

/**
 * Surface classes per tone.
 *
 * design-system.md § Color roles: sections alternate #FFFFFF and #161717, and
 * the CTA band is the only brand-filled section.
 */
const TONE_SURFACE: Readonly<Record<Tone, string>> = {
  light: "bg-surface-page text-ink",
  dark: "bg-ink text-on-dark",
  brand: "bg-brand text-on-dark",
} as const;

/**
 * Vertical rhythm per tone.
 *
 * "Vertical section padding is 130 on dark sections, 92–100 on light. Do not
 * vary per section beyond this pair."
 *
 * [DECISION] The brand CTA band is neither of the two cases the rule names.
 * It takes the dark rhythm, because it is a full-bleed emphasis band and
 * reading it as a light section would make it the shortest block on the page.
 * Pending design confirmation.
 */
const TONE_RHYTHM: Readonly<Record<Tone, string>> = {
  light: "section-rhythm-light",
  dark: "section-rhythm-dark",
  brand: "section-rhythm-dark",
} as const;

export type SectionProps = {
  /**
   * The `id` of the heading that names this section.
   *
   * Required, not optional: coding-guidelines.md states every section is a
   * `section` with an accessible name from its heading. Without a name the
   * element is not announced as a region at all, so there is no sensible
   * default and no reason to allow one.
   */
  labelledBy: string;
  /** The surface this section paints. Passed explicitly, never inferred. */
  tone: Tone;
  children: ReactNode;
};

export function Section({ labelledBy, tone, children }: SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cx(TONE_SURFACE[tone], TONE_RHYTHM[tone])}
    >
      <Container>{children}</Container>
    </section>
  );
}
