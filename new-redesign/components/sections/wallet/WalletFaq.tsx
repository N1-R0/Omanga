import { WHATSAPP_URL } from "@/config/site";
import { FaqList } from "@/new-redesign/components/sections/home/FaqList";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { walletFaq } from "@/new-redesign/content/wallet.content";

/**
 * 11 · FAQ (design system § FAQ), the home FAQ's UI with the wallet's own
 * questions (owner, 2026-10-23). `id="faq"` is where the footer's Fees link
 * lands. No FAQPage schema while /new is noindex, as on home.
 */
export function WalletFaq() {
  const { eyebrow, title, subLead, subLink, subTail, items } = walletFaq;

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
