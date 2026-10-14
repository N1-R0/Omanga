// [CHANGED, 2026-10-14] UX copy pass (design.md § Home UX copy pass): Material form copy —
// verb-first actions, errors that say what happened and what to do, product nouns in the options.
import { CONTACT_EMAIL } from "@/config/site";
import { ENQUIRY_FIELDS } from "@/lib/enquiry";
import type { SelectOption } from "@/components/ui/Select";

/**
 * The Get Started page's closing enquiry section.
 *
 * Structure from `Omanga-Get-Started-Copy - NJ reviewed.docx`, § Section 4. The
 * strings are the 2026-10-14 UX copy pass.
 *
 * ---------------------------------------------------------------------------
 * [DISCREPANCY] Four of the screenshot's six fields are not approved copy.
 *
 * The screenshot is the benchmark's "Book a demo" form — heading, intro and all
 * six field labels are live copy from claritybusinesstravel.com/our-tech,
 * confirmed by fetching that page. The brief's own instruction for this case is
 * "if the exact form copy is not present in `copy.md`, stop and report the
 * missing copy instead of inventing it", so these are reported and not written:
 *
 *   Company*                                        — no approved equivalent
 *   Phone*                                          — no approved equivalent
 *   Who is your previous/current service provider?   — no approved equivalent
 *   Any other information you would like to provide? — no approved equivalent
 *
 * Three of the four are also blocked on grounds beyond copy. § Form rules: "No
 * field is added without a stated use for the data." A phone number is personal
 * data with no stated purpose, "previous service provider" is a competitive
 * question that makes sense for an agency's sales team and not for a self-serve
 * wallet, and `project-context.md` § Target audience is explicit that these
 * visitors are "self-serve, not enterprise: they want an account, not a sales
 * call" — which is what "Company" assumes.
 *
 * The approved form is four fields, and it is what ships. It keeps the
 * screenshot's structure — a two-column grid, labels above underlined controls,
 * one centred submit — as two rows rather than three.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] The privacy notice cannot be built.
 *
 * `get-started-seo.md` § E-E-A-T item 5 requires "a one-line 'We'll only use this
 * to help you get started. See our Privacy Policy.' beneath the submit button,
 * linking to a real policy page", and then states the condition itself:
 * "Currently unbuildable, see (2)" — the legal column still points at `/contact`
 * rather than at policy documents. A data-collecting form on a YMYL page without
 * a privacy notice is a P0, and it is a routing and legal task rather than a copy
 * one. The element is absent rather than placeheld.
 *
 */

/**
 * Requirement notes and the unselected option label.
 *
 * Interface chrome rather than marketing copy, and the same class of string as
 * `SKIP_LINK_LABEL`: user-visible, needed for localisation, and absent from the
 * approved document because that document covers page copy. They live in a
 * content module rather than in JSX because "no copy hardcoded in JSX" has no
 * chrome exemption.
 *
 * `requiredNote` and `optionalNote` are words, not an asterisk. The screenshot
 * marks required fields with `*`; § Form rules overrides it — "required and
 * optional state is stated in text, not by an unexplained symbol alone".
 *
 * [QUESTION] `unselectedLabel` is the one string here with no source at all. A
 * required dropdown needs an entry that is not yet an answer, or it silently
 * pre-selects "Payments" and biases every submission. Two words; needs approval.
 */
export const ENQUIRY_CHROME = {
  requiredNote: "required",
  optionalNote: "optional",
  // [CHANGED, 2026-10-14] UX copy pass: "Choose" matches the section's "Choose what to set up first".
  unselectedLabel: "Choose one",
} as const;

/**
 * The four choices, in the approved order, preceded by the unselected entry.
 * The values are the wire protocol and do not change; the labels also name the
 * choice in the delivered email (`lib/enquiry-email.ts`).
 */
