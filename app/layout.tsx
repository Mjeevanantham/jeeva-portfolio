import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Inter, Sora } from "next/font/google";
import Script from "next/script";
import SiteNav from "@/components/site-nav";
import { ThemeProvider } from "@/components/theme-provider";
import BackToTop from "@/components/back-to-top";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Brand typography: Inter for body, Sora for display
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
    default: "Jeevanantham Mahalingam - Full-Stack Developer & AI Enthusiast",
    template: "%s | Jeevanantham Mahalingam",
  },
  description:
    "Full-Stack Developer & Flutter Engineer specializing in NestJS and Next.js applications for enterprise HR and CRM systems.",
  applicationName: "Jeevanantham Portfolio",
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
    "AEO",
    "GEO",
  ],
  category: "technology",
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
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
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
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
          <SiteNav />
          {children}
          {modal}

          {/* Google Tag Manager */}
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({
            'gtm.start': new Date().getTime(),event:'gtm.js'
          });var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NNP3L8JS');`}
          </Script>

          {/* JIA Bot Widget (hosted by Alfred service) — disabled per request */}
          {/**
           * <Script
           *   data-tenant-id="68e68ff44d3939b192d9e216"
           *   src="https://jia-bot.vercel.app/alfred-widget.js"
           *   strategy="afterInteractive"
           * />
           */}


          {/* Alfred host-side enhancements — disabled with the bot */}
          {/**
           * <Script id="alfred-host-enhancements" strategy="afterInteractive">
           *   {`// host enhancement code`}
           * </Script>
           */}
          <script
            id="convosphereai-loader"
            chatbot-id="ede8fc06-6a01-4e1b-b739-abc768e540af"
            data-type="default"
            src="https://www.app.convosphere.site/bot/convosphereai-loader.min.js"
            defer
          />
          <elevenlabs-convai agent-id="agent_6001kc24ea7re57s8py21m1cgp3c"></elevenlabs-convai>
          <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
