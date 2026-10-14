// [CHANGED, 2026-10-14] UX copy pass (design.md § Home UX copy pass): Material form copy, matching
// get-started-enquiry.content.ts. No reply time is promised (none is confirmed).
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/config/site";
import {
  CONTACT_FIELDS,
  CUSTOMER_VALUES,
  TOPIC_VALUES,
} from "@/lib/contact-enquiry";
import type { CustomerValue, TopicValue } from "@/lib/contact-enquiry";
import type { LinkTarget } from "@/types/content.types";

/**
 * `Talk to us` form — spec § 4, Form A.
 *
 * Every user-facing string on the form: labels, requirement notes, option lists,
 * validation messages and both outcome states. The field ids and wire names come
 * from `lib/contact-enquiry.ts` — a protocol rather than copy — and are imported
 * so the label, the control and the server all agree on one string.
 *
 * ---------------------------------------------------------------------------
 * Seven fields, not § 4's eight.
 *
 * § 4 replaces the benchmark's fifteen with eight, "one of them conditional", and
 * is explicit about why: "a wallet is free to open and an insurance plan is a
 * low-ticket purchase, so every additional field costs more in abandonment than
 * it returns in qualification."
 *
 * [BLOCKER → CHANGED] Field 5 is free text, not a searchable select.
 *
 * § 4 asks for "Select — searchable | The 43 covered countries + 'Not
 * travel-related'". No list of the 43 exists in the repository: `public/flags/`
 * holds fourteen SVGs and four of those are Canada, the UK, the US and nothing
 * African. A coverage list on an insurance product is a factual claim, so it
 * cannot be assembled by guesswork.
 *
 * A plain text input ships instead, on instruction. It keeps the routing signal
 * § 4 wants — "lets support answer country-specific questions in the first reply
 * instead of the third" — and invents no coverage claim. What it loses is the
 * validation, and the "reinforces the 43-country coverage claim at the moment of
 * contact" job § 4 gives the select. Swapping it back is one field once the list
 * exists and gets one owner in a content module.
 *
 * [NOT MOUNTED] § 4's optional micro-link to `/faqs` in the form intro
 * ("Many questions are answered in our FAQs"). § Implementation notes puts the
 * FAQ page in phase 2 and there is no such route; § 3.4 lists the link as
 * optional for that reason.
 */

/** An option in a select or a radio group. `value` travels, `label` renders. */
export type FormOption = {
  readonly value: string;
  readonly label: string;
};

/**
 * ✏️ § 4's routing field. Seven labels, transcribed in § 4's order.
 *
 * § 4: "**The routing field.** This single control is what allows two option
 * cards to serve all five mandated enquiry types."
 *
 * Labels only. The values and their order live in `lib/contact-enquiry.ts`
 * because they are protocol — they travel over the wire, the server validates
 * against them, `requiresCompany` branches on them and the email template
 * resolves labels through them. This module owns the words.
 *
 * `Record<TopicValue, string>` is what keeps the two in step: adding a value
 * without a label, or leaving a label behind after a value is renamed, is a build
 * error rather than a select that renders an empty option.
 */
// [CHANGED, 2026-10-14] UX copy pass: body nouns (wallet, health cover, plan), not brand names.
// Values unchanged. These labels also appear in the internal notification email.
const TOPIC_LABELS: Readonly<Record<TopicValue, string>> = {
  general: "General question",
  payments: "Wallet",
  insurance: "Health cover",
  claim: "Health cover claim or existing plan",
  partnership: "Partnership",
  business: "Business enquiry",
  other: "Something else",
} as const;

/**
 * ✏️ § 4: "Default state must be an unselected prompt, not a pre-chosen
 * category."
 *
 * Its value is the empty string — the absence of a choice rather than one of
 * them, which is why the protocol module does not list it and the validator
 * rejects it. The text is the caller's to provide, per `Select`: "its text is
 * user-facing copy and nothing here may compose a string."
 */
// [CHANGED, 2026-10-14] UX copy pass: "Choose" matches the error message and the Get Started form.
const TOPIC_PROMPT: FormOption = { value: "", label: "Choose a topic" };

const TOPIC_OPTIONS: readonly FormOption[] = [
  TOPIC_PROMPT,
  ...TOPIC_VALUES.map((value) => ({ value, label: TOPIC_LABELS[value] })),
];

