export const ENQUIRY_HONEYPOT_FIELD = "enquiry-website" as const;

export function isHoneypotFilled(values: FormData): boolean {
  const decoy = values.get(ENQUIRY_HONEYPOT_FIELD);

  return typeof decoy === "string" && decoy.trim() !== "";
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitise(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001F\u007F]+/g, " ")
    .trim()
    .slice(0, maxLength);
}
