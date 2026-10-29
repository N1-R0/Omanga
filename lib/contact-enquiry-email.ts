import { contactFormContent } from "@/content/contact-form.content";
import type { ContactSubmission } from "@/lib/contact-enquiry";
import { composeFormEmail } from "@/lib/enquiry-email";
import type { EnquiryEmail, Row } from "@/lib/enquiry-email";

const TITLE = "New Contact Enquiry";

function labelFor(
  options: readonly { readonly value: string; readonly label: string }[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

function rowsFor(submission: ContactSubmission): readonly Row[] {
  const { fields } = contactFormContent;

  const rows: Row[] = [
    { label: "Name", value: submission.name, isOptional: false },
    {
      label: "Email",
      value: submission.email,
      isOptional: false,
      href: `mailto:${submission.email}`,
    },
    {
      label: "Enquiry about",
      value: labelFor(fields.topic.options, submission.topic),
      isOptional: false,
    },
    {
      label: "Existing customer",
      value: labelFor(fields.customer.options, submission.customer),
      isOptional: false,
    },
  ];

  if (submission.company !== "" || submission.role !== "") {
    rows.push(
      { label: "Company", value: submission.company, isOptional: false },
      { label: "Role", value: submission.role, isOptional: true },
    );
  }

  rows.push(
    {
      label: "WhatsApp number",
      value: submission.whatsapp,
      isOptional: true,
      href:
        submission.whatsapp === ""
          ? undefined
          : `tel:${submission.whatsapp.replace(/[^\d+]/g, "")}`,
    },
    { label: "Travelling to or from", value: submission.country, isOptional: true },
    {
      label: "Message",
      value: submission.message,
      isOptional: false,
      isMultiline: true,
    },
  );

  return rows;
}

export function composeContactEnquiryEmail(
  submission: ContactSubmission,
): EnquiryEmail {
  return composeFormEmail({
    title: TITLE,
    rows: rowsFor(submission),
    replyName: submission.name,
    previewValue: labelFor(
      contactFormContent.fields.topic.options,
      submission.topic,
    ),
    sourceLabel: "Contact form",
  });
}
