import type { Metadata } from "next";
import Link from "next/link";
import { PersonSchema, BreadcrumbListSchema } from "@/lib/v2/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jeevanantham.site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download Jeevanantham Mahalingam's resume - Full-Stack Engineer with expertise in Next.js, NestJS, Flutter, and AI-integrated systems. Available as PDF.",
  openGraph: {
    title: "Resume | Jeevanantham M",
    description:
      "Download my resume - Full-Stack Engineer with expertise in Next.js, NestJS, Flutter, and AI-integrated systems.",
    url: `${SITE_URL}/v2/resume`,
    images: [
      {
        url: `${SITE_URL}/api/og?title=Resume&subtitle=Full-Stack Engineer`,
        width: 1200,
        height: 630,
        alt: "Jeevanantham Mahalingam - Resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | Jeevanantham M",
    description:
      "Download my resume - Full-Stack Engineer with expertise in Next.js, NestJS, Flutter, and AI-integrated systems.",
    images: [`${SITE_URL}/api/og?title=Resume&subtitle=Full-Stack Engineer`],
  },
  alternates: {
    canonical: `${SITE_URL}/v2/resume`,
  },
};

export default function V2Resume() {
  return (
    <div className="min-h-screen py-20 px-4">
      {/* Structured Data */}
      <PersonSchema />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: `${SITE_URL}/v2` },
          { name: "Resume", url: `${SITE_URL}/v2/resume` },
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Resume</h1>
        <p className="text-slate-600 dark:text-slate-300">
          V2 Resume page coming soon...
        </p>
        <div className="mt-8">
          <Link
            href="/resume"
            className="inline-block px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
          >
            View V1 Resume
          </Link>
        </div>
      </div>
    </div>
  );
}
