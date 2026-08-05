import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

/**
 * The one card shell.
 *
 * card rules: "One card shell provides surface, radius, padding, and border.
 * Variants change surface only." Everything structural — the region order, the
 * equal-height behaviour, the bottom-aligned action — is fixed here so a row
 * of cards cannot drift out of alignment.
 *
 * Regions are slots rather than children, and that is deliberate. Children
 * would let a caller put the action above the heading; slots make the order
 * media → eyebrow → heading → body → action unrepresentable any other way.
 *
 * Cards never nest, carry no outer spacing (the grid owns gaps), and take no
 * `className`. Emphasis is a border, never a shadow or a scale.
 */

/**
 * The six card surfaces in design-system.md § Card variants.
 *
 * Padding differs between them because the design specifies it — 24 on product
 * cards, 32 on comparison cards, 16 on stat chips, 0 on media plates — not
 * because a caller may choose.
 */
type CardVariant =
  /** Brand fill. The primary product card, and the only long-form brand surface. */
  | "product-primary"
  /** #F6F6F6. The sibling product card. Same structure, different surface. */
  | "product-secondary"
  /** #2D2E2E on a dark section. Carries the subtle white border. */
  | "comparison"
  /** Comparison card with the 5px brand emphasis border. */
  | "comparison-emphasis"
  /** #F6F6F6, 12 radius. A figure and a label on one line. */
  | "stat"
  /** #F6F6F6, 16 radius, no padding. Holds a mockup, illustration or Lottie. */
  | "media-plate";

/**
 * [NORMALISED] The emphasised comparison card has a 5px brand border in Figma
 * and 37px padding to compensate for it. With `box-sizing: border-box` — set
 * globally in globals.css — the compensation is unnecessary, so it ships at
 * the same 32 padding as its sibling. That is what keeps the two cards' content
 * on the same baseline, which the compensation was working around rather than
 * fixing.
 */
/**
 * [MEASURED from the structural benchmark] Product cards are padded 24 on three
 * sides and 32 at the bottom, not 24 all round.
 *
 * design-system.md § Card variants gives one figure — "Padding | 24" — and the
 * benchmark's own card rule gives three: `padding: 1.5rem 1.5rem 2rem`. The
 * extra 8 at the bottom is what stops the action pill sitting tight against the
 * card's lower edge once the text block is pushed down there, and it is the
 * reason the benchmark's cards read as settled rather than crowded. Both values
 * are on the 4px grid and both are named steps, so this is a correction to the
 * figure rather than a new value.
 *
 * Only the two product variants take it. Comparison cards, stat chips and media
 * plates are symmetrical in both the design file and the benchmark.
 */
const VARIANT_CLASS: Readonly<Record<CardVariant, string>> = {
  "product-primary": "rounded-card bg-brand px-6 pt-6 pb-8 text-on-dark",
  "product-secondary":
    "rounded-card bg-surface-light px-6 pt-6 pb-8 text-ink",
  comparison:
    "rounded-panel border border-border-subtle bg-ink-elevated p-8 text-on-dark",
  "comparison-emphasis":
    "rounded-panel border-emphasis border-brand bg-ink-elevated p-8 text-on-dark",
  stat: "rounded-chip bg-surface-light p-4 text-ink",
  "media-plate": "rounded-panel bg-surface-light",
} as const;

export type CardProps = {
  variant: CardVariant;
  /** Image, mockup or illustration. Always first. */
  media?: ReactNode;
  /** The eyebrow pill. */
  eyebrow?: ReactNode;
  /** The card's heading. */
  heading?: ReactNode;
  /** Body copy and any list rows. */
  body?: ReactNode;
  /**
   * One action, maximum. It sits at the foot of the copy block, and the whole
   * block is pushed to the bottom of the card — so actions line up across a row
   * regardless of how much body copy each card carries, which is also how
   * content-length variation is handled without truncation.
   */
  action?: ReactNode;
};

export function Card({
  variant,
  media,
  eyebrow,
  heading,
  body,
  action,
}: CardProps) {
  const hasMedia = media !== undefined;
  const hasCopy =
    eyebrow !== undefined ||
    heading !== undefined ||
    body !== undefined ||
    action !== undefined;

  return (
    /*
      [MEASURED] 32 between the art and the copy block, not 24.

      The benchmark's card puts `margin-bottom: 32` under its art box and 24
      between the rows inside the copy block. One `gap-6` for both — the previous
      behaviour — spaced the art exactly as tightly as two lines of text, which is
      what made the art read as part of the copy rather than as the card's
      subject. The copy block below keeps 24 for its own rows.
    */
    <div className={cx("flex h-full flex-col gap-8", VARIANT_CLASS[variant])}>
      {media}

      {/*
        [CHANGED] The copy block is one unit, and it is the block — not just the
        action — that goes to the bottom.

        The benchmark card is `display: flex; flex-flow: column;
        justify-content: space-between`, which puts the art at the top of the
        card and the whole eyebrow / heading / body / action group at the
        bottom, with the free space between them. Bottom-aligning the action
        alone (the previous behaviour) left the heading and body floating
        directly under the art with the slack below them, which is the opposite
        arrangement.

        `mt-auto` is the one sanctioned margin in the system: it is not spacing,
        it is the mechanism that produces `space-between` without a second
        justification value fighting the `gap`. It is applied only when there is
        art above it — with no media the block is the card's only child, and
        pushing it down would strand a stat chip's figure at the foot of a
        stretched grid cell.
      */}
      {hasCopy && (
        /*
          [MEASURED] 32 above the action, 24 between the text rows.

          The benchmark gives its action group `margin-top: 32` while the rows
          above it sit at 24. That is two different relationships, so it is two
          groups here rather than one gap value doing both jobs — which is also
          what keeps the action from reading as one more line of copy.
        */
        <div className={cx("flex flex-col gap-8", hasMedia && "mt-auto")}>
          {/*
            The eyebrow and the action are wrapped; the heading and body are not.

            Flex blockifies its items, so an `inline-flex` `Badge` or `Button`
            placed directly here would be stretched to the card's full width by
            the column's default cross-axis `stretch` — which would make a pill
            span the card and would put layout inside a primitive that is
            explicitly forbidden from owning it ("Buttons never own layout ...
            width is the parent's decision"). A plain block wrapper restores the
            content width.

            `items-start` would do the same job for these two and break the other
            two: `heading` and `body` need to fill the card so their text wraps
            at the card's edge rather than at its longest word.
          */}
          <div className="flex flex-col gap-6">
            {eyebrow !== undefined && <div>{eyebrow}</div>}
            {heading}
            {body}
          </div>

          {action !== undefined && <div>{action}</div>}
        </div>
      )}
    </div>
  );
}
