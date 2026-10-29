import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("rounded-xs border border-border bg-surface", className)}>{children}</div>;
}
