import type { ReactNode } from "react";

/**
 * The art box for the three § 4 feature visuals.
 *
 * Same accessibility contract as `SolutionsOverview/visuals/ArtBox` — the mockup
 * collapses to one labelled image, or is hidden outright when ornamental — and
 * the same container-query technique. It is a separate component for two
 * measured reasons rather than a copy:
 *
 *   RATIO. `ArtBox` is fixed at `--aspect-product-visual` (6:5), the two-up
 *   solution cards' frame. This is square.
 *
 *   [CHANGED, 2026-08-29] It was 3:2. At that ratio the artwork was a strip under
 *   a heading, which was fine while the card also carried an eyebrow, body copy
 *   and a link — the visual was one element among four. With those removed the
 *   artwork is the card, and a strip cannot carry it. Square is what makes it the
 *   thing you look at.
 *
 *   SCALE CANVAS. `pv-box` resolves `--pv` against a 491-wide canvas. These are
 *   authored against 400 by `pf-box`, because the same authored pixel has to
 *   produce legible type in a narrower box.
 *
 * Extending `ArtBox` with a ratio prop and a canvas prop was the alternative. It
 * would mean editing a shipped component that the homepage renders, to add two
 * axes for one caller — and the two boxes would still share nothing but a `div`
 * and an `aria` pair.
 *
 * ---------------------------------------------------------------------------
 * [ACCESSIBILITY] Every visual here is ornamental and none passes a label.
 *
 * The reason `ArtBox` records applies unchanged: unhidden, these subtrees
 * announce their contents as loose text. The rate card would read out four
 * exchange rates with no indication they are a picture, on a page where a visitor
 * may act on a number.
 *
 * [WEAKENED, 2026-08-29] The second half of that argument used to be that the
 * artwork's content is restated in the heading and body directly beneath it, so
 * describing it would repeat the card. The body copy is gone, so it is now the
 * heading alone — and the heading does not carry everything the artwork shows.
 *
 * The trade stands, because the alternative is worse: a `role="img"` label long
 * enough to cover four currencies, four live rates and eleven countries is a
 * paragraph read aloud in place of a picture. But the honest position is that
 * these cards now say less to a screen-reader user than they did, and § 5 is
 * where the facts that fell out should return as text.
 */

export type FeatureArtBoxProps = {
  children: ReactNode;
};

export function FeatureArtBox({ children }: FeatureArtBoxProps) {
  return (
    /*
      `flex-1` as well as the square ratio: the box claims every pixel the
      heading block leaves, and `aspect-square` is its floor rather than its size.
      Without it, three cards of differing heading length would leave three
      differently sized gaps under three identically sized visuals.
    */
    <div
      className="pf-box relative aspect-square w-full flex-1 overflow-hidden"
      aria-hidden
    >
      {children}
    </div>
  );
}
