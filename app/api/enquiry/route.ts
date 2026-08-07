import { validateEnquiry } from "@/lib/enquiry";
import type { EnquirySubmission } from "@/lib/enquiry";

/**
 * The enquiry form's submission endpoint.
 *
 * `project-context.md` specifies "form submissions via a Route Handler", and
 * coding-guidelines.md requires the server to "validate on the server regardless
 * of client validation". This is the authoritative validation; the form component
 * mirrors it from the same module and never assumes success.
 *
 * The whole submission layer is these two functions. The UI knows only that it
 * posts `FormData` here and reads a status code back, so replacing the delivery
 * mechanism touches nothing outside this file.
 *
 * ---------------------------------------------------------------------------
 * ZOHO MAIL DELIVERY — the remaining step
 *
 * Flow, as planned: form → POST here → validate and sanitise → send to the Zoho
 * mailbox → status back to the user. Everything except the send is implemented.
 *
 * To finish it:
 *
 *   1. `npm install nodemailer` and `npm install -D @types/nodemailer`. It is not
 *      installed yet because it is not needed until the send exists, and this
 *      phase is the rail rather than the delivery. It is also the only genuinely
 *      required addition — SMTP over TLS is not something to hand-roll.
 *
 *   2. Set these in the environment. None carries a `NEXT_PUBLIC_` prefix and
 *      none may ever get one: they are read only in this file, which runs only on
 *      the server, and "never read secrets or environment values in a Client
 *      Component".
 *
 *        ZOHO_SMTP_HOST       smtp.zoho.com  (smtp.zoho.eu for an EU account)
 *        ZOHO_SMTP_PORT       465
 *        ZOHO_SMTP_USER       the full Zoho mailbox address
 *        ZOHO_SMTP_PASSWORD   an application-specific password, not the account
 *                             password — Zoho requires one when 2FA is on
 *        ENQUIRY_RECIPIENT    where enquiries are delivered
 *
 *   3. Implement `deliverEnquiry` with a transport on port 465 and `secure: true`.
 *      Send `from` the authenticated mailbox — Zoho rejects a `from` it does not
 *      own — and put the submitter's address in `replyTo` so a reply reaches
 *      them. Both values pass through `sanitise` in `lib/enquiry.ts` first, which
 *      is what stops a newline in a submitted value becoming a mail header.
 *
 * No CRM, no database, no third-party form service, no newsletter list: a
 * submission becomes one email and nothing is stored.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] Until step 3 lands, a valid submission returns 503 and the form shows
 * its approved failure message, whose fallback — emailing `info@omanga.biz` — is
 * a path that works today. Failing loudly is the right behaviour: an endpoint
 * that returns 200 while discarding enquiries loses real customers silently.
 */

/** Static by default across the app; a handler that sends mail cannot be. */
export const dynamic = "force-dynamic";

type DeliveryResult = "sent" | "not-configured" | "failed";

/**
 * The delivery step. One contract, one implementation, one call site.
 *
 * The type states what the real function receives; the implementation ignores it
 * because there is no transport yet. Replacing the body is the whole integration.
 */
type DeliverEnquiry = (
  submission: EnquirySubmission,
) => Promise<DeliveryResult>;

const deliverEnquiry: DeliverEnquiry = async () => "not-configured";

export async function POST(request: Request): Promise<Response> {
  let values: FormData;

  try {
    values = await request.formData();
  } catch {
    // A body that is not form-encoded is not a submission from this form.
    return Response.json({ error: "malformed-request" }, { status: 400 });
  }

  const validation = validateEnquiry(values);

  if (!validation.isValid) {
    /*
      Field names, not messages. Every user-facing string belongs to the content
      module, and a server that returned prose would be a second place for copy to
      live — and a place with no locale.
    */
    return Response.json(
      { invalidFields: validation.invalidFields },
      { status: 422 },
    );
  }

  const result = await deliverEnquiry(validation.data);

  if (result === "sent") {
    return Response.json({ ok: true }, { status: 202 });
  }

  /*
    Logged with context on the server, and nothing internal returned to the
    client — no transport name, no stack, no address. "Server-side failures log
    with context; client-facing messages expose no internals."
  */
  console.error("[enquiry] delivery failed", { reason: result });

  return Response.json({ error: "delivery-failed" }, { status: 503 });
}
