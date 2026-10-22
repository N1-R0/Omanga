import type { ReactNode } from "react";

/**
 * One home-page section: 72px vertical padding (48 on mobile) and the 1080
 * column. `id` is the in-page anchor and matches the locked structure in
 * new-redesign/doc/research-and-page-structure.md § 6.1.
 */
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
