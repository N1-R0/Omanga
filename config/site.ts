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
 * Compose an absolute URL from a site-relative path.
 * Kept here rather than in `lib/` because it is configuration-derived, and
 * nothing else should ever concatenate the origin by hand.
 */
export function absoluteUrl(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalised, SITE_URL).toString();
}
