import { CountryDirectory } from "@/components/sections/home/CountryDirectory";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { homeCountries } from "@/content/home.content";

export function HomeCountries() {
  const { title, sub } = homeCountries;
  return (
    <Section id="countries" label={title}>
      <SectionHead title={title} sub={sub} />
      <CountryDirectory />
    </Section>
  );
}
