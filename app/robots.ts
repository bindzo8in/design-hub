import type { MetadataRoute } from "next";

import { seoConfig, buildAbsoluteUrl } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: buildAbsoluteUrl("/sitemap.xml"),
  };
}
