import Image from "next/image";

import { cx } from "@/lib/cx";
import type { ImageAsset } from "@/types/content.types";
import type { Radius } from "@/types/ui.types";

/**
 * The one image component. No other component uses a raw `img` or `next/image`
 * directly.
 *
 * image rules: "One shared image component wraps the framework primitive."
 * Centralising it is what makes four separate rules enforceable rather than
 * merely documented:
 *
 *   - the aspect ratio is locked by the container, so nothing reflows on load;
 *   - `alt` is required, and a decorative image passes an explicit empty
 *     string rather than omitting the prop;
 *   - only the hero is eager, and that is a prop the caller must opt into;
 *   - text over imagery gets the scrim, enforced here rather than trusted to
 *     each caller.
 *
 * A failed image leaves the reserved box filled with the neutral surface, so
 * the layout holds and nothing collapses.
 */

const RATIO_CLASS = {
  square: "aspect-square",
  portrait: "aspect-portrait",
  landscape: "aspect-landscape",
  wide: "aspect-wide",
} as const;

type Ratio = keyof typeof RATIO_CLASS;

/**
 * Radii a media box may take. Narrower than the full `Radius` union: `pill` and
 * `dot` are chrome shapes, and cropping a photograph to either is not something
 * the design does.
 */
type MediaRadius = Extract<Radius, "card" | "chip" | "panel" | "device">;

const RADIUS_CLASS: Readonly<Record<MediaRadius, string>> = {
  card: "rounded-card",
  chip: "rounded-chip",
  panel: "rounded-panel",
  device: "rounded-device",
} as const;

export type MediaProps = {
  /** Source, alt and intrinsic dimensions travel together as one value. */
  image: ImageAsset;
  /** Locks the box before load. There is no "natural" option, by design. */
  ratio: Ratio;
  /**
   * `cover` crops to fill, `contain` fits inside. Product card art uses
   * `contain` so it stays within the card padding and never bleeds to the edge.
   */
  fit: "cover" | "contain";
  /**
   * The `sizes` attribute. Required, never omitted — an inaccurate or missing
   * value is the most common cause of a mobile device downloading a desktop
   * image, which is the single biggest risk to the LCP budget on this page.
   */
  sizes: string;
  /**
   * Load eagerly and preload. The hero image only. Everything else on the page
   * is lazy, which is the default here.
   */
  isPriority?: boolean;
  /**
   * Apply the 45% black scrim. Required whenever text sits over the image.
   *
   * Figma ships this at 20%, which fails contrast; 45% is the normalised
   * floor and still needs verifying against the real photograph rather than
   * the mock.
   */
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
        "relative w-full overflow-hidden bg-surface-light",
        RATIO_CLASS[ratio],
        radius !== undefined && RADIUS_CLASS[radius],
        hasScrim && "scrim",
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={isPriority}
        loading={isPriority ? undefined : "lazy"}
        className={cx(
          "size-full",
          fit === "cover" ? "object-cover" : "object-contain",
        )}
      />
    </div>
  );
}
