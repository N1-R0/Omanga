import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticle } from "@/components/blog/BlogArticle";
import { JsonLd } from "@/components/seo/JsonLd";
import { BLOG_POSTS, getBlogPost } from "@/content/blog";
import { buildBlogPosting, buildFaqPage, buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

/**
 * A blog article. Every article is prerendered from `BLOG_POSTS`; any other
 * slug is a 404 rather than an on-demand render, since there is no data source
 * that could produce one.
 */
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

      <BlogArticle post={post} />
    </>
  );
}
