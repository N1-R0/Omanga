import { WHATSAPP_URL } from "@/config/site";
import { FaqList } from "@/new-redesign/components/sections/home/FaqList";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { homeFaq } from "@/new-redesign/content/home.content";

/**
 * 8 · FAQ (img 6; design system § FAQ). Eight approved questions in two
 * columns, with WhatsApp as the way out for anything not answered here.
 *
 * No FAQPage schema while /new is noindex; it gets added at cutover with the
 * live site's schema helpers (lib/schema.ts).
 */
export function HomeFaq() {
  const { eyebrow, title, subLead, subLink, subTail, items } = homeFaq;

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
