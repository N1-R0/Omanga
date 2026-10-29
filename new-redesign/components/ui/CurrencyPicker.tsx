"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import { cx } from "@/lib/cx";
import { Flag } from "@/new-redesign/components/ui/Flag";

export type CurrencyOption = {
  code: string;
  name: string;
  country: string;
  flag: string;
};

type Props = {
  value: string;
  options: readonly CurrencyOption[];
  onChange: (code: string) => void;
  label: string;
  copy: { searchPlaceholder: string; searchLabel: string; allLabel: string; empty: string };
  align?: "left" | "right";
  trigger?: "chip" | "plain";
  searchable?: boolean;
};

export function CurrencyPicker({ value, options, onChange, label, copy, align = "right", trigger = "chip", searchable = true }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const current = options.find((o) => o.code === value) ?? options[0];
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => [o.code, o.name, o.country].some((t) => t.toLowerCase().includes(q)));
  }, [options, query]);

  const close = (returnFocus: boolean) => {
    setOpen(false);
    setQuery("");
    if (returnFocus) triggerRef.current?.focus();
  };

  const pick = (code: string) => {
    onChange(code);
    close(true);
  };

  useEffect(() => {
    if (!open) return;
    (searchable ? searchRef.current : listRef.current)?.focus();
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close(true);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      pick(results[active].code);
    }
  };

  return (
    <div
      ref={rootRef}
      className="shrink-0 md:relative"
      onBlur={(e) => {
        if (open && !e.currentTarget.contains(e.relatedTarget as Node)) close(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          if (open) return close(false);
          setActive(Math.max(0, options.findIndex((o) => o.code === value)));
          setOpen(true);
        }}
        className={cx(
          "flex items-center gap-2 transition-colors duration-[var(--duration-fast)]",
          trigger === "plain"
            ? "gap-2.5 rounded-md py-1 pr-1 text-[24px] font-medium tracking-[-0.02em] hover:text-accent-text"
            : "type-p3 rounded-md bg-surface-muted py-2 pr-3 pl-2 hover:bg-neutral-200",
        )}
      >
        <Flag src={current.flag} size={trigger === "plain" ? 28 : 20} />
        <span aria-hidden className={trigger === "plain" ? undefined : "hidden md:inline"}>
          {current.code}
        </span>
        <svg aria-hidden width={trigger === "plain" ? 16 : 10} height={trigger === "plain" ? 16 : 10} viewBox="0 0 12 12" className={cx("transition-transform duration-[var(--duration-fast)]", open && "rotate-180")}>
          <path d="M3 4.5 6 7.5l3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div
          className={cx(
            "absolute inset-x-0 top-full z-30 mt-2 rounded-md bg-surface p-3 text-left text-text shadow-float md:inset-x-auto md:w-[340px]",
            align === "right" ? "md:right-0" : "md:left-0",
          )}
        >
          {searchable ? (
          <div className="mb-4 flex items-center gap-2 rounded-md border-2 border-text px-3 py-2.5">
            <svg aria-hidden width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="9" cy="9" r="5.5" />
              <path d="m13.5 13.5 3 3" />
            </svg>
            <input
              ref={searchRef}
              role="combobox"
              aria-label={copy.searchLabel}
              aria-expanded
              aria-controls={listId}
              aria-activedescendant={results[active] ? `${listId}-${results[active].code}` : undefined}
              placeholder={copy.searchPlaceholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              className="type-p1 w-full min-w-0 bg-transparent outline-none placeholder:text-text-secondary"
            />
          </div>
          ) : null}

          <p className="type-p2 border-b border-border px-1 pb-2 text-text-secondary">{copy.allLabel}</p>

          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={copy.allLabel}
            tabIndex={searchable ? undefined : 0}
            aria-activedescendant={!searchable && results[active] ? `${listId}-${results[active].code}` : undefined}
            onKeyDown={searchable ? undefined : onKeyDown}
            data-lenis-prevent className="mt-2 flex max-h-72 outline-none flex-col gap-1 overflow-y-auto">
            {results.length === 0 ? <li className="type-p2 px-3 py-3 text-text-secondary">{copy.empty}</li> : null}
            {results.map((o, i) => {
              const selected = o.code === value;
              return (
                <li
                  key={o.code}
                  id={`${listId}-${o.code}`}
                  role="option"
                  aria-selected={selected}
                  onPointerMove={() => setActive(i)}
                  onClick={() => pick(o.code)}
                  className={cx(
                    "flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5",
                    selected ? "border-border-strong" : "border-transparent",
                    i === active && "bg-surface-muted",
                  )}
                >
                  <Flag src={o.flag} size={28} />
                  <span className="type-p1 font-medium">{o.code}</span>
                  <span className="type-p2 truncate text-text-secondary">{o.name}</span>
                  {selected ? (
                    <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" className="ml-auto shrink-0 text-text">
                      <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
