/**
 * Site-level constants.
 *
 * Only facts that are approved and stable live here. Several values the footer
 * and schema will eventually need — registered company name and number,
 * address, phone, social handles, the payments licensing entity and the
 * insurance underwriter — are open blockers in project-context.md and are
 * deliberately absent. An absent constant fails a build loudly; a placeholder
 * ships a false claim on a payments and insurance page.
 */

/**
 * Canonical product and brand naming.
 *
 * BLOCKER (project-context.md, open blocker 5): the source documents use both
 * "Omanga Payment Solutions" and "Omanga Payment Solution". The product name is
 * intentionally not defined here until that is resolved — resolving it by
 * picking one would bake a guess into every page's copy and schema.
 */
export const SITE_NAME = "Omanga" as const;

/**
 * Contact address. Confirmed in project-context.md as a P0 defect to fix:
 * the current site's mailto is broken.
 */
export const CONTACT_EMAIL = "info@omanga.biz" as const;

/**
 * Origin used to build canonical URLs, Open Graph URLs and the sitemap.
 *
 * Read from the environment so preview deployments do not emit production
 * canonicals. `NEXT_PUBLIC_` because the value is genuinely public and is
 * needed when composing absolute URLs during static rendering.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://omanga.biz";

export const SITE_LOCALE = "en" as const;

/**
 * Where the wallet sign-up lives.
 *
 * Off-site: the wallet is issued by a separate platform, so every "open a
 * wallet" call to action leaves omanga.biz. Defined here rather than typed into
 * each content module so the destination has exactly one owner — the previous
 * arrangement had the hero pointing at the marketing `/payments` page and the
 * legacy group holding a second, differently-cased copy of this URL.
 *
 * Any CTA using this must also set `isExternal: true`, which is what adds
 * `target="_blank"` and `rel="noopener noreferrer"` at render time.
 */
export const WALLET_URL = "https://omanga.useinclude.com/" as const;

/**
 * Per-tier insurance checkout, one Paystack page each.
 *
 * Off-site, like the wallet: payment is taken by Paystack, so `Select Gold`
 * leaves omanga.biz and lands on the page for that tier and no other. This is
 * the behaviour the legacy `/plans` page had — the URLs were
 * `PLAN_CHECKOUT_URLS` in `app/(legacy)/_lib/links.ts`, which the redesign
 * dropped in favour of a single `WALLET_URL` for all three cards, sending the
 * buyer to pick the tier a second time. Moved here on the legacy page's
 * deletion so the redesign keeps the tier through the handoff.
 *
 * Keyed by tier name, but *not* typed as `Record<InsurancePlanName, string>`:
 * nothing in `config/` imports from `content/`, and one type-only import would
 * be the first edge in that direction. `insurance-plans.content.ts` closes the
 * gap with an assignment that has to typecheck against `InsurancePlanName`, so
 * a renamed or added tier still fails the build. Any CTA using these must also
 * set `isExternal: true`.
 *
 * [VERIFY] Transcribed unchanged from the legacy file. Nothing in the source
 * documents states which Paystack page belongs to which tier, so the mapping is
 * the legacy page's — worth one pass in the Paystack dashboard confirming the
 * amounts behind these three links are $50, $85 and $120, because a swapped
 * pair here charges the wrong price and reads as correct.
 */
export const PLAN_CHECKOUT_URLS = {
  Silver: "https://paystack.shop/pay/c2xlmupefm",
  Gold: "https://paystack.shop/pay/mq8op6uyir",
  Diamond: "https://paystack.shop/pay/e-qmgo0nlw",
} as const;

/**
 * Brand colours as literals, for the two consumers that cannot read a CSS
 * token: the `viewport` theme-colour meta tag and the Open Graph
 * `ImageResponse`. Both run outside the stylesheet. Values mirror
 * `--color-brand` and `--color-ink`.
 */
export const BRAND_COLOR = "#ae2448" as const;
export const INK_COLOR = "#161717" as const;

/**
 * Compose an absolute URL from a site-relative path.
 * Kept here rather than in `lib/` because it is configuration-derived, and
 * nothing else should ever concatenate the origin by hand.
 */
export function absoluteUrl(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalised, SITE_URL).toString();
}
