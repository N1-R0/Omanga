import { BRAND_COLOR, INK_COLOR, SITE_NAME } from "@/config/site";
import { getStartedEnquiryContent } from "@/content/get-started-enquiry.content";
import type { EnquirySubmission } from "@/lib/enquiry";

/**
 * The enquiry notification email — subject, plain-text body and HTML body.
 *
 * Server-only by use rather than by decoration: nothing in the client bundle
 * imports it. Extracted from the Route Handler once the HTML template arrived,
 * because a mail template and a request lifecycle are different concerns and the
 * handler should stay readable as a sequence of guards.
 *
 * Both bodies are returned and both are sent. `nodemailer` assembles them into
 * one `multipart/alternative` message, so a client that refuses HTML — a
 * terminal reader, a watch, a screen reader in plain-text mode, a rule piping
 * mail into a ticketing system — still gets the whole enquiry rather than a
 * stripped-out husk. The text part is not a fallback nobody sees; it is what
 * some readers will actually get.
 *
 * ---------------------------------------------------------------------------
 * HTML email is not HTML
 *
 * There is no cascade to rely on. Gmail discards `<style>` blocks entirely, so
 * every declaration here is inline. Outlook renders through Word's engine, which
 * has no flexbox, no grid, no `float` worth trusting and no reliable `padding`
 * on a `div` — so layout is tables, which is the one primitive every client
 * still agrees on. `role="presentation"` on each keeps them out of the
 * accessibility tree, since they are scaffolding and not data.
 *
 * Web fonts are not loaded. The site's Kantumruy Pro cannot be fetched by a mail
 * client, and a client that fails to load a font falls back unpredictably
 * mid-layout. A system stack renders identically to what the reader already sees
 * everywhere else in their inbox, which is the correct look for a notification.
 *
 * Colours are literals for the same reason `config/site.ts` already keeps them
 * as literals for the theme-colour tag and the Open Graph image: this runs
 * outside the stylesheet and cannot read a CSS custom property. That file's
 * comment names two such consumers; this is the third.
 */

/** Neutrals that exist only in this template. */
const PAGE_FILL = "#f4f4f5";
const CARD_FILL = "#ffffff";
const HAIRLINE = "#e5e5e5";
const MUTED_INK = "#6b6b6b";

const FONT_STACK =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const NOT_PROVIDED = "Not provided";

/**
 * [GENERALISED] This module rendered exactly one form's email. The Contact page's
 * `Talk to us` form needs the same shell with different rows, and duplicating a
 * table-layout HTML email is how two templates end up differing in a client
 * nobody tests in.
 *
 * So the shell, the escaping, the row renderers and the preview-text trick are
 * shared, and each form supplies a `title`, its rows and a source label.
 * `composeEnquiryEmail` keeps its exact previous behaviour and output — it is now
 * a thin caller of `composeFormEmail` — so the Get Started form is untouched.
 */
const GET_STARTED_TITLE = "New Get Started Enquiry";

/**
 * Escapes a submitted value for interpolation into markup.
 *
 * The security control of this module, and new with the HTML body: the plain
 * text version could carry any character harmlessly, whereas a `<` from a
 * submitted name becomes a tag in the recipient's mail client. Values arrive
 * here already stripped of control characters and length-capped by `sanitise`
 * in `lib/enquiry.ts`, which stops header injection — this stops the other half.
 *
 * `&` is replaced first. Reversing the order would double-escape every entity
 * the later replacements introduce.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * The label for a submitted `needs` value, resolved through the same option list
 * the dropdown renders — so the email reads "Not sure yet" rather than
 * `not-sure`, and the two cannot drift apart. An unrecognised value falls back
 * to itself: it is sanitised and capped, so printing it is safe, and seeing the
 * raw value tells whoever reads the enquiry more than a blank would.
 */
function needsLabel(value: string): string {
  return (
    getStartedEnquiryContent.needsOptions.find(
      (option) => option.value === value,
    )?.label ?? value
  );
}

export type Row = {
  readonly label: string;
  readonly value: string;
  /** Marked in the output, and rendered as "Not provided" when empty. */
  readonly isOptional: boolean;
  /** Renders the value as a link. Used for the reply address. */
  readonly href?: string;
  /**
   * Render the value as a block of prose rather than a single line — preserving
   * the submitter's own line breaks.
   *
   * Added for the Contact form's message field, which is the first multi-line
   * value the rail carries. `white-space: pre-wrap` is what keeps their
   * paragraphing; without it a message arrives as one run of text and reads as
   * though they typed it that way.
   */
  readonly isMultiline?: boolean;
};

function rowsFor(submission: EnquirySubmission): readonly Row[] {
  return [
    { label: "Name", value: submission.name, isOptional: false },
    {
      label: "Email",
      value: submission.email,
      isOptional: false,
      href: `mailto:${submission.email}`,
    },
    { label: "Destination", value: submission.destination, isOptional: true },
    {
      label: "What they need",
      value: submission.needs === "" ? "" : needsLabel(submission.needs),
      isOptional: true,
    },
  ];
}

