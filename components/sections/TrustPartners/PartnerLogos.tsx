import type { ImageAsset } from "@/types/content.types";

import { PartnerLogo } from "./PartnerLogo";

/**
 * The logo row.
 *
 * A real `ul` with an explicit `role="list"`, so the strip announces how many
 * partners there are rather than as three loose images. The role is not
 * redundant: the global reset removes the marker and Safari drops list semantics
 * when it does — the same reason `NavigationGroup` and `FooterColumn` carry it.
 *
 * A list is also why this row is not a `Stack`: `Stack` renders a `div` and takes
 * no element prop, and the width cap below has to sit on each `li`. It keeps
 * `Stack`'s contract regardless — the gap is the parent's, so no child carries a
 * margin.
 *
 * ---------------------------------------------------------------------------
 * GEOMETRY, from the frame (node 1265:12701).
 *
 * Three 242-wide boxes at x 40 / 523 / 1006 inside a 1289 container with 40
 * padding, all vertically centred on the row's midline. Equal boxes with equal
 * space between them, flush to both edges of the content column — which is
 * `justify-between` with a 240 cap, and matches `design-system.md` § Grid system:
 * "Logo strip: single row, equal optical spacing, full content width."
 *
 * `items-center` rather than a shared baseline. § Image treatment asks for logos
 * "aligned on a shared baseline"; the frame centres them instead (all three sit
 * on a 69.09 midline, with heights of 50, 44 and 76), and the frame is the
 * primary source. Baseline alignment is not meaningful for images anyway.
 *
 * ---------------------------------------------------------------------------
 * [ASSUMPTION] The narrow layouts are engineering decisions.
 *
 * Only the 1440 frame exists, and `design-system.md` § Breakpoints states that
 * "narrow layouts are engineering decisions to be confirmed against design". Two
 * were made here:
 *
 *   - Below tablet the row becomes a column, left-aligned rather than centred, so
 *     the logos keep the shared left edge the frame gives them with the label.
 *   - From tablet up the single row holds. Each logo is `w-full` under the cap, so
 *     three items shrink equally when the content column is narrower than
 *     3 × 240 plus gaps — around 768 to 830 — instead of overflowing. The strip
 *     never scrolls horizontally and never wraps to an orphan row.
 *
 * **Confirm both against design.**
 *
 * [NOTE] The gaps are wider than the frame's, and that is the content column's
 * doing rather than this component's. The frame spreads 242 logos across a 1240
 * column (about 60% of it covered); `--container-content` is 1520 by an earlier
 * decision, so the same three logos cover about 50% and the spacing grows.
 * Enlarging the logos to compensate would abandon the frame's normalised 242.
 */
export type PartnerLogosProps = {
  partners: readonly ImageAsset[];
};

export function PartnerLogos({ partners }: PartnerLogosProps) {
  return (
    <ul
      role="list"
      className="flex flex-col items-start gap-8 tablet:flex-row tablet:items-center tablet:justify-between"
    >
      {partners.map((logo) => (
        // 240 is the frame's 242 box on the 4px grid. The cap lives here because
        // the row owns its children's width, not the logo itself.
        <li key={logo.src} className="w-full max-w-60">
          <PartnerLogo logo={logo} />
        </li>
      ))}
    </ul>
  );
}
