import type { Metadata } from "next";
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
    "Portfolio of Jeevanantham Mahalingam - Full-Stack Developer specializing in modern web technologies, AI integration, and digital experiences.",
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
      "Portfolio of Jeevanantham Mahalingam - Full-Stack Developer specializing in modern web technologies, AI integration, and digital experiences.",
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
      "Portfolio of Jeevanantham Mahalingam - Full-Stack Developer specializing in modern web technologies, AI integration, and digital experiences.",
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
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
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

          {/* JIA Bot Widget (hosted by Alfred service) */}
          <Script
            data-tenant-id="68e68ff44d3939b192d9e216"
            src="https://jia-bot.vercel.app/alfred-widget.js"
            strategy="afterInteractive"
          />

          {/* Alfred host-side enhancements: shorten greeting, clamp long replies, add icons, ensure scroll behavior */}
          <Script id="alfred-host-enhancements" strategy="afterInteractive">
            {`
            (function () {
              function onceReady(fn) {
                if (document.readyState === 'complete' || document.readyState === 'interactive') {
                  setTimeout(fn, 0);
                } else {
                  document.addEventListener('DOMContentLoaded', fn);
                }
              }

              onceReady(function () {
                try {
                // Poll for widget root since it loads async
                const start = Date.now();
                const timer = setInterval(function () {
                  const widget = document.querySelector('.alfred-widget');
                  const chat = document.querySelector('.alfred-widget-chat');
                  const greeting = document.querySelector('.alfred-widget-greeting');
                  const suggestions = document.querySelectorAll('.alfred-widget-suggestion');
                  const input = document.getElementById('alfredInput');
                  if (widget && chat) {
                    clearInterval(timer);

                    // Replace long greeting with concise version and JIA branding
                    if (greeting) {
                      const title = greeting.querySelector('h3');
                      const p = greeting.querySelector('p');
                      if (title) title.textContent = "Hi, I&apos;m JIA";
                      if (p) p.textContent = "Ask me about Jeeva&apos;s skills, projects, or experience.";
                    }

                    // Center input placeholder (in addition to CSS) and rebrand to JIA
                    if (input) input.setAttribute('placeholder', "Ask JIA about Jeeva&apos;s work…");

                    // Iconize suggestion chips
                    suggestions.forEach((el) => {
                      const text = el.textContent?.trim() || '';
                      const icon = text.startsWith(&apos;Skills&apos;) ? &apos;🛠️&apos; : text.startsWith(&apos;Projects&apos;) ? &apos;📁&apos; : text.startsWith(&apos;Experience&apos;) ? &apos;📜&apos; : text.startsWith(&apos;Contact&apos;) ? &apos;✉️&apos; : &apos;🔹&apos;;
                      if (!el.dataset.iconized) {
                        el.dataset.iconized = &apos;1&apos;;
                        el.innerHTML = &apos;<span style="margin-right:6px">&apos; + icon + &apos;</span>&apos; + text;
                      }
                    });

                    // Observe new messages to clamp long Alfred replies
                    const chatObserver = new MutationObserver(function (mutations) {
                      mutations.forEach(function (m) {
                        m.addedNodes.forEach(function (n) {
                          if (!(n instanceof HTMLElement)) return;
                          if (n.classList.contains(&apos;alfred-widget-message&apos;) && n.classList.contains(&apos;alfred&apos;)) {
                            const bubble = n.querySelector(&apos;.alfred-widget-message-bubble&apos;);
                            if (bubble && !bubble.dataset.clamped) {
                              bubble.dataset.clamped = &apos;1&apos;;
                              const originalHTML = bubble.innerHTML;
                              const textLength = bubble.textContent ? bubble.textContent.trim().length : 0;
                              if (textLength > 320) {
                                bubble.classList.add(&apos;alfred-message-clamped&apos;);
                                const toggle = document.createElement(&apos;button&apos;);
                                toggle.type = &apos;button&apos;;
                                toggle.className = &apos;alfred-show-toggle&apos;;
                                toggle.textContent = &apos;Show more&apos;;
                                toggle.addEventListener(&apos;click&apos;, function () {
                                  const isClamped = bubble.classList.toggle(&apos;alfred-message-clamped&apos;);
                                  toggle.textContent = isClamped ? &apos;Show more&apos; : &apos;Show less&apos;;
                                  bubble.innerHTML = originalHTML; // restore links formatting
                                });
                                bubble.after(toggle);
                              }
                            }
                          }
                        });
                      });
                    });
                    chatObserver.observe(chat, { childList: true, subtree: true });
                  }

                  // Stop polling after 10 seconds as a safety
                  if (Date.now() - start > 10000) clearInterval(timer);
                }, 200);
                } catch (e) {
                  // Swallow errors to avoid interfering with widget initialization
                  // eslint-disable-next-line no-console
                  console.warn('Alfred host enhancements disabled due to error:', e);
                }
              });
            })();
          `}
          </Script>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
