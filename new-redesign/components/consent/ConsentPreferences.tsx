"use client";

import { useId, useRef, useState } from "react";

import { useConsent } from "@/components/consent/ConsentProvider";
import { consentContent, type ConsentCategoryCopy } from "@/content/consent.content";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useDismiss } from "@/hooks/useDismiss";
import { useFocusReturn } from "@/hooks/useFocusReturn";
import { NECESSARY_CATEGORY, type ConsentDecisions } from "@/lib/consent";
import { Button } from "@/new-redesign/components/ui/Button";

/**
 * Cookie preferences dialog in the new design (cutover, 2026-10-26), opened
 * from the banner's Manage and the footer's Cookie settings. Same behaviour as
 * the old dialog: a modal over a scrim, one row per category (necessary is
 * locked on), Save, Accept all and Reject all, Escape or the scrim to close,
 * focus returned on close.
 *
 * Radii are literal: it also renders on the old pages (styles/chrome.css).
 */
export function ConsentPreferences() {
  const { isPreferencesOpen } = useConsent();
  return isPreferencesOpen ? <PreferencesDialog /> : null;
}

function PreferencesDialog() {
  const { decisions, closePreferences, save, acceptAll, rejectAll } = useConsent();
  const { preferences } = consentContent;
  const headingId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<ConsentDecisions>(decisions);

  useDismiss({ isOpen: true, onDismiss: closePreferences, panelRef });
  useFocusReturn({ isOpen: true, panelRef });
  useBodyScrollLock(true);

  return (
    <>
      <div aria-hidden className="fixed inset-0 z-50 bg-[rgb(0_0_0/0.5)]" />
      <div className="fixed inset-0 z-50 flex items-end justify-center p-3 md:items-center">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className="flex max-h-full w-full max-w-[560px] flex-col gap-6 overflow-y-auto rounded-[16px] bg-surface p-6 shadow-float md:p-8"
        >
          <div className="flex flex-col gap-2">
            <h2 id={headingId} className="type-h3">
              {preferences.heading}
            </h2>
            <p id={descriptionId} className="type-p2 text-text-secondary">
              {preferences.intro}
            </p>
          </div>

          <div className="flex flex-col">
            {preferences.categories.map((category) => {
              const locked = category.id === NECESSARY_CATEGORY;
              return (
                <CategoryRow
                  key={category.id}
                  copy={category}
                  locked={locked}
                  checked={locked ? true : draft[category.id]}
                  onChange={(checked) => setDraft((d) => ({ ...d, [category.id]: checked }))}
                />
              );
            })}
          </div>

          <p className="type-p2 text-text-secondary">{preferences.footnote}</p>

          <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
            <Button onClick={() => save(draft)}>{preferences.saveLabel}</Button>
            <Button variant="secondary" onClick={acceptAll}>
              {preferences.acceptLabel}
            </Button>
            <Button variant="secondary" onClick={rejectAll}>
              {preferences.rejectLabel}
            </Button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <a href={preferences.policyLink.href} className="type-p2 text-accent-text underline underline-offset-4">
              {preferences.policyLink.label}
            </a>
            <Button variant="ghost" onClick={closePreferences}>
              {preferences.closeLabel}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function CategoryRow({ copy, locked, checked, onChange }: { copy: ConsentCategoryCopy; locked: boolean; checked: boolean; onChange: (checked: boolean) => void }) {
  const inputId = `consent-${copy.id}`;
  const descriptionId = `${inputId}-description`;
  return (
    <div className="flex flex-col gap-1 border-t border-border py-4">
      {locked ? (
        <div className="flex items-start justify-between gap-4">
          <span className="type-p3">{copy.title}</span>
          <span className="type-p2 shrink-0 text-text-secondary">{copy.lockedNote}</span>
        </div>
      ) : (
        <label htmlFor={inputId} className="flex cursor-pointer items-start justify-between gap-4">
          <span className="type-p3">{copy.title}</span>
          <input
            id={inputId}
            type="checkbox"
            checked={checked}
            aria-describedby={descriptionId}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--color-accent)]"
          />
        </label>
      )}
      <p id={descriptionId} className="type-p2 text-text-secondary">
        {copy.description}
        {copy.consequence !== undefined ? <span className="mt-1 block">{copy.consequence}</span> : null}
      </p>
    </div>
  );
}
