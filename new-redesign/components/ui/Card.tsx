import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

/**
 * The card, exactly as design-lab/design-system.html § Components defines it:
 * white, 1px border (--color-border), 16px radius (--radius-xs). Every card
 * in the new design is one of these; don't restyle a card in place.
 *
 * [REMOVED, 2026-10-26] PhotoCard and CardTitle, unused once the header menu
 * moved to the Ramp layout.
 */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("rounded-xs border border-border bg-surface", className)}>{children}</div>;
}
