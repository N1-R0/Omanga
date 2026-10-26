import { WHATSAPP_URL } from "@/config/site";
import { FaqList } from "@/new-redesign/components/sections/home/FaqList";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";

/**
 * FAQ section (design system § FAQ): the home FAQ's UI with each page's own
 * questions. Home, Payments and Insurance share it (owner, 2026-10-26: reuse the
 * Payments UI). The sub ends with a WhatsApp link. `id="faq"` is where the
 * footer's Fees link lands. Each page emits its questions as FAQPage
 * structured data (new-redesign/content/seo.content.ts).
 */
type Props = {
  eyebrow: string;
  title: string;
  subLead: string;
  subLink: string;
  subTail: string;
  items: ReadonlyArray<{ q: string; a: string }>;
};

export function FaqSection({ eyebrow, title, subLead, subLink, subTail, items }: Props) {
  return (
    <Section id="faq" label={title}>
      <SectionHead
        eyebrow={eyebrow}
        title={title}
        sub={
          <>
            {subLead}{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-accent-text underline underline-offset-4">
              {subLink}
            </a>{" "}
            {subTail}
          </>
        }
      />
      <FaqList items={items} />
    </Section>
  );
}
