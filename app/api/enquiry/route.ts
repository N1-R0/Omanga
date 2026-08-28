import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

import {
  CONTACT_FORM_KIND,
  FORM_KIND_FIELD,
  validateContactEnquiry,
} from "@/lib/contact-enquiry";
import { composeContactEnquiryEmail } from "@/lib/contact-enquiry-email";
import { isHoneypotFilled, validateEnquiry } from "@/lib/enquiry";
import { composeEnquiryEmail } from "@/lib/enquiry-email";
import type { EnquiryEmail } from "@/lib/enquiry-email";
import { createRateLimiter } from "@/lib/rate-limit";

/**
 * The enquiry form's submission endpoint.
 *
 * `project-context.md` specifies "form submissions via a Route Handler", and
 * coding-guidelines.md requires the server to "validate on the server regardless
 * of client validation". This is the authoritative validation; the form component
 * mirrors it from the same module and never assumes success.
 *
 * A submission becomes one email to the business mailbox and nothing else. No
 * CRM, no database, no third-party form service, no newsletter list — so there
 * is no store to secure, no retention policy to write and nothing to leak.
 *
 * ---------------------------------------------------------------------------
 * The order of the request, and why it is that order
 *
 *   1. rate limit      cheapest check, and the one that has to run before any
 *                      work is done on behalf of a caller flooding the endpoint
 *   2. parse body      rejects anything that is not a form submission
 *   3. honeypot        silent 202; a bot learns nothing from the response
 *   4. validate        authoritative, shared with the client via `lib/enquiry`
 *   5. deliver         Zoho SMTP
 *   6. respond         a status code and a machine-readable reason, never prose
 *
 * Steps 1 and 3 are different in kind on purpose. The limiter stops volume from
 * one address and knows nothing about content; the honeypot stops automation
 * regardless of address and knows nothing about volume. Each covers what the
 * other misses, and neither costs a real visitor anything.
 *
 * ---------------------------------------------------------------------------
 * SECRETS
 *
 * Every value below is read from the environment, in this file, which runs only
 * on the server. None carries a `NEXT_PUBLIC_` prefix and none may ever get one:
 * a prefixed variable is inlined into the client bundle at build time, which
 * would publish the mailbox password to every visitor. coding-guidelines.md:
 * "never read secrets or environment values in a Client Component."
 *
 *   ZOHO_SMTP_HOST       smtppro.zoho.com for a paid organisation account on a
 *                        domain address, which omanga.biz is. Free and personal
 *                        accounts use smtp.zoho.com; the suffix follows the
 *                        datacentre the account was created in.
 *   ZOHO_SMTP_PORT       465
 *   ZOHO_SMTP_USER       the full Zoho mailbox address
 *   ZOHO_SMTP_PASSWORD   an application-specific password, not the account
 *                        password — Zoho requires one when 2FA is on
 *   ENQUIRY_RECIPIENT    where enquiries are delivered
 *
 * See `.env.example`. If any is missing the endpoint returns 503 and the form
 * shows its approved failure message, whose fallback — emailing the published
 * address — works today. Failing loudly is the right behaviour: an endpoint that
 * returns 200 while discarding enquiries loses real customers silently.
 */

/** Static by default across the app; a handler that sends mail cannot be. */
export const dynamic = "force-dynamic";

/**
 * Node, not Edge. `nodemailer` opens a TLS socket to an SMTP server, which the
 * Edge runtime has no API for. This is the default, stated rather than assumed
 * because the wrong value here fails at deploy time rather than in review.
 */
export const runtime = "nodejs";

/**
 * Thirty seconds, against a platform default of ten.
 *
 * [MEASURED] A rejected authentication against Zoho took 7.2s locally — TLS
 * handshake, EHLO, AUTH, refusal. That is most of a ten-second budget spent on
 * the fast failure, and a slow one has further to go. Being killed by the
 * platform mid-send is the worst available outcome: the visitor gets the host's
 * error page instead of this section's approved failure message, and nobody
 * learns whether the mail went out.
 *
 * The transport timeouts below are the real control, and they are set well
 * inside this ceiling. This is only the headroom that lets them fire first.
 */
export const maxDuration = 30;

/* -----------------------------------------------------------------------------
   Rate limiting
   -------------------------------------------------------------------------- */

