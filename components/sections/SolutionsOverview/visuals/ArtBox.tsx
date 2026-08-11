import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

/**
 * The card art box, shared by both product visuals.
 *
 * Same geometry the static artwork had — `aspect-card` (3:2), full width,
 * `overflow-hidden` — so replacing the images changes nothing about the card's
 * height or the row's alignment. The box is fully sized before any script runs,
 * which is what keeps these visuals out of the CLS budget entirely.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] It declares `pv-box`, which opens a query container and defines the
 * `--pv` scale unit both visuals measure themselves in.
 *
 * The box does not track the viewport. It measures 400 at 1440, 247 at 1024 —
 * where the cards take eight of twelve columns beside the heading column — and
 * 248 at 320. It is narrowest at 1024 and at 320 alike, so every viewport
 * breakpoint gets the relationship backwards: `desktop:` would enlarge the
 * contents at exactly the width where there is least room for them.
 *
 * Scaling against the container instead means the mockups are exact scale models
 * of their frames at every width — nothing is hidden, shrunk or re-laid-out,
 * because at every width it is the same picture. `styles/product-visuals.css`
 * carries the unit and the measurements.
 *
 * The ratio is `--aspect-product-visual` (491:482), the frames' own art area,
 * not `--aspect-card`. See the token for why these two cards differ.
 *
 * ---------------------------------------------------------------------------
 * [ACCESSIBILITY] The mockup is one image, not a set of controls.
 *
 * Without `role="img"` a screen reader walks into the payments visual and reads
 * "Overview, Account balance, $21,530.86, Send, Request" as though the user had
 * reached a form — five announcements, none of them actionable, one of them a
 * balance figure `solutions.content.ts` records as unapproved placeholder data.
 * Collapsing the subtree to a single labelled image is both the accurate
 * description and the reason those figures are never announced.
 *
 * `label` omitted means ornamental, and the box is hidden outright. That is the
 * same judgement the insurance artwork already shipped with (`alt: ""`): a
 * decorative visual naming no benefit the heading and body do not already state.
 */

export type ArtBoxProps = {
  children: ReactNode;
  /**
   * Accessible name for the whole mockup. Describes the product, never the
   * pixels, and carries no figure from the artwork.
   *
   * An empty string is ornamental, and so is omitting it. Empty is accepted
   * because the label is fed straight from `ImageAsset.alt`, where `""` is
   * already this project's way of saying "decorative" — the insurance artwork
   * ships that way today, with the reasoning recorded in `solutions.content.ts`.
   * Re-encoding the same decision as `undefined` at the call site would let the
   * two drift.
   */
  label?: string;
};

export function ArtBox({ children, label }: ArtBoxProps) {
  const isOrnamental = label === undefined || label === "";

  return (
    <div
      className={cx(
        "pv-box relative aspect-product-visual w-full overflow-hidden",
      )}
      role={isOrnamental ? undefined : "img"}
      aria-label={label}
      aria-hidden={isOrnamental || undefined}
    >
      {children}
    </div>
  );
}
