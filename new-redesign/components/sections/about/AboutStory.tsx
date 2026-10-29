import { aboutStory } from "@/new-redesign/content/about.content";

export function AboutStory({ headingId }: { headingId: string }) {
  const { eyebrow, title, lead, body } = aboutStory;

  return (
    <section aria-labelledby={headingId} className="section-y">
      <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="flex flex-col gap-[var(--head-gap)]">
          <p className="type-p2 inline-flex items-center gap-2 text-text">
            <span aria-hidden className="h-2 w-3.5 rounded-full bg-accent" />
            {eyebrow}
          </p>
          <h2 id={headingId} className="type-h2">
            {title}
          </h2>
        </div>

        <div>
          <p className="text-[20px] leading-[1.4] tracking-[-0.02em] text-pretty md:text-[24px]">{lead}</p>
          <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2 md:gap-8">
            {body.map((text) => (
              <p key={text.slice(0, 24)} className="type-p2 text-text-secondary">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
