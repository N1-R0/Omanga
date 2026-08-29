import Image from "next/image";
import Link from "next/link";

/**
 * The brand lockup: the mark beside the wordmark, linking home.
 *
 * design.md § 3 names an "8 — icon-to-label, wordmark
 * gap" step, and § Typography hierarchy gives the wordmark its own role. Two
 * entries for one element is what tells us the lockup is a mark plus a text
 * wordmark rather than a single image, and the Figma header and footer frames
 * both draw it that way.
 *
 * The wordmark is text, not an image, for three reasons: it inherits the
 * surface's colour so one component serves the white header and the dark footer
 * without a second asset, it scales with the user's font size, and it means the
 * brand name is real text in the server HTML rather than something only a
 * sighted user can read.
 *
 * [CHANGED, 2026-08-29] The wordmark is set in Fraunces caps rather than in the
 * UI face at H5. It is the only place on the site with a second family, and the
 * font file is subset to capitals so it stays that way — see `config/fonts.ts`
 * and the `--text-wordmark` role in `styles/tokens.css`, which carry the
 * reasoning for the family, the optical size and the caps tracking.
 *
 * Colour comes from the surface. There is no `tone` prop — a logo that could
 * pick its own colour could pick the wrong one.
 */

/**
 * [DECISION] Logo calls `next/image` directly rather than going through the
 * shared `Media` component. `Media` exists to lock a content image's aspect
 * ratio inside a fluid column, and every one of its props — `ratio`, `fit`,
 * `sizes`, `hasScrim`, `radius` — is meaningless for a fixed-size brand mark. A
 * variant that ignores five of its props is the wrong abstraction, which is the
 * same reasoning that already keeps `Avatar` separate from `Media`.
 *
 * `unoptimized` because the source is an SVG: there is nothing for the image
 * optimizer to do, and stating it is cheaper than depending on the framework's
 * pass-through behaviour staying the same across versions.
 */
const MARK = {
  src: "/logo-omanga.svg",
  /**
   * Empty alt, deliberately. The wordmark beside it already carries the brand
   * name as text, so describing the mark too would make the link announce
   * "Omanga Omanga".
   */
  alt: "",
  /**
   * 32 is the design system's largest sanctioned glyph size ("Icon sizes are
   * 16, 24 or 32. Nothing between"). The Figma frames do not dimension the
   * mark, so this is the nearest systematic value rather than a measured one.
   * [VERIFY against Figma]
   */
  size: 32,
} as const;

export type LogoProps = {
  /**
   * The wordmark text. Passed in rather than hardcoded, because no component
   * reaches into a content module for a string — not even this one.
   */
  wordmark: string;
  /**
   * Accessible name for the link. The visible wordmark alone would announce as
   * "Omanga", which does not tell a screen-reader user where the link goes.
   */
  label: string;
};

export function Logo({ wordmark, label }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={label}
      className="inline-flex items-center gap-fluid-1 focus-ring transition-standard hover:text-brand"
    >
      {/*
        TODO — no white mark asset exists.

        `public/` holds `logo-omanga.svg` (the maroon mark) and
        `logo-omanga-white.svg`, but the latter is a full horizontal lockup with
        the wordmark already inside it, so using it here would render the brand
        name twice. The maroon mark therefore also serves the dark footer, where
        Figma draws a light mark — a visible parity gap, not a hidden one.

        Needed: a mark-only white SVG export. Adding it is a one-line change to
        `MARK.src` behind a tone map; inventing one by filtering the maroon asset
        is not on the table. Logotypes are exempt from WCAG contrast (1.4.11),
        so this is a fidelity issue rather than an accessibility failure.

        The asset also has "OMANGA" baked into it at micro-size, which
        "no text baked into images" forbids. A clean export fixes both at once.
      */}
      <Image
        src={MARK.src}
        alt={MARK.alt}
        width={MARK.size}
        height={MARK.size}
        unoptimized
        /*
          No `priority`. "Only the hero image is eager. Everything else is
          lazy." A lazy image that is already inside the viewport still loads
          immediately — `loading="lazy"` only defers what is off-screen — so the
          header mark appears with the first paint either way, and the hero
          keeps the preload slot to itself.
        */
        className="size-8"
      />
      {/*
        Uppercased in CSS, not in the passed string.

        The prop keeps the brand's own casing — "Omanga" — so the accessible
        name, the copy in `header.content.ts` and anything that reads this text
        stay in the form a person would write. `uppercase` is a presentational
        choice about the logotype, and a screen reader announcing "O-M-A-N-G-A"
        because the string itself was capitalised is a real risk with some
        voices.
      */}
      <span className="font-wordmark text-wordmark uppercase">{wordmark}</span>
    </Link>
  );
}
