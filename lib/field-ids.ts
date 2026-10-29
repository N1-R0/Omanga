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
