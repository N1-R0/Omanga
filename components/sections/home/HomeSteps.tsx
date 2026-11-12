import { WALLET_URL } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { homeSteps } from "@/content/home.content";

export function HomeSteps() {
  const { title, sub, steps, cta } = homeSteps;

  return (
    <section id="steps" aria-labelledby="steps-title" className="section-y bg-bg">
      <div className="container-page">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[560px] flex-col gap-[var(--head-gap)]">
            <div className="flex flex-col gap-[var(--head-sub-gap)]">
              <h2 id="steps-title" className="type-h2 text-balance">
                {title}
              </h2>
              <p className="type-p1 text-text-secondary">{sub}</p>
            </div>
          </div>
          <div className="shrink-0">
            <Button href={WALLET_URL} external>
              {cta.label}
            </Button>
          </div>
        </div>

        <ol className="grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((step) => (
            <li key={step.title} className="flex flex-col">
              <div aria-hidden className={`aspect-[4/3] rounded-[16px] ${step.tile}`} />
              <h3 className="type-h3 mt-6 text-[20px] leading-tight">{step.title}</h3>
              <p className="type-p1 mt-2 text-text-secondary">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
