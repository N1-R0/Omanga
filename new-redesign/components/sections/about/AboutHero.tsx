import { HeroVideo } from "@/new-redesign/components/ui/HeroVideo";
import { ScrollGrowBox } from "@/new-redesign/components/ui/ScrollGrowBox";
import { aboutHero } from "@/new-redesign/content/about.content";

export function AboutHero({ headingId }: { headingId: string }) {
  const { pill, title, sub, video } = aboutHero;

  return (
    <section aria-labelledby={headingId} className="pt-[calc(76px+40px)] md:pt-[calc(76px+64px)]">
      <div className="container-page flex flex-col items-center text-center">
        <p className="type-p2 mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1.5 pr-4 pl-3 text-text">
          <span aria-hidden className="h-2 w-3.5 rounded-full bg-accent" />
          {pill}
        </p>
        <h1 id={headingId} className="type-h1 max-w-[760px] text-balance">
          {title}
        </h1>
        <p className="type-p1 mt-5 max-w-[480px] text-text-secondary">{sub}</p>
      </div>

      <ScrollGrowBox className="relative mt-10 aspect-[4/5] overflow-hidden bg-surface-muted md:mt-14 md:aspect-auto md:h-[min(600px,72vh)]">
        <HeroVideo small={video.small} large={video.large} poster={video.poster} />
      </ScrollGrowBox>
    </section>
  );
}
