import { ArrowRight } from "@/components/icons/ArrowRight";
import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { SupportBlockContent } from "@/content/contact-hero.content";

export type SupportBlockProps = {
  content: SupportBlockContent;
};

export function SupportBlock({ content }: SupportBlockProps) {
  return (
    <Stack gap="xl" align="start">
      <Stack gap="lg" align="start">
        <Heading
          id="contact-support-heading"
          level="h2"
          role="step"
          measure="none"
        >
          {content.heading}
        </Heading>

        <Text role="body" measure="narrow">
          {content.body}
        </Text>
      </Stack>

      <Button
        as="link"
        variant={content.action.emphasis}
        tone="light"
        href={content.action.href}
        isExternal={content.action.isExternal}
        leadingIcon={<WhatsAppMark size="sm" tone="brand" />}
        trailingIcon={<ArrowRight size="sm" />}
      >
        {content.action.label}
      </Button>
    </Stack>
  );
}
