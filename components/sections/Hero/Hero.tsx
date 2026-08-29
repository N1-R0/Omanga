import { Container } from "@/components/layout/Container";
import type { HeroSectionContent } from "@/content/hero.content";

import { HeroContent } from "./HeroContent";
import { HeroImage } from "./HeroImage";

/**
 * The homepage hero.
 *
 * A Server Component with no interactivity at all — the two calls to action are
 * links and the rest is text over an image, so nothing here hydrates. The band is
 * fully rendered and fully readable in the server HTML, which matters for the
 * section that holds the page's only `h1`.
 *
 * Geometry, measured from the reference at 1512px:
 *
 *   band height       80svh, as a minimum only — was the reference's 612
 *   headline          left-aligned, flush to the page gutter, three lines
 *   contents          the h1 and the actions, nothing else
 *   scrim             none — removed 2026-08-29, see below
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] THE SCRIM IS REMOVED, AND WHAT THAT COSTS
 *
 * The band previously carried the `scrim` utility: a flat 55% black wash over
 * the whole photograph. It was removed on instruction and the image is now
 * shown unmodified.
 *
 * That has a measured consequence, recorded here so it is a known position
 * rather than a regression nobody noticed. White text was re-measured against
 * `public/hero.png`, cropped as `object-cover` renders it at 1512 × 612, in the
 * three boxes the copy actually occupies:
 *
 *                        median      worst    under its threshold
 *   h1 (needs 3:1)       12.66:1     2.48:1   0.03% of pixels
 *   actions (4.5:1)      15.83:1     2.57:1   10.22% of pixels
 *   helper (4.5:1)       16.15:1     2.16:1   10.76% of pixels
 *
 * The headline is effectively unaffected: it is large text, so its threshold is
 * 3:1, and three hundredths of one per cent of the pixels behind it fall below
 * that. It reads cleanly on this photograph without help.
 *
 * The two smaller elements do not. The cause is specific and worth knowing
 * before anyone swaps the image: it is the AIRCRAFT WING, not the sunset. The
 * wing is the brightest object in the frame and it occupies the lower-left
 * quadrant — exactly where this hero puts its left-aligned, bottom-anchored
 * copy. The sky is bright too but sits top-right, clear of everything.
 *
 * So roughly a tenth of the area behind the secondary button's label and the
 * helper line is under 4.5:1, and the worst of it is around 2.2:1. Both are
 * WCAG 1.4.3 AA failures where they land on the wing.
 *
 * Three ways to close it without restoring a full-band wash, none applied
 * because each is a design decision rather than a defect fix:
 *
 *   - crop or reposition the image so the wing sits right of the copy column
 *   - a gradient confined to the lower-left, rather than a flat overall scrim
 *   - a different photograph with a dark lower-left quadrant
 *
 * `--color-scrim` and the `scrim` utility are both left in place: `Media` still
 * uses them wherever text sits over an image, and that requirement has not
 * changed. Only this band opts out.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The band's height is a minimum, never a maximum.
 *
 * Pinning it would clip the copy the moment it needs more room, and it will in
 * three ordinary situations: this headline is 19 characters longer than the
 * reference's, text at 200% zoom is twice as tall (WCAG 1.4.4), and the 320px
 * reflow case stacks everything (WCAG 1.4.10). A clipped headline is a
 * conformance failure, so the band grows instead.
 *
 * [CHANGED, 2026-08-29] `min-h-hero-min` at every width, where it was
 * `tablet:min-h-hero-min`. The token is now 80svh rather than a fluid rem clamp,
 * and `styles/tokens.css` carries why the breakpoint gate went with it and why
 * the unit is `svh` and not `vh`. This stays a minimum: 80svh plus `items-end`
 * plus `py-fluid-8` means a headline that grows pushes the band taller rather
 * than being cropped by it.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The `Section` primitive is not used.
 *
 * `Section` paints a flat tone where the hero needs a photograph, and applies
 * the section rhythm where the hero's vertical space is its own. Forcing the
 * hero through it would mean adding a photographic tone and a fourth rhythm to a
 * primitive every other section uses correctly. The hero renders its own
 * `section` and still meets the same contract: one surface, one rhythm, one
 * container, one accessible name.
 */

export type HeroProps = {
  content: HeroSectionContent;
  /**
   * The id of the `h1`, used to name the section.
   *
   * Passed in rather than defined here so the value has exactly one owner — the
   * content module — and the heading and the `aria-labelledby` cannot drift apart.
   */
  headingId: string;
};

export function Hero({ content, headingId }: HeroProps) {
  return (
    <section
      aria-labelledby={headingId}
      /*
        `relative` makes this the positioned ancestor for the background image,
        and `isolate` gives the band its own stacking context so the image's
        negative z-index stays behind the copy without escaping to sit behind the
        page itself.
      */
      /*
        `py-fluid-8` (40 → 64) rather than a fixed 48. Below desktop the minimum
        height does not apply, so this padding is the only thing holding the band
        open — a fixed value is either too tight at 1920 or too loose at 320.

        `items-end` rather than `items-center`: the reference sits its headline
        low in the band, with roughly a third of the photograph clear above it.
        Centring a three-line headline plus an action row fills the band and
        leaves the image with nothing to say.
      */
      /*
        [CHANGED, 2026-08-29] The `scrim` utility is gone, on instruction. The
        photograph is now unmodified. See the contrast note in the block comment
        above — this is the one change on this page with a measured
        accessibility cost, and the measurement is recorded rather than assumed.
      */
      className="focus-ring-on-dark relative isolate flex min-h-hero-min items-end overflow-hidden py-fluid-8 text-on-dark"
    >
      <HeroImage image={content.image} />

      {/*
        The z-ladder, used exactly as Phase 1 designed it: the image sits at
        `-z-10`, the `scrim` utility's `::after` paints at `z-scrim`, and the copy
        sits above both at `z-overlay-content`. Without the explicit layer here the
        scrim would paint over the text, because a positioned pseudo-element with a
        z-index beats a sibling with `z-index: auto` regardless of DOM order.

        The wrapper exists because `Container` takes no `className` — primitives
        do not accept style passthrough, so a layer this element needs has to be
        applied by its parent.
      */}
      <div className="relative z-overlay-content w-full">
        {/*
          The shared container, so the hero's copy sits on the same gutters and the
          same content column as every other band on the page. The hero does
          not get its own horizontal rhythm.
        */}
        <Container>
          <HeroContent
            headingId={headingId}
            heading={content.heading}
            actions={content.actions}
          />
        </Container>
      </div>
    </section>
  );
}
