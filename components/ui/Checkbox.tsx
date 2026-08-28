import { cx } from "@/lib/cx";
import { describedBy, fieldIds } from "@/lib/field-ids";
import type { Tone } from "@/types/ui.types";

/**
 * A single checkbox with its label beside it.
 *
 * [ADDED] The first checkbox in the system. The Contact page's § 4 needs one for
 * consent — "single, specific, unticked by default" — and there was no primitive
 * for it.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] It does not use `Field`.
 *
 * `Field` is "the label / control / description / error scaffold that every form
 * control sits inside", and its order is fixed: label above, then description,
 * then control, then error. A checkbox inverts the first two — the box comes
 * before its label, on the same line — so rendering one through `Field` would
 * mean a label floating above an unlabelled box with the real label nowhere.
 *
 * What `Field` actually owns is the accessibility wiring, and that is not
 * duplicated here: `fieldIds` and `describedBy` are the same functions, imported,
 * so the `aria-describedby` composition and the id derivation have one
 * implementation. What differs is only the visual order.
 *
 * The error message treatment is copied deliberately rather than shared —
 * `role="alert"`, ink on light and white on the two dark surfaces, for the
 * measured reason `Field` records: the error red fails AA for text.
 *
 * ---------------------------------------------------------------------------
 * [FIXED] The requirement note renders, beneath the label rather than inside it.
 *
 * It was omitted on the grounds that a consent label is a whole sentence and
 * appending "(required)" to a sentence reads as part of the sentence. That
 * reasoning holds for the *position* and not for the omission: form rules say
 * "required and optional state is stated in text, not by an unexplained symbol
 * alone", and leaving it out made this the one control on the form whose
 * requirement was visible to a screen reader and to nobody else.
 *
 * So the note is its own line under the sentence. Same words as every other
 * field, same secondary treatment, no asterisk anywhere.
 */

/**
 * `mt-0.5` sits the box on the first line's optical centre rather than its top
 * edge — the label wraps to two or three lines at narrow widths, and a box
 * aligned to the top of a multi-line sentence reads as belonging to nothing.
 *
 * `size-5` is 20px. Off the icon scale deliberately: 16 is too small a target to
 * hit and 24 overwhelms a body-size sentence. The 44px minimum is met by the
 * label, which is part of the control — clicking anywhere in the sentence toggles
 * the box.
 *
 * `accent-brand` colours the checked state with the one native property that
 * does, so the box stays the platform's own control. A custom-drawn box would
 * mean reimplementing focus, indeterminate state and forced-colours support.
 */
const BOX_CLASS =
  "mt-0.5 size-5 shrink-0 cursor-pointer accent-brand focus-ring";

const TONE_BOX_CLASS: Readonly<Record<Tone, string>> = {
  light: "text-ink",
  dark: "text-on-dark",
  brand: "text-on-dark",
} as const;

/** Measured in `Field`: ink is 18.1:1 on the page, white 6.70:1 on brand. */
const TONE_MESSAGE_CLASS: Readonly<Record<Tone, string>> = {
  light: "text-ink",
  dark: "text-on-dark",
  brand: "text-on-dark",
} as const;

export type CheckboxProps = {
  /** Must be unique on the page. Ties the label, control and messages together. */
  id: string;
  /** The surface this field sits on. Passed explicitly, never inferred. */
  tone: Tone;
  /** The `name` the Route Handler reads. Defaults to `id`. */
  name?: string;
  /** The full sentence the visitor is agreeing to. Always visible. */
  label: string;
  /**
   * The required/optional note, in words. Rendered beneath the sentence rather
   * than beside it — see the note above.
   */
  requirementNote: string;
  description?: string;
  /**
   * The validation message. Presence is what puts the field in its error state;
   * there is no separate `isInvalid` flag that could disagree with it.
   */
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
    <div className="flex flex-col gap-fluid-1">
      {/*
        The label wraps the row, so the box and the sentence are one target and
        `htmlFor` is not needed — a wrapping label is associated implicitly, and
        it cannot point at the wrong id.
      */}
      <label
        htmlFor={id}
        className={cx(
          "flex cursor-pointer items-start gap-fluid-2 font-sans text-small",
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

      {/*
        Outside the label, so the note is not read as part of the sentence the
        visitor is agreeing to — a `(required)` inside a consent statement changes
        what the statement appears to say.
      */}
      <p className="font-sans text-small text-secondary">({requirementNote})</p>

      {description !== undefined && (
        <p id={descriptionId} className="font-sans text-small text-secondary">
          {description}
        </p>
      )}

      {/*
        Announced when it appears. `role="alert"` rather than a polite region
        because a validation failure is the reason the submission did not go
        through. Rendered in the surface's foreground rather than the error red,
        which fails AA for text — the message carries the meaning.
      */}
      {hasError && (
        <p
          id={errorId}
          role="alert"
          className={cx("font-sans text-small", TONE_MESSAGE_CLASS[tone])}
        >
          {error}
        </p>
      )}
    </div>
  );
}
