import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { IconSize } from "@/types/ui.types";

const SIZE_CLASS: Readonly<Record<IconSize, string>> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
} as const;

export type IconProps = {
  children: ReactNode;
  size: IconSize;
  label?: string;
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
