import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/site";

/**
 * `robots.txt`.
 *
 * ---------------------------------------------------------------------------
 * [FIXED] `host: SITE_URL`
 *
 * `Host` is a Yandex extension. Google and Bing ignore it, and it was emitting
 * the apex hostname that redirects to www — so the one crawler that does read it
 * was being pointed at the wrong host. Removed rather than corrected: the
 * canonical tag is the mechanism that actually communicates the preferred
 * hostname, and it now says the right thing on every page.
 *
 * The `Sitemap:` line was emitting the same wrong hostname. It is built from
 * `absoluteUrl`, so the fix in `config/site.ts` corrects it here too.
 *
 * ---------------------------------------------------------------------------
 * [ADDED] `Disallow: /api/`
 *
 * `app/api/enquiry/route.ts` is the form endpoint. It answers `POST` only, so a
 * crawler's `GET` gets a 405 — harmless, but it is crawl budget spent to learn
 * nothing, on the one route that is deliberately dynamic while every page is
 * static.
 *
 * ---------------------------------------------------------------------------
 * NOTHING ELSE IS DISALLOWED, DELIBERATELY
 *
 * There is a standing temptation to disallow anything not wanted in search. It is
 * the wrong tool: `Disallow` blocks crawling, not indexing, so a blocked URL with
 * inbound links can still be indexed — as a bare URL with no title or snippet,
 * because the crawler was never allowed to read the page it is listing. Anything
 * that should stay out of results gets `noindex` in its metadata instead, which
 * requires the page to remain crawlable.
 *
 * That distinction will matter when account or dashboard routes exist:
 * `noindex` on the route, not `Disallow` here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
