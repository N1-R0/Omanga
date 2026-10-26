import { Field } from "@/components/ui/Field";
import { describedBy } from "@/lib/field-ids";
import { cx } from "@/lib/cx";
import type { Tone } from "@/types/ui.types";

/**
 * A multi-line text field.
 *
 * Shares `Input`'s geometry exactly — same fill, border, radius, padding and
 * type — because they are the same control in the user's mind and any drift
 * between them reads as a bug.
 *
 * `rows` sets the initial height only; the control resizes vertically. No
 * fixed height, per the layout rule that height follows content.
 *
 * [ADDED] The `tone` axis, mirroring `Input`'s exactly — including the underline
 * treatment on the two dark surfaces. It has no caller today: the Get Started
 * enquiry form has no approved multi-line field. It is here rather than left
 * light-only because `Field` now requires a tone from every control, and a
 * primitive that could only sit on one surface while its sibling sits on three
 * would drift the moment a form needs it.
 */

const BASE_CONTROL_CLASS =
  "w-full resize-y font-sans type-p1  transition duration-[var(--duration-fast)] ease-standard placeholder:text-text-secondary";

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

export type TextareaProps = {
  id: string;
  /** The surface this field sits on. Passed explicitly, never inferred. */
  tone: Tone;
  name?: string;
  label: string;
  requirementNote: string;
  description?: string;
  error?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  defaultValue?: string;
  /** Initial visible lines. Defaults to 4, which is the enquiry form's shape. */
  rows?: number;
  /**
   * [ADDED] Validation on blur, mirroring `Input` and `Select`.
   *
   * The Contact form's message is the first required textarea on the site, and
   * "errors clear as they are corrected" needs the same hook the other two
   * controls already have.
   */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
};

export function Textarea({
  id,
  tone,
  name,
  label,
  requirementNote,
  description,
  error,
  placeholder,
  isRequired = false,
  isDisabled = false,
  defaultValue,
  rows = 4,
  onBlur,
}: TextareaProps) {
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
      <textarea
        id={id}
        name={name ?? id}
        rows={rows}
        onBlur={onBlur}
        required={isRequired}
        disabled={isDisabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
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
