import type { ComponentType } from "react";

import { Globe } from "@/components/icons/Globe";
import { Headset } from "@/components/icons/Headset";
import { Newspaper } from "@/components/icons/Newspaper";
import { Smartphone } from "@/components/icons/Smartphone";
import { Video } from "@/components/icons/Video";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type {
  Inclusion,
  InsuranceInclusionsContent,
} from "@/content/insurance-inclusions.content";
import type { HeadingLevel, IconSize, Tone } from "@/types/ui.types";

/**
 * Included on every plan — spec § 6.2, built to the Figma frame.
 *
 * A three-column feature grid: an icon, the term, and one line of secondary
 * copy. Left-aligned, no card, no border — the frame's point is that these are
 * facts rather than offers, so they get no surface of their own.
 *
 * ---------------------------------------------------------------------------
 * [ADDED] The frame has no heading; this section has one.
 *
 * The node starts at the grid. A `section` with no accessible name is announced
 * as an unlabelled region a screen-reader user has to enter to identify, so the
 * spec's own § 6.2 sub-heading is promoted to the section's `h2` rather than a
 * new string being written. It is approved copy either way.
 *
 * ---------------------------------------------------------------------------
 * [NORMALISED from the frame]
 *
 *   - Inter Regular 24 / 16 at `#1a1a1a` and `#928c97` → `role="feature"`
 *     (24 → 28) and `role="body"` secondary, which is the system's 80%-opacity
 *     treatment rather than a second grey.
 *   - The frame's `0.18px` tracking is dropped. design.md § 1 rule 2 allows two
 *     tracking values, `0` and `-0.03em`, "and no positive tracking anywhere".
 *   - Icons at 40 → `lg` (32). design.md § 9: "16, 24 or 32. Nothing between."
 *   - The frame positions every element absolutely inside a fixed 181px box.
 *     That is a Webflow export artefact, not a design decision — it clips the
 *     moment a term wraps, which "24/7 dedicated contact centre" already does
 *     below desktop. Flowed instead.
 */

const SECTION_TONE: Tone = "light";

/** Sits one level below the page's `h1`, which § 5's heading carries. */
const HEADING_LEVEL: HeadingLevel = "h2";
const TERM_LEVEL: HeadingLevel = "h3";

const ICON_SIZE: IconSize = "lg";

type Glyph = ComponentType<{ size: IconSize; label?: string }>;

/**
 * Which glyph goes with which inclusion.
 *
 * Here rather than in the content module, for the reason `SolutionCard` gives
 * about its own presentation prop: an icon is a design treatment, not copy. The
 * map is keyed by the content's stable `id`, so renaming a term cannot silently
 * change its icon.
 *
 * All five are decorative. The term is stated in text directly beneath each
 * one, so a label would have every glyph announced twice.
 */
const GLYPH: Readonly<Record<string, Glyph>> = {
  telemedicine: Video,
  roaming: Globe,
  "contact-centre": Headset,
  newsletter: Newspaper,
  "mobile-app": Smartphone,
} as const;

export type InsuranceInclusionsProps = {
  content: InsuranceInclusionsContent;
  headingId: string;
};

export function InsuranceInclusions({
  content,
  headingId,
}: InsuranceInclusionsProps) {
  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      <Stack gap="4xl">
        <Reveal index={0}>
          <Heading id={headingId} level={HEADING_LEVEL} role="section">
            {content.heading}
          </Heading>
        </Reveal>

        <Reveal index={1}>
          {/*
            `isEqualHeight={false}`. These are not cards and nothing is aligned
            across the row — stretching them would only stretch invisible boxes.
          */}
          <Grid columns={3} gap="3xl" isEqualHeight={false}>
            {content.inclusions.map((inclusion) => (
              <InclusionItem
                key={inclusion.id}
                inclusion={inclusion}
                termLevel={TERM_LEVEL}
              />
            ))}
          </Grid>
        </Reveal>
      </Stack>
    </Section>
  );
}

/**
 * One inclusion. Not exported — it exists only inside this grid and has no
 * second caller, so hoisting it would generalise for a use case that does not
 * exist.
 */
function InclusionItem({
  inclusion,
  termLevel,
}: {
  inclusion: Inclusion;
  termLevel: HeadingLevel;
}) {
  const Mark = GLYPH[inclusion.id];

  return (
    <Stack gap="lg" align="start">
      {/*
        Absent rather than substituted if a sixth inclusion arrives without a
        glyph — a wrong icon is worse than none, which is the whole reason the
        frame's own five were replaced.
      */}
      {Mark !== undefined && <Mark size={ICON_SIZE} />}

      <Stack gap="md">
        <Heading
          id={`inclusion-${inclusion.id}`}
          level={termLevel}
          role="feature"
          measure="none"
        >
          {inclusion.term}
        </Heading>

        <Text role="body" measure="feature" isSecondary>
          {inclusion.description}
        </Text>
      </Stack>
    </Stack>
  );
}
