import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/icons/ArrowRight";
import type { CallToAction } from "@/types/content.types";

/**
 * The hero's two calls to action.
 *
 * Both are links, not buttons — they navigate to `/payments` and `/insurance`,
 * and button rules are explicit that "the rendered element follows semantics:
 * `button` for actions, `a` for navigation, chosen by prop, never by styling".
 *
 * `tone="dark"` on both, because the surface is scrimmed photography. That is
 * what selects the treatment design-system.md defines for exactly this
 * situation: "Secondary on dark | White @ 20% | 1px white | White | Beside a
 * primary over photography". The tone is passed explicitly rather than inferred,
 * so neither button has to know what is behind it.
 *
 * The hierarchy comes from the content module, not from this component: the
 * tuple's first entry is the primary. Nothing here decides which button matters
 * more, which is what keeps rule 3 — one primary per section — a property of the
 * approved content rather than of the markup.
 */

export type HeroActionsProps = {
  actions: readonly [CallToAction, CallToAction];
};

export function HeroActions({ actions }: HeroActionsProps) {
  const [primary, secondary] = actions;

  return (
    /*
      Mobile: a stacked pair at 12 gap, per design-system.md § Breakpoints, with
      `align="stretch"` filling the width without either button knowing it should —
      `Button` deliberately has no `fullWidth` prop.

      "Full-width" is now the width of the capped group `HeroContent` provides
      rather than the width of the whole column. Both buttons still come out equal,
      which is the part of the rule that matters; what changed is that the size no
      longer varies with the viewport or the label.

      Tablet and up: a centred row. `justify="center"` matches the Figma frame,
      whose whole content stack is centre-aligned.
    */
    <Stack
      direction="column-to-row"
      gap="sm"
      align="stretch"
      justify="center"
    >
      <Button
        as="link"
        variant="primary"
        tone="dark"
        href={primary.href}
        /*
          The trailing arrow is in the Figma frame, and it is the only directional
          glyph the system permits. Decorative: it takes no label, so it is hidden
          from assistive technology and the button's text carries the meaning.
        */
        trailingIcon={<ArrowRight size="sm" />}
      >
        {primary.label}
      </Button>

      <Button as="link" variant="secondary" tone="dark" href={secondary.href}>
        {secondary.label}
      </Button>
    </Stack>
  );
}
