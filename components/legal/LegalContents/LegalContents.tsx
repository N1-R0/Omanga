import type { LegalSection } from "@/types/legal.types";

/**
 * The in-page table of contents.
 *
 * These documents run to fifteen or more sections, and a reader almost never
 * wants all of them — they want the one about their rights, or the one about
 * cancelling. Without this they scroll and hunt.
 *
 * A `<nav>` with its own accessible name, so it is a landmark a screen-reader
 * user can jump to and skip past, rather than a list of links they have to read
 * through before reaching the document. Subsections are deliberately omitted:
 * a two-level contents list for a fifteen-section document is longer than the
 * first section it points at, and the section links reach the same place.
 *
 * Ordinary in-page anchors, so it works with JavaScript disabled and every link
 * can be copied and sent. `scroll-mt-header` on the targets handles the fixed
 * header; see `LegalDocument`.
 */

export type LegalContentsProps = {
  sections: readonly LegalSection[];
};

export function LegalContents({ sections }: LegalContentsProps) {
  return (
    <nav
      aria-labelledby="legal-contents-heading"
      className="flex flex-col gap-4 border-y border-border py-6"
    >
      <h2
        id="legal-contents-heading"
        className="font-sans type-h3 opacity-80"
      >
        On this page
      </h2>

      <ol className="grid gap-3 md:grid-cols-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              data-underline
              className="font-sans type-p1 text-accent-text  transition duration-[var(--duration-fast)] ease-standard hover:text-accent-hover"
            >
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
