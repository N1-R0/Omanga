"use client";

import { useConsent } from "@/components/consent/ConsentProvider";
import { consentContent } from "@/content/consent.content";

/** The footer's "Cookie settings": reopens the preferences to change or withdraw a choice. */
export function CookieSettingsButton({ className }: { className: string }) {
  const { openPreferences } = useConsent();
  return (
    <button type="button" onClick={openPreferences} className={className}>
      {consentContent.reopenLabel}
    </button>
  );
}
