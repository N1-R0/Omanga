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
 *   band height       612, as a minimum only
 *   headline          left-aligned, flush to the page gutter, 20ch measure
 *   contents          the h1 and nothing above it
 *   scrim             55%, measured against this photograph — see --color-scrim
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
      className="scrim focus-ring-on-dark relative isolate flex items-end overflow-hidden py-fluid-8 text-on-dark tablet:min-h-hero-min"
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
            helperText={content.helperText}
          />
        </Container>
      </div>
    </section>
  );
}
