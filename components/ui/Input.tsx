import { Field } from "@/components/ui/Field";
import { describedBy } from "@/lib/field-ids";
import { cx } from "@/lib/cx";
import type { Tone } from "@/types/ui.types";

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
 *
 * ---------------------------------------------------------------------------
 * [ADDED] A `tone` axis, and with it the underline treatment.
 *
 * The filled treatment above was inferred, not drawn — this file already
 * recorded that "the frame contains no drawn form fields, so the geometry comes
 * from the system's existing chrome". The Get Started screenshot is the first
 * drawn field in the project and it draws something different on the brand band:
 * no fill, no box, a single bottom rule, label above.
 *
 * So the drawn version ships as the `brand` tone and the inferred one stays
 * exactly as it was under `light`. Nothing changes for existing callers because
 * there are none — this form is the first consumer of any field primitive.
 *
 * [MEASURED] The rule is full white, not `--color-on-dark-muted`.
 *
 * A field boundary is a non-text UI component, so SC 1.4.11 applies at 3:1.
 * Against `--color-brand`:
 *
 *   white @50% (--color-on-dark-muted)   2.69:1   FAIL
 *   white @60%                           3.33:1   pass
 *   white @100% (--color-on-dark)        6.70:1   pass, shipped
 *
 * The screenshot's rule reads lighter than full white, but there is no token
 * between 50% and 100%, and adding one to land on 3.33:1 would spend a token to
 * buy a weaker boundary. Full white is the existing token and the safer value.
 *
 * [MEASURED] The error state does not change the rule's colour on brand.
 * `--color-error` on the brand fill measures 1.91:1 — worse than the white it
 * would replace, so signalling the error there would make the field *less*
 * visible. `aria-invalid` and the `role="alert"` message carry the state
 * instead, which "never signal state by colour alone" requires regardless.
 */

/**
 * Input types the page actually needs. `type` is not widened to the full HTML
 * set: each one changes the mobile keyboard and the validation behaviour, and
 * an unreviewed type is a UX decision nobody made.
 */
type InputType = "text" | "email" | "tel" | "url";

/**
 * Geometry shared by both treatments. `min-h-12` holds the 48px control height
 * on every surface — the screenshot's underline field is shorter than that, but
 * 44px is the project's touch-target floor and it is not negotiable against a
 * measurement.
 */
const BASE_CONTROL_CLASS =
  "min-h-12 w-full font-sans text-main focus-ring transition-standard placeholder:text-secondary";

const TONE_CONTROL_CLASS: Readonly<Record<Tone, string>> = {
  light:
    "rounded-sm border bg-surface-light px-fluid-3 py-fluid-2 text-ink disabled:bg-inactive-surface disabled:text-disabled-ink",
  dark: "border-b bg-transparent py-fluid-2 text-on-dark disabled:text-disabled-ink",
  brand:
    "border-b bg-transparent py-fluid-2 text-on-dark disabled:text-disabled-ink",
} as const;

/**
 * Border colour per surface and state. The light surface keeps its error red,
 * where the 3:1 non-text threshold is cleared; the brand surface keeps white,
 * for the reason measured above.
 */
const TONE_BORDER_CLASS: Readonly<
  Record<Tone, { readonly resting: string; readonly error: string }>
> = {
  light: { resting: "border-border-field", error: "border-error" },
  dark: { resting: "border-on-dark", error: "border-on-dark" },
  brand: { resting: "border-on-dark", error: "border-on-dark" },
} as const;

export type InputProps = {
  /** Must be unique on the page. Ties the label, control and messages together. */
  id: string;
  /** The surface this field sits on. Passed explicitly, never inferred. */
  tone: Tone;
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
  /**
   * Validation trigger. form rules: "Validation on blur and on submit, never on
   * every keystroke" — so there is a blur handler here and deliberately no
   * change handler.
   *
   * The event is passed through rather than swallowed so a caller can reach the
   * control and its `form` without holding a ref to either.
   */
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
