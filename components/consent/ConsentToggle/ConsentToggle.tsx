"use client";

import { cx } from "@/lib/cx";
import { fieldIds } from "@/lib/field-ids";
import type { ConsentCategoryCopy } from "@/content/consent.content";

/**
 * One category row in the preferences dialog.
 *
 * A controlled checkbox rather than `components/ui/Checkbox`, which is
 * uncontrolled by design — it takes `defaultChecked` and exposes no `onChange`,
 * because every form it serves reads its values from `FormData` on submit. This
 * dialog has no form and no submit event: the buttons above and below it need to
 * flip every row at once, which only a controlled input can do.
 *
 * Adding an `onChange` and a `checked` to the shared component to serve one
 * caller would change the type every existing form field is built against, so
 * the row is local instead.
 *
 * The locked row renders no input at all. A disabled checked box is the usual
 * way this is done and it is worse in two ways: it is unreachable by keyboard,
 * so a screen-reader user tabbing the dialog never learns the category exists,
 * and a disabled control still reads as something that was meant to be operable.
 * A short "Always on" is the accurate description of a thing with no choice
 * attached, and it stays in the reading order.
 */

export type ConsentToggleProps = {
  copy: ConsentCategoryCopy;
  isChecked: boolean;
  isLocked?: boolean;
  onChange?: (isChecked: boolean) => void;
};

const ROW_CLASS =
  "flex flex-col gap-fluid-1 border-t border-border-hairline pt-fluid-3";

export function ConsentToggle({
  copy,
  isChecked,
  isLocked = false,
  onChange,
}: ConsentToggleProps) {
  const inputId = `consent-${copy.id}`;
  const { descriptionId } = fieldIds(inputId);

  return (
    <div className={ROW_CLASS}>
      <div className="flex items-start justify-between gap-fluid-3">
        {isLocked ? (
          <>
            <span className="font-sans text-h6 text-ink">{copy.title}</span>
            <span className="shrink-0 font-sans text-small text-secondary">
              {copy.lockedNote}
            </span>
          </>
        ) : (
          <label
            htmlFor={inputId}
            className="flex w-full cursor-pointer items-start justify-between gap-fluid-3"
          >
            <span className="font-sans text-h6 text-ink">{copy.title}</span>
            <input
              id={inputId}
              type="checkbox"
              checked={isChecked}
              aria-describedby={descriptionId}
              onChange={(event) => {
                onChange?.(event.target.checked);
              }}
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand focus-ring"
            />
          </label>
        )}
      </div>

      <p id={descriptionId} className="font-sans text-small text-secondary">
        {copy.description}
        {copy.consequence !== undefined && (
          <span className={cx("block", "mt-fluid-1")}>{copy.consequence}</span>
        )}
      </p>
    </div>
  );
}
