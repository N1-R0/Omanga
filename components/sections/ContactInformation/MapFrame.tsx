"use client";

import { useConsent } from "@/components/consent/ConsentProvider";
import { Button } from "@/components/ui/Button";
import { consentContent } from "@/content/consent.content";
import { OFFICE_MAP_EMBED_URL } from "@/config/site";

const FRAME_CLASS = "size-full border-0";

const PLACEHOLDER_CLASS =
  "flex size-full flex-col items-center justify-center gap-4 p-6 text-center";

export function MapFrame({ title }: { title: string }) {
  const { hasConsent, save, decisions } = useConsent();

  if (hasConsent("functional")) {
    return (
      <iframe
        src={OFFICE_MAP_EMBED_URL}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={FRAME_CLASS}
      />
    );
  }

  const { mapPlaceholder } = consentContent;

  return (
    <div className={PLACEHOLDER_CLASS}>
      <div className="flex flex-col gap-2">
        <p className="font-sans type-h3 text-text">{mapPlaceholder.heading}</p>
        <p className="font-sans type-p2 opacity-80 max-w-[60ch]">
          {mapPlaceholder.body}
        </p>
      </div>

      <Button
        as="button"
        variant="secondary"
        tone="light"
        onClick={() => {
          save({ ...decisions, functional: true });
        }}
      >
        {mapPlaceholder.actionLabel}
      </Button>
    </div>
  );
}
