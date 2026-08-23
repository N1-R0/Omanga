import type { ComponentType } from "react";

import { Globe } from "@/components/icons/Globe";
import { Headset } from "@/components/icons/Headset";
import { Newspaper } from "@/components/icons/Newspaper";
import { Smartphone } from "@/components/icons/Smartphone";
import { Video } from "@/components/icons/Video";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type {
  Inclusion,
  InsuranceInclusionsContent,
} from "@/content/insurance-inclusions.content";
import { cx } from "@/lib/cx";
import type { HeadingLevel, IconSize, Tone } from "@/types/ui.types";

/**
 * Included on every plan — spec § 6.2, built to the Figma frame.
 *
 * A three-column feature grid: an icon, the term, and one line of secondary
 * copy. Left-aligned, no card, no border — the frame's point is that these are
 * facts rather than offers, so they get no surface of their own.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATION from design.md § 10] Two columns on mobile, not one.
 *
 * The rule is unambiguous: "Every multi-column pattern collapses to one column,
 * in DOM order." `Grid` was built to enforce it and defaults to exactly that.
 * This section opts out, and the reason it is allowed to is the reason the rule
 * exists — the bullet immediately after it is about *cards*: "3-up and 4-up wait
 * for desktop, so cards never get squeezed below a readable width at 768."
 *
 * These are not cards. There is no surface, no padding, no action and no
 * equal-height row; each cell is a 32px glyph, a term and one line. Five of them
 * stacked one-per-row is a column of mostly whitespace that pushes the section
 * below it a screen and a half down. Two-up is denser without any of the
 * squeezing the rule guards against.
 *
 * What it does cost, recorded rather than hidden: at 375px each column is about
 * 152px, and `role="feature"` is 24px there — so "24/7 dedicated contact centre"
 * wraps to three lines and the cells sit ragged. Type cannot shrink to fix it
 * (§ 10: breakpoints "never change a font size"), so the ragged rows are the
 * accepted trade, not an oversight. Verify at 320 and 375 before it ships.
 *
 * ---------------------------------------------------------------------------
 * [ADDED] The frame has no heading; this section has one.
 *
 * The node starts at the grid. A `section` with no accessible name is announced
 * as an unlabelled region a screen-reader user has to enter to identify, so the
 * spec's own § 6.2 sub-heading is promoted to the section's `h2` rather than a
 * new string being written. It is approved copy either way.
 *
 * ---------------------------------------------------------------------------
 * [NORMALISED from the frame]
 *
 *   - Inter Regular 24 / 16 at `#1a1a1a` and `#928c97` → `role="feature"`
 *     (24 → 28) and `role="body"` secondary, which is the system's 80%-opacity
 *     treatment rather than a second grey.
 *   - The frame's `0.18px` tracking is dropped. design.md § 1 rule 2 allows two
 *     tracking values, `0` and `-0.03em`, "and no positive tracking anywhere".
 *   - Icons at 40 → `lg` (32). design.md § 9: "16, 24 or 32. Nothing between."
 *   - The frame positions every element absolutely inside a fixed 181px box.
 *     That is a Webflow export artefact, not a design decision — it clips the
 *     moment a term wraps, which "24/7 dedicated contact centre" already does
 *     below desktop. Flowed instead.
 */

const SECTION_TONE: Tone = "light";

/**
 * Columns below tablet. Declared as a constant, not just passed to `Grid`,
 * because the span rule below has to divide by it — a grid moved back to one
 * column on mobile while the rule still assumed two would leave a `col-span-2`
 * spanning past the end of the grid.
 *
 * Only the mobile count is named here. Tablet and desktop keep `Grid`'s own
 * behaviour for `columns={3}` — two up, then three — and neither spans.
 */
const MOBILE_COLUMNS = 2;

/** Sits one level below the page's `h1`, which § 5's heading carries. */
const HEADING_LEVEL: HeadingLevel = "h2";
const TERM_LEVEL: HeadingLevel = "h3";

const ICON_SIZE: IconSize = "lg";

type Glyph = ComponentType<{ size: IconSize; label?: string }>;

