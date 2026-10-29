import { cx } from "@/lib/cx";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { aboutMissionVision } from "@/new-redesign/content/about.content";

export function AboutMissionVision({ headingId }: { headingId: string }) {
  const { eyebrow, title, sub, cards } = aboutMissionVision;

  return (
    <section aria-labelledby={headingId} className="section-y">
      <div className="container-page">
        <SectionHead id={headingId} eyebrow={eyebrow} title={title} sub={sub} />

        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => {
            const brand = card.tone === "brand";
            return (
              <article
                key={card.title}
                className={cx(
                  "flex min-h-[320px] flex-col justify-between gap-10 rounded-xs p-8 md:min-h-[400px] md:p-10",
                  brand ? "bg-accent text-text-inverse" : "bg-accent-subtle text-text",
                )}
              >
                <h3 className="type-h2 max-w-[8ch]">{card.title}</h3>
                <p className={cx("type-p1 max-w-[440px]", !brand && "text-text-secondary")}>{card.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
