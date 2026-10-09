import type { BlogPost } from "@/types/blog.types";

import { dettyDecemberChecklistPost } from "./posts/detty-december-nigeria-checklist.content";
import { healthInsuranceVisitingNigeriaPost } from "./posts/health-insurance-for-visiting-nigeria.content";
import { howToPayInNigeriaPost } from "./posts/how-to-pay-in-nigeria-as-a-visitor.content";

/**
 * Every published article. Adding a post: create a module in `./posts`, then
 * add it here — the index page, the `[slug]` route, `generateStaticParams` and
 * the sitemap all read this list, so there is nothing else to register.
 *
 * Newest first by `publishedDate`; ties keep the order written here.
 */
const POSTS: readonly BlogPost[] = [
  howToPayInNigeriaPost,
  healthInsuranceVisitingNigeriaPost,
  dettyDecemberChecklistPost,
];

export const BLOG_POSTS: readonly BlogPost[] = [...POSTS].sort((a, b) =>
  b.publishedDate.localeCompare(a.publishedDate),
);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export const blogIndexContent = {
  meta: {
    title: "Blog — Guides to Paying and Staying Healthy in Africa | Omanga",
    description:
      "Practical guides from Omanga on paying for things, exchange rates and travel health insurance when visiting Nigeria and across Africa.",
    path: "/blog",
  },
  eyebrow: "Omanga Blog",
  heading: "Guides for travelling across Africa",
  intro:
    "Practical advice on paying for things, getting fair exchange rates and staying covered when you travel to Nigeria and across the continent.",
  readLabel: "Read article",
} as const;
