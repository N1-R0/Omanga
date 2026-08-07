import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

/**
 * The section's heading column: optional eyebrow, one heading, two paragraphs
 * of intro.
 *
 * The order is fixed by `component-rules.md` § Section rules — "optional
 * eyebrow, one heading, optional intro, content, optional action" — so it is
 * slots in a fixed order here rather than children a caller could reorder.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] Left-aligned, in a column, not centred above the cards.
 *
 * The Figma frame centres this block across the full content width. The layout
 * reference does not: its heading and both paragraphs are ragged-right in a
 * left-hand column that the cards sit beside, and that is what ships. Two
 * consequences, both improvements:
 *
 *   - Nothing is centred, so nothing needs `text-center` or a centring Stack.
 *     `Stack`'s default `stretch` lets the heading and paragraphs fill the
 *     column and wrap against its edge, which is what makes the rag natural
 *     rather than measured.
 *   - Centred text is harder to track line to line, and the frame's version put
 *     two full paragraphs through it. Left-aligned copy in a 486 measure is the
 *     more readable arrangement as well as the more faithful one.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] One 24 rhythm throughout, replacing the frame's 32 / 12 pair.
 *
 * The reference spaces its heading and both paragraphs with the same step —
 * `--_spacing---space--4`, which resolves to 24 at the wide end. 24 is already
 * this system's "heading to body" step, so `gap="lg"` reproduces the reference
 * exactly and collapses two section-specific numbers into one systematic one.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The copy measure is 486.
 *
 * The reference caps its paragraphs at `40ch`, which is a font-relative value
 * this system has no equivalent for. `measure-feature` (486) is the nearest
 * token and is what `design.md` reserves for exactly this case — "feature
 * copy caps at 486px". At desktop the 4-column track is narrower than 486 and
 * binds first; the cap earns its place at tablet and below, where the block goes
 * full width and would otherwise run to a 700-plus line.
 *
 * The cap is one wrapper around the whole block rather than a `measure` on each
 * paragraph, so the heading and the copy share one right-hand edge — which is
 * what the reference's single-column layout produces and what a per-element
 * measure would break.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] No `SolutionsBadge` wrapper.
 *
 * `Badge` is already the eyebrow pill, and rule 7 exists to keep its geometry
 * identical everywhere. A wrapper here would do nothing but pass `tone="light"`
 * through, which is a wrapper that restyles rather than one that adds layout or
 * behaviour — the one thing composition rules say wrappers must not do.
 */

export type SectionHeaderProps = {
  headingId: string;
  /**
   * Rendered only when present. Absent today: the frame's pill still reads
   * "ClarityGo", the reference's own brand name, and unverified content renders
   * nothing rather than a placeholder. The reference draws no eyebrow in this
   * section either, so omitting it is also the more faithful arrangement.
   * See `content/solutions.content.ts`.
   */
  eyebrow?: string;
  heading: string;
  /** Exactly two paragraphs, in the approved order. */
  intro: readonly [string, string];
};

export function SectionHeader({
  headingId,
  eyebrow,
  heading,
  intro,
}: SectionHeaderProps) {
  return (
    <div>
      <Stack gap="md">
        {/*
          `align="start"` would be wrong on the Stack even though the block is
          left-aligned: it shrinks every child to its content width, so the
          paragraphs would wrap against the longest word rather than against the
          column. The default `stretch` is what makes left-aligned text behave.
          Alignment here is the absence of a centring class, not a prop.
        */}
        {eyebrow !== undefined && (
          <div>
            {/* Badge is inline-flex; the wrapper stops `stretch` from
                widening the pill to the column. */}
            <Badge tone="light">{eyebrow}</Badge>
          </div>
        )}

        <Heading id={headingId} level="h2" role="section">
          {heading}
        </Heading>

        {/*
          Two paragraphs, not one string with a break in it. Both are approved
          copy and both are real `<p>` elements in the server HTML, which is what
          the SEO expectations require of everything that matters to search.

          They are siblings of the heading rather than a nested Stack, because
          the rhythm is now one value — a nested Stack with the same gap would be
          a wrapper that adds nothing.
        */}
        {intro.map((paragraph) => (
          <Text key={paragraph} role="body">
            {paragraph}
          </Text>
        ))}
      </Stack>
    </div>
  );
}
