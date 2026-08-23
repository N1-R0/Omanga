import { ArrowRight } from "@/components/icons/ArrowRight";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import type { CallToAction } from "@/types/content.types";

/**
 * The insurance hero's two calls to action.
 *
 * `tone="light"` on both — this band is flat white, unlike the homepage hero's
 * scrimmed photograph. The tone is passed explicitly so neither button infers
 * its surface.
 *
 * Hierarchy comes from the content module's tuple, not from here: the first
 * entry is the primary. Centred, because the copy above it is centred.
 *
 * The trailing arrow is on the primary only, matching `HeroActions`. It is
 * decorative and hidden from assistive technology by the icon itself.
 */

export type InsuranceHeroActionsProps = {
  actions: readonly [CallToAction, CallToAction];
};

export function InsuranceHeroActions({ actions }: InsuranceHeroActionsProps) {
  const [primary, secondary] = actions;

  return (
    <Stack direction="row" gap="lg" align="center" justify="center" isWrapping>
      <Button
        as="link"
        variant="primary"
        tone="light"
        href={primary.href}
        isExternal={primary.isExternal}
        trailingIcon={<ArrowRight size="sm" />}
      >
        {primary.label}
      </Button>

      <Button
        as="link"
        variant="secondary"
        tone="light"
        href={secondary.href}
        isExternal={secondary.isExternal}
      >
        {secondary.label}
      </Button>
    </Stack>
  );
}
