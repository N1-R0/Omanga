import { LegalRichText } from "@/components/legal/LegalRichText";
import type { LegalBlock as LegalBlockValue } from "@/types/legal.types";

const PROSE_CLASS = "font-sans type-p1 text-text max-w-[70ch]";

const LIST_CLASS = "flex flex-col gap-3 font-sans type-p1 text-text";

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
