import { getNgnRates } from "@/lib/rates";
import { FeatureScreen } from "@/new-redesign/components/sections/home/FeatureScreen";
import { PhotoCard } from "@/new-redesign/components/ui/Card";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { homeSteps } from "@/new-redesign/content/home.content";

/**
 * 4 · Sorted before you land (img 4; design system § Step cards).
 *
 * Three photo cards, 24px apart, stacked below 1024 (at 768 a third of the
 * column is too narrow for the app screens). One texture (U2) runs
 * across all three: each card shows its third, as the reference does with a
 * single landscape. Each image holds that step's app screen in the glass
 * frame. The add-money screen uses today's GBP rate, so it matches the hero.
 */
export async function HomeSteps() {
  const { rates } = await getNgnRates();
  const { eyebrow, title, sub, steps, texture } = homeSteps;

  return (
    <Section id="steps" label={title}>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <ol className="grid grid-gap-wide lg:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title}>
            <PhotoCard
              image={texture}
              title={step.title}
              text={step.text}
              // Sliced: each card draws the image at three times its own width.
              sizes="(min-width: 1024px) 1080px, 300vw"
              slice={{ index: i, of: steps.length }}
              className="h-full"
              overlay={
                <span className="absolute inset-0 flex items-center justify-center p-4">
                  <span className="glass block w-[82%] max-w-[280px]">
                    <FeatureScreen screen={step.screen} gbpToNgn={rates.GBP} />
                  </span>
                </span>
              }
            />
          </li>
        ))}
      </ol>
    </Section>
  );
}
