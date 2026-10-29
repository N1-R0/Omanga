import { CountryGlobe } from "@/new-redesign/components/sections/wallet/CountryGlobe";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { href } from "@/new-redesign/config/routes";
import { walletCountries } from "@/new-redesign/content/wallet.content";

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
