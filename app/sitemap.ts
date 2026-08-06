import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/site";

const ROUTES = [
  "/",
  "/about",
  "/contact",
  "/insurance",
  "/payments",
  "/plans",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
