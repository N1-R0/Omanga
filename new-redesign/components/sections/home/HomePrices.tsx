import { PlanCards } from "@/new-redesign/components/sections/home/PlanCards";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { homePrices } from "@/new-redesign/content/home.content";

/**
 * 5 · Health cover prices (pricing reference; design system § Plan cards).
 * It follows step 3 of "Sorted before you land" ("Pick your cover").
 */
export function HomePrices() {
  const { eyebrow, title, sub } = homePrices;
  return (
    <Section id="prices" label={eyebrow}>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <PlanCards />
    </Section>
  );
}
