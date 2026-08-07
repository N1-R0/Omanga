/**
 * The enquiry form's wire protocol, validation and sanitisation.
 *
 * Pure and React-free, so the Route Handler and the form component share one
 * implementation. coding-guidelines.md: "Server validation is authoritative; the
 * client mirrors it and never assumes success." Two copies of these rules would
 * eventually disagree, and the one that mattered would be the server's.
 *
 * No copy lives here. Validation returns field names, and the content module
 * turns them into messages — which keeps every user-facing string in one place
 * and lets this module be called from a context that has no locale.
 */

/**
 * The field names as they travel over the wire, and as the DOM ids.
 *
 * A protocol rather than copy, which is why they are here and not in the content
 * module — the content module imports them so the label, the control and the
 * server all agree on one string.
 */
export const ENQUIRY_FIELDS = {
  name: "enquiry-name",
  email: "enquiry-email",
  destination: "enquiry-destination",
  needs: "enquiry-needs",
} as const;

/** The two fields without which a reply is impossible. */
export type RequiredEnquiryField = "name" | "email";

export type EnquirySubmission = {
  readonly name: string;
  readonly email: string;
  readonly destination: string;
  readonly needs: string;
};

export type EnquiryValidation =
  | { readonly isValid: true; readonly data: EnquirySubmission }
  | {
      readonly isValid: false;
      readonly invalidFields: readonly RequiredEnquiryField[];
    };

/**
 * Length caps, applied before anything else looks at the values.
 *
 * An unbounded free-text field posted to a mail transport is the cheapest
 * denial-of-service available, and none of these fields has a legitimate use for
 * more than this.
 */
const MAX_LENGTH: Readonly<Record<keyof EnquirySubmission, number>> = {
  name: 100,
  email: 254, // RFC 5321's maximum address length
  destination: 200,
  needs: 40,
} as const;

/**
 * Deliberately permissive. A stricter pattern rejects valid addresses — quoted
 * local parts, new gTLDs, unicode domains — and the only authoritative test of
 * an address is whether mail to it is accepted. This catches typos and empty
 * submissions, which is all client-side email validation can honestly do.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Strips the characters that turn a form value into a mail header.
 *
 * This is the one piece of sanitisation that is a security control rather than
 * tidiness: a CR or LF in a value that reaches a `Subject` or `Reply-To` header
 * lets a submitter inject headers of their own — extra recipients, a different
 * sender — which is header injection. Removed here, once, so no caller has to
 * remember. Other control characters go with them because nothing legitimate
 * puts them in a name or a destination.
 */
function sanitise(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001F\u007F]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/**
 * Reads, sanitises and validates a submission.
 *
 * Takes `FormData` because that is what both callers already hold: the browser
 * builds it from the form element, and the Route Handler gets it from
 * `request.formData()`. Nothing has to serialise to JSON in between.
 *
 * `unknown` at the boundary, narrowed before use — the entries are external
 * input regardless of which side calls this.
 */
export function validateEnquiry(values: FormData): EnquiryValidation {
  const data: EnquirySubmission = {
    name: sanitise(values.get(ENQUIRY_FIELDS.name), MAX_LENGTH.name),
    email: sanitise(values.get(ENQUIRY_FIELDS.email), MAX_LENGTH.email),
    destination: sanitise(
      values.get(ENQUIRY_FIELDS.destination),
      MAX_LENGTH.destination,
    ),
    needs: sanitise(values.get(ENQUIRY_FIELDS.needs), MAX_LENGTH.needs),
  };

  const invalidFields: RequiredEnquiryField[] = [];

  if (data.name === "") {
    invalidFields.push("name");
  }

  if (data.email === "" || !EMAIL_PATTERN.test(data.email)) {
    invalidFields.push("email");
  }

  return invalidFields.length > 0
    ? { isValid: false, invalidFields }
    : { isValid: true, data };
}