function renderTextRow({ label, value, isOptional }: Row): string {
  const suffix = isOptional ? " (optional)" : "";
  return `${label}${suffix}: ${value === "" ? NOT_PROVIDED : value}`;
}

function renderHtmlRow({
  label,
  value,
  isOptional,
  href,
  isMultiline = false,
}: Row): string {
  const isEmpty = value === "";

  const rendered = isEmpty
    ? `<span style="color:${MUTED_INK};font-style:italic;">${NOT_PROVIDED}</span>`
    : href !== undefined
      ? `<a href="${escapeHtml(href)}" style="color:${BRAND_COLOR};text-decoration:underline;">${escapeHtml(value)}</a>`
      : isMultiline
        ? `<span style="white-space:pre-wrap;">${escapeHtml(value)}</span>`
        : escapeHtml(value);

  const note = isOptional
    ? ` <span style="font-weight:400;text-transform:none;letter-spacing:0;color:${MUTED_INK};">(optional)</span>`
    : "";

  return `
              <tr>
                <td style="padding:16px 28px;border-bottom:1px solid ${HAIRLINE};">
                  <div style="font:600 11px/1.4 ${FONT_STACK};letter-spacing:0.08em;text-transform:uppercase;color:${MUTED_INK};padding-bottom:6px;">${escapeHtml(label)}${note}</div>
                  <div style="font:400 16px/1.5 ${FONT_STACK};color:${INK_COLOR};">${rendered}</div>
                </td>
              </tr>`;
}

/**
 * Everything one form's email needs beyond the shared shell.
 *
 * `replyName` and `previewValue` are separate because they do different jobs:
 * the first completes the "reply to reach X" line, the second is the line clients
 * show beside the subject in the message list.
 */
export type FormEmail = {
  readonly title: string;
  readonly rows: readonly Row[];
  readonly replyName: string;
  readonly previewValue: string;
  /** Named in the footer, so a reader knows which form produced the mail. */
  readonly sourceLabel: string;
};

function renderText(email: FormEmail): string {
  return [
    email.title,
    "",
    ...email.rows.map(renderTextRow),
    "",
    `Reply to this email to reach ${email.replyName} directly.`,
  ].join("\n");
}

function renderHtml(email: FormEmail): string {
  const { title, replyName, previewValue, sourceLabel } = email;
  const rows = email.rows.map(renderHtmlRow).join("");

  /*
    Preview text: the line most clients show beside the subject in the message
    list. Zero-height and colour-matched to the background so it never renders in
    the body, which is the only way to control it.
  */
  const preview = escapeHtml(
    `${replyName} — ${previewValue === "" ? NOT_PROVIDED : previewValue}`,
  );

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${PAGE_FILL};">
    <div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px;">${preview}</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PAGE_FILL};">
      <tr>
        <td align="center" style="padding:32px 12px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:${CARD_FILL};border:1px solid ${HAIRLINE};">

            <tr>
              <td style="background-color:${BRAND_COLOR};padding:22px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font:700 17px/1 ${FONT_STACK};letter-spacing:0.14em;color:#ffffff;">${SITE_NAME.toUpperCase()}</td>
                    <td align="right" style="font:400 12px/1 ${FONT_STACK};color:#ffffff;opacity:0.85;">Website enquiry</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 28px 4px;">
                <div style="font:700 22px/1.3 ${FONT_STACK};color:${INK_COLOR};">${escapeHtml(title)}</div>
              </td>
            </tr>
            ${rows}

            <tr>
              <td style="padding:20px 28px 28px;">
                <div style="font:400 14px/1.6 ${FONT_STACK};color:${MUTED_INK};">
                  Reply to this email to reach ${escapeHtml(replyName)} directly.
                </div>
              </td>
            </tr>
          </table>

          <div style="font:400 12px/1.6 ${FONT_STACK};color:${MUTED_INK};padding-top:16px;max-width:600px;">
            Sent automatically from the ${escapeHtml(sourceLabel)} on omanga.biz
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export type EnquiryEmail = {
  readonly subject: string;
  readonly text: string;
  readonly html: string;
};

/**
 * Assembles one form's notification email from the shared shell.
 *
 * The only exported renderer. A second form supplies its own rows and title and
 * gets the identical shell, which is what stops two table-layout templates
 * drifting apart in a mail client nobody tests in.
 */
export function composeFormEmail(email: FormEmail): EnquiryEmail {
  return {
    subject: `${email.title} — ${email.replyName}`,
    text: renderText(email),
    html: renderHtml(email),
  };
}

/**
 * The Get Started form's email. Behaviour and output are unchanged — this is the
 * same subject, the same rows and the same shell it produced before the shell
 * was shared.
 */
export function composeEnquiryEmail(
  submission: EnquirySubmission,
): EnquiryEmail {
  return composeFormEmail({
    title: GET_STARTED_TITLE,
    rows: rowsFor(submission),
    replyName: submission.name,
    previewValue: submission.destination,
    sourceLabel: "Get Started form",
  });
}
