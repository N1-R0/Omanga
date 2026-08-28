import { cx } from "@/lib/cx";
import { describedBy, fieldIds } from "@/lib/field-ids";
import type { Tone } from "@/types/ui.types";

/**
 * A group of mutually exclusive choices.
 *
 * [ADDED] The first radio group in the system. The Contact page's § 4 needs one
 * for "Are you already an Omanga customer? · Yes · No · Not sure", which it calls
 * "the highest-value routing signal on the form".
 *
 * ---------------------------------------------------------------------------
 * [DECISION] `fieldset` and `legend`, not `Field`.
 *
 * `Field` renders `<label htmlFor={id}>`, and a group of radios has no single
 * control for a label to point at — pointing it at the first radio would name
 * that option "Are you already an Omanga customer?" and leave the group itself
 * unnamed. `fieldset` with a `legend` is the one construct that names a set of
 * controls, and every screen reader announces the legend when focus enters the
 * group.
 *
 * The accessibility wiring is still shared, not reimplemented: `fieldIds` and
 * `describedBy` are the same imports `Field`, `Input` and `Checkbox` use, so the
 * `aria-describedby` composition has one implementation.
 *
 * [FIXED] The container carries `role="radiogroup"`, and that is what makes
 * `aria-invalid` legitimate here.
 *
 * A bare `fieldset` maps to `role="group"`, which does not support
 * `aria-invalid` — global use of it was removed in ARIA 1.2 — so the invalid
 * state was being set on a role that ignores it. Moving it onto each
 * `input type="radio"` is no better: `radio` does not support it either. The one
 * role in the pattern that does is `radiogroup`, so the fieldset declares it.
 *
 * The name is pinned with `aria-labelledby` rather than left to the legend.
 * Overriding a `fieldset`'s implicit role means its legend-to-name mapping is no
 * longer guaranteed, so the legend gets an id and the group points at it — the
 * native pairing still works when ARIA is ignored, and the explicit one works
 * when the role is honoured.
 *
 * The error treatment matches `Field`'s exactly, for the measured reason recorded
 * there: the error red fails AA for text, so the message ships in the surface's
 * own foreground and the words carry the meaning.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Nothing is checked by default, and there is no way to ask for one.
 *
 * `defaultValue` is deliberately absent. § 4 requires the enquiry type's "default
 * state must be an unselected prompt, not a pre-chosen category", and the same
 * reasoning holds harder for a routing question: a pre-selected "Yes" is a claim
 * the visitor did not make, and it is indistinguishable in the submitted data
 * from one they did.
 *
 * `fieldset` also carries no default margin or padding here — browsers give it
 * both, and the reset does not — so the spacing comes from the layout like every
 * other control's.
 */

const TONE_LABEL_CLASS: Readonly<Record<Tone, string>> = {
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

/**
 * `size-5` is 20px, matching `Checkbox` — the two appear on the same form and a
 * radio smaller than the checkbox beside it reads as a different kind of control.
 *
 * `accent-brand` colours the selected state with the one native property that
 * does, so these stay the platform's own controls: focus, arrow-key navigation
 * and forced-colours support all come for free, and a custom-drawn radio would
 * mean reimplementing all three.
 */
const RADIO_CLASS = "size-5 shrink-0 cursor-pointer accent-brand focus-ring";

export type RadioOption = {
  readonly value: string;
  readonly label: string;
};

export type RadioGroupProps = {
  /** Names the group. Each radio's own id is derived from it. */
  id: string;
  /** The surface this field sits on. Passed explicitly, never inferred. */
  tone: Tone;
  /** The `name` every radio in the group shares, and what the server reads. */
  name?: string;
  /** The group's question. Rendered as the `legend`. */
  label: string;
  /** Stated in words beside the legend, never as a bare asterisk. */
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
      /*
        The id is on the fieldset so the error summary can link to the group and
        move focus to it, which is what puts a keyboard user at the question rather
        than at one arbitrary option.
      */
      id={id}
      /*
        `radiogroup` rather than the implicit `group`: it is the only role in this
        pattern that supports `aria-invalid`. See the note above.
      */
      role="radiogroup"
      aria-labelledby={legendId}
      aria-invalid={hasError || undefined}
      aria-describedby={describedBy(id, {
        hasDescription: description !== undefined,
        hasError,
      })}
      /*
        [FIXED] A `fieldset` is not focusable, so an error summary linking to
        `#{id}` scrolled the group into view and left focus on the summary link.
        `tabIndex={-1}` makes it a focus target without putting it in the tab
        order, which is what lets the link actually move a keyboard user to the
        question rather than near it. The same wiring the layout's `main` landmark
        needs for its skip link, for the same reason.
      */
      tabIndex={-1}
      disabled={isDisabled}
      className="m-0 flex min-w-0 flex-col gap-fluid-1 border-0 p-0 focus-ring"
    >
      {/*
        `legend` rather than a styled `div` with `aria-labelledby`. It is the only
        element that names a fieldset natively, and the native pairing is what
        works when CSS fails to load.
      */}
      <legend
        id={legendId}
        className={cx("font-sans text-small", TONE_LABEL_CLASS[tone])}
      >
        {label} <span className="text-secondary">({requirementNote})</span>
      </legend>

      {description !== undefined && (
        <p id={descriptionId} className="font-sans text-small text-secondary">
          {description}
        </p>
      )}

      {/*
        A row that wraps. Three short labels sit on one line at any sensible
        width, and wrapping rather than stacking keeps the group reading as one
        question. `gap-fluid-4` between options and `gap-fluid-2` inside each
        pairing is the system's "adjacent controls" and "icon to label" pair.
      */}
      <div className="flex flex-wrap gap-fluid-4 pt-fluid-1">
        {options.map((option) => {
          const optionId = `${id}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cx(
                "flex cursor-pointer items-center gap-fluid-2 font-sans text-small",
                TONE_LABEL_CLASS[tone],
              )}
            >
              <input
                id={optionId}
                name={groupName}
                type="radio"
                value={option.value}
                /*
                  `required` on every radio in the group, which is how the
                  attribute works for radios: the browser treats the group as
                  satisfied when any one of them is checked. Setting it on only
                  the first would be the same behaviour with a less obvious
                  reason, and setting it on none would lose the native state
                  assistive technology reads.
                */
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
          className={cx("font-sans text-small", TONE_MESSAGE_CLASS[tone])}
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}
