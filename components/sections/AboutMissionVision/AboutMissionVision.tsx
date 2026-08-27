import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Timeline } from "@/components/sections/HowItWorks/Timeline";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { AboutMissionVisionContent } from "@/content/about-mission-vision.content";
import type { Tone } from "@/types/ui.types";

/**
 * Mission & Vision — spec § 4.
 *
 * A centred heading block over the shared timeline rail, with two phases
 * alternating either side of it.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The rail is imported, not rebuilt.
 *
 * `Timeline` — with `TimelineConnector`, `TimelineItem` and `TimelineMarker`
 * beneath it — is the site's scroll-tracked rail. It carries about a hundred
 * lines of measured reasoning about where the marker sits against the rail, what
 * the 32px column is for, and why the fill needs no JavaScript. Copying that into
 * a second component is how two rails end up 8px apart on one page and nobody can
 * say which is right.
 *
 * It takes its entries as a prop and knows nothing about which page renders it,
 * the same arrangement `WhyOmanga`, `CTA` and `TrustPartners` already have.
 *
 * [NAMING] It lives under `components/sections/HowItWorks/`, which is now the
 * wrong home: it belongs at `components/sections/Timeline/` as a shared section
 * part. Left where it is because moving it means editing a shipped page's
 * imports, which is outside this phase — the same call, for the same reason, that
 * `GetStartedImageBand` records on the Insurance page.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] This wrapper exists rather than `HowItWorks` being reused whole.
 *
 * The two sections' heading blocks are nearly identical and the duplication is
 * real. Reusing `HowItWorks` directly would need its content type's `eyebrow` to
 * become optional — § 4 has no approved eyebrow string — and would leave an
 * About page section rendering through a component named for the homepage's
 * process explainer. The reuse that matters is the rail, which is shared; what is
 * duplicated is one heading block, which is three primitives.
 *
 * [DEVIATION] The heading block's intro is not `isSecondary` here, where
 * `HowItWorks` sets it. § 4's sub-line — "Where Omanga is going, and what gets us
 * there." — is the section's own statement of what the two phases are for, not a
 * qualifier on the heading above it. `HowItWorks`'s intro genuinely is a
 * qualifier ("Three steps, all of them before you board.").
 */

/**
 * Light, and the second consecutive light band after the hero — the dark story
 * panel sits between them, so the page still alternates.
 *
 * § 2's page-flow table gives this section "Light / pale blue". There is no pale
 * blue in this system: design.md § 8 lists one brand colour and four neutrals,
 * and the live page's pale-blue tint is from the design this page replaces.
 * `light` is the closest surface the system has, and § 5's note that the tonal
 * break between § 4 and § 6 has to carry the removed team section is the place
 * that tint was doing work — which makes it § 6's problem to solve, not this
 * section's to invent a token for.
 */
const SECTION_TONE: Tone = "light";

export type AboutMissionVisionProps = {
  content: AboutMissionVisionContent;
  headingId: string;
};

export function AboutMissionVision({
  content,
  headingId,
}: AboutMissionVisionProps) {
  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      {/*
        `gap="4xl"` (40 → 64) between the heading block and the rail — the step
        that separates a heading block from a content block, and the one
        `HowItWorks` uses in the same position.
      */}
      <Stack gap="4xl">
        {/*
          `text-center` is declared once here and inherits, because centring is
          this band's layout decision: `Heading` and `Text` take no `className`,
          and a primitive that could choose its own alignment could choose the
          wrong one. § 4: "Section H2 and a one-line sub-heading, centred at the
          top."
        */}
        <div className="text-center">
          {/*
            `align="center"` does the other half. Under the default `stretch`
            each child fills the column and the measure caps resolve against the
            full width with their text centred inside — centred lines in a
            stretched column, which is how a centred block comes out looking
            broken.
          */}
          <Stack gap="lg" align="center">
            <Heading id={headingId} level="h2" role="section">
              {content.heading}
            </Heading>

            {/*
              `measure="narrow"` (60ch) is the documented cap for body copy
              beneath a centred heading. § 4's sub-line is 46 characters, so it
              never engages — declared because the cap is what stops the *next*
              sub-line from setting one line across the whole column.
            */}
            <Text role="body" measure="narrow">
              {content.intro}
            </Text>
          </Stack>
        </div>

        {/*
          Two phases, and § 4 is explicit that two is correct: "Two phases means
          the section is short. That is correct and intentional — resist the
          temptation to restore Clarity's density."

          The rail alternates sides starting on the end side, so Mission sits
          right of the rail and Vision left of it above desktop, and both read
          left to right below it. Each phase's `h3` continues the outline from
          this section's `h2` without skipping a level.
        */}
        <Timeline steps={content.phases} />
      </Stack>
    </Section>
  );
}
