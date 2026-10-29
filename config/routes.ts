import { BLOG_POSTS } from "@/content/blog";
import { LEGAL_EFFECTIVE_DATE } from "@/content/legal/legal-shared.content";
import { RATE_PAIRS } from "@/content/rates.content";

const MARKETING_UPDATED = "2026-10-18";

const REDESIGN_LIVE = "2026-10-26";

export type SitemapPriority = 0.3 | 0.7 | 1;

export type PublicRoute = {
  readonly path: string;
  readonly priority: SitemapPriority;
  readonly lastModified: string;
};

const MARKETING_ROUTES: readonly PublicRoute[] = [
  { path: "/", priority: 1, lastModified: REDESIGN_LIVE },
  { path: "/insurance", priority: 0.7, lastModified: REDESIGN_LIVE },
  { path: "/plans", priority: 0.7, lastModified: MARKETING_UPDATED },
  { path: "/payments", priority: 0.7, lastModified: REDESIGN_LIVE },
  { path: "/about", priority: 0.7, lastModified: MARKETING_UPDATED },
  { path: "/contact", priority: 0.7, lastModified: MARKETING_UPDATED },
  { path: "/safety", priority: 0.7, lastModified: MARKETING_UPDATED },
  ...RATE_PAIRS.map((pair) => ({
    path: `/rates/${pair.slug}`,
    priority: 0.7 as const,
    lastModified: "rates",
  })),
];

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
