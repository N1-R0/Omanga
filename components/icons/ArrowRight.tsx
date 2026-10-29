import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

export type ArrowRightProps = {
  size: IconSize;
  label?: string;
};

export function ArrowRight({ size, label }: ArrowRightProps) {
  return (
    <Icon size={size} label={label}>
      <path d="M4 12h16" />
      <path d="m13 5 7 7-7 7" />
    </Icon>
  );
}
