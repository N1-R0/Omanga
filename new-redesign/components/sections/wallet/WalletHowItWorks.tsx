import { StepWalkthrough } from "@/new-redesign/components/sections/wallet/StepWalkthrough";
import { walletHowItWorks } from "@/new-redesign/content/wallet.content";

export function WalletHowItWorks() {
  const { eyebrow, title, sub, steps, photo } = walletHowItWorks;

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section-y lg:flex lg:min-h-svh lg:items-center lg:py-12">
      <div className="container-page">
        <StepWalkthrough
          steps={steps}
          photo={photo}
          label={title}
          head={
            <div className="flex max-w-[480px] flex-col gap-[var(--head-gap)]">
              <p className="type-p2 inline-flex items-center gap-2">
                <span aria-hidden className="h-2 w-3.5 rounded-full bg-accent" />
                {eyebrow}
              </p>
              <div className="flex flex-col gap-[var(--head-sub-gap)]">
                <h2 id="how-title" className="type-h2 text-balance">
                  {title}
                </h2>
                <p className="type-p1 text-text-secondary">{sub}</p>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
}
