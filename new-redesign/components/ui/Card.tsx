import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

/**
 * Cards, exactly as design-lab/design-system.html § Components defines them.
 * Every card on /new is one of these; don't restyle a card in place.
 *
 *   Card       white, 1px border (--color-border), 2px radius (--radius-xs)
 *   PhotoCard  a Card with a 236px photo flush at the top (square corners
 *              inside the card), then a body padded 32 top and bottom, 24
 *              sides: H3 title led by a 3 × 12 crimson bar 12px away, P2
 *              secondary text 12px below, and an optional link line.
 *              (Asset's content card, measured 2026-10-21.)
 *
 * `overlay` holds a mini visual over the photo (an app screen in its glass
 * frame), as on the step cards. `slice` shows one part of a wider image, so a
 * row of cards reads as one continuous picture (step cards, img 4).
 */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("rounded-xs border border-border bg-surface", className)}>{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return (
    <span className="type-h3 flex items-center gap-3">
      <span aria-hidden className="h-3 w-[3px] shrink-0 bg-accent" />
      {children}
    </span>
  );
}

type PhotoCardProps = {
  image: { src: string; alt: string };
  title: string;
  text: string;
  /** Makes the whole card one link; `action` names it on the card. */
  href?: string;
  action?: string;
  overlay?: ReactNode;
  onNavigate?: () => void;
  /** next/image `sizes` for the photo. */
  sizes: string;
  /** Show part `index` of an image split across `of` cards. */
  slice?: { index: number; of: number };
  /** Overrides the 236px photo height (step cards: 300, owner 2026-10-23). */
  imageClassName?: string;
  /** CSS object-position for the photo, to keep a face clear of the overlay. */
  objectPosition?: string;
  className?: string;
};

export function PhotoCard({ image, title, text, href, action, overlay, onNavigate, sizes, slice, imageClassName, objectPosition, className }: PhotoCardProps) {
  const body = (
    <>
      <span className={cx("relative block h-[236px] overflow-hidden bg-surface-muted", imageClassName)}>
        {slice ? (
          // The image is `of` cards wide and shifted left by this card's share.
          <span className="absolute inset-y-0 block" style={{ width: `${slice.of * 100}%`, left: `${-slice.index * 100}%` }}>
            <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
          </span>
        ) : (
          <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" style={{ objectPosition }} />
        )}
        {overlay}
      </span>
      <span className="flex flex-col px-6 py-8">
        <CardTitle>{title}</CardTitle>
        <span className="type-p2 mt-3 text-text-secondary">{text}</span>
        {action ? (
          <span className="type-p3 mt-4 inline-flex items-center gap-1 text-accent-text">
            {action}
            <span aria-hidden className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5">
              →
            </span>
          </span>
        ) : null}
      </span>
    </>
  );

  const cardClass = cx("group block overflow-hidden rounded-xs border border-border bg-surface", className);

  return href ? (
    <Link href={href} onClick={onNavigate} className={cardClass}>
      {body}
    </Link>
  ) : (
    <div className={cardClass}>{body}</div>
  );
}
