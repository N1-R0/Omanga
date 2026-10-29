import { Field } from "@/components/ui/Field";
import { cx } from "@/lib/cx";
import { describedBy } from "@/lib/field-ids";
import type { Tone } from "@/types/ui.types";

const BASE_CONTROL_CLASS =
  "min-h-12 w-full font-sans type-p1  transition duration-[var(--duration-fast)] ease-standard";

const TONE_CONTROL_CLASS: Readonly<Record<Tone, string>> = {
  light:
    "rounded-xs border border-border-strong bg-surface px-4 py-3 text-text disabled:bg-surface-muted disabled:text-neutral-400",
  dark: "border-b border-text-inverse bg-surface-inverse py-3 text-text-inverse disabled:text-neutral-400",
  brand:
    "border-b border-text-inverse bg-accent py-3 text-text-inverse disabled:text-neutral-400",
} as const;

export type SelectOption = {
  readonly value: string;
  readonly label: string;
};

export type SelectProps = {
  id: string;
  tone: Tone;
  name?: string;
  label: string;
  requirementNote: string;
  options: readonly SelectOption[];
  description?: string;
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  defaultValue?: string;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function Select({
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
  defaultValue,
  onBlur,
  onChange,
}: SelectProps) {
  const hasError = error !== undefined;

  return (
    <Field
      id={id}
      tone={tone}
      label={label}
      requirementNote={requirementNote}
      description={description}
      error={error}
    >
      <select
        id={id}
        name={name ?? id}
        required={isRequired}
        disabled={isDisabled}
        defaultValue={defaultValue}
        onBlur={onBlur}
        onChange={onChange}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy(id, {
          hasDescription: description !== undefined,
          hasError,
        })}
        className={cx(BASE_CONTROL_CLASS, TONE_CONTROL_CLASS[tone])}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
