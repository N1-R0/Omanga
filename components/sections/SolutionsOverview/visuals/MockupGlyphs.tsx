import type { ReactNode } from "react";

/**
 * Glyphs that exist only inside the product visuals.
 *
 * One file, not seven, and deliberately not in `components/icons/`. That
 * directory is the system icon set governed by design.md § 9 — the glyphs the
 * page uses to label its own controls, where each one is a design decision with a
 * stated meaning. These are chrome inside a picture of an interface: the avatar,
 * bell and overflow dots in a mockup's title bar say "this is an application" and
 * nothing more specific. Promoting them would imply the page may reach for a bell
 * or an eye anywhere, which is the question § 9 closes when it makes the arrow
 * "the only directional glyph on this page".
 *
 * ---------------------------------------------------------------------------
 * [DEVIATES] These do not render through the `Icon` primitive.
 *
 * `Icon` offers three fixed sizes — 16, 24 and 32. The frames use 8, 12, 16, 20,
 * 24 and 56, and every one of them has to scale continuously with the art box,
 * because the whole mockup is a scale model of a 491-wide canvas. A closed set of
 * three pixel sizes cannot express that.
 *
 * So each glyph fills its parent, and the parent — a `pv-icon-*` class — carries
 * the authored size. Stroke width is authored against the 24 viewBox and scales
 * with it, so the line weight stays proportional rather than going hairline at
 * small sizes. Colour is inherited: globals.css already sets `stroke:
 * currentColor` on every `svg` in the document.
 *
 * All of these are decorative. The mockup is labelled as a whole by `ArtBox`, so
 * none of them carries a title or an accessible name.
 */

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill="none"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Send. The one glyph here that carries meaning: value leaving the account. */
export function ArrowUpRight() {
  return (
    <Glyph>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </Glyph>
  );
}

export function User() {
  return (
    <Glyph>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Glyph>
  );
}

export function Bell() {
  return (
    <Glyph>
      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
    </Glyph>
  );
}

export function Eye() {
  return (
    <Glyph>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </Glyph>
  );
}

/**
 * Overflow control.
 *
 * Three zero-length strokes rather than three filled circles: globals.css sets
 * `fill: none` on every `svg` in the document, so a filled dot cannot be
 * expressed here at all. A round line cap on a zero-length path is the shape that
 * survives it.
 */
export function Ellipsis() {
  return (
    <Glyph>
      <path d="M5 12h.01" />
      <path d="M12 12h.01" />
      <path d="M19 12h.01" />
    </Glyph>
  );
}

/**
 * Confirmation mark.
 *
 * A local copy rather than `components/icons/Check`, for the sizing reason above:
 * the system component requires one of three fixed pixel sizes, and this one has
 * to scale with the art box like everything else in the mockup.
 */
export function Check() {
  return (
    <Glyph>
      <path d="M20 6 9 17l-5-5" />
    </Glyph>
  );
}

export function ChevronRight() {
  return (
    <Glyph>
      <path d="m9 18 6-6-6-6" />
    </Glyph>
  );
}

/** The tier badge mark. Protection, which is what the tier is selling. */
export function ShieldCheck() {
  return (
    <Glyph>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </Glyph>
  );
}
