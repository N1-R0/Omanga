"use client";

import { useId, useState } from "react";

import { Check } from "@/components/icons/Check";
import { Button } from "@/components/ui/Button";
import {
  INCLUDED,
  type CoverageRow,
} from "@/content/insurance-coverage.content";
import type { InsurancePlan } from "@/content/insurance-plans.content";
import { cx } from "@/lib/cx";

type PlanKey = "silver" | "gold" | "diamond";

export type PlanSwitcherProps = {
  rows: readonly CoverageRow[];
  plans: readonly InsurancePlan[];
  label: string;
};

export function PlanSwitcher({ rows, plans, label }: PlanSwitcherProps) {
  const featured = Math.max(0, plans.findIndex((plan) => plan.isFeatured));
  const [active, setActive] = useState(featured);
  const baseId = useId();

  const plan = plans[active];
  const key = plan.name.toLowerCase() as PlanKey;
  const [priceRow, ...benefitRows] = rows;

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = (active + step + plans.length) % plans.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div>
      <div className="sticky top-0 z-10 bg-bg py-3">
        <div
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
          className="grid grid-cols-3 rounded-full bg-surface p-1 ring-1 ring-border"
        >
          {plans.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.name}
                id={`${baseId}-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={cx(
                  "min-h-11 min-w-11 rounded-full py-2.5 font-sans type-p2 font-semibold transition duration-[var(--duration-fast)] ease-standard ",
                  selected ? "bg-bg text-text shadow-[0_1px_4px_rgb(0_0_0/0.12)]" : "opacity-80",
                )}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-2"
      >
        <p className="flex items-baseline gap-2 font-sans">
          <span className=" text-[2.25rem] font-extrabold leading-none tracking-[-0.03em]">
            {priceRow?.[key]}
          </span>
          <span className="type-p2 opacity-80">a month · {plan.name}</span>
        </p>

        <dl className="mt-4 overflow-hidden rounded-[1rem] border border-border">
          {benefitRows.map((row, index) => {
            const value = row[key];
            return (
              <div
                key={row.label}
                className={cx(
                  "flex items-start justify-between gap-4 px-4 py-3.5",
                  index > 0 && "border-t border-border",
                )}
              >
                <dt className="font-sans type-p2 opacity-80">{row.label}</dt>
                <dd className="text-right font-sans type-p2 font-semibold">
                  {value === undefined ? (
                    <>
                      <span aria-hidden="true" className="font-normal opacity-80">—</span>
                      <span className="sr-only">Not listed</span>
                    </>
                  ) : value === INCLUDED ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="inline-flex text-success-text">
                        <Check size="sm" />
                      </span>
                      {INCLUDED}
                    </span>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-5 [&>*]:w-full">
          <Button
            as="link"
            variant="primary"
            tone="light"
            href={plan.action.href}
            isExternal={plan.action.isExternal}
          >
            {plan.action.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
