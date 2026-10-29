import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  sub?: ReactNode;
  as?: "h2" | "h3";
  action?: ReactNode;
  id?: string;
};

export function SectionHead({ eyebrow, title, sub, as: Heading = "h2", action, id }: Props) {
  return (
    <div className="section-head">
      <p className="type-p2 inline-flex items-center gap-2 text-text">
        <span aria-hidden className="h-2 w-3.5 rounded-full bg-accent" />
        {eyebrow}
      </p>
      <div className="flex flex-col gap-[var(--head-sub-gap)]">
        <Heading id={id} className="type-h2">{title}</Heading>
        {sub ? <p className="type-p1 text-text-secondary">{sub}</p> : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
