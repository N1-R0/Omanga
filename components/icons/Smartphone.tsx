import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/** Phone. The mobile app. Path data from lucide-react (ISC). */

export type SmartphoneProps = {
  size: IconSize;
  label?: string;
};

export function Smartphone({ size, label }: SmartphoneProps) {
  return (
    <Icon size={size} label={label}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </Icon>
  );
}
