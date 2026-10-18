"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useId, useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  type CurrencyOption,
  CurrencyPicker,
} from "@/components/ui/CurrencyPicker";
import { RATE_PAIRS } from "@/content/rates.content";
import type { FundingCurrency } from "@/lib/rates";
import type { LinkTarget } from "@/types/content.types";

/**
 * Wise-style currency check: a rate chip, "You convert" and "You get" rows
 * with a currency pill and a large figure, then two fact rows.
 *
 * Interactive, so not hidden from assistive tech: the amount is a labelled
 * text field, the currency a labelled native select, and the result is
 * announced politely. Only facts the site already states appear in the rows
 * (mid-market rate seen before confirming; ₦20 per transfer). The rate is the
 * public daily mid-market snapshot, labelled as indicative.
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

const readableDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const format = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export function ConverterWidget({
  rates,
  date,
  action,
  initialCurrency = "USD",
}: {
  rates: Readonly<Record<FundingCurrency, number>>;
  date: string | null;
  action: LinkTarget;
  /** [ADDED, 2026-10-18] The rate pages open on their own currency. */
  initialCurrency?: FundingCurrency;
}) {
  const [amount, setAmount] = useState("1,000");
  const [currency, setCurrency] = useState<FundingCurrency>(initialCurrency);
  const amountId = useId();

  const rate = rates[currency];
  const result = toNumber(amount) * rate;

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-4 rounded-[2rem] bg-surface-page p-5 text-left shadow-[0_-8px_24px_rgb(22_23_23/0.06)] tablet:p-6">
        <div className="flex justify-end">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-surface-light px-3 py-1 font-sans text-small">
            <LockIcon />1 {currency} = {format(rate)} NGN
          </span>
        </div>

        {/* You convert */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={amountId}
            className="font-sans text-small text-secondary"
          >
            You convert
          </label>
          <div className="flex items-center justify-between gap-3">
            {/* [CHANGED, 2026-10-18] Wise-style picker, not the native select. */}
            <CurrencyPicker
              value={currency}
              options={CURRENCY_OPTIONS}
              onChange={(code) => setCurrency(code as FundingCurrency)}
              label="Currency you convert from"
            />
            <input
              id={amountId}
              // [ADDED, 2026-10-18] Audit: an explicit name for agents and
              // assistive tech, alongside the visible label.
              aria-label="Amount to convert"
              inputMode="decimal"
              autoComplete="off"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value.replace(/[^\d.,]/g, ""))
              }
              onBlur={() => setAmount(toNumber(amount).toLocaleString("en-US"))}
              className="w-full min-w-0 bg-transparent text-right font-heading text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] font-semibold tracking-[-0.03em] text-ink outline-none focus-visible:underline"
            />
          </div>
        </div>

        {/* You get */}
        <div className="flex flex-col gap-1.5">
          <span className="font-sans text-small text-secondary">You get</span>
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-pill bg-surface-light py-1.5 pr-3 pl-2">
              <Flag code="NGN" />
              <span className="font-sans text-small font-semibold">NGN</span>
            </span>
            <output
              htmlFor={amountId}
              aria-live="polite"
              className="min-w-0 truncate text-right font-heading text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] font-semibold tracking-[-0.03em] text-ink"
            >
              {Math.round(result).toLocaleString("en-US")}
            </output>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border-hairline pt-4">
          <FactRow
            icon={<RateIcon />}
            label="Exchange rate"
            value="Mid-market, before you confirm"
          />
          {/* Wise's fees row: label, plain-language line, amount as a link. Only
              confirmed facts (payments FAQ): ₦20 per transfer; the link opens
              the fee answer. Conversion fees are unconfirmed, so no "total". */}
          <FactRow
            icon={<ReceiptIcon />}
            label="Transfer fee"
            value="Charged per transfer"
            trailing={{ label: "₦20", href: "/payments#payments-faq-heading" }}
          />
        </div>

        <div className="grid pt-1">
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

        <p className="text-center font-sans text-small text-secondary">
          {/* [CHANGED, 2026-10-18] Copy audit: a readable date, not ISO. */}
          Indicative rate{date ? ` · ${readableDate(date)}` : ""} ·{" "}
          {/* [ADDED, 2026-10-18] Links the converter to the live rate page
              for the selected currency (internal links for the rate pages). */}
          <Link
            href={`/rates/${RATE_PAIRS.find((pair) => pair.code === currency)?.slug ?? "pounds-to-naira"}`}
            className="underline underline-offset-4 hover:text-ink focus-ring"
          >
            {currency} to NGN today
          </Link>
        </p>
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

/* Wise's fact rows: an outlined icon circle, a small label, a bold value. */
function FactRow({
  icon,
  label,
  value,
  trailing,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  trailing?: { label: string; href: string };
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-pill border border-border-hairline text-ink">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="font-sans text-small text-secondary">{label}</span>
        <span className="font-heading text-main font-medium text-ink">
          {value}
        </span>
      </span>
      {trailing !== undefined && (
        <Link
          href={trailing.href}
          className="ml-auto inline-flex shrink-0 items-center gap-1 font-heading text-small font-medium text-ink underline underline-offset-4 transition-opacity duration-300 hover:opacity-70 focus-ring"
        >
          {trailing.label}
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        </Link>
      )}
    </div>
  );
}

function RateIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
