import type { ReactNode } from "react";

import { GAP_CLASS } from "@/lib/gap";
import { cx } from "@/lib/cx";
import type { AlignBlock, AlignInline, Gap } from "@/types/ui.types";

type Direction = "column" | "row" | "column-to-row";

const DIRECTION_CLASS: Readonly<Record<Direction, string>> = {
  column: "flex-col",
  row: "flex-row",
  "column-to-row": "flex-col md:flex-row",
} as const;

const ALIGN_INLINE_CLASS: Readonly<Record<AlignInline, string>> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const;

const ALIGN_BLOCK_CLASS: Readonly<Record<AlignBlock, string>> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const;

export type StackProps = {
  children: ReactNode;
  gap: Gap;
  direction?: Direction;
  align?: AlignInline;
  justify?: AlignBlock;
  isWrapping?: boolean;
};

export function Stack({
  children,
  gap,
  direction = "column",
  align = "stretch",
  justify = "start",
  isWrapping = false,
}: StackProps) {
  return (
    <div
      className={cx(
        "flex",
        DIRECTION_CLASS[direction],
        GAP_CLASS[gap],
        ALIGN_INLINE_CLASS[align],
        ALIGN_BLOCK_CLASS[justify],
        isWrapping && "flex-wrap",
      )}
    >
      {children}
    </div>
  );
}
