import type { PaymentsFeature } from "@/content/payments-features.content";

export function FeatureNotes({ notes }: Pick<PaymentsFeature, "notes">) {
  if (notes.length === 0) return null;

  return (
    <section aria-label="Details" className="section-y">
      <div className="container-page flex flex-col gap-4">
        {notes.map((note) => (
          <div key={note.title} className="grid gap-4 rounded-[16px] bg-surface p-6 md:grid-cols-[1fr_1.4fr] md:gap-16 md:p-10">
            <div className="flex flex-col gap-3">
              <h2 className="type-h2">{note.title}</h2>
            </div>
            <p className="type-p1 self-end text-text-secondary">{note.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