/**
 * Five submissions per address per hour.
 *
 * Set against the real user rather than the attacker: nobody enquires twice
 * about one trip, so five is already generous for a shared office address behind
 * one NAT, and it is far below what a script needs to be worth running. See
 * `lib/rate-limit.ts` for what a single-process counter can and cannot promise.
 *
 * Module scope, so the counter survives between requests to the same warm
 * instance. A limiter constructed inside the handler would start empty on every
 * request and permit everything.
 */
/*
  [NOTE] One bucket for the endpoint, now that two forms post to it. Five contact
  enquiries therefore exhaust the Get Started form's quota for the same address,
  and the reverse.

  Left shared deliberately. Keying the bucket per form would mean reading the body
  to learn which form sent it, and that inverts the ordering this handler is built
  around — "rate limit: cheapest check, and the one that has to run before any work
  is done on behalf of a caller flooding the endpoint". Trading the abuse guard's
  position for a quota split matters far less than it costs: five submissions from
  one address in an hour is already generous for either form, and a visitor who
  legitimately files five contact enquiries is not about to open a wallet in the
  same hour.

  If it ever bites, the fix is a second limiter keyed on address alone with a
  higher combined ceiling — not moving the body parse above this.
*/
const checkRateLimit = createRateLimiter({
  limit: 5,
  windowMs: 60 * 60 * 1000,
});

/**
 * The caller's address, as far as it can be known.
 *
 * `x-forwarded-for` is a list appended to by each proxy, so the first entry is
 * the client and the rest are the hops. It is trivially spoofable in general —
 * but on a platform that terminates TLS and rewrites the header itself, the
 * leftmost value is the one the platform saw, which is the best available.
 *
 * `unknown` is a real bucket rather than a bypass. Falling back to "allow" would
 * make the limiter optional to anyone who strips a header.
 */
function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded !== null && forwarded.trim() !== "") {
    return forwarded.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}

/* -----------------------------------------------------------------------------
   Zoho delivery
   -------------------------------------------------------------------------- */

type DeliveryResult = "sent" | "not-configured" | "failed";

type MailConfig = {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
  readonly recipient: string;
};

/**
 * Reads the mail configuration, or returns `null` if it is incomplete.
 *
 * All five or none. A transport built from three of five values fails at connect
 * time with a message about the wrong thing, and a partially configured mailbox
 * is a misconfiguration to report rather than a state to limp along in.
 */
function readMailConfig(): MailConfig | null {
  const host = process.env.ZOHO_SMTP_HOST;
  const port = Number(process.env.ZOHO_SMTP_PORT);
  const user = process.env.ZOHO_SMTP_USER;
  const password = process.env.ZOHO_SMTP_PASSWORD;
  const recipient = process.env.ENQUIRY_RECIPIENT;

  if (
    host === undefined ||
    user === undefined ||
    password === undefined ||
    recipient === undefined ||
    !Number.isInteger(port)
  ) {
    return null;
  }

  return { host, port, user, password, recipient };
}

/**
 * The SMTP transport, built once per process and reused.
 *
 * A transport per request would open and tear down a TLS connection every time,
 * which is the slow part of sending mail. `nodemailer` pools connections, and a
 * pool that is discarded after one use is not a pool.
 */
let transporter: Transporter | null = null;

function getTransporter(config: MailConfig): Transporter {
  transporter ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    // Implicit TLS on 465. `secure: false` on this port negotiates nothing and
    // hangs; STARTTLS on 587 is the alternative, and Zoho supports both.
    secure: config.port === 465,
    auth: { user: config.user, pass: config.password },
    /*
      Fail fast, and fail as ourselves.

      nodemailer's defaults are two minutes to connect and ten to finish, which
      are sized for a background job rather than for a request a person is
      waiting on. Left alone they outlast the function's own budget, so a stalled
      SMTP server would get this route killed by the platform — and a killed
      function returns the host's error page, not the failure message this
      section had approved and translated.

      These caps put the ceiling inside `maxDuration`, so a hung transport ends
      as a caught exception, becomes a 503, and reaches the visitor as the words
      the form is supposed to say.
    */
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return transporter;
}

