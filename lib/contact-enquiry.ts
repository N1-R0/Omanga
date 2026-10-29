import { EMAIL_PATTERN, sanitise } from "@/lib/enquiry";

export const CONTACT_FIELDS = {
  name: "contact-name",
  email: "contact-email",
  whatsapp: "contact-whatsapp",
  topic: "contact-topic",
  country: "contact-country",
  customer: "contact-customer",
  message: "contact-message",
  consent: "contact-consent",
  company: "contact-company",
  role: "contact-role",
} as const;

export const TOPIC_VALUES = [
  "general",
  "payments",
  "insurance",
  "claim",
  "partnership",
  "business",
  "other",
] as const;

export const CUSTOMER_VALUES = ["yes", "no", "not-sure"] as const;

export type TopicValue = (typeof TOPIC_VALUES)[number];
export type CustomerValue = (typeof CUSTOMER_VALUES)[number];

export const FORM_KIND_FIELD = "form-kind" as const;
export const CONTACT_FORM_KIND = "contact-talk" as const;

const COMPANY_TOPICS: readonly TopicValue[] = [
  "partnership",
  "business",
] as const;

export function requiresCompany(topic: string): boolean {
  return (COMPANY_TOPICS as readonly string[]).includes(topic);
}

export type ContactSubmission = {
  readonly name: string;
  readonly email: string;
  readonly whatsapp: string;
  readonly topic: string;
  readonly country: string;
  readonly customer: string;
  readonly message: string;
  readonly company: string;
  readonly role: string;
};

export type RequiredContactField =
  | "name"
  | "email"
  | "topic"
  | "customer"
  | "message"
  | "consent"
  | "company";

export type ContactValidation =
  | { readonly isValid: true; readonly data: ContactSubmission }
  | {
      readonly isValid: false;
      readonly invalidFields: readonly RequiredContactField[];
    };

const MAX_LENGTH: Readonly<Record<keyof ContactSubmission, number>> = {
  name: 100,
  email: 254,
  whatsapp: 32,
  topic: 60,
  country: 200,
  customer: 16,
  message: 4000,
  company: 200,
  role: 100,
} as const;

function isAllowed(value: string, allowed: readonly string[]): boolean {
  return (allowed as readonly string[]).includes(value);
}

function hasConsent(values: FormData): boolean {
  const consent = values.get(CONTACT_FIELDS.consent);

  return typeof consent === "string" && consent.trim() !== "";
}

export function validateContactEnquiry(values: FormData): ContactValidation {
  const read = (field: keyof ContactSubmission): string =>
    sanitise(values.get(CONTACT_FIELDS[field]), MAX_LENGTH[field]);

  const data: ContactSubmission = {
    name: read("name"),
    email: read("email"),
    whatsapp: read("whatsapp"),
    topic: read("topic"),
    country: read("country"),
    customer: read("customer"),
    message: read("message"),
    company: read("company"),
    role: read("role"),
  };

  const invalidFields: RequiredContactField[] = [];

  if (data.name === "") {
    invalidFields.push("name");
  }

  if (data.email === "" || !EMAIL_PATTERN.test(data.email)) {
    invalidFields.push("email");
  }

  if (!isAllowed(data.topic, TOPIC_VALUES)) {
    invalidFields.push("topic");
  }

  if (!isAllowed(data.customer, CUSTOMER_VALUES)) {
    invalidFields.push("customer");
  }

  if (data.message === "") {
    invalidFields.push("message");
  }

  if (requiresCompany(data.topic) && data.company === "") {
    invalidFields.push("company");
  }

  if (!hasConsent(values)) {
    invalidFields.push("consent");
  }

  return invalidFields.length > 0
    ? { isValid: false, invalidFields }
    : { isValid: true, data };
}