// [CHANGED, 2026-10-14] UX copy pass: labels use the body nouns (wallet, health cover); values unchanged.
const NEEDS_OPTIONS: readonly SelectOption[] = [
  { value: "", label: ENQUIRY_CHROME.unselectedLabel },
  { value: "payments", label: "Wallet" },
  { value: "insurance", label: "Health cover" },
  { value: "both", label: "Both" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

/**
 * A message that carries one link inside it.
 *
 * Split into three parts rather than stored as one string with markup in it,
 * because "content as `children` or typed structured props, never as HTML
 * strings". Both anchors and both destinations are specified by
 * `get-started-seo.md` § Internal linking: the success state links "open your
 * free wallet" to `/payments`, the failure state links the address to `mailto:`.
 */
export type LinkedMessage = {
  readonly lead: string;
  readonly link: { readonly label: string; readonly href: string };
  readonly trail: string;
};

export type EnquiryFieldContent = {
  readonly id: string;
  readonly label: string;
  /** Shown when a required field is submitted or blurred empty. */
  readonly errorWhenEmpty?: string;
};

export type GetStartedEnquiryContent = {
  readonly heading: string;
  /** One short supporting sentence. See the note above on which one, and why. */
  readonly intro: string;
  readonly fields: {
    readonly name: EnquiryFieldContent;
    readonly email: EnquiryFieldContent;
    readonly destination: EnquiryFieldContent;
    readonly needs: EnquiryFieldContent;
  };
  readonly needsOptions: readonly SelectOption[];
  readonly submitLabel: string;
  /** Announced while the submission is in flight. */
  readonly submitPendingLabel: string;
  /** Risk-reducing line beneath the submit button. */
  readonly helperText: string;
  readonly successMessage: LinkedMessage;
  readonly failureMessage: LinkedMessage;
  /** Names the error summary that appears above the fields on a failed submit. */
  readonly errorSummaryLabel: string;
};

/**
 * Field-level validation messages.
 *
 * [QUESTION] Also unsourced. The approved document specifies the form's failure
 * message but no per-field validation text, and § Form rules requires errors
 * "per field plus a summary" that state "what went wrong and what to do". Worded
 * as plainly as possible and flagged for approval rather than left absent — an
 * absent validation message is a WCAG 3.3.1 failure, which is a different order
 * of problem from an unapproved sentence.
 */
export const getStartedEnquiryContent: GetStartedEnquiryContent = {
  // [CHANGED, 2026-10-14] UX copy pass: the heading names the visitor's problem; the intro says what
  // the form does. No reply time is promised (none is confirmed).
  heading: "Not sure where to start? Ask us",
  intro:
    "Tell us about your trip and we’ll reply by email to help you choose the wallet, health cover or both.",
  fields: {
    name: {
      id: ENQUIRY_FIELDS.name,
      label: "Name",
      // [CHANGED, 2026-10-14] UX copy pass: shorter; the instruction is the whole message.
      errorWhenEmpty: "Enter your name",
    },
    email: {
      id: ENQUIRY_FIELDS.email,
      label: "Email address",
      // [CHANGED, 2026-10-14] UX copy pass: shown for empty and malformed addresses, so it covers both.
      errorWhenEmpty: "Enter your email address, like name@example.com",
    },
    destination: {
      id: ENQUIRY_FIELDS.destination,
      // [CHANGED, 2026-10-14] UX copy pass: was "Destination"; plain question form.
      label: "Where you’re travelling",
    },
    needs: {
      id: ENQUIRY_FIELDS.needs,
      // [CHANGED, 2026-10-14] UX copy pass: was "What you need"; ties the field to the page's choice.
      label: "What you want to set up",
    },
  },
  needsOptions: NEEDS_OPTIONS,
  submitLabel: "Send enquiry",
  // [CHANGED, 2026-10-14] UX copy pass: ellipsis marks an action in progress.
  submitPendingLabel: "Sending…",
  // [CHANGED, 2026-10-14] UX copy pass: dropped "no monthly fee" (unconfirmed fee claim).
  helperText: "It takes about a minute, and there’s no obligation to sign up.",
  // [CHANGED, 2026-10-14] UX copy pass: was "Check your inbox for the next step" — nothing is sent
  // to the visitor automatically. The link label now matches its /payments destination.
  successMessage: {
    lead: "Enquiry sent. We’ll reply to the email address you gave us. Until then, you can ",
    link: { label: "explore the wallet", href: "/payments" },
    trail: ".",
  },
  // [CHANGED, 2026-10-14] UX copy pass: fields are validated before sending, so the failure is ours;
  // no longer blames the email address.
  failureMessage: {
    lead: "Your enquiry didn’t send. Try again, or email us at ",
    link: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    trail: ".",
  },
  // [CHANGED, 2026-10-14] UX copy pass: says what happened and what to do.
  errorSummaryLabel: "Your enquiry wasn’t sent. Fix the fields below.",
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const GET_STARTED_ENQUIRY_HEADING_ID =
  "get-started-enquiry-heading" as const;
