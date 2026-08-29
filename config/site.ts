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
 *
 * ---------------------------------------------------------------------------
 * [FIXED] The fallback was `https://omanga.biz`, and it was wrong in production.
 *
 * The host serves `www.omanga.biz` and 301-redirects the bare apex to it —
 * verified live: requesting `https://omanga.biz/insurance` lands on
 * `https://www.omanga.biz/insurance`. But with `NEXT_PUBLIC_SITE_URL` unset in
 * production, this fallback made every page emit:
 *
 *   <link rel="canonical" href="https://omanga.biz/insurance">   ← redirects away
 *   <meta property="og:url" content="https://omanga.biz/insurance">
 *   robots.txt  Sitemap: https://omanga.biz/sitemap.xml          ← redirects away
 *   sitemap.xml every <loc> on the apex                          ← all redirect
 *
 * A canonical pointing at a URL that redirects elsewhere is a self-contradicting
 * signal: the page says "the real me is over there", and over there says "no, back
 * here". Google's documented response is to distrust the annotation and choose a
 * canonical itself, which means Omanga had no reliable control over which
 * hostname got indexed, with ranking signals split across two of them.
 *
 * The fallback now names the host that is actually served, so the correct value
 * ships even when the environment variable is missing — which is the state that
 * caused this. Setting `NEXT_PUBLIC_SITE_URL=https://www.omanga.biz` in the
 * production environment is still worth doing, but is no longer load-bearing.
 *
 * If the apex is ever made primary instead, change this string and flip the
 * host's redirect in the same commit. The one thing that must never happen again
 * is the two disagreeing.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.omanga.biz";

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
 * The office address, as supplied.
 *
 * One owner, like every other contact route: the Contact page's § 5 renders it,
 * the footer's `[VERIFY]` address slot wants the same string, and two copies of
 * an address is how a moved office gets updated in one place.
 *
 * ---------------------------------------------------------------------------
 * [VERIFY] Whether this is the *registered* address.
 *
 * The Contact spec § 5 asks for "a registered address and company number", and
 * § Schema is explicit about what turns on the distinction: "Do not mark up a
 * `PostalAddress` until a registered address is confirmed. Structured data
 * asserting a location Omanga has not published is a factual accuracy risk."
 *
 * This was supplied as "the address" without that qualifier, so it renders as a
 * plain paragraph — where § 5 puts it — and is deliberately *not* in the schema
 * graph. A trading address and a registered office are frequently different, and
 * for a payments and insurance product the registered one is what a quality
 * rater and a regulator look for. Confirm which this is before it reaches
 * `Organization.address` or the footer's legal block.
 *
 * The company number is still absent. § E-E-A-T item 3 wants both together.
 */
export const OFFICE_ADDRESS =
  "Plot 175 Akin Adesola St. Victoria Island, Lagos, Nigeria" as const;

/**
 * The office as an embeddable Google map.
 *
 * Derived from `OFFICE_ADDRESS` rather than typed, so the map and the printed
 * address cannot disagree. A map pinning a different place from the address
 * beneath it is worse than no map.
 *
 * ---------------------------------------------------------------------------
 * [VERIFY] The embed URL is the keyless form, which is not the documented one.
 *
 * Google's supported endpoint is the Maps Embed API —
 * `https://www.google.com/maps/embed/v1/place?key=…&q=…` — which needs an API key.
 * There is none in the environment and `.env.example` defines no slot for one, so
 * this uses `maps.google.com/maps?q=…&output=embed`: widely used, works today, and
 * undocumented, which means Google can change it without notice.
 *
 * Moving to the supported endpoint is a one-line change here plus a
 * `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` in the environment. Worth doing before
 * launch — an embed key is public by design and is restricted by HTTP referrer
 * rather than kept secret, so it carries none of the risk the SMTP credentials do.
 *
 * [REMOVED] A companion `OFFICE_MAP_URL` pointing at the documented Maps URLs
 * `search` endpoint, for a "Get directions" link beneath the map. The link was
 * removed on instruction and the constant went with it rather than sitting
 * unreferenced — Google's own frame already opens directions from its pin, so
 * nothing a visitor could do was lost. It is two lines to restore if a directions
 * link is ever wanted back.
 */