/**
 * ✏️ § 4 field 6, transcribed unchanged: "Yes · No · Not sure".
 *
 * § 4: "Separates support from sales in one tap — the highest-value routing
 * signal on the form, and the reason existing customers stop landing in a sales
 * queue."
 *
 * No empty entry. A radio group's unselected state is no radio being checked,
 * which is what `RadioGroup` renders by default; an empty option would be a
 * fourth choice meaning "I did not answer".
 */
const CUSTOMER_LABELS: Readonly<Record<CustomerValue, string>> = {
  yes: "Yes",
  no: "No",
  "not-sure": "Not sure",
} as const;

const CUSTOMER_OPTIONS: readonly FormOption[] = CUSTOMER_VALUES.map((value) => ({
  value,
  label: CUSTOMER_LABELS[value],
}));

/**
 * A message with a link in the middle of it.
 *
 * The one shape that lets approved copy carry an anchor without becoming markup:
 * three fields the component assembles, rather than a string with a tag in it.
 * The same type `get-started-enquiry.content.ts` uses for its outcome messages.
 */
export type LinkedMessage = {
  readonly lead: string;
  readonly link: LinkTarget;
  readonly trail: string;
};

export type FormField = {
  /** The DOM id and the wire name. From the protocol module. */
  readonly id: string;
  readonly label: string;
  /** Stated in words beside the label, never as a bare asterisk. */
  readonly requirementNote: string;
  /** Guidance beneath the label. Not an example — that is a placeholder. */
  readonly description?: string;
  readonly placeholder?: string;
  /** The message when the field is required and empty or invalid. */
  readonly errorWhenEmpty?: string;
};

/**
 * A field the form refuses to submit without.
 *
 * [FIXED] `errorWhenEmpty` is optional on `FormField` and was optional here too,
 * so `messageFor` returned `string | undefined` and the error summary rendered
 * `{message ?? ""}` — an anchor with no accessible name. Every required field has
 * copy today, so it could not fire; nothing in the type stopped a new one
 * shipping without it.
 *
 * Requiring it on exactly the fields the validator can reject closes that at
 * compile time: `RequiredFormField` is what the seven entries in
 * `RequiredContactField` are typed as, so adding a required field without its
 * message is a build error rather than an empty link.
 */
export type RequiredFormField = FormField & {
  readonly errorWhenEmpty: string;
};

type RequiredChoiceField = RequiredFormField & {
  readonly options: readonly FormOption[];
};

