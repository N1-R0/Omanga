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
 * `design.md` defines for this surface: a white fill with a brand label for
 * the primary, and "Secondary on brand | White @ 10% | 0.5px white | White |
 * Inside the CTA band only" for the secondary. The tone is passed explicitly, so
 * neither button infers the surface from a parent class.
 *
 * ---------------------------------------------------------------------------
 * [NORMALISED] The frame draws two outlined siblings at 12 radius in Inter Medium
 * 16, and `design.md` § Button variants names all three as defects to fix:
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
 * [RESOLVED] The focus ring used to be invisible on this surface.
 *
 * `--focus-ring-color` was `--color-brand` on every surface, which on the brand
 * band is brand-on-brand — measured 1.00:1 — so this button, the page's most
 * important conversion control, took focus with no visible indicator at all.
 * WCAG 2.4.7 and 1.4.11, both failed.
 *
 * Fixed in the design system rather than here: `Section` now sets the ring colour
 * from its `tone`, exactly as it already sets text colour, and this band inherits
 * white at 6.70:1. The ring is still one ring — same width, same offset, same
 * geometry everywhere — and no component overrides it. See the
 * `focus-ring-on-*` utilities in `styles/utilities.css` for the measurements on
 * all three surfaces.
 */

export type CTAActionsProps = {
  action: CallToAction;
};

export function CTAActions({ action }: CTAActionsProps) {
  return (
    /*
      Centred at every width, under the centred copy above it.

      [CHANGED] It no longer stretches to full width below tablet. A pill that
      spans the viewport reads as a banner rather than as a button, and it is the
      one control in the band — it should look like a decision, not like a bar.
      `align="center"` sizes it to its own label instead; `isWrapping` means it
      still drops rather than overflowing if the label ever grows.
    */
    <Stack direction="row" gap="lg" align="center" justify="center" isWrapping>
      <Button
        as="link"
        variant={action.emphasis}
        tone="brand"
        href={action.href}
        isExternal={action.isExternal}
      >
        {action.label}
      </Button>
    </Stack>
  );
}
