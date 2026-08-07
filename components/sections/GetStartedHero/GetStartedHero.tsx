import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { GetStartedHeroContent } from "@/content/get-started-hero.content";

/**
 * The Get Started page hero.
 *
 * A Server Component with nothing interactive in it — an eyebrow, the page's
 * single `h1` and two paragraphs. The approved copy is explicit that this band
 * carries no button, so there is nothing here that could hydrate.
 *
 * Layout from the provided screenshot: a flat white band, everything centred on
 * one axis, generous space above and below the copy block. This is deliberately
 * the opposite arrangement to the homepage hero, which is scrimmed photography
 * with left-aligned copy — "no two consecutive sections share a layout pattern"
 * applies across the site's heroes too, and a router page opening with a second
 * photographic band would read as a duplicate homepage.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The band's height is `--spacing-hero-compact`, a minimum only.
 *
 * Requested as "the same as the hero on the main page but a little lesser". The
 * token is 90% of `--spacing-hero-min` at both ends of the same ramp, so the two
 * heroes stay in proportion at every width instead of only matching at desktop.
 *
 * A minimum, never a maximum, for the same reason the homepage hero is: pinning
 * the height clips the copy at 200% zoom (WCAG 1.4.4) and in the 320px reflow
 * case (WCAG 1.4.10). Applied from `tablet:` only — below 768 the copy is
 * already taller than any sensible minimum, and forcing one there would push the
 * solutions section below the fold on a phone for nothing.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The `Section` primitive is not used.
 *
 * `Section` owns "its surface, its vertical rhythm, its container, and its
 * heading level. Nothing else." A minimum band height is a fourth thing, and
 * adding it as a prop would put a height on the primitive every other band on
 * the site uses correctly without one. This renders its own `section` — the same
 * decision, for the same reason, as the homepage hero — and still meets the same
 * contract: one surface, one rhythm, one container, one accessible name.
 *
 * The surface classes are the ones `Section`'s `light` tone applies, not new
 * ones, so this band cannot drift from every other light band on the site.
 */

export type GetStartedHeroProps = {
  content: GetStartedHeroContent;
  /**
   * The id of the `h1`, used to name the section.
   *
   * Passed in rather than defined here so the value has exactly one owner — the
   * content module — and the heading and the `aria-labelledby` cannot drift.
   */
  headingId: string;
};

export function GetStartedHero({ content, headingId }: GetStartedHeroProps) {
  return (
    <section
      aria-labelledby={headingId}
      /*
        `flex items-center` centres the copy block in the band, which is what the
        screenshot shows and what a band with no photograph wants — there is no
        image above the copy for the eye to read first, so there is nothing to
        weight the copy against.

        `section-rhythm` is still the padding, so the band never collapses onto
        its copy below tablet where the minimum height does not apply.
      */
      className="section-rhythm flex items-center bg-surface-page text-ink focus-ring-on-light tablet:min-h-hero-compact"
    >
      <Container>
        {/*
          `text-center` is declared once, here, and inherits. It sits on the
          wrapper rather than on each element because centring is this section's
          layout decision — `Heading` and `Text` take no `className`, and they
          should not: a primitive that could choose its own alignment could
          choose the wrong one.
        */}
        <div className="text-center">
          {/*
            `align="center"` does the other half of the job. Under `items-center`
            each child sizes to its own content rather than to the column, so the
            measure caps on the heading and the paragraphs resolve to real widths
            and the resulting boxes centre themselves. The default `stretch`
            would leave every capped box pinned to the left edge with its text
            centred inside it — centred lines in a left-aligned column, which is
            the usual way a centred hero comes out looking broken.

            `gap="xl"` (28 → 32) between the three blocks. `lg` is the system's
            heading-to-body step and is correct at section scale, but this
            heading is the `hero` role at up to 64px, and 24 lets the first line
            of the paragraph sit inside the headline's descenders.
          */}
          <Stack gap="xl" align="center">
            {/*
              An eyebrow, not a heading. `get-started-seo.md` § Heading
              hierarchy: "Eyebrow labels are styled `<p>` or `<span>`, never
              headings — they carry no keyword value and stacking them as
              H-levels breaks the outline." `Badge` renders a `span`.

              No wrapper around it: `Badge` is `inline-flex`, and under
              `items-center` it already sizes to its label rather than to the
              column.
            */}
            <Badge tone="light">{content.eyebrow}</Badge>

            {/*
              The page's single `h1`. `measure="hero"` (28ch) is applied by the
              heading itself, so the `ch` unit resolves against the clamped
              display size rather than against the root — which is what makes the
              cap the measure it claims to be.
            */}
            <Heading id={headingId} level="h1" role="hero" measure="hero">
              {content.heading}
            </Heading>

            {/*
              `measure="narrow"` (60ch) is the token documented for exactly this
              position — "body copy in a narrower context — beneath a centred
              heading, or in a hero".

              No wrapping Stack. There was one while the intro was two paragraphs,
              holding them at a tighter step than the parent's; around a single
              paragraph it would be a wrapper that adds nothing.
            */}
            <Text role="body" measure="narrow">
              {content.intro}
            </Text>
          </Stack>
        </div>
      </Container>
    </section>
  );
}
