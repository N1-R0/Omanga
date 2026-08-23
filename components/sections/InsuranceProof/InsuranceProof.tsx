import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type { InsuranceProofContent } from "@/content/insurance-proof.content";
import type { Tone } from "@/types/ui.types";

import { ProofStats } from "./ProofStats";

/**
 * Who stands behind your cover — spec § 8.
 *
 * Photograph left, copy and stat row right. The mirror of `InsuranceCare`,
 * which puts its copy on the left — the two light bands do not sit next to each
 * other, but alternating the image side is what stops the page reading as a
 * column of identical two-up blocks.
 *
 * [NOT MOUNTED] The labelled partner strip and the `Meet our partners` link.
 * Both are § 8 content and both are held: all three partner roles are
 * `[VERIFY]`, and the spec is explicit that "a mislabelled partner is worse
 * than an unlabelled one" while three unlabelled logos prove nothing. The link
 * also points at `/partners`, which has no route. The content is in the module,
 * ready.
 */

const SECTION_TONE: Tone = "light";

const LAYOUT_CLASS =
  "grid grid-cols-1 items-center gap-fluid-7 desktop:grid-cols-12 desktop:gap-x-fluid-7";
const MEDIA_CELL_CLASS = "desktop:col-span-5";
const COPY_CELL_CLASS = "desktop:col-start-7 desktop:col-span-6";

// Five of twelve columns inside a container capping at 95rem.
const MEDIA_SIZES =
  "(min-width: 90rem) 568px, (min-width: 64rem) 40vw, (min-width: 48rem) calc(100vw - 6rem), calc(100vw - 2rem)";

export type InsuranceProofProps = {
  content: InsuranceProofContent;
  headingId: string;
};

export function InsuranceProof({ content, headingId }: InsuranceProofProps) {
  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      <Reveal index={0}>
        <div className={LAYOUT_CLASS}>
          {/*
            `portrait` against a landscape source, so `object-cover` crops the
            frame to its centre column — see the flag in the content module. The
            box is locked before load either way, so nothing reflows.
          */}
          <div className={MEDIA_CELL_CLASS}>
            <Media
              image={content.image}
              ratio="portrait"
              fit="cover"
              sizes={MEDIA_SIZES}
              radius="md"
            />
          </div>

          <div className={COPY_CELL_CLASS}>
            {/*
              `gap="4xl"` between the copy block and the figures. They are two
              different kinds of thing — an argument and its evidence — and the
              step that separates a heading block from a content block is the
              one that says so.
            */}
            <Stack gap="4xl">
              <Stack gap="lg">
                <Heading id={headingId} level="h2" role="section">
                  {content.heading}
                </Heading>

                <Text role="body">{content.intro}</Text>
              </Stack>

              <ProofStats stats={content.stats} />
            </Stack>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
