import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { AfricanCoverageContent } from "@/content/coverage.content";

import { CoverageContent } from "./CoverageContent";
import { FlagCluster } from "./FlagCluster";

/**
 * The homepage's African Coverage section — the flag arch with the coverage
 * claim sitting inside it.
 *
 * A Server Component. Nothing here is interactive except one link, so nothing
 * hydrates and every string is in the server HTML, which the SEO plan requires.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] Not built from the Figma MCP frame.
 *
 * The brief names the frame (node 1265:12975) as the mandatory source. The Figma
 * Dev Mode MCP server is not reachable in this environment — `get_metadata`,
 * `get_design_context`, `get_screenshot` and `get_variable_defs` all return the
 * same setup instruction — and the Figma connector is unauthorised. The section is
 * built instead from the supplied SwiftUI dimensions plus the section screenshot,
 * at the request of the person who supplied them.
 *
 * The spec was checked against the screenshot before any code was written and is
 * internally consistent: at a 1440 × 836 frame the derived chip size, column
 * pitch, crest and base offsets and the text block's baseline all land within a
 * few pixels of the image. **Re-verify against the frame once the MCP server is
 * available.**
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The composition is a two-item grid stack, not absolute positioning.
 *
 * The design needs the text to sit *inside* the arch — lower than the chips'
 * tops, in the well the curve leaves open. `component-rules.md` § Layout rules
 * permits absolute positioning for "decorative art", which the flags are, but a
 * grid stack gets the same result with no positioned ancestor, no fixed height and
 * no z-index: both children are placed in row 1, column 1, and the taller one
 * sets the section's height.
 *
 * The text block is the taller of the two, so height follows content exactly as
 * the layout rules require, and the spec's fixed 836 is not reproduced as a height.
 *
 * ---------------------------------------------------------------------------
 * THE WELL. `pt-34` — 136 — is the only composed value in the section, and it is
 * derived rather than measured:
 *
 *   mid-column elevation   40
 *   chip                 + 96
 *                        ----
 *   text block top        136
 *
 * The four columns that sit horizontally behind the text block are the two `crest`
 * columns (chips at 0–96) and the two `mid` columns (chips at 40–136). Starting
 * the text at 136 puts its first line exactly on the lowest of those chip edges,
 * so the two never collide at any width, and the arch reads as framing the text
 * rather than sitting above it. The frame's own 488-tall flag row is the same
 * number arrived at from the other direction.
 *
 * ---------------------------------------------------------------------------
 * [REJECTED] The spec's `.padding(.horizontal, 432)`.
 *
 * 432 either side of a 1392-wide flag row needs a 2256 frame; the section is 1440,
 * and the screenshot shows the row inset about 24 per side, which is exactly
 * (1440 − 1392) / 2. Read as the text block's padding instead it gives a 576
 * measure, below the 648–756 band `design.md` sets for body copy and
 * narrower than the frame's paragraph renders. It is the one value in the spec
 * that contradicts both the geometry and the screenshot, so it is not used: the
 * row centres in the content column and the paragraph takes the `narrow` measure.
 *
 * ---------------------------------------------------------------------------
 * [NOTE] The section is light, and so is the Product Deep Dive above it.
 * `component-rules.md` asks consecutive sections to alternate surface. The frame
 * paints this one white and surface alternation is a page-composition decision,
 * so it belongs to whoever assembles the eleven sections rather than to this one.
 *
 * The flags carry no entrance animation. `design.md` § Motion principles
 * would stagger them at 80ms, and fourteen chips is exactly the case the stagger
 * exists for — but motion is not in this section's brief, and adding it would be
 * scope the design has not signed off. **Raise with design.**
 */

export type AfricanCoverageProps = {
  content: AfricanCoverageContent;
  /**
   * The id of the heading that names this section.
   *
   * Passed in rather than defined here so the value has one owner — the content
   * module — and the heading and the `aria-labelledby` cannot drift apart.
   */
  headingId: string;
};

export function AfricanCoverage({ content, headingId }: AfricanCoverageProps) {
  return (
    <Section labelledBy={headingId} tone="light">
      {/*
        Below the wide breakpoint this is an ordinary two-row grid — text, then
        flags, 40 apart. At wide both children occupy the same cell and overlap.

        The text comes first in the DOM at every width. It carries the section's
        heading and its meaning; the flags are a sample that illustrates it, and
        fourteen country names announced ahead of the sentence they support would
        bury it.
      */}
      <div className="grid gap-fluid-6 wide:gap-0">
        {/*
          MOTION. `Reveal` sits *inside* each cell, not around it. At wide both
          cells are placed into the same grid slot to produce the overlap, so a
          wrapper outside them would become the grid item and the two would stop
          sharing a cell — the arch would drop below the text.

          The flags follow the text by one stagger step, matching the DOM order,
          which is also the order the section reads in.
        */}
        <div className="wide:col-start-1 wide:row-start-1 wide:pt-34">
          <Reveal index={0}>
            <CoverageContent
              eyebrow={content.eyebrow}
              heading={content.heading}
              headingId={headingId}
              intro={content.intro}
              action={content.action}
            />
          </Reveal>
        </div>

        <div className="wide:col-start-1 wide:row-start-1">
          <Reveal index={1}>
            <FlagCluster flags={content.flags} label={content.flagsLabel} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
