import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
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
        <div className="text-center">
          <Stack gap="lg" align="center">
            <Heading id={headingId} level="h2" role="section">
              {content.heading}
            </Heading>

            <Text role="body" measure="narrow" isSecondary>
              {content.intro}
            </Text>
          </Stack>
        </div>

        <ProductTabs products={content.products} labelledBy={headingId} />
      </Stack>
    </Section>
  );
}
