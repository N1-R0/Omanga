import type { MetadataRoute } from "next";

import { PUBLIC_ROUTES } from "@/config/routes";
import { absoluteUrl } from "@/config/site";

/**
 * The XML sitemap.
 *
 * ---------------------------------------------------------------------------
 * THREE THINGS WERE WRONG, AND ALL THREE ARE FIXED HERE
 *
 * 1. It emitted the wrong hostname. Built from `absoluteUrl`, which read
 *    `SITE_URL`, which defaulted to the bare apex — so every `<loc>` was a URL
 *    that 301s to www. A sitemap of redirecting URLs is a sitemap Google has to
 *    correct on every entry. Fixed at the root in `config/site.ts`; this file
 *    needed no change for it, which is the point of having one owner.
 *
 * 2. `lastModified: new Date()` stamped every URL as modified at build time, on
 *    every deploy. That is not a lie about one page, it is a claim that the whole
 *    site changed whenever anything did — and the documented consequence is that
 *    Google learns the signal is worthless and stops reading it. Removed; see
 *    below for why removal beats a guess.
 *
 * 3. It hardcoded seven paths with no connection to the routes that exist. The
 *    five legal pages shipped and were missing from it. Now derived from
 *    `config/routes.ts`.
 *
 * ---------------------------------------------------------------------------
 * WHY `lastModified` IS ABSENT RATHER THAN APPROXIMATED
 *
 * The honest value is the date each page's content last changed, which lives in
 * git history and is not available at build time without shelling out to git —
 * which would couple the build to a `.git` directory that is not present in every
 * deployment environment.
 *
 * Given the choice between a wrong value and no value, no value is correct.
 * Omitting the field lets Google fall back to its own crawl history, which is
 * accurate; supplying "now" actively misinforms it. Add real per-route dates when
 * there is a real source for them.
 *
 * `changeFrequency` is dropped for the same reason it was never useful: Google
 * has confirmed it ignores the field entirely.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    priority,
  }));
}
