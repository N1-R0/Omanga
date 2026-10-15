import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/** Calendar with a date range. Cover for the length of a trip. Path data from lucide-react (ISC). */

export type CalendarRangeProps = {
  size: IconSize;
  label?: string;
};

export function CalendarRange({ size, label }: CalendarRangeProps) {
  return (
    <Icon size={size} label={label}>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4" />
      <path d="M3 10h18" />
      <path d="M8 2v4" />
      <path d="M17 14h-6" />
      <path d="M13 18H7" />
      <path d="M7 14h.01" />
      <path d="M17 18h.01" />
    </Icon>
  );
}
