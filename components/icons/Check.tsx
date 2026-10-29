import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

export type CheckProps = {
  size: IconSize;
  label?: string;
};

export function Check({ size, label }: CheckProps) {
  return (
    <Icon size={size} label={label}>
      <path d="m20 6-11 11-5-5" />
    </Icon>
  );
}
