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

/**
 * The plan comparison on phones: one plan at a time.
 *
 * [ADDED, 2026-10-10] Pick P1 from `design-lab/plans-mobile.html` (after
 * GoPay's plan selector on Mobbin, a66d3a8b). Below tablet the 13-row table
 * cannot fit, so a Silver / Gold / Diamond switch pins to the top of the
 * viewport while the section is read, and one card lists everything the chosen
 * plan covers. Same rows, same values as the desktop table, so the two cannot
 * disagree.
 *
 * A real tab pattern for assistive tech: `tablist` / `tab` / `tabpanel`,
 * arrow keys move between plans. Opens on the featured plan (a visual lift only;
 * nothing here says "most popular" — see `InsurancePlan.isFeatured`).
 *
 * The first row is the monthly price; it is shown large above the list rather
 * than as a list item.
 */
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
      {/* Pinned while the card is read; the page fill keeps rows from showing through. */}
      <div className="sticky top-0 z-raised bg-surface-page py-3">
        <div
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
          className="grid grid-cols-3 rounded-pill bg-surface-light p-1 ring-1 ring-border-hairline"
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
                  "hit-area rounded-pill py-2.5 font-sans text-small font-semibold transition-standard focus-ring",
                  selected ? "bg-surface-page text-ink shadow-[0_1px_4px_rgb(0_0_0/0.12)]" : "text-secondary",
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
          <span className="font-heading text-[2.25rem] font-extrabold leading-none tracking-[-0.03em]">
            {priceRow?.[key]}
          </span>
          <span className="text-small text-secondary">a month · {plan.name}</span>
        </p>

        <dl className="mt-4 overflow-hidden rounded-[1rem] border border-border-hairline">
          {benefitRows.map((row, index) => {
            const value = row[key];
            return (
              <div
                key={row.label}
                className={cx(
                  "flex items-start justify-between gap-4 px-4 py-3.5",
                  index > 0 && "border-t border-border-hairline",
                )}
              >
                <dt className="font-sans text-small text-secondary">{row.label}</dt>
                <dd className="text-right font-sans text-small font-semibold">
                  {value === undefined ? (
                    <>
                      {/*
                        A blank cell in the table, shown the same way: the data
                        does not say "not covered", only that nothing is listed.
                      */}
                      <span aria-hidden="true" className="font-normal text-secondary">—</span>
                      <span className="sr-only">Not listed</span>
                    </>
                  ) : value === INCLUDED ? (
                    <span className="inline-flex items-center gap-1.5">
                      {/* Green on the tick only: the token fails contrast as text. */}
                      <span className="inline-flex text-success">
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
