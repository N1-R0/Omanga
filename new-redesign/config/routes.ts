/**
 * Internal links in the new design (cutover 2026-10-26).
 *
 * Home, Payments and Insurance are live at the site root in the new design.
 * The other pages are still the old design at their old URLs, so content
 * names every page by its sitemap-v2 path and `href()` sends the ones not yet
 * rebuilt to the page that is live today.
 *
 * When a page is rebuilt at its v2 path: delete its line here and add a 301
 * from the old URL in next.config.ts. No component has to change.
 */
const LIVE_PATHS: Record<string, string> = {
  "/insurance/plans": "/plans",
  "/guides": "/blog",
  "/help": "/contact",
  // No page of their own yet; the nearest live page stands in.
  "/payments/countries": "/payments#countries",
  "/rates": "/rates/pounds-to-naira",
  "/insurance/get-care": "/policy-terms#claims",
};

/** Resolve a sitemap-v2 path to the URL that serves it today. */
export function href(path: string): string {
  if (!path.startsWith("/")) return path;
  const [route, hash] = path.split("#");
  const live = LIVE_PATHS[route];
  if (live) return hash ? `${live.split("#")[0]}#${hash}` : live;
  return path;
}
