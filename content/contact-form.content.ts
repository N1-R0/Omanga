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
const TOPIC_LABELS: Readonly<Record<TopicValue, string>> = {
  general: "General enquiry",
  payments: "Omanga Payment Solutions",
  insurance: "Travel & holiday insurance",
  claim: "Insurance claim or existing policy",
  partnership: "Partnership enquiry",
  business: "Business or corporate enquiry",
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
const TOPIC_PROMPT: FormOption = { value: "", label: "Select an option" };

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
  // ✏️ § 4A and § SEO's hierarchy — an `h2` repeating the option name.
  heading: "Talk to us",
  /**
   * ✏️ § 4A, transcribed with its `[VERIFY response time]` claim intact.
   *
   * [VERIFY] "We reply within one business day" is a promise, and § E-E-A-T item
   * 6 gates it: "Real, evidenced response times replacing every
   * `[VERIFY response time]` token. Publish it only once it is kept." It ships
   * because it is § 4A's approved copy; it is the first thing to cut if the
   * figure cannot be met.
   */
  intro:
    "Tell us a little about what you need and we'll route your message to the right specialist. We reply within one business day.",
  // ✏️ § 4's `← Go back`. The arrow is drawn by the control, not typed here.
  backLabel: "Go back",
  fields: {
    name: {
      id: CONTACT_FIELDS.name,
      label: "Full name",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      errorWhenEmpty: "Enter your name so we know who we're replying to.",
    },
    email: {
      id: CONTACT_FIELDS.email,
      label: "Email address",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      // ✏️ § 4A's field error copy, transcribed unchanged.
      errorWhenEmpty:
        "Enter an email address we can reply to, like name@example.com",
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
      description: "Include your country code.",
    },
    topic: {
      id: CONTACT_FIELDS.topic,
      label: "What's your enquiry about?",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      // ✏️ § 4A's field error copy for a required select, transcribed unchanged.
      errorWhenEmpty:
        "Choose the option that best fits so we can route your message.",
      options: TOPIC_OPTIONS,
    },
    country: {
      id: CONTACT_FIELDS.country,
      // ✏️ § 4 field 5's label, transcribed unchanged.
      label: "Which country are you travelling to or from?",
      requirementNote: CONTACT_FORM_CHROME.optionalNote,
    },
    customer: {
      id: CONTACT_FIELDS.customer,
      label: "Are you already an Omanga customer?",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      errorWhenEmpty: "Let us know so we can send you to the right team.",
      options: CUSTOMER_OPTIONS,
    },
    message: {
      id: CONTACT_FIELDS.message,
      label: "Your message",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      // ✏️ § 4's placeholder for field 7, transcribed unchanged.
      placeholder: "Tell us what you need help with.",
      errorWhenEmpty: "Tell us what you need so we can help.",
    },
    consent: {
      id: CONTACT_FIELDS.consent,
      // ✏️ § 4 field 8, transcribed unchanged. Single, specific, unticked.
      label: "I'm happy for Omanga to contact me about this enquiry.",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      // ✏️ § 4A's consent error copy, transcribed unchanged.
      errorWhenEmpty: "Tick this so we're allowed to reply to you.",
    },
    company: {
      id: CONTACT_FIELDS.company,
      // ✏️ § 4's conditional field, transcribed unchanged.
      label: "Company or organisation name",
      requirementNote: CONTACT_FORM_CHROME.requiredNote,
      errorWhenEmpty: "Add the company or organisation this is about.",
    },
    role: {
      id: CONTACT_FIELDS.role,
      label: "Your role",
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
   * ✏️ § 4A's helper text beneath Submit: "Or start a WhatsApp chat if it's
   * urgent." § Conversion notes: "Catches the visitor who reaches the button and
   * hesitates. Costs nothing, recovers otherwise-lost intent."
   */
  helper: {
    lead: "Or ",
    link: { label: "start a WhatsApp chat", href: WHATSAPP_URL, isExternal: true },
    trail: " if it's urgent.",
  },
  /**
   * The error summary's own line. Not § 4's copy — § 4 note 4 asks for focus
   * management and an announcement without wording either, and the summary is a
   * required accessibility affordance rather than marketing copy.
   */
  errorSummaryLabel: "There's a problem with a few fields:",
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
  successMessage: {
    lead: "Message received. Thanks — we've got your enquiry and a specialist will reply to the address you gave us within one business day. Need an answer sooner? ",
    link: { label: "Start a WhatsApp chat", href: WHATSAPP_URL, isExternal: true },
    trail: ".",
  },
  /**
   * ✏️ § 4A's error state, transcribed. The published address is the fallback, so
   * a failed submission is never a dead end — which is also why
   * `config/site.ts` owning `CONTACT_EMAIL` matters here.
   */
  failureMessage: {
    lead: "That didn't send. Something went wrong on our end, not yours. Try again, or reach us directly at ",
    link: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    trail: " or on WhatsApp.",
  },
} as const;
