import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  children: ReactNode;
};

export function Section({ id, label, children }: Props) {
  return (
    <section id={id} aria-label={label} className="section-y">
      <div className="container-page">{children}</div>
    </section>
  );
}
