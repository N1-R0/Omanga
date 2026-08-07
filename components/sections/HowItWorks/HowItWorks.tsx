import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { HowItWorksContent } from "@/content/how-it-works.content";
import type { Tone } from "@/types/ui.types";

import { Timeline } from "./Timeline";

// Light, alternating with the dark Product Deep Dive above it.
const SECTION_TONE: Tone = "light";

export type HowItWorksProps = {
  content: HowItWorksContent;
  headingId: string;
};

export function HowItWorks({ content, headingId }: HowItWorksProps) {
  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      <Stack gap="4xl">
        <div className="text-center">
          <Stack gap="xl" align="center">
            <Badge tone={SECTION_TONE}>{content.eyebrow}</Badge>

            {/*
              [MEASURED] Capped at `--container-heading` (800), which is the
              benchmark's `u-max-width-30ch` on every one of its section headings
              solved at Omanga's 48 h2. Uncapped, a long heading sets one line
              across the whole 1520 column — roughly twice the measure the type
              scale is drawn for. The cap is a wrapper because measure is a layout
              decision the parent owns and `Heading` takes no `className`; the
              Stack's `align="center"` is what centres it.
            */}
              <Heading id={headingId} level="h2" role="section">
                {content.heading}
              </Heading>

            <Text role="body" measure="narrow" isSecondary>
              {content.intro}
            </Text>
          </Stack>
        </div>

        <Timeline steps={content.steps} />
      </Stack>
    </Section>
  );
}
