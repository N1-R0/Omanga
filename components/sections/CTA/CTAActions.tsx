import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import type { CallToAction } from "@/types/content.types";

/**
 * The band's two calls to action.
 *
 * Both are links, not buttons — they navigate, and `button rules` are explicit
 * that "the rendered element follows semantics: `button` for actions, `a` for
 * navigation, chosen by prop, never by styling".
 *
 * `tone="brand"` on both, which is what selects the treatments
 * `design-system.md` defines for this surface: a white fill with a brand label for
 * the primary, and "Secondary on brand | White @ 10% | 0.5px white | White |
 * Inside the CTA band only" for the secondary. The tone is passed explicitly, so
 * neither button infers the surface from a parent class.
 *
 * ---------------------------------------------------------------------------
 * [NORMALISED] The frame draws two outlined siblings at 12 radius in Inter Medium
 * 16, and `design-system.md` § Button variants names all three as defects to fix:
 *
 *   "**⚠** CTA-band buttons use 12 radius and Inter Medium 16 in Figma. Normalize
 *   to pill + Inter SemiBold 14 like every other button, and give the band one
 *   filled primary instead of two outlined siblings."
 *
 * All three corrections come from the `Button` primitive rather than from
 * anything here: it is pill by default, Inter SemiBold 14 by default, and the
 * hierarchy arrives from the content module's tuple. So the band's primary is
 * filled and the secondary is outlined, and this component decides neither.
 *
 * The primary's brand label on its white fill measures 6.7:1, and the secondary's
 * white label and 1px white border sit on the brand surface at 6.7:1 — all clear
 * AA, text and non-text alike.
 *
 * No trailing arrows. The frame draws none on this band, and the hero's arrow is
 * specific to the hero.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] The shared focus ring is invisible on this surface.
 *
 * `--focus-ring-color` is `--color-brand`, and `design-system.md` requires it
 * everywhere: "Focus rings are identical across buttons, links, tabs and inputs"
 * and "Focus: 2px brand outline, 2px offset, on every variant". On the brand band
 * that is brand-on-brand — **measured 1.00:1** — so both of these buttons take
 * focus with no visible indicator at all. That fails WCAG 2.4.7 and 1.4.11 on the
 * page's most important conversion control.
 *
 * Not fixed here, deliberately. `focus-ring` is one global utility applied by every
 * interactive primitive; overriding it for this section would break the identical-
 * ring rule, and changing the token would repaint focus across the whole site.
 * Both are design-system decisions rather than section ones.
 *
 * The minimal fix is a surface-aware ring — the ring resolving to `--color-on-dark`
 * on the brand and dark surfaces and staying brand on light — which is one
 * addition to the token layer and one line in the `focus-ring` utility.
 * **Needs a design-system decision before this section can claim AA.**
 */

export type CTAActionsProps = {
  actions: readonly [CallToAction, CallToAction];
};

export function CTAActions({ actions }: CTAActionsProps) {
  const [primary, secondary] = actions;

  return (
    /*
      Mobile: a full-width stack. § Breakpoints is specific — "Buttons full-width,
      stacked at 12 gap" — and `align="stretch"` is how they fill the column
      without either knowing it should, since `Button` deliberately has no
      `fullWidth` prop.

      Tablet and up: a left-aligned row, matching the frame's left-aligned block.
      12 is the "adjacent buttons" step.
    */
    <Stack direction="column-to-row" gap="sm" align="stretch" justify="start">
      <Button
        as="link"
        variant={primary.emphasis}
        tone="brand"
        href={primary.href}
        isExternal={primary.isExternal}
      >
        {primary.label}
      </Button>

      <Button
        as="link"
        variant={secondary.emphasis}
        tone="brand"
        href={secondary.href}
        isExternal={secondary.isExternal}
      >
        {secondary.label}
      </Button>
    </Stack>
  );
}
