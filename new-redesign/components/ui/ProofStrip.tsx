import { walletProof } from "@/new-redesign/content/wallet.content";

/**
 * 2 · Proof strip, after the structure of the owner's reference (2026-10-22):
 * four facts in a row from 1024px, two columns below, on the page's own grey
 * (owner: the reference's black was not part of the ask). Titles are H3 ink,
 * text is P1 secondary. No icons, no dividers.
 *
 * A list, not stats: each item is a short claim with one line of detail.
 */
export function WalletProof() {
  const { label, items } = walletProof;

  return (
    <section aria-labelledby="wallet-proof-title" className="bg-bg text-text">
      {/* Keeps the heading order h1 → h2 → h3 without a visible title. */}
      <h2 id="wallet-proof-title" className="sr-only">
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
