import type { NextConfig } from "next";

/**
 * Response headers.
 *
 * The site previously set none of these. They are added as part of the privacy
 * and security review, and each one is chosen because it is safe to apply to a
 * statically rendered site without testing every page against it.
 *
 * ---------------------------------------------------------------------------
 * WHAT IS DELIBERATELY NOT HERE: a full Content-Security-Policy
 *
 * A CSP with `script-src` would be the single biggest hardening available, and it
 * is not set, for a reason worth recording rather than leaving as an omission.
 *
 * Next.js inlines hydration data and bootstrap scripts into the HTML. Allowing
 * those under a strict policy needs a per-response nonce, and generating a nonce
 * per response means the page can no longer be prerendered — every route in this
 * app is currently static, and turning the whole site dynamic to add a header is
 * a real performance and cost decision, not a config tweak. The alternative,
 * `script-src 'unsafe-inline'`, is a policy that permits precisely the attack it
 * exists to stop.
 *
 * So the directives below are the ones that need no nonce and break nothing:
 * they lock down framing, form targets, plugin content and the base URL. Adding
 * `script-src` with nonces is a worthwhile follow-up and should be taken as its
 * own change, with its own testing.
 */
const SECURITY_HEADERS = [
  /**
   * Stops a browser from second-guessing a declared Content-Type — the mechanism
   * behind treating an uploaded or user-supplied file as a script.
   */
  { key: "X-Content-Type-Options", value: "nosniff" },

  /**
   * Send the full URL to ourselves, the origin only to other secure sites, and
   * nothing at all on a downgrade to HTTP.
   *
   * This is a privacy control as much as a security one, and it has a specific
   * job here: the Google Maps embed on /contact would otherwise be told the exact
   * page a visitor was reading. It also means that if a page URL ever carries
   * something it should not, it does not travel outward with the request.
   */
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  /**
   * Switches off browser features this site does not use, so no script — ours,
   * an embed's, or an injected one — can reach for them.
   *
   * `geolocation=()` is the one that matters most for the claims made in the
   * Privacy Policy: it says we do not collect precise location, and this makes
   * that structurally true rather than a promise. `payment=()` is safe because no
   * payment is taken on this site; both the Paystack checkout and the wallet are
   * off-site on their own origins, where their own headers apply.
   */
  {
    key: "Permissions-Policy",
    value:
      "geolocation=(), camera=(), microphone=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), interest-cohort=()",
  },

  /**
   * A year, with subdomains, and preload-eligible. The site is HTTPS-only and
   * served by a host that terminates TLS for every subdomain, so `includeSubDomains`
   * costs nothing here — it is only dangerous where a subdomain still needs HTTP.
   */
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },

  /**
   * `frame-ancestors` is the modern control and `X-Frame-Options` is kept beside
   * it for browsers that only honour the older header. Both say the same thing:
   * this site is not to be framed by anyone else, which is what stops a clickjack
   * overlay being built on top of the plan checkout links.
   *
   * `frame-src` is the interesting one. It restricts what this site may embed
   * down to Google's map hosts, so the consent gate on the map is backed by the
   * browser as well as by our own code — if an embed for anything else were ever
   * added, it would fail loudly rather than quietly loading a third party.
   *
   * `form-action 'self'` keeps form submissions pointed at our own endpoint.
   * `object-src 'none'` and `base-uri 'self'` close two classic injection routes.
   */
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Content-Security-Policy",
    value: [
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "form-action 'self'",
      "frame-src https://maps.google.com https://www.google.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
