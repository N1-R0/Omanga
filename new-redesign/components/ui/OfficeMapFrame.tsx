"use client";

import { useConsent } from "@/components/consent/ConsentProvider";
import { OFFICE_MAP_EMBED_URL } from "@/config/site";
import { consentContent } from "@/content/consent.content";
import { Button } from "@/new-redesign/components/ui/Button";

export function OfficeMapFrame({ title }: { title: string }) {
  const { hasConsent, save, decisions } = useConsent();

  if (hasConsent("functional")) {
    return (
      <iframe
        src={OFFICE_MAP_EMBED_URL}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0"
      />
    );
  }

  const { heading, body, actionLabel } = consentContent.mapPlaceholder;
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="type-h3">{heading}</p>
      <p className="type-p2 max-w-[44ch] text-text-secondary">{body}</p>
      <Button variant="secondary" onClick={() => save({ ...decisions, functional: true })}>
        {actionLabel}
      </Button>
    </div>
  );
}
