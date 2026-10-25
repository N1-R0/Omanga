import type { ReactNode } from "react";

/**
 * Eyebrow, H2 and sub: the header every section opens with (design system §
 * Components › Section header). The eyebrow's crimson dot is the only colour.
 */
type Props = {
  eyebrow: string;
  title: string;
  sub?: ReactNode;
  /** Defaults to h2. The hero uses its own H1 and never this. */
  as?: "h2" | "h3";
  /** An optional button under the sub (owner, 2026-10-23: health cover § 2). */
  action?: ReactNode;
};

export function SectionHead({ eyebrow, title, sub, as: Heading = "h2", action }: Props) {
  return (
    <div className="section-head">
      <p className="type-p2 inline-flex items-center gap-2 text-text">
        {/* Asset's eyebrow marker: 14 × 8, 8px from the label. */}
        <span aria-hidden className="h-2 w-3.5 rounded-full bg-accent" />
        {eyebrow}
      </p>
      {/* Asset: eyebrow 24px above the title block; title to sub 20px. */}
      <div className="flex flex-col gap-[var(--head-sub-gap)]">
        <Heading className="type-h2">{title}</Heading>
        {sub ? <p className="type-p1 text-text-secondary">{sub}</p> : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
