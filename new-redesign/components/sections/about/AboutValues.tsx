import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { aboutValues } from "@/new-redesign/content/about.content";
import { Photo } from "@/new-redesign/components/ui/Photo";

export function AboutValues({ headingId }: { headingId: string }) {
  const { eyebrow, title, values } = aboutValues;

  return (
    <section aria-labelledby={headingId} className="section-y bg-surface">
      <div className="container-page">
        <SectionHead id={headingId} eyebrow={eyebrow} title={title} />

        <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
          {values.map((value) => (
            <li key={value.title}>
              <div className="relative aspect-square overflow-hidden rounded-sm bg-surface-muted">
                <Photo
                  src={value.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 text-[22px] leading-[1.2] tracking-[-0.02em]">{value.title}</h3>
              <p className="type-p2 mt-2 text-text-secondary">{value.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
