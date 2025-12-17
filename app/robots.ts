import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jeevanantham.site";

export default function robots(): MetadataRoute.Robots {
  const host = siteUrl.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    host,
    sitemap: `${host}/sitemap.xml`,
  };
}
