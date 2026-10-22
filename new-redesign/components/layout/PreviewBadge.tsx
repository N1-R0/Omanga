/**
 * A small fixed label so a /new page is never mistaken for the live site in a
 * screenshot or a shared link. It has no link back to the live site because
 * that would be a full page load (separate root layouts). Delete at cutover.
 */
export function PreviewBadge() {
  return (
    <div
      role="note"
      className="type-p3 fixed right-4 bottom-4 z-30 rounded-md bg-surface-inverse px-3 py-2 text-text-inverse shadow-float"
    >
      Redesign preview
    </div>
  );
}
