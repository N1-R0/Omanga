import type { BlogCategory, BlogPost } from "@/types/blog.types";

import { canIUseMyCardInNigeriaPost } from "./posts/can-i-use-my-card-in-nigeria.content";
import { dettyDecemberChecklistPost } from "./posts/detty-december-nigeria-checklist.content";
import { howFarDoes100DollarsGoPost } from "./posts/how-far-does-100-dollars-go-in-nigeria.content";
import { healthInsuranceVisitingNigeriaPost } from "./posts/health-insurance-for-visiting-nigeria.content";
import { poundsToNairaBestRatePost } from "./posts/pounds-to-naira-best-rate.content";
import { visitingNigeriaForTheFirstTimePost } from "./posts/visiting-nigeria-for-the-first-time.content";

const POSTS: readonly BlogPost[] = [
  canIUseMyCardInNigeriaPost,
  visitingNigeriaForTheFirstTimePost,
  howFarDoes100DollarsGoPost,
  healthInsuranceVisitingNigeriaPost,
  dettyDecemberChecklistPost,
  poundsToNairaBestRatePost,
];

export const BLOG_POSTS: readonly BlogPost[] = [...POSTS].sort((a, b) =>
  b.publishedDate.localeCompare(a.publishedDate),
);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export const BLOG_CATEGORY_LABELS: Readonly<Record<BlogCategory, string>> = {
  Payments: "Money",
  Insurance: "Health cover",
  Travel: "Travel",
};

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
