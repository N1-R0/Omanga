"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ArrowRight } from "@/components/icons/ArrowRight";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Select } from "@/components/ui/Select";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { Textarea } from "@/components/ui/Textarea";
import { contactFormContent } from "@/content/contact-form.content";
import type { LinkedMessage } from "@/content/contact-form.content";
import {
  CONTACT_FORM_KIND,
  FORM_KIND_FIELD,
  requiresCompany,
  validateContactEnquiry,
} from "@/lib/contact-enquiry";
import type { RequiredContactField } from "@/lib/contact-enquiry";
import { trackEvent } from "@/lib/analytics";
import { ENQUIRY_HONEYPOT_FIELD } from "@/lib/enquiry";

type Status = "idle" | "pending" | "success" | "failure";

const ENQUIRY_ENDPOINT = "/api/enquiry";

const FIELD_ORDER: readonly RequiredContactField[] = [
  "name",
  "email",
  "topic",
  "company",
  "customer",
  "message",
  "consent",
] as const;

function inFieldOrder(
  fields: readonly RequiredContactField[],
): readonly RequiredContactField[] {
  return FIELD_ORDER.filter((field) => fields.includes(field));
}

export type TalkFormProps = {
  backHref: string;
  headingId: string;
};

export function TalkForm({ backHref, headingId }: TalkFormProps) {
  const content = contactFormContent;
  const { fields } = content;

  const [invalidFields, setInvalidFields] = useState<
    readonly RequiredContactField[]
  >([]);
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState("");

  const headingRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [rejectedAt, setRejectedAt] = useState(0);

  const showsCompany = requiresCompany(topic);

  const summaryFields = inFieldOrder(
    invalidFields.filter((field) => field !== "company" || showsCompany),
  );

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    if (rejectedAt > 0) {
      summaryRef.current?.focus();
    }
  }, [rejectedAt]);

  useEffect(() => {
    if (status === "success") {
      headingRef.current?.focus();
    }
  }, [status]);

  const messageFor = (field: RequiredContactField): string =>
    fields[field].errorWhenEmpty;

  const handleBlur =
    (field: RequiredContactField) =>
    (event: React.FocusEvent<HTMLElement>): void => {
      const form = (event.currentTarget as HTMLElement).closest("form");

      if (form === null) {
        return;
      }

      const result = validateContactEnquiry(new FormData(form));
      const isNowInvalid =
        !result.isValid && result.invalidFields.includes(field);

      setInvalidFields((current) =>
        isNowInvalid
          ? current.includes(field)
            ? current
            : [...current, field]
          : current.filter((entry) => entry !== field),
      );
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "pending") {
      return;
    }

    const values = new FormData(event.currentTarget);
    const result = validateContactEnquiry(values);

    if (!result.isValid) {
      setInvalidFields(result.invalidFields);
      setStatus("idle");
      setRejectedAt((count) => count + 1);
      return;
    }

    setInvalidFields([]);
    setStatus("pending");

    try {
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        body: values,
      });

      setStatus(response.ok ? "success" : "failure");
      if (response.ok) trackEvent("generate_lead", { form: "contact" });
    } catch {
      setStatus("failure");
    }
  };

  const headingBlock = (
    <Stack gap="lg" align="start">
      <BackLink href={backHref} label={content.backLabel} />

      <div ref={headingRef} tabIndex={-1}>
        <Heading id={headingId} level="h2" role="feature" measure="none">
          {content.heading}
        </Heading>
      </div>
    </Stack>
  );

  const isSuccess = status === "success";

  return (
    <Stack gap="xl" align="stretch">
      {headingBlock}

      <div aria-live="polite">
        {isSuccess && <Outcome message={content.successMessage} />}
        {status === "failure" && <Outcome message={content.failureMessage} />}
      </div>

      {!isSuccess && (
        <Text role="small" measure="none">
          {content.intro}
        </Text>
      )}

      {!isSuccess && (
        <form noValidate onSubmit={handleSubmit}>
          <input
            type="hidden"
            name={FORM_KIND_FIELD}
            value={CONTACT_FORM_KIND}
          />

          <div className="sr-only" aria-hidden="true">
            <input
              id={`${ENQUIRY_HONEYPOT_FIELD}-contact`}
              name={ENQUIRY_HONEYPOT_FIELD}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <Stack gap="xl" align="stretch">
            {summaryFields.length > 0 && (
              <div
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                className=" rounded-xs border border-border p-4"
              >
                <Text role="small">{content.errorSummaryLabel}</Text>

                <ul
                  role="list"
                  className="mt-2 flex flex-col gap-2"
                >
                  {summaryFields.map((field) => (
                    <li key={field}>
                      <TextLink href={`#${fields[field].id}`} tone="light">
                        {messageFor(field)}
                      </TextLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Stack gap="lg" align="stretch">
              <Input
                id={fields.name.id}
                tone="light"
                type="text"
                label={fields.name.label}
                requirementNote={fields.name.requirementNote}
                isRequired
                autoComplete="name"
                error={
                  invalidFields.includes("name")
                    ? messageFor("name")
                    : undefined
                }
                onBlur={handleBlur("name")}
              />

              <Input
                id={fields.email.id}
                tone="light"
                type="email"
                label={fields.email.label}
                requirementNote={fields.email.requirementNote}
                isRequired
                autoComplete="email"
                error={
                  invalidFields.includes("email")
                    ? messageFor("email")
                    : undefined
                }
                onBlur={handleBlur("email")}
              />

              <Input
                id={fields.whatsapp.id}
                tone="light"
                type="tel"
                label={fields.whatsapp.label}
                requirementNote={fields.whatsapp.requirementNote}
                description={fields.whatsapp.description}
                autoComplete="tel"
              />

              <Select
                id={fields.topic.id}
                tone="light"
                label={fields.topic.label}
                requirementNote={fields.topic.requirementNote}
                options={fields.topic.options}
                isRequired
                error={
                  invalidFields.includes("topic")
                    ? messageFor("topic")
                    : undefined
                }
                onBlur={handleBlur("topic")}
                onChange={(event) => setTopic(event.currentTarget.value)}
              />

              {showsCompany && (
                <>
                  <Input
                    id={fields.company.id}
                    tone="light"
                    type="text"
                    label={fields.company.label}
                    requirementNote={fields.company.requirementNote}
                    isRequired
                    autoComplete="organization"
                    error={
                      invalidFields.includes("company")
                        ? messageFor("company")
                        : undefined
                    }
                    onBlur={handleBlur("company")}
                  />

                  <Input
                    id={fields.role.id}
                    tone="light"
                    type="text"
                    label={fields.role.label}
                    requirementNote={fields.role.requirementNote}
                    autoComplete="organization-title"
                  />
                </>
              )}

              <Input
                id={fields.country.id}
                tone="light"
                type="text"
                label={fields.country.label}
                requirementNote={fields.country.requirementNote}
                autoComplete="country-name"
              />

              <RadioGroup
                id={fields.customer.id}
                tone="light"
                label={fields.customer.label}
                requirementNote={fields.customer.requirementNote}
                options={fields.customer.options}
                isRequired
                error={
                  invalidFields.includes("customer")
                    ? messageFor("customer")
                    : undefined
                }
                onBlur={handleBlur("customer")}
              />

              <Textarea
                id={fields.message.id}
                tone="light"
                label={fields.message.label}
                requirementNote={fields.message.requirementNote}
                placeholder={fields.message.placeholder}
                isRequired
                rows={4}
                error={
                  invalidFields.includes("message")
                    ? messageFor("message")
                    : undefined
                }
                onBlur={handleBlur("message")}
              />

              <Checkbox
                id={fields.consent.id}
                tone="light"
                label={fields.consent.label}
                requirementNote={fields.consent.requirementNote}
                isRequired
                error={
                  invalidFields.includes("consent")
                    ? messageFor("consent")
                    : undefined
                }
                onBlur={handleBlur("consent")}
              />
            </Stack>

            <Stack gap="md" align="start">
              <Button
                as="button"
                type="submit"
                variant="primary"
                tone="light"
                loading={
                  status === "pending"
                    ? { label: content.submitPendingLabel }
                    : undefined
                }
              >
                {content.submitLabel}
              </Button>

              <Text role="small">
                {content.helper.lead}
                <TextLink
                  href={content.helper.link.href}
                  tone="light"
                  isExternal={content.helper.link.isExternal}
                >
                  {content.helper.link.label}
                </TextLink>
                {content.helper.trail}
              </Text>
            </Stack>
          </Stack>
        </form>
      )}
    </Stack>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      scroll={false}
      className="inline-flex items-center gap-2 font-sans type-p2 text-accent-text  transition duration-[var(--duration-fast)] ease-standard hover:text-text"
    >
      <ArrowRight size="sm" />
      <span>{label}</span>
    </Link>
  );
}

function Outcome({ message }: { message: LinkedMessage }) {
  return (
    <Text role="body">
      {message.lead}
      <TextLink
        href={message.link.href}
        tone="light"
        isExternal={message.link.isExternal}
      >
        {message.link.label}
      </TextLink>
      {message.trail}
    </Text>
  );
}
