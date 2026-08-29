import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import type { ServicesContent } from "@/content/services.content";
import type { Tone } from "@/types/ui.types";

import { ServiceContent } from "./ServiceContent";
import { ServiceImage } from "./ServiceImage";
import { ServicesProgression } from "./ServicesProgression";

const SERVICE_HEADING_IDS = [
  "services-spend-heading",
  "services-currency-heading",
  "services-insurance-heading",
] as const;

// [NOTE] Light, like the sections above it. Surface alternation across all ten sections is
// a page-composition decision, not this section's.
const SECTION_TONE: Tone = "light";

// Six of twelve columns less its share of the 48 gutter, in a container capping at 95rem.
const IMAGE_SIZES =
  "(min-width: 90rem) 688px, (min-width: 64rem) 48vw, (min-width: 48rem) calc(100vw - 6rem), calc(100vw - 2rem)";

export type ServicesProps = {
  content: ServicesContent;
  headingId: string;
};

export function Services({ content, headingId }: ServicesProps) {
  // Destructured, not indexed: both are fixed three-tuples, so the pairing is checked at
  // compile time.
  const [spendId, currencyId, insuranceId] = SERVICE_HEADING_IDS;
  const [spend, currency, insurance] = content.services;

  const services = [
    { item: spend, key: spendId },
    { item: currency, key: currencyId },
    { item: insurance, key: insuranceId },
  ].map(({ item, key }) => ({
    key,
    text: (
      <ServiceContent
        content={item}
        headingLevel="h3"
        headingId={key}
        tone={SECTION_TONE}
      />
    ),
    image: <ServiceImage image={item.image} sizes={IMAGE_SIZES} />,
  }));

  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      <ServicesProgression
        heading={
          <Stack gap="lg">
            <div>
              <Badge tone={SECTION_TONE}>{content.eyebrow}</Badge>
            </div>

            <Heading id={headingId} level="h2" role="section">
              {content.heading}
            </Heading>
          </Stack>
        }
        services={services}
      />
    </Section>
  );
}
