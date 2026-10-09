"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { homeV2Content } from "@/content/home-v2.content";
import { cx } from "@/lib/cx";

/**
 * The Payments card's widget: the wallet's currency accounts as a list. Picking
 * one moves its balance into the headline figure, the way Wise's calculator
 * answers as you type. A radio group, because exactly one account is
 * "showing" at a time and arrow keys should move between them.
 */
export type HeroWalletProps = {
  content: (typeof homeV2Content)["hero"]["payments"];
};

export function HeroWallet({ content }: HeroWalletProps) {
  const { widgetLabel, accounts, sampleNote, action } = content;
  const [active, setActive] = useState(0);
  const current = accounts[active];

  return (
    <div className="flex flex-col gap-fluid-3 rounded-t-md bg-surface-page p-fluid-4 text-ink shadow-glass-raised">
      <div className="flex items-baseline justify-between gap-fluid-2">
        <span className="font-sans text-small text-secondary">{widgetLabel}</span>
        <span className="font-sans text-small text-secondary">{sampleNote}</span>
      </div>

      <p className="font-sans text-h2 font-semibold tabular-nums" aria-live="polite">
        {current.balance}
      </p>

      <div role="radiogroup" aria-label="Currency account" className="flex flex-col">
        {accounts.map((account, index) => {
          const isActive = index === active;
          return (
            <button
              key={account.code}
              type="button"
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                  event.preventDefault();
                  setActive((active + 1) % accounts.length);
                }
                if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  setActive((active - 1 + accounts.length) % accounts.length);
                }
              }}
              className={cx(
                "flex items-center gap-fluid-2 rounded-sm px-fluid-2 py-fluid-2 text-left transition-standard focus-ring",
                isActive ? "bg-blush" : "hover:bg-surface-light",
              )}
            >
              <Image
                src={account.flag}
                alt=""
                width={28}
                height={28}
                className="size-7 shrink-0 rounded-full object-cover"
              />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-sans text-small font-semibold">{account.code}</span>
                <span className="truncate font-sans text-small text-secondary">{account.name}</span>
              </span>
              <span className="font-sans text-small tabular-nums">{account.balance}</span>
            </button>
          );
        })}
      </div>

      <Link
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-pill bg-brand py-fluid-2 text-center font-sans text-main text-on-dark transition-standard hover:bg-ink focus-ring"
      >
        {action.label}
      </Link>
    </div>
  );
}
