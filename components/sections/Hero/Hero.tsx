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
 * Geometry from the Figma frame (node 1265:12538), which exports as a centred
 * vertical stack at 1440x611 with 46 vertical padding, 24 spacing, and a
 * black-overlay background image:
 *
 *   spacing 24        -> `gap="lg"`, already the system's heading-to-body step
 *   padding 46        -> 48 (`py-12`), per the instruction to normalise Figma's
 *                        stray 46 onto the nearest 4px step
 *   minHeight 611     -> `--spacing-hero-min` at 612, normalised the same way
 *   maxHeight 611     -> deliberately not implemented, see below
 *   black @ 20%       -> 60%, measured; see the `--color-scrim` token
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Figma's fixed height ships as a minimum only.
 *
 * The frame pins `minHeight` and `maxHeight` to the same 611. Honouring the
 * maximum would clip the copy the moment it needs more room — and it will, in
 * three ordinary situations: the approved headline is 32 characters longer than
 * the one drawn in the frame, text at 200% zoom is twice as tall (WCAG 1.4.4),
 * and the 320px reflow case stacks everything (WCAG 1.4.10). A clipped headline
 * is a conformance failure, so the band grows instead.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The `Section` primitive is not used.
 *
 * `Section` owns three things the hero needs to own differently: it paints a flat
 * tone where the hero needs a photograph, and it applies the 100/130 light-or-dark
 * section rhythm where the hero's vertical padding is 48. Forcing the hero through
 * it would mean adding a photographic tone and a third rhythm to a primitive that
 * every other section uses correctly. The hero renders its own `section` element
 * and still meets the same contract: one surface, one rhythm, one container, one
 * accessible name.
 *
 * ---------------------------------------------------------------------------
 * [ASSUMPTION] Narrow and mid breakpoints.
 *
 * Figma provides the 1440 frame only, and the docs state that "narrow layouts are
 * engineering decisions to be confirmed against design". The minimum height
 * therefore applies from `desktop` up, and below that the band is sized by its
 * content plus the same 48 padding — which lands at roughly 590px on a 360px
 * screen, so the photograph still reads as a photograph. No new value was
 * invented for it. **Confirm against design.**
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

        `flex items-center` is Figma's `alignment: .center` — it centres the copy
        within the band whenever the band is taller than its content.
      */
      className="scrim relative isolate flex items-center overflow-hidden py-12 text-on-dark desktop:min-h-hero-min"
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
            eyebrow={content.eyebrow}
            heading={content.heading}
            intro={content.intro}
            actions={content.actions}
            helperText={content.helperText}
          />
        </Container>
      </div>
    </section>
  );
}
