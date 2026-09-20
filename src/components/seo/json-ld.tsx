/**
 * Renders a JSON-LD @graph document.
 *
 * The payload is produced by src/lib/seo/schema.ts via `JSON.stringify`, so it
 * cannot contain raw markup; `<` is escaped defensively anyway, which is the
 * one sequence that could otherwise close the script element early.
 */
export function JsonLd({ data }: { data: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: data.replace(/</g, "\\u003c") }}
    />
  );
}
