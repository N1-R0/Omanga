import type { ReactNode } from "react";

/**
 * The page's horizontal rhythm, in one place.
 *
 * layout rules: "One container primitive owns page gutters and maximum content
 * width. No component sets these itself." Container is therefore the single
 * sanctioned exception to "components never set their own max-width" — because
 * setting it is the entire job.
 *
 * Gutters step 20 → 40 → 64 → 100 across the four breakpoints, and the content
 * column locks at 1240 and centres from 1440 up. All of that lives in the
 * `page-gutter` utility and the `--container-content` token; none of it is
 * expressible from outside this file.
 *
 * Container owns no vertical space. Section does.
 */

/** Elements a container is ever legitimately rendered as. */
type ContainerElement = "div" | "header" | "footer" | "nav";

export type ContainerProps = {
  children: ReactNode;
  /**
   * The rendered element. Defaults to `div`.
   *
   * Landmarks pass their own tag so the container and the landmark are one
   * element rather than a wrapper around a wrapper.
   */
  as?: ContainerElement;
};

export function Container({ children, as = "div" }: ContainerProps) {
  const Element = as;

  return (
    <Element className="page-gutter mx-auto w-full max-w-content">
      {children}
    </Element>
  );
}
