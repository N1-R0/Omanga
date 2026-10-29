import { cx } from "@/lib/cx";
import { describedBy, fieldIds } from "@/lib/field-ids";
import type { Tone } from "@/types/ui.types";

const BOX_CLASS =
  "mt-0.5 size-5 shrink-0 cursor-pointer accent-accent ";

const TONE_BOX_CLASS: Readonly<Record<Tone, string>> = {
  light: "text-text",
  dark: "text-text-inverse",
  brand: "text-text-inverse",
} as const;

const TONE_MESSAGE_CLASS: Readonly<Record<Tone, string>> = {
  light: "text-text",
  dark: "text-text-inverse",
  brand: "text-text-inverse",
} as const;

export type CheckboxProps = {
  id: string;
  tone: Tone;
  name?: string;
  label: string;
  requirementNote: string;
  description?: string;
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  defaultChecked?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export function Checkbox({
  id,
  tone,
  name,
  label,
  requirementNote,
  description,
  error,
  isRequired = false,
  isDisabled = false,
  defaultChecked = false,
  onBlur,
}: CheckboxProps) {
  const { descriptionId, errorId } = fieldIds(id);
  const hasError = error !== undefined;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={cx(
          "flex cursor-pointer items-start gap-3 font-sans type-p2",
          TONE_BOX_CLASS[tone],
        )}
      >
        <input
          id={id}
          name={name ?? id}
          type="checkbox"
          required={isRequired}
          disabled={isDisabled}
          defaultChecked={defaultChecked}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy(id, {
            hasDescription: description !== undefined,
            hasError,
          })}
          onBlur={onBlur}
          className={BOX_CLASS}
        />

        <span>{label}</span>
      </label>

      <p className="font-sans type-p2 opacity-80">({requirementNote})</p>

      {description !== undefined && (
        <p id={descriptionId} className="font-sans type-p2 opacity-80">
          {description}
        </p>
      )}

      {hasError && (
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
