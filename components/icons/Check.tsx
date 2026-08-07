import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/**
 * Affirmative mark, for the positive side of a comparison.
 *
 * Carries no colour of its own. `design.md` § Icon usage reserves
 * self-coloured icons for "the success and error comparison icons", but the
 * measured contrast rules that out on this page: `--color-success` reads at
 * 6.96:1 on the comparison card while `--color-brand` reads at 2.04:1, and the
 * decision taken was to render both comparison marks in the surface's own text
 * colour instead. The glyph, not a hue, is what separates it from `Close`.
 */

export type CheckProps = {
  size: IconSize;
  /** Omit unless the mark is the only content of an interactive element. */
  label?: string;
};

export function Check({ size, label }: CheckProps) {
  return (
    <Icon size={size} label={label}>
      <path d="m20 6-11 11-5-5" />
    </Icon>
  );
}
