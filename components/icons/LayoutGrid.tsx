import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/** Four tiles. Everything in one view. Path data from lucide-react (ISC). */

export type LayoutGridProps = {
  size: IconSize;
  label?: string;
};

export function LayoutGrid({ size, label }: LayoutGridProps) {
  return (
    <Icon size={size} label={label}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </Icon>
  );
}
