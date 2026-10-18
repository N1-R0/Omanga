"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { cx } from "@/lib/cx";

/**
 * [ADDED, 2026-10-18] Wise-style currency picker (owner: "use what Wise
 * uses" instead of the browser's native select). A pill trigger with flag,
 * code and chevron; a white panel with a search field, a "Popular
 * currencies" label and one row per currency: round flag, bold code, the
 * full name in grey, and a tick on the selected one.
 *
 * Accessibility: the trigger is a button with `aria-haspopup="listbox"`; the
 * panel is a listbox of options. Arrow keys move, Enter or Space picks,
 * Escape and outside clicks close and return focus to the trigger. No
 * animation (site rule).
 */
export type CurrencyOption = {
  readonly code: string;
  readonly name: string;
  readonly flag: string;
};

export function CurrencyPicker({
  value,
  options,
  onChange,
  label,
}: {
  value: string;
  options: readonly CurrencyOption[];
  onChange: (code: string) => void;
  /** Accessible name, e.g. "Currency you convert from". */
  label: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.code === value) ?? options[0];
  const q = query.trim().toLowerCase();
  const shown = options.filter(
    (o) =>
      q === "" ||
      o.code.toLowerCase().includes(q) ||
      o.name.toLowerCase().includes(q),
  );

  const close = (refocus = true) => {
    setIsOpen(false);
    setQuery("");
    if (refocus) triggerRef.current?.focus();
  };

  const pick = (code: string) => {
    onChange(code);
    close();
  };

  useEffect(() => {
    if (!isOpen) return;
    searchRef.current?.focus();
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [isOpen]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, shown.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" && shown[active]) {
      event.preventDefault();
      pick(shown[active].code);
    }
  };

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        aria-label={`${label}: ${selected.code}, ${selected.name}`}
        onClick={() => {
          setActive(
            Math.max(
              0,
              options.findIndex((o) => o.code === value),
            ),
          );
          setIsOpen((open) => !open);
        }}
        className="inline-flex items-center gap-1.5 rounded-pill bg-surface-light py-1.5 pr-2.5 pl-2 font-sans text-small font-semibold text-ink hover:bg-border-hairline focus-ring"
      >
        <Flag src={selected.flag} />
        {selected.code}
        <svg
          viewBox="0 0 24 24"
          className={cx("size-4", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen ? (
        <div
          onKeyDown={onKeyDown}
          className="absolute top-[calc(100%+0.5rem)] left-0 z-30 flex w-[18rem] flex-col gap-2 rounded-[1.25rem] border border-border-hairline bg-surface-page p-3 text-ink shadow-[0_16px_40px_rgb(22_23_23/0.16)]"
        >
          <label className="flex items-center gap-2 rounded-[0.75rem] border border-border-hairline px-3 py-2 focus-within:border-ink">
            <svg
              viewBox="0 0 24 24"
              className="size-4 shrink-0 text-secondary"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="sr-only">Search currencies</span>
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              placeholder="Type a currency"
              autoComplete="off"
              className="w-full min-w-0 bg-transparent font-sans text-main outline-none placeholder:text-secondary"
            />
          </label>

          <p className="px-2 pt-1 font-sans text-small text-secondary">
            Popular currencies
          </p>

          <ul
            id={listId}
            role="listbox"
            aria-label={label}
            className="flex flex-col"
          >
            {shown.length === 0 ? (
              <li className="px-2 py-3 font-sans text-small text-secondary">
                No currency found
              </li>
            ) : (
              shown.map((option, index) => {
                const isSelected = option.code === value;
                return (
                  <li
                    key={option.code}
                    role="option"
                    aria-selected={isSelected}
                    onPointerEnter={() => setActive(index)}
                    onClick={() => pick(option.code)}
                    className={cx(
                      "flex cursor-pointer items-center gap-3 rounded-[0.75rem] px-2 py-2.5",
                      index === active && "bg-surface-light",
                    )}
                  >
                    <Flag src={option.flag} size="lg" />
                    <span className="flex min-w-0 flex-col">
                      <span className="font-sans text-main font-semibold">
                        {option.code}
                      </span>
                      <span className="truncate font-sans text-small text-secondary">
                        {option.name}
                      </span>
                    </span>
                    {isSelected ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="ml-auto size-5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.25}
                        aria-hidden
                      >
                        <path d="m5 12 5 5 9-10" />
                      </svg>
                    ) : null}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Flag({ src, size = "sm" }: { src: string; size?: "sm" | "lg" }) {
  const px = size === "lg" ? 32 : 20;
  return (
    <Image
      src={src}
      alt=""
      width={px}
      height={px}
      className={cx(
        "shrink-0 rounded-pill object-cover",
        size === "lg" ? "size-8" : "size-5",
      )}
    />
  );
}
