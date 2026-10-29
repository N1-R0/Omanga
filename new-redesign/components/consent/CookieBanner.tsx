"use client";

import { useConsent } from "@/components/consent/ConsentProvider";
import { consentContent } from "@/content/consent.content";
import { Button } from "@/new-redesign/components/ui/Button";

export function CookieBanner() {
  const { isReady, record, acceptAll, rejectAll, openPreferences } = useConsent();
  if (!isReady || record !== null) return null;

  const { banner } = consentContent;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 print:hidden lg:right-6 lg:bottom-6 lg:left-auto lg:w-[420px] lg:p-0">
      <section aria-label={banner.landmarkLabel} className="flex flex-col gap-4 rounded-[16px] border border-border bg-surface p-5 shadow-float">
        <div className="flex flex-col gap-1">
          <h2 className="type-p3 sr-only md:not-sr-only">{banner.heading}</h2>
          <p className="type-p2 text-text-secondary">
            {banner.body}{" "}
            <a href={banner.policyLink.href} className="text-accent-text underline underline-offset-4">
              {banner.policyLink.label}
            </a>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 [&>button]:w-full">
          <Button onClick={acceptAll}>{banner.acceptLabel}</Button>
          <Button variant="secondary" onClick={rejectAll}>
            {banner.rejectLabel}
          </Button>
        </div>
        <button type="button" onClick={openPreferences} className="type-p3 self-start text-accent-text hover:underline">
          {banner.manageLabel}
        </button>
      </section>
    </div>
  );
}
