import { HeroVideo } from "@/new-redesign/components/ui/HeroVideo";
import { ScrollGrowBox } from "@/new-redesign/components/ui/ScrollGrowBox";
import { aboutHero } from "@/new-redesign/content/about.content";

/**
 * 1 · About hero (owner, 2026-10-26; Mobbin A1, Wise's About): the heading
 * and sub centred, then a video box of a traveller walking through an
 * airport. The box starts at the content width (12px radius) and grows to
 * the full page width as you scroll (owner). Below 768 it is edge to edge and
 * square from the start, as the other heroes are.
 */
export function AboutHero({ headingId }: { headingId: string }) {
  const { pill, title, sub, video } = aboutHero;

  return (
    <section aria-labelledby={headingId} className="pt-10 md:pt-16">
      <div className="container-page flex flex-col items-center text-center">
        {/* Page pill (owner, 2026-10-27): the section eyebrow's crimson marker in a bordered pill. */}
        <p className="type-p2 mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1.5 pr-4 pl-3 text-text">
          <span aria-hidden className="h-2 w-3.5 rounded-full bg-accent" />
          {pill}
        </p>
        <h1 id={headingId} className="type-h1 max-w-[760px] text-balance">
          {title}
        </h1>
        <p className="type-p1 mt-5 max-w-[480px] text-text-secondary">{sub}</p>
      </div>

      {/* Fixed height, so growing wider never moves the page under the reader. */}
      <ScrollGrowBox className="relative mt-10 aspect-[4/5] overflow-hidden bg-surface-muted md:mt-14 md:aspect-auto md:h-[min(600px,72vh)]">
        <HeroVideo small={video.small} large={video.large} poster={video.poster} />
      </ScrollGrowBox>
    </section>
  );
}
