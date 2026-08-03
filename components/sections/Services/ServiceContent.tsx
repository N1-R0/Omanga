import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { ServiceContentItem } from "@/content/services.content";
import type { HeadingLevel, Tone } from "@/types/ui.types";

import { ServiceCTA } from "./ServiceCTA";

export type ServiceContentProps = {
  content: ServiceContentItem;
  /** Owned by the section so the outline cannot skip a level. */
  headingLevel: HeadingLevel;
  headingId: string;
  tone: Tone;
};

export function ServiceContent({
  content,
  headingLevel,
  headingId,
  tone,
}: ServiceContentProps) {
  return (
    <Stack gap="xl">
      <Stack gap="lg">
        <Heading id={headingId} level={headingLevel} role="feature">
          {content.heading}
        </Heading>

        <Text role="body" measure="narrow">
          {content.body}
        </Text>
      </Stack>

      {/* Wrapped so the Stack's `stretch` does not widen the pill to the column. */}
      <div>
        <ServiceCTA action={content.action} tone={tone} />
      </div>
    </Stack>
  );
}
