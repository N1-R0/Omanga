import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/** Calendar with a plus. Extending a plan. Path data from lucide-react (ISC). */

export type CalendarPlusProps = {
  size: IconSize;
  label?: string;
};

export function CalendarPlus({ size, label }: CalendarPlusProps) {
  return (
    <Icon size={size} label={label}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
      <path d="M3 10h18" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
    </Icon>
  );
}
