import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import SiteNavV2 from "@/components/v2/navigation/site-nav";
import { ScrollProgress, CustomCursor } from "@/components/v2/micro-interactions";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jeevanantham.site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jeevanantham M | Full-Stack Engineer",
    template: "%s | Jeevanantham M",
  },
  description:
    "Full-stack engineer building production AI-integrated systems. Specializing in Next.js, NestJS, Flutter, and modern web technologies.",
  applicationName: "Jeevanantham Portfolio",
  authors: [{ name: "Jeevanantham Mahalingam", url: siteUrl }],
  creator: "Jeevanantham Mahalingam",
  publisher: "Jeevanantham Mahalingam",
  keywords: [
    "Jeevanantham Mahalingam",
    "Full-Stack Engineer",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "NestJS Developer",
    "Flutter Developer",
    "TypeScript",
    "AI Integration",
    "Portfolio",
    "Software Engineer",
    "Web Developer",
    "Mobile Developer",
  ],
  category: "technology",
  alternates: {
    canonical: `${siteUrl}/v2`,
    languages: {
      en: `${siteUrl}/v2`,
    },
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/v2`,
    siteName: "Jeevanantham Mahalingam",
    title: "Jeevanantham M | Full-Stack Engineer",
    description:
      "Full-stack engineer building production AI-integrated systems. Specializing in Next.js, NestJS, Flutter, and modern web technologies.",
    images: [
      {
        url: `${siteUrl}/api/og?title=Home`,
        width: 1200,
        height: 630,
        alt: "Jeevanantham Mahalingam - Full-Stack Engineer",
        type: "image/png",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeevanantham M | Full-Stack Engineer",
    description:
      "Full-stack engineer building production AI-integrated systems. Specializing in Next.js, NestJS, Flutter, and modern web technologies.",
    images: [`${siteUrl}/api/og?title=Home`],
    creator: "@jeevanantham",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function V2Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <SiteNavV2 />
      {children}
    </>
  );
}
