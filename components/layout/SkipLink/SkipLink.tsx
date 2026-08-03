/**
 * Skip to main content.
 *
 * coding-guidelines.md: "Landmarks: one `header`, one `main`, one `footer`, one
 * `nav`. Skip link first in tab order." It is first in tab order because it is
 * the first focusable element in the document — not because of a `tabindex`,
 * which is the usual way this gets broken.
 *
 * Hidden by being translated out of the viewport rather than by the
 * `visually-hidden` utility. That matters: `visually-hidden` clips the element
 * to a 1px box, so revealing it on focus would mean undoing a clip path, a
 * margin and an overflow — none of which has a token, so all three would have
 * to be arbitrary values in markup. A transform needs none of that, is the one
 * property class the motion rules allow, and leaves the link fully focusable
 * and announced the whole time it is off-screen.
 *
 * `z-skip-link` is the top rung of the layer ladder for one reason: a skip link
 * that appears behind the sticky header is a skip link nobody can use.
 *
 * A plain `a`, not `next/link` — this is a same-document fragment jump, so
 * there is no route to prefetch and nothing for the router to intercept.
 */

export type SkipLinkProps = {
  /** Visible label. Comes from a content module like every other string. */
  label: string;
  /** The id of the `main` landmark. A prop, so the layout owns the id. */
  targetId: string;
};

export function SkipLink({ label, targetId }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="
        fixed top-0 left-4 z-skip-link inline-flex items-center
        -translate-y-full focus-visible:translate-y-4
        rounded-pill bg-brand px-5 py-3
        font-ui text-ui text-on-dark
        hit-area focus-ring transition-emphasis
      "
    >
      {label}
    </a>
  );
}