/**
 * Sends one enquiry to the business mailbox.
 *
 * `from` is the authenticated mailbox and not the visitor's address: Zoho
 * rejects a `from` it does not own, and forging one is what SPF and DMARC exist
 * to stop. The visitor's address goes in `replyTo`, so hitting reply reaches
 * them — which is the behaviour the `from` header would otherwise have been
 * abused to get.
 */
async function deliver(
  email: EnquiryEmail,
  replyTo: string,
): Promise<DeliveryResult> {
  const config = readMailConfig();

  if (config === null) {
    return "not-configured";
  }

  const { subject, text, html } = email;

  try {
    /*
      Both bodies, deliberately. Given `text` and `html`, nodemailer builds one
      `multipart/alternative` message and the reader's client picks — so a client
      that will not render HTML still receives the full enquiry.
    */
    await getTransporter(config).sendMail({
      from: config.user,
      to: config.recipient,
      replyTo,
      subject,
      text,
      html,
    });

    return "sent";
  } catch (error) {
    console.error("[enquiry] smtp send failed", { error });

    return "failed";
  }
}

/* -----------------------------------------------------------------------------
   Which form posted, and what to send
   -------------------------------------------------------------------------- */

/**
 * A validated submission reduced to the two things delivery needs, or the fields
 * that failed.
 *
 * This is what lets one handler serve two forms without a cast. Each branch below
 * narrows its own validator's result, so the submission type never has to be
 * widened or asserted — the handler downstream sees only a composed email and a
 * reply address and knows nothing about which form produced them.
 */
type Prepared =
  | {
      readonly isValid: true;
      readonly email: EnquiryEmail;
      readonly replyTo: string;
    }
  | { readonly isValid: false; readonly invalidFields: readonly string[] };

/**
 * Routes a submission to its form's validator and email template.
 *
 * A hidden field rather than a second endpoint: every guard in the handler — the
 * limiter, the body parse, the honeypot, the 503 when mail is unconfigured, the
 * response codes — is identical for both forms, and so is the SMTP transport and
 * its connection pool. See `FORM_KIND_FIELD` for the full reasoning.
 *
 * Absent means the Get Started form, so that form's existing requests are
 * unchanged and it needed no edit. An unrecognised value falls through to the
 * same default, which is the safe direction: a validator rejects a submission it
 * cannot read rather than accepting one it should not.
 */
function prepare(values: FormData): Prepared {
  if (values.get(FORM_KIND_FIELD) === CONTACT_FORM_KIND) {
    const validation = validateContactEnquiry(values);

    return validation.isValid
      ? {
          isValid: true,
          email: composeContactEnquiryEmail(validation.data),
          replyTo: validation.data.email,
        }
      : { isValid: false, invalidFields: validation.invalidFields };
  }

  const validation = validateEnquiry(values);

  return validation.isValid
    ? {
        isValid: true,
        email: composeEnquiryEmail(validation.data),
        replyTo: validation.data.email,
      }
    : { isValid: false, invalidFields: validation.invalidFields };
}

/* -----------------------------------------------------------------------------
   The handler
   -------------------------------------------------------------------------- */

export async function POST(request: Request): Promise<Response> {
  const rateLimit = checkRateLimit(clientAddress(request));

  if (!rateLimit.isAllowed) {
    return Response.json(
      { error: "rate-limited" },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  let values: FormData;

  try {
    values = await request.formData();
  } catch {
    // A body that is not form-encoded is not a submission from this form.
    return Response.json({ error: "malformed-request" }, { status: 400 });
  }

  /*
    Accepted and discarded. The response is indistinguishable from a successful
    submission, so a script gets no signal that the decoy exists and no reason to
    try again without it. Nothing is sent and nothing is stored.
  */
  if (isHoneypotFilled(values)) {
    return Response.json({ ok: true }, { status: 202 });
  }

  const prepared = prepare(values);

  if (!prepared.isValid) {
    /*
      Field names, not messages. Every user-facing string belongs to the content
      module, and a server that returned prose would be a second place for copy to
      live — and a place with no locale.

      Each form's validator returns its own field-name union and each form's
      content module owns the mapping to its own approved messages, so neither can
      show the other's.
    */
    return Response.json(
      { invalidFields: prepared.invalidFields },
      { status: 422 },
    );
  }

  const result = await deliver(prepared.email, prepared.replyTo);

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