export const OFFICE_MAP_EMBED_URL =
  `https://maps.google.com/maps?q=${encodeURIComponent(OFFICE_ADDRESS)}&output=embed` as const;

/**
 * The support channel, as a complete `wa.me` deep link.
 *
 * Off-site, like the wallet: the conversation happens in WhatsApp, so every
 * "chat with us" control leaves omanga.biz. Defined here rather than in a
 * content module because the Contact page uses it twice — the hero's support
 * block and § 5's support card — and the footer will want it too. The Contact
 * spec is explicit that this must be "one number, one entry point, no
 * fragmentation", which is only enforceable if it has one owner.
 *
 * Any CTA using this must also set `isExternal: true`, which is what adds
 * `target="_blank"` and `rel="noopener noreferrer"` at render time. The Contact
 * spec § 2 requires exactly that, and requires it not be intercepted with a
 * modal: on mobile the link deep-links into the WhatsApp app, on desktop it
 * opens WhatsApp Web.
 *
 * The prefilled opener is part of the URL, per § 2: "Prefill the message body
 * with a neutral opener… so the visitor doesn't stare at an empty compose box.
 * Keep the prefill generic — do not prefill an enquiry category from the hero,
 * because the hero is not a category selection." Supplied as-is and generic.
 *
 * ---------------------------------------------------------------------------
 * [VERIFIED] Confirmed working against the live account, 2026-08-27.
 *
 * Worth recording why that is worth stating: the number is `23408099441818`,
 * which is Nigeria's country code `234` followed by `08099441818` — still
 * carrying the national trunk prefix `0`. `wa.me` documents an E.164 number with
 * no `+`, no spaces and no trunk prefix, which would make the canonical form
 * `2348099441818`. It was raised as a likely defect on those grounds and tested;
 * WhatsApp resolves this form, so it ships as supplied.
 *
 * If the link ever starts returning "phone number shared via url is invalid",
 * dropping the `0` after `234` is the first thing to try. Do not change it
 * speculatively — a working link is the only evidence that matters here, and the
 * Contact spec § 5 is explicit that a dead `wa.me` link is unacceptable.
 */
export const WHATSAPP_URL =
  "https://wa.me/23408099441818?text=Hello%2C%20I%E2%80%99m%20interested%20in%20Omanga%E2%80%99s%20services%20and%20would%20like%20some%20guidance." as const;

/**
 * The same number, formatted for a visitor to read.
 *
 * A second constant rather than one derived from the other, and the reason is the
 * trunk prefix recorded above: `WHATSAPP_URL` carries `23408099441818`, fourteen
 * digits, because that is the string confirmed working. Deriving a display form
 * from it means programmatically deciding the `0` after `234` is a trunk prefix
 * and dropping it — which is almost certainly right and is still a guess about a
 * phone number, made in a regex, at render time.
 *
 * So it is written out, in international format, with the grouping a Nigerian
 * number takes. The same arrangement `BRAND_COLOR` already has beside its CSS
 * token: two representations of one fact, because one consumer cannot read the
 * other's form.
 *
 * ---------------------------------------------------------------------------
 * [VERIFY] That this is the number a visitor should save.
 *
 * It is `WHATSAPP_URL`'s digits with the national trunk `0` removed, which is what
 * E.164 requires and what a visitor outside Nigeria has to dial. If the WhatsApp
 * account is registered to a different number and the URL only works because
 * WhatsApp normalises it, then this string is wrong in the one place being wrong
 * matters — a number someone copies into their contacts.
 *
 * Confirm against the WhatsApp Business profile, not against the link working.
 *
 * [NOTE] This is not a phone number for calling, and it is not published as one.
 * The Contact spec § 0 mandates "no phone number appears anywhere on the page",
 * and § 5 repeats it. That mandate replaces *calling* with chat — its own
 * placeholder note lists "no WhatsApp number" among the values Omanga was expected
 * to supply. So this renders as the chat channel's identifier, linked to `wa.me`
 * and never to `tel:`.
 */
export const WHATSAPP_NUMBER_DISPLAY = "+234 809 944 1818" as const;

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
