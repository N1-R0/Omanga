/**
 * Conditional class name joiner.
 *
 * Deliberately tiny and dependency-free. Its only job is to let a variant map
 * be composed with a conditional class without producing `undefined` or
 * `false` in the rendered attribute.
 *
 * This is not a class merger. It does not resolve Tailwind conflicts, because
 * conflicts should not arise: primitives own their own classes and take no
 * `className` passthrough (component-rules.md § Props philosophy). If two
 * classes ever fight, the variant map is wrong, and a merge utility would hide
 * that rather than surface it.
 */
export function cx(
  ...values: ReadonlyArray<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}
