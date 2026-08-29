"use client";

import { useCallback, useId, useRef, useState } from "react";

import { ConsentToggle } from "@/components/consent/ConsentToggle";
import { useConsent } from "@/components/consent/ConsentProvider";
import { Button } from "@/components/ui/Button";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useDismiss } from "@/hooks/useDismiss";
import { useFocusReturn } from "@/hooks/useFocusReturn";
import { consentContent } from "@/content/consent.content";
import { NECESSARY_CATEGORY } from "@/lib/consent";
import type { ConsentDecisions } from "@/lib/consent";

/**
 * The granular preferences dialog.
 *
 * ---------------------------------------------------------------------------
 * DRAFT STATE, AND WHY IT IS NOT THE LIVE STATE
 *
 * The toggles edit a local copy that is only committed when "Save preferences"
 * is pressed. Editing the live consent state directly would mean each flick of a
 * switch immediately mounted or unmounted a script — so a visitor toggling
 * analytics on to read the description and off again would have loaded it. The
 * draft makes the dialog a decision the visitor completes, rather than a series
 * of decisions they make by accident while looking around.
 *
 * Dismissing without saving therefore changes nothing, which is the behaviour
 * "Cancel" would have if it existed. It does not need to exist: Escape, the
 * close control and an outside press all already mean "leave this as it was".
 *
 * The draft is re-seeded from live state every time the dialog opens, so a
 * second visit never shows the abandoned edits of the first.
 *
 * ---------------------------------------------------------------------------
 * "Accept all" and "Reject non-essential" appear here as well as on the banner,
 * and they commit immediately rather than filling in the draft. Someone who
 * opened the dialog to look and then decided they want the simple answer should
 * get it in one press, not two.
 */

const SCRIM_CLASS = "fixed inset-0 z-scrim bg-scrim";

const POSITION_CLASS =
  "fixed inset-0 z-overlay-content flex items-end justify-center p-fluid-3 tablet:items-center";

/**
 * `max-h-full` with `overflow-y-auto` rather than a fixed height: four category
 * descriptions plus three buttons is taller than a short phone in landscape, and
 * a dialog whose Save button is below the fold cannot be completed.
 */
const PANEL_CLASS =
  "flex max-h-full w-full max-w-form flex-col gap-fluid-4 overflow-y-auto rounded-md bg-surface-page p-fluid-5 text-ink shadow-glass-raised focus-ring-on-light";

/**
 * Mounts the dialog only while it is open.
 *
 * The split is what lets the draft be seeded by a `useState` initialiser rather
 * than by an effect watching `isPreferencesOpen`. Because the panel is unmounted
 * when closed, each open is a fresh mount and the initialiser runs again with the
 * current decisions — so abandoned edits from a previous open cannot reappear,
 * which is exactly what the effect was there to prevent.
 *
 * It also means the dialog's own hooks — scroll lock, dismiss, focus return —
 * only exist while it is on screen, instead of running with an `isOpen` flag.
 */
export function ConsentPreferences() {
  const { isPreferencesOpen } = useConsent();

  if (!isPreferencesOpen) {
    return null;
  }

  return <ConsentPreferencesDialog />;
}

function ConsentPreferencesDialog() {
  const { decisions, closePreferences, save, acceptAll, rejectAll } =
    useConsent();

  const { preferences } = consentContent;

  const headingId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const [draft, setDraft] = useState<ConsentDecisions>(decisions);

  const dismiss = useCallback(() => {
    closePreferences();
  }, [closePreferences]);

  useDismiss({ isOpen: true, onDismiss: dismiss, panelRef });
  useFocusReturn({ isOpen: true, panelRef });
  useBodyScrollLock(true);

  return (
    <>
      <div className={SCRIM_CLASS} aria-hidden="true" />

      <div className={POSITION_CLASS}>
        {/*
          `aria-modal` plus `role="dialog"` is what makes a screen reader treat
          the rest of the document as inert while this is open. `tabIndex={-1}`
          makes the panel itself a focus target, which `useFocusReturn` needs
          when the panel contains no focusable child on the first frame.
        */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className={PANEL_CLASS}
        >
          <div className="flex flex-col gap-fluid-2">
            <h2 id={headingId} className="font-sans text-h4">
              {preferences.heading}
            </h2>
            <p
              id={descriptionId}
              className="font-sans text-small text-secondary"
            >
              {preferences.intro}
            </p>
          </div>

          <div className="flex flex-col gap-fluid-3">
            {preferences.categories.map((category) => {
              const isLocked = category.id === NECESSARY_CATEGORY;

              return (
                <ConsentToggle
                  key={category.id}
                  copy={category}
                  isLocked={isLocked}
                  isChecked={isLocked ? true : draft[category.id]}
                  onChange={
                    isLocked
                      ? undefined
                      : (isChecked) => {
                          setDraft((current) => ({
                            ...current,
                            [category.id]: isChecked,
                          }));
                        }
                  }
                />
              );
            })}
          </div>

          <p className="font-sans text-small text-secondary">
            {preferences.footnote}
          </p>

          <div className="flex flex-col gap-fluid-2 tablet:flex-row tablet:flex-wrap">
            <Button
              as="button"
              variant="primary"
              tone="light"
              onClick={() => {
                save(draft);
              }}
            >
              {preferences.saveLabel}
            </Button>
            <Button
              as="button"
              variant="secondary"
              tone="light"
              onClick={acceptAll}
            >
              {preferences.acceptLabel}
            </Button>
            <Button
              as="button"
              variant="secondary"
              tone="light"
              onClick={rejectAll}
            >
              {preferences.rejectLabel}
            </Button>
          </div>

          <div className="flex items-center justify-between gap-fluid-3">
            <a
              href={preferences.policyLink.href}
              data-underline
              className="font-sans text-small text-brand focus-ring transition-standard hover:text-brand-hover"
            >
              {preferences.policyLink.label}
            </a>

            <Button
              as="button"
              variant="text"
              tone="light"
              onClick={dismiss}
            >
              {preferences.closeLabel}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
