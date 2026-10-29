import type { ReactNode } from "react";

import { GAP_CLASS } from "@/lib/gap";
import { cx } from "@/lib/cx";
import type { Gap } from "@/types/ui.types";

type Columns = 2 | 3 | 4 | 12;

const COLUMNS_CLASS: Readonly<Record<Columns, string>> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
  12: "lg:grid-cols-12",
} as const;

type MobileColumns = 1 | 2;

const MOBILE_COLUMNS_CLASS: Readonly<Record<MobileColumns, string>> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
} as const;

export type GridProps = {
  children: ReactNode;
  columns: Columns;
  mobileColumns?: MobileColumns;
  gap: Gap;
  isEqualHeight?: boolean;
};

export function Grid({
  children,
  columns,
  mobileColumns = 1,
  gap,
  isEqualHeight = true,
}: GridProps) {
  return (
    <div
      className={cx(
        "grid",
        MOBILE_COLUMNS_CLASS[mobileColumns],
        COLUMNS_CLASS[columns],
        GAP_CLASS[gap],
        isEqualHeight ? "items-stretch" : "items-start",
      )}
    >
      {children}
    </div>
  );
}
