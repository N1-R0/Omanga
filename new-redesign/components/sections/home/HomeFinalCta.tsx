import { WALLET_URL } from "@/config/site";
import { CtaPanel } from "@/new-redesign/components/ui/CtaPanel";
import { href } from "@/new-redesign/config/routes";
import { homeFinalCta } from "@/new-redesign/content/home.content";

export function HomeFinalCta() {
  const { eyebrow, title, text, primary, secondary, texture, screen } = homeFinalCta;

  return (
    <CtaPanel
      id="final-cta"
      eyebrow={eyebrow}
      title={title}
      text={text}
      primary={{ label: primary.label, href: WALLET_URL, external: true }}
      secondary={{ label: secondary.label, href: href(secondary.path) }}
      texture={texture.src}
      screen={screen}
    />
  );
}
