"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";

import { cx } from "@/lib/cx";
import { Flag } from "@/new-redesign/components/ui/Flag";
import { href } from "@/new-redesign/config/routes";
import { homeCountries } from "@/new-redesign/content/home.content";

/**
 * Tabs and the flag-and-link grid (design system § Country directory),
 * after Wise's "works nearly everywhere".
 *
 * WAI-ARIA tabs: one tab stop, ←/→ (and Home/End) move and select, and each
 * panel is labelled by its tab. Only the selected panel is rendered.
 */
export function CountryDirectory() {
  const { tabs } = homeCountries;
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = tabs.length - 1;
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
  };

  const tab = tabs[active];

  return (
    <>
      <div role="tablist" aria-label={homeCountries.title} onKeyDown={onKeyDown} className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            id={`${baseId}-tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${baseId}-panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cx(
              "type-p3 rounded-md border px-3 py-2 transition-colors duration-[var(--duration-fast)]",
              i === active ? "border-transparent bg-accent-subtle text-brand-700" : "border-border-strong text-text hover:bg-surface-muted",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id={`${baseId}-panel-${tab.id}`} role="tabpanel" aria-labelledby={`${baseId}-tab-${tab.id}`}>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
          {tab.items.map((item) => (
            <li key={item.label}>
              <Link href={href(item.path)} className="group flex flex-col items-start gap-4">
                <Flag src={item.flag} size={48} />
                <span className="type-p3 underline decoration-text/40 underline-offset-4 transition-colors duration-[var(--duration-fast)] group-hover:decoration-accent">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <Link href={href(tab.more.path)} className="type-p3 text-accent-text hover:underline">
            {tab.more.label} →
          </Link>
        </div>
      </div>
    </>
  );
}
