import type { BlogCategory, BlogPost } from "@/types/blog.types";

import { dettyDecemberChecklistPost } from "./posts/detty-december-nigeria-checklist.content";
import { howFarDoes100DollarsGoPost } from "./posts/how-far-does-100-dollars-go-in-nigeria.content";
import { healthInsuranceVisitingNigeriaPost } from "./posts/health-insurance-for-visiting-nigeria.content";

/**
 * Every published article. Adding a post: create a module in `./posts`, then
 * add it here — the index page, the `[slug]` route, `generateStaticParams` and
 * the sitemap all read this list, so there is nothing else to register.
 *
 * Newest first by `publishedDate`; ties keep the order written here.
 */
const POSTS: readonly BlogPost[] = [
  howFarDoes100DollarsGoPost,
  healthInsuranceVisitingNigeriaPost,
  dettyDecemberChecklistPost,
];

export const BLOG_POSTS: readonly BlogPost[] = [...POSTS].sort((a, b) =>
  b.publishedDate.localeCompare(a.publishedDate),
);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/**
 * Display names for post categories. The `BlogCategory` values stay as stored;
 * readers see the site's own nouns.
 */
// [CHANGED, 2026-10-14] UX copy pass: "Payments"/"Insurance" -> "Money"/"Health
// cover", matching the nouns used across the site (wallet, health cover).
export const BLOG_CATEGORY_LABELS: Readonly<Record<BlogCategory, string>> = {
  Payments: "Money",
  Insurance: "Health cover",
  Travel: "Travel",
};

// [CHANGED, 2026-10-14] UX copy pass: Nigeria-only framing (health cover is
// Nigeria only), searchable title under 60 characters, readers' benefit first.
export const blogIndexContent = {
  meta: {
    title: "Omanga Blog: Nigeria Travel, Money and Health Guides",
    description:
      "Guides for visiting Nigeria: what things cost, how to pay, exchange rates and health cover for your trip. Written by Omanga in Lagos.",
    path: "/blog",
  },
  eyebrow: "Omanga Blog",
  heading: "Guides for your trip to Nigeria",
  intro:
    "What things cost, how to pay and how to stay covered. Plain advice for tourists, Nigerians abroad and anyone visiting.",
  readLabel: "Read guide",
  relatedHeading: "More guides for your trip",
} as const;
