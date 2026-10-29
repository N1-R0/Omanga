import { BRAND_COLOR, INK_COLOR, SITE_NAME } from "@/config/site";

const PAGE_FILL = "#f4f4f5";
const CARD_FILL = "#ffffff";
const HAIRLINE = "#e5e5e5";
const MUTED_INK = "#6b6b6b";

const FONT_STACK =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const NOT_PROVIDED = "Not provided";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type Row = {
  readonly label: string;
  readonly value: string;
  readonly isOptional: boolean;
  readonly href?: string;
  readonly isMultiline?: boolean;
};

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

export type FormEmail = {
  readonly title: string;
  readonly rows: readonly Row[];
  readonly replyName: string;
  readonly previewValue: string;
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

export function composeFormEmail(email: FormEmail): EnquiryEmail {
  return {
    subject: `${email.title} — ${email.replyName}`,
    text: renderText(email),
    html: renderHtml(email),
  };
}
