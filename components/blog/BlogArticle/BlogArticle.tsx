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

export type BlogArticleProps = {
  post: BlogPost;
  related: readonly BlogPost[];
  readLabel: string;
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
        <div className="flex flex-col gap-16">
          <div className="mx-auto flex w-full flex-col gap-16 max-w-[70ch]">
            <header className="flex flex-col gap-4">
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
