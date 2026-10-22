"use client";

import Link from "next/link";
import { useId, useState } from "react";

import type { MatrixCurrency } from "@/lib/rates";
import { CurrencyPicker } from "@/new-redesign/components/ui/CurrencyPicker";
import { href } from "@/new-redesign/config/routes";
import { heroConverter as copy } from "@/new-redesign/content/home.content";

/**
 * Hero converter: a white card in the glass frame (design system § glass),
 * sitting on the crimson hero under the CTAs.
 *
 * Both sides are switchable with the Wise-style picker, and the round button
 * between them swaps the two (owner, 2026-10-21). Picking the currency
 * already on the other side swaps rather than showing X → X.
 *
 * Rates are the GBP/USD/CAD/NGN cross matrix at the mid-market rate. The
 * converter has no button of its own: the hero already has the page's one
 * filled action.
 *
 * The "You get" figure is read-only output, announced politely as it changes.
 */
type Props = {
  matrix: Readonly<Record<MatrixCurrency, Readonly<Record<MatrixCurrency, number>>>>;
};

const nf = (decimals: number) => new Intl.NumberFormat("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const symbolOf = (code: string) => copy.currencies.find((c) => c.code === code)?.symbol ?? "";

/** Drop the minor unit from 10,000 up so a seven-figure naira sum fits at 375px. */
const money = (code: string, n: number) => `${symbolOf(code)}${nf(n >= 10_000 ? 0 : 2).format(n)}`;

/** Show small rates (NGN → GBP is 0.00056) with enough digits to mean something. */
const rateText = (n: number) => (n >= 1 ? nf(2).format(n) : n.toPrecision(3));

export function HeroConverter({ matrix }: Props) {
  const [amount, setAmount] = useState(String(copy.defaultAmount));
  const [from, setFrom] = useState<MatrixCurrency>("GBP");
  const [to, setTo] = useState<MatrixCurrency>("NGN");
  const amountId = useId();

  const value = Number(amount.replace(/,/g, ""));
  const valid = Number.isFinite(value) && value >= 0;
  const rate = matrix[from][to];

  const choose = (side: "from" | "to", code: MatrixCurrency) => {
    const other = side === "from" ? to : from;
    if (code === other) return swap();
    if (side === "from") setFrom(code);
    else setTo(code);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const pickerCopy = copy.picker;

  return (
    <div className="glass w-full max-w-[520px] text-left">
      <div className="rounded-md bg-surface p-4 text-text md:p-6">
        <p className="type-h3">{copy.title}</p>
        <p className="type-p2 mt-1 text-text-secondary">{copy.sub}</p>

        <div className="relative mt-5 grid gap-2">
          {/* You add */}
          <div className="relative flex items-center gap-3 rounded-md border border-border-strong px-4 py-3 focus-within:border-accent">
            <div className="flex min-w-0 flex-1 flex-col">
              <label htmlFor={amountId} className="type-p2 text-text-secondary">
                {copy.youAdd}
              </label>
              <input
                id={amountId}
                inputMode="decimal"
                autoComplete="off"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))}
                className="type-h2 w-full min-w-0 bg-transparent outline-none"
                aria-describedby={`${amountId}-rate`}
              />
            </div>
            <CurrencyPicker
              value={from}
              options={copy.currencies}
              onChange={(c) => choose("from", c as MatrixCurrency)}
              label={pickerCopy.chooseLabel(copy.youAdd, from)}
              copy={pickerCopy}
            />
          </div>

          {/* Swap, centred on the seam between the two fields. */}
          <button
            type="button"
            onClick={swap}
            aria-label={copy.swapLabel}
            className="group absolute top-1/2 left-1/2 z-10 inline-flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-surface text-text shadow-[0_2px_8px_rgb(20_4_9/0.08)] transition-colors duration-[var(--duration-fast)] hover:border-accent hover:text-accent-text"
          >
            <svg aria-hidden width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-[var(--duration-base)] group-active:rotate-180">
              <path d="M7 3v13m0 0-3-3m3 3 3-3M13 17V4m0 0-3 3m3-3 3 3" />
            </svg>
          </button>

          {/* You get */}
          <div className="relative flex items-center gap-3 rounded-md bg-surface-muted px-4 py-3">
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="type-p2 text-text-secondary">{copy.youGet}</span>
              <output aria-live="polite" className="type-h2 truncate">
                {valid ? money(to, value * rate) : "—"}
              </output>
            </div>
            <CurrencyPicker
              value={to}
              options={copy.currencies}
              onChange={(c) => choose("to", c as MatrixCurrency)}
              label={pickerCopy.chooseLabel(copy.youGet, to)}
              copy={pickerCopy}
            />
          </div>
        </div>

        {/* Detail rows, after Wise's "Arrives" / "Total fees": label and
            note on the left, value on the right. */}
        <dl className="mt-4 divide-y divide-border">
          <div id={`${amountId}-rate`} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="flex flex-col">
              <span className="type-p2 text-text-secondary">{copy.rateLabel}</span>
              <span className="type-p3">{copy.rateNote}</span>
            </dt>
            <dd className="type-p3 whitespace-nowrap">
              1 {from} = {symbolOf(to)}
              {rateText(rate)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="flex flex-col">
              <span className="type-p2 text-text-secondary">{copy.feeLabel}</span>
              <span className="type-p3">{copy.feeNote}</span>
            </dt>
            <dd className="type-p3 whitespace-nowrap">{copy.fee}</dd>
          </div>
        </dl>

        <Link href={href(copy.link.path)} className="type-p3 mt-2 inline-block text-accent-text hover:underline">
          {copy.link.label} →
        </Link>
      </div>
    </div>
  );
}
