import type { ComponentType } from "react";

import { ArrowDownToLine } from "@/components/icons/ArrowDownToLine";
import { Globe } from "@/components/icons/Globe";
import { Headset } from "@/components/icons/Headset";
import { Wallet } from "@/components/icons/Wallet";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { PaymentsMetric } from "@/content/payments-features.content";
import type { HeadingLevel, IconSize } from "@/types/ui.types";

/**
 * § 4e — the figures that back the three cards.
 *
 * The spec pairs this with the cards as one continuous block, and the pairing is
 * the point: "claim, then proof, before the visitor has a chance to doubt the
 * claim." So it is inside the same section rather than a band of its own.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] A feature grid, not a scoreboard.
 *
 * It was a `dl` of four large numerals over captions. It is now the pattern
 * `InsuranceInclusions` already uses — a 32px glyph, a term, one or two lines of
 * secondary copy, left-aligned with no surface — on instruction, so the two
 * sections on the site that state supporting facts state them the same way.
 *
 * Every figure survives inside its term; the content module records why that was
 * the constraint. What changed is the weight: a bare `50+` at h3 scale asserted a
 * number, and a term with a sentence under it explains one. On a page whose
 * cards no longer carry body copy, the explaining is worth more than the
 * asserting.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] The `dl` is gone with it.
 *
 * That was the right element for a figure and its caption — each figure was
 * literally the value of the label beside it — and `flex-col-reverse` was what
 * let `dt` precede `dd` in source while the numeral painted above. None of that
 * survives the new shape: these are four short passages of prose under four
 * subheadings, which is what `h3` plus `p` describes.
 *
 * It also removes the deviation the old version carried. `text-h3` was applied
 * directly to a `dd` because there is no primitive for a large non-heading
 * number; the terms are now genuine headings and render through `Heading`, so
 * nothing here reaches past the type scale.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATION from design.md § 10] Two columns on mobile, not one.
 *
 * The same opt-out `InsuranceInclusions` documents, for the same reason: the
 * rule's own next bullet is about cards — "3-up and 4-up wait for desktop, so
 * cards never get squeezed below a readable width" — and these are not cards.
 * No surface, no padding, no action, no equal-height row.
 *
 * The cost is the same one too: at 375px each column is about 152px and
 * `role="feature"` is 24px there, so "Three funding currencies" wraps to three
 * lines and the rows sit ragged. Type cannot shrink to fix it — § 10 is explicit
 * that breakpoints "never change a font size" — so the rag is the accepted
 * trade. Verify at 320 and 375.
 */

/** Sits under the section's `h2`, alongside the three card headings. */
const TERM_LEVEL: HeadingLevel = "h3";

/** design.md § 9: "16, 24 or 32. Nothing between." */
const ICON_SIZE: IconSize = "lg";

const MOBILE_COLUMNS = 2;

type Glyph = ComponentType<{ size: IconSize; label?: string }>;

/**
 * Which glyph goes with which fact.
 *
 * Here rather than in the content module, for the reason `InsuranceInclusions`
 * and `SolutionCard` both give: an icon is a design treatment, not copy. Keyed
 * by the content's stable `id`, so rewording a term cannot silently change its
 * icon.
 *
 * `Globe` and `Headset` are the same two that already mean roaming and
 * round-the-clock support on `/insurance`, deliberately — the concepts are the
 * same and a second glyph for either would be the set drifting.
 *
 * All four are decorative. The term is stated in text directly beneath each one,
 * so a label would have every glyph announced twice.
 */
const GLYPH: Readonly<Record<string, Glyph>> = {
  coverage: Globe,
  currencies: Wallet,
  funding: ArrowDownToLine,
  support: Headset,
} as const;

export type MetricRowProps = {
  label: string;
  metrics: readonly PaymentsMetric[];
};

export function MetricRow({ label, metrics }: MetricRowProps) {
  return (
    <Stack gap="3xl">
      {/*
        A `p`, not a heading. Four terms already sit at `h3` beneath it, so a
        heading here would have to be an `h3` too — putting the label and the
        things it labels at the same level — or an `h4`, which would nest the
        facts under a label that is only a caption. It names the group visually
        and the section's `h2` already names it in the outline.
      */}
      <Text role="small" isSecondary>
        {label}
      </Text>

      {/*
        `isEqualHeight={false}` — these are not cards and nothing aligns across
        the row, so stretching would only stretch invisible boxes and the rows
        are meant to be ragged.

        Four items over three columns leaves one alone on the second row, which
        is the reference's own arrangement and needs no orphan handling: at
        mobile the count divides by two exactly.
      */}
      <Grid
        columns={3}
        mobileColumns={MOBILE_COLUMNS}
        gap="3xl"
        isEqualHeight={false}
      >
        {metrics.map((metric) => (
          <MetricItem key={metric.id} metric={metric} />
        ))}
      </Grid>
    </Stack>
  );
}

/**
 * One fact. Not exported — it exists only inside this grid and has no second
 * caller, so hoisting it would generalise for a use case that does not exist.
 */
function MetricItem({ metric }: { metric: PaymentsMetric }) {
  const Mark = GLYPH[metric.id];

  return (
    <Stack gap="lg" align="start">
      {/*
        Absent rather than substituted if a fifth metric arrives without a glyph.
        A wrong icon is worse than none.
      */}
      {Mark !== undefined && <Mark size={ICON_SIZE} />}

      <Stack gap="md">
        <Heading
          id={`payments-metric-${metric.id}`}
          level={TERM_LEVEL}
          role="feature"
          measure="none"
        >
          {metric.term}
        </Heading>

        <Text role="body" measure="feature" isSecondary>
          {metric.description}
        </Text>
      </Stack>
    </Stack>
  );
}
