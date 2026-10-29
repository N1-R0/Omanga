import { cx } from "@/lib/cx";
import { describedBy, fieldIds } from "@/lib/field-ids";
import type { Tone } from "@/types/ui.types";

const TONE_LABEL_CLASS: Readonly<Record<Tone, string>> = {
  light: "text-text",
  dark: "text-text-inverse",
  brand: "text-text-inverse",
} as const;

const TONE_MESSAGE_CLASS: Readonly<Record<Tone, string>> = {
  light: "text-text",
  dark: "text-text-inverse",
  brand: "text-text-inverse",
} as const;

const RADIO_CLASS = "size-5 shrink-0 cursor-pointer accent-accent ";

export type RadioOption = {
  readonly value: string;
  readonly label: string;
};

export type RadioGroupProps = {
  id: string;
  tone: Tone;
  name?: string;
  label: string;
  requirementNote: string;
  options: readonly RadioOption[];
  description?: string;
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export function RadioGroup({
  id,
  tone,
  name,
  label,
  requirementNote,
  options,
  description,
  error,
  isRequired = false,
  isDisabled = false,
  onBlur,
}: RadioGroupProps) {
  const { descriptionId, errorId } = fieldIds(id);
  const hasError = error !== undefined;
  const groupName = name ?? id;
  const legendId = `${id}-legend`;

  return (
    <fieldset
      id={id}
      role="radiogroup"
      aria-labelledby={legendId}
      aria-invalid={hasError || undefined}
      aria-describedby={describedBy(id, {
        hasDescription: description !== undefined,
        hasError,
      })}
      tabIndex={-1}
      disabled={isDisabled}
      className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0 "
    >
      <legend
        id={legendId}
        className={cx("font-sans type-p2", TONE_LABEL_CLASS[tone])}
      >
        {label} <span className="opacity-80">({requirementNote})</span>
      </legend>

      {description !== undefined && (
        <p id={descriptionId} className="font-sans type-p2 opacity-80">
          {description}
        </p>
      )}

      <div className="flex flex-wrap gap-6 pt-2">
        {options.map((option) => {
          const optionId = `${id}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cx(
                "flex cursor-pointer items-center gap-3 font-sans type-p2",
                TONE_LABEL_CLASS[tone],
              )}
            >
              <input
                id={optionId}
                name={groupName}
                type="radio"
                value={option.value}
                required={isRequired}
                onBlur={onBlur}
                className={RADIO_CLASS}
              />

              <span>{option.label}</span>
            </label>
          );
        })}
      </div>

      {hasError && (
        <p
          id={errorId}
          role="alert"
          className={cx("font-sans type-p2", TONE_MESSAGE_CLASS[tone])}
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}
