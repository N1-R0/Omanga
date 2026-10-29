import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { cx } from "@/lib/cx";

export type V2SectionProps = {
  labelledBy: string;
  children: ReactNode;
  className?: string;
  rhythm?: "default" | "tight" | "none";
};

const RHYTHM = {
  default: "section-y",
  tight: "section-y",
  none: "",
} as const;

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
