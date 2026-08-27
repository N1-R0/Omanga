import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Media } from "@/components/ui/Media";
import { Text } from "@/components/ui/Text";
import type { AboutHeroContent } from "@/content/about-hero.content";

/**
 * The About page hero — spec § 2, laid out from the supplied screenshot.
 *
 * Copy left, one squared photograph right, both centred against each other on
 * the cross axis. A Server Component with nothing interactive in it: an eyebrow,
 * the page's single `h1`, one paragraph and an image.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] A split hero, where the site's other two are centred.
 *
 * `GetStartedHero` and `InsuranceHero` are the same centred, image-free band.
 * This one is neither, and that is deliberate rather than incidental: it is what
 * the screenshot draws, and design.md § 10's "no two consecutive sections share
 * a layout" reads across the site's heroes too — a third centred hero would make
 * the About page open as a variant of the other two.
 *
 * It is also why this section does not become the `CenteredHero` extraction
 * `InsuranceHero` calls for. That duplication is between those two files and is
 * theirs to resolve; this band is not a third instance of it.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The band's height and its surface follow the other two heroes
 * exactly, and the reasoning behind both lives in `GetStartedHero`: the flat
 * light surface is `Section`'s own `light` tone rather than new classes, the
 * `section-rhythm` padding is what keeps the band off its copy below tablet, and
 * `min-h-hero-compact` is a minimum applied from `tablet:` only — never a
 * maximum, because pinning the height clips copy at 200% zoom (WCAG 1.4.4) and
 * in the 320px reflow case (WCAG 1.4.10).
 *
 * `Section` is not used for the same reason those two do not use it: it owns
 * "its surface, its vertical rhythm, its container, and its heading level.
 * Nothing else", and a minimum band height is a fourth thing.
 */

/**
 * The 12-column split.
 *
 * Copy takes six columns, the photograph five, with the seventh left empty
 * between them — the proportion the screenshot draws, and the same asymmetric
 * arrangement `InsuranceProof` already uses, mirrored. One column of container
 * grid rather than two flex children, so the empty gutter is a column that
 * exists rather than a margin somebody has to maintain.
 *
 * `items-center` is what puts the copy block on the photograph's centre line.
 * Below desktop the grid is one column in DOM order — copy, then image — per
 * design.md § 10, which is also the reading order and needs no `order` anywhere.
 */
const LAYOUT_CLASS =
  "grid grid-cols-1 items-center gap-fluid-8 desktop:grid-cols-12";
const COPY_CELL_CLASS = "desktop:col-span-6";
const MEDIA_CELL_CLASS = "desktop:col-start-8 desktop:col-span-5";

/**
 * Five of twelve columns inside a container capping at 95rem, one column below
 * desktop. Accurate rather than convenient: an inaccurate `sizes` is the most
 * common reason a phone downloads a desktop image, and this is the largest asset
 * on the page.
 */
const MEDIA_SIZES =
  "(min-width: 90rem) 568px, (min-width: 64rem) 40vw, (min-width: 48rem) calc(100vw - 6rem), calc(100vw - 2rem)";

export type AboutHeroProps = {
  content: AboutHeroContent;
  /**
   * The id of the `h1`, used to name the section. Owned by the content module so
   * the heading and the `aria-labelledby` cannot drift.
   */
  headingId: string;
};

export function AboutHero({ content, headingId }: AboutHeroProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="section-rhythm flex items-center bg-surface-page text-ink focus-ring-on-light tablet:min-h-hero-compact"
    >
      <Container>
        <div className={LAYOUT_CLASS}>
          <div className={COPY_CELL_CLASS}>
            {/*
              `align="start"` rather than the default `stretch`, so each block
              sizes to its own content. Under `stretch` the `Badge` would be
              pulled to the full column width and stop reading as a pill.

              `gap="xl"` (28 → 32) is the step both other heroes use between
              these three blocks: `lg` is the system's heading-to-body value and
              is correct at section scale, but this heading is the `hero` role at
              up to 64px and 24 lets the paragraph's first line sit inside its
              descenders.
            */}
            <Stack gap="xl" align="start">
              {/*
                An eyebrow, not a heading. It carries no keyword value and
                stacking it as an H-level breaks the outline — spec § 3.2 lists
                no heading for it. `Badge` renders a `span`.
              */}
              <Badge tone="light">{content.eyebrow}</Badge>

              {/*
                The page's single `h1`.

                `measure="none"` is the documented opt-out for a heading whose
                container is already narrow, and this one's is: six of twelve
                columns is about 620px against a 1424 content column, which is
                roughly 19ch at the clamped `h1` size. Both heading caps —
                `hero` at 28ch and `heading` at 30ch — sit wider than the column
                can ever be, so declaring either would be a cap that never
                engages while claiming to own the line count. The column owns it.

                See the content module for what that costs: the break lands on
                three lines where spec § 2 asks for two.
              */}
              <Heading id={headingId} level="h1" role="hero" measure="none">
                {content.heading}
              </Heading>

              {/*
                `measure="feature"` (45ch), not the `narrow` (60ch) both centred
                heroes use. Their paragraph spans the full content column and
                needs a cap to stop it; this one already sits in a six-column
                cell, and 45ch is the documented value for "copy inside a
                column". It engages just before the column does, which is what
                holds the paragraph's own line length steady while the cell
                grows toward desktop.
              */}
              <Text role="body" measure="feature">
                {content.intro}
              </Text>
            </Stack>
          </div>

          {/*
            `square` against a 16:9 source, so `object-cover` crops the frame to
            its centre — see the flag in the content module. The box is locked
            before load either way, so nothing reflows.

            `isPriority` is set: at desktop this image is almost certainly the
            largest element in the viewport on first paint, which makes it the
            LCP candidate. design.md § 10 allows exactly one priority image per
            page and this is the page's.

            `hasScrim` is deliberately absent. No text sits over this image — the
            copy is in its own column — and a scrim exists to protect contrast,
            not to style a photograph.
          */}
          <div className={MEDIA_CELL_CLASS}>
            <Media
              image={content.image}
              ratio="square"
              fit="cover"
              sizes={MEDIA_SIZES}
              radius="md"
              isPriority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
