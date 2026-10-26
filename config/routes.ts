import { BLOG_POSTS } from "@/content/blog";
import { LEGAL_EFFECTIVE_DATE } from "@/content/legal/legal-shared.content";
import { RATE_PAIRS } from "@/content/rates.content";

/** Last content change on the marketing pages (2026-10-18 copy pass). */
const MARKETING_UPDATED = "2026-10-18";

/** Home, Payments and Insurance went live in the new design (2026-10-26). */
const REDESIGN_LIVE = "2026-10-26";

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
  /**
   * [ADDED, 2026-10-18] Sitemap `lastmod` (audit quick win): the date the
   * page's content last changed, YYYY-MM-DD. "rates" means the live rate
   * snapshot date, resolved in app/sitemap.ts. Update a page's date when its
   * copy changes. (`priority` stays here as documented intent but is no
   * longer emitted in the sitemap.)
   */
  readonly lastModified: string;
};

const MARKETING_ROUTES: readonly PublicRoute[] = [
  { path: "/", priority: 1, lastModified: REDESIGN_LIVE },
  { path: "/insurance", priority: 0.7, lastModified: REDESIGN_LIVE },
  { path: "/plans", priority: 0.7, lastModified: MARKETING_UPDATED },
  { path: "/payments", priority: 0.7, lastModified: REDESIGN_LIVE },
  { path: "/about", priority: 0.7, lastModified: MARKETING_UPDATED },
  { path: "/contact", priority: 0.7, lastModified: MARKETING_UPDATED },
  // [ADDED, 2026-10-18] "Is Omanga safe?"
  { path: "/safety", priority: 0.7, lastModified: MARKETING_UPDATED },
  // [ADDED, 2026-10-18] Live rate pages (content/rates.content.ts).
  ...RATE_PAIRS.map((pair) => ({
    path: `/rates/${pair.slug}`,
    priority: 0.7 as const,
    lastModified: "rates",
  })),
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
  {
    path: "/privacy-policy",
    priority: 0.3,
    lastModified: LEGAL_EFFECTIVE_DATE,
  },
  { path: "/terms-of-use", priority: 0.3, lastModified: LEGAL_EFFECTIVE_DATE },
  { path: "/policy-terms", priority: 0.3, lastModified: LEGAL_EFFECTIVE_DATE },
  {
    path: "/complaints-procedure",
    priority: 0.3,
    lastModified: LEGAL_EFFECTIVE_DATE,
  },
  { path: "/cookie-policy", priority: 0.3, lastModified: LEGAL_EFFECTIVE_DATE },
];

/**
 * [ADDED, 2026-10-09] The blog index and every article, read from the post
 * list so a new article reaches the sitemap without a second registration.
 */
const BLOG_ROUTES: readonly PublicRoute[] = [
  { path: "/blog", priority: 0.7, lastModified: MARKETING_UPDATED },
  ...BLOG_POSTS.map((post) => ({
    path: post.meta.path,
    priority: 0.7 as const,
    lastModified: post.updatedDate ?? post.publishedDate,
  })),
];

export const PUBLIC_ROUTES: readonly PublicRoute[] = [
  ...MARKETING_ROUTES,
  ...BLOG_ROUTES,
  ...LEGAL_ROUTES,
];
