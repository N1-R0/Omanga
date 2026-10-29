import Link from "next/link";

import { ArrowRight } from "@/components/icons/ArrowRight";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { ContactOption } from "@/content/contact-options.content";
import { CONTACT_ENQUIRY_PARAM } from "@/content/contact-options.content";

const CARD_CLASS =
  "group flex items-center justify-between gap-6 rounded-xs bg-accent p-6 text-text-inverse  transition duration-[var(--duration-fast)] ease-standard hover:bg-surface-inverse";

const CIRCLE_CLASS =
  "flex size-12 shrink-0 items-center justify-center rounded-full bg-bg text-accent-text transition duration-[var(--duration-fast)] ease-standard group-hover:text-text";

export type OptionCardProps = {
  option: ContactOption;
  path: string;
};

export function OptionCard({ option, path }: OptionCardProps) {
  return (
    <Link
      href={`${path}?${CONTACT_ENQUIRY_PARAM}=${option.enquiry}`}
      scroll={false}
      className={CARD_CLASS}
    >
      <span>
        <Heading
          id={`contact-option-${option.id}-heading`}
          level="h3"
          role="column"
          measure="none"
        >
          {option.heading}
        </Heading>

        <span className="block pt-4">
          <Text role="body" as="span" measure="none">
            {option.body}
          </Text>
        </span>
      </span>

      <span aria-hidden className={CIRCLE_CLASS}>
        <ArrowRight size="md" />
      </span>
    </Link>
  );
}
