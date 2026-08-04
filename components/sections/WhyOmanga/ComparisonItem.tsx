import { Check } from "@/components/icons/Check";
import { Close } from "@/components/icons/Close";
import { Text } from "@/components/ui/Text";
import type { ComparisonSentiment } from "@/content/why-omanga.content";

/**
 * One row of a comparison list: a mark and a statement.
 *
 * The mark is chosen by sentiment, not passed in. A caller that could hand this
 * component an arbitrary icon could pair a tick with a problem.
 *
 * Both marks render in the surface's own text colour — the card supplies
 * `text-on-dark` and the glyph inherits it. See `Check` for the measured reason
 * the success and error tokens are not used, and note that the sentiment is never
 * carried by colour alone in any case: the glyph differs, and each list is named
 * by a visible heading that says which side it is.
 *
 * [DECISION] `items-start`, not `items-center`.
 *
 * `design-system.md` § Icon usage asks icons to "align to the label's optical
 * center". That is right for a single line and wrong the moment a statement wraps,
 * which several of these do below the tablet breakpoint — centring would float
 * the mark into the gap between two lines. Aligned to the start it sits on the
 * first line at every width, 1.5px above true optical centre against the 27px
 * body line box, which is not a difference the eye resolves.
 */

const MARK = {
  negative: Close,
  positive: Check,
} as const;

export type ComparisonItemProps = {
  children: string;
  sentiment: ComparisonSentiment;
};

export function ComparisonItem({ children, sentiment }: ComparisonItemProps) {
  const Mark = MARK[sentiment];

  return (
    <li className="flex items-start gap-3">
      <Mark size="md" />
      <Text role="body">{children}</Text>
    </li>
  );
}
