import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { cx } from "@/lib/cx";

export type V2SectionProps = {
  labelledBy: string;
  children: ReactNode;
  /** Surface and any extra layout classes. Defaults to the page white. */
  className?: string;
  rhythm?: "default" | "tight" | "none";
};

const RHYTHM = {
  default: "section-y",
  tight: "section-y",
  none: "",
} as const;

/**
 * The v2 counterpart of `Section`. It exists because v2 needs surfaces
 * `Section`'s three tones don't have (blush, light grey) and some bands that
 * set their own vertical space (the hero, the closing panel). Same container
 * and rhythm tokens underneath, so spacing matches the rest of the site.
 */
export function V2Section({
  labelledBy,
  children,
  className = "bg-bg text-text",
  rhythm = "default",
}: V2SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cx("relative ", RHYTHM[rhythm], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
