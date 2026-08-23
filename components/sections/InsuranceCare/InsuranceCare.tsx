import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type { InsuranceCareContent } from "@/content/insurance-care.content";
import type { Tone } from "@/types/ui.types";

/**
 * How care works.
 *
 * Copy on the left, photograph on the right, vertically centred against each
 * other. Light, following the dark deep dive above it, so the page continues to
 * alternate.
 *
 * [DECISION] The grid is declared here rather than by a `Grid` with
 * `columns={12}`. This is a two-cell asymmetric split with a gutter column
 * between the halves — five columns, one empty, six — which `Grid` can express
 * only by having the section set spans on its children anyway. `ProductContent`
 * takes the same approach for the same split.
 *
 * [DECISION] `items-center`, not the default stretch. There are two blocks of
 * unequal height side by side and neither should grow to match the other: a
 * stretched media box would crop the photograph to whatever height the copy
 * happens to be.
 *
 * The copy column comes first in the DOM and stays first when the grid collapses
 * to one column — layout rules forbid reordering, so the heading always precedes
 * its illustration for a screen reader and at 375px alike.
 */

const SECTION_TONE: Tone = "light";

const LAYOUT_CLASS =
  "grid grid-cols-1 items-center gap-fluid-7 desktop:grid-cols-12 desktop:gap-x-fluid-7";
const COPY_CELL_CLASS = "desktop:col-span-5";
const MEDIA_CELL_CLASS = "desktop:col-start-7 desktop:col-span-6";

// Six of twelve columns inside a container capping at 95rem.
const MEDIA_SIZES =
  "(min-width: 90rem) 688px, (min-width: 64rem) 48vw, (min-width: 48rem) calc(100vw - 6rem), calc(100vw - 2rem)";

export type InsuranceCareProps = {
  content: InsuranceCareContent;
  headingId: string;
};

export function InsuranceCare({ content, headingId }: InsuranceCareProps) {
  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      <Reveal index={0}>
        <div className={LAYOUT_CLASS}>
          <div className={COPY_CELL_CLASS}>
            {/*
              `gap="2xl"` puts the button further from the paragraph than the
              paragraph is from the heading, so the copy reads as one block and
              the action as a separate decision. `align="start"` sizes the
              button to its own label rather than to the column.
            */}
            <Stack gap="2xl" align="start">
              <Stack gap="lg">
                <Heading id={headingId} level="h2" role="section">
                  {content.heading}
                </Heading>

                <Text role="body">{content.body}</Text>
              </Stack>

              <Button
                as="link"
                variant={content.action.emphasis}
                tone={SECTION_TONE}
                href={content.action.href}
                isExternal={content.action.isExternal}
              >
                {content.action.label}
              </Button>
            </Stack>
          </div>

          {/*
            `landscape` with `cover`. The source is portrait at 5466 × 7990, so
            this crops a horizontal strip through the middle of the frame — see
            the flag in the content module. The box is locked before load either
            way, so nothing reflows.
          */}
          <div className={MEDIA_CELL_CLASS}>
            <Media
              image={content.image}
              ratio="landscape"
              fit="cover"
              sizes={MEDIA_SIZES}
              radius="md"
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
