import { CONTACT_EMAIL, WHATSAPP_URL } from "@/config/site";
import {
  CONTACT_FIELDS,
  CUSTOMER_VALUES,
  TOPIC_VALUES,
} from "@/lib/contact-enquiry";
import type { CustomerValue, TopicValue } from "@/lib/contact-enquiry";
import type { LinkTarget } from "@/types/content.types";

export type FormOption = {
  readonly value: string;
  readonly label: string;
};

const TOPIC_LABELS: Readonly<Record<TopicValue, string>> = {
  general: "General question",
  payments: "Wallet",
  insurance: "Health cover",
  claim: "Health cover claim or existing plan",
  partnership: "Partnership",
  business: "Business enquiry",
  other: "Something else",
} as const;

const TOPIC_PROMPT: FormOption = { value: "", label: "Choose a topic" };

const TOPIC_OPTIONS: readonly FormOption[] = [
  TOPIC_PROMPT,
  ...TOPIC_VALUES.map((value) => ({ value, label: TOPIC_LABELS[value] })),
];

const CUSTOMER_LABELS: Readonly<Record<CustomerValue, string>> = {
  yes: "Yes",
  no: "No",
  "not-sure": "Not sure",
} as const;

const CUSTOMER_OPTIONS: readonly FormOption[] = CUSTOMER_VALUES.map((value) => ({
  value,
  label: CUSTOMER_LABELS[value],
}));

export type LinkedMessage = {
  readonly lead: string;
  readonly link: LinkTarget;
  readonly trail: string;
};

export type FormField = {
  readonly id: string;
  readonly label: string;
  readonly requirementNote: string;
  readonly description?: string;
  readonly placeholder?: string;
  readonly errorWhenEmpty?: string;
};

export type RequiredFormField = FormField & {
  readonly errorWhenEmpty: string;
};

type RequiredChoiceField = RequiredFormField & {
  readonly options: readonly FormOption[];
};

const CONTACT_FORM_CHROME = {
  requiredNote: "required",
  optionalNote: "optional",
} as const;

export type ContactFormContent = {
  readonly heading: string;
  readonly intro: string;
  readonly backLabel: string;
  readonly fields: {
    readonly name: RequiredFormField;
    readonly email: RequiredFormField;
    readonly whatsapp: FormField;
    readonly topic: RequiredChoiceField;
    readonly country: FormField;
    readonly customer: RequiredChoiceField;
    readonly message: RequiredFormField;
    readonly consent: RequiredFormField;
    readonly company: RequiredFormField;
    readonly role: FormField;
  };
  readonly submitLabel: string;
  readonly submitPendingLabel: string;
  readonly helper: LinkedMessage;
  readonly errorSummaryLabel: string;
  readonly successMessage: LinkedMessage;
  readonly failureMessage: LinkedMessage;
};

export const contactFormContent: ContactFormContent = {
  heading: "Send us a message",
  intro:
    "Tell us what you need and we’ll pass it to the right person. We’ll reply by email.",
  backLabel: "Back to options",
  fields: {
    name: {
      id: CONTACT_FIELDS.name,
      label: "Name",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      errorWhenEmpty: "Enter your name",
    },
    email: {
      id: CONTACT_FIELDS.email,
      label: "Email address",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      errorWhenEmpty: "Enter your email address, like name@example.com",
    },
    whatsapp: {
      id: CONTACT_FIELDS.whatsapp,
      label: "WhatsApp number",
      requirementNote: CONTACT_FORM_CHROME.optionalNote,
      description: "Include the country code, like +44 or +234.",
    },
    topic: {
      id: CONTACT_FIELDS.topic,
      label: "Topic",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      errorWhenEmpty: "Choose a topic",
      options: TOPIC_OPTIONS,
    },
    country: {
      id: CONTACT_FIELDS.country,
      label: "Where you’re travelling to or from",
      requirementNote: CONTACT_FORM_CHROME.optionalNote,
    },
    customer: {
      id: CONTACT_FIELDS.customer,
      label: "Do you already use Omanga?",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      errorWhenEmpty: "Choose yes, no or not sure",
      options: CUSTOMER_OPTIONS,
    },
    message: {
      id: CONTACT_FIELDS.message,
      label: "Message",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      errorWhenEmpty: "Enter your message",
    },
    consent: {
      id: CONTACT_FIELDS.consent,
      label: "Omanga can contact me about this message",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      errorWhenEmpty: "Tick the box so we can reply",
    },
    company: {
      id: CONTACT_FIELDS.company,
      label: "Company or organisation",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      errorWhenEmpty: "Enter your company or organisation",
    },
    role: {
      id: CONTACT_FIELDS.role,
      label: "Job title",
      requirementNote: CONTACT_FORM_CHROME.optionalNote,
    },
  },
  submitLabel: "Send message",
  submitPendingLabel: "Sending…",
  helper: {
    lead: "Need help now? ",
    link: { label: "Chat with us on WhatsApp", href: WHATSAPP_URL, isExternal: true },
    trail: ".",
  },
  errorSummaryLabel: "Your message wasn’t sent. Fix the fields below.",
  successMessage: {
    lead: "Message sent. We’ll reply to the email address you gave us. Need help sooner? ",
    link: { label: "Chat with us on WhatsApp", href: WHATSAPP_URL, isExternal: true },
    trail: ".",
  },
  failureMessage: {
    lead: "Your message didn’t send. Try again, or email us at ",
    link: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    trail: ".",
  },
} as const;
