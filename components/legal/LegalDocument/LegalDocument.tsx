import { Container } from "@/components/layout/Container";
import { LegalBlock } from "@/components/legal/LegalBlock";
import { LegalContents } from "@/components/legal/LegalContents";
import type { LegalDocumentContent } from "@/types/legal.types";

/**
 * Renders a legal document.
 *
 * One component for all five, so they cannot drift apart in typography, heading
 * levels, link styling or spacing. It has no per-document branch of any kind: a
 * document differs from another only in its content module.
 *
 * ---------------------------------------------------------------------------
 * HEADING STRUCTURE
 *
 * `h1` is the document title, section headings are `h2`, subsection headings are
 * `h3`, and no level is skipped. Each section is a `<section>` labelled by its own
 * heading, so a screen reader's landmark and heading lists are both a usable
 * table of contents.
 *
 * Section ids come from the content module rather than being generated, which is
 * what makes `/privacy-policy#your-rights` a stable, linkable address. Generated
 * ids would change whenever a section was inserted, silently breaking every link
 * anyone had saved or sent — and these are documents that get linked to in
 * correspondence.
 *
 * ---------------------------------------------------------------------------
 * MEASURE
 *
 * Body text is held to `measure-body` by the block renderer rather than by a
 * width on this container, because the cookie table has to be free to scroll
 * wider than the prose column. Constraining the whole document would either
 * squeeze the table or widen the prose past a readable line length.
 */

export type LegalDocumentProps = {
  content: LegalDocumentContent;
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export function LegalDocument({ content }: LegalDocumentProps) {
  const effective = new Date(content.effectiveDate);

  return (
    <article className="bg-surface-page text-ink focus-ring-on-light section-rhythm">
      <Container>
        <div className="flex flex-col gap-fluid-8">
          <header className="flex flex-col gap-fluid-3">
            <p className="font-sans text-h6 text-brand">{content.eyebrow}</p>

            <h1 className="font-sans text-h1 measure-heading">
              {content.title}
            </h1>

            <p className="font-sans text-large text-secondary measure-body">
              {content.summary}
            </p>

            {/*
              A `<time>` with a machine-readable `dateTime`, so the date is
              unambiguous to anything parsing the page. The visible form is
              rendered in `en-GB` explicitly rather than from the visitor's
              locale: a legal effective date read as 08/28 in one country and
              28/08 in another is the kind of ambiguity this page exists to avoid.
            */}
            <p className="font-sans text-small text-secondary">
              Effective from{" "}
              <time dateTime={content.effectiveDate}>
                {effective.toLocaleDateString("en-GB", DATE_FORMAT)}
              </time>
            </p>
          </header>

          {content.intro !== undefined && (
            <div className="flex flex-col gap-fluid-4">
              {content.intro.map((block, index) => (
                <LegalBlock key={index} block={block} />
              ))}
            </div>
          )}

          <LegalContents sections={content.sections} />

          <div className="flex flex-col gap-fluid-7">
            {content.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                /*
                  `scroll-mt-header` clears the fixed header when an in-page link
                  jumps here. Without it the heading lands underneath the bar and
                  the reader arrives looking at the paragraph below it.
                */
                className="flex scroll-mt-header flex-col gap-fluid-4"
              >
                <h2
                  id={`${section.id}-heading`}
                  className="font-sans text-h3 measure-heading"
                >
                  {section.heading}
                </h2>

                {section.blocks.map((block, index) => (
                  <LegalBlock key={index} block={block} />
                ))}

                {section.subsections?.map((subsection) => (
                  <section
                    key={subsection.id}
                    id={subsection.id}
                    aria-labelledby={`${subsection.id}-heading`}
                    className="flex scroll-mt-header flex-col gap-fluid-3"
                  >
                    <h3
                      id={`${subsection.id}-heading`}
                      className="font-sans text-h5 measure-heading"
                    >
                      {subsection.heading}
                    </h3>

                    {subsection.blocks.map((block, index) => (
                      <LegalBlock key={index} block={block} />
                    ))}
                  </section>
                ))}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
