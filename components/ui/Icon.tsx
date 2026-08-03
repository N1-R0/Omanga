import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { IconSize } from "@/types/ui.types";

/**
 * The shared SVG wrapper. Every icon in the system renders through it.
 *
 * design-system.md § Icon usage: stroke-style SVG, single colour inheriting
 * the current text colour, at 16, 24 or 32 and nothing between. Holding those
 * attributes here means an individual glyph file contains only path data, and
 * a glyph cannot ship at the wrong size or with a baked-in colour.
 *
 * Accessibility: an icon is decorative unless it is given a `label`. Decorative
 * icons are hidden from assistive tech; a labelled icon is exposed as an image
 * with that name. "An icon is never the only label on an interactive element"
 * is the caller's responsibility — but `label` exists so an icon-only control
 * can meet it.
 */

const SIZE_CLASS: Readonly<Record<IconSize, string>> = {
  sm: "size-4", // 16 — inside buttons and links, trailing arrows
  md: "size-6", // 24 — list rows, inline with body text
  lg: "size-8", // 32 — beside a section or column heading
} as const;

export type IconProps = {
  /** Path data only. No `stroke`, `fill`, `width` or `height` on the paths. */
  children: ReactNode;
  size: IconSize;
  /**
   * Accessible name. Omit for decorative icons, which are then hidden from
   * assistive technology entirely.
   */
  label?: string;
  /** Defaults to a 24-unit grid, which is what the icon set is drawn on. */
  viewBox?: string;
};

export function Icon({
  children,
  size,
  label,
  viewBox = "0 0 24 24",
}: IconProps) {
  const isDecorative = label === undefined;

  return (
    <svg
      viewBox={viewBox}
      className={cx(SIZE_CLASS[size], "shrink-0")}
      // Colour, stroke width and joins are fixed for the whole set. The stroke
      // resolves to currentColor, so an icon always matches its label.
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={isDecorative || undefined}
      role={isDecorative ? undefined : "img"}
      focusable="false"
    >
      {label !== undefined && <title>{label}</title>}
      {children}
    </svg>
  );
}
