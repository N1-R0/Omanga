import type { MetadataRoute } from "next";

import { PUBLIC_ROUTES } from "@/config/routes";
import { absoluteUrl } from "@/config/site";
import { getNgnRates } from "@/lib/rates";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { date } = await getNgnRates();
  const ratesDate = date ?? new Date().toISOString().slice(0, 10);

  return PUBLIC_ROUTES.map(({ path, lastModified }) => ({
    url: absoluteUrl(path),
    lastModified: lastModified === "rates" ? ratesDate : lastModified,
  }));
}
