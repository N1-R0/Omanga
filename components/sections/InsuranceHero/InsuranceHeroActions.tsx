import { ArrowRight } from "@/components/icons/ArrowRight";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import type { CallToAction } from "@/types/content.types";

/**
 * The hero's call to action.
 *
 * `tone="light"` — this band is flat white, unlike the homepage hero's scrimmed
 * photograph. The tone is passed explicitly so the button does not infer its
 * surface from a parent class.
 *
 * A link, not a button: it navigates, and button rules are explicit that "the
 * rendered element follows semantics: `button` for actions, `a` for navigation,
 * chosen by prop, never by styling".
 *
 * The trailing arrow matches `HeroActions` on the homepage. It is decorative and
 * hidden from assistive technology by the icon itself.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] One action, not two.
 *
 * Both pages that render this band dropped their secondary in the same change —
 * `/insurance` lost `Open Free Account`, `/payments` lost the `See how it works`
 * ghost — so the tuple this took is gone and the prop is a single value.
 *
 * The `Stack` stays, and it is not a wrapper that does nothing. The parent Stack
 * aligns its children `center`, but `Button` is `inline-flex` and owns no
 * layout by rule — "width is the parent's decision". Without a flex row here the
 * button is stretched by the column's cross-axis sizing and spans the measure.
 * `isWrapping` keeps it dropping rather than overflowing if the label ever
 * grows. Same arrangement, and the same reasoning, as `CTAActions`.
 */

export type InsuranceHeroActionsProps = {
  action: CallToAction;
};

export function InsuranceHeroActions({ action }: InsuranceHeroActionsProps) {
  return (
    <Stack direction="row" gap="lg" align="center" justify="center" isWrapping>
      <Button
        as="link"
        variant={action.emphasis}
        tone="light"
        href={action.href}
        isExternal={action.isExternal}
        trailingIcon={<ArrowRight size="sm" />}
      >
        {action.label}
      </Button>
    </Stack>
  );
}
