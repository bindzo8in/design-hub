import type { Metadata } from "next";

import { seoConfig, buildAbsoluteUrl, getCanonicalUrl, seoImageUrl } from "./config";

export type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  image?: string;
};

export function buildMetadata({
  title,
  description = seoConfig.defaultDescription,
  path = "/",
  keywords = [...seoConfig.defaultKeywords],
  noIndex = false,
  image,
}: PageMetadataInput): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const ogImage = image ? buildAbsoluteUrl(image) : seoImageUrl;

  return {
    metadataBase: new URL(seoConfig.siteUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    openGraph: {
      type: "website",
      locale: seoConfig.locale,
      url: canonicalUrl,
      siteName: seoConfig.siteName,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${seoConfig.brandName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    applicationName: seoConfig.siteName,
    appleWebApp: {
      capable: true,
      title: seoConfig.siteName,
      statusBarStyle: "black-translucent",
    },
    icons: {
      icon: [
        {
          url: "/icon0.svg",
          type: "image/svg+xml",
        },
        {
          url: "/icon1.png",
          type: "image/png",
        },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-icon.png",
    },
  };
}

export function buildRootMetadata(): Metadata {
  const rootMetadata = buildMetadata({
    title: seoConfig.brandName,
    description: seoConfig.defaultDescription,
    path: "/",
  });

  return {
    ...rootMetadata,
    title: {
      default: seoConfig.brandName,
      template: `%s | ${seoConfig.brandName}`,
    },
  };
}
