import { Field } from "@/components/ui/Field";
import { describedBy } from "@/lib/field-ids";
import { cx } from "@/lib/cx";
import type { Tone } from "@/types/ui.types";

type InputType = "text" | "email" | "tel" | "url";

const BASE_CONTROL_CLASS =
  "min-h-12 w-full font-sans type-p1  transition duration-[var(--duration-fast)] ease-standard placeholder:text-text-secondary";

const TONE_CONTROL_CLASS: Readonly<Record<Tone, string>> = {
  light:
    "rounded-xs border bg-surface px-4 py-3 text-text disabled:bg-surface-muted disabled:text-neutral-400",
  dark: "border-b bg-transparent py-3 text-text-inverse disabled:text-neutral-400",
  brand:
    "border-b bg-transparent py-3 text-text-inverse disabled:text-neutral-400",
} as const;

const TONE_BORDER_CLASS: Readonly<
  Record<Tone, { readonly resting: string; readonly error: string }>
> = {
  light: { resting: "border-border-strong", error: "border-error-text" },
  dark: { resting: "border-text-inverse", error: "border-text-inverse" },
  brand: { resting: "border-text-inverse", error: "border-text-inverse" },
} as const;

export type InputProps = {
  id: string;
  tone: Tone;
  name?: string;
  type: InputType;
  label: string;
  requirementNote: string;
  description?: string;
  error?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  defaultValue?: string;
  autoComplete?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export function Input({
  id,
  tone,
  name,
  type,
  label,
  requirementNote,
  description,
  error,
  placeholder,
  isRequired = false,
  isDisabled = false,
  defaultValue,
  autoComplete,
  onBlur,
}: InputProps) {
  const hasError = error !== undefined;
  const border = TONE_BORDER_CLASS[tone];

  return (
    <Field
      id={id}
      tone={tone}
      label={label}
      requirementNote={requirementNote}
      description={description}
      error={error}
    >
      <input
        id={id}
        name={name ?? id}
        type={type}
        required={isRequired}
        disabled={isDisabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onBlur={onBlur}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy(id, {
          hasDescription: description !== undefined,
          hasError,
        })}
        className={cx(
          BASE_CONTROL_CLASS,
          TONE_CONTROL_CLASS[tone],
          hasError ? border.error : border.resting,
        )}
      />
    </Field>
  );
}
