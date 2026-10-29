export type ContactOption = {
  readonly id: string;
  readonly enquiry: string;
  readonly heading: string;
  readonly body: string;
};

const OPTIONS: readonly ContactOption[] = [
  {
    id: "talk",
    enquiry: "talk",
    heading: "Send us a message",
    body: "Ask about the wallet, health cover, a claim, a partnership or your account. We’ll reply by email.",
  },
  {
    id: "notifications",
    enquiry: "notifications",
    heading: "Get updates by email",
    body: "News about the wallet and health cover, plus practical tips for your trip to Nigeria.",
  },
] as const;

export type ContactOptionsContent = {
  readonly heading: string;
  readonly options: readonly ContactOption[];
};

export const contactOptionsContent: ContactOptionsContent = {
  heading: "How can we help?",
  options: OPTIONS,
} as const;

export const CONTACT_ENQUIRY_PARAM = "enquiry" as const;

export const CONTACT_OPTIONS_HEADING_ID = "contact-options-heading" as const;
