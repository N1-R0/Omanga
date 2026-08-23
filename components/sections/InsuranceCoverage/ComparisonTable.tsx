import { Check } from "@/components/icons/Check";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import {
  INCLUDED,
  type CoverageRow,
} from "@/content/insurance-coverage.content";
import type { InsurancePlan } from "@/content/insurance-plans.content";
import { cx } from "@/lib/cx";

/**
 * The plan comparison table — spec § 6.1, built to the Figma frame.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] A real `table`, where the frame is nested `div`s.
 *
 * This is tabular data: thirteen benefits against three tiers, and every cell
 * only means anything in terms of both. `th scope="col"` and `th scope="row"`
 * are what let a screen reader announce "Gold, Admission days per trip" when
 * the user lands on a cell. A grid of divs announces the value alone, which for
 * a health-insurance comparison is the difference between a usable page and a
 * misleading one.
 *
 * The frame's visual arrangement is reproduced exactly — the ink rule under the
 * header, the hairline between rows, the alternating fill, the left column at a
 * fixed share and three equal centred columns.
 *
 * ---------------------------------------------------------------------------
 * [NORMALISED from the frame] Inter Semi Bold 14 / Medium 13 / Regular 11 →
 * `text-small` (14 → 16) at the system's weights; the three differently
 * coloured header pills — pink, `#2f65f1`, `#111` — → one primary treatment,
 * for the reason spec § 5 gives about the plan cards: "a differently-coloured
 * Gold button reads as arbitrary rather than intentional".
 *
 * ---------------------------------------------------------------------------
 * Spec § 6.1 § Table notes asks for two behaviours. One is here, one is not.
 *
 *   - **Sticky header row.** Implemented from tablet up — see the cell class
 *     below, which also covers why it releases at the foot of the table, and the
 *     scroll wrapper, which covers why it cannot survive below tablet.
 *   - **[OUTSTANDING] An accordion per plan below tablet**, explicitly *instead
 *     of* horizontal scroll: "a 4-column table is unusable at 375px". Not built.
 *     It needs a second rendering of the same data, which is a component of its
 *     own. Horizontal scroll is the interim — see the wrapper.
 *
 * [BLOCKER] Four cells are empty by design — see the content module. An empty
 * cell is the honest rendering of an unknown; a dash would read as "not
 * included", which is a claim nobody has made.
 */

/*
  Sticky to the top of the viewport while the table is being read, and released
  once it has scrolled past — spec § 6.1 § Table notes.

  Both halves of that come from `position: sticky` itself. A sticky cell is
  bounded by its containing block, which for a `th` is the `table`: it pins at
  `top-0` as the rows scroll under it and stops the instant the table's own
  bottom edge reaches it, so the tier row leaves with the table rather than
  travelling on down the page. No scroll listener is involved.

  `top-0` rather than `top-header`: the site's bar hides on scroll down, so
  offsetting by its height would leave a 64px gap above the tier row for the
  whole time the table is in view.

  `tablet:` rather than unconditional, for the reason the wrapper below sets out:
  under tablet the scroll box is the sticky element's scrollport and it never
  scrolls vertically, so `sticky` there is not a working sticky header but a cell
  pinned to a box that does not move. Declaring it only where it resolves against
  the page keeps the class honest about where the behaviour exists.

  `top-0` rather than `top-header`: the site's bar hides on scroll down, so
  offsetting by its height would leave a 64px gap above the tier row for the
  whole time the table is in view.

  The fill is explicit — a transparent sticky cell lets rows scroll visibly
  behind it — and `z-raised` keeps it above them.
*/
const HEADER_CELL_CLASS =
  "tablet:sticky top-0 z-raised bg-surface-page px-fluid-3 py-fluid-4 align-bottom";
const LABEL_CELL_CLASS = "px-fluid-3 py-fluid-4 text-left align-middle";
const VALUE_CELL_CLASS = "px-fluid-3 py-fluid-4 text-center align-middle";

export type ComparisonTableProps = {
  rows: readonly CoverageRow[];
  plans: readonly InsurancePlan[];
  /** Names the visually empty first column. */
  featureColumnLabel: string;
  /** Names the scroll region below tablet, which is focusable. */
  tableLabel: string;
  /** Visible cue that the table scrolls sideways. Below tablet only. */
  scrollHint: string;
};

