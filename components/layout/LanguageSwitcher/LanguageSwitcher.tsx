"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";

import { useDismiss } from "@/hooks/useDismiss";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  findLocale,
} from "@/config/locales";
import type { LocaleCode } from "@/config/locales";
import { cx } from "@/lib/cx";

/**
 * The language marker in the header, and the menu it becomes when there is
 * more than one language to choose from.
 *
 * ---------------------------------------------------------------------------
 * WHAT IT DOES TODAY
 *
 * `config/locales.ts` lists English and nothing else, so today this renders a
 * single flag and no control at all — see the early return below for why a
 * one-option menu is worse than no menu.
 *
 * The rest of this component is not speculative scaffolding. It is the branch
 * that runs the moment a second entry is added to `LOCALES`, and keeping it
 * whole is what makes adding a language a content task rather than a component
 * task.
 *
 * ---------------------------------------------------------------------------
 * WHY THE MENU IS A DISCLOSURE, NOT A `role="menu"`
 *
 * Structurally the same as `NavigationDropdown` — a button with `aria-expanded`
 * over a plain list — for the same reason: a short set of choices is not an
 * application menu, and promising the ARIA menu keyboard model without
 * implementing arrow-key navigation is worse than not claiming it.
 *
 * ---------------------------------------------------------------------------
 * [NEXT] Locale-prefixed URLs.
 *
 * The preference is a cookie, so it is per-browser and unshareable, and a
 * crawler has no way to index a page that has no address of its own. The first
 * translated locale needs `/es/...` routes, `hreflang` alternates and a
 * canonical per locale. The cookie is written server-readable specifically so
 * that step does not have to change how the choice is stored.
 */

/**
 * [CHANGED, 2026-08-29] 28 rather than 20, on instruction.
 *
 * Rendered at 2x by `next/image`'s `width`/`height`, so the SVG is drawn at its
 * natural 32px box and scaled down rather than up — no softness at any density.
 */
const FLAG_SIZE = 28;

export type LanguageSwitcherProps = {
  triggerLabel: string;
  menuLabel: string;
  currentSuffix: string;
  pendingNote: string;
};

export function LanguageSwitcher({
  triggerLabel,
  menuLabel,
  currentSuffix,
  pendingNote,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<LocaleCode>(DEFAULT_LOCALE);

  const panelId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useDismiss({ isOpen, onDismiss: close, panelRef, triggerRef: wrapperRef });

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;

    if (next instanceof Node && event.currentTarget.contains(next)) {
      return;
    }

    setIsOpen(false);
  }, []);

  const choose = useCallback((code: LocaleCode) => {
    setSelected(code);
    setIsOpen(false);

    /*
      `SameSite=Lax` because nothing cross-site needs to read it, and no
      `Secure` flag written from here — the browser adds the right behaviour on
      HTTPS and omitting it keeps the cookie working on a local HTTP dev server.
    */
    document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;

    /*
      The one visible effect available without translated copy, and it is a real
      one: `lang` is what a screen reader reads the page with and what a browser
      offers to translate from. It is set to the chosen locale only when that
      locale actually has content — otherwise the page would claim to be in
      Kiswahili while displaying English, and a screen reader would read English
      words with a Kiswahili voice.
    */
    const locale = findLocale(code);
    document.documentElement.lang = locale?.isAvailable === true ? code : DEFAULT_LOCALE;
  }, []);

  const current = findLocale(selected) ?? LOCALES[0]!;

  /**
   * With one language there is nothing to choose, so nothing here is a control.
   *
   * A button that opens a menu of a single option is a false affordance: it
   * takes a tab stop, announces itself as expandable, and does nothing when
   * operated. The flag still earns its place — it tells a visitor what language
   * this site is in before they read a word of it — so it renders as an image
   * with a real `alt`, which is the one case where the flag is not decorative,
   * because no language name sits beside it to carry the meaning.
   *
   * Adding a second entry to `LOCALES` restores the menu with no change here.
   */
  if (LOCALES.length < 2) {
    return (
      <Image
        src={current.flag}
        alt={current.englishName}
        width={FLAG_SIZE}
        height={FLAG_SIZE}
        unoptimized
        className="size-7 shrink-0"
      />
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onBlur={handleBlur}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={`${triggerLabel} — ${current.englishName}`}
        onClick={() => {
          setIsOpen((wasOpen) => !wasOpen);
        }}
        className={cx(
          "inline-flex items-center justify-center rounded-sm",
          "hit-area focus-ring transition-standard",
          "hover:bg-ink-hover",
        )}
      >
        <Image
          src={current.flag}
          alt=""
          width={FLAG_SIZE}
          height={FLAG_SIZE}
          unoptimized
          className="size-7"
        />
      </button>

      <div
        id={panelId}
        ref={panelRef}
        inert={!isOpen}
        className={cx(
          "absolute top-full right-0 z-menu",
          "min-w-max rounded-sm border border-border-hairline bg-surface-page",
          "p-fluid-2",
          "transition-menu",
          isOpen
            ? "menu-expanded translate-y-0 opacity-100"
            : "menu-collapsed -translate-y-1 opacity-0",
        )}
      >
        <ul role="list" aria-label={menuLabel} className="flex flex-col">
          {LOCALES.map((locale) => {
            const isCurrent = locale.code === selected;

            return (
              <li key={locale.code}>
                <button
                  type="button"
                  disabled={!locale.isAvailable}
                  /*
                    `aria-current="true"`, not `"page"`. This selects a language,
                    not a destination, and "page" would be a lie about what kind
                    of thing is current.
                  */
                  {...(isCurrent ? { "aria-current": true as const } : {})}
                  onClick={() => {
                    choose(locale.code);
                  }}
                  className={cx(
                    "flex w-full items-center gap-fluid-2 rounded-xs px-fluid-2 py-fluid-1",
                    "font-sans text-small focus-ring transition-standard",
                    locale.isAvailable
                      ? "text-ink hover:bg-ink-hover"
                      : "cursor-not-allowed text-ink-muted",
                    isCurrent && "text-brand",
                  )}
                >
                  <Image
                    src={locale.flag}
                    alt=""
                    width={FLAG_SIZE}
                    height={FLAG_SIZE}
                    unoptimized
                    className="size-7 shrink-0"
                  />

                  {/*
                    `lang` on the name itself. Without it a screen reader reads
                    "Kiswahili" and "Yorùbá" with an English voice and the
                    pronunciation is wrong — which matters more here than
                    anywhere, since this is the row a speaker of that language
                    is scanning for.
                  */}
                  <span lang={locale.code}>{locale.nativeName}</span>

                  {!locale.isAvailable && (
                    <span className="text-ink-muted">({pendingNote})</span>
                  )}

                  {isCurrent && <span className="sr-only">{currentSuffix}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
