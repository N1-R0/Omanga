import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/icons/ArrowRight";
import type { CallToAction } from "@/types/content.types";

/**
 * The hero's two calls to action.
 *
 * Both are links, not buttons — they navigate, and button rules are explicit
 * that "the rendered element follows semantics: `button` for actions, `a` for
 * navigation, chosen by prop, never by styling".
 *
 * `tone="dark"` on both, because the surface is scrimmed photography. The tone
 * is passed explicitly rather than inferred, so neither button has to know what
 * is behind it.
 *
 * The hierarchy comes from the content module, not from this component: the
 * tuple's first entry is the primary. Nothing here decides which button matters
 * more, which keeps "one primary per section" a property of the approved content
 * rather than of the markup.
 *
 * ---------------------------------------------------------------------------
 * [REDESIGNED] Left-aligned, and no longer full-width on mobile.
 *
 * The group used to be centred and, below tablet, stretched to a capped 288px
 * column. Both are gone:
 *
 *   - `justify="start"` puts the row on the same left edge as the headline
 *     above it and every section heading below it.
 *   - `align="start"` sizes each button to its own label instead of stretching
 *     it. A full-width pill reads as a banner, and two stacked full-width pills
 *     read as a menu — neither reads as "the one thing to do next". `flex-wrap`
 *     means the pair still drops to two lines at 320 rather than overflowing,
 *     but each stays its own natural size when it does.
 *
 * `gap="lg"` (20 → 24) is the reference's button-group gap, measured at 24.
 */

export type HeroActionsProps = {
  actions: readonly [CallToAction, CallToAction];
};

export function HeroActions({ actions }: HeroActionsProps) {
  const [primary, secondary] = actions;

  return (
    <Stack
      direction="row"
      gap="lg"
      align="start"
      justify="start"
      isWrapping
    >
      <Button
        as="link"
        variant="primary"
        tone="dark"
        href={primary.href}
        isExternal={primary.isExternal}
        /*
          Decorative: it takes no label, so it is hidden from assistive
          technology and the button's text carries the meaning.
        */
        trailingIcon={<ArrowRight size="sm" />}
      >
        {primary.label}
      </Button>

      <Button
        as="link"
        variant="secondary"
        tone="dark"
        href={secondary.href}
        isExternal={secondary.isExternal}
      >
        {secondary.label}
      </Button>
    </Stack>
  );
}
