import { Field } from "@/components/ui/Field";
import { describedBy } from "@/lib/field-ids";
import { cx } from "@/lib/cx";

/**
 * A single-line text field.
 *
 * design.md § Input variants: light surface fill, 1px border, 12
 * radius, 16 × 12 padding, 18 in the heading family, 48 minimum height. The frame contains
 * no drawn form fields, so the geometry comes from the system's existing
 * chrome and the border colour is a documented gap — see
 * `--color-border-field` in tokens.css.
 *
 * Uncontrolled by default: `defaultValue` rather than `value`. A native form
 * that posts to a Route Handler works with JavaScript disabled or still
 * loading, which is what "forms work as forms" requires, and it is also how
 * field values survive a failed submission without any client state.
 */

/**
 * Input types the page actually needs. `type` is not widened to the full HTML
 * set: each one changes the mobile keyboard and the validation behaviour, and
 * an unreviewed type is a UX decision nobody made.
 */
type InputType = "text" | "email" | "tel" | "url";

const CONTROL_CLASS =
  "min-h-12 w-full rounded-sm border bg-surface-light px-fluid-3 py-fluid-2 font-sans text-main text-ink focus-ring transition-standard placeholder:text-secondary disabled:bg-inactive-surface disabled:text-disabled-ink";

export type InputProps = {
  /** Must be unique on the page. Ties the label, control and messages together. */
  id: string;
  /** The `name` the Route Handler reads. Defaults to `id`. */
  name?: string;
  type: InputType;
  label: string;
  requirementNote: string;
  description?: string;
  /** Presence puts the field in its error state. */
  error?: string;
  /**
   * An example of a valid value. Never a label, and never the only guidance —
   * placeholders vanish on focus and are invisible to some assistive tech.
   */
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  /** Survives a failed submission when the server re-renders the form. */
  defaultValue?: string;
  /** Browser autofill hint. Materially improves completion on mobile. */
  autoComplete?: string;
};

export function Input({
  id,
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
}: InputProps) {
  const hasError = error !== undefined;

  return (
    <Field
      id={id}
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
