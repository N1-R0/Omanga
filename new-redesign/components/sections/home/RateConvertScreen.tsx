"use client";

import { useId, useState } from "react";

import { WALLET_URL } from "@/config/site";
import type { MatrixCurrency } from "@/lib/rates";
import { APP } from "@/new-redesign/components/sections/wallet/AppUi";
import { CurrencyPicker } from "@/new-redesign/components/ui/CurrencyPicker";
import { homeRates as copy } from "@/new-redesign/content/home.content";

/**
 * The working converter, drawn as an Omanga app "Convert" screen for the
 * PhoneFrame in real iPhone points (390 wide), after the owner's card
 * reference (2026-10-25):
 *   - one card split in two, "You convert" over "You get": a small grey
 *     label, then the plain currency picker on the left and the amount, large,
 *     on the right;
 *   - a dark rate pill sitting on the seam between the halves;
 *   - a second card of icon rows (three plain facts, no speed or fee claims);
 *   - one full-width dark button.
 * Colours are the app's (AppUi APP), as on the other drawn screens.
 *
 * Picking the currency already on the other side swaps the two rather than
 * showing X → X. Rates are the GBP/USD/CAD/NGN cross matrix. The pickers
 * open left-aligned so their 340px popover stays inside the screen.
 *
 * The button goes to the web wallet: converting happens there, not here.
 *
 * `variant="card"` (owner, 2026-10-25, Payments hero) drops the phone screen
 * and its "Convert" title: the same parts sit in a frosted box (translucent
 * white, blurred, 32px radius) on the photo, after the owner's converter
 * reference, with the inner cards a little whiter than the box.
 */
type Props = {
  matrix: Readonly<Record<MatrixCurrency, Readonly<Record<MatrixCurrency, number>>>>;
  variant?: "screen" | "card";
};

