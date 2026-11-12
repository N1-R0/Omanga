import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import { fieldIds } from "@/lib/field-ids";
import type { Tone } from "@/types/ui.types";

export type FieldProps = {
  id: string;
  tone: Tone;
  label: string;
  requirementNote: string;
  description?: string;
  error?: string;
  children: ReactNode;
};

const TONE_MESSAGE_CLASS: Readonly<Record<Tone, string>> = {
  light: "text-text",
  dark: "text-text-inverse",
  brand: "text-text-inverse",
} as const;

export function Field({
  id,
  tone,
  label,
  requirementNote,
  description,
  error,
  children,
}: FieldProps) {
  const { descriptionId, errorId } = fieldIds(id);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-sans type-p2">
        {label}{" "}
        <span className="opacity-80">({requirementNote})</span>
      </label>

      {description !== undefined && (
        <p id={descriptionId} className="font-sans type-p2 opacity-80">
          {description}
        </p>
      )}

      {children}

      {error !== undefined && (
        <p
          id={errorId}
          role="alert"
          className={cx("font-sans type-p2", TONE_MESSAGE_CLASS[tone])}
        >
          {error}
        </p>
      )}
    </div>
  );
}
