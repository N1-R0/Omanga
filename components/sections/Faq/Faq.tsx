import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { FaqContent } from "@/types/blog.types";

import { FaqList } from "./FaqList";

/**
 * FAQ band for the product pages.
 *
 * Dark on the product pages: it sits between the light partners strip and the
 * brand CTA, so a light FAQ would have made three light bands in a row.
 * Structured data
 * is emitted by the page (`buildFaqPage`), not here, so the page graph stays in
 * one `JsonLd` block.
 */
export type FaqProps = {
  content: FaqContent;
  headingId: string;
  tone: "light" | "dark";
};

export function Faq({ content, headingId, tone }: FaqProps) {
  return (
    <Section labelledBy={headingId} tone={tone}>
      <Stack gap="2xl">
        <Stack gap="lg">
          <Heading id={headingId} level="h2" role="section">
            {content.heading}
          </Heading>

          {content.intro !== undefined && (
            <Text role="body" measure="narrow" isSecondary>
              {content.intro}
            </Text>
          )}
        </Stack>

        <FaqList items={content.items} tone={tone} />
      </Stack>
    </Section>
  );
}
