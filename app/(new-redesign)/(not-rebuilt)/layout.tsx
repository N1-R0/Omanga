/**
 * The pages not yet rebuilt in the new design (2026-10-26): plans,
 * safety, contact, blog, rates and the legal pages. Their sections were moved
 * onto the new design system's tokens and they share the new FAQ and closing
 * panel; each page's own sections are redesigned one at a time, and a page
 * moves out of this group when it is rebuilt.
 *
 * The header is absolute over the page top. The rebuilt pages' heroes pad
 * themselves for it; these pages start below it instead.
 */
export default function NotRebuiltLayout({ children }: { children: React.ReactNode }) {
  return <div className="pt-19">{children}</div>;
}
