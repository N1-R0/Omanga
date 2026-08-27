import { Heading } from "@/components/ui/Heading";
import { Media } from "@/components/ui/Media";
import { Text } from "@/components/ui/Text";
import type { ImpactPillar } from "@/content/about-impact.content";

/**
 * One pillar's panel: a square photograph, the pillar's `h3`, and its statement.
 *
 * A Server Component. Nothing in here is interactive — § 6 forbids the inline
 * link the reference carries — so the only client code in this section is the
 * tab list that switches between panels.
 *
 * ---------------------------------------------------------------------------
 * [MEASURED from node 2579:131863] The panel.
 *
 * A 354 square image and a 530 copy block inside a 997-wide column, with the copy
 * starting at 385.76 — so image 35.5%, gap 3%, copy 53%, and the two are centred
 * against each other rather than top-aligned. On the twelve-column grid that is
 * four columns of image, one of gap, seven of copy.
 *
 * The heading is 40px at line-height 1.1 and −0.03em tracking, which is exactly
 * `--text-h3` at its wide end, so `role="step"`. The body is 18px at
 * line-height 1.5, which is `--text-main` at its wide end, so `role="body"`. The
 * 32 between them is `--space-5`.
 */

const LAYOUT_CLASS =
  "grid grid-cols-1 items-center gap-fluid-6 desktop:grid-cols-12";
const MEDIA_CELL_CLASS = "desktop:col-span-4";
const COPY_CELL_CLASS = "desktop:col-start-6 desktop:col-span-7";

/**
 * Four of twelve columns inside a panel that is eight of twelve of a container
 * capping at 95rem — so roughly a third of two thirds, which is where the 27vw
 * comes from. Below desktop the image is the full content column.
 */
const MEDIA_SIZES =
  "(min-width: 90rem) 400px, (min-width: 64rem) 27vw, (min-width: 48rem) calc(100vw - 10rem), calc(100vw - 4rem)";

export type ImpactPanelProps = {
  pillar: ImpactPillar;
};

export function ImpactPanel({ pillar }: ImpactPanelProps) {
  return (
    <div className={LAYOUT_CLASS}>
      {/*
        `square`, which the reference draws and which the sources mostly are not —
        two are landscape and one is a tall portrait, so `object-cover` crops each
        to its centre. The box is locked before load either way, so nothing
        reflows when the panel changes.
      */}
      <div className={MEDIA_CELL_CLASS}>
        <Media
          image={pillar.image}
          ratio="square"
          fit="cover"
          sizes={MEDIA_SIZES}
          radius="sm"
        />
      </div>

      <div className={COPY_CELL_CLASS}>
        {/*
          Not a `Stack`. The gap between a heading and its body is the one place
          the system uses a padding step instead — the same call `TimelineItem`
          makes — because a two-child Stack around a heading and a paragraph is a
          flex container doing what one declaration does.
        */}
        <Heading
          id={`${pillar.id}-heading`}
          level="h3"
          role="step"
          measure="none"
        >
          {pillar.heading}
        </Heading>

        <div className="pt-fluid-5">
          {/*
            `measure="feature"` (45ch) — the documented cap for copy inside a
            column. § 6's statements are 15 to 19 words, so it engages only on the
            longest of the three, which is the point: the block holds one measure
            across all three panels instead of each one setting its own.
          */}
          <Text role="body" measure="feature">
            {pillar.body}
          </Text>
        </div>
      </div>
    </div>
  );
}
