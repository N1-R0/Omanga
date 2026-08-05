import type { ImageAsset } from "@/types/content.types";

import { FlagColumn } from "./FlagColumn";
import type { ColumnElevation } from "./FlagColumn";

/**
 * The flag arch — ten columns of chips curving up towards the centre.
 *
 * ---------------------------------------------------------------------------
 * THE ARCH is layout, so it lives here and not in the content module.
 *
 * `coverage.content.ts` supplies an ordered list of flags and says nothing about
 * how they are arranged; this component says how many chips each column holds and
 * how high that column sits. `component-rules.md`: "Props never carry design
 * values." A content module that knew about elevations would be carrying them.
 *
 * The shape is symmetric about the centre and holds fourteen chips: two in each
 * of the four outer columns, one in each of the six inner ones. Read left to
 * right, the curve rises 80 -> 40 -> 0 and falls back, with the outer pairs
 * hanging below.
 *
 * ---------------------------------------------------------------------------
 * WIDTH. Ten 96 chips and nine gaps is 1392 at the frame's 48 gap. The content
 * column is 1344 at a 1440 viewport and 1424 from 1520 up, so the frame's row
 * does not fit at 1440 and would overflow by 48.
 *
 * `justify-between` resolves it the same way `PartnerLogos` does — fixed boxes,
 * flush to both edges of the content column, and the space between them is
 * whatever is left. The rendered gap runs 43 at 1440 to 52 at 1520 and hits the
 * frame's 48 at about 1472. The chips never overflow and the row never wraps at
 * the wide breakpoint. `gap-4` stays as a floor, so `justify-between` can
 * distribute space but can never close the chips up against each other.
 *
 * ---------------------------------------------------------------------------
 * [ASSUMPTION] Below the wide breakpoint the arch becomes a mosaic.
 *
 * `design-system.md` § Breakpoints: "Only a 1440 desktop frame exists in this
 * file... narrow layouts are engineering decisions to be confirmed against
 * design." No tablet or mobile composition was supplied for this section, and the
 * arch cannot be made to fit — 960px of chips alone exceeds the content column
 * below roughly 1100.
 *
 * So the row wraps and centres, columns keep their stacking but drop their
 * elevation offsets, and the gap tightens to 16. At 360 the content column is 328
 * and three chips plus two gaps is 320, so three columns sit per row and nothing
 * scrolls horizontally. All fourteen flags stay in the DOM in the same order at
 * every width.
 *
 * **Confirm the narrow composition with design.** The arch is currently a
 * wide-only reading of the section.
 */

type ArchColumn = {
  readonly elevation: ColumnElevation;
  /** Chips in this column. Two only in the four outer columns. */
  readonly size: 1 | 2;
};

/**
 * The arch, left to right. Capacity is fourteen chips, which is what
 * `coverage.content.ts` supplies.
 *
 * A column with no flags left to fill it is not rendered, so a shorter list
 * degrades to a shorter arch rather than to empty boxes — "missing or unverified
 * content renders nothing rather than a placeholder".
 */
const ARCH: readonly ArchColumn[] = [
  { elevation: "base", size: 2 },
  { elevation: "mid", size: 2 },
  { elevation: "base", size: 1 },
  { elevation: "mid", size: 1 },
  { elevation: "crest", size: 1 },
  { elevation: "crest", size: 1 },
  { elevation: "mid", size: 1 },
  { elevation: "base", size: 1 },
  { elevation: "mid", size: 2 },
  { elevation: "base", size: 2 },
] as const;

export type FlagClusterProps = {
  flags: readonly ImageAsset[];
  /**
   * The cluster's accessible name.
   *
   * Required, and passed in like every other user-visible string. Fourteen flags
   * cannot represent forty-three countries, so the group is named as a selection
   * rather than left for a screen reader to infer a complete list from.
   */
  label: string;
};

export function FlagCluster({ flags, label }: FlagClusterProps) {
  const columns = toColumns(flags);

  return (
    <ul
      role="list"
      aria-label={label}
      className="flex flex-wrap items-center justify-center gap-3 desktop:items-start desktop:gap-4 wide:flex-nowrap wide:justify-between"
    >
      {columns.map((column) => (
        <FlagColumn
          key={column.flags[0].src}
          flags={column.flags}
          elevation={column.elevation}
        />
      ))}
    </ul>
  );
}

type PopulatedColumn = {
  readonly elevation: ColumnElevation;
  readonly flags: readonly ImageAsset[];
};

/**
 * Deals the flat flag list into the arch's columns, in order.
 *
 * The list is the content's, the shape is the arch's, and this is the only place
 * the two meet — which is what keeps the JSX above a single `map` instead of ten
 * hand-written columns.
 */
function toColumns(flags: readonly ImageAsset[]): readonly PopulatedColumn[] {
  const columns: PopulatedColumn[] = [];
  let cursor = 0;

  for (const { elevation, size } of ARCH) {
    const slice = flags.slice(cursor, cursor + size);
    cursor += size;

    if (slice.length > 0) {
      columns.push({ elevation, flags: slice });
    }
  }

  return columns;
}
