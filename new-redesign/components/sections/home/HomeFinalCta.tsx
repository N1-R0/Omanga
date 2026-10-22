import { WALLET_URL } from "@/config/site";
import { CtaPanel } from "@/new-redesign/components/ui/CtaPanel";
import { href } from "@/new-redesign/config/routes";
import { homeFinalCta } from "@/new-redesign/content/home.content";

/**
 * 9 · Final CTA (img 6; design system § Final CTA and footer), after Asset's
 * CTA: the shared CTA panel with the closing line, the one primary action,
 * and the G1 aurora panel with the app's home screen in the glass frame.
 */
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
