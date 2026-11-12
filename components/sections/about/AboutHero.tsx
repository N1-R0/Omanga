import { ScrollGrowBox } from "@/components/ui/ScrollGrowBox";
import { aboutHero } from "@/content/about.content";
import { Photo } from "@/components/ui/Photo";

export function AboutHero({ headingId }: { headingId: string }) {
  const { title, sub, photo } = aboutHero;

  return (
    <section aria-labelledby={headingId} className="pt-[calc(76px+40px)] md:pt-[calc(76px+64px)]">
      <div className="container-page flex flex-col items-center text-center">
        <h1 id={headingId} className="type-h1 max-w-[760px] text-balance">
          {title}
        </h1>
        <p className="type-p1 mt-5 max-w-[480px] text-text-secondary">{sub}</p>
      </div>

      <ScrollGrowBox className="relative mt-10 aspect-[4/5] overflow-hidden bg-surface-muted md:mt-14 md:aspect-auto md:h-[min(600px,72vh)]">
        <Photo src={photo.src} alt={photo.alt} fill preload sizes="100vw" className="object-cover" />
      </ScrollGrowBox>
    </section>
  );
}
