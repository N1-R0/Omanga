/**
 * The form guards shared by the enquiry endpoint and the forms that post to it:
 * the honeypot, the email pattern and sanitisation. Pure and React-free, so the
 * Route Handler and the form component share one implementation.
 *
 * The Get Started form's own fields and validation were removed with its page
 * (2026-10-26); the Contact form's live in `lib/contact-enquiry.ts`.
 */

/**
 * The honeypot control's name, and the only anti-spam measure the markup
 * carries.
 *
 * Not one of the form's own fields: everything that iterates those — labels,
 * validation, the delivered email — would be wrong if this were among them. It
 * is a decoy, so it is named like one a scripted filler would want to complete
 * and nothing like the string a reader would associate with a trap.
 *
 * Kept in this module rather than in the Route Handler because the form renders
 * the control and the server reads it, which is the same two-caller problem the
 * rest of this file exists to solve.
 */
export const ENQUIRY_HONEYPOT_FIELD = "enquiry-website" as const;

/**
 * Whether a submission filled the decoy.
 *
 * The control is `aria-hidden`, off the tab order and clipped to a pixel, so no
 * person reaches it and no assistive technology announces it. A non-empty value
 * therefore means something walked the DOM and filled every input it found.
 *
 * Deliberately separate from validation. A failed validation is a message
 * to a user; this is a silent discard, and folding the two together would put a
 * bot on the same code path as a person who mistyped their address.
 */
export function isHoneypotFilled(values: FormData): boolean {
  const decoy = values.get(ENQUIRY_HONEYPOT_FIELD);

  return typeof decoy === "string" && decoy.trim() !== "";
}

/**
 * Deliberately permissive. A stricter pattern rejects valid addresses — quoted
 * local parts, new gTLDs, unicode domains — and the only authoritative test of
 * an address is whether mail to it is accepted. This catches typos and empty
 * submissions, which is all client-side email validation can honestly do.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Strips the characters that turn a form value into a mail header.
 *
 * This is the one piece of sanitisation that is a security control rather than
 * tidiness: a CR or LF in a value that reaches a `Subject` or `Reply-To` header
 * lets a submitter inject headers of their own — extra recipients, a different
 * sender — which is header injection. Removed here, once, so no caller has to
 * remember. Other control characters go with them because nothing legitimate
 * puts them in a name or a destination.
 */
export function sanitise(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001F\u007F]+/g, " ")
    .trim()
    .slice(0, maxLength);
}
