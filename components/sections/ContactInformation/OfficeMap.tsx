import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { Stack } from "@/components/layout/Stack";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { WHATSAPP_URL } from "@/config/site";
import type { OfficeMapContent } from "@/content/contact-information.content";

import { MapFrame } from "./MapFrame";

const FRAME_CLASS =
  "h-[clamp(22.5rem,44.974vw,42.5rem)] w-full overflow-hidden rounded-xs bg-surface";

export type OfficeMapProps = {
  content: OfficeMapContent;
  address: string;
};

export function OfficeMap({ content, address }: OfficeMapProps) {
  return (
    <Stack gap="lg" align="stretch">
      <div className={FRAME_CLASS}>
        <MapFrame title={content.frameTitle} />
      </div>

      <Card
        variant="product-secondary"
        heading={
          <Heading
            id="contact-office-heading"
            level="h3"
            role="column"
            measure="none"
          >
            {content.officeHeading}
          </Heading>
        }
        body={
          <Stack gap="md" align="start">
            <address className="not-italic">
              <Text role="body" as="span">
                {address}
              </Text>
            </address>

            <span className="inline-flex items-center gap-2">
              <WhatsAppMark size="sm" tone="light" />

              <TextLink href={WHATSAPP_URL} tone="light" isExternal>
                {content.whatsappNumber}
              </TextLink>
            </span>
          </Stack>
        }
      />
    </Stack>
  );
}
