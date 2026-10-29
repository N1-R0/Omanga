"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cx } from "@/lib/cx";
import { NavIcon } from "@/new-redesign/components/layout/NavIcon";
import { Button } from "@/new-redesign/components/ui/Button";
import { href } from "@/new-redesign/config/routes";
import { navigation, type NavMenu } from "@/new-redesign/content/navigation.content";
import { pauseSmoothScroll } from "@/new-redesign/components/layout/SmoothScroll";
import { Photo } from "@/new-redesign/components/ui/Photo";

const menus = navigation.items;

type Motion = "from-start" | "from-end" | undefined;
type Bar = "top" | "hidden" | "shown";

const BAR_HEIGHT = 76;

export function Header() {
  const [open, setOpen] = useState<number | null>(null);
  const [shown, setShown] = useState<number | null>(null);
  const [motion, setMotion] = useState<Motion>(undefined);
  const [heights, setHeights] = useState<Record<number, number>>({});
  const [sheet, setSheet] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [bar, setBar] = useState<Bar>("top");
  const [slide, setSlide] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const pinned = bar !== "top";
  const solid = open !== null || pinned;
  const dark = solid || pathname !== href("/");

  const show = (i: number | null) => {
    setMotion(open !== null && i !== null && i !== open ? (i > open ? "from-end" : "from-start") : undefined);
    setOpen(i);
    if (i !== null) setShown(i);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    let current: Bar = "top";
    const set = (next: Bar) => {
      if (next === current) return;
      setSlide(current !== "top" && next !== "top");
      current = next;
      setBar(next);
      if (next !== "shown") setOpen(null);
    };
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - last;
      last = y;
      if (y <= 0) set("top");
      else if (current === "top") {
        if (y > BAR_HEIGHT) set("hidden");
      } else if (dy < -2) set("shown");
      else if (dy > 2) set("hidden");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      const next: Record<number, number> = {};
      for (const [k, el] of Object.entries(panelRefs.current)) if (el) next[Number(k)] = el.offsetHeight;
      setHeights(next);
    });
    Object.values(panelRefs.current).forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) show(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      headerRef.current?.querySelector<HTMLButtonElement>(`[data-tab="${open}"]`)?.focus();
      show(null);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!sheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    pauseSmoothScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      pauseSmoothScroll(false);
      document.removeEventListener("keydown", onKey);
    };
  }, [sheet]);

  const navColor = ready ? "transition-[color,background-color] duration-[var(--duration-nav)] ease-nav" : "";

  return (
    <>
      <div
        aria-hidden
        className={cx(
          "pointer-events-none fixed inset-0 z-30 hidden bg-[rgb(0_0_0/0.5)] backdrop-blur-[8px] transition-opacity duration-[var(--duration-nav)] ease-nav lg:block",
          open !== null ? "opacity-100" : "opacity-0",
        )}
      />
      <header
        ref={headerRef}
        onMouseLeave={() => show(null)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) show(null);
        }}
        className={cx(
          "inset-x-0 top-0 z-40",
          pinned ? "fixed border-b border-border" : "absolute",
          bar === "hidden" && "-translate-y-full",
          ready && (slide ? "transition-[translate,color,background-color] duration-[var(--duration-nav)] ease-nav" : navColor),
          solid ? "bg-surface text-text" : dark ? "text-text" : "text-text-inverse",
        )}
      >
        <div className="container-page flex h-19 items-center gap-6">
          <Link href={href("/")} aria-label={navigation.homeLabel} className="relative shrink-0 rounded-[16px]">
            <Photo src="/logo-omanga-white.svg" alt="" width={110} height={31} loading="eager" className={cx(navColor, ready && "transition-opacity", dark ? "opacity-0" : "opacity-100")} />
            <Photo src="/logo-omanga-horizontal.svg" alt="" width={110} height={31} loading="eager" className={cx("absolute inset-0", ready && "transition-opacity duration-[var(--duration-nav)] ease-nav", dark ? "opacity-100" : "opacity-0")} />
          </Link>

          <nav aria-label={navigation.landmarkLabel} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {menus.map((item, i) => {
                const tabClass = cx(
                  "type-p3 inline-flex items-center rounded-[8px] px-3 py-2",
                  navColor,
                  open === i
                    ? "bg-accent-subtle text-brand-700"
                    : dark
                      ? "text-text hover:bg-surface-muted"
                      : "text-text-inverse hover:bg-neutral-0/15",
                );
                return (
                  <li key={item.label} onMouseEnter={() => show("columns" in item ? i : null)}>
                    {"columns" in item ? (
                      <button
                        type="button"
                        data-tab={i}
                        className={tabClass}
                        aria-expanded={open === i}
                        aria-controls={`nav-panel-${i}`}
                        onClick={(e) => show(e.detail > 0 || open !== i ? i : null)}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link href={item.href} className={tabClass}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1">
            {[navigation.help, navigation.login].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={cx(
                  "type-p3 hidden rounded-[8px] px-3 py-2 lg:inline-flex",
                  navColor,
                  dark ? "text-text hover:bg-surface-muted" : "text-text-inverse hover:bg-neutral-0/15",
                )}
              >
                {l.label}
              </a>
            ))}
            <span className="ml-1 hidden lg:inline-flex">
              <Button href={navigation.cta.href} external variant={dark ? "primary" : "inverse"}>
                {navigation.cta.label}
              </Button>
            </span>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-[8px] lg:hidden"
              aria-label={navigation.menuOpenLabel}
              aria-expanded={sheet}
              aria-controls="mobile-menu"
              onClick={() => setSheet(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        <div
          className={cx(
            "absolute inset-x-0 top-full hidden overflow-hidden text-text transition-[height] duration-[var(--duration-nav)] ease-nav lg:block",
          )}
          style={{ height: solid && shown !== null ? (heights[shown] ?? 0) : 0 }}
        >
          {menus.map((item, i) =>
            "columns" in item ? (
              <div
                key={item.label}
                id={`nav-panel-${i}`}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="nav-panel border-t border-border"
                data-active={open === i}
                data-motion={open === i ? motion : undefined}
                inert={open !== i}
              >
                <Panel menu={item} onNavigate={() => show(null)} />
              </div>
            ) : null,
          )}
        </div>

        {sheet ? <MobileSheet onClose={() => setSheet(false)} /> : null}
      </header>
    </>
  );
}

function Panel({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  const { feature, columns } = menu;
  return (
    <div className="container-page pb-8">
      <div className="flex overflow-hidden rounded-b-[16px] border border-t-0 border-border bg-surface shadow-float">
        <div className="flex flex-1 gap-8 p-8">
          {columns.map((col) => (
            <div key={col.heading} className="min-w-0 flex-1">
              <p className="text-[12px] leading-none font-medium tracking-[0.08em] text-text-secondary uppercase">{col.heading}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={onNavigate} className="-mx-2 flex items-center gap-3.5 rounded-[12px] p-2 transition-colors hover:bg-surface-muted">
                      <NavIcon name={l.icon} size="tile" />
                      <span className="flex flex-col">
                        <span className="type-p3 text-text">{l.label}</span>
                        <span className="type-p2 text-text-secondary">{l.text}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="w-[320px] shrink-0 border-l border-border bg-surface-muted p-8">
          <p className="text-[12px] leading-none font-medium tracking-[0.08em] text-text-secondary uppercase">{navigation.featuredLabel}</p>
          <Link href={feature.href} onClick={onNavigate} className="group mt-5 block">
            <span className="relative block aspect-[16/9] overflow-hidden rounded-[12px]">
              <Photo src={feature.image.src} alt={feature.image.alt} fill sizes="256px" loading="eager" className="object-cover transition-transform duration-[var(--duration-base)] group-hover:scale-[1.03]" />
            </span>
            <span className="type-p3 mt-5 block text-text">{feature.title}</span>
            <span className="type-p2 mt-1 block text-text-secondary">{feature.text}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileSheet({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => closeRef.current?.focus(), []);

  return (
    <div id="mobile-menu" role="dialog" aria-modal="true" aria-label={navigation.landmarkLabel} className="fixed inset-0 z-50 flex flex-col bg-surface text-text lg:hidden">
      <div className="container-page flex h-19 shrink-0 items-center justify-between">
        <Link href={href("/")} aria-label={navigation.homeLabel} onClick={onClose}>
          <Photo src="/logo-omanga-horizontal.svg" alt="" width={110} height={31} />
        </Link>
        <button ref={closeRef} type="button" className="inline-flex size-11 items-center justify-center rounded-[8px]" aria-label={navigation.menuCloseLabel} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <nav aria-label={navigation.landmarkLabel} data-lenis-prevent className="container-page flex-1 overflow-y-auto pb-6">
        {menus.map((item) => (
          <div key={item.label} className="border-t border-border py-4">
            {"columns" in item ? (
              <>
                <p className="type-p2 mb-2 text-text-secondary">{item.label}</p>
                <ul className="flex flex-col gap-1">
                  {item.columns.flatMap((c) => c.links).map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={onClose} className="type-p1 block py-2.5">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link href={item.href} onClick={onClose} className="type-p1 block py-1.5">
                {item.label}
              </Link>
            )}
          </div>
        ))}
        <div className="flex flex-col border-t border-border py-4">
          {[navigation.help, navigation.login, navigation.whatsapp].map((l) => (
            <a key={l.label} href={l.href} className="type-p1 py-1.5">
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="container-page shrink-0 border-t border-border py-4 [&_a]:w-full">
        <Button href={navigation.cta.href} external>{navigation.cta.label}</Button>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden width="22" height="22" viewBox="0 0 22 22">
      <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden width="22" height="22" viewBox="0 0 22 22">
      <path d="m5 5 12 12M17 5 5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
