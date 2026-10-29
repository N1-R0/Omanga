import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import type { ContactInfoCard as ContactInfoCardContent } from "@/content/contact-information.content";

const CARD_VARIANT = "product-secondary" as const;

export type ContactInfoCardProps = {
  card: ContactInfoCardContent;
};

export function ContactInfoCard({ card }: ContactInfoCardProps) {
  return (
    <Card
      variant={CARD_VARIANT}
      heading={
        <Heading
          id={`contact-info-${card.id}-heading`}
          level="h3"
          role="column"
          measure="none"
        >
          {card.heading}
        </Heading>
      }
      body={<Text role="body">{card.body}</Text>}
      action={
        <span className="inline-flex items-center gap-2">
          {card.hasWhatsAppMark === true && (
            <WhatsAppMark size="sm" tone="light" />
          )}

          <TextLink
            href={card.action.href}
            tone="light"
            isExternal={card.action.isExternal}
          >
            {card.action.label}
          </TextLink>
        </span>
      }
    />
  );
}
