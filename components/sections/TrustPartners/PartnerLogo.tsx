import Image from "next/image";

import type { ImageAsset } from "@/types/content.types";

/**
 * One partner logo.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] `next/image` directly, not the `Media` primitive.
 *
 * `component-rules.md` § Image component rules asks for one shared image
 * component, and `Media` is it — but `Media` is a media *plate*: it fills a
 * ratio-locked box with `--color-surface-light` and crops or fits artwork inside
 * it. Its four ratios are square, portrait, landscape and wide, and a logo is
 * none of them; a 2.85:1 wordmark inside a 4:3 plate is a grey rectangle with a
 * logo lost in the middle of it.
 *
 * The intent behind the rule is met without it. The ratio is locked by the
 * asset's intrinsic `width` and `height`, so nothing reflows on load; `alt` is
 * required by `ImageAsset` and cannot be omitted; the image is lazy, which is
 * `next/image`'s default and correct for everything except the hero; and `sizes`
 * is declared accurately rather than left off.
 *
 * Adding a fifth ratio to `Media` for one section's use is the alternative, and
 * it would change a primitive that five other components already rely on.
 *
 * ---------------------------------------------------------------------------
 * No hover state. The frame specifies none, and these logos are not links —
 * partner destinations are not approved. The legacy strip's greyscale-to-colour
 * hover is deliberately not carried over: `design.md` § Motion principles
 * has no such pattern, and hover motion on a non-interactive element advertises
 * an interaction that does not exist.
 *
 * The width cap and the spacing belong to `PartnerLogos`, which owns the row.
 * This component fills the box it is given.
 */

/**
 * The rendered width at every breakpoint.
 *
 * The frame normalises all three logos to a 242 box; 240 is that value on the
 * 4px grid, and it is also the cap `PartnerLogos` applies. The logo never renders
 * wider than 240, and below the tablet breakpoint it renders narrower only
 * because the row shrinks it — so a single fixed value is accurate here, which is
 * what stops a phone downloading a desktop-sized asset.
 */
const RENDERED_WIDTH = "(min-width: 48rem) 240px, 160px";

export type PartnerLogoProps = {
  logo: ImageAsset;
};

export function PartnerLogo({ logo }: PartnerLogoProps) {
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      sizes={RENDERED_WIDTH}
      className="h-auto w-full"
    />
  );
}
