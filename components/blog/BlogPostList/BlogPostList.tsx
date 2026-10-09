import Link from "next/link";

import { Media } from "@/components/ui/Media";
import { cx } from "@/lib/cx";
import type { BlogPost } from "@/types/blog.types";

/**
 * The article cards on `/blog`, and the "more articles" row under each post.
 *
 * Layout follows the common blog-index pattern (Mobbin refs: Assembly,
 * Codecademy, Etsy, Binance): the newest article as a wide featured card —
 * image beside text from the tablet breakpoint — then a grid of image-on-top
 * cards with category, title, summary and date. `isFeatured={false}` renders
 * the grid only, for the related row.
 *
 * Each card is one link with the title as its text, so the accessible name is
 * the article title rather than a repeated "Read article". The link's
 * `::after` stretches over the card so the whole card is clickable.
 */
export type BlogPostListProps = {
  posts: readonly BlogPost[];
  readLabel: string;
  /** Show the first post as a wide featured card. The index page only. */
  isFeatured?: boolean;
  /** Heading level for card titles: `h2` on the index, `h3` under an article. */
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
        "group relative flex h-full w-full flex-col overflow-hidden rounded-sm bg-surface-light",
        isFeatured && "tablet:grid tablet:grid-cols-2",
      )}
    >
      {/*
        Featured, from tablet up: the photo fills its half of the card at the
        text column's height instead of holding 4:3, which left a gap under it.
        The image is taken out of flow so it cannot set the row height itself.
      */}
      <div className={cx("overflow-hidden", isFeatured && "tablet:h-full")}>
        <div
          className={cx(
            "transition-standard group-hover:scale-[1.03]",
            isFeatured &&
              "tablet:h-full tablet:[&>div]:aspect-auto tablet:[&>div]:h-full tablet:[&_img]:absolute tablet:[&_img]:inset-0",
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
          "flex flex-1 flex-col gap-fluid-3 p-fluid-4",
          isFeatured && "tablet:justify-center tablet:p-fluid-6",
        )}
      >
        <p className="font-sans text-small text-brand">
          {post.category} · {post.readingMinutes} min read
        </p>

        <Title className={cx("font-sans", isFeatured ? "text-h3" : "text-h5")}>
          <Link
            href={`/blog/${post.slug}`}
            className="focus-ring after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </Title>

        <p className="font-sans text-main text-secondary">{post.summary}</p>

        {/*
          `text-secondary` sits on the date only: it fades by opacity, so on the
          row it also faded the brand-coloured label below 4.5:1 (Lighthouse).
        */}
        <p className="mt-auto flex items-center justify-between gap-fluid-3 pt-fluid-2 font-sans text-small">
          <time dateTime={post.publishedDate} className="text-secondary">
            {new Date(post.publishedDate).toLocaleDateString("en-GB", DATE_FORMAT)}
          </time>
          <span aria-hidden="true" className="text-brand">
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
    <div className="flex flex-col gap-fluid-5">
      {isFeatured && featured !== undefined && (
        <PostCard
          post={featured}
          readLabel={readLabel}
          titleLevel={titleLevel}
          isFeatured
        />
      )}

      {grid.length > 0 && (
        <ul className="grid gap-fluid-5 tablet:grid-cols-2 desktop:grid-cols-3">
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
