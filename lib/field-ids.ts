/**
 * Deterministic ids for a form field's description and error message.
 *
 * The control and its `Field` wrapper both need these strings, and they must
 * match exactly or `aria-describedby` points at nothing. Deriving them from
 * the field id in one function is what makes that impossible to get wrong.
 */

export type FieldIds = {
  readonly descriptionId: string;
  readonly errorId: string;
};

export function fieldIds(id: string): FieldIds {
  return {
    descriptionId: `${id}-description`,
    errorId: `${id}-error`,
  };
}

/**
 * The `aria-describedby` value for a control.
 *
 * The error is listed after the description so a screen reader reads the
 * guidance first and the failure last, which is the order the user needs.
 * Returns `undefined` rather than an empty string when there is nothing to
 * describe — an empty `aria-describedby` is a validity error.
 */
export function describedBy(
  id: string,
  state: { readonly hasDescription: boolean; readonly hasError: boolean },
): string | undefined {
  const { descriptionId, errorId } = fieldIds(id);

  const ids = [
    state.hasDescription ? descriptionId : undefined,
    state.hasError ? errorId : undefined,
  ].filter(Boolean);

  return ids.length > 0 ? ids.join(" ") : undefined;
}
