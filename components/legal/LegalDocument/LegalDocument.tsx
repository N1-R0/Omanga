import { Container } from "@/components/layout/Container";
import { LegalBlock } from "@/components/legal/LegalBlock";
import { LegalContents } from "@/components/legal/LegalContents";
import type { LegalDocumentContent } from "@/types/legal.types";

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
    <article className="bg-bg text-text  section-y">
      <Container>
        <div className="flex flex-col gap-16">
          <header className="flex flex-col gap-4">
            <p className="font-sans type-h3 text-accent-text">{content.eyebrow}</p>

            <h1 className="font-sans type-h1 max-w-[30ch]">
              {content.title}
            </h1>

            <p className="font-sans type-p1 opacity-80 max-w-[70ch]">
              {content.summary}
            </p>

            <p className="font-sans type-p2 opacity-80">
              Effective from{" "}
              <time dateTime={content.effectiveDate}>
                {effective.toLocaleDateString("en-GB", DATE_FORMAT)}
              </time>
            </p>
          </header>

          {content.intro !== undefined && (
            <div className="flex flex-col gap-6">
              {content.intro.map((block, index) => (
                <LegalBlock key={index} block={block} />
              ))}
            </div>
          )}

          <LegalContents sections={content.sections} />

          <div className="flex flex-col gap-12">
            {content.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="flex scroll-mt-19 flex-col gap-6"
              >
                <h2
                  id={`${section.id}-heading`}
                  className="font-sans type-h3 max-w-[30ch]"
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
                    className="flex scroll-mt-19 flex-col gap-4"
                  >
                    <h3
                      id={`${subsection.id}-heading`}
                      className="font-sans type-h3 max-w-[30ch]"
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
