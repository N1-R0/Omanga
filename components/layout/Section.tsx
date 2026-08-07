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
 *
 * The section also sets the focus-ring colour for everything inside it. That is
 * the same principle as its text colour: a foreground that has to stay legible
 * against this surface is the surface's decision, not the control's. It is what
 * fixes a brand ring being invisible on the brand band — see the
 * `focus-ring-on-*` utilities for the measurements.
 */

/**
 * Surface classes per tone.
 *
 * design.md § 8: sections alternate #FFFFFF and #161717, and
 * the CTA band is the only brand-filled section.
 */
const TONE_SURFACE: Readonly<Record<Tone, string>> = {
  light: "bg-surface-page text-ink focus-ring-on-light",
  dark: "bg-ink text-on-dark focus-ring-on-dark",
  brand: "bg-brand text-on-dark focus-ring-on-dark",
} as const;

/**
 * Vertical rhythm.
 *
 * [MEASURED from the structural benchmark] Rhythm is no longer a function of
 * tone. The benchmark applies the same vertical space to its light and dark
 * bands alike and reserves its two other steps for bands that are structurally
 * different — a strip, or the closing emphasis band — not for bands that are
 * merely a different colour.
 *
 * So the old `Record<Tone, string>` is gone: keying rhythm by surface is what
 * produced the mismatch this phase is correcting. A section that genuinely needs
 * a different step now says so with `rhythm`, and the default covers every band
 * on the homepage but two.
 */
type Rhythm = "default" | "tight" | "loose";

const RHYTHM_CLASS: Readonly<Record<Rhythm, string>> = {
  default: "section-rhythm",
  /** A strip rather than a section — the partner logos. */
  tight: "section-rhythm-tight",
  /** The page's one full-bleed emphasis band — the closing CTA. */
  loose: "section-rhythm-loose",
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
  /**
   * Vertical rhythm. Defaults to the one value every normal band takes, so a
   * section only names this when it is structurally not a normal band.
   */
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
