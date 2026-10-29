import type { ComponentType } from "react";

import { Globe } from "@/components/icons/Globe";
import { Headset } from "@/components/icons/Headset";
import { Newspaper } from "@/components/icons/Newspaper";
import { Smartphone } from "@/components/icons/Smartphone";
import { Video } from "@/components/icons/Video";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type {
  Inclusion,
  InsuranceInclusionsContent,
} from "@/content/insurance-inclusions.content";
import { cx } from "@/lib/cx";
import type { HeadingLevel, IconSize, Tone } from "@/types/ui.types";

const SECTION_TONE: Tone = "light";

const MOBILE_COLUMNS = 2;

const HEADING_LEVEL: HeadingLevel = "h2";
const TERM_LEVEL: HeadingLevel = "h3";

const ICON_SIZE: IconSize = "lg";

type Glyph = ComponentType<{ size: IconSize; label?: string }>;

const GLYPH: Readonly<Record<string, Glyph>> = {
  telemedicine: Video,
  roaming: Globe,
  "contact-centre": Headset,
  newsletter: Newspaper,
  "mobile-app": Smartphone,
} as const;

function isFinalOrphan(index: number, total: number): boolean {
  return index === total - 1 && total % MOBILE_COLUMNS !== 0;
}

export type InsuranceInclusionsProps = {
  content: InsuranceInclusionsContent;
  headingId: string;
};

export function InsuranceInclusions({
  content,
  headingId,
}: InsuranceInclusionsProps) {
  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      <Stack gap="4xl">
        <Reveal index={0}>
          <Heading id={headingId} level={HEADING_LEVEL} role="section">
            {content.heading}
          </Heading>
        </Reveal>

        <Reveal index={1}>
          <Grid
            columns={3}
            mobileColumns={MOBILE_COLUMNS}
            gap="3xl"
            isEqualHeight={false}
          >
            {content.inclusions.map((inclusion, index) => (
              <div
                key={inclusion.id}
                className={cx(
                  isFinalOrphan(index, content.inclusions.length) &&
                    "max-md:col-span-2",
                )}
              >
                <InclusionItem inclusion={inclusion} termLevel={TERM_LEVEL} />
              </div>
            ))}
          </Grid>
        </Reveal>
      </Stack>
    </Section>
  );
}

function InclusionItem({
  inclusion,
  termLevel,
}: {
  inclusion: Inclusion;
  termLevel: HeadingLevel;
}) {
  const Mark = GLYPH[inclusion.id];

  return (
    <Stack gap="lg" align="start">
      {Mark !== undefined && <Mark size={ICON_SIZE} />}

      <Stack gap="md">
        <Heading
          id={`inclusion-${inclusion.id}`}
          level={termLevel}
          role="feature"
          measure="none"
        >
          {inclusion.term}
        </Heading>

        <Text role="body" measure="feature" isSecondary>
          {inclusion.description}
        </Text>
      </Stack>
    </Stack>
  );
}