/**
 * Which glyph goes with which inclusion.
 *
 * Here rather than in the content module, for the reason `SolutionCard` gives
 * about its own presentation prop: an icon is a design treatment, not copy. The
 * map is keyed by the content's stable `id`, so renaming a term cannot silently
 * change its icon.
 *
 * All five are decorative. The term is stated in text directly beneath each
 * one, so a label would have every glyph announced twice.
 */
const GLYPH: Readonly<Record<string, Glyph>> = {
  telemedicine: Video,
  roaming: Globe,
  "contact-centre": Headset,
  newsletter: Newspaper,
  "mobile-app": Smartphone,
} as const;

/**
 * Whether this item is a last row on its own — the one case that gets the full
 * width.
 *
 * True only for the final item of a list that does not divide by the column
 * count. Every other item, and every item of an even list, lays out normally.
 */
function isFinalOrphan(index: number, total: number): boolean {
  return index === total - 1 && total % MOBILE_COLUMNS !== 0;
}

export type InsuranceInclusionsProps = {
  content: InsuranceInclusionsContent;
  headingId: string;
};

export function InsuranceInclusions({
  content,
  headingId,
}: InsuranceInclusionsProps) {
  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      <Stack gap="4xl">
        <Reveal index={0}>
          <Heading id={headingId} level={HEADING_LEVEL} role="section">
            {content.heading}
          </Heading>
        </Reveal>

        <Reveal index={1}>
          {/*
            `gap="3xl"` unchanged, deliberately. At 375px the two columns come
            out about 152px each with a 36px trough, and dropping to the next
            step down buys 8px — not enough to change a single line break, and
            not worth a responsive gap prop on a shared primitive to get. If the
            trough reads too wide against columns that narrow, it is a one-token
            change here.

            `isEqualHeight={false}`. These are not cards and nothing is aligned
            across the row — stretching them would only stretch invisible boxes.
            It matters more at two-up than it did at one: the cells are now
            genuinely side by side and their terms wrap to different depths, so
            the rows are meant to be ragged rather than padded to match.
          */}
          <Grid
            columns={3}
            mobileColumns={MOBILE_COLUMNS}
            gap="3xl"
            isEqualHeight={false}
          >
            {content.inclusions.map((inclusion, index) => (
              <div
                key={inclusion.id}
                /*
                  The span is the section's to declare, not the item's — `Grid`
                  owns columns and gaps, and its contract is that "sections
                  declare column spans; children never position themselves". So
                  the class sits on a wrapper here rather than inside
                  `InclusionItem`, which stays identical for all five.

                  Derived from the count, never hardcoded to the fifth. A sixth
                  inclusion makes the list even, the condition goes false and the
                  grid becomes a clean 2 × 3 with no stray full-width cell. The
                  alternative — `index === 4` — would silently leave the sixth
                  item spanning half a row it no longer ends.

                  `max-tablet:` because two-up is the mobile layout only. At
                  tablet the grid is still two columns but reverts to `Grid`'s
                  own behaviour, and at desktop it is three, where five items
                  divide 3 + 2 and there is no orphan to span.
                */
                className={cx(
                  isFinalOrphan(index, content.inclusions.length) &&
                    "max-tablet:col-span-2",
                )}
              >
                <InclusionItem inclusion={inclusion} termLevel={TERM_LEVEL} />
              </div>
            ))}
          </Grid>
        </Reveal>
      </Stack>
    </Section>
  );
}

/**
 * One inclusion. Not exported — it exists only inside this grid and has no
 * second caller, so hoisting it would generalise for a use case that does not
 * exist.
 */
function InclusionItem({
  inclusion,
  termLevel,
}: {
  inclusion: Inclusion;
  termLevel: HeadingLevel;
}) {
  const Mark = GLYPH[inclusion.id];

  return (
    <Stack gap="lg" align="start">
      {/*
        Absent rather than substituted if a sixth inclusion arrives without a
        glyph — a wrong icon is worse than none, which is the whole reason the
        frame's own five were replaced.
      */}
      {Mark !== undefined && <Mark size={ICON_SIZE} />}

      <Stack gap="md">
        <Heading
          id={`inclusion-${inclusion.id}`}
          level={termLevel}
          role="feature"
          measure="none"
        >
          {inclusion.term}
        </Heading>

        <Text role="body" measure="feature" isSecondary>
          {inclusion.description}
        </Text>
      </Stack>
    </Stack>
  );
}
