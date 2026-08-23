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

/**
 * Choose your plan — spec § 5, as the opening section of `/plans`.
 *
 * Selection, not comparison. Three cards, a centred heading block above them,
 * and one line beneath carrying the universal inclusions and the link to the
 * comparison table further down the page.
 *
 * ---------------------------------------------------------------------------
 * [PROVISIONAL] This heading is the page's `h1`.
 *
 * § 5 is an `h2` in the spec, sitting under the insurance page's `h1`. On a
 * standalone page something has to take the top level, and the page has no hero
 * — so "Choose your plan" is promoted and the three tier names follow as `h2`s
 * rather than the spec's `h3`s. No level is skipped and the page has exactly one
 * `h1`, which is the part that matters.
 *
 * Reversible in one prop pair if a hero is added above this band: the heading
 * drops to `h2` and the cards to `h3`, back to § 11.2's structure. Recorded
 * because "the page's h1" is the kind of decision that should not be discovered
 * later by reading the markup.
 */

const SECTION_TONE: Tone = "light";

/** The tier names sit one level below this section's heading. */
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
          {/*
            `gap="2xl"` is the system's card-grid step (32 → 40). Equal height is
            `Grid`'s default and is what the cards need: `Card` pushes its copy
            block to the foot, so three cards of unequal description length still
            finish with their buttons on one line.
          */}
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
              {/*
                The five inclusions every plan carries, stated once here rather
                than repeated down three cards — the same simplification § 5
                applies to the rest of the card content.
              */}
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
