import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type { DeepDiveContent } from "@/content/deep-dive.content";
import type { Tone } from "@/types/ui.types";

import { ProductTabs } from "./ProductTabs";

// Dark, alternating with the light Services section above it.
const SECTION_TONE: Tone = "dark";

export type ProductDeepDiveProps = {
  content: DeepDiveContent;
  headingId: string;
};

export function ProductDeepDive({ content, headingId }: ProductDeepDiveProps) {
  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      <Stack gap="4xl">
        {/*
          MOTION. The heading block enters, then the tab panel 80ms behind it.
          The tabs' own panel-change animation is unaffected — this is the
          one-shot entrance, and `Reveal` runs once.
        */}
        <Reveal index={0}>
          <div className="text-center">
            <Stack gap="lg" align="center">
              {/*
                [MEASURED] Capped at `--container-heading` (800) — the benchmark's
                `u-max-width-30ch` solved at Omanga's 48 h2. This heading is the
                page's longest at 62 characters, and uncapped it set every one of
                them on a single line across the full 1520 column. It now breaks to
                two lines, centred, which is what the reference does with headings
                of this length.
              */}
              <div className="max-w-heading">
                <Heading id={headingId} level="h2" role="section">
                  {content.heading}
                </Heading>
              </div>

              <Text role="body" measure="narrow" isSecondary>
                {content.intro}
              </Text>
            </Stack>
          </div>
        </Reveal>

        <Reveal index={1}>
          <ProductTabs products={content.products} labelledBy={headingId} />
        </Reveal>
      </Stack>
    </Section>
  );
}
