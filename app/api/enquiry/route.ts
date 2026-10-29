import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

import {
  CONTACT_FORM_KIND,
  FORM_KIND_FIELD,
  validateContactEnquiry,
} from "@/lib/contact-enquiry";
import { composeContactEnquiryEmail } from "@/lib/contact-enquiry-email";
import { isHoneypotFilled } from "@/lib/enquiry";
import type { EnquiryEmail } from "@/lib/enquiry-email";
import { createRateLimiter } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export const runtime = "nodejs";

export const maxDuration = 30;

const checkRateLimit = createRateLimiter({
  limit: 5,
  windowMs: 60 * 60 * 1000,
});

function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded !== null && forwarded.trim() !== "") {
    return forwarded.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}

type DeliveryResult = "sent" | "not-configured" | "failed";

type MailConfig = {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
  readonly recipient: string;
};

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

let transporter: Transporter | null = null;

function getTransporter(config: MailConfig): Transporter {
  transporter ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return transporter;
}

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

type Prepared =
  | {
      readonly isValid: true;
      readonly email: EnquiryEmail;
      readonly replyTo: string;
    }
  | { readonly isValid: false; readonly invalidFields: readonly string[] };

function prepare(values: FormData): Prepared {
  if (values.get(FORM_KIND_FIELD) !== CONTACT_FORM_KIND) {
    return { isValid: false, invalidFields: [FORM_KIND_FIELD] };
  }

  const validation = validateContactEnquiry(values);

  return validation.isValid
    ? {
        isValid: true,
        email: composeContactEnquiryEmail(validation.data),
        replyTo: validation.data.email,
      }
    : { isValid: false, invalidFields: validation.invalidFields };
}

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
    return Response.json({ error: "malformed-request" }, { status: 400 });
  }

  if (isHoneypotFilled(values)) {
    return Response.json({ ok: true }, { status: 202 });
  }

  const prepared = prepare(values);

  if (!prepared.isValid) {
    return Response.json(
      { invalidFields: prepared.invalidFields },
      { status: 422 },
    );
  }

  const result = await deliver(prepared.email, prepared.replyTo);

  if (result === "sent") {
    return Response.json({ ok: true }, { status: 202 });
  }

  console.error("[enquiry] delivery failed", { reason: result });

  return Response.json({ error: "delivery-failed" }, { status: 503 });
}