export const CONTACT_FORM_CHROME = {
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
  // ✏️ An `h2` repeating the option name.
  // [CHANGED, 2026-10-14] UX copy pass: verb-first, says what the form does. Matches the option card.
  heading: "Send us a message",
  // [CHANGED, 2026-10-14] UX copy pass: cut "within 1 business day" (unconfirmed reply time).
  // The reply goes by email: the route sets the visitor's address as `replyTo`.
  intro:
    "Tell us what you need and we’ll pass it to the right person. We’ll reply by email.",
  // ✏️ The arrow is drawn by the control, not typed here.
  // [CHANGED, 2026-10-14] UX copy pass: says where the link goes.
  backLabel: "Back to options",
  fields: {
    name: {
      id: CONTACT_FIELDS.name,
      // [CHANGED, 2026-10-14] UX copy pass: short labels and errors, as on the Get Started form.
      label: "Name",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      errorWhenEmpty: "Enter your name",
    },
    email: {
      id: CONTACT_FIELDS.email,
      label: "Email address",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      // [CHANGED, 2026-10-14] UX copy pass: shown for empty and malformed addresses, so it covers both.
      errorWhenEmpty: "Enter your email address, like name@example.com",
    },
    whatsapp: {
      id: CONTACT_FIELDS.whatsapp,
      label: "WhatsApp number",
      requirementNote: CONTACT_FORM_CHROME.optionalNote,
      /**
       * § 4 gives "Include your country code" as the placeholder. It ships as a
       * description instead: form rules hold that "a placeholder never
       * substitutes for a label", and guidance a visitor needs while typing must
       * not vanish the moment they start. § 4's own field 9 asks for
       * `inputmode` and `autocomplete` per field, which the control sets.
       */
      // [CHANGED, 2026-10-14] UX copy pass: an example makes the format clear.
      description: "Include the country code, like +44 or +234.",
    },
    topic: {
      id: CONTACT_FIELDS.topic,
      label: "Topic",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      // [CHANGED, 2026-10-14] UX copy pass: the instruction is the whole message.
      errorWhenEmpty: "Choose a topic",
      options: TOPIC_OPTIONS,
    },
    country: {
      id: CONTACT_FIELDS.country,
      // [CHANGED, 2026-10-14] UX copy pass: plain phrasing, curly apostrophe as on Get Started.
      label: "Where you’re travelling to or from",
      requirementNote: CONTACT_FORM_CHROME.optionalNote,
    },
    customer: {
      id: CONTACT_FIELDS.customer,
      // [CHANGED, 2026-10-14] UX copy pass: plainer question; shorter error.
      label: "Do you already use Omanga?",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      errorWhenEmpty: "Choose yes, no or not sure",
      options: CUSTOMER_OPTIONS,
    },
    message: {
      id: CONTACT_FIELDS.message,
      label: "Message",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      // [CHANGED, 2026-10-14] UX copy pass: the placeholder only repeated the intro, and vanished on
      // typing. Removed.
      errorWhenEmpty: "Enter your message",
    },
    consent: {
      id: CONTACT_FIELDS.consent,
      // ✏️ Single, specific, unticked.
      // [CHANGED, 2026-10-14] UX copy pass: "message" matches the form's own noun.
      label: "Omanga can contact me about this message",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      errorWhenEmpty: "Tick the box so we can reply",
    },
    company: {
      id: CONTACT_FIELDS.company,
      // ✏️ The conditional field: shown for partnership and business topics.
      label: "Company or organisation",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      // [CHANGED, 2026-10-14] UX copy pass: shorter, no full stop, as the other errors.
      errorWhenEmpty: "Enter your company or organisation",
    },
    role: {
      id: CONTACT_FIELDS.role,
      // [CHANGED, 2026-10-14] UX copy pass: "Role" alone read as a choice, not a free-text field.
      label: "Job title",
      requirementNote: CONTACT_FORM_CHROME.optionalNote,
    },
  },
  // ✏️ § 4A's CTA.
  submitLabel: "Send message",
  /**
   * ✏️ § 4 note 5: "button enters a loading state with the label `Sending…` and
   * is disabled to prevent double submission."
   */
  submitPendingLabel: "Sending…",
  /**
   * ✏️ The helper beneath Submit. § Conversion notes: "Catches the visitor who
   * reaches the button and hesitates."
   */
  // [CHANGED, 2026-10-14] UX copy pass: leads with the situation, link says what it does.
  helper: {
    lead: "Need help now? ",
    link: { label: "Chat with us on WhatsApp", href: WHATSAPP_URL, isExternal: true },
    trail: ".",
  },
  /**
   * The error summary's own line. Not § 4's copy — § 4 note 4 asks for focus
   * management and an announcement without wording either, and the summary is a
   * required accessibility affordance rather than marketing copy.
   */
  // [CHANGED, 2026-10-14] UX copy pass: says what happened and what to do, as on Get Started.
  errorSummaryLabel: "Your message wasn’t sent. Fix the fields below.",
  /**
   * ✏️ § 4A's success state. § 4 note 6: rendered "in place of the fields, inside
   * the same container. Do not redirect to a thank-you page."
   *
   * [CHANGED] § 4A's copy interpolates the submitted address — "a specialist will
   * reply to *[email]*". It reads "the address you gave us" instead: echoing a
   * just-typed value back adds nothing the visitor does not know, and a real
   * address rendered into the page is the one string on this form that a
   * cross-site scripting bug would make dangerous. Nothing is lost — a typo is
   * still recoverable, because the form's values are retained.
   */
  // [CHANGED, 2026-10-14] UX copy pass: cut "within 1 business day" (unconfirmed). No email is sent
  // to the visitor, so none is promised; the reply comes from the team.
  successMessage: {
    lead: "Message sent. We’ll reply to the email address you gave us. Need help sooner? ",
    link: { label: "Chat with us on WhatsApp", href: WHATSAPP_URL, isExternal: true },
    trail: ".",
  },
  /**
   * ✏️ § 4A's error state, transcribed. The published address is the fallback, so
   * a failed submission is never a dead end — which is also why
   * `config/site.ts` owning `CONTACT_EMAIL` matters here.
   */
  // [CHANGED, 2026-10-14] UX copy pass: matches the Get Started failure; one alternative, linked.
  failureMessage: {
    lead: "Your message didn’t send. Try again, or email us at ",
    link: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    trail: ".",
  },
} as const;
