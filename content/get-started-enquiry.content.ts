import { CONTACT_EMAIL } from "@/config/site";
import { ENQUIRY_FIELDS } from "@/lib/enquiry";
import type { SelectOption } from "@/components/ui/Select";

/**
 * The Get Started page's closing enquiry section.
 *
 * Verbatim from `Omanga-Get-Started-Copy - NJ reviewed.docx`, § Section 4 —
 * Closing section, with NJ's tracked changes accepted. The heading is
 * corroborated by `get-started-seo.md` § Heading hierarchy, which lists "Ready to
 * experience Africa?" as this section's H2.
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
 * ---------------------------------------------------------------------------
 * [SHORTENED] The intro is now one approved sentence pair, not two.
 *
 * It carried both paragraphs the document gives § Section 4. The first — "Open
 * your Omanga account and travel with your payments and your health cover already
 * handled. The spirit of Ubuntu lives in us all…" — is dropped, not rewritten.
 * Shortening by selection rather than by editing is the only way to shorten
 * approved copy without becoming its author.
 *
 * Which one goes was not a coin toss. The remaining line is the one that explains
 * what the form is for and what pressing the button does; the dropped one is a
 * brand statement about Omanga that says nothing about the form beneath it. The
 * heading already carries the invitation.
 *
 * Two things follow. The dropped sentence is not lost from the site — it is
 * `cta.content.ts` verbatim, so it still ships on the homepage's closing band,
 * and dropping it here also settles the duplicate-body-copy question the previous
 * version of this note raised. And the heading is unchanged, because the approved
 * document does not require otherwise: § Section 4 gives it as "Ready to
 * experience Africa?", which `get-started-seo.md` § Heading hierarchy also lists
 * as this section's H2. The brief's "Book a demo" is the benchmark's heading.
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
  unselectedLabel: "Select one",
} as const;

/**
 * The four approved choices, in the approved order, preceded by the unselected
 * entry. The document gives them as "Payments · Insurance · Both · Not sure yet".
 */
const NEEDS_OPTIONS: readonly SelectOption[] = [
  { value: "", label: ENQUIRY_CHROME.unselectedLabel },
  { value: "payments", label: "Payments" },
  { value: "insurance", label: "Insurance" },
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
  heading: "Ready to experience Africa?",
  intro:
    "Not sure which solution fits your trip? Tell us where you’re going and we’ll point you to the right one.",
  fields: {
    name: {
      id: ENQUIRY_FIELDS.name,
      label: "Your name",
      errorWhenEmpty: "Enter your name so we know who to reply to.",
    },
    email: {
      id: ENQUIRY_FIELDS.email,
      label: "Email address",
      errorWhenEmpty: "Enter an email address we can reply to.",
    },
    destination: {
      id: ENQUIRY_FIELDS.destination,
      label: "Where are you travelling?",
    },
    needs: {
      id: ENQUIRY_FIELDS.needs,
      label: "What do you need?",
    },
  },
  needsOptions: NEEDS_OPTIONS,
  submitLabel: "Get Started",
  submitPendingLabel: "Sending",
  helperText:
    "Takes a minute. No obligation, and no monthly fee to hold a wallet.",
  successMessage: {
    lead: "Thanks — we’ve got it. Check your inbox for the next step; if you’d rather not wait, ",
    link: { label: "open your free wallet", href: "/payments" },
    trail: " now.",
  },
  failureMessage: {
    lead: "That didn’t send. Check your email address and try again, or email us at ",
    link: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    trail: ".",
  },
  errorSummaryLabel: "There is a problem with this form",
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const GET_STARTED_ENQUIRY_HEADING_ID =
  "get-started-enquiry-heading" as const;
