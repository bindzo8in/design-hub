export const seoConfig = {
  brandName: "Design Hub",
  siteName: "Design Hub",
  businessType: "agency",
  defaultDescription:
    "Design Hub builds modern websites, digital marketing campaigns, brand systems, packaging, photography, and print solutions for businesses in Coimbatore and beyond.",
  defaultKeywords: [
    "web design",
    "digital marketing",
    "branding",
    "packaging design",
    "printing",
    "photography",
    "Coimbatore",
    "Design Hub",
  ],
  locale: "en-IN",
  country: "India",
  city: "Coimbatore",
  themeColor: "#050711",
  siteUrl:
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  logoPath: "/logo/dark.png",
  ogImagePath: "/logo/dark.png",
  socialUrls: [] as string[],
  routes: [
    { href: "/", changeFrequency: "daily", priority: 1 },
    { href: "/about", changeFrequency: "monthly", priority: 0.9 },
    { href: "/services", changeFrequency: "weekly", priority: 0.9 },
    { href: "/portfolio", changeFrequency: "weekly", priority: 0.85 },
    { href: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { href: "/careers", changeFrequency: "weekly", priority: 0.8 },
    { href: "/services/web-design", changeFrequency: "weekly", priority: 0.8 },
    { href: "/services/digital-marketing", changeFrequency: "weekly", priority: 0.8 },
    { href: "/services/packaging-design", changeFrequency: "weekly", priority: 0.8 },
    { href: "/services/photography", changeFrequency: "weekly", priority: 0.8 },
    { href: "/services/printing", changeFrequency: "weekly", priority: 0.8 },
    { href: "/services/design-solution", changeFrequency: "weekly", priority: 0.8 },
    { href: "/services/outdoor-advertisement", changeFrequency: "weekly", priority: 0.8 },
    { href: "/services/bus-advertisement", changeFrequency: "weekly", priority: 0.8 },
    { href: "/services/mobile-van-adverticement", changeFrequency: "weekly", priority: 0.8 },
    { href: "/services/barricade-adverticement", changeFrequency: "weekly", priority: 0.8 },
  ],
} as const;

export function buildAbsoluteUrl(path = "") {
  return new URL(path, seoConfig.siteUrl).toString();
}

export function buildAssetUrl(path: string) {
  return buildAbsoluteUrl(path);
}

export function getCanonicalUrl(path = "/") {
  return buildAbsoluteUrl(path);
}

export const seoImageUrl = buildAssetUrl(seoConfig.ogImagePath);
export const seoLogoUrl = buildAssetUrl(seoConfig.logoPath);
