/**
 * GA4 events, sent only if `gtag.js` is on the page.
 *
 * `gtag` exists only after a visitor allows analytics (ConsentedAnalytics), and
 * only in production builds, so a call before consent or in development is a
 * no-op rather than a queued hit. Nothing here loads a script.
 *
 * Event names (SEO audit, 2026-10-28). Each measures a conversion step the
 * site can see; mark them as key events in GA4 Admin:
 *   - wallet_signup_click  any link to WALLET_URL (sign-up is off-site)
 *   - plan_checkout_click  any link to a Paystack plan page, with `plan`
 *   - whatsapp_click       any wa.me link
 *   - email_click          any mailto: link
 *   - generate_lead        the Contact form was accepted by /api/enquiry
 * GA4's enhanced measurement also sends a generic `click` for outbound links;
 * these names are distinct, so nothing is counted twice under one name.
 */
type Gtag = (command: "event", name: string, params?: Record<string, string>) => void;

export function trackEvent(name: string, params: Record<string, string> = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, { page_path: window.location.pathname, ...params });
}
