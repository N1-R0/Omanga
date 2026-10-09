import type { Metadata } from "next";

import { BlogPostList } from "@/components/blog/BlogPostList";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { BLOG_POSTS, blogIndexContent } from "@/content/blog";
import { buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

/**
 * The blog index.
 *
 * [ADDED, 2026-10-09] Resolves the `[PENDING ROUTE]` on the header's "Blog"
 * entry. The articles exist to rank for non-brand searches ("how to pay in
 * Nigeria as a visitor") and to build the authority that also lifts the brand
 * query "omanga" — see design.md § Blog.
 */
export const metadata: Metadata = buildPageMetadata(blogIndexContent.meta);

const HEADING_ID = "blog-heading";

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd graph={buildPageGraph(blogIndexContent.meta, { crumb: "Blog" })} />

      <section
        aria-labelledby={HEADING_ID}
        className="bg-surface-page text-ink focus-ring-on-light section-rhythm"
      >
        <Container>
          <div className="flex flex-col gap-fluid-7">
            <header className="flex flex-col gap-fluid-3">
              <p className="font-sans text-h6 text-brand">
                {blogIndexContent.eyebrow}
              </p>
              <h1 id={HEADING_ID} className="font-sans text-h1 measure-heading">
                {blogIndexContent.heading}
              </h1>
              <p className="font-sans text-large text-secondary measure-body">
                {blogIndexContent.intro}
              </p>
            </header>

            <BlogPostList
              posts={BLOG_POSTS}
              readLabel={blogIndexContent.readLabel}
              isFeatured
            />
          </div>
        </Container>
      </section>
    </>
  );
}
