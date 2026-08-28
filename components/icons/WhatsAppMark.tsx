import Image from "next/image";

import { cx } from "@/lib/cx";
import type { IconSize, Tone } from "@/types/ui.types";

/**
 * WhatsApp's own mark, for the controls that open a chat.
 *
 * The Contact spec § 2 and § 5 both ask for it — "WhatsApp glyph left of label"
 * — and a channel's own mark beside the verb is what tells a visitor which app
 * is about to open before they commit to leaving the page.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] It does not go through `Icon`, and it is not an SVG.
 *
 * Every glyph in this set renders through `Icon`, which holds one contract:
 * "path data only. No `stroke`, `fill`, `width` or `height` on the paths", with
 * the stroke resolving to `currentColor`. This asset is a raster PNG of a
 * third-party brand mark — there is no path data to give `Icon`, and drawing the
 * paths by hand is not on the table: a brand mark reproduced from memory is
 * wrong in a way nobody notices until the trademark owner does.
 *
 * So it calls `next/image` directly, which is the same call `Logo` and
 * `HeroImage` each document for their own reasons. The rule that matters —
 * "components never use a raw image element" — still holds, because this is the
 * shared component for this mark rather than an inline `img` in a section.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] `invert` on the dark surfaces, and the asset as supplied on light.
 *
 * The supplied asset is a black glyph on transparency, which is right for a light
 * card and wrong for a solid button: the hero's `Chat on WhatsApp` is a brand fill
 * with a white label going to ink on hover, and black on either measures under
 * 3:1, so the mark would read as a smudge and stay black while the label around it
 * did not.
 *
 * `invert` turns the black to white and leaves the alpha channel alone. White
 * clears both dark fills — 6.70:1 on brand, 18.06:1 on ink — and one value covers
 * the resting and hover states, so nothing has to track the button's colour.
 *
 * `tone` rather than a boolean, because it is the same axis every other component
 * on the site takes and it is passed explicitly, never inferred. § 5's contact
 * card puts this mark on a light surface where the original black is correct;
 * § 2's button puts it on brand where it is not.
 *
 * [FLAGGED] An SVG export would be strictly better. As a single-colour vector
 * this mark could inherit `currentColor` like the rest of the set, drop the
 * filter, drop `next/image`, and scale without resampling — 512px of PNG for a
 * 16px render is 17KB doing the work of about 400 bytes. Worth one export;
 * `invert` on a PNG is the honest interim, not the destination.
 *
 * ---------------------------------------------------------------------------
 * `size` takes the same closed set as `Icon` — design.md § 9: "Icon sizes are
 * 16, 24 or 32. Nothing between" — so this mark cannot ship at a size no other
 * glyph is allowed.
 */

const SIZE_CLASS: Readonly<Record<IconSize, string>> = {
  sm: "size-4", // 16 — inside buttons and links
  md: "size-6", // 24 — inline with body text
  lg: "size-8", // 32 — beside a heading
} as const;

const SIZE_PX: Readonly<Record<IconSize, number>> = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

/**
 * Light keeps the supplied black; the two dark surfaces invert it to white.
 * Mapped rather than branched so a third surface cannot be forgotten.
 */
const TONE_FILTER_CLASS: Readonly<Record<Tone, string>> = {
  light: "",
  dark: "invert",
  brand: "invert",
} as const;

export type WhatsAppMarkProps = {
  size: IconSize;
  /** The surface this mark sits on. Passed explicitly, never inferred. */
  tone: Tone;
};

export function WhatsAppMark({ size, tone }: WhatsAppMarkProps) {
  return (
    <Image
      src="/whatsapp.png"
      /*
        Decorative, and correctly so: every control carrying this mark already
        names WhatsApp in its own label — `Chat on WhatsApp`. An alt here would
        make the button announce the channel twice, which is the same reasoning
        `Logo` records for its empty alt beside the wordmark.
      */
      alt=""
      width={SIZE_PX[size]}
      height={SIZE_PX[size]}
      /*
        No `priority`. "Only the hero image is eager. Everything else is lazy." A
        lazy image already inside the viewport still loads immediately, so the
        hero's mark appears with the first paint either way.
      */
      className={cx(SIZE_CLASS[size], "shrink-0", TONE_FILTER_CLASS[tone])}
    />
  );
}
