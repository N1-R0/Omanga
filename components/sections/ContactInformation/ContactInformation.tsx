import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import type { ContactInformationContent } from "@/content/contact-information.content";
import type { Tone } from "@/types/ui.types";

import { ContactInfoCard } from "./ContactInfoCard";
import { OfficeMap } from "./OfficeMap";

const SECTION_TONE: Tone = "light";

export type ContactInformationProps = {
  content: ContactInformationContent;
  headingId: string;
};

export function ContactInformation({
  content,
  headingId,
}: ContactInformationProps) {
  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      <Stack gap="4xl">
        <Reveal index={0}>
          <div className="text-center">
            <Stack gap="lg" align="center">
              <Heading id={headingId} level="h2" role="section">
                {content.heading}
              </Heading>
            </Stack>
          </div>
        </Reveal>

        <Reveal index={1}>
          <Grid columns={3} gap="2xl">
            {content.cards.map((card) => (
              <ContactInfoCard key={card.id} card={card} />
            ))}
          </Grid>
        </Reveal>

        <Reveal index={2}>
          <OfficeMap content={content.map} address={content.address} />
        </Reveal>
      </Stack>
    </Section>
  );
}
