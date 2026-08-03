import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/**
 * Disclosure chevron.
 *
 * design-system.md § Input variants specifies a 16px chevron on the select
 * control and on the currency indicator. It is not a directional glyph in the
 * navigational sense — it signals that something expands — so it does not
 * conflict with the right-arrow-only rule.
 *
 * Rotation for an expanded state is the caller's, applied as a transform.
 */

export type ChevronDownProps = {
  size: IconSize;
  label?: string;
};

export function ChevronDown({ size, label }: ChevronDownProps) {
  return (
    <Icon size={size} label={label}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}
