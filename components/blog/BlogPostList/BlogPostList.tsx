import Link from "next/link";

import { Media } from "@/components/ui/Media";
import { BLOG_CATEGORY_LABELS } from "@/content/blog";
import { cx } from "@/lib/cx";
import type { BlogPost } from "@/types/blog.types";

export type BlogPostListProps = {
  posts: readonly BlogPost[];
  readLabel: string;
  isFeatured?: boolean;
  titleLevel?: "h2" | "h3";
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const CARD_SIZES = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";
const FEATURED_SIZES = "(min-width: 768px) 50vw, 100vw";

type CardProps = {
  post: BlogPost;
  readLabel: string;
  titleLevel: "h2" | "h3";
  isFeatured: boolean;
};

function PostCard({ post, readLabel, titleLevel: Title, isFeatured }: CardProps) {
  return (
    <article
      className={cx(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-xs bg-surface",
        isFeatured && "md:grid md:grid-cols-2",
      )}
    >
      <div className={cx("overflow-hidden", isFeatured && "md:h-full")}>
        <div
          className={cx(
            "transition duration-[var(--duration-fast)] ease-standard group-hover:scale-[1.03]",
            isFeatured &&
              "md:h-full md:[&>div]:aspect-auto md:[&>div]:h-full md:[&_img]:absolute md:[&_img]:inset-0",
          )}
        >
          <Media
            image={post.image}
            ratio="landscape"
            fit="cover"
            sizes={isFeatured ? FEATURED_SIZES : CARD_SIZES}
            isPriority={isFeatured}
          />
        </div>
      </div>

      <div
        className={cx(
          "flex flex-1 flex-col gap-4 p-6",
          isFeatured && "md:justify-center md:p-10",
        )}
      >
        <p className="font-sans type-p2 text-accent-text">
          {BLOG_CATEGORY_LABELS[post.category]} · {post.readingMinutes} min read
        </p>

        <Title className={cx("font-sans", isFeatured ? "type-h3" : "type-h3")}>
          <Link
            href={`/blog/${post.slug}`}
            className=" after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </Title>

        <p className="font-sans type-p1 opacity-80">{post.summary}</p>

        <p className="mt-auto flex items-center justify-between gap-4 pt-3 font-sans type-p2">
          <time dateTime={post.publishedDate} className="opacity-80">
            {new Date(post.publishedDate).toLocaleDateString("en-GB", DATE_FORMAT)}
          </time>
          <span aria-hidden="true" className="text-accent-text">
            {readLabel} →
          </span>
        </p>
      </div>
    </article>
  );
}

export function BlogPostList({
  posts,
  readLabel,
  isFeatured = false,
  titleLevel = "h2",
}: BlogPostListProps) {
  const [featured, ...rest] = posts;
  const grid = isFeatured ? rest : posts;

  return (
    <div className="flex flex-col gap-8">
      {isFeatured && featured !== undefined && (
        <PostCard
          post={featured}
          readLabel={readLabel}
          titleLevel={titleLevel}
          isFeatured
        />
      )}

      {grid.length > 0 && (
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {grid.map((post) => (
            <li key={post.slug} className="flex">
              <PostCard
                post={post}
                readLabel={readLabel}
                titleLevel={titleLevel}
                isFeatured={false}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
