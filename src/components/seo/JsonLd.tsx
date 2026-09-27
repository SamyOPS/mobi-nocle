import { serializeJsonLd } from "@/lib/json-ld";

/** Données structurées schema.org, rendues côté serveur. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
