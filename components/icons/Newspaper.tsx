import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/** Newspaper. The health-tips newsletter. Path data from lucide-react (ISC). */

export type NewspaperProps = {
  size: IconSize;
  label?: string;
};

export function Newspaper({ size, label }: NewspaperProps) {
  return (
    <Icon size={size} label={label}>
      <path d="M15 18h-5" />
      <path d="M18 14h-8" />
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
      <rect width="8" height="4" x="10" y="6" rx="1" />
    </Icon>
  );
}
