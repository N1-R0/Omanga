import { getNgnRates } from "@/lib/rates";
import { FeatureAccordion } from "@/new-redesign/components/sections/home/FeatureAccordion";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { homeFeatures } from "@/new-redesign/content/home.content";

/**
 * 3 · What Omanga does (img 2): the product section. The section header,
 * then five accordion rows beside an app screen that changes with the open
 * row. The rate comes from the same hourly snapshot as the hero converter.
 */
export async function HomeFeatures() {
  const { rates } = await getNgnRates();
  const { eyebrow, title, sub } = homeFeatures;

  return (
    <Section id="what-omanga-does" label={eyebrow}>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <FeatureAccordion gbpToNgn={rates.GBP} />
    </Section>
  );
}
