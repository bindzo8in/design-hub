import Script from "next/script";

import type { SchemaObject } from "@/lib/seo/schema";

interface StructuredDataProps {
  id: string;
  schema: SchemaObject | SchemaObject[];
}

export function StructuredData({ id, schema }: StructuredDataProps) {
  const payload = Array.isArray(schema) ? schema : [schema];

  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload),
      }}
    />
  );
}
