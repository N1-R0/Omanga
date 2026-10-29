import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticle } from "@/components/blog/BlogArticle";
import { JsonLd } from "@/components/seo/JsonLd";
import { BLOG_POSTS, blogIndexContent, getBlogPost } from "@/content/blog";
import { buildBlogPosting, buildFaqPage, buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { HomeFinalCta } from "@/new-redesign/components/sections/home/HomeFinalCta";
import { FaqSection } from "@/new-redesign/components/ui/FaqSection";
import { OLD_PAGE_FAQ_SUB, oldPageFaq } from "@/new-redesign/content/old-pages.content";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getBlogPost(slug);

  return post === undefined
    ? {}
    : buildPageMetadata(post.meta, { ogType: "article" });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getBlogPost(slug);

  if (post === undefined) {
    notFound();
  }

  return (
    <>
      <JsonLd
        graph={buildPageGraph(post.meta, {
          crumb: post.title,
          parent: { name: "Blog", path: "/blog" },
          nodes: [
            buildBlogPosting(post),
            ...(post.faq === undefined ? [] : [buildFaqPage(post.meta, post.faq.items)]),
          ],
        })}
      />

      <BlogArticle
        post={post}
        related={BLOG_POSTS.filter((other) => other.slug !== post.slug).slice(0, 3)}
        readLabel={blogIndexContent.readLabel}
        relatedHeading={blogIndexContent.relatedHeading}
      />

      {post.faq !== undefined && (
        <FaqSection {...oldPageFaq(post.faq.heading, OLD_PAGE_FAQ_SUB.guide, post.faq.items)} />
      )}

      <HomeFinalCta />
    </>
  );
}
