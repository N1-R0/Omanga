import { Field } from "@/components/ui/Field";
import { describedBy } from "@/lib/field-ids";
import { cx } from "@/lib/cx";

/**
 * A multi-line text field.
 *
 * Shares `Input`'s geometry exactly — same fill, border, radius, padding and
 * type — because they are the same control in the user's mind and any drift
 * between them reads as a bug.
 *
 * `rows` sets the initial height only; the control resizes vertically. No
 * fixed height, per the layout rule that height follows content.
 */

const CONTROL_CLASS =
  "w-full resize-y rounded-sm border bg-surface-light px-fluid-3 py-fluid-2 font-sans text-main text-ink focus-ring transition-standard placeholder:text-secondary disabled:bg-inactive-surface disabled:text-disabled-ink";

export type TextareaProps = {
  id: string;
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
};

export function Textarea({
  id,
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
}: TextareaProps) {
  const hasError = error !== undefined;

  return (
    <Field
      id={id}
      label={label}
      requirementNote={requirementNote}
      description={description}
      error={error}
    >
      <textarea
        id={id}
        name={name ?? id}
        rows={rows}
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
          CONTROL_CLASS,
          hasError ? "border-error" : "border-border-field",
        )}
      />
    </Field>
  );
}
