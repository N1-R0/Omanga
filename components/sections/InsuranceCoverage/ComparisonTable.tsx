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
 *   - **Sticky header row.** Implemented — see the cell class below, which also
 *     covers why it releases at the foot of the table.
 *   - **[OUTSTANDING] An accordion per plan below tablet**, explicitly *instead
 *     of* horizontal scroll: "a 4-column table is unusable at 375px". Not built.
 *     Four columns currently squeeze rather than overflow at that width. It
 *     needs a second rendering of the same data, which is a component of its
 *     own.
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

  The fill is explicit — a transparent sticky cell lets rows scroll visibly
  behind it — and `z-raised` keeps it above them.
*/
const HEADER_CELL_CLASS =
  "sticky top-0 z-raised bg-surface-page px-fluid-3 py-fluid-4 align-bottom";
const LABEL_CELL_CLASS = "px-fluid-3 py-fluid-4 text-left align-middle";
const VALUE_CELL_CLASS = "px-fluid-3 py-fluid-4 text-center align-middle";

export type ComparisonTableProps = {
  rows: readonly CoverageRow[];
  plans: readonly InsurancePlan[];
  /** Names the visually empty first column. */
  featureColumnLabel: string;
};

export function ComparisonTable({
  rows,
  plans,
  featureColumnLabel,
}: ComparisonTableProps) {
  /*
    [REMOVED] The `overflow-x-auto` wrapper this table used to sit in.

    It broke the sticky header outright. `overflow-x: auto` against a visible
    `overflow-y` computes the vertical axis to `auto` too, which makes the
    wrapper the sticky element's scrollport — and a wrapper sized to its own
    content never scrolls vertically, so the row pinned to nothing.

    Nothing is lost: the table sets no minimum width, so it fits every viewport
    without scrolling sideways. What it does at 375 is squeeze four columns
    rather than overflow them, which is the outstanding accordion above and not
    a scrolling problem.
  */
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-ink">
          <th scope="col" className={cx(HEADER_CELL_CLASS, "text-left")}>
            {/*
              The frame leaves this cell blank. A blank `th` is a column with no
              accessible name, so the name is present and visually hidden.
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
