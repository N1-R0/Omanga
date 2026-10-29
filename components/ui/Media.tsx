import { cx } from "@/lib/cx";
import type { ImageAsset } from "@/types/content.types";
import type { Radius } from "@/types/ui.types";
import { Photo } from "@/new-redesign/components/ui/Photo";

const RATIO_CLASS = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-video",
} as const;

type Ratio = keyof typeof RATIO_CLASS;

type MediaRadius = Extract<Radius, "xs" | "sm" | "md">;

const RADIUS_CLASS: Readonly<Record<MediaRadius, string>> = {
  xs: "rounded-md",
  sm: "rounded-xs",
  md: "rounded-xs",
} as const;

export type MediaProps = {
  image: ImageAsset;
  ratio: Ratio;
  fit: "cover" | "contain";
  sizes: string;
  isPriority?: boolean;
  hasScrim?: boolean;
  radius?: MediaRadius;
};

export function Media({
  image,
  ratio,
  fit,
  sizes,
  isPriority = false,
  hasScrim = false,
  radius,
}: MediaProps) {
  return (
    <div
      className={cx(
        "relative w-full overflow-hidden bg-surface",
        RATIO_CLASS[ratio],
        radius !== undefined && RADIUS_CLASS[radius],
        hasScrim && "relative after:pointer-events-none after:absolute after:inset-0 after:z-20 after:bg-neutral-950/55 after:content-['']",
      )}
    >
      <Photo
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        preload={isPriority}
        className={cx(
          "size-full",
          fit === "cover" ? "object-cover" : "object-contain",
        )}
      />
    </div>
  );
}
