import { getNgnRates } from "@/lib/rates";
import { PhotoCard } from "@/new-redesign/components/ui/Card";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { homeSteps } from "@/new-redesign/content/home.content";

/**
 * 4 · Three steps at home before you fly (design system § Step cards).
 *
 * Three photo cards, 24px apart, stacked below 1024. Each card has its own
 * photo (owner reference, 2026-10-23) with a compact app card in the glass
 * frame over the photo's lower half: a bold title with a muted meta on the
 * right, a rule, then one label/value row. The add-money card shows £200 at
 * today's GBP rate, so it matches the hero.
 */
const naira = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });

export async function HomeSteps() {
  const { rates } = await getNgnRates();
  const { eyebrow, title, sub, steps, addAmount } = homeSteps;

  return (
    <Section id="steps" label={title}>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <ol className="grid grid-gap-wide lg:grid-cols-3">
        {steps.map((step) => {
          const { card } = step;
          const value = card.value ?? `₦${naira.format(addAmount * rates.GBP)}`;
          return (
            <li key={step.title}>
              <PhotoCard
                image={step.image}
                title={step.title}
                text={step.text}
                sizes="(min-width: 1024px) 344px, 100vw"
                imageClassName="h-[300px]"
                objectPosition={step.image.position}
                className="h-full"
                overlay={
                  <span className="absolute inset-x-[5%] bottom-[7%]">
                    <span className="glass block">
                      <span className="block rounded-md bg-surface px-4 py-3.5 text-text">
                        <span className="flex items-baseline justify-between gap-4 border-b border-border pb-2.5">
                          <span className="type-p2 font-semibold">{card.title}</span>
                          <span className="type-p2 whitespace-nowrap text-text-secondary">{card.meta}</span>
                        </span>
                        <span className="flex items-baseline justify-between gap-4 pt-2.5">
                          <span className="type-p2">{card.label}</span>
                          <span className="type-p2 truncate text-text-secondary">{value}</span>
                        </span>
                      </span>
                    </span>
                  </span>
                }
              />
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
