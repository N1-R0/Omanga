import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { CONTACT_EMAIL } from "@/config/site";
import { contactFormContent } from "@/content/contact-form.content";
import type { ContactOptionsContent } from "@/content/contact-options.content";

import { OptionCard } from "./OptionCard";
import { BackLink, TalkForm } from "./TalkForm";

const PANEL_CLASS =
  "rounded-xs bg-surface px-6 py-10 text-text ";

export type OptionsPanelProps = {
  content: ContactOptionsContent;
  headingId: string;
  selected?: string;
  path: string;
};

export function OptionsPanel({
  content,
  headingId,
  selected,
  path,
}: OptionsPanelProps) {
  const option = content.options.find((entry) => entry.enquiry === selected);

  return (
    <div className={PANEL_CLASS}>
      <Stack gap="lg">
        {option === undefined ? (
          <>
            <Heading id={headingId} level="h2" role="feature" measure="none">
              {content.heading}
            </Heading>

            <Stack gap="sm">
              {content.options.map((entry) => (
                <OptionCard key={entry.id} option={entry} path={path} />
              ))}
            </Stack>
          </>
        ) : option.enquiry === "talk" ? (
          <TalkForm backHref={path} headingId={headingId} />
        ) : (
          <NotificationsInterim path={path} />
        )}
      </Stack>
    </div>
  );
}

function NotificationsInterim({ path }: { path: string }) {
  return (
    <Stack gap="lg" align="start">
      <BackLink href={path} label={contactFormContent.backLabel} />

      <Heading
        id="contact-notifications-heading"
        level="h2"
        role="feature"
        measure="none"
      >
        Get updates by email
      </Heading>

      <Text role="small" measure="none">
        News about the wallet and health cover, plus practical tips for your trip
        to Nigeria.
      </Text>

      <Text role="small" measure="none">
        To sign up,{" "}
        <TextLink href={`mailto:${CONTACT_EMAIL}`} tone="light">
          email {CONTACT_EMAIL}
        </TextLink>{" "}
        and we&apos;ll add you to the list.
      </Text>
    </Stack>
  );
}
