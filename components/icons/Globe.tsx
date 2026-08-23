import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/** Globe. Roaming — cover that travels across borders. Path data from lucide-react (ISC). */

export type GlobeProps = {
  size: IconSize;
  label?: string;
};

export function Globe({ size, label }: GlobeProps) {
  return (
    <Icon size={size} label={label}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </Icon>
  );
}
