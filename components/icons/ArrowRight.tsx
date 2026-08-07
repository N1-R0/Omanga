import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/**
 * Forward-navigation arrow.
 *
 * design.md § 9: "Arrows point right for forward navigation.
 * No other directional glyphs on this page." This is the only arrow in the set,
 * by design — a left, up or down arrow appearing later is a design question.
 *
 * Used as the trailing icon on tertiary links and on buttons that navigate.
 */

export type ArrowRightProps = {
  size: IconSize;
  /** Omit unless the arrow is the only content of an interactive element. */
  label?: string;
};

export function ArrowRight({ size, label }: ArrowRightProps) {
  return (
    <Icon size={size} label={label}>
      <path d="M4 12h16" />
      <path d="m13 5 7 7-7 7" />
    </Icon>
  );
}
