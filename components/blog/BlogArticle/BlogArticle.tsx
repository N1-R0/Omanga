import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { LegalBlock } from "@/components/legal/LegalBlock";
import { LegalContents } from "@/components/legal/LegalContents";
import { LegalRichText } from "@/components/legal/LegalRichText";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { BLOG_CATEGORY_LABELS } from "@/content/blog";
import type { BlogPost } from "@/types/blog.types";

/**
 * A blog article.
 *
 * Built on the legal documents' long-form layout — same header rhythm,
 * contents list and block renderer — rather than a parallel prose system. The
 * differences are the article's own: a visible Home › Blog trail, a category
 * label and reading time, a cover image, the FAQ, a
 * closing action to the product page the article supports, and a row of
 * related articles (Mobbin refs: Uxcel and Revolut for the cover under the
 * title block; Hashnode for the related row).
 */
export type BlogArticleProps = {
  post: BlogPost;
  /** Other articles to suggest at the foot of the page. */
  related: readonly BlogPost[];
  readLabel: string;
  /** Heading over the related row. */
  relatedHeading: string;
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const CTA_PROMPT_ID = "article-cta-prompt";
const RELATED_HEADING_ID = "article-related-heading";

export function BlogArticle({
  post,
  related,
  readLabel,
  relatedHeading,
}: BlogArticleProps) {
  const published = new Date(post.publishedDate);

  return (
    <article className="bg-bg text-text  section-y">
      <Container>
        {/*
          [CHANGED, 2026-10-09] One centred reading column (the body measure,
          70ch) for everything from the title to the closing action, so the page
          reads as a centred article rather than a left-hugging text block in a
          full-width container. The related-articles row below breaks back out
          to the container width — three cards do not fit in 70ch.
        */}
        <div className="flex flex-col gap-16">
          <div className="mx-auto flex w-full flex-col gap-16 max-w-[70ch]">
            <header className="flex flex-col gap-4">
              {/*
                [CHANGED, 2026-10-14] UX copy pass: the trail ends at "Blog".
                It used to end at the category marked aria-current="page",
                which told screen readers the category was this page.
              */}
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap gap-3 font-sans type-p2 opacity-80">
                  <li>
                    <Link href="/" className=" hover:text-accent-text">
                      Home
                    </Link>
                    <span aria-hidden="true"> ›</span>
                  </li>
                  <li>
                    <Link href="/blog" className=" hover:text-accent-text">
                      Blog
                    </Link>
                  </li>
                </ol>
              </nav>

              <p className="font-sans type-p2 text-accent-text">
                {BLOG_CATEGORY_LABELS[post.category]}
              </p>

              <h1 className="font-sans type-h1 max-w-[30ch]">
                {post.title}
              </h1>

              <p className="font-sans type-p1 opacity-80 max-w-[70ch]">
                {post.summary}
              </p>

              <p className="font-sans type-p2 opacity-80">
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
            <figure className="flex flex-col gap-3">
              <Media
                image={post.image}
                ratio="landscape"
                fit="cover"
                sizes="(min-width: 768px) 720px, 100vw"
                radius="sm"
                isPriority
              />

              {post.imageCredit !== undefined && (
                <figcaption className="font-sans type-p2 opacity-80">
                  Photo by{" "}
                  <a
                    href={post.imageCredit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" underline hover:text-accent-text"
                  >
                    {post.imageCredit.name}
                  </a>{" "}
                  on Unsplash
                </figcaption>
              )}
            </figure>

            <div className="flex flex-col gap-6">
              {post.intro.map((block, index) => (
                <LegalBlock key={index} block={block} />
              ))}
            </div>

            <LegalContents sections={post.sections} />

            <div className="flex flex-col gap-12">
              {post.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-heading`}
                  className="flex scroll-mt-19 flex-col gap-6"
                >
                  <h2
                    id={`${section.id}-heading`}
                    className="font-sans type-h3 max-w-[30ch]"
                  >
                    {section.heading}
                  </h2>

                  {section.blocks.map((block, index) => (
                    <LegalBlock key={index} block={block} />
                  ))}
                </section>
              ))}
            </div>

            {/*
              [CHANGED, 2026-10-14] UX copy pass: the box had a heading and a
              button with the same text (`cta.label`). The prompt now names the
              section and the button carries the action once.
            */}
            <section
              aria-labelledby={CTA_PROMPT_ID}
              className="flex flex-col items-start gap-6 rounded-xs bg-surface p-8"
            >
              <p id={CTA_PROMPT_ID} className="font-sans type-h3 max-w-[30ch]">
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
              className="flex flex-col gap-6 border-t border-border pt-12"
            >
              <h2
                id={RELATED_HEADING_ID}
                className="font-sans type-h3 max-w-[30ch]"
              >
                {relatedHeading}
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
