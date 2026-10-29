import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import type { InsurancePlansContent } from "@/content/insurance-plans.content";
import type { HeadingLevel, Tone } from "@/types/ui.types";

import { PlanCard } from "./PlanCard";

const SECTION_TONE: Tone = "light";

const HEADING_LEVEL: HeadingLevel = "h1";
const CARD_HEADING_LEVEL: HeadingLevel = "h2";

export type InsurancePlansProps = {
  content: InsurancePlansContent;
  headingId: string;
};

export function InsurancePlans({ content, headingId }: InsurancePlansProps) {
  return (
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
          <Grid columns={3} gap="2xl">
            {content.plans.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                labels={content}
                headingLevel={CARD_HEADING_LEVEL}
                headingId={`plan-${plan.name.toLowerCase()}-heading`}
              />
            ))}
          </Grid>
        </Reveal>

        <Reveal index={2}>
          <div className="text-center">
            <Stack gap="md" align="center">
              <Text role="small" measure="narrow" isSecondary>
                {content.footnote}
              </Text>

              <TextLink href={content.action.href} tone={SECTION_TONE}>
                {content.action.label}
              </TextLink>
            </Stack>
          </div>
        </Reveal>
      </Stack>
    </Section>
  );
}
