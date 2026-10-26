import { LegalRichText } from "@/components/legal/LegalRichText";
import type { LegalBlock as LegalBlockValue } from "@/types/legal.types";

/**
 * One block of a legal document.
 *
 * A `switch` over the discriminated union, so adding a block kind to
 * `types/legal.types.ts` fails to compile here until it is given a rendering.
 * That is the whole reason the union is discriminated: a new kind cannot be
 * introduced in a content module and silently render as nothing.
 */

const PROSE_CLASS = "font-sans type-p1 text-text max-w-[70ch]";

const LIST_CLASS = "flex flex-col gap-3 font-sans type-p1 text-text";

/**
 * Callouts are set apart with a rule and an inset rather than a tinted panel.
 *
 * The palette has no informational-surface token, and inventing one for this
 * would put a colour on the site that appears nowhere else. A left rule in the
 * brand colour reads as "set apart" at every viewport, survives printing, and
 * carries no colour-only meaning — the label above it says what kind of note it
 * is in words.
 */
const CALLOUT_CLASS =
  "flex flex-col gap-2 border-l-2 pl-4 max-w-[70ch]";

const CALLOUT_TONE = {
  confirm: "border-accent",
  note: "border-neutral-0/10",
} as const;

const TABLE_WRAPPER_CLASS = "w-full overflow-x-auto";

const TABLE_CLASS = "w-full min-w-[46rem] border-collapse text-left";

const CELL_CLASS =
  "border-b border-border py-3 pr-4 align-top font-sans type-p2 text-text";

const HEAD_CELL_CLASS =
  "border-b border-text py-3 pr-4 text-left align-bottom font-sans type-h3 text-text";

const COOKIE_COLUMNS = [
  "Cookie or storage",
  "Provider",
  "Purpose",
  "Category",
  "Duration",
  "Consent required",
] as const;

export type LegalBlockProps = {
  block: LegalBlockValue;
};

export function LegalBlock({ block }: LegalBlockProps) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p className={PROSE_CLASS}>
          <LegalRichText content={block.content} />
        </p>
      );

    case "list": {
      const ListElement = block.style === "number" ? "ol" : "ul";

      return (
        <ListElement
          className={LIST_CLASS}
          /*
            `list-inside` with a hanging indent would need a marker style the
            design system does not define. A flex column with an explicit marker
            character keeps wrapped lines aligned under the text rather than under
            the bullet, which is what the rest of the site's lists do.
          */
        >
          {block.items.map((item, index) => (
            <li key={index} className="flex gap-3 max-w-[70ch]">
              <span aria-hidden="true" className="shrink-0 opacity-80">
                {block.style === "number" ? `${index + 1}.` : "—"}
              </span>
              <span>
                <LegalRichText content={item} />
              </span>
            </li>
          ))}
        </ListElement>
      );
    }

    case "definitions":
      return (
        <dl className="flex flex-col gap-4 max-w-[70ch]">
          {block.items.map((item) => (
            <div key={item.term} className="flex flex-col gap-2">
              <dt className="font-sans type-h3 text-text">{item.term}</dt>
              <dd className="font-sans type-p1 opacity-80">
                <LegalRichText content={item.description} />
              </dd>
            </div>
          ))}
        </dl>
      );

    case "cookieTable":
      return (
        /*
          The scroll container is the element with the caption's `id` as its
          accessible name and `tabIndex={0}`, so a keyboard user can scroll it
          without a pointer. A horizontally scrollable region that cannot be
          focused is unreachable by keyboard, which is the usual way a responsive
          table fails an audit.
        */
        <div
          className={TABLE_WRAPPER_CLASS}
          role="region"
          aria-label={block.caption}
          tabIndex={0}
        >
          <table className={TABLE_CLASS}>
            <caption className="sr-only">{block.caption}</caption>
            <thead>
              <tr>
                {COOKIE_COLUMNS.map((column) => (
                  <th key={column} scope="col" className={HEAD_CELL_CLASS}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={`${row.provider}-${row.name}`}>
                  <th scope="row" className={CELL_CLASS}>
                    {row.name}
                  </th>
                  <td className={CELL_CLASS}>{row.provider}</td>
                  <td className={CELL_CLASS}>{row.purpose}</td>
                  <td className={CELL_CLASS}>{row.category}</td>
                  <td className={CELL_CLASS}>{row.duration}</td>
                  <td className={CELL_CLASS}>{row.consent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "confirm":
    case "note":
      return (
        <div className={`${CALLOUT_CLASS} ${CALLOUT_TONE[block.kind]}`}>
          <p className="font-sans type-h3 text-text">{block.title}</p>
          <p className="font-sans type-p2 opacity-80">
            <LegalRichText content={block.content} />
          </p>
        </div>
      );
  }
}
