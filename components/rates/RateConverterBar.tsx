"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  type CurrencyOption,
  CurrencyPicker,
} from "@/components/ui/CurrencyPicker";
import { RATE_PAIRS } from "@/content/rates.content";
import type { FundingCurrency } from "@/lib/rates";
import type { LinkTarget } from "@/types/content.types";

/**
 * [ADDED, 2026-10-18] R1 converter for the rate pages (Wise currency
 * converter, mobbin section 669f7e5e): one wide card, amount and currency on
 * the left, naira on the right, the rate and actions underneath.
 *
 * Choosing another currency opens that currency's rate page rather than
 * changing the figure in place, so every rate on a page matches its URL,
 * title and FAQ. Server HTML already holds the default amount and result.
 */
const FLAGS: Readonly<Record<FundingCurrency | "NGN", string>> = {
  USD: "/flags/united-states.svg",
  GBP: "/flags/united-kingdom.svg",
  CAD: "/flags/canada.svg",
  NGN: "/flags/nigeria.svg",
};

const CURRENCY_OPTIONS: readonly CurrencyOption[] = [
  { code: "USD", name: "US dollar", flag: "/flags/united-states.svg" },
  { code: "GBP", name: "British pound", flag: "/flags/united-kingdom.svg" },
  { code: "CAD", name: "Canadian dollar", flag: "/flags/canada.svg" },
];

const toNumber = (value: string) => {
  const n = Number(value.replace(/,/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

const AMOUNT_CLASS =
  "w-full min-w-0 bg-transparent font-heading text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-semibold tracking-[-0.03em] text-ink outline-none";

export function RateConverterBar({
  code,
  rate,
  updated,
  action,
}: {
  code: FundingCurrency;
  rate: number;
  updated: string;
  action: LinkTarget;
}) {
  const router = useRouter();
  const [amount, setAmount] = useState("1,000");
  const amountId = useId();
  const resultId = useId();

  const result = toNumber(amount) * rate;

  return (
    <div className="flex flex-col gap-fluid-5 rounded-[2rem] bg-surface-page p-fluid-5 text-ink shadow-[0_12px_40px_rgb(22_23_23/0.12)] desktop:p-fluid-6">
      <div className="grid items-end gap-fluid-3 desktop:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        {/* Amount */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={amountId}
            className="font-sans text-small text-secondary"
          >
            Amount
          </label>
          <div className="flex items-center gap-3 rounded-[1rem] border border-border-hairline px-4 py-3 focus-within:border-ink">
            <input
              id={amountId}
              inputMode="decimal"
              autoComplete="off"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value.replace(/[^\d.,]/g, ""))
              }
              onBlur={() => setAmount(toNumber(amount).toLocaleString("en-GB"))}
              className={AMOUNT_CLASS}
            />
            {/* [CHANGED, 2026-10-18] Wise-style picker, not the native select. */}
            <CurrencyPicker
              value={code}
              options={CURRENCY_OPTIONS}
              onChange={(next) => {
                const pair = RATE_PAIRS.find((p) => p.code === next);
                if (pair && next !== code) router.push(`/rates/${pair.slug}`);
              }}
              label="Currency you convert from"
            />
          </div>
        </div>

        {/* Direction mark (decorative: the pair is always to naira here). */}
        <span
          aria-hidden
          className="mx-auto mb-3 grid size-10 place-items-center rounded-pill border border-border-hairline"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5 rotate-90 desktop:rotate-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M5 12h14m-5-5 5 5-5 5" />
          </svg>
        </span>

        {/* Converted */}
        <div className="flex flex-col gap-1.5">
          <span id={resultId} className="font-sans text-small text-secondary">
            Converted to
          </span>
          <div className="flex items-center gap-3 rounded-[1rem] bg-surface-light px-4 py-3">
            <output
              aria-labelledby={resultId}
              aria-live="polite"
              className={`${AMOUNT_CLASS} truncate`}
            >
              {result.toLocaleString("en-GB", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </output>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-pill bg-surface-page py-1.5 pr-3 pl-2">
              <Flag code="NGN" />
              <span className="font-sans text-small font-semibold">NGN</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-fluid-3 border-t border-border-hairline pt-fluid-4 desktop:flex-row desktop:items-center desktop:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-heading text-h5 font-semibold">
            1 {code} = ₦
            {rate.toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="font-sans text-small text-secondary">
            Mid-market rate, {updated}. Transfers cost ₦20.
          </p>
        </div>
        <div className="flex flex-wrap gap-fluid-2">
          <Button
            as="link"
            href={action.href}
            isExternal={action.isExternal}
            variant="primary"
            tone="light"
          >
            {action.label}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Flag({ code }: { code: FundingCurrency | "NGN" }) {
  return (
    <Image
      src={FLAGS[code]}
      alt=""
      width={20}
      height={20}
      className="size-5 rounded-pill object-cover"
    />
  );
}
