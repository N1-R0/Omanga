import type { LegalSection } from "@/types/legal.types";

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
