import { Field } from "@/components/ui/Field";
import { cx } from "@/lib/cx";
import { describedBy } from "@/lib/field-ids";
import type { Tone } from "@/types/ui.types";

/**
 * A single-choice dropdown.
 *
 * The third field primitive, and the one `Field` already anticipated: "shared by
 * `Input` and `Textarea` now and by `Select` when the enquiry form needs one."
 * The enquiry form needs one — the approved copy specifies its last question as
 * "a drop-down with four choices".
 *
 * A native `select`, not a listbox built out of divs. Semantic HTML first: the
 * native control already has keyboard support, type-ahead, the platform's own
 * mobile picker, and correct assistive-technology semantics, none of which a
 * custom widget reproduces for free. There is no design requirement here that
 * the native element cannot meet.
 *
 * Geometry and the two treatments come from `Input` and are kept identical to
 * it — they are the same control in the user's mind, and drift between them
 * reads as a bug.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The brand tone fills the control with `--color-brand` rather than
 * leaving it transparent.
 *
 * Visually the two are the same, because the control sits on the brand band. The
 * difference is the dropdown list: Chrome and Firefox render `option` elements
 * using the `select`'s own colours, so a transparent control with a white label
 * gives white options on the browser's white popup — invisible. An explicit fill
 * makes the popup white-on-brand and legible. Safari uses the platform's own
 * popup styling and ignores both, which is also legible.
 */

const BASE_CONTROL_CLASS =
  "min-h-12 w-full font-sans text-main focus-ring transition-standard";

const TONE_CONTROL_CLASS: Readonly<Record<Tone, string>> = {
  light:
    "rounded-sm border border-border-field bg-surface-light px-fluid-3 py-fluid-2 text-ink disabled:bg-inactive-surface disabled:text-disabled-ink",
  dark: "border-b border-on-dark bg-ink py-fluid-2 text-on-dark disabled:text-disabled-ink",
  brand:
    "border-b border-on-dark bg-brand py-fluid-2 text-on-dark disabled:text-disabled-ink",
} as const;

export type SelectOption = {
  /** Submitted value. */
  readonly value: string;
  /** Visible text. User-facing copy, so it comes from a content module. */
  readonly label: string;
};

export type SelectProps = {
  id: string;
  tone: Tone;
  /** The `name` the Route Handler reads. Defaults to `id`. */
  name?: string;
  label: string;
  requirementNote: string;
  /**
   * The choices, in the approved order.
   *
   * The unselected first entry is the caller's to provide, not this component's
   * to synthesise: its text is user-facing copy and nothing here may compose a
   * string.
   */
  options: readonly SelectOption[];
  description?: string;
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  defaultValue?: string;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  /**
   * [ADDED] Fires on selection.
   *
   * Only for a select whose value changes what else the form renders — the
   * Contact form's enquiry type reveals two company fields. A select that merely
   * collects a value needs nothing here: the control is uncontrolled, the value
   * is read from `FormData` at submit, and adding a handler to track it would put
   * state in a component that does not need any.
   */
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
      {/*
        The native arrow is left in place rather than removed with
        `appearance-none` and replaced by an icon. It inherits `currentColor`, so
        it is already white on the brand band, and a custom arrow would be a
        decorative element to position, size and hide from assistive technology
        for no gain over the one the platform draws.
      */}
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
