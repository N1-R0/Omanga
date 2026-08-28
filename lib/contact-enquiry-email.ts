import { contactFormContent } from "@/content/contact-form.content";
import type { ContactSubmission } from "@/lib/contact-enquiry";
import { composeFormEmail } from "@/lib/enquiry-email";
import type { EnquiryEmail, Row } from "@/lib/enquiry-email";

/**
 * The `Talk to us` notification email. Spec § 4, Form A.
 *
 * Rows only. The shell, the escaping, the table layout and the preview-text trick
 * all come from `lib/enquiry-email.ts` — see its note on why that is shared
 * rather than copied.
 *
 * Server-only by use: nothing in the client bundle imports it.
 */

const TITLE = "New Contact Enquiry";

/**
 * The label for a submitted option value, resolved through the same list the
 * control renders — so the email reads "Partnership enquiry" rather than
 * `partnership`, and the two cannot drift apart.
 *
 * An unrecognised value falls back to itself: it is sanitised and capped, so
 * printing it is safe, and seeing the raw value tells whoever reads the enquiry
 * more than a blank would. The same call `needsLabel` makes for the Get Started
 * form.
 */
function labelFor(
  options: readonly { readonly value: string; readonly label: string }[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

/**
 * The rows, in the order the form asks for them.
 *
 * Two are ordered deliberately against the form rather than with it. The topic
 * and the customer status come first, straight after the reply address, because
 * they are the two fields § 4 says exist to route — "the highest-value routing
 * signal on the form, and the reason existing customers stop landing in a sales
 * queue" — and whoever opens this mail decides where it goes before they read
 * what it says. The message sits last, where its length cannot push the routing
 * fields below the fold of a preview pane.
 *
 * The company pair is appended only when it was asked for. Rendering it as
 * "Not provided" on a general enquiry would report a field the visitor never
 * saw as something they declined to fill in.
 */
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
    /*
      A `tel:` href rather than a `wa.me` link. The number is the visitor's, and
      whoever replies may want to call or message it from whatever they use —
      composing a WhatsApp deep link here would assume the channel on their
      behalf, and `tel:` is what a mail client turns into a tappable number.
    */
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
      // The first multi-line value the rail carries. See `Row.isMultiline`.
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
    /*
      The topic is the preview line rather than the destination. It is what tells
      whoever is triaging the inbox whether this is a claim, a partnership or a
      general question before they open anything.
    */
    previewValue: labelFor(
      contactFormContent.fields.topic.options,
      submission.topic,
    ),
    sourceLabel: "Contact form",
  });
}
