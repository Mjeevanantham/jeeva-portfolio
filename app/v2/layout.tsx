import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Inter, Sora } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import SiteNavV2 from "@/components/v2/navigation/site-nav";
import BackToTop from "@/components/back-to-top";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// V2 Typography: Inter as primary font with optimal loading
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // font-display: swap for performance
  preload: true,
  adjustFontFallback: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jeevanantham.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jeevanantham Mahalingam - Portfolio V2",
    template: "%s | Jeevanantham Mahalingam",
  },
  description:
    "Full-Stack Developer & Flutter Engineer specializing in NestJS and Next.js applications for enterprise HR and CRM systems.",
  applicationName: "Jeevanantham Portfolio V2",
  authors: [{ name: "Jeevanantham Mahalingam", url: siteUrl }],
  creator: "Jeevanantham Mahalingam",
  publisher: "Jeevanantham Mahalingam",
  keywords: [
    "Jeevanantham",
    "Jeevanantham Mahalingam",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "Portfolio",
    "Web Performance",
    "SEO",
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
    title: "Jeevanantham Mahalingam - Full-Stack Developer & AI Enthusiast",
    description:
      "Full-Stack Developer & Flutter Engineer specializing in NestJS and Next.js applications for enterprise HR and CRM systems.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Jeevanantham Mahalingam - Full-Stack & Flutter Developer",
      },
    ],
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeevanantham Mahalingam - Full-Stack Developer & AI Enthusiast",
    description:
      "Full-Stack Developer & Flutter Engineer specializing in NestJS and Next.js applications for enterprise HR and CRM systems.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@",
  },
  robots: {
    index: false, // V2 is in development, don't index yet
    follow: false,
  },
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: "/favicon.png",
  },
};

export default function V2Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NNP3L8JS"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <SiteNavV2 />
          {children}

          {/* Google Tag Manager */}
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({
            'gtm.start': new Date().getTime(),event:'gtm.js'
          });var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NNP3L8JS');`}
          </Script>

          {/* Convosphere AI Chatbot */}
          <script
            id="convosphereai-loader"
            chatbot-id="ede8fc06-6a01-4e1b-b739-abc768e540af"
            data-type="default"
            src="https://www.app.convosphere.site/bot/convosphereai-loader.min.js"
            defer
          />
          {/* @ts-expect-error Custom element */}
          <elevenlabs-convai agent-id="agent_6001kc24ea7re57s8py21m1cgp3c"></elevenlabs-convai>
          <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
