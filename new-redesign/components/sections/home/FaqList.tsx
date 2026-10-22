"use client";

import { useId, useState } from "react";

import { cx } from "@/lib/cx";

/**
 * FAQ rows in two independent columns (design system § FAQ; Asset's FAQ).
 * Splitting the list into two flex columns, not a grid, means opening a row
 * only pushes down its own column. Any number of rows can be open. Home and
 * the wallet page each pass their own questions.
 */
export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <div className="grid gap-[10px] lg:grid-cols-2 lg:gap-4">
      {columns.map((col, c) => (
        <ul key={c} className="flex flex-col gap-[10px]">
          {col.map((item) => (
            <FaqRow key={item.q} q={item.q} a={item.a} />
          ))}
        </ul>
      ))}
    </div>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <li className="rounded-md bg-surface-muted">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className="type-p3 flex w-full items-center justify-between gap-4 rounded-md px-4 py-[18px] text-left"
        >
          {q}
          {/* Plus turns into a cross. */}
          <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" className={cx("shrink-0 transition-transform duration-[var(--duration-base)] ease-standard", open && "rotate-45")}>
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </h3>
      <div id={id} className={cx("grid transition-[grid-template-rows] duration-[var(--duration-base)] ease-standard", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden" inert={!open}>
          {/* 18px row padding minus the button's, so the answer sits 16px under the question. */}
          <p className="type-p2 -mt-0.5 px-4 pb-[18px] text-text-secondary">{a}</p>
        </div>
      </div>
    </li>
  );
}
