import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

type CardVariant =
  | "product-primary"
  | "product-secondary"
  | "comparison"
  | "comparison-emphasis"
  | "stat"
  | "media-plate";

const VARIANT_CLASS: Readonly<Record<CardVariant, string>> = {
  "product-primary": "rounded-xs bg-accent px-6 pt-6 pb-8 text-text-inverse",
  "product-secondary":
    "rounded-xs bg-surface px-6 pt-6 pb-8 text-text",
  comparison:
    "rounded-xs border border-neutral-0/10 bg-neutral-900 p-8 text-text-inverse",
  "comparison-emphasis":
    "rounded-xs border-2 border-accent bg-neutral-900 p-8 text-text-inverse",
  stat: "rounded-xs bg-surface p-4 text-text",
  "media-plate": "rounded-xs bg-surface",
} as const;

export type CardProps = {
  variant: CardVariant;
  media?: ReactNode;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
};

export function Card({
  variant,
  media,
  eyebrow,
  heading,
  body,
  action,
}: CardProps) {
  const hasMedia = media !== undefined;
  const hasCopy =
    eyebrow !== undefined ||
    heading !== undefined ||
    body !== undefined ||
    action !== undefined;

  return (
    <div className={cx("flex h-full flex-col gap-8", VARIANT_CLASS[variant])}>
      {media}

      {hasCopy && (
        <div className={cx("flex flex-col gap-8", hasMedia && "mt-auto")}>
          <div className="flex flex-col gap-4">
            {eyebrow !== undefined && <div>{eyebrow}</div>}
            {heading}
            {body}
          </div>

          {action !== undefined && <div>{action}</div>}
        </div>
      )}
    </div>
  );
}
