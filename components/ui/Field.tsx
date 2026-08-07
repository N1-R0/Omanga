import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import { fieldIds } from "@/lib/field-ids";
import type { Tone } from "@/types/ui.types";

/**
 * The label / control / description / error scaffold that every form control
 * sits inside.
 *
 * form rules: "One field primitive per input type, each pairing label,
 * control, description, and error in a fixed order." This component is that
 * fixed order, shared by `Input` and `Textarea` now and by `Select` when the
 * enquiry form needs one.
 *
 * Extracted at the second occurrence rather than the third, deliberately. The
 * usual reason to wait is that a shared shape is not yet clear — but this
 * shape is specified, and what is being shared is accessibility wiring, not
 * appearance. Two copies of `aria-describedby` composition is two chances for
 * a silent screen-reader failure that no visual review would catch.
 *
 * Field renders no control of its own. It does not know what it wraps.
 *
 * ---------------------------------------------------------------------------
 * [ADDED] A `tone` axis, because the enquiry form sits on the brand band.
 *
 * `tone` is the system's established "surface a component is being rendered
 * onto" union, passed explicitly and never inferred, exactly as `Button` and
 * `Badge` take it. Only the two surfaces that exist for a form today are
 * mapped; `dark` reuses the brand treatment because both are light-on-dark and
 * neither has a second measurement behind it yet.
 *
 * The error message is the reason this axis has to reach `Field` rather than
 * stopping at the control. The message ships in `--color-ink` on the light
 * surface — a deliberate choice, since the error red fails AA for text — and ink
 * on the brand fill measures 2.66:1, which fails outright. On brand the message
 * is white at 6.70:1.
 */

export type FieldProps = {
  /** Must match the control's `id`. The label's `htmlFor` points at it. */
  id: string;
  /** The surface this field sits on. Passed explicitly, never inferred. */
  tone: Tone;
  /**
   * Always visible, always associated. A placeholder never substitutes for a
   * label, which is why there is no "hide label" option here.
   */
  label: string;
  /**
   * The required/optional note, rendered beside the label in words.
   *
   * form rules: "Required and optional state is stated in text, not by an
   * unexplained symbol alone." No asterisk, and no `isRequired` boolean here —
   * the `required` attribute belongs on the control, and duplicating it as a
   * second prop would let the note and the attribute disagree.
   *
   * The wording is user-facing copy, so it comes from a content module.
   */
  requirementNote: string;
  /** Guidance shown beneath the label. Not an example — that is a placeholder. */
  description?: string;
  /**
   * The validation message. Presence is what puts the field in its error
   * state; there is no separate `isInvalid` flag that could disagree with it.
   */
  error?: string;
  /** The control itself. */
  children: ReactNode;
};

/**
 * Message colour per surface.
 *
 * Measured against each fill: ink on `--color-surface-page` is 18.1:1, white on
 * `--color-brand` is 6.70:1. Both clear AA for text.
 */
const TONE_MESSAGE_CLASS: Readonly<Record<Tone, string>> = {
  light: "text-ink",
  dark: "text-on-dark",
  brand: "text-on-dark",
} as const;

export function Field({
  id,
  tone,
  label,
  requirementNote,
  description,
  error,
  children,
}: FieldProps) {
  const { descriptionId, errorId } = fieldIds(id);

  return (
    <div className="flex flex-col gap-fluid-1">
      <label htmlFor={id} className="font-sans text-small">
        {label}{" "}
        <span className="text-secondary">({requirementNote})</span>
      </label>

      {description !== undefined && (
        <p id={descriptionId} className="font-sans text-small text-secondary">
          {description}
        </p>
      )}

      {children}

      {/*
        The error is announced when it appears. `role="alert"` rather than a
        polite region because a validation failure is the reason the user's
        submission did not go through, and they need it immediately.

        Rendered in --color-ink, not --color-error. The error red measures
        3.55:1 on the page surface and fails AA for text; it is used on the
        field border, where the 3:1 UI threshold applies and it passes. The
        message text itself carries the meaning, so nothing is lost.
      */}
      {error !== undefined && (
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
