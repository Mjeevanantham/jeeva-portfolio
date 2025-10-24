import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        url: `${siteUrl}/diagonal-gradient-bg.svg`,
        width: 1200,
        height: 630,
        alt: "Jeevanantham Portfolio Preview",
      },
    ],
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeevanantham Mahalingam - Full-Stack Developer & AI Enthusiast",
    description:
      "Portfolio of Jeevanantham Mahalingam - Full-Stack Developer specializing in modern web technologies, AI integration, and digital experiences.",
    images: [`${siteUrl}/diagonal-gradient-bg.svg`],
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
    icon: "/favicon.ico",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {modal}
        
        {/* Alfred Bot Widget */}
        <Script 
          data-tenant-id="68e68ff44d3939b192d9e216" 
          src="https://alfred-portfolio-bot.vercel.app/alfred-widget.js"
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

                    // Replace long greeting with concise version
                    if (greeting) {
                      const title = greeting.querySelector('h3');
                      const p = greeting.querySelector('p');
                      if (title) title.textContent = 'Hello! 👋';
                      if (p) p.textContent = "Ask me about Jeeva's skills, projects, or experience.";
                    }

                    // Center input placeholder (in addition to CSS)
                    if (input) input.setAttribute('placeholder', "Ask Alfred about Jeeva's work…");

                    // Iconize suggestion chips
                    suggestions.forEach((el) => {
                      const text = el.textContent?.trim() || '';
                      const icon = text.startsWith('Skills') ? '🛠️' : text.startsWith('Projects') ? '📁' : text.startsWith('Experience') ? '📜' : text.startsWith('Contact') ? '✉️' : '🔹';
                      if (!el.dataset.iconized) {
                        el.dataset.iconized = '1';
                        el.innerHTML = '<span style="margin-right:6px">' + icon + '</span>' + text;
                      }
                    });

                    // Observe new messages to clamp long Alfred replies
                    const chatObserver = new MutationObserver(function (mutations) {
                      mutations.forEach(function (m) {
                        m.addedNodes.forEach(function (n) {
                          if (!(n instanceof HTMLElement)) return;
                          if (n.classList.contains('alfred-widget-message') && n.classList.contains('alfred')) {
                            const bubble = n.querySelector('.alfred-widget-message-bubble');
                            if (bubble && !bubble.dataset.clamped) {
                              bubble.dataset.clamped = '1';
                              const originalHTML = bubble.innerHTML;
                              const textLength = bubble.textContent ? bubble.textContent.trim().length : 0;
                              if (textLength > 320) {
                                bubble.classList.add('alfred-message-clamped');
                                const toggle = document.createElement('button');
                                toggle.type = 'button';
                                toggle.className = 'alfred-show-toggle';
                                toggle.textContent = 'Show more';
                                toggle.addEventListener('click', function () {
                                  const isClamped = bubble.classList.toggle('alfred-message-clamped');
                                  toggle.textContent = isClamped ? 'Show more' : 'Show less';
                                  bubble.innerHTML = originalHTML; // restore links formatting
                                });
                                bubble.after(toggle);
                              }
                            }
                          }
                        });
                      });
                    });
                    chatObserver.observe(chat, { childList: true });
                  }

                  // Stop polling after 10 seconds as a safety
                  if (Date.now() - start > 10000) clearInterval(timer);
                }, 200);
              });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
