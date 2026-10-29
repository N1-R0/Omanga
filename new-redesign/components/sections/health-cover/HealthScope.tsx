import { href } from "@/new-redesign/config/routes";
import { Button } from "@/new-redesign/components/ui/Button";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { cx } from "@/lib/cx";
import { healthScope } from "@/new-redesign/content/health-cover.content";

type Kind = "is" | "isnt";

function Mark({ kind, size }: { kind: Kind; size: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 20 20" fill="none" className={cx("shrink-0", kind === "is" ? "text-success-text" : "text-text-secondary")}>
      {kind === "is" ? (
        <path d="M5 10.5l3.2 3.2L15 6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      )}
    </svg>
  );
}

function ScopeCard({ kind, title, items }: { kind: Kind; title: string; items: ReadonlyArray<{ title: string; text: string }> }) {
  return (
    <div className={cx("rounded-xs border border-border p-8", kind === "is" ? "bg-surface" : "bg-surface-muted")}>
      <h3 className="type-h3 flex items-center gap-3">
        <span className={cx("flex size-6 items-center justify-center rounded-full", kind === "is" ? "bg-success-subtle" : "bg-surface")}>
          <Mark kind={kind} size={16} />
        </span>
        {title}
      </h3>
      <ul className="mt-5 flex flex-col gap-5 border-t border-border pt-5">
        {items.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span className="mt-0.5">
              <Mark kind={kind} size={20} />
            </span>
            <span>
              <span className="type-p1 block font-medium">{item.title}</span>
              <span className="type-p2 mt-1 block text-text-secondary">{item.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HealthScope() {
  const { eyebrow, title, sub, action, is, isnt } = healthScope;

  return (
    <Section id="scope" label={eyebrow}>
      <SectionHead
        eyebrow={eyebrow}
        title={title}
        sub={sub}
        action={
          <Button href={href(action.path)}>
            {action.label} <span aria-hidden className="ml-2">→</span>
          </Button>
        }
      />
      <div className="grid gap-6 md:grid-cols-2">
        <ScopeCard kind="is" {...is} />
        <ScopeCard kind="isnt" {...isnt} />
      </div>
    </Section>
  );
}
