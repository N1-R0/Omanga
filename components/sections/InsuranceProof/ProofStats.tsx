import { Text } from "@/components/ui/Text";
import type { ProofStat } from "@/content/insurance-proof.content";

/**
 * The four-figure stat row, two up.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] A description list.
 *
 * Each figure is the value of the label beside it, and `dl` is the one element
 * that says so. The alternative — four `h3`s reading "5 min", "3", "24/7",
 * "$50" — would put four meaningless entries in the document outline and give a
 * screen-reader user a heading list of bare numbers.
 *
 * `flex-col-reverse` on each pair is what lets the markup stay correct while the
 * figure sits above its label: `dt` must precede `dd` in the source, and the
 * reading order that produces — "African countries covered: 43" — is the right
 * one to hear. Only the paint order is flipped.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATION] The figure applies a type class directly.
 *
 * `Heading` always renders a heading element, which this must not be, and
 * `Text` stops at 18 → 20. There is no primitive for a large non-heading
 * number, so `text-h3` is applied here. Worth a `StatFigure` primitive if a
 * second section ever needs one — until then a new primitive for one caller is
 * how the set rots.
 */

export type ProofStatsProps = {
  stats: readonly ProofStat[];
};

export function ProofStats({ stats }: ProofStatsProps) {
  return (
    <dl className="grid grid-cols-1 gap-fluid-6 tablet:grid-cols-2">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse gap-fluid-1">
          <dt>
            <Text role="body" as="span" isSecondary>
              {stat.label}
            </Text>
          </dt>

          <dd className="font-sans text-h3">{stat.figure}</dd>
        </div>
      ))}
    </dl>
  );
}
