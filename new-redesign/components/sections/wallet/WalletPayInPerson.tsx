import { WalkthroughPlayer } from "@/new-redesign/components/sections/wallet/WalkthroughPlayer";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { navigation } from "@/new-redesign/content/navigation.content";
import { walletPayInPerson } from "@/new-redesign/content/wallet.content";

/**
 * 4 · How you pay in person, after the owner's wireframe (2026-10-22): the
 * section header, then the phone walkthrough (design system § Phone
 * walkthrough). The clips are real app screens on placeholder data.
 */
export function WalletPayInPerson() {
  const { eyebrow, title, sub, steps, cta } = walletPayInPerson;

  return (
    <Section id="pay-in-person" label={eyebrow}>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <WalkthroughPlayer steps={steps} label={title} cta={{ label: cta.label, href: navigation.cta.href }} />
    </Section>
  );
}
