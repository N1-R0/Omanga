import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/config/site";
import { buildFaqPage, buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { FaqList } from "@/components/sections/home/FaqList";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { help } from "@/content/help.content";

export const metadata: Metadata = buildPageMetadata(help.meta);

export default function HelpPage() {
  const faqItems = help.topics.flatMap((t) => t.items.map((i) => ({ question: i.q, answer: i.a })));

  return (
    <>
      <JsonLd
        graph={buildPageGraph(help.meta, {
          crumb: "Help and FAQs",
          nodes: [buildFaqPage(help.meta, faqItems)],
        })}
      />

      <section aria-labelledby="help-heading" className="-mt-19 bg-surface pt-19">
        <div className="container-page flex flex-col items-start py-12 md:py-16 lg:py-20">
          <h1 id="help-heading" className="type-h1 mt-5 max-w-[16ch] text-balance">
            {help.heading}
          </h1>
          <p className="type-p1 mt-5 text-text-secondary">{help.sub}</p>
          <nav aria-label="Help topics" className="mt-8">
            <ul className="flex flex-wrap gap-3">
              {help.topics.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="type-p3 inline-flex min-h-11 items-center rounded-full border border-border-strong px-5 transition-colors hover:bg-surface-muted"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {help.topics.map((t) => (
        <Section key={t.id} id={t.id} label={t.label}>
          <SectionHead title={t.label} />
          <FaqList items={t.items} />
        </Section>
      ))}

      <section aria-labelledby="help-closing" className="section-y">
        <div className="container-page">
          <div className="flex flex-col items-start gap-6 rounded-[16px] bg-surface-muted p-6 md:p-10">
            <div className="flex flex-col gap-3">
              <h2 id="help-closing" className="type-h2">
                {help.closing.title}
              </h2>
              <p className="type-p1 text-text-secondary">{help.closing.text}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={WHATSAPP_URL} external>
                {help.closing.whatsapp}
              </Button>
              <Button href={`mailto:${CONTACT_EMAIL}`} variant="secondary">
                {help.closing.email}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
