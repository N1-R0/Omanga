import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type { WhyOmangaContent } from "@/content/why-omanga.content";

import { ComparisonGrid } from "./ComparisonGrid";

/**
 * The homepage's Why Omanga section — the before-and-after comparison.
 *
 * A Server Component with nothing interactive in it: two headings, a paragraph and
 * ten statements. No links, no state, so every string is in the server HTML, which
 * the SEO plan requires of all copy.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] Not built from the Figma MCP frame.
 *
 * The brief ranks the frame first. The Figma Dev Mode MCP server is still
 * unreachable in this environment — all four tools return the same setup
 * instruction — and the Figma connector is unauthorised, so the section is built
 * from the screenshot, the Clarity reference and `design.md`.
 * **Re-verify against the frame once the MCP server is available.**
 *
 * The screenshot was measured before any code was written. Taking the frame as
 * 1440 wide (the render is 1142, so scale 0.793), the two panels come to 608 each
 * with a 10 seam — 1226 against the 1240 content column § Grid system specifies,
 * which confirms the reading. Every vertical gap the screenshot shows then lands
 * on a step the spacing table already names, so none of them is invented here:
 *
 *   heading -> intro      35 measured  ->  32  `xl`   "section heading to intro"
 *   intro   -> columns    86 measured  ->  64  `4xl`  "intro to content in dark
 *                                                      sections"
 *   title   -> panel      48 measured  ->  40  `2xl`  "heading block to content
 *                                                      block"
 *   row     -> row        41 measured  ->  16 + 27 line box, the step § Card
 *                                          variants names for comparison rows
 *
 * ---------------------------------------------------------------------------
 * CLARITY REFERENCE. The 6th section of claritybusinesstravel.com is the same
 * pattern: a centred heading, a short paragraph, then "Without Clarity" and "With
 * Clarity" as two labelled five-item columns entering on scroll. The structure and
 * the item count match, so nothing had to be adapted — what is taken from it is
 * the entrance behaviour, which is expressed here through the system's own motion
 * tokens rather than by copying its timings.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] No eyebrow.
 *
 * The frame draws none, and § Section rules makes the eyebrow optional — "a
 * section with unverified content renders without that element rather than with a
 * placeholder". `WhyOmangaContent` therefore has no `eyebrow` field at all, so one
 * cannot be added without a copy decision.
 *
 * The section is CTA-free and stays that way. The frame draws no action and §
 * Section rules asks that "sections that the specification defines as CTA-free
 * stay CTA-free".
 *
 * [NOTE] This section is dark and the African Coverage section above it is light,
 * so the page alternates surface here as § Component consistency rules asks.
 */

export type WhyOmangaProps = {
  content: WhyOmangaContent;
  /**
   * The id of the heading that names this section.
   *
   * Passed in rather than defined here so the value has one owner — the content
   * module — and the heading and the `aria-labelledby` cannot drift apart.
   */
  headingId: string;
};

/**
 * Where the comparison columns continue the entrance sequence: after the heading
 * (0) and the intro (1).
 */
const COLUMNS_REVEAL_FROM = 2;

export function WhyOmanga({ content, headingId }: WhyOmangaProps) {
  return (
    <Section labelledBy={headingId} tone="dark">
      <Stack gap="4xl">
        <div className="text-center">
          <Stack gap="lg" align="center">
            <Reveal index={0}>
              {/*
                [MEASURED] Capped at `--container-heading` (800) — the benchmark's
                `u-max-width-30ch` solved at Omanga's 48 h2. Short enough today
                that the cap is inert, and applied anyway so the four centred
                section headings share one measure and a copy edit cannot make one
                of them the exception.
              */}
                <Heading id={headingId} level="h2" role="section">
                  {content.heading}
                </Heading>
            </Reveal>

            <Reveal index={1}>
              <Text role="body" measure="narrow" isSecondary>
                {content.intro}
              </Text>
            </Reveal>
          </Stack>
        </div>

        <ComparisonGrid
          groups={content.groups}
          revealFrom={COLUMNS_REVEAL_FROM}
        />
      </Stack>
    </Section>
  );
}
