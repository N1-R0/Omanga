import Image from "next/image";
import Link from "next/link";

import { RATE_PAIRS } from "@/content/rates.content";
import type { MatrixCurrency } from "@/lib/rates";
import { cx } from "@/lib/cx";

const CODES: readonly MatrixCurrency[] = ["USD", "GBP", "CAD", "NGN"];

const FLAGS: Readonly<Record<MatrixCurrency, string>> = {
  USD: "/flags/united-states.svg",
  GBP: "/flags/united-kingdom.svg",
  CAD: "/flags/canada.svg",
  NGN: "/flags/nigeria.svg",
};

const format = (n: number) => {
  const places = n >= 100 ? 2 : n >= 0.01 ? 4 : 6;
  return n.toLocaleString("en-GB", {
    minimumFractionDigits: places,
    maximumFractionDigits: places,
  });
};

export function RateMatrix({
  matrix,
  current,
  caption,
}: {
  matrix: Record<MatrixCurrency, Record<MatrixCurrency, number>>;
  current: MatrixCurrency;
  caption: string;
}) {
  return (
    <div className="overflow-x-auto rounded-[1.5rem] bg-bg">
      <table className="w-full min-w-[34rem] text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border">
            <td className="p-6" />
            {CODES.map((code) => (
              <th
                key={code}
                scope="col"
                className="p-6 font-sans type-p2 font-semibold"
              >
                <span className="inline-flex items-center gap-2">
                  <Flag code={code} />
                  {code}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-sans type-p1 tabular-nums">
          {CODES.map((from) => {
            const pair = RATE_PAIRS.find((p) => p.code === from);
            return (
              <tr
                key={from}
                className={cx(
                  "border-b border-border last:border-b-0",
                  from === current && "bg-surface",
                )}
              >
                <th
                  scope="row"
                  className="p-6 font-sans type-p2 font-semibold whitespace-nowrap"
                >
                  <span className="inline-flex items-center gap-2">
                    <Flag code={from} />
                    {pair ? (
                      <Link
                        href={`/rates/${pair.slug}`}
                        className="underline underline-offset-4 hover:opacity-80 "
                      >
                        1 {from}
                      </Link>
                    ) : (
                      <>1 {from}</>
                    )}
                  </span>
                </th>
                {CODES.map((to) => (
                  <td
                    key={to}
                    className={cx(
                      "p-6",
                      to === "NGN" && from !== "NGN" && "font-semibold",
                    )}
                  >
                    {from === to ? "1" : format(matrix[from][to])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Flag({ code }: { code: MatrixCurrency }) {
  return (
    <Image
      src={FLAGS[code]}
      alt=""
      width={20}
      height={20}
      className="size-5 rounded-full object-cover"
    />
  );
}
