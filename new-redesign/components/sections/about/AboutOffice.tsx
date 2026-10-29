import { OFFICE_ADDRESS } from "@/config/site";
import { OfficeMapFrame } from "@/new-redesign/components/ui/OfficeMapFrame";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { aboutOffice } from "@/new-redesign/content/about.content";
import { Photo } from "@/new-redesign/components/ui/Photo";

const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(OFFICE_ADDRESS)}`;

function Pill({ children, corner = "bottom-3 left-3" }: { children: string; corner?: string }) {
  return (
    <span className={`type-p3 pointer-events-none absolute ${corner} rounded-full bg-surface px-3 py-1 text-text uppercase shadow-float`}>
      {children}
    </span>
  );
}

export function AboutOffice({ headingId }: { headingId: string }) {
  const { eyebrow, title, sub, officeName, officeNote, directions, mapLabel, mapTitle, photos } = aboutOffice;

  return (
    <section aria-labelledby={headingId} className="section-y">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <SectionHead id={headingId} eyebrow={eyebrow} title={title} sub={sub} />
          <h3 className="type-h3">{officeName}</h3>
          <p className="type-p2 mt-1 text-text-secondary">{officeNote}</p>
          <address className="type-p1 mt-4 not-italic">{OFFICE_ADDRESS}</address>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="type-p3 mt-4 inline-flex text-accent-text underline-offset-4 hover:underline"
          >
            {directions} →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo) => (
            <div key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface-muted">
              <Photo src={photo.src} alt="" fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
              <Pill>{photo.label}</Pill>
            </div>
          ))}
          <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-sm border border-border bg-surface">
            <OfficeMapFrame title={mapTitle} />
            <Pill corner="top-3 right-3">{mapLabel}</Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
