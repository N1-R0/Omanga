import { homeFeatures, type FeatureScreen as Screen } from "@/new-redesign/content/home.content";

const nf = (d: number) => new Intl.NumberFormat("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d });

export function FeatureScreen({ screen, gbpToNgn }: { screen: Screen; gbpToNgn: number }) {
  if (screen.kind === "convert") {
    const c = homeFeatures.convertScreen;
    return (
      <div className="rounded-md bg-surface p-4 text-text">
        <p className="type-p3">{screen.title ?? c.title}</p>
        <dl className="mt-3 divide-y divide-border">
          <Row label={c.add} value={`£${nf(2).format(c.amount)}`} />
          <Row label={c.get} value={`₦${nf(0).format(c.amount * gbpToNgn)}`} strong />
          <Row label={screen.rateLabel ?? c.rate} value={`£1 = ₦${nf(2).format(gbpToNgn)}`} />
        </dl>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-surface p-4 text-text">
      <p className="type-p3">{screen.title}</p>
      <dl className="mt-3 divide-y divide-border">
        {screen.rows.map(([label, value]) => (
          <Row key={label} label={label} value={value} />
        ))}
      </dl>
      {screen.status ? (
        <p className="type-p3 mt-3 rounded-md bg-accent-subtle px-3 py-2 text-center text-brand-700">{screen.status}</p>
      ) : null}
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <dt className="type-p2 whitespace-nowrap text-text-secondary">{label}</dt>
      <dd className={`whitespace-nowrap ${strong ? "type-h3" : "type-p2"}`}>{value}</dd>
    </div>
  );
}
