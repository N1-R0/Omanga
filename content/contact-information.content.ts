import {
  CONTACT_EMAIL,
  OFFICE_ADDRESS,
  WHATSAPP_NUMBER_DISPLAY,
  WHATSAPP_URL,
} from "@/config/site";
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { LinkTarget } from "@/types/content.types";

const COVERAGE_BODY = `Spend from your wallet in ${COUNTRIES_SERVED_DISPLAY} African countries. Health cover applies in Nigeria only.`;

const COVERAGE_LINK_LABEL = "See where the wallet works";

const COVERAGE_HREF = "/#coverage-heading";

export type ContactInfoCard = {
  readonly id: string;
  readonly heading: string;
  readonly body: string;
  readonly action: LinkTarget;
  readonly hasWhatsAppMark?: boolean;
};

const CARDS: readonly ContactInfoCard[] = [
  {
    id: "email",
    heading: "Email us",
    body: "Write to us about the wallet, health cover, a partnership or anything else.",
    action: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  },
  {
    id: "support",
    heading: "Get help on WhatsApp",
    body:
      "Chat with us about a payment, your wallet or your health cover.",
    action: {
      label: "Chat on WhatsApp",
      href: WHATSAPP_URL,
      isExternal: true,
    },
    hasWhatsAppMark: true,
  },
  {
    id: "coverage",
    heading: "Where Omanga works",
    body: COVERAGE_BODY,
    action: { label: COVERAGE_LINK_LABEL, href: COVERAGE_HREF },
  },
] as const;

export type OfficeMapContent = {
  readonly frameTitle: string;
  readonly officeHeading: string;
  readonly whatsappNumber: string;
};

export type ContactInformationContent = {
  readonly heading: string;
  readonly cards: readonly ContactInfoCard[];
  readonly map: OfficeMapContent;
  readonly address: string;
};

export const contactInformationContent: ContactInformationContent = {
  heading: "Other ways to contact Omanga",
  cards: CARDS,
  map: {
    frameTitle: "Map of Omanga's office in Victoria Island, Lagos",
    officeHeading: "Victoria Island",
    whatsappNumber: WHATSAPP_NUMBER_DISPLAY,
  },
  address: OFFICE_ADDRESS,
} as const;

export const CONTACT_INFORMATION_HEADING_ID =
  "contact-information-heading" as const;
