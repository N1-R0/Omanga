import { EMAIL_PATTERN, sanitise } from "@/lib/enquiry";

/**
 * The Contact page's `Talk to us` form — wire protocol, validation and
 * sanitisation. Spec § 4, Form A.
 *
 * Pure and React-free, so the Route Handler and the form component share one
 * implementation, exactly as `lib/enquiry.ts` does for the Get Started form.
 * "Server validation is authoritative; the client mirrors it and never assumes
 * success."
 *
 * No copy lives here. Validation returns field names and the content module turns
 * them into messages.
 *
 * ---------------------------------------------------------------------------
 * A second module rather than fields added to `lib/enquiry.ts`.
 *
 * The two forms share a transport, a rate limiter, a honeypot and a response
 * shape — all of which stay in one Route Handler. What they do not share is a
 * field set: this one has eight controls to that one's four, three of them
 * required where that one has two, and one required conditionally on the value of
 * another. Folding both into one `EnquirySubmission` would make every field
 * optional in the type and move the real contract into runtime branching, which
 * is the opposite of what these modules exist for.
 *
 * `sanitise` and `EMAIL_PATTERN` are imported rather than copied. Those two are
 * the security-relevant parts — control-character stripping is what stops mail
 * header injection — and two copies of a security control is one copy that gets
 * fixed.
 */

/**
 * The field names as they travel over the wire, and as the DOM ids.
 *
 * Prefixed `contact-` so they cannot collide with the Get Started form's
 * `enquiry-` names. Both post to the same endpoint, and a shared name would mean
 * one form's validator silently reading the other's value.
 */
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

/**
 * The values each choice control accepts, in the order § 4 lists them.
 *
 * [FIXED] These were derived from the content module, which created a circular
 * import: the content module reads `CONTACT_FIELDS` from this file, so this file
 * reading `contactFormContent` back meant one of the two was always mid-
 * initialisation. It surfaced as `Cannot access 'contactFormContent' before
 * initialization` the first time the page rendered.
 *
 * The values belong here regardless, and for the same reason `CONTACT_FIELDS`
 * does: they travel over the wire, the server branches on them, and the email
 * template resolves against them — that is a protocol. Only the labels are copy,
 * and the content module owns those, pairing each one with a value from here.
 *
 * Order is the render order too. § 4 states the topic list in this sequence and
 * the content module maps over it, so the sequence has one owner rather than
 * being restated as a second array that can fall out of step.
 *
 * The unselected prompt is not here. Its value is the empty string, which is the
 * absence of a choice rather than one of them — accepting it would make a required
 * field optional.
 */
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

/**
 * Which form a submission came from.
 *
 * A hidden field rather than a second endpoint. The guards that matter — rate
 * limit, honeypot, the 503 when mail is unconfigured, the response codes — are
 * identical for both forms and are already written once; a second route would
 * duplicate all of them plus the SMTP transport and its connection pool.
 *
 * Absent means the Get Started form, so that form's existing requests are
 * unchanged and it needs no edit.
 */
export const FORM_KIND_FIELD = "form-kind" as const;
export const CONTACT_FORM_KIND = "contact-talk" as const;

/**
 * The topics that reveal the company fields. Spec § 4's only conditional logic:
 * "Field 4 = `Partnership enquiry` **or** `Business or corporate enquiry` →
 * Company or organisation name (required) + Your role (optional)".
 *
 * Values rather than labels, and exported so the form component and the
 * validator agree on the same two strings — the client decides whether to render
 * the fields and the server decides whether to require them, and if those
 * disagree a partnership enquiry either loses its company name or is rejected for
 * a field the visitor never saw.
 */
export const COMPANY_TOPICS: readonly TopicValue[] = [
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

/**
 * The fields a submission cannot be answered without.
 *
 * `consent` is in the list because § 4 marks it required and because a reply to
 * someone who did not tick it is the compliance problem, not the UX one.
 * `company` is here conditionally — see `validateContactEnquiry`.
 */
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

/**
 * Length caps, applied before anything else looks at the values.
 *
 * An unbounded free-text field posted to a mail transport is the cheapest
 * denial-of-service available.
 *
 * `message` is 4000 against the Get Started form's longest at 200. It is the
 * first genuinely free-form field the rail carries and the spec asks for four
 * visible rows that expand, so a cap that truncated a real enquiry mid-sentence
 * would be worse than the bytes it saves. 4000 is about 700 words.
 *
 * `country` is free text rather than a select — see the content module — so it
 * takes the same 200 the Get Started form's destination does.
 */
const MAX_LENGTH: Readonly<Record<keyof ContactSubmission, number>> = {
  name: 100,
  email: 254, // RFC 5321's maximum address length
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

/**
 * Whether the consent box was ticked.
 *
 * An unchecked checkbox sends nothing at all, so absence is the failure state.
 * Deliberately not compared against a specific value: the browser sends `on` by
 * default and the control's `value` attribute could change without this noticing.
 */
function hasConsent(values: FormData): boolean {
  const consent = values.get(CONTACT_FIELDS.consent);

  return typeof consent === "string" && consent.trim() !== "";
}

/**
 * Reads, sanitises and validates a `Talk to us` submission.
 *
 * Takes `FormData` because that is what both callers already hold. `unknown` at
 * the boundary, narrowed before use — the entries are external input regardless
 * of which side calls this.
 */
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

  /*
    [FIXED] Checked against the allowed values, not merely for emptiness.

    A crafted POST could previously put any 60-character string in `topic` and any
    16 in `customer`, and the notification template falls back to printing an
    unrecognised value rather than blanking it — so junk reached the mailbox
    looking like a category. Worse, `requiresCompany` branches on `topic`, so an
    unrecognised value silently skipped the conditional requirement.

    The lists come from the content module, which is the same source the controls
    render from, so an option added to the form is accepted here without a second
    edit and one removed stops being accepted.
  */
  if (!isAllowed(data.topic, TOPIC_VALUES)) {
    invalidFields.push("topic");
  }

  if (!isAllowed(data.customer, CUSTOMER_VALUES)) {
    invalidFields.push("customer");
  }

  if (data.message === "") {
    invalidFields.push("message");
  }

  /*
    Conditional, and checked against the *submitted* topic rather than against
    whatever the client rendered. A partnership enquiry with no company name is
    the one case where the form's shape depends on a value, so it is the one case
    where the server has to re-derive that shape rather than trust it.
  */
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
