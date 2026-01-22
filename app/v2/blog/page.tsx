import type { Metadata } from "next";
import Link from "next/link";
import { PersonSchema, BreadcrumbListSchema, WebSiteSchema } from "@/lib/v2/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jeevanantham.site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical blog by Jeevanantham Mahalingam - Articles on full-stack development, AI integration, Next.js, NestJS, Flutter, and software engineering best practices.",
  openGraph: {
    title: "Blog | Jeevanantham M",
    description:
      "Technical blog - Articles on full-stack development, AI integration, Next.js, NestJS, Flutter, and software engineering.",
    url: `${SITE_URL}/v2/blog`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/api/og?title=Blog&subtitle=Technical Articles`,
        width: 1200,
        height: 630,
        alt: "Jeevanantham Mahalingam - Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Jeevanantham M",
    description:
      "Technical blog - Articles on full-stack development, AI integration, Next.js, NestJS, Flutter, and software engineering.",
    images: [`${SITE_URL}/api/og?title=Blog&subtitle=Technical Articles`],
  },
  alternates: {
    canonical: `${SITE_URL}/v2/blog`,
  },
};

export default function V2Blog() {
  return (
    <div className="min-h-screen py-20 px-4">
      {/* Structured Data */}
      <PersonSchema />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: `${SITE_URL}/v2` },
          { name: "Blog", url: `${SITE_URL}/v2/blog` },
        ]}
      />
      <WebSiteSchema />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <p className="text-slate-600 dark:text-slate-300">
          V2 Blog page coming soon...
        </p>
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
          >
            View V1 Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
