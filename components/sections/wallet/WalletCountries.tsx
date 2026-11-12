import { CountryGlobe } from "@/components/sections/wallet/CountryGlobe";
import { SectionHead } from "@/components/ui/SectionHead";
import { href } from "@/config/routes";
import { walletCountries } from "@/content/wallet.content";

export function WalletCountries() {
  const { eyebrow, title, sub, listLabel, countries, cta } = walletCountries;

  return (
    <section id="countries" aria-label={eyebrow} className="section-y bg-surface">
      <div className="container-page">
        <SectionHead title={title} sub={sub} />
        <CountryGlobe countries={countries} listLabel={listLabel} cta={{ label: cta.label, href: href(cta.path) }} />
      </div>
    </section>
  );
}
