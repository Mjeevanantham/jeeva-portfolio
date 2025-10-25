import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog-posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jeevanantham.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const host = siteUrl.replace(/\/$/, "");

  const staticPaths: MetadataRoute.Sitemap = [
    {
      url: `${host}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    { url: `${host}/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${host}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const blogPaths: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${host}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPaths, ...blogPaths];
}
