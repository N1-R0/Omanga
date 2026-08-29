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
      className="flex flex-col gap-fluid-3 border-y border-border-hairline py-fluid-4"
    >
      <h2
        id="legal-contents-heading"
        className="font-sans text-h6 text-secondary"
      >
        On this page
      </h2>

      <ol className="grid gap-fluid-2 tablet:grid-cols-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              data-underline
              className="font-sans text-main text-brand focus-ring transition-standard hover:text-brand-hover"
            >
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