export function ComparisonTable({
  rows,
  plans,
  featureColumnLabel,
  tableLabel,
  scrollHint,
}: ComparisonTableProps) {
  /*
    [RESTORED, gated] The `overflow-x-auto` wrapper, which had been removed
    outright. Both the removal note and its replacement were wrong about the
    facts, so both are corrected here.

    What the removal note got right: `overflow-x: auto` against a visible
    `overflow-y` computes the vertical axis to `auto` too, so the wrapper becomes
    the sticky element's scrollport — and a wrapper sized to its own content
    never scrolls vertically, so the pinned row pins to nothing. That is real,
    and it is why the wrapper is gated rather than simply put back.

    What it got wrong: "the table sets no minimum width, so it fits every
    viewport". A table cannot lay out narrower than its min-content width, and
    this one's is about 560 — a Benefit column held open by `Echocardiography,`
    and three plan columns held open by their `Select …` pills. The content band
    at 375px is about 340. So the table did not squeeze at that width, it
    overflowed by some 220px, and because `body` sets `overflow-x: clip` the
    overflow was neither scrolled nor visible: the Diamond column was absent
    below tablet, unreachable, on the page whose whole purpose is comparing
    tiers. Squeezing was never what was happening.

    `tablet:overflow-x-visible` is what reconciles the two. Above tablet the
    content band is wider than `min-w-comparison-table`, so the box never
    scrolls and — with both axes visible again — it is not a scrollport at all
    and the header sticks to the page as before. Below tablet the table scrolls
    sideways and the sticky header is the thing given up. That is the trade in
    one direction only: a header that does not follow is an irritation, a tier
    that cannot be seen is a misrepresentation.

    `tabIndex={0}` with `role="region"` is not decoration. A box that scrolls
    must be scrollable by keyboard (WCAG 2.1.1), which means it must be able to
    take focus, and a focusable region must have an accessible name or it is an
    unnamed tab stop between two paragraphs. The name is content, so it arrives
    as a prop.
  */
  return (
    <Stack gap="md">
      <div
        role="region"
        aria-label={tableLabel}
        tabIndex={0}
        className="overflow-x-auto tablet:overflow-x-visible focus-ring"
      >
        <table className="w-full min-w-comparison-table border-collapse">
          <thead>
            <tr className="border-b border-ink">
              <th scope="col" className={cx(HEADER_CELL_CLASS, "text-left")}>
                {/*
                  The frame leaves this cell blank. A blank `th` is a column with
                  no accessible name, so the name is present and visually hidden.
                */}
                <span className="sr-only">{featureColumnLabel}</span>
              </th>

              {plans.map((plan) => (
                <th key={plan.name} scope="col" className={HEADER_CELL_CLASS}>
                  <Stack gap="sm" align="center">
                    <Text role="small" as="span">
                      <strong>{plan.name}</strong>
                    </Text>

                    <Button
                      as="link"
                      variant={plan.action.emphasis}
                      tone="light"
                      href={plan.action.href}
                      isExternal={plan.action.isExternal}
                    >
                      {plan.action.label}
                    </Button>
                  </Stack>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.label}
                className={cx(
                  "border-b border-border-hairline",
                  // The frame alternates #FAFAFA against white. The system's
                  // nearest fill is `surface-light`, which every other inset
                  // surface on the site already uses.
                  index % 2 === 0 ? "bg-surface-light" : "bg-surface-page",
                )}
              >
                <th scope="row" className={LABEL_CELL_CLASS}>
                  <Text role="small" as="span">
                    <strong>{row.label}</strong>
                  </Text>
                </th>

                <ValueCell value={row.silver} />
                <ValueCell value={row.gold} />
                <ValueCell value={row.diamond} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*
        The cue, below tablet only — above it the box does not scroll and an
        instruction to scroll would be a lie. `aria-hidden` because the region
        above is already named and announced as scrollable; a screen reader
        reading "Scroll sideways" after that is noise, and the keyboard path is
        the region's own focus, not this line.
      */}
      <div className="tablet:hidden" aria-hidden="true">
        <Text role="small" isSecondary>
          {scrollHint}
        </Text>
      </div>
    </Stack>
  );
}

/**
 * One value cell.
 *
 * Three states, and the distinction between the last two matters: a benefit
 * present on every tier renders as a mark, a benefit with a value renders the
 * value, and a benefit whose value nobody has confirmed renders nothing at all.
 *
 * The mark carries its own accessible name — a bare tick announces as nothing,
 * and "Included" is the cell's actual value, so it comes from the content
 * module rather than being written here.
 */
function ValueCell({ value }: { value?: string }) {
  if (value === undefined) {
    return <td className={VALUE_CELL_CLASS} />;
  }

  if (value === INCLUDED) {
    return (
      <td className={VALUE_CELL_CLASS}>
        <span className="inline-flex">
          <Check size="md" label={value} />
        </span>
      </td>
    );
  }

  return (
    <td className={VALUE_CELL_CLASS}>
      <Text role="small" as="span">
        {value}
      </Text>
    </td>
  );
}
