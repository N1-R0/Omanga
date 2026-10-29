import type { ReactNode } from "react";

export type RevealProps = {
  children: ReactNode;
  index?: number;
};

export function Reveal({ children }: RevealProps) {
  return <div>{children}</div>;
}
