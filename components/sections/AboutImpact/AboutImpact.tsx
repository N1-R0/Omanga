import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import type { AboutImpactContent } from "@/content/about-impact.content";
import type { Tone } from "@/types/ui.types";

import { ImpactTabs } from "./ImpactTabs";

/**
 * Our Impact — spec § 6, laid out from Figma node 2579:131863.
 *
 * A centred heading over one elevated panel: three pillar controls down its left
 * edge, the active pillar's photograph and statement to their right. The panel
 * changes on hover.
 *
 * The interactive part is `ImpactTabs` and only `ImpactTabs`. This wrapper, the
 * heading and every panel are Server Components — `"use client"` sits on "the
 * leaf that needs interactivity, never in a section wrapper", and here the leaf
 * is the tab list plus the one stateful container it needs.
 */

/**
 * [DEVIATION] Dark, where § 2's page-flow table asks for "Warm blush /
 * off-white".
 *
 * The reference node is `#161717`, which is `--color-ink`, and there is no blush
 * in this system — design.md § 8 lists one brand colour and four neutrals.
 *
 * More to the point, dark does the job § 5 assigns this surface better than
 * blush would. § 5 item on the skipped team section: removing it "puts a
 * two-phase timeline directly against a three-card grid… give Section 6 a clearly
 * different background treatment from Section 4 — the colour change carries the
 * transition that the removed section used to carry. Two adjacent near-whites
 * will not read as a break." § 4 is light. Ink is the largest break available,
 * and it also keeps the page alternating into the brand band at § 7.
 */
const SECTION_TONE: Tone = "dark";

export type AboutImpactProps = {
  content: AboutImpactContent;
  headingId: string;
};

export function AboutImpact({ content, headingId }: AboutImpactProps) {
  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      {/*
        `gap="4xl"` (40 → 64) between the heading and the panel. The reference's
        own value is 64, which is this token's wide end.
      */}
      <Stack gap="4xl">
        {/*
          MOTION. The heading enters, then the panel 80ms behind it — the same
          two-step arrival `ProductDeepDive` uses for a heading over a tab set.
          `Reveal` runs once, so it never competes with the panel's own state
          changes.
        */}
        <Reveal index={0}>
          {/*
            `text-center` is declared once here and inherits. § 6 allows either
            alignment — "Section H2, left- or centre-aligned per the Omanga grid"
            — and the reference centres it, which also matches §§ 4 and 7.

            [NOTE] The reference sets this heading at 48px. `role="section"` is
            `--text-h2` at 32 → 42, which design.md § 2 took down from the
            benchmark's 48 deliberately: Omanga's section headings "run to three
            and five lines in a column, where 48 stopped reading as a heading and
            started reading as a wall". The system's value ships.
          */}
          <div className="text-center">
            <Stack gap="lg" align="center">
              <Heading id={headingId} level="h2" role="section">
                {content.heading}
              </Heading>
            </Stack>
          </div>
        </Reveal>

        <Reveal index={1}>
          {/*
            The tab list is named by this section's heading, which is what gives
            it an accessible name without inventing an `aria-label` that would be
            user-facing copy outside a content module.
          */}
          <ImpactTabs pillars={content.pillars} labelledBy={headingId} />
        </Reveal>
      </Stack>
    </Section>
  );
}
