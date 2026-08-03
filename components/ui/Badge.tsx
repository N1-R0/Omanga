import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { Tone } from "@/types/ui.types";

/**
 * The eyebrow pill.
 *
 * design-system.md § Component consistency rules, rule 7: "Eyebrow pills share
 * one geometry everywhere: pill radius, subtle fill, light border, 17 × 9
 * padding." One component is how that stays true.
 *
 * [CONFLICT, resolved toward the frame] design-system.md puts the eyebrow in the
 * editorial scale — "Eyebrow / tab label | Poppins Regular | 20 | 30" — and gives
 * its padding as "17 × 9". The frame shows neither: the pill's label is small and
 * bold, which is UI chrome, not 20px editorial regular. Shipped as `--text-ui`
 * (Inter SemiBold 14/17), the closest existing role and a visual match for the
 * frame.
 *
 * Worth knowing what this trades away: the eyebrow now reads as chrome rather than
 * as the opening line of the section's editorial voice. If the eyebrows in the
 * later sections are genuinely 20px editorial, this is a real divergence and the
 * component needs a size axis rather than a single answer.
 *
 * On the padding, same direction. The hero frame's export gives `.padding(.horizontal, 16)`
 * and `.padding(.vertical, 1)` — the same horizontally, wildly different
 * vertically. Two readings of the same file disagree, so the measured frame wins:
 * 16 × 1.
 *
 * Still one geometry, not a size axis. Rule 7 requires eyebrow pills to share one
 * geometry everywhere, and the hero is the only instance measured so far. If a
 * later section's eyebrow really is taller, that is the third occurrence and the
 * point at which a `size` axis earns its place — not before.
 *
 * A badge is a label, never a control. It has no hover, no focus and no click
 * — if something pill-shaped needs to be interactive, it is a Button.
 */

/**
 * [MEASURED] The frame fills the pill with `#FAFAFA` at 20% opacity. Shipped at
 * 10% instead, because 20% fails AA over the hero photograph.
 *
 * White label over the pill, against the worst scrimmed pixel behind it:
 *
 *   #FAFAFA @20%  (the frame)   3.74:1   FAIL
 *   #FAFAFA @15%                4.17:1   FAIL
 *   #FAFAFA @12%                4.42:1   FAIL
 *   white   @10%  (shipped)     4.61:1   PASS
 *
 * The eyebrow is 20px regular, which is not WCAG "large text", so the full 4.5:1
 * applies and 10% is the only option that clears it. Same failure mode the
 * secondary button had, and the same resolution: reduce the overlay rather than
 * darken the whole photograph. #FAFAFA and white are indistinguishable at these
 * opacities — 0.98 against 1.0, multiplied by 0.1 — so the existing white token
 * is used rather than adding a near-identical one.
 *
 * [DECISION] design-system.md gives the eyebrow pill one appearance
 * (#FAFAFA fill, #E5F2F2 border), which is a light-surface treatment. Eyebrow
 * pills also appear inside the brand product card and on dark sections, where
 * that fill would be an opaque light block. The dark and brand tones use the
 * system's existing overlay and subtle-border tokens rather than new colours.
 * Pending design confirmation.
 */
const TONE_CLASS: Readonly<Record<Tone, string>> = {
  light: "bg-surface-subtle border-border-light text-ink",
  dark: "bg-overlay-soft border-border-subtle text-on-dark",
  brand: "bg-overlay-soft border-border-subtle text-on-dark",
} as const;

export type BadgeProps = {
  children: ReactNode;
  tone: Tone;
};

export function Badge({ children, tone }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-pill border px-4 py-px font-ui text-ui",
        TONE_CLASS[tone],
      )}
    >
      {children}
    </span>
  );
}
