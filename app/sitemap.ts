import type { MetadataRoute } from "next";

import { PUBLIC_ROUTES } from "@/config/routes";
import { absoluteUrl } from "@/config/site";
import { getNgnRates } from "@/lib/rates";

/**
 * [CHANGED, 2026-10-18] Audit quick win: every URL now carries a real
 * `lastmod` (from `PUBLIC_ROUTES`), and `priority` is no longer emitted
 * (Google ignores it). Rate pages use the live rate snapshot's date, so the
 * sitemap is rebuilt hourly alongside them.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { date } = await getNgnRates();
  const ratesDate = date ?? new Date().toISOString().slice(0, 10);

  return PUBLIC_ROUTES.map(({ path, lastModified }) => ({
    url: absoluteUrl(path),
    lastModified: lastModified === "rates" ? ratesDate : lastModified,
  }));
}
