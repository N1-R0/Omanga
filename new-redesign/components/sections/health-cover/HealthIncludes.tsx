import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { healthIncludes } from "@/new-redesign/content/health-cover.content";

/**
 * 4 · What every plan includes, after the owner's Superpower Health Gap
 * reference (2026-10-26, Mobbin 0fa649f3): the section header, then a soft
 * muted frame holding one white bordered card. The card opens with a label
 * row ("Included on Silver, Gold and Diamond"), then three grouped columns
 * split by hairlines, each a group title over its benefits: a small crimson
 * line icon, the benefit in medium ink and one secondary line under it.
 * Below 1024px the columns stack, split by horizontal hairlines.
 */
const ICONS = {
  alert: "M10 3 2.5 16.5h15L10 3Zm0 5.5v3.5m0 2.5h.01",
  bed: "M3 5v11M3 12h14v4M17 12V9.5A1.5 1.5 0 0 0 15.5 8H9v4M6 10.5h.01",
  evac: "M2.5 13.5V6h9v7.5m0-5h3l3 3v2h-2M6 9.5h2.5M7.25 8.25v2.5M5 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM6.5 14h6",
  test: "M8 3h4M8.5 3v5L4 15.5A1 1 0 0 0 4.9 17h10.2a1 1 0 0 0 .9-1.5L11.5 8V3M6 12.5h8",
  pill: "M8.5 4.5a3.5 3.5 0 0 1 5 5l-4 4a3.5 3.5 0 0 1-5-5l4-4ZM6.5 6.5l5 5",
  call: "M4 3.5h3l1.5 4-2 1.25a8.5 8.5 0 0 0 4.75 4.75L12.5 11.5l4 1.5v3a1 1 0 0 1-1 1A12.5 12.5 0 0 1 3 4.5a1 1 0 0 1 1-1Z",
  pin: "M10 17.5s5.5-5 5.5-9.5a5.5 5.5 0 0 0-11 0c0 4.5 5.5 9.5 5.5 9.5Zm0-7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  account: "M6 2.5h8a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Zm3 12.5h2",
} as const;

export function HealthIncludes() {
  const { eyebrow, title, sub, label, groups } = healthIncludes;

  return (
    <Section id="included" label={eyebrow}>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />

      <div className="rounded-[20px] bg-surface-muted p-2 md:p-3">
        <div className="rounded-xs border border-border bg-surface">
          <p className="type-p2 border-b border-border px-6 py-4 text-text-secondary md:px-8">{label}</p>
          <div className="grid lg:grid-cols-3">
            {groups.map((group, i) => (
              <div key={group.title} className={i > 0 ? "border-t border-border lg:border-t-0 lg:border-l" : undefined}>
                <div className="flex flex-col gap-6 p-6 md:p-8">
                  <h3 className="type-h3">{group.title}</h3>
                  <ul className="flex flex-col gap-5">
                    {group.items.map((item) => (
                      <li key={item.title} className="flex gap-3">
                        <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-accent-text">
                          <path d={ICONS[item.icon]} />
                        </svg>
                        <span>
                          <span className="type-p1 block font-medium">{item.title}</span>
                          <span className="type-p2 mt-1 block text-text-secondary">{item.text}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
