"use client";

import { useState } from "react";

import type { RatePoint } from "@/lib/rates";
import { cx } from "@/lib/cx";

/**
 * [ADDED, 2026-10-18] R2: 30-day naira chart for the rate pages (Wise rate
 * tracker, mobbin sections 76aac368 / f63973e4). The current rate, range
 * chips, a line over a soft fill, and the high, low and change as text.
 *
 * A plain SVG, no chart library and no animation (site rule). It renders on
 * the server with the 1-month range, so the figures and the line are in the
 * HTML; the chips only redraw it. The stats double as the chart's text
 * alternative.
 */
const RANGES = [
  { label: "1 week", days: 7 },
  { label: "1 month", days: 30 },
] as const;

const W = 640;
const H = 220;
const PAD_Y = 12;

const naira = (n: number) =>
  `₦${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

export function RateChart({
  code,
  points,
}: {
  code: string;
  points: readonly RatePoint[];
}) {
  const [days, setDays] = useState<number>(30);

  if (points.length < 2) {
    return (
      <p className="font-sans text-main text-secondary">
        The rate history isn&apos;t available right now. Try again later.
      </p>
    );
  }

  const shown = points.slice(-days);
  const rates = shown.map((p) => p.rate);
  const min = Math.min(...rates);
  const max = Math.max(...rates);
  const span = max - min || 1;
  const first = shown[0];
  const last = shown[shown.length - 1];
  const change = ((last.rate - first.rate) / first.rate) * 100;

  const x = (i: number) => (i / (shown.length - 1)) * W;
  const y = (r: number) => PAD_Y + (1 - (r - min) / span) * (H - PAD_Y * 2);
  const line = shown
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.rate).toFixed(1)}`,
    )
    .join(" ");
  const area = `${line} L${W},${H} L0,${H} Z`;

  const summary = `${code} to NGN over ${days === 7 ? "the last week" : "the last month"}: from ${naira(first.rate)} on ${shortDate(first.date)} to ${naira(last.rate)} on ${shortDate(last.date)}, ${change >= 0 ? "up" : "down"} ${Math.abs(change).toFixed(1)}%. High ${naira(max)}, low ${naira(min)}.`;

  return (
    <div className="flex flex-col gap-fluid-4">
      <div className="flex flex-wrap items-end justify-between gap-fluid-3">
        <div className="flex flex-col gap-1">
          <p className="font-sans text-small text-secondary">
            As of {shortDate(last.date)}
          </p>
          <p className="font-heading text-h3 font-semibold">
            1 {code} →{" "}
            <span className="text-support-strong">{naira(last.rate)}</span>
          </p>
        </div>
        <div role="group" aria-label="Chart range" className="flex gap-2">
          {RANGES.map((range) => (
            <button
              key={range.days}
              type="button"
              aria-pressed={days === range.days}
              onClick={() => setDays(range.days)}
              className={cx(
                "rounded-pill border px-4 py-1.5 font-sans text-small focus-ring",
                days === range.days
                  ? "border-ink bg-ink text-on-dark"
                  : "border-border-hairline bg-surface-page text-ink hover:border-ink",
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <figure className="flex flex-col gap-2">
        <div className="relative pr-16 tablet:pr-24">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            role="img"
            aria-label={summary}
            className="h-56 w-full desktop:h-64"
          >
            <line
              x1="0"
              x2={W}
              y1={y(max)}
              y2={y(max)}
              stroke="currentColor"
              strokeOpacity="0.08"
            />
            <line
              x1="0"
              x2={W}
              y1={y(min)}
              y2={y(min)}
              stroke="currentColor"
              strokeOpacity="0.08"
            />
            <path d={area} fill="var(--color-support)" fillOpacity="0.1" />
            <path
              d={line}
              fill="none"
              stroke="var(--color-support-strong)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute top-0 right-0 font-sans text-small text-secondary tabular-nums">
            {naira(max)}
          </span>
          <span className="absolute right-0 bottom-0 font-sans text-small text-secondary tabular-nums">
            {naira(min)}
          </span>
        </div>
        <div className="flex justify-between pr-16 tablet:pr-24 font-sans text-small text-secondary">
          <span>{shortDate(first.date)}</span>
          <span>{shortDate(last.date)}</span>
        </div>
        <figcaption className="sr-only">{summary}</figcaption>
      </figure>

      <dl className="grid grid-cols-3 gap-fluid-3 border-t border-border-hairline pt-fluid-4">
        <Stat label="High" value={naira(max)} />
        <Stat label="Low" value={naira(min)} />
        <Stat
          label="Change"
          value={`${change >= 0 ? "+" : "−"}${Math.abs(change).toFixed(1)}%`}
        />
      </dl>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="font-sans text-small text-secondary">{label}</dt>
      <dd className="font-heading text-main font-semibold whitespace-nowrap tabular-nums tablet:text-h5">
        {value}
      </dd>
    </div>
  );
}
