import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { LegalBlock } from "@/components/legal/LegalBlock";
import { LegalContents } from "@/components/legal/LegalContents";
import { LegalRichText } from "@/components/legal/LegalRichText";
import { FaqList } from "@/components/sections/Faq";
import { Button } from "@/components/ui/Button";
import type { BlogPost } from "@/types/blog.types";

/**
 * A blog article.
 *
 * Built on the legal documents' long-form layout — same header rhythm,
 * contents list and block renderer — rather than a parallel prose system. The
 * differences are the article's own: a visible Home › Blog trail matching the
 * `BreadcrumbList`, a category and reading time, the FAQ, and a closing action
 * to the product page the article supports.
 */
export type BlogArticleProps = {
  post: BlogPost;
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const FAQ_HEADING_ID = "article-faq-heading";
const CTA_HEADING_ID = "article-cta-heading";

export function BlogArticle({ post }: BlogArticleProps) {
  const published = new Date(post.publishedDate);

  return (
    <article className="bg-surface-page text-ink focus-ring-on-light section-rhythm">
      <Container>
        <div className="flex flex-col gap-fluid-8">
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

            <h1 className="font-sans text-h1 measure-heading">{post.title}</h1>

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
              <h2 id={FAQ_HEADING_ID} className="font-sans text-h3 measure-heading">
                {post.faq.heading}
              </h2>

              <FaqList items={post.faq.items} />
            </section>
          )}

          <section
            aria-labelledby={CTA_HEADING_ID}
            className="flex flex-col items-start gap-fluid-4 rounded-sm bg-surface-light p-fluid-5"
          >
            <h2 id={CTA_HEADING_ID} className="font-sans text-h5 measure-heading">
              {post.cta.label}
            </h2>

            <p className="font-sans text-main measure-body">
              <LegalRichText content={post.cta.prompt} />
            </p>

            <Button as="link" href={post.cta.href} variant="primary" tone="light">
              {post.cta.label}
            </Button>
          </section>
        </div>
      </Container>
    </article>
  );
}
