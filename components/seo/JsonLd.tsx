import type { JsonLdGraph } from "@/lib/schema";

export type JsonLdProps = {
  readonly graph: JsonLdGraph;
};

export function JsonLd({ graph }: JsonLdProps) {
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
