import type { ReactNode } from "react";

type Props = {
  title: string;
  sub?: ReactNode;
  as?: "h2" | "h3";
  action?: ReactNode;
  id?: string;
};

export function SectionHead({ title, sub, as: Heading = "h2", action, id }: Props) {
  return (
    <div className="section-head">
      <div className="flex flex-col gap-[var(--head-sub-gap)]">
        <Heading id={id} className="type-h2">{title}</Heading>
        {sub ? <p className="type-p1 text-text-secondary">{sub}</p> : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