const nf = (decimals: number) => new Intl.NumberFormat("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const symbolOf = (code: string) => copy.currencies.find((c) => c.code === code)?.symbol ?? "";

/** Drop the minor unit from 10,000 up so a seven-figure naira sum fits. */
const money = (n: number) => nf(n >= 10_000 ? 0 : 2).format(n);

/** Show small rates (NGN → GBP is 0.00056) with enough digits to mean something. */
const rateText = (n: number) => (n >= 1 ? nf(2).format(n) : n.toPrecision(3));

/** Material Icons (Apache-2.0): account-balance, visibility, account-balance-wallet. */
const FACT_ICONS = {
  bank: "M4 10h3v7H4zm6.5 0h3v7h-3zM2 19h20v3H2zm15-9h3v7h-3zm-5-9L2 6v2h20V6z",
  eye: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
  wallet:
    "M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
} as const;

export function RateConvertScreen({ matrix, variant = "screen" }: Props) {
  const card = variant === "card";
  const inner = card ? { background: "rgb(255 255 255 / 0.82)", boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.6)" } : { background: APP.card, boxShadow: `inset 0 0 0 1px ${APP.hairline}` };
  const [amount, setAmount] = useState("1,000");
  const [from, setFrom] = useState<MatrixCurrency>("GBP");
  const [to, setTo] = useState<MatrixCurrency>("NGN");
  const amountId = useId();
  const s = copy.screen;

  const value = Number(amount.replace(/,/g, ""));
  const valid = amount !== "" && Number.isFinite(value) && value >= 0;
  const rate = matrix[from][to];

  const choose = (side: "from" | "to", code: MatrixCurrency) => {
    if (code === (side === "from" ? to : from)) {
      setFrom(to);
      setTo(from);
    } else if (side === "from") setFrom(code);
    else setTo(code);
  };

  const picker = (side: "from" | "to") => (
    <CurrencyPicker
      value={side === "from" ? from : to}
      options={copy.currencies}
      onChange={(c) => choose(side, c as MatrixCurrency)}
      label={copy.picker.chooseLabel(side === "from" ? s.youConvert : s.youGet, side === "from" ? from : to)}
      copy={copy.picker}
      align="left"
      trigger="plain"
      searchable={false}
    />
  );

  // Compact enough that the button sits in the visible top of the phone.
  const half = "relative flex flex-col gap-3 px-5 py-5";
  const label = "text-[18px]";
  const figure = "min-w-0 flex-1 truncate text-right font-semibold tracking-[-0.03em] tabular-nums";
  const got = valid ? `${symbolOf(to)}${money(value * rate)}` : "—";
  /** Step the size down for long figures (seven-figure naira) so they fit beside the picker. */
  const sizeFor = (text: string) => {
    const px = text.length <= 7 ? 38 : text.length <= 9 ? 32 : 28;
    // The box isn't scaled like the phone screen, so on narrow screens its
    // figures shrink with the viewport to stay whole.
    return card ? `min(${px}px, ${text.length <= 7 ? 8 : text.length <= 9 ? 7 : 6.4}vw)` : px;
  };

  return (
    <div
      className={card ? "flex w-full flex-col rounded-[32px] border border-[#fff]/70 bg-[#fff]/55 p-3 text-left shadow-float backdrop-blur-xl md:p-4" : "flex h-full flex-col bg-[#fff] px-4 pt-2 text-left"}
      style={{ color: APP.text }}
    >
      {card ? null : <p className="text-center text-[17px] font-semibold">{s.title}</p>}

      <div className={card ? "relative rounded-[24px]" : "relative mt-6 rounded-[24px]"} style={inner}>
        <div className={half}>
          <label htmlFor={amountId} className={label} style={{ color: APP.tertiary }}>
            {s.youConvert}
          </label>
          <div className="flex items-center justify-between gap-3">
            {picker("from")}
            <div className={`${figure} flex items-center justify-end`} style={{ fontSize: sizeFor(symbolOf(from) + amount) }}>
              <span aria-hidden>{symbolOf(from)}</span>
              {/* The input sizes to its text (a hidden copy sets the width), so
                  the symbol sits right against the figure. */}
              <span className="inline-grid min-w-0">
                <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-pre">
                  {amount || " "}
                </span>
                <input
                  id={amountId}
                  inputMode="decimal"
                  autoComplete="off"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))}
                  aria-describedby={`${amountId}-rate`}
                  // size 1 keeps the input's own width out of the column's sizing.
                  size={1}
                  className="col-start-1 row-start-1 w-full min-w-0 bg-transparent text-right outline-none"
                />
              </span>
            </div>
          </div>
        </div>

        {/* The seam, with the rate pill on it. */}
        <div className="relative h-[3px]" style={{ background: APP.hairline }}>
          <span
            id={`${amountId}-rate`}
            className="absolute top-1/2 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full px-3 py-1 text-[14px] font-medium whitespace-nowrap tabular-nums text-[#fff]"
            style={{ background: APP.text }}
          >
            <svg aria-hidden viewBox="0 0 24 24" width="14" height="14" className="fill-current">
              <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
            </svg>
            {symbolOf(from)}1 = {symbolOf(to)}
            {rateText(rate)}
          </span>
        </div>

        <div className={half}>
          <span className={label} style={{ color: APP.tertiary }}>
            {s.youGet}
          </span>
          <div className="flex items-center justify-between gap-3">
            {picker("to")}
            <output aria-live="polite" className={figure} style={{ fontSize: sizeFor(got) }}>
              {got}
            </output>
          </div>
        </div>
      </div>

      <ul className={card ? "mt-3 flex flex-col gap-5 rounded-[24px] px-5 py-5" : "mt-4 flex flex-col gap-5 rounded-[24px] px-5 py-5"} style={inner}>
        {s.facts.map((f) => (
          <li key={f.text} className="flex items-center gap-3.5 text-[18px] font-medium">
            <svg aria-hidden viewBox="0 0 24 24" width="22" height="22" className="shrink-0 fill-current">
              <path d={FACT_ICONS[f.icon]} />
            </svg>
            {f.text}
          </li>
        ))}
      </ul>

      <a
        href={WALLET_URL}
        target="_blank"
        rel="noopener noreferrer"
        // Right under the facts: the photo box crops the phone below it.
        className="mt-5 flex h-14 items-center justify-center rounded-full text-[18px] font-medium text-[#fff] transition-opacity hover:opacity-90"
        style={{ background: APP.text }}
      >
        {s.cta}
      </a>
    </div>
  );
}
