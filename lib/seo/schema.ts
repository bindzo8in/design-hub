import { seoConfig, buildAssetUrl } from "./config";

export type SchemaObject = Record<string, unknown>;

export function buildOrganizationSchema(): SchemaObject {
  const baseSchema: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seoConfig.brandName,
    url: seoConfig.siteUrl,
    logo: buildAssetUrl(seoConfig.logoPath),
    description: seoConfig.defaultDescription,
  };

  if (seoConfig.socialUrls.length > 0) {
    baseSchema.sameAs = seoConfig.socialUrls;
  }

  return baseSchema;
}

export function buildWebsiteSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    inLanguage: seoConfig.locale,
    publisher: buildOrganizationSchema(),
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildFAQSchema(faqs: Array<{ question: string; answer: string }>): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: buildOrganizationSchema(),
    areaServed: seoConfig.city,
    url: service.url,
  };
}

export function buildStructuredDataPayload(schema: SchemaObject | SchemaObject[]) {
  return Array.isArray(schema) ? schema : [schema];
}
