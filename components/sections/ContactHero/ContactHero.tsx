import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { ContactHeroContent } from "@/content/contact-hero.content";
import type { ContactOptionsContent } from "@/content/contact-options.content";

import { OptionsPanel } from "./OptionsPanel";
import { SupportBlock } from "./SupportBlock";

const LAYOUT_CLASS =
  "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16";

export type ContactHeroProps = {
  content: ContactHeroContent;
  options: ContactOptionsContent;
  headingId: string;
  optionsHeadingId: string;
  selectedEnquiry?: string;
  path: string;
};

export function ContactHero({
  content,
  options,
  headingId,
  optionsHeadingId,
  selectedEnquiry,
  path,
}: ContactHeroProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="section-y flex items-center bg-bg text-text  md:min-h-[clamp(27rem,18.429rem+17.857vw,34.5rem)]"
    >
      <Container>
        <div className={LAYOUT_CLASS}>
          <div>
            <Stack gap="3xl" align="start">
              <Stack gap="xl" align="start">
                <Badge tone="light">{content.eyebrow}</Badge>

                <Heading id={headingId} level="h1" role="hero" measure="hero">
                  {content.heading}
                </Heading>

                <Text role="body" measure="narrow">
                  {content.intro}
                </Text>
              </Stack>

              <SupportBlock content={content.support} />
            </Stack>
          </div>

          <OptionsPanel
            content={options}
            headingId={optionsHeadingId}
            selected={selectedEnquiry}
            path={path}
          />
        </div>
      </Container>
    </section>
  );
}
