import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type { InsuranceCoverageContent } from "@/content/insurance-coverage.content";
import type { InsurancePlansContent } from "@/content/insurance-plans.content";
import type { HeadingLevel, Tone } from "@/types/ui.types";

import { ComparisonTable } from "./ComparisonTable";

/**
 * What each plan covers — spec § 6.1.
 *
 * [CHANGED] § 6.2 has moved out. The spec nests "Included on every plan" under
 * this heading as an `h3`; the Figma frame draws it as a standalone
 * three-column grid, so it is now `InsuranceInclusions` with its own `h2`. This
 * section is the comparison table and nothing else.
 *
 * The page's reference artefact: the table a visitor scrolls back to when
 * deciding between two tiers, and per spec § 11.3 its long-tail engine — every
 * row label is a real query and the table gives them structure prose cannot.
 *
 * The plans are read from the plans module rather than duplicated here, so the
 * three column headers and their buttons cannot drift from the three cards
 * above them.
 *
 * [DECISION] The anchor sits on a wrapper, not on the heading. `#coverage`
 * arrives from § 5's "see the full comparison" link and from `/insurance`, and
 * `scroll-mt-header` is what stops the target landing underneath the site's
 * sticky bar.
 */

const SECTION_TONE: Tone = "light";

/** Sits one level below the page's `h1`, which § 5's heading carries. */
const HEADING_LEVEL: HeadingLevel = "h2";

export type InsuranceCoverageProps = {
  content: InsuranceCoverageContent;
  plans: InsurancePlansContent["plans"];
  headingId: string;
};

export function InsuranceCoverage({
  content,
  plans,
  headingId,
}: InsuranceCoverageProps) {
  return (
    <div id={content.anchorId} className="scroll-mt-header">
      <Section labelledBy={headingId} tone={SECTION_TONE}>
        <Stack gap="4xl">
          <Reveal index={0}>
            <div className="text-center">
              <Stack gap="lg" align="center">
                <Heading id={headingId} level={HEADING_LEVEL} role="section">
                  {content.heading}
                </Heading>

                <Text role="body" measure="narrow" isSecondary>
                  {content.intro}
                </Text>
              </Stack>
            </div>
          </Reveal>

          <Reveal index={1}>
            <ComparisonTable
              rows={content.rows}
              plans={plans}
              featureColumnLabel={content.featureColumnLabel}
              tableLabel={content.tableLabel}
              scrollHint={content.scrollHint}
            />
          </Reveal>
        </Stack>
      </Section>
    </div>
  );
}
