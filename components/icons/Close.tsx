import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/**
 * Cross mark, for the negative side of a comparison.
 *
 * Not a dismiss control and not paired with one. If a closable overlay is ever
 * added, it uses this glyph with a `label` — which is why `label` exists here
 * even though the comparison list has no use for it.
 *
 * Colour is inherited. See `Check` for why the success and error tokens are not
 * used.
 */

export type CloseProps = {
  size: IconSize;
  /** Omit unless the mark is the only content of an interactive element. */
  label?: string;
};

export function Close({ size, label }: CloseProps) {
  return (
    <Icon size={size} label={label}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </Icon>
  );
}
