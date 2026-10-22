import { CountryDirectory } from "@/new-redesign/components/sections/home/CountryDirectory";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { homeCountries } from "@/new-redesign/content/home.content";

/**
 * 7 · Countries (Wise "works nearly everywhere"; design system § Country
 * directory). Where the wallet works and the live rate pages, as a tabbed
 * directory of links.
 */
export function HomeCountries() {
  const { eyebrow, title, sub } = homeCountries;
  return (
    <Section id="countries" label={title}>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <CountryDirectory />
    </Section>
  );
}
