import Image from "next/image";

import { cx } from "@/lib/cx";
import type { ImageAsset } from "@/types/content.types";

/**
 * A circular portrait.
 *
 * design-system.md § Image treatment gives avatars one rule — "Circular" — and
 * no size. The two steps below are engineering decisions on the 4px grid,
 * pending design confirmation:
 *   sm 40 — inline beside a name in a list row
 *   md 56 — in a testimonial card
 *
 * Separate from `Media` rather than a variant of it. An avatar is always
 * square-cropped, always circular, and always a person — none of `ratio`,
 * `fit`, `radius` or `hasScrim` mean anything here, and a `Media` variant that
 * ignored four of its props would be the wrong abstraction.
 *
 * Note: avatars have no confirmed use yet. Consented testimonials are an open
 * blocker (project-context.md, blocker 4), and if they do not clear, this
 * component ships unused and should be deleted rather than kept for later.
 */

const SIZE = {
  sm: { className: "size-10", px: 40 },
  md: { className: "size-14", px: 56 },
} as const;

type AvatarSize = keyof typeof SIZE;

export type AvatarProps = {
  /**
   * `alt` is the person's name, or an empty string when the name is already
   * rendered beside the portrait — in which case repeating it would make a
   * screen reader say it twice.
   */
  image: ImageAsset;
  size: AvatarSize;
};

export function Avatar({ image, size }: AvatarProps) {
  const { className, px } = SIZE[size];

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={px}
      height={px}
      sizes={`${px}px`}
      loading="lazy"
      className={cx(className, "shrink-0 rounded-full object-cover")}
    />
  );
}
