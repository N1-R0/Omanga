import type { ReactNode } from "react";

/**
 * [CHANGED, 2026-10-18] No longer animates. It used to fade and lift its
 * children in on scroll (`motion` `whileInView`), which put `opacity: 0` into
 * the server HTML, so crawlers and no-JS readers met hidden content. The
 * owner asked for every scroll effect and animation to go, for crawlability.
 *
 * Kept as a pass-through so the 14 sections that wrap content in it need no
 * edit; `index` is accepted and ignored.
 */
export type RevealProps = {
  children: ReactNode;
  index?: number;
};

export function Reveal({ children }: RevealProps) {
  return <div>{children}</div>;
}
