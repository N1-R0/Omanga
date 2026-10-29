"use client";

import { useId, useState } from "react";

import { WALLET_URL } from "@/config/site";
import type { MatrixCurrency } from "@/lib/rates";
import { Button } from "@/new-redesign/components/ui/Button";
import { CurrencyPicker } from "@/new-redesign/components/ui/CurrencyPicker";
import { converter as copy } from "@/new-redesign/content/converter.content";

type Props = {
  matrix: Readonly<Record<MatrixCurrency, Readonly<Record<MatrixCurrency, number>>>>;
  initialFrom?: MatrixCurrency;
  updated: string;
};

const symbolOf = (code: string) => copy.currencies.find((c) => c.code === code)?.symbol ?? "";

const nf = (decimals: number) => new Intl.NumberFormat("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const money = (n: number) => nf(n >= 10_000 ? 0 : 2).format(n);

const rateText = (n: number) => (n >= 1 ? nf(2).format(n) : n.toPrecision(3));

function formatTyped(raw: string) {
  const clean = raw.replace(/[^\d.]/g, "");
  const [whole, ...rest] = clean.split(".");
  const grouped = whole === "" ? "" : Number(whole).toLocaleString("en-GB");
  return rest.length > 0 ? `${grouped || "0"}.${rest.join("").slice(0, 2)}` : grouped;
}

export function Converter({ matrix, initialFrom = "GBP", updated }: Props) {
  const [amount, setAmount] = useState("1,000");
  const [from, setFrom] = useState<MatrixCurrency>(initialFrom);
  const [to, setTo] = useState<MatrixCurrency>(initialFrom === "NGN" ? "GBP" : "NGN");
  const amountId = useId();

  const value = Number(amount.replace(/,/g, ""));
  const valid = amount !== "" && Number.isFinite(value);
  const rate = matrix[from][to];
  const got = valid ? money(value * rate) : "—";

  const choose = (side: "from" | "to", code: MatrixCurrency) => {
    if (code === (side === "from" ? to : from)) swap();
    else if (side === "from") setFrom(code);
    else setTo(code);
  };
  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const picker = (side: "from" | "to") => {
    const code = side === "from" ? from : to;
    return (
      <CurrencyPicker
        value={code}
        options={copy.currencies}
        onChange={(c) => choose(side, c as MatrixCurrency)}
        label={copy.picker.chooseLabel(side === "from" ? copy.youSend : copy.youGet, code)}
        copy={copy.picker}
        searchable={false}
      />
    );
  };

  const panel = "relative flex flex-col gap-2 rounded-sm bg-bg px-4 py-3.5";
  const figure = "min-w-0 flex-1 truncate text-[28px] leading-[34px] font-medium tracking-[-0.03em] tabular-nums";

  return (
    <div className="flex flex-col rounded-xs bg-surface p-3 text-left text-text">
      <div className="relative flex flex-col gap-1.5">
        <div className={panel}>
          <label htmlFor={amountId} className="type-p2 text-text-secondary">
            {copy.youSend}
          </label>
          <div className="flex items-center gap-3">
            <div className={`${figure} flex items-center`}>
              <span aria-hidden>{symbolOf(from)}</span>
              <input
                id={amountId}
                inputMode="decimal"
                autoComplete="off"
                value={amount}
                onChange={(e) => setAmount(formatTyped(e.target.value))}
                aria-describedby={`${amountId}-rate`}
                size={1}
                className="w-full min-w-0 bg-transparent outline-none"
              />
            </div>
            {picker("from")}
          </div>
        </div>

        <button
          type="button"
          onClick={swap}
          aria-label={copy.swapLabel}
          className="absolute top-1/2 left-1/2 z-10 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-surface bg-bg text-text transition-colors duration-[var(--duration-fast)] hover:bg-surface-muted"
        >
          <svg aria-hidden viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4" />
          </svg>
        </button>

        <div className={panel}>
          <span className="type-p2 text-text-secondary">{copy.youGet}</span>
          <div className="flex items-center gap-3">
            <output aria-live="polite" className={figure}>
              {symbolOf(to)}
              {got}
            </output>
            {picker("to")}
          </div>
        </div>
      </div>

      <p id={`${amountId}-rate`} className="mt-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-1">
        <span className="type-p3 tabular-nums">
          {symbolOf(from)}1 = {symbolOf(to)}
          {rateText(rate)}
        </span>
        <span className="type-p2 text-text-secondary">{copy.rateNote(updated)}</span>
      </p>

      <div className="mt-4 flex flex-col [&>a]:w-full">
        <Button href={WALLET_URL} external>
          {copy.cta}
        </Button>
      </div>
    </div>
  );
}
