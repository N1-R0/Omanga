import { CONTACT_EMAIL } from "@/config/site";
import type { CallToAction, LinkTarget } from "@/types/content.types";

/**
 * Global content — strings that appear on more than one page.
 *
 * This module is the exemplar for the content architecture. Section modules
 * sit beside it as `<section-name>.content.ts`, each exporting one
 * `<sectionName>Content` object typed against `SectionContent<T>` from
 * `types/content.types.ts`. They are populated in the page-implementation
 * phase, not here.
 *
 * Everything below is verbatim from the CEO-approved copy document via
 * project-context.md § Non-negotiable copy facts. Nothing here is drafted,
 * paraphrased, or inferred. If a string is not in the approved doc, it does
 * not belong in this file.
 */

/**
 * The single primary call to action for the site — the header button and the
 * closing conversion band.
 *
 * Approved label, exactly as written. Sections import this rather than retyping
 * it, so the label cannot drift between the hero, the CTA band and the header.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] Destination is `/get-started`, on site.
 *
 * The history matters, because this is the second time the value has moved. It
 * was originally `/get-started`, was repointed at `WALLET_URL` because that route
 * did not exist and both controls were returning a 404, and now returns to
 * `/get-started` because the route does exist — it is the page whose entire job
 * is to resolve "payments, insurance, or both" before the visitor commits.
 *
 * Two consequences, both deliberate:
 *
 *   - `isExternal` is gone, not set to `false`. The destination is internal, so
 *     the flag has nothing to describe, and `Button` already defaults it — which
 *     means no `target="_blank"` and no `rel`, correctly. It also removes a
 *     latent defect: `Header` and `MobileNav` never forwarded `isExternal` to
 *     their `Button`, so while this pointed off-site the header's own control was
 *     the one link on the page opening an external URL in the same tab with no
 *     `rel`. That is now moot rather than merely unnoticed.
 *
 *   - The site's two highest-intent controls are now internal links, which is
 *     what `get-started-seo.md` § Internal linking asks for: the page is a router
 *     and "a router with no inbound links routes nobody", listing the nav and the
 *     homepage among the required inbound sources. The off-site wallet sign-up is
 *     still one press away — it is the hero's primary on the homepage and will be
 *     the Get Started page's own primary — so no path to the wallet is lost.
 *
 * `WALLET_URL` therefore has no consumer in this module and its import is gone —
 * an unused import is a build warning, and the build must pass with none. The
 * constant itself is untouched in `config/site.ts`, where `hero.content.ts`
 * imports it for "Open Your Free Wallet".
 */
export const PRIMARY_CTA: CallToAction = {
  label: "Get Started",
  href: "/get-started",
  emphasis: "primary",
} as const;

/**
 * Contact link, built from the configured address.
 *
 * project-context.md lists a broken `mailto:info@omanga.biz` as a P0 defect to
 * fix in this build. Composing it here means there is one place it can be
 * wrong.
 */
export const CONTACT_LINK: LinkTarget = {
  label: CONTACT_EMAIL,
  href: `mailto:${CONTACT_EMAIL}`,
} as const;

/**
 * Skip-link label.
 *
 * Interface chrome, not marketing copy — it is not in the approved document
 * because the document covers user-facing page copy, and there is no drawn
 * skip link in Figma either. It still belongs in a content module rather than
 * in JSX: it is a user-visible string, it needs translating if the site is ever
 * localised, and "no copy hardcoded in JSX" has no chrome exemption.
 *
 * Wording follows the WCAG technique's convention rather than being invented for
 * this site, so a screen-reader user meets the phrasing they already expect.
 */
export const SKIP_LINK_LABEL = "Skip to main content" as const;

/**
 * The id of the `main` landmark, shared by the layout that renders it and the
 * skip link that targets it. One constant, because if the two ever disagree the
 * skip link points at nothing — and nothing about that failure is visible until
 * someone tries it with a keyboard.
 */
export const MAIN_CONTENT_ID = "main-content" as const;

/**
 * Approved factual constants.
 *
 * Exporting the count as a constant means no section can type the wrong number
 * without deleting this line first.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] 43 → 50, and the rendered figure is now open-ended.
 *
 * The previous value came from the CEO-approved copy document's tracked changes,
 * which replaced every "52" the redesign spec carried with "43". That figure was
 * shipped across ten content modules, the homepage meta description, the footer's
 * coverage label and `Organization.areaServed`.
 *
 * Superseded on instruction: the count is **50+**. Two consequences worth
 * recording, because both are departures from how this constant behaved:
 *
 *   1. The rendered figure is no longer the bare number. "50" and "50+" are
 *      different claims — one is exact, the other is a floor — and every place
 *      this appears in copy means the floor. `COUNTRIES_SERVED_DISPLAY` is
 *      therefore what copy interpolates, and the bare number stays for the one
 *      consumer that needs arithmetic rather than a label.
 *
 *   2. The payments content spec's own "52+" is *not* what shipped either. It
 *      was raised alongside this change and 50+ was confirmed over it, so a
 *      later reader finding 52 in that document is finding the superseded value,
 *      not an unapplied correction.
 */
export const COUNTRIES_SERVED = 50 as const;

/**
 * The count as copy renders it.
 *
 * A separate constant rather than a `+` typed at each site, for the reason every
 * other duplicated fact on this site has one owner: eleven interpolations that
 * each append their own suffix is eleven places for one of them to say "50
 * countries" when the claim is "50 or more".
 *
 * Every user-facing string interpolates this. `COUNTRIES_SERVED` itself is only
 * for a consumer that needs the number as a number.
 */
export const COUNTRIES_SERVED_DISPLAY = `${COUNTRIES_SERVED}+` as const;

/**
 * Product vocabulary guard.
 *
 * Tracked changes removed every "card" claim from the approved copy; "one
 * card" became "a customized payment solution". Physical-card language must
 * not reappear in copy, image alt text, or component names. Recorded here as
 * documentation for the lint rule that enforces it — deliberately not a
 * string that renders.
 */
export const FORBIDDEN_COPY_TERMS = ["card", "cards"] as const;

/**
 * Anchor for the live exchange-rate section on `/payments`.
 *
 * Lives here rather than in `services.content.ts` because it has two owners in
 * different route groups — the homepage service card links to it, and the legacy
 * payments page renders it. A constant in a shared module is what stops the link
 * and its target drifting apart, which is exactly how `/insurance#coverage` ended
 * up pointing at a page with no coverage section on it.
 */
export const PAYMENTS_RATES_ANCHOR = "rates" as const;
