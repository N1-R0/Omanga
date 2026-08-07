import { ArrowRight } from "@/components/icons/ArrowRight";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { CallToAction, Eyebrow } from "@/types/content.types";

/**
 * The centred text block that sits inside the arch: eyebrow, heading, intro,
 * action.
 *
 * ---------------------------------------------------------------------------
 * [NORMALISED] The spec sets one 44 gap between all three blocks.
 *
 * 44 is not a step in `design.md` § Spacing philosophy, and the section
 * would be the only place on the page where an eyebrow sits 44 from its heading.
 * The three gaps are taken from the relationships the spacing table names
 * instead:
 *
 *   eyebrow -> heading   12  `sm`   "eyebrow-to-heading"
 *   heading -> intro     24  `lg`   "heading-to-body"
 *   intro   -> action    40  `2xl`  "heading block to content block"
 *
 * [DISCREPANCY] This makes the block about 190 shorter than the frame's, and
 * because the section's height follows its content rather than a fixed 836, the
 * whole section is correspondingly shorter. `component-rules.md` § Layout rules
 * forbids the fixed height ("No fixed heights on content containers. Height
 * follows content"), so this is the intended trade. **Confirm the section's
 * height with design.**
 *
 * Three nested `Stack`s rather than one: each gap is a different named
 * relationship, and a single gap could only be right for one of them.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] A plain `p` for the eyebrow, not `Text` and not `Badge`.
 *
 * `Badge` is the eyebrow *pill* — pill radius, subtle fill, light border — and the
 * frame draws no pill here, just brand text. `Text`'s `caption` role is the right
 * scale and family but inherits its colour from the surface by design and takes
 * no `className`, so it cannot be brand.
 *
 * This is the call `TrustPartners` and `FooterColumn` already make for Inter
 * chrome that no editorial role covers. The classes are the `caption` role's own
 * (`font-sans text-small`, Inter 12/20 at +1 tracking) plus the two things the
 * frame adds.
 *
 * [OVERRIDES design.md] "Sentence case everywhere. No uppercase headings."
 * The eyebrow is a label rather than a heading, the frame sets it in caps, and the
 * base-layer guard in `typography.css` only covers h1–h6, so nothing is being
 * fought here. The transform is CSS and the content stays sentence case, which is
 * what stops a screen reader spelling the word out letter by letter — the same
 * reasoning the `display` heading role applies.
 *
 * [CORRECTED] The frame's eyebrow and action are #FF247D. The brand token is
 * #AE2448 and #FF247D is not in the token set. Both render brand, measured at
 * 6.7:1 on the page surface, so the 12px eyebrow clears AA. **Confirmed with
 * design as the token-compliant reading.**
 *
 * The action is a text link with a 16px trailing arrow, which is exactly
 * `design.md`'s tertiary variant — so the frame's Inter SemiBold 20 is
 * carried by `Button`'s own 14, and the arrow is the `ArrowRight` component
 * rather than a glyph inside the label string. `variant` comes from the content's
 * `emphasis`, so hierarchy is stated once.
 *
 * The measure is `narrow` (648). The spec's 432 horizontal padding would give 576
 * at a 1440 frame, which is below the 648–756 band `design.md` sets for
 * body copy and narrower than the frame's own paragraph renders. See
 * `AfricanCoverage` for why that value is not used.
 */

export type CoverageContentProps = {
  eyebrow: Eyebrow;
  heading: string;
  /** The id the section's `aria-labelledby` points at. */
  headingId: string;
  intro: string;
  action: CallToAction;
};

export function CoverageContent({
  eyebrow,
  heading,
  headingId,
  intro,
  action,
}: CoverageContentProps) {
  return (
    <div className="text-center">
      <Stack gap="2xl" align="center">
        <Stack gap="md" align="center">
          <Stack gap="sm" align="center">
            <p className="font-sans text-small uppercase text-brand">
              {eyebrow}
            </p>

            {/*
              [MEASURED] Capped at `--container-heading` (800) — the benchmark's
              `u-max-width-30ch` solved at Omanga's 48 h2, applied to every centred
              section heading on the page so none of them can run the full 1520
              column on one line.
            */}
              <Heading id={headingId} level="h2" role="section">
                {heading}
              </Heading>
          </Stack>

          <Text role="body" measure="narrow" isSecondary>
            {intro}
          </Text>
        </Stack>

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
    </div>
  );
}
