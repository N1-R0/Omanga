import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import type { CallToAction } from "@/types/content.types";

import { CTAActions } from "./CTAActions";

/**
 * The band's copy block: one heading and the two actions.
 *
 * ---------------------------------------------------------------------------
 * MEASURE. Capped at 486 — `measure-feature`, the narrowest of the three caps
 * `design-system.md` defines. It is doing two jobs at once.
 *
 * It keeps the copy clear of the artwork, which is anchored to the right and
 * finishes no further left than 454. And it reproduces the frame's line break
 * exactly: measured off the screenshot, "experience Africa?" sets at about 472 and
 * "Ready to experience" at about 500, so any cap between those two breaks the
 * heading after "Ready to" the way the frame does. 486 is the only token in that
 * window.
 *
 * That is why the cap is a token rather than a measured value — the break is a
 * consequence of the type scale, not something this component asserts.
 *
 * `relative` is what puts the copy above the artwork. Both are positioned and
 * neither carries a z-index, so they paint in DOM order and the copy comes second
 * in `CTA`. No z-index rung is spent on a two-layer stack.
 *
 * ---------------------------------------------------------------------------
 * [DISCREPANCY] The frame sets the heading noticeably heavier than the page's
 * other section headings. `design-system.md` § Component consistency rules, rule 2:
 * "One H2 size for every section heading. Section headings never vary in size,
 * weight or case between sections." So it renders at the `section` role like every
 * other one. **Confirm the weight with design** — if the band really is meant to
 * shout, that is a change to the type scale, not to this section.
 *
 * The 32 between the heading and the actions is the "section heading to intro"
 * step, which is the nearest named relationship — the frame measures about 30, and
 * there is no intro here for the actions to displace.
 *
 * `align` is left at its `stretch` default rather than set to `start`: `start`
 * would shrink the actions row to its content and lose the full-width mobile
 * buttons § Breakpoints asks for. The heading is left-aligned either way.
 *
 * MOTION. The heading enters, then the actions 80ms behind it, once on
 * intersection, through the same `Reveal` primitive and the same tokens the rest
 * of the page uses. The artwork does not animate — it is a background, and
 * `design-system.md` § Motion principles reserves entrance for content.
 */

export type CTAContentProps = {
  heading: string;
  /** The id the section's `aria-labelledby` points at. */
  headingId: string;
  actions: readonly [CallToAction, CallToAction];
};

export function CTAContent({ heading, headingId, actions }: CTAContentProps) {
  return (
    <div className="relative measure-feature">
      <Stack gap="xl">
        <Reveal index={0}>
          <Heading id={headingId} level="h2" role="section">
            {heading}
          </Heading>
        </Reveal>

        <Reveal index={1}>
          <CTAActions actions={actions} />
        </Reveal>
      </Stack>
    </div>
  );
}
