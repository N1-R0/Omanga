import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type { InsuranceCoverageContent } from "@/content/insurance-coverage.content";
import type { InsurancePlansContent } from "@/content/insurance-plans.content";
import type { HeadingLevel, Tone } from "@/types/ui.types";

import { ComparisonTable } from "./ComparisonTable";
import { PlanSwitcher } from "./PlanSwitcher";

const SECTION_TONE: Tone = "light";

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
    <div id={content.anchorId} className="scroll-mt-19">
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
            <div className="md:hidden">
              <PlanSwitcher rows={content.rows} plans={plans} label={content.tableLabel} />
            </div>
            <div className="hidden md:block">
              <ComparisonTable
                rows={content.rows}
                plans={plans}
                featureColumnLabel={content.featureColumnLabel}
                tableLabel={content.tableLabel}
                scrollHint={content.scrollHint}
              />
            </div>
          </Reveal>
        </Stack>
      </Section>
    </div>
  );
}
