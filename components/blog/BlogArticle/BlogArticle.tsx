import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { LegalBlock } from "@/components/legal/LegalBlock";
import { LegalContents } from "@/components/legal/LegalContents";
import { LegalRichText } from "@/components/legal/LegalRichText";
import { FaqList } from "@/components/sections/Faq";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import type { BlogPost } from "@/types/blog.types";

/**
 * A blog article.
 *
 * Built on the legal documents' long-form layout — same header rhythm,
 * contents list and block renderer — rather than a parallel prose system. The
 * differences are the article's own: a visible Home › Blog trail matching the
 * `BreadcrumbList`, a category and reading time, a cover image, the FAQ, a
 * closing action to the product page the article supports, and a row of
 * related articles (Mobbin refs: Uxcel and Revolut for the cover under the
 * title block; Hashnode for the related row).
 */
export type BlogArticleProps = {
  post: BlogPost;
  /** Other articles to suggest at the foot of the page. */
  related: readonly BlogPost[];
  readLabel: string;
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const FAQ_HEADING_ID = "article-faq-heading";
const CTA_HEADING_ID = "article-cta-heading";
const RELATED_HEADING_ID = "article-related-heading";

export function BlogArticle({ post, related, readLabel }: BlogArticleProps) {
  const published = new Date(post.publishedDate);

  return (
    <article className="bg-surface-page text-ink focus-ring-on-light section-rhythm">
      <Container>
        {/*
          [CHANGED, 2026-10-09] One centred reading column (the body measure,
          70ch) for everything from the title to the closing action, so the page
          reads as a centred article rather than a left-hugging text block in a
          full-width container. The related-articles row below breaks back out
          to the container width — three cards do not fit in 70ch.
        */}
        <div className="flex flex-col gap-fluid-8">
          <div className="mx-auto flex w-full flex-col gap-fluid-8 measure-body">
            <header className="flex flex-col gap-fluid-3">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap gap-fluid-2 font-sans text-small text-secondary">
                  <li>
                    <Link href="/" className="focus-ring hover:text-brand">
                      Home
                    </Link>
                    <span aria-hidden="true"> ›</span>
                  </li>
                  <li>
                    <Link href="/blog" className="focus-ring hover:text-brand">
                      Blog
                    </Link>
                    <span aria-hidden="true"> ›</span>
                  </li>
                  <li aria-current="page">{post.category}</li>
                </ol>
              </nav>

              <h1 className="font-sans text-h1 measure-heading">
                {post.title}
              </h1>

              <p className="font-sans text-large text-secondary measure-body">
                {post.summary}
              </p>

              <p className="font-sans text-small text-secondary">
                By Omanga ·{" "}
                <time dateTime={post.publishedDate}>
                  {published.toLocaleDateString("en-GB", DATE_FORMAT)}
                </time>{" "}
                · {post.readingMinutes} min read
              </p>
            </header>

            {/*
            The cover is the page's LCP element, so it is the one priority
            image. Landscape (4:3), matching the face-aware 4:3 crop the
            Unsplash CDN delivers, so nothing is cropped a second time. The
            Unsplash credit sits underneath as a caption.
          */}
            <figure className="flex flex-col gap-fluid-2">
              <Media
                image={post.image}
                ratio="landscape"
                fit="cover"
                sizes="(min-width: 768px) 720px, 100vw"
                radius="sm"
                isPriority
              />

              {post.imageCredit !== undefined && (
                <figcaption className="font-sans text-small text-secondary">
                  Photo by{" "}
                  <a
                    href={post.imageCredit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring underline hover:text-brand"
                  >
                    {post.imageCredit.name}
                  </a>{" "}
                  on Unsplash
                </figcaption>
              )}
            </figure>

            <div className="flex flex-col gap-fluid-4">
              {post.intro.map((block, index) => (
                <LegalBlock key={index} block={block} />
              ))}
            </div>

            <LegalContents sections={post.sections} />

            <div className="flex flex-col gap-fluid-7">
              {post.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-heading`}
                  className="flex scroll-mt-header flex-col gap-fluid-4"
                >
                  <h2
                    id={`${section.id}-heading`}
                    className="font-sans text-h3 measure-heading"
                  >
                    {section.heading}
                  </h2>

                  {section.blocks.map((block, index) => (
                    <LegalBlock key={index} block={block} />
                  ))}
                </section>
              ))}
            </div>

            {post.faq !== undefined && (
              <section
                aria-labelledby={FAQ_HEADING_ID}
                className="flex flex-col gap-fluid-4"
              >
                <h2
                  id={FAQ_HEADING_ID}
                  className="font-sans text-h3 measure-heading"
                >
                  {post.faq.heading}
                </h2>

                <FaqList items={post.faq.items} />
              </section>
            )}

            <section
              aria-labelledby={CTA_HEADING_ID}
              className="flex flex-col items-start gap-fluid-4 rounded-sm bg-surface-light p-fluid-5"
            >
              <h2
                id={CTA_HEADING_ID}
                className="font-sans text-h5 measure-heading"
              >
                {post.cta.label}
              </h2>

              <p className="font-sans text-main measure-body">
                <LegalRichText content={post.cta.prompt} />
              </p>

              <Button
                as="link"
                href={post.cta.href}
                variant="primary"
                tone="light"
              >
                {post.cta.label}
              </Button>
            </section>
          </div>

          {related.length > 0 && (
            <section
              aria-labelledby={RELATED_HEADING_ID}
              className="flex flex-col gap-fluid-4 border-t border-border-hairline pt-fluid-7"
            >
              <h2
                id={RELATED_HEADING_ID}
                className="font-sans text-h3 measure-heading"
              >
                More from the Omanga blog
              </h2>

              <BlogPostList
                posts={related}
                readLabel={readLabel}
                titleLevel="h3"
              />
            </section>
          )}
        </div>
      </Container>
    </article>
  );
}
