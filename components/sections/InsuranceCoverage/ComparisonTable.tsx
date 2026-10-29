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

const HEADER_CELL_CLASS =
  "md:sticky top-0 z-10 bg-bg px-4 py-6 align-bottom";
const LABEL_CELL_CLASS = "px-4 py-6 text-left align-middle";
const VALUE_CELL_CLASS = "px-4 py-6 text-center align-middle";

export type ComparisonTableProps = {
  rows: readonly CoverageRow[];
  plans: readonly InsurancePlan[];
  featureColumnLabel: string;
  tableLabel: string;
  scrollHint: string;
};

export function ComparisonTable({
  rows,
  plans,
  featureColumnLabel,
  tableLabel,
  scrollHint,
}: ComparisonTableProps) {
  return (
    <Stack gap="md">
      <div
        role="region"
        aria-label={tableLabel}
        tabIndex={0}
        className="overflow-x-auto md:overflow-x-visible "
      >
        <table className="w-full min-w-[37.5rem] border-collapse">
          <thead>
            <tr className="border-b border-text">
              <th scope="col" className={cx(HEADER_CELL_CLASS, "text-left")}>
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
                  "border-b border-border",
                  index % 2 === 0 ? "bg-surface" : "bg-bg",
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

      <div className="md:hidden" aria-hidden="true">
        <Text role="small" isSecondary>
          {scrollHint}
        </Text>
      </div>
    </Stack>
  );
}

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
