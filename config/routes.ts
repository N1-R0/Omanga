/**
 * The site's public routes, in one place.
 *
 * `app/sitemap.ts` previously hardcoded its own list of seven paths with no link
 * to the `app/` tree, so adding a page and forgetting the sitemap was a single
 * omission with no way to notice it — and that is exactly what happened: the five
 * legal routes shipped and the sitemap did not know about them.
 *
 * This does not auto-discover routes; Next exposes no supported API for that, and
 * a filesystem walk at build time would be fragile. It is a register that one
 * place owns, which is the achievable version of the same guarantee.
 *
 * ---------------------------------------------------------------------------
 * WHAT BELONGS HERE
 *
 * Public, indexable, canonical URLs. Not `/404`, not `/api/*`, not anchors, and
 * not any future account or dashboard route — those are `noindex` and a sitemap
 * that lists a `noindex` URL sends Google two contradictory instructions about
 * the same page.
 */

export type SitemapPriority = 0.3 | 0.7 | 1;

export type PublicRoute = {
  readonly path: string;
  /**
   * Relative importance within this site only.
   *
   * Google has said publicly that it ignores `priority`, and it is kept for two
   * reasons that do not depend on Google reading it: other crawlers do use it,
   * and it documents intent for whoever next edits this file.
   */
  readonly priority: SitemapPriority;
};

const MARKETING_ROUTES: readonly PublicRoute[] = [
  { path: "/", priority: 1 },
  { path: "/insurance", priority: 0.7 },
  { path: "/plans", priority: 0.7 },
  { path: "/payments", priority: 0.7 },
  { path: "/get-started", priority: 0.7 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
];

/**
 * Indexable, but at a lower priority.
 *
 * They stay in the sitemap because published legal documents are a trust signal
 * for a YMYL site — see `lib/legal-metadata.ts` for why they are not `noindex`.
 * The lower priority says what is true: they are not the pages to spend crawl
 * budget on.
 */
const LEGAL_ROUTES: readonly PublicRoute[] = [
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms-of-use", priority: 0.3 },
  { path: "/policy-terms", priority: 0.3 },
  { path: "/complaints-procedure", priority: 0.3 },
  { path: "/cookie-policy", priority: 0.3 },
];

export const PUBLIC_ROUTES: readonly PublicRoute[] = [
  ...MARKETING_ROUTES,
  ...LEGAL_ROUTES,
];
