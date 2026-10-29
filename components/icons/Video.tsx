import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

export type VideoProps = {
  size: IconSize;
  label?: string;
};

export function Video({ size, label }: VideoProps) {
  return (
    <Icon size={size} label={label}>
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </Icon>
  );
}
