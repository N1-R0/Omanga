import { cx } from "@/lib/cx";
import type { ImageAsset } from "@/types/content.types";

import { FlagItem } from "./FlagItem";

/**
 * One column of the flag arch: one or two chips, and how high the column sits.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The arch's vertical offsets are re-derived as *top* padding.
 *
 * The supplied spec bottom-aligns ten columns inside a 488-tall row and gives
 * each one a bottom padding: 168, 208, 312, 352, 392, 392, 352, 312, 208, 168.
 * Five values, none of them named in `design-system.md` § Spacing philosophy.
 *
 * Those five are an artifact of bottom alignment, not the design. Bottom-aligned,
 * a column's box height is its flags plus its padding, so the padding is whatever
 * makes the box reach the row's floor. Resolving each column's *top* edge instead
 * gives:
 *
 *   column       1    2    3    4    5    6    7    8    9   10
 *   bottom pad  168  208  312  352  392  392  352  312  208  168
 *   flags        2    2    1    1    1    1    1    1    2    2
 *   box height  408  448  408  448  488  488  448  408  448  408
 *   top edge     80   40   80   40    0    0   40   80   40   80
 *
 * Three values — 0, 40, 80 — instead of five, both non-zero ones on the 8px
 * rhythm, and the same rendered geometry to the pixel. Verified against the
 * section screenshot: the middle columns' chips start 40 above the mid columns'
 * and 80 above the outer ones, which is what the image shows.
 *
 * That is why this component is top-aligned with a top padding rather than
 * bottom-aligned with the spec's values: it expresses the arch in three steps
 * with no magic offsets, which is what `component-rules.md` § Layout rules asks
 * for. Padding on the container, never a margin on a child.
 *
 * ---------------------------------------------------------------------------
 * The offset applies from the wide breakpoint only. Below it the cluster wraps,
 * and a per-column offset inside a wrapped row would push chips out of alignment
 * with the row above rather than forming an arch. See `FlagCluster`.
 *
 * The 48 gap between stacked chips is the frame's, and 48 is a named step. It
 * tightens to 16 below the wide breakpoint, where the chips sit in a mosaic
 * rather than an arch.
 */

/**
 * How high a column sits in the arch, named for its position in the curve
 * rather than for a number.
 *
 * `crest` renders no offset. The class is still declared so the map is complete
 * and every elevation is greppable — an omitted entry would read as an oversight.
 */
const ELEVATION_CLASS = {
  /** The two centre columns. The top of the arch. */
  crest: "wide:pt-0",
  /** 40 below the crest. */
  mid: "wide:pt-10",
  /** 80 below the crest. The outermost columns and their inner neighbours. */
  base: "wide:pt-20",
} as const;

export type ColumnElevation = keyof typeof ELEVATION_CLASS;

export type FlagColumnProps = {
  flags: readonly ImageAsset[];
  elevation: ColumnElevation;
};

export function FlagColumn({ flags, elevation }: FlagColumnProps) {
  return (
    <li
      className={cx(
        "flex flex-col gap-4 wide:gap-12",
        ELEVATION_CLASS[elevation],
      )}
    >
      {flags.map((flag) => (
        <FlagItem key={flag.src} flag={flag} />
      ))}
    </li>
  );
}
