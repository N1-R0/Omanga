"use client";

import Link from "next/link";
import { useState } from "react";

import type { homeV2Content } from "@/content/home-v2.content";
import { cx } from "@/lib/cx";

/**
 * The Insurance card's widget: Silver / Gold / Diamond as a segmented control,
 * with the chosen plan's real price, hospital access and first inclusions.
 * Opens on Gold, the middle plan, so the first thing a visitor sees is a
 * typical price rather than the cheapest or the most expensive.
 */
export type HeroPlanPickerProps = {
  content: (typeof homeV2Content)["hero"]["insurance"];
};

export function HeroPlanPicker({ content }: HeroPlanPickerProps) {
  const { widgetLabel, plans, billingPeriod, accessLabel, defaultPlan } = content;
  const [active, setActive] = useState(
    Math.max(0, plans.findIndex((plan) => plan.name === defaultPlan)),
  );
  const plan = plans[active];

  return (
    <div className="flex flex-col gap-fluid-3 rounded-t-md bg-surface-page p-fluid-4 text-ink shadow-glass-raised">
      <span className="font-sans text-small text-secondary">{widgetLabel}</span>

      <div
        role="radiogroup"
        aria-label="Insurance plan"
        className="grid grid-cols-3 gap-1 rounded-pill bg-surface-light p-1"
      >
        {plans.map((option, index) => {
          const isActive = index === active;
          return (
            <button
              key={option.name}
              type="button"
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  setActive((active + 1) % plans.length);
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  setActive((active - 1 + plans.length) % plans.length);
                }
              }}
              className={cx(
                "rounded-pill py-fluid-1 font-sans text-small transition-standard focus-ring",
                isActive ? "bg-ink text-on-dark" : "text-secondary hover:text-ink",
              )}
            >
              {option.name}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="flex flex-col gap-fluid-3">
        <p className="flex items-baseline gap-fluid-1">
          <span className="font-sans text-h2 font-semibold tabular-nums">${plan.price}</span>
          <span className="font-sans text-small text-secondary">/ {billingPeriod}</span>
        </p>

        <p className="flex items-center justify-between gap-fluid-2 border-y border-border-hairline py-fluid-2 font-sans text-small">
          <span className="text-secondary">{accessLabel}</span>
          <span className="font-semibold">{plan.hospitalAccess}</span>
        </p>

        <ul className="flex flex-col gap-fluid-1">
          {plan.included.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-fluid-2 font-sans text-small">
              <span aria-hidden="true" className="text-brand">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={plan.action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-pill bg-ink py-fluid-2 text-center font-sans text-main text-on-dark transition-standard hover:bg-brand focus-ring"
      >
        {plan.action.label}
      </Link>
    </div>
  );
}
