import { CountryGlobe } from "@/new-redesign/components/sections/wallet/CountryGlobe";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { href } from "@/new-redesign/config/routes";
import { walletCountries } from "@/new-redesign/content/wallet.content";

/**
 * 7 · Countries, after Cartesia's globe + list (owner, 2026-10-22): the
 * section header, then the globe and list (design system § Country globe).
 * The whole section is a full-width white band with no card (owner,
 * 2026-10-23), so it breaks from the page grey the way the proof strip does.
 */
export function WalletCountries() {
  const { eyebrow, title, sub, listLabel, countries, cta } = walletCountries;

  return (
    <section id="countries" aria-label={eyebrow} className="section-y bg-surface">
      <div className="container-page">
        <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
        <CountryGlobe countries={countries} listLabel={listLabel} cta={{ label: cta.label, href: href(cta.path) }} />
      </div>
    </section>
  );
}
