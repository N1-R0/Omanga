import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type { AboutStoryContent } from "@/content/about-story.content";
import { cx } from "@/lib/cx";
import type { ImageAsset } from "@/types/content.types";

/**
 * Our Story — spec § 3, laid out from Figma node 2578:131852.
 *
 * A dark band: the story centred in its own column, one photograph cropped off
 * each side, and the eyebrow above the copy. No sub-headings, no bullets, no
 * CTA, no image inside the copy column — § 3 forbids all four, and the content
 * module's type has no slot for any of them.
 *
 * ---------------------------------------------------------------------------
 * [MEASURED from node 2578:131852] The geometry, and how it is translated.
 *
 * The node is a 1440-wide frame with 110px of vertical padding around a 480-tall
 * content block, so the band is 700 tall. Both photographs are 720 × 590 boxes —
 * exactly half the frame's width — hung off opposite edges and staggered
 * vertically:
 *
 *   left    inset[0, 1080, 110.5, -360]      x −360 → 302, top-anchored
 *   right   inset[98, −388.8, 12.02, 1108.8] x 1108.8 → 1828.8, bottom-anchored
 *   copy    560.9 wide, centred              79px clear of the left photograph
 *
 * Every one of those is a proportion of the frame, not a fixed size, so they are
 * expressed as percentages of the band rather than transcribed as pixels — the
 * node is one width and this band has to hold from 320 up.
 *
 * The two clearances the reference maintains are what the numbers below are
 * tuned to keep: the copy column stops ~80px short of each photograph at the
 * reference width, and both photographs show roughly a fifth of the band. The
 * box width is 45% rather than the node's 50% because the copy column here is
 * six of twelve container columns — half of a gutter-inset container — and 50%
 * boxes would close that gap to nothing.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The band renders its own `section` rather than using `Section`.
 *
 * `Section` puts every child inside `Container`, which is gutter-inset and caps
 * at 95rem. These photographs are positioned against the band — they have to
 * reach past the gutter and off the viewport edge — and there is no way to
 * express that from inside the container. The same call `Hero`,
 * `GetStartedHero` and `InsuranceHero` each make, for the same class of reason.
 *
 * The contract `Section` exists to enforce is still met, and with its own
 * classes rather than new ones: one surface (`bg-ink text-on-dark`), one rhythm
 * (`section-rhythm`), one container around the copy, one accessible name. The
 * focus ring is switched to `--color-on-dark` by `focus-ring-on-dark`, which is
 * what `Section`'s `dark` tone would have applied.
 *
 * [DEVIATION] The reference band is white. This one is `--color-ink`, because
 * § 3 and § 2's page-flow table both give this section a near-black surface, and
 * § 3 makes the surface load-bearing: "Hard cut to a dark near-black panel. No
 * gradual transition, no rounded corner — the colour flip is the section
 * divider." The hero above is light, so the flip is also what stops two
 * consecutive light bands. One line to reverse if the reference's white is the
 * later decision.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The two-tone fade is opacity, not a second colour.
 *
 * § 3 describes "a two-tone emphasis fade … Emphasis by opacity, not by bold",
 * which is design.md § 8's own rule: "Secondary copy is expressed as 80% opacity
 * of the current colour, never as a separate grey." So the recede tier is
 * `Text`'s `isSecondary` — measured at 14:1 on this surface, well clear of AA —
 * and no grey token is added. The fade stays correct if the panel ever goes
 * light.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The `h2` is visually suppressed, not omitted.
 *
 * § 3 wants the reference's restraint kept — neither it nor Stayli shows a
 * heading here — while § 3.2 requires an `h2` at this position so the outline
 * does not jump from the `h1` to § 4. Both hold only if the heading exists and
 * is not seen, which is what `visually-hidden` does: clipped to one pixel, still
 * in the accessibility tree, still the target of this section's
 * `aria-labelledby`.
 *
 * It must never become `display: none` — that removes the element from the tree,
 * and the section would silently lose its accessible name while looking
 * identical.
 *
 * The reference's own large centred heading has no Omanga string to fill it.
 * § 3.2's `h2` is a 66-character SEO sentence that § 3 says "must not compete
 * with the story text", and there is no short approved headline for this
 * section. The emphasis tier does the job the reference gives its heading:
 * full-contrast type at the top of the block, with the rest receding.
 */

/**
 * The two flanking photographs.
 *
 * `hidden desktop:block` — required: below desktop there is no room either side
 * of the copy, and § 3's subject is the prose. The images are decoration that
 * the narrow layout drops entirely rather than shrinking.
 *
 * The wrapper sets width only. `Media` is `w-full` and applies its own ratio
 * class, so the height follows from `ratio` — a second aspect here would fight
 * it and leave the box taller than the photograph inside it.
 *
 * `pointer-events-none` because most of each box is off-screen and none of it is
 * interactive; without it the visible portion is a dead target that still eats
 * a click.
 */
const IMAGE_BASE_CLASS =
  "pointer-events-none absolute hidden w-[45%] desktop:block";

/** Top-anchored, hung 24% off the left edge. Node: `inset[0, …, −360]`. */
const LEFT_IMAGE_CLASS = "left-[-24%] top-0 rotate-[-4deg]";

/** Bottom-anchored, hung 24% off the right edge. Node: `inset[98px, −388.8px, …]`. */
const RIGHT_IMAGE_CLASS = "right-[-24%] bottom-0 rotate-[4deg]";

