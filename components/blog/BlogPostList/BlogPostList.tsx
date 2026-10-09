import Link from "next/link";

import type { BlogPost } from "@/types/blog.types";

/**
 * The article cards on `/blog`.
 *
 * Each card is one link with the title as its text, so the accessible name is
 * the article title rather than a repeated "Read article". The visible "Read
 * article" label is decorative and hidden from assistive technology.
 */
export type BlogPostListProps = {
  posts: readonly BlogPost[];
  readLabel: string;
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export function BlogPostList({ posts, readLabel }: BlogPostListProps) {
  return (
    <ul className="grid gap-fluid-5 tablet:grid-cols-2 desktop:grid-cols-3">
      {posts.map((post) => (
        <li key={post.slug} className="flex">
          <article className="relative flex w-full flex-col gap-fluid-3 rounded-sm bg-surface-light p-fluid-4 transition-standard hover:bg-surface-light/70">
            <p className="font-sans text-small text-brand">
              {post.category} · {post.readingMinutes} min read
            </p>

            <h2 className="font-sans text-h5">
              <Link
                href={`/blog/${post.slug}`}
                className="focus-ring after:absolute after:inset-0"
              >
                {post.title}
              </Link>
            </h2>

            <p className="font-sans text-main text-secondary">{post.summary}</p>

            <p className="mt-auto flex items-center justify-between font-sans text-small text-secondary">
              <time dateTime={post.publishedDate}>
                {new Date(post.publishedDate).toLocaleDateString("en-GB", DATE_FORMAT)}
              </time>
              <span aria-hidden="true" className="text-brand">
                {readLabel} →
              </span>
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
