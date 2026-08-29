import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/**
 * Arrow into a line. Funding — money coming in from outside and landing in the
 * wallet. Path data from lucide-react (ISC).
 *
 * Chosen over a coin or banknote glyph because the fact it labels is a
 * direction, not an object: three currencies you can top up *from*. A stack of
 * coins would say "money", which every item in this row is about.
 */

export type ArrowDownToLineProps = {
  size: IconSize;
  label?: string;
};

export function ArrowDownToLine({ size, label }: ArrowDownToLineProps) {
  return (
    <Icon size={size} label={label}>
      <path d="M12 17V3" />
      <path d="m6 11 6 6 6-6" />
      <path d="M19 21H5" />
    </Icon>
  );
}