/**
 * [DEVIATION] A rotation, where design.md has no rotation vocabulary at all.
 *
 * The node bakes the tilt into its exported bitmap, so there is no angle to read
 * off it; ±4deg is measured from the reference render and held symmetric, where
 * the reference's two differ slightly. It is the one thing that makes this
 * layout read as the reference rather than as two rectangles at the edges, which
 * is why it ships — but it is a new visual device on a deliberately flat system,
 * and it is two class names to remove.
 *
 * It costs nothing structurally: the tilt adds about 45px to each box's vertical
 * extent at the reference width, and the band clips it.
 */

/**
 * 45% of the viewport at desktop, and effectively nothing below it.
 *
 * The `1px` candidate is deliberate. These boxes are `display: none` below
 * desktop, and a lazy image in a hidden box is still fetched by some engines —
 * so the narrow candidate is what a phone downloads if its browser does fetch,
 * rather than a 45vw asset for a box that will never be seen.
 */
const IMAGE_SIZES = "(min-width: 64rem) 45vw, 1px";

/**
 * Six of twelve container columns, centred — the reference's centred column,
 * expressed on the site's grid rather than as its 560.9px.
 *
 * `text-center` is declared once here and inherits, because centring is this
 * band's layout decision: `Heading` and `Text` take no `className`, and a
 * primitive that could choose its own alignment could choose the wrong one.
 */
const COPY_CLASS = "mx-auto text-center desktop:w-1/2";

export type AboutStoryProps = {
  content: AboutStoryContent;
  headingId: string;
};

export function AboutStory({ content, headingId }: AboutStoryProps) {
  return (
    <section
      aria-labelledby={headingId}
      /*
        `overflow-hidden` is what makes the band a window rather than a source of
        horizontal scroll: both photographs extend past the viewport on purpose,
        and design.md § 10 sets "320px is the floor. No horizontal scroll" — the
        clip is what keeps that true at every width, not only the narrow ones
        where the images are hidden.
      */
      className="section-rhythm relative overflow-hidden bg-ink text-on-dark focus-ring-on-dark"
    >
      <FlankingImage
        image={content.images.left}
        positionClass={LEFT_IMAGE_CLASS}
      />
      <FlankingImage
        image={content.images.right}
        positionClass={RIGHT_IMAGE_CLASS}
      />

      {/*
        `relative` rather than a z-index. The photographs above are absolutely
        positioned and would otherwise paint over this block; making the copy
        positioned too puts it later in paint order, which is the whole
        requirement. A negative z-index on the images would also work and would
        depend on whether this section is a stacking context — this does not.
      */}
      <div className="relative">
        <Container>
          <Reveal index={0}>
            <div className={COPY_CLASS}>
              {/*
                `align="center"` does the other half of the centring: under the
                default `stretch` each child fills the column, so the `Badge`
                would lose its pill shape and every measure cap would resolve
                against the full width with its text centred inside it — centred
                lines in a stretched column, which is the usual way a centred
                block comes out looking broken.

                `gap="xl"` (28 → 32) between the eyebrow and the story, matching
                the step both other pages' heroes use between blocks of different
                kinds.
              */}
              <Stack gap="xl" align="center">
                <Badge tone="dark">{content.eyebrow}</Badge>

                {/*
                  Suppressed, per the decision above. The wrapper carries the
                  utility rather than the heading, because `Heading` takes no
                  `className` — and it should not: a primitive that could hide
                  itself could hide the wrong thing.

                  `role="label"` because the visual role is moot on an element
                  nobody sees, and naming the smallest one is the honest
                  declaration of a heading that is deliberately not competing.
                */}
                <div className="visually-hidden">
                  <Heading id={headingId} level="h2" role="label">
                    {content.heading}
                  </Heading>
                </div>

                {/*
                  `gap="lg"` (20 → 24) between paragraphs — design.md § 3 assigns
                  that step to text margins, and it is the tightest step that
                  still reads as three paragraphs at this type size, which matters
                  because the tier change is already doing some of the separating.
                */}
                <Stack gap="lg" align="center">
                  {content.paragraphs.map((paragraph) => (
                    /*
                      Keyed on the text. These are static authored paragraphs
                      with no id and no reordering; the text is what identifies
                      one, and it stays correct if another is ever inserted.

                      `role="prose"` is the 22 → 28 body size added for this
                      section — see `--text-prose` for why the scale had no role
                      for prose that is the subject of its own band.

                      `measure="feature"` (45ch) caps the line length inside a
                      column that is already narrow, so the block holds its
                      measure as the column grows toward desktop rather than
                      running to whatever the column happens to be.
                    */
                    <Text
                      key={paragraph.text}
                      role="prose"
                      measure="feature"
                      isSecondary={paragraph.tier === "recede"}
                    >
                      {paragraph.text}
                    </Text>
                  ))}
                </Stack>
              </Stack>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}

/**
 * One cropped photograph at a band edge.
 *
 * Not exported: it exists only inside this band. It is separate because both
 * edges render it and a duplicated `Media` call is a place for the two to drift
 * apart — the same reason `GetStartedImageBand` keeps its own `BandImage`.
 *
 * `radius="md"` (16px) is the token for a large media plate, which is what the
 * reference draws. Its gradient border is not reproduced; see the content
 * module.
 *
 * `ratio="landscape"` (4:3) rather than the node's 720 × 590 (1.22:1). The ratio
 * set is closed by design and has no 1.22, and this is the nearest: at the
 * reference width it puts the *visible* slice at 302 × 486, against the node's
 * 360 × 590 — 0.62 against 0.61, which is the proportion that actually shows.
 */
function FlankingImage({
  image,
  positionClass,
}: {
  image: ImageAsset;
  positionClass: string;
}) {
  return (
    <div className={cx(IMAGE_BASE_CLASS, positionClass)}>
      <Media
        image={image}
        ratio="landscape"
        fit="cover"
        sizes={IMAGE_SIZES}
        radius="md"
      />
    </div>
  );
}
