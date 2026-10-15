import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/** Arrow left right. Converting between currencies. Path data from lucide-react (ISC). */

export type ArrowLeftRightProps = {
  size: IconSize;
  label?: string;
};

export function ArrowLeftRight({ size, label }: ArrowLeftRightProps) {
  return (
    <Icon size={size} label={label}>
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" />
      <path d="M20 17H4" />
    </Icon>
  );
}
