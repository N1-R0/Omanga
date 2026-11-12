type Props = {
  id: string;
  label: string;
  items: ReadonlyArray<{ title: string; text: string }>;
};

export function ProofStrip({ id, label, items }: Props) {
  return (
    <section aria-labelledby={`${id}-title`} className="bg-bg text-text">
      <h2 id={`${id}-title`} className="sr-only">
        {label}
      </h2>
      <ul className="container-page grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:py-16 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.title} className="flex max-w-[26ch] flex-col gap-2">
            <h3 className="type-h3">{item.title}</h3>
            <p className="type-p1 text-text-secondary">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
