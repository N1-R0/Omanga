import type { ReactNode } from "react";

type ContainerElement = "div" | "header" | "footer" | "nav";

export type ContainerProps = {
  children: ReactNode;
  as?: ContainerElement;
};

export function Container({ children, as = "div" }: ContainerProps) {
  const Element = as;

  return (
    <Element className="container-page">
      {children}
    </Element>
  );
}
