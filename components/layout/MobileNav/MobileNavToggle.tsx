import { cx } from "@/lib/cx";
import type { Tone } from "@/types/ui.types";

/**
 * The hamburger, and the same control as the panel's close button.
 *
 * One button rather than two: the thing that opens the menu is the thing that
 * closes it, so its position never moves under the user's thumb and there is one
 * `aria-expanded` telling the truth about one piece of state.
 *
 * The three bars are elements rather than an icon swap because the open and
 * closed forms have to be the *same* three shapes moving — swapping one glyph
 * for another gives no continuity, and the morph is transform and opacity only,
 * which is the one property class the motion rules allow.
 *
 * The label is text, not a title on a glyph, and it changes with state. An
 * icon-only control needs an accessible name, and "Menu" would not tell the user
 * what activating it does.
 */

/** 2px bar, 20 wide, 4 apart — so the collapse distance is exactly 6. */
const BAR_CLASS = "block h-0.5 w-5 bg-current transition-emphasis";

/**
 * The bars are `bg-current`, so they inherit whatever colour the button resolves
 * to and only the button needs a tone. One place to change, and the bars can never
 * disagree with the label they belong to.
 */
const TONE_CLASS: Readonly<Record<Tone, string>> = {
  light: "text-ink hover:text-brand",
  dark: "text-on-dark hover:text-on-dark",
  brand: "text-on-dark hover:text-on-dark",
} as const;

export type MobileNavToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
  /** The id of the panel this controls, for `aria-controls`. */
  panelId: string;
  openLabel: string;
  closeLabel: string;
  tone: Tone;
};

export function MobileNavToggle({
  isOpen,
  onToggle,
  panelId,
  openLabel,
  closeLabel,
  tone,
}: MobileNavToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={panelId}
      aria-label={isOpen ? closeLabel : openLabel}
      className={cx(
        "inline-flex flex-col items-center justify-center gap-1 rounded-pill hit-area focus-ring transition-standard",
        TONE_CLASS[tone],
      )}
    >
      {/*
        Each bar is decorative — the button's own label carries the meaning — so
        none of them is exposed to assistive technology.

        The rotations happen after the translate in the same transform, which is
        what makes the two bars cross at the centre rather than pivoting from
        where they started.
      */}
      <span
        aria-hidden
        className={cx(BAR_CLASS, isOpen && "translate-y-1.5 rotate-45")}
      />
      <span aria-hidden className={cx(BAR_CLASS, isOpen && "opacity-0")} />
      <span
        aria-hidden
        className={cx(BAR_CLASS, isOpen && "-translate-y-1.5 -rotate-45")}
      />
    </button>
  );
}
